/**
 * @file src/ai/aiClient.js
 * @description Provider-agnostic AI Client for CreatorAI.
 *
 * Abstracted interface for calling AI models (OpenAI, Gemini, Anthropic, or local).
 * Handles:
 * - Mock vs Live AI toggling via `USE_MOCK_DATA` environment variable or runtime config
 * - Structured JSON output parsing & repair
 * - Fallbacks and error envelope sanitization
 * - Safe credential isolation (never exposes raw keys to frontend)
 */

import {
  createSuccessResponse,
  createErrorResponse,
  safeParseJSON,
} from '../contracts/index.js';

/**
 * Safely retrieves environment variables across Node.js and browser environments.
 * @param {string} key
 * @param {string} [defaultValue='']
 * @returns {string}
 */
function getEnv(key, defaultValue = '') {
  if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined) {
    return process.env[key];
  }
  // Optional support for Vite import.meta.env
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key] !== undefined) {
    return import.meta.env[key];
  }
  return defaultValue;
}

// Internal state: allows programmatically overriding mock mode (e.g. for testing)
let mockModeOverride = null;

/**
 * Checks whether mock data mode is active.
 * Defaults to true if USE_MOCK_DATA is 'true' or not set to 'false',
 * or if no AI_API_KEY is configured.
 *
 * @returns {boolean}
 */
export function isMockMode() {
  if (mockModeOverride !== null) {
    return mockModeOverride;
  }
  const envMock = getEnv('USE_MOCK_DATA', 'true').toLowerCase();
  const apiKey = getEnv('AI_API_KEY', '') || getEnv('OPENAI_API_KEY', '') || getEnv('GEMINI_API_KEY', '');
  
  // If explicitly set to false and an API key is present, use live provider
  if (envMock === 'false' && apiKey) {
    return false;
  }
  // Otherwise default to high-fidelity mock mode
  return true;
}

/**
 * Manually toggle mock mode at runtime (useful for automated testing or developer overrides).
 * @param {boolean|null} enable - Set true/false to force mode, or null to revert to env config
 */
export function setMockMode(enable) {
  mockModeOverride = enable;
}

/**
 * Returns the current sanitized AI client configuration (keys are masked).
 */
export function getAIConfig() {
  const apiKey = getEnv('AI_API_KEY', '') || getEnv('OPENAI_API_KEY', '');
  return {
    isMock: isMockMode(),
    provider: getEnv('AI_PROVIDER', 'openai-compatible'),
    model: getEnv('AI_MODEL', 'gpt-4o-mini'),
    hasKey: Boolean(apiKey),
  };
}

/**
 * Core structured output generator.
 *
 * @param {object|string} input - User prompt or structured input context
 * @param {object} options
 * @param {string} [options.systemPrompt] - System instruction defining role and output contract
 * @param {string} [options.schemaDescription] - Contract description for the model
 * @param {Function} [options.validator] - Contract validator function (src/contracts/index.js)
 * @param {Function} [options.mockDataGenerator] - Generates realistic context-aware mock payload
 * @param {any} [options.fallbackData] - Static default payload if live call and repair fail
 * @param {number} [options.temperature=0.7] - Model temperature
 * @param {string} [options.model] - Specific model name
 * @returns {Promise<{ success: boolean, data?: any, error?: { code: string, message: string } }>}
 */
export async function generateStructuredOutput(input, options = {}) {
  const {
    systemPrompt = 'You are the CreatorAI Intelligence Engine. Return strictly valid JSON.',
    schemaDescription = '',
    validator = (d) => d,
    mockDataGenerator = null,
    fallbackData = null,
    temperature = 0.7,
    model = getEnv('AI_MODEL', 'gpt-4o-mini'),
  } = options;

  try {
    // -------------------------------------------------------------------------
    // 1. MOCK MODE EXECUTION
    // -------------------------------------------------------------------------
    if (isMockMode()) {
      let mockResult = null;
      if (typeof mockDataGenerator === 'function') {
        mockResult = await mockDataGenerator(input);
      } else if (fallbackData !== null) {
        mockResult = typeof fallbackData === 'function' ? fallbackData(input) : fallbackData;
      } else {
        mockResult = {};
      }

      // Validate mock data to ensure it adheres 100% to contract
      const validatedData = validator(mockResult);
      return createSuccessResponse(validatedData);
    }

    // -------------------------------------------------------------------------
    // 2. LIVE AI PROVIDER EXECUTION (Abstracted HTTP Call)
    // -------------------------------------------------------------------------
    const apiKey = getEnv('AI_API_KEY', '') || getEnv('OPENAI_API_KEY', '') || getEnv('GEMINI_API_KEY', '');
    const apiUrl = getEnv('AI_PROVIDER_URL', 'https://api.openai.com/v1/chat/completions');

    const promptText = typeof input === 'string'
      ? input
      : `Input Context:\n${JSON.stringify(input, null, 2)}`;

    const fullSystemPrompt = `${systemPrompt}\n\nSTRICT REQUIREMENT: Output MUST be valid JSON conforming to the following structure:\n${schemaDescription}\nDo not include any Markdown wrappers, explanatory text, or preamble outside the JSON.`;

    const requestBody = {
      model,
      temperature,
      messages: [
        { role: 'system', content: fullSystemPrompt },
        { role: 'user', content: promptText },
      ],
      response_format: { type: 'json_object' },
    };

    let response;
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });
    } catch (networkErr) {
      // If network fails, attempt graceful fallback rather than crashing
      if (fallbackData !== null || typeof mockDataGenerator === 'function') {
        const fallback = typeof mockDataGenerator === 'function'
          ? await mockDataGenerator(input)
          : fallbackData;
        return createSuccessResponse(validator(fallback));
      }
      return createErrorResponse(
        'AI_NETWORK_ERROR',
        'Unable to connect to AI provider service.'
      );
    }

    if (!response.ok) {
      // Graceful fallback on API error
      if (fallbackData !== null || typeof mockDataGenerator === 'function') {
        const fallback = typeof mockDataGenerator === 'function'
          ? await mockDataGenerator(input)
          : fallbackData;
        return createSuccessResponse(validator(fallback));
      }
      return createErrorResponse(
        'AI_PROVIDER_ERROR',
        'AI service returned an unrecoverable response.'
      );
    }

    const jsonResponse = await response.json();
    const rawContent = jsonResponse.choices?.[0]?.message?.content || '';

    // -------------------------------------------------------------------------
    // 3. PARSING, RECOVERY & VALIDATION
    // -------------------------------------------------------------------------
    const parsedData = safeParseJSON(rawContent, null);

    if (parsedData === null) {
      // Parsing failed: use fallback if available
      if (fallbackData !== null || typeof mockDataGenerator === 'function') {
        const fallback = typeof mockDataGenerator === 'function'
          ? await mockDataGenerator(input)
          : fallbackData;
        return createSuccessResponse(validator(fallback));
      }
      return createErrorResponse(
        'AI_MALFORMED_OUTPUT',
        'Received malformed structured output from AI provider.'
      );
    }

    // Validate and sanitize data
    const validated = validator(parsedData);
    return createSuccessResponse(validated);
  } catch (err) {
    // Top-level error boundary
    if (fallbackData !== null || typeof mockDataGenerator === 'function') {
      try {
        const fallback = typeof mockDataGenerator === 'function'
          ? await mockDataGenerator(input)
          : fallbackData;
        return createSuccessResponse(validator(fallback));
      } catch (innerErr) {
        // Continue to error return
      }
    }
    return createErrorResponse(
      'AI_GENERATION_FAILED',
      'An unexpected error occurred during AI processing.'
    );
  }
}
