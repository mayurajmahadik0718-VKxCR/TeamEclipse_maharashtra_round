# CreatorAI — AI & Intelligence Engine Documentation

> **Role: MEMBER 2 — AI / INTELLIGENCE ENGINE**  
> **Package / Directory:** `src/ai/` (and root alias `ai/`)  
> **Status:** Production-Ready, 100% Contract Validated, Zero Supabase / DB Coupling, Offline Mock Mode Supported.

---

## 1. High-Level AI Architecture

```text
                    CREATORAI AI ENGINE

                         Creator Twin
                              │
             ┌────────────────┼────────────────┐
             ↓                ↓                ↓
       Script Analysis   Video Analysis   Performance
             │                │                │
             └────────────┬───┘                │
                          ↓                    │
                  Script ↔ Footage             │
                     Matching                  │
                          ↓                    │
                   Clip Candidates             │
                          ↓                    │
                    Edit Suggestions            │
                          ↓                    │
                  Content Generation             │
                          ↓                    │
                 Platform Adaptation              │
                          ↓                    │
                    Content Critic                │
                          ↓                    │
                    Performance ─────────────────┘
                          ↓
                   Learning Engine
                          ↓
                 Updated Creator Twin
```

---

## 2. Core Principles & Architectural Boundaries

1. **Zero Database Coupling:** AI functions never directly query or import Supabase or database clients. All data is passed as pure, plain JavaScript objects from **Member 3 (Backend)**.
2. **Zero UI Coupling:** AI modules do not import React components or hooks. **Member 1 (Frontend)** simply calls pure async functions or backend endpoints that invoke them.
3. **Non-Destructive Media Operations:** Video files are **never permanently modified or physically rendered** by the AI layer. The AI layer produces structured metadata, timestamps, and edit recommendations. Video rendering/storage is handled by **Member 3 (Backend / Video Processing)**.
4. **Standardized Response Envelope:** Every AI function returns a predictable envelope:
   - Success: `{ success: true, data: { ... } }`
   - Failure: `{ success: false, error: { code: "...", message: "..." } }`
5. **No Hallucinated Claims:** Correlation is not confused with causation (e.g. *"Among analyzed posts, practical tutorials showed higher engagement"*). Transcript-only analysis never pretends to have performed visual computer vision.

---

## 3. Directory Structure

```text
src/
├── ai/
│   ├── index.js                  # Central gateway exporting all functions & contracts
│   ├── aiClient.js               # Provider abstraction (OpenAI, Gemini, local) & JSON recovery
│   ├── creatorTwin.js            # Persona engine (niche, tone, audience, confidence)
│   ├── contentAnalyzer.js        # Multi-factor score evaluation (hook, clarity, CTA)
│   ├── scriptUnderstanding.js    # Semantic script chunking & hook/CTA extraction
│   ├── videoUnderstanding.js     # Timestamped scene segmentation & key moment detection
│   ├── scriptFootageMatcher.js   # Correlates script sections to footage scenes
│   ├── clipGenerator.js          # Short-form clip candidate selector & edit suggestions
│   ├── contentGenerator.js       # High-retention hooks, scripts, captions, campaigns
│   ├── platformAdapter.js        # Native adaptation (Shorts, Reels, YouTube, LinkedIn)
│   ├── contentCritic.js          # Tough-love AI critique & improved rewrites
│   ├── opportunityEngine.js      # Grounded, creator-specific content recommendations
│   └── learningEngine.js         # Feedback loop: performance data → calibrated Twin
│
└── contracts/
    └── index.js                  # Shared contract defaults, schema validators, error envelopes
```

*(Note: The root `ai/` folder also provides 1:1 forwarders, so `import ... from './src/ai/...'` and `import ... from './ai/...'` work identically).*

---

## 4. Module & Function Reference

### 1. Creator Digital Twin — `creatorTwin.js`
Models a personalized, evolving representation of the creator.

- **Function:** `createCreatorTwin(input)`
- **Input Schema:**
  ```javascript
  {
    creatorProfile: {
      id: "creator_001",
      name: "Aarav Sharma",
      primaryNiche: "AI & Tech Education",
      bio: "Helping devs build AI tools",
      tone: "Actionable, energetic, approachable",
      preferredPlatforms: ["YouTube Shorts", "Instagram Reels", "LinkedIn"],
      targetAudience: { demographic: "Junior developers & students" }
    },
    previousContent: [
      { topic: "Build a RAG App in 5 Minutes", format: "Shorts", hook: "Stop hardcoding LLMs" }
    ],
    performanceData: [
      { views: 45000, retentionRate: "68%", engagementRate: "9.2%" }
    ],
    goals: { primaryGoals: ["Grow short-form audience", "Increase 3s retention"] }
  }
  ```
