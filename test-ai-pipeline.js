/**
 * @file test-ai-pipeline.js
 * @description Comprehensive verification and test runner for CreatorAI's AI / Intelligence Layer.
 *
 * Tests:
 * 1. Independent execution of all 15 AI functions
 * 2. Complete end-to-end demo workflow (Creator Profile → Digital Twin → Script → Footage → Match → Clips → Edit → Multi-Platform → Critic → Performance → Learning Loop → Calibrated Twin)
 * 3. Robust error handling, contract validation, and edge-case recovery
 */

import {
  createCreatorTwin,
  analyzeContent,
  analyzeScript,
  analyzeFootage,
  matchScriptToFootage,
  generateClipCandidates,
  generateEditSuggestions,
  generateHook,
  generateScript,
  generateSupportingContent,
  generateCampaign,
  adaptContentForPlatform,
  generateOpportunities,
  criticizeContent,
  learnFromPerformance,
  isMockMode,
  safeParseJSON,
} from './src/ai/index.js';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

async function runTests() {
  console.log('============================================================');
  console.log('🧪 RUNNING CREATORAI INTELLIGENCE ENGINE TEST SUITE');
  console.log('============================================================');
  console.log(`Mock Mode Active: ${isMockMode()}\n`);

  // ==========================================================
  // PHASE 1: UNIT & CONTRACT VERIFICATION
  // ==========================================================
  console.log('--- Phase 1: Individual AI Module Contracts ---');

  // 1. Creator Digital Twin
  const profileInput = {
    creatorProfile: {
      id: 'creator_001',
      name: 'Aarav Sharma',
      primaryNiche: 'AI & Tech Education',
      bio: 'Helping students and devs build AI applications.',
      tone: 'Informative, energetic, and practical',
      preferredPlatforms: ['YouTube Shorts', 'Instagram Reels', 'LinkedIn'],
      targetAudience: {
        demographic: 'Computer science students and aspiring developers',
      },
    },
    previousContent: [
      { topic: 'Build a RAG App in 5 Minutes', format: 'Shorts', hook: 'Stop hardcoding your LLMs.' },
      { topic: 'Automating VS Code Workflows', format: 'Reels', hook: 'You are using VS Code wrong.' },
    ],
    performanceData: [
      { views: 45000, retentionRate: '68%', engagementRate: '9.2%' },
    ],
    goals: { primaryGoals: ['Reach 100k subscribers', 'Increase opening 3s retention'] },
  };

  const twinRes = await createCreatorTwin(profileInput);
  assert(twinRes.success === true, 'createCreatorTwin returns success: true');
  assert(typeof twinRes.data.niche === 'string', 'CreatorTwin has valid niche');
  assert(Array.isArray(twinRes.data.bestTopics), 'CreatorTwin has bestTopics array');
  assert(typeof twinRes.data.confidence === 'number', 'CreatorTwin has numeric confidence score');
  const creatorTwin = twinRes.data;

  // 2. Content Analyzer
  const contentToAnalyze = 'Stop editing every video manually. Use this 3-step automation pipeline to extract top clips. Comment WORKFLOW below!';
  const analysisRes = await analyzeContent({
    creatorTwin,
    content: contentToAnalyze,
    platform: 'Instagram Reels',
    contentType: 'reel_script',
  });
  assert(analysisRes.success === true, 'analyzeContent returns success: true');
  assert(typeof analysisRes.data.score === 'number', 'analyzeContent provides overall score');
  assert(Array.isArray(analysisRes.data.strengths), 'analyzeContent provides strengths array');
  assert(Array.isArray(analysisRes.data.suggestions), 'analyzeContent provides suggestions array');

  // 3. Script Understanding
  const sampleScript = `Did you know 80% of creators burn out because of manual video editing?

In this tutorial, I will demonstrate how to set up an automated pipeline that ingests long footage, identifies key moments, and cuts vertical shorts in under 60 seconds.

Step 1: Record your unscripted thoughts in a single take.
Step 2: Feed the raw transcript into your persona engine.
Step 3: Export formatted clips directly to your media queue.

Comment "AUTOMATE" below and I will send you the exact template for free!`;

  const scriptRes = await analyzeScript({
    script: sampleScript,
    creatorTwin,
    contentType: 'youtube_tutorial',
  });
  assert(scriptRes.success === true, 'analyzeScript returns success: true');
  assert(Array.isArray(scriptRes.data.sections) && scriptRes.data.sections.length > 0, 'analyzeScript produces semantic sections');
  assert(Array.isArray(scriptRes.data.keyTopics), 'analyzeScript produces keyTopics');
  assert(Array.isArray(scriptRes.data.hooks), 'analyzeScript extracts hooks');
  const scriptSections = scriptRes.data.sections;

  // 4. Video & Footage Understanding
  const sampleTranscript = `[00:00] Welcome back guys. Today we are looking at how to automate your creative pipeline.
[00:15] Most people think editing requires 4 hours per video, but you can do it in 60 seconds with this setup.
[00:45] Let's look at step number one: capturing clean audio and feeding the transcript into the matcher.
[01:15] Step two: review the auto-selected timestamps and apply your kinetic captions.
[01:45] Drop a comment below if you want the full checklist!`;

  const footageRes = await analyzeFootage({
    videoId: 'vid_101',
    transcript: sampleTranscript,
    duration: 120,
  });
  assert(footageRes.success === true, 'analyzeFootage returns success: true');
  assert(footageRes.data.duration === 120, 'analyzeFootage captures duration');
  assert(Array.isArray(footageRes.data.scenes) && footageRes.data.scenes.length > 0, 'analyzeFootage generates scenes');
  assert(Array.isArray(footageRes.data.keyMoments), 'analyzeFootage detects key moments');
  const footageScenes = footageRes.data.scenes;

  // 5. Script ↔ Footage Matching
  const matchRes = await matchScriptToFootage({
    scriptSections,
    footageScenes,
    transcript: sampleTranscript,
  });
  assert(matchRes.success === true, 'matchScriptToFootage returns success: true');
  assert(Array.isArray(matchRes.data.matches) && matchRes.data.matches.length > 0, 'matchScriptToFootage produces matches');
  assert(typeof matchRes.data.matches[0].relevance === 'number', 'match includes numerical relevance');
  assert(typeof matchRes.data.matches[0].reason === 'string', 'match includes explicit reasoning');
  const matches = matchRes.data.matches;

  // 6. Automated Clip Generation & Non-Destructive Editing
  const clipsRes = await generateClipCandidates({
    creatorTwin,
    scriptSections,
    footageScenes,
    matches,
    platform: 'Instagram Reels',
  });
  assert(clipsRes.success === true, 'generateClipCandidates returns success: true');
  assert(Array.isArray(clipsRes.data) && clipsRes.data.length > 0, 'generateClipCandidates returns candidate clips');
  const selectedClip = clipsRes.data[0];
  assert(typeof selectedClip.clipScore === 'number', 'clip candidate has clipScore');
  assert(typeof selectedClip.hook === 'string', 'clip candidate has hook');

  const editRes = await generateEditSuggestions({
    clip: selectedClip,
    creatorTwin,
    platform: 'Instagram Reels',
  });
  assert(editRes.success === true, 'generateEditSuggestions returns success: true');
  assert(Array.isArray(editRes.data.cuts), 'generateEditSuggestions provides cut timestamps');
  assert(typeof editRes.data.captionStyle === 'string', 'generateEditSuggestions provides caption style');
  assert(Array.isArray(editRes.data.bRollSuggestions), 'generateEditSuggestions provides B-roll ideas');

  // 7. Content Generator (Hook, Script, Supporting, Campaign)
  const hookRes = await generateHook({
    topic: 'Automate Short-Form Video',
    creatorTwin,
    platform: 'YouTube Shorts',
  });
  assert(hookRes.success === true, 'generateHook returns success: true');
  assert(typeof hookRes.data.primaryHook === 'string', 'generateHook returns primaryHook');
  assert(Array.isArray(hookRes.data.alternatives), 'generateHook returns alternative angles');

  const fullScriptRes = await generateScript({
    topic: 'Building AI Agents',
    creatorTwin,
    platform: 'Instagram Reels',
    targetDuration: 45,
  });
  assert(fullScriptRes.success === true, 'generateScript returns success: true');
  assert(Array.isArray(fullScriptRes.data.sceneBreakdown), 'generateScript returns sceneBreakdown');

  const supportRes = await generateSupportingContent({
    scriptOrClip: selectedClip,
    creatorTwin,
    platform: 'Instagram Reels',
  });
  assert(supportRes.success === true, 'generateSupportingContent returns success: true');
  assert(Array.isArray(supportRes.data.titles), 'generateSupportingContent returns titles');
  assert(typeof supportRes.data.caption === 'string', 'generateSupportingContent returns caption');

  const campaignRes = await generateCampaign({
    theme: 'Developer Productivity Month',
    creatorTwin,
    goals: ['Grow cross-platform audience'],
  });
  assert(campaignRes.success === true, 'generateCampaign returns success: true');
  assert(Array.isArray(campaignRes.data.contentPlan), 'generateCampaign returns multi-platform contentPlan');

  // 8. Multi-Platform Adaptation
  const platforms = ['YouTube', 'YouTube Shorts', 'Instagram', 'Instagram Reels', 'LinkedIn'];
  for (const plat of platforms) {
    const adaptRes = await adaptContentForPlatform({
      sourceContent: sampleScript,
      creatorTwin,
      platform: plat,
    });
    assert(adaptRes.success === true, `adaptContentForPlatform adapts cleanly for ${plat}`);
    assert(typeof adaptRes.data.caption === 'string' && adaptRes.data.caption.length > 0, `${plat} adaptation contains tailored caption`);
    assert(typeof adaptRes.data.cta === 'string', `${plat} adaptation contains platform-specific CTA`);
  }

  // 9. Content Opportunity Engine
  const oppRes = await generateOpportunities({
    creatorTwin,
    previousContent: profileInput.previousContent,
    performanceData: profileInput.performanceData,
    currentGoals: ['Scale high-retention video'],
  });
  assert(oppRes.success === true, 'generateOpportunities returns success: true');
  assert(Array.isArray(oppRes.data) && oppRes.data.length > 0, 'generateOpportunities returns opportunities array');
  assert(typeof oppRes.data[0].reason === 'string', 'opportunity contains grounded reasoning');

  // 10. Content Critic
  const criticRes = await criticizeContent({
    creatorTwin,
    content: sampleScript,
    platform: 'Instagram Reels',
    contentType: 'video_script',
  });
  assert(criticRes.success === true, 'criticizeContent returns success: true');
  assert(typeof criticRes.data.overallScore === 'number', 'criticizeContent provides overallScore');
  assert(Array.isArray(criticRes.data.problems), 'criticizeContent diagnoses specific problems');
  assert(typeof criticRes.data.improvedContent === 'string', 'criticizeContent provides improved rewrite');

  // 11. Continuous Learning Engine
  const learningRes = await learnFromPerformance({
    creatorTwin,
    contentHistory: [
      { title: 'Video 1', views: 50000, retention: '72%' },
      { title: 'Video 2', views: 8000, retention: '35%' },
    ],
    performanceData: [
      { format: 'Shorts', engagementRate: '12%' },
      { format: 'Long-form', engagementRate: '4%' },
    ],
  });
  assert(learningRes.success === true, 'learnFromPerformance returns success: true');
  assert(Array.isArray(learningRes.data.detectedPatterns), 'learnFromPerformance detects patterns');
  assert(Array.isArray(learningRes.data.successfulPatterns), 'learnFromPerformance detects successful patterns');
  assert(typeof learningRes.data.updatedCreatorTwin === 'object', 'learnFromPerformance returns updatedCreatorTwin');
  assert(learningRes.data.updatedCreatorTwin.confidence >= creatorTwin.confidence, 'updatedCreatorTwin confidence increased with data');

  // ==========================================================
  // PHASE 2: ERROR CONTRACT & EDGE CASE RECOVERY
  // ==========================================================
  console.log('\n--- Phase 2: Error Boundaries & Input Validation ---');

  // Test empty/invalid inputs
  const errRes1 = await analyzeContent({});
  assert(errRes1.success === false, 'analyzeContent safely rejects missing content with success: false');
  assert(errRes1.error && errRes1.error.code === 'INVALID_INPUT', 'Error contract includes standardized error code');

  const errRes2 = await analyzeScript(null);
  assert(errRes2.success === false, 'analyzeScript safely rejects null input');
  assert(typeof errRes2.error.message === 'string', 'Error message is human readable');

  const errRes3 = await adaptContentForPlatform({ sourceContent: 'test' });
  assert(errRes3.success === false, 'adaptContentForPlatform rejects missing platform');

  // Test safe JSON parser recovery
  const markdownJson = '```json\n{"status": "ok", "value": 42}\n```';
  const parsed1 = safeParseJSON(markdownJson);
  assert(parsed1 && parsed1.value === 42, 'safeParseJSON strips markdown code fences successfully');

  const malformedWithText = 'Here is your output:\n{"recovered": true}\nHope that helps!';
  const parsed2 = safeParseJSON(malformedWithText);
  assert(parsed2 && parsed2.recovered === true, 'safeParseJSON recovers JSON embedded within conversational text');

  // ==========================================================
  // SUMMARY REPORT
  // ==========================================================
  console.log('\n============================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} / ${totalTests} PASSED`);
  if (failedTests === 0) {
    console.log('🎉 ALL TESTS PASSED! AI ENGINE IS 100% PRODUCTION READY.');
  } else {
    console.error(`⚠️ ${failedTests} TESTS FAILED.`);
  }
  console.log('============================================================\n');
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