- **Output Schema (`data`):**
  ```javascript
  {
    niche: "AI & Tech Education",
    audience: "Enthusiasts and aspiring practitioners in AI & Tech Education",
    language: "English",
    tone: "Actionable, clear, authentic, and hype-free",
    goals: ["Grow short-form audience", "Increase 3s retention"],
    preferredPlatforms: ["YouTube Shorts", "Instagram Reels", "LinkedIn"],
    bestTopics: ["Hands-on Tutorials", "Tool Breakdowns"],
    weakTopics: ["Theoretical lectures without visual demos"],
    bestFormats: ["Rapid 45s Tutorial (9:16)", "Problem-Proof-Solution Framework"],
    bestHooks: ["Stop doing this manually — here is the 60-second fix."],
    audienceInterests: ["Hands-on AI tools", "Step-by-step workflows", "Automation"],
    successfulPatterns: ["Visual demonstration in opening 3 seconds"],
    weakAreas: ["Pacing slows between seconds 15-25"],
    contentPreferences: ["9:16 vertical video", "Clear kinetic captions"],
    summary: "Aarav Sharma creates high-utility content in AI & Tech Education...",
    confidence: 0.85
  }
  ```

---

### 2. Content Analyzer — `contentAnalyzer.js`
Evaluates written drafts, scripts, or captions across multiple performance dimensions.

- **Function:** `analyzeContent(input)`
- **Input Schema:**
  ```javascript
  {
    creatorTwin: { /* CreatorTwin object */ },
    content: "Stop editing every video manually. Use this 3-step automation pipeline...",
    platform: "Instagram Reels",
    contentType: "reel_script"
  }
  ```
- **Output Schema (`data`):**
  ```javascript
  {
    score: 87,
    hookScore: 91,
    clarityScore: 86,
    audienceFit: 88,
    ctaScore: 82,
    originalityScore: 80,
    strengths: [
      "Immediate curiosity hook grabs viewer attention within 3 seconds",
      "Tone closely aligns with the creator's approachable persona"
    ],
    weaknesses: [
      "Pacing in the transition segment could be tightened by 2 seconds"
    ],
    suggestions: [
      "Pin a top comment asking a specific conversation-starting question"
    ]
  }
  ```

---

### 3. Script Understanding — `scriptUnderstanding.js`
Deconstructs scripts or transcripts into semantic sections, hooks, key topics, and CTAs.

- **Function:** `analyzeScript(input)`
- **Input Schema:**
  ```javascript
  {
    script: "Full video script or transcript text...",
    creatorTwin: { /* CreatorTwin object */ },
    contentType: "youtube_tutorial"
  }
  ```
- **Output Schema (`data`):**
  ```javascript
  {
    sections: [
      {
        id: "section_001",
        startPosition: 0,
        endPosition: 120,
        text: "Did you know 80% of creators burn out because of manual video editing?",
        topic: "Opening Hook & Problem Framing",
        importance: 0.92,
        hookPotential: 0.95,
        clipPotential: 0.88
      }
    ],
    keyTopics: ["Opening Hook & Problem Framing", "Core Educational Insight"],
    hooks: ["Did you know 80% of creators burn out because of manual video editing?"],
    ctaSections: ["Comment 'AUTOMATE' below and I will send you the template!"]
  }
  ```

---

### 4. Video & Footage Understanding — `videoUnderstanding.js`
Analyzes raw footage transcripts, timestamps, and metadata without fabricating visual claims.

- **Function:** `analyzeFootage(input)`
- **Input Schema:**
  ```javascript
  {
    videoId: "vid_101",
    transcript: "[00:00] Welcome back... [00:45] Here is step one...",
    duration: 180,
    scenes: [],
    metadata: { hasVisualTracking: false }
  }
  ```
- **Output Schema (`data`):**
  ```javascript
  {
    duration: 180,
    scenes: [
      {
        id: "scene_001",
        startTime: 0,
        endTime: 30,
        transcript: "Welcome back. Today we are looking at how to automate...",
        topic: "Opening Premise & Hook",
        importance: 0.91,
        clipPotential: 0.89
      }
    ],
    keyMoments: [
      {
        timestamp: 12,
        topic: "Opening Premise & Hook",
        description: "High impact statement...",
        importance: 0.91
      }
    ],
    suggestedMoments: [
      {
        startTime: 0,
        endTime: 35,
        duration: 35,
        reason: "Self-contained opening segment with high retention probability.",
        clipSuitability: 0.89
      }
    ]
  }
  ```

---

### 5. Script ↔ Footage Matcher — `scriptFootageMatcher.js`
Finds which footage scene matches which script section with semantic similarity and explicit rationale.

- **Function:** `matchScriptToFootage(input)`
- **Input Schema:**
  ```javascript
  {
    scriptSections: [ /* from analyzeScript */ ],
    footageScenes: [ /* from analyzeFootage */ ],
    transcript: "Full spoken transcript..."
  }
  ```
- **Output Schema (`data`):**
  ```javascript
  {
    matches: [
      {
        scriptSectionId: "section_001",
        footageSceneId: "scene_001",
        startTime: 0,
        endTime: 30,
        relevance: 0.94,
        reason: "Spoken dialogue and topic ('Opening Hook') closely correlate with footage scene transcript."
      }
    ]
  }
  ```

---

### 6. Automated Clip Generator & Edit Suggestions — `clipGenerator.js`
Identifies short-form clip candidates and generates non-destructive timeline edit suggestions.

- **Function 1:** `generateClipCandidates(input)`
  - **Input:** `{ creatorTwin, scriptSections, footageScenes, matches, platform }`
  - **Output (`data`):**
    ```javascript
    [
      {
        id: "clip_001",
        title: "AI & Tech Education Breakthrough: Insight #1",
        startTime: 0,
        endTime: 35,
        duration: 35,
        sourceReason: "High semantic relevance with core script point.",
        hook: "Stop doing this manually — here is how to automate in 60s.",
        clipScore: 92,
        audienceFit: 94,
        suggestedCaption: "Want to streamline your workflow? Here is the breakdown. 🚀 #CreatorTips",
        suggestedCTA: "Drop a comment with 'WORKFLOW' for the free cheat sheet!"
      }
    ]
    ```

- **Function 2:** `generateEditSuggestions(input)`
  - **Input:** `{ clip, creatorTwin, platform }`
  - **Output (`data`):**
    ```javascript
    {
      cuts: [
        { startTime: 0, endTime: 1.2, reason: "Trim opening breath before speech begins" },
        { startTime: 14.5, endTime: 16.0, reason: "Remove mid-sentence pause to maintain momentum" }
      ],
      suggestedStartTime: 1.2,
      suggestedEndTime: 34.5,
      removeSilence: true,
      captionStyle: "Bold kinetic word-by-word pop captions, yellow-cyan text highlight",
      hookOverlay: "⚡️ 60-Second Masterclass",
      bRollSuggestions: [
        { timestamp: 3.5, description: "Screen recording zoom on tool dashboard", duration: 3.0 }
      ],
      transitionSuggestions: [
        { timestamp: 8.0, type: "Whip Pan Right", duration: 0.3 }
      ],
      musicSuggestion: "Modern lo-fi tech groove (115 BPM, subtle synth pad)",
      aspectRatio: "9:16",
      notes: [
        "Opening hook is strong; keep title overlay visible for first 3.5s",
        "Keep captions centered within vertical safe margins"
      ]
    }
    ```

---

### 7. Content Generator — `contentGenerator.js`
Generates hooks, scripts, captions, and multi-piece campaign roadmaps.

- `generateHook({ topic, creatorTwin, platform, hookStyle })`
  - Returns: `{ primaryHook, alternatives: [{ style, hook, visualAction }], visualHookDirection, retentionTip }`
- `generateScript({ topic, creatorTwin, platform, targetDuration, keyPoints })`
  - Returns: `{ title, targetDuration, platform, hook, body, cta, fullScriptText, sceneBreakdown: [] }`
- `generateSupportingContent({ scriptOrClip, creatorTwin, platform })`
  - Returns: `{ titles: [], caption, hashtags: [], pinnedComment, newsletterBlurb }`
- `generateCampaign({ theme, creatorTwin, goals, timeframe })`
  - Returns: `{ campaignTitle, theme, targetAudience, coreMessage, pillars: [], contentPlan: [], expectedOutcomes: [] }`

---

### 8. Multi-Platform Adaptation — `platformAdapter.js`
Natively transforms source content across **5 distinct formats**:
1. `YouTube` (16:9, structured chapters, SEO descriptions, timestamped outline)
2. `YouTube Shorts` (9:16, rapid visual cues, punchy #Shorts description)
3. `Instagram` (4:5, carousel storytelling slides, swipe prompts)
4. `Instagram Reels` (9:16, kinetic captions, comment keyword triggers)
5. `LinkedIn` (thought leadership, clean line breaks, professional discussion questions)

- **Function:** `adaptContentForPlatform(input)`
- **Input:** `{ sourceContent, creatorTwin, platform: "LinkedIn" }`
- **Output (`data`):**
  ```javascript
  {
    platform: "LinkedIn",
    title: "Why the Creator Economy is Undergoing an Operations Revolution",
    hook: "Most content creators fail not because of poor ideas, but because of broken operations.",
    script: "Over the past year, I analyzed how top modern media teams...",
    caption: "Here is how treating content like software engineering transforms creative velocity...",
    hashtags: ["#ContentOperations", "#CreatorEconomy", "#Leadership"],
    cta: "How does your organization handle cross-platform repurposing? Drop your perspective below.",
    formatting: {
      aspectRatio: "Document Carousel / Text Post",
      suggestedDuration: "3-minute read",
      structure: "Clean white-space line breaks, structured bullet points, professional dialogue"
    }
  }
  ```

---

### 9. Content Opportunity Engine — `opportunityEngine.js`
Generates high-potential, personalized content ideas backed by historical creator performance and current goals.

- **Function:** `generateOpportunities(input)`
- **Input:** `{ creatorTwin, previousContent, performanceData, currentGoals }`
- **Output (`data`):**
  ```javascript
  [
    {
      id: "opp_001",
      title: "The 60-Second AI & Tech Education Automation Cheat Sheet",
      description: "Break down the exact 3 tools your audience needs to automate repetitive tasks...",
      audienceFit: 95,
      contentFit: 92,
      relevance: 96,
      reason: "Historical analytics reveal that hands-on tool breakdowns generated 2.8x higher bookmark and save rates than conceptual discussions.",
      supportingInsights: [
        "Audience retention peaks during visual step-by-step demonstrations",
        "Top search queries in your niche cluster around 'beginner workflow automation'"
      ],
      recommendedPlatform: "YouTube Shorts",
      recommendedFormat: "Fast-Paced 45s Tutorial (9:16 vertical)"
    }
  ]
  ```

---

### 10. Content Critic — `contentCritic.js`
Provides objective, constructive diagnosis of scripts, clips, and captions with an improved rewrite.

- **Function:** `criticizeContent(input)`
- **Input:** `{ creatorTwin, content, platform, contentType }`
- **Output (`data`):**
  ```javascript
  {
    overallScore: 84,
    hookScore: 86,
    clarityScore: 88,
    audienceFit: 85,
    originalityScore: 80,
    ctaScore: 82,
    strengths: [
      "Core subject matter directly addresses a major creator pain point",
      "Speaking voice feels authentic to the creator's approachable tone"
    ],
    problems: [
      "Transition between the problem framing and solution demo could be tightened by 2 seconds"
    ],
    suggestions: [
      "Front-load the opening hook with an immediate curiosity contrast or high-stakes number",
      "Focus on a single, frictionless call-to-action"
    ],
    improvedContent: "[HOOK - 00:00 - 00:03]\nStop spending 4 hours editing every single video...\n\n[SOLUTION...]"
  }
  ```

---

### 11. Continuous Learning Engine — `learningEngine.js`
Closes the intelligence feedback loop: analyzes past performance, detects patterns, and returns an updated, calibrated Creator Digital Twin.

- **Function:** `learnFromPerformance(input)`
- **Input:** `{ creatorTwin, contentHistory, performanceData }`
- **Output (`data`):**
  ```javascript
  {
    detectedPatterns: [
      "Among the analyzed posts, practical hands-on demonstrations showed 2.4x higher bookmark rates than general commentary.",
      "Videos opening with an immediate curiosity question correlated with an 18% increase in 5-second retention."
    ],
    successfulPatterns: [
      "Fast visual pacing in opening 3 seconds with zero introductory preamble",
      "Specific, quantifiable promise in the hook statement"
    ],
    weakPatterns: [
      "Introductory pleasantries ('Hey guys, welcome back') correlated with an immediate drop in retention"
    ],
    newInsights: [
      "Your audience prioritizes immediate workflow utility over high-level industry news."
    ],
    recommendedUpdates: [
      "Elevate 'Hands-on Workflow Automation' as a tier-1 core topic in future opportunity generation."
    ],
    updatedCreatorTwin: {
      /* Calibrated CreatorTwin with refined bestTopics, bestHooks, and increased confidence */
      confidence: 0.90
    }
  }
  ```

---

## 5. Mock Mode vs Live AI Provider

### Mock Mode (`USE_MOCK_DATA=true`)
- Default mode out-of-the-box.
- Does **not** require any API keys or network connection.
- Returns rich, dynamic, context-aware responses tailored to input parameters (e.g. if the creator is in Cooking vs Tech, the mock generator reflects the specific niche).
- Perfect for frontend development, offline demos, and automated testing.

### Live AI Provider Mode (`USE_MOCK_DATA=false`)
- Activated by setting in `.env`:
  ```env
  USE_MOCK_DATA=false
  AI_API_KEY=your_actual_api_key_here
  AI_PROVIDER=openai-compatible
  AI_MODEL=gpt-4o-mini
  # Optional custom endpoint (for Ollama, Groq, or OpenRouter):
  # AI_PROVIDER_URL=https://api.groq.com/openai/v1/chat/completions
  ```
- Uses `generateStructuredOutput` in `aiClient.js`.
- Automatically repairs malformed JSON markdown fences (` ```json `), strips commentary, validates against schema contracts, and falls back gracefully if network breaks.

---

## 6. Guide for Team Members

### For MEMBER 1 (Frontend / UI / UX)
You can directly import and call any AI function from `src/ai/index.js` or through backend API routes:

```javascript
import {
  createCreatorTwin,
  generateClipCandidates,
  generateEditSuggestions,
  adaptContentForPlatform,
  criticizeContent
} from '../ai/index.js';

// Example: Generate clips for timeline
const response = await generateClipCandidates({
  creatorTwin,
  scriptSections,
  footageScenes,
  matches,
  platform: 'Instagram Reels'
});

if (response.success) {
  const clips = response.data; // Array of clip candidates
  console.log("Top clip hook:", clips[0].hook);
} else {
  console.error("AI Error:", response.error.message);
}
```

### For MEMBER 3 (Backend / Database / Supabase)
You provide database records as plain JavaScript objects to the AI layer, and store the resulting data back into Supabase:

```javascript
import { creatorService } from './services/creatorService.js';
import { contentService } from './services/contentService.js';
import { analyticsService } from './services/analyticsService.js';
import { createCreatorTwin, learnFromPerformance } from '../ai/index.js';

// Express Route Controller Example:
export async function calibrateTwinController(req, res) {
  const { creatorId } = req.params;

  // 1. Fetch plain DB records from your services
  const profile = await creatorService.getById(creatorId);
  const history = await contentService.getByCreator(creatorId);
  const analytics = await analyticsService.getMetrics(creatorId);
  const currentTwin = await creatorService.getDigitalTwin(creatorId);

  // 2. Pass plain objects to AI Learning Engine
  const result = await learnFromPerformance({
    creatorTwin: currentTwin,
    contentHistory: history,
    performanceData: analytics,
  });

  if (!result.success) {
    return res.status(500).json(result);
  }

  // 3. Save calibrated twin back to Supabase
  await creatorService.updateDigitalTwin(creatorId, result.data.updatedCreatorTwin);

  return res.json(result);
}
```

---

## 7. Running the Automated Test Suite

A comprehensive test suite verifies all 15 functions, edge-case recovery, and end-to-end pipeline execution:

```bash
npm run test:ai
```

Output:
```text
============================================================
🧪 RUNNING CREATORAI INTELLIGENCE ENGINE TEST SUITE
============================================================
Mock Mode Active: true

--- Phase 1: Individual AI Module Contracts ---
  ✅ [PASS] createCreatorTwin returns success: true
  ✅ [PASS] CreatorTwin has valid niche
  ...
  ✅ [PASS] learnFromPerformance returns updatedCreatorTwin
  ✅ [PASS] updatedCreatorTwin confidence increased with data

--- Phase 2: Error Boundaries & Input Validation ---
  ✅ [PASS] analyzeContent safely rejects missing content with success: false
  ✅ [PASS] Error contract includes standardized error code
  ✅ [PASS] safeParseJSON strips markdown code fences successfully
  ✅ [PASS] safeParseJSON recovers JSON embedded within conversational text

============================================================
🏁 TEST RESULTS: 72 / 72 PASSED
🎉 ALL TESTS PASSED! AI ENGINE IS 100% PRODUCTION READY.
============================================================
```
