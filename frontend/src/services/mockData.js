// CreatorAI Shared Mock Data Store
// Designed to match contracts: contracts/creator.md, digital-twin.md, content.md, video.md, analytics.md

export const MOCK_CREATORS = [
  {
    id: 'creator_001',
    name: 'Aarav Sharma',
    email: 'aarav@creatorai.io',
    bio: 'Tech educator simplifying AI, Python, and developer tools for students and beginners.',
    primaryNiche: 'AI & Tech Education',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    socialHandles: {
      youtube: '@AaravTechExplains',
      instagram: '@aarav_codes',
      twitter: '@aarav_ai',
      linkedin: 'aaravsharma-tech',
      tiktok: '@aarav.ai'
    },
    followersCount: 86400,
    totalPosts: 142,
    avgViews: 48200,
    engagementRate: '8.7%',
    healthScore: 94,
    healthStatus: 'Optimal Growth',
    createdAt: '2026-09-15T08:30:00.000Z'
  },
  {
    id: 'creator_002',
    name: 'Priya Patel',
    email: 'priya@creatorai.io',
    bio: 'Design strategist sharing UX case studies, AI design workflows, and portfolio reviews.',
    primaryNiche: 'UI/UX & Product Design',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    socialHandles: {
      youtube: '@PriyaDesigns',
      instagram: '@priya.ux',
      twitter: '@priya_design',
      linkedin: 'priyapatel-ux',
      tiktok: '@priya_ux'
    },
    followersCount: 64200,
    totalPosts: 98,
    avgViews: 32600,
    engagementRate: '9.2%',
    healthScore: 91,
    healthStatus: 'Strong Retention',
    createdAt: '2026-09-20T11:15:00.000Z'
  }
];

export const MOCK_DIGITAL_TWINS = {
  creator_001: {
    twinId: 'twin_001',
    creatorId: 'creator_001',
    creatorName: 'Aarav Sharma',
    niche: 'AI & Tech Education',
    targetAudience: {
      demographic: 'College students, junior software developers, tech career switchers',
      painPoints: [
        'Overwhelmed by AI jargon & fast-changing tools',
        'Struggling to find hands-on beginner AI projects',
        'Needs fast tutorials under 60 seconds with clear visual proof'
      ],
      skillLevel: 'Beginner to Intermediate'
    },
    tone: {
      primary: 'friendly',
      attributes: ['encouraging', 'practical', 'hype-free', 'humorous', 'action-oriented']
    },
    preferredPlatforms: ['instagram', 'youtube', 'linkedin', 'x'],
    language: 'English (Conversational with mild tech vernacular)',
    goal: 'Scale YouTube to 100K subs & build high-converting dev education newsletter',
    contentStyle: {
      hookStyle: 'Curiosity gap + immediate visual demonstration in first 3 seconds',
      pacing: 'Fast, high-energy opening, concise step-by-step breakdown without fluff',
      visualAesthetics: 'Dark mode IDE, vibrant cyan/violet highlights, minimalist overlays',
      signaturePhrases: [
        "Let's build this in 60 seconds!",
        'No fluff, just code.',
        'Here is the secret developer shortcut most people miss.'
      ]
    },
    contentDNA: {
      bestTopics: [
        'Hands-on GenAI Projects',
        'VS Code Productivity Secrets',
        'Python Automation Scripts',
        'Agentic AI Frameworks'
      ],
      bestFormats: ['9:16 Vertical Reel/Short', 'Carousel Cheat Sheet', '10-minute Deep Dive'],
      bestHooks: [
        'Stop studying 8 hours a day. Here is what actually works...',
        '3 AI tools that will save you 15 hours of coding this week',
        'Why senior engineers never write boilerplate manually anymore'
      ],
      audienceInterests: ['Local LLMs', 'FastAPI', 'Figma to Code', 'Prompt Engineering'],
      successfulPatterns: [
        'Code demo in first 2 seconds increases completion by 42%',
        'Actionable prompt templates in captions drive 3x more saves',
        'Relatable student frustration hook beats generic announcements'
      ],
      weakAreas: [
        'Long theoretical intros drop 55% retention before 10 seconds',
        'LinkedIn text posts without visual carousels have 40% lower reach'
      ]
    },
    metricsSummary: {
      postsAnalyzed: 142,
      interactionsAnalyzed: 58400,
      patternsDiscovered: 19,
      lastUpdated: '2026-10-03T11:30:00.000Z'
    },
    aiSummary:
      'Aarav is an authentic, highly practical tech educator who bridges cutting-edge AI breakthroughs into punchy, reproducible code snippets. The digital twin enforces high retention pacing, avoids exaggerated hype, and prioritizes code-first visual proof within the first 3 seconds.'
  },
  creator_002: {
    twinId: 'twin_002',
    creatorId: 'creator_002',
    creatorName: 'Priya Patel',
    niche: 'UI/UX & Product Design',
    targetAudience: {
      demographic: 'UI/UX designers, product managers, indie hackers, design students',
      painPoints: [
        'Unclear design-to-code handoff',
        'Slow Figma prototyping workflows',
        'Difficulty creating cohesive design systems'
      ],
      skillLevel: 'Intermediate'
    },
    tone: {
      primary: 'inspiring',
      attributes: ['analytical', 'polished', 'empathetic', 'detail-oriented']
    },
    preferredPlatforms: ['linkedin', 'instagram', 'youtube'],
    language: 'English (Professional, empathetic, design-focused)',
    goal: 'Establish thought leadership in AI-assisted Product Design & launch masterclass',
    contentStyle: {
      hookStyle: 'Before vs After redesign critique with sharp visual contrast',
      pacing: 'Deliberate, aesthetic b-roll, high-fidelity visual zooms on micro-interactions',
      visualAesthetics: 'Pastel gradients, clean Figma canvas, minimalist typography',
      signaturePhrases: [
        'Good design is invisible, great design is unforgettable.',
        'Here is why this redesign works.',
        'Small tweaks that 10x user delight.'
      ]
    },
    contentDNA: {
      bestTopics: [
        'Design Systems from Scratch',
        'Figma AI Workflow Automations',
        'Micro-interactions & Animations',
        'Landing Page Conversion Critiques'
      ],
      bestFormats: ['LinkedIn Carousel', '16:9 Screen Recording Tutorial', 'Interactive Case Study'],
      bestHooks: [
        'Why Spotify redesigned their player UI (and what you should copy)',
        'Stop using boring button states. Try this interactive pattern instead.',
        'The 1-pixel mistake ruining your mobile layout'
      ],
      audienceInterests: ['Design Tokens', 'Tailwind CSS', 'Design System Governance', 'AI Prototypes'],
      successfulPatterns: [
        'Side-by-side Before/After slider visual hook boosts engagement by 64%',
        'Carousel breakdowns with swipe-worthy checklists drive heavy shares'
      ],
      weakAreas: ['Talking-head videos without on-screen Figma cursor movement']
    },
    metricsSummary: {
      postsAnalyzed: 98,
      interactionsAnalyzed: 41200,
      patternsDiscovered: 14,
      lastUpdated: '2026-10-03T11:45:00.000Z'
    },
    aiSummary:
      'Priya excels at aesthetic, highly structured design teardowns that teach product designers how to think systematically. The digital twin prioritizes visual polish, actionable design heuristics, and accessible design systems.'
  }
};

export const MOCK_OPPORTUNITIES = [
  {
    id: 'opp_001',
    creatorId: 'creator_001',
    title: 'Local LLMs on Your Laptop in Under 3 Minutes',
    description:
      'Capitalize on rising developer interest in running private offline AI models with Ollama and OpenWebUI without cloud subscriptions.',
    audienceFit: 96,
    contentFit: 94,
    relevance: 98,
    platform: 'Instagram & YouTube Shorts',
    format: '9:16 Vertical Reel',
    reason:
      'Your audience showed a 48% higher retention spike when local privacy tools were mentioned last month. Zero competitors in your niche have shown this with the new 2026 lightweight models.',
    supportingInsights: [
      'Search volume for "run deepseek locally" surged +140% this week',
      'Your previous terminal setup video had your highest share-to-view ratio (7.2%)',
      'Direct comments asking for "offline student coding tools" reached 34 instances'
    ],
    reasoningData: {
      trendScore: 9.8,
      urgency: 'High (Next 48 Hours)',
      competitorSaturation: 'Low in Tech Education Reels',
      estimatedReachMultiplier: '2.4x above baseline',
      targetAudienceKeywords: ['Ollama', 'Private AI', 'Mac/Windows Dev', 'Free AI'],
      recommendedHookFormula: 'Problem Agitation + 1-Click Solution visual proof',
      digitalTwinAlignment: 'Matches Aarav’s practical, no-hype coding tutorial DNA'
    }
  },
  {
    id: 'opp_002',
    creatorId: 'creator_001',
    title: 'Top 3 AI Debugging Extensions for VS Code in 2026',
    description:
      'A punchy, curated comparison of the newest AI extension updates that replace tedious console.log debugging.',
    audienceFit: 92,
    contentFit: 95,
    relevance: 91,
    platform: 'YouTube & LinkedIn',
    format: 'Carousel & 60s Video',
    reason:
      'VS Code content is consistently your highest performing Evergreen pillar. Developer tool recommendations have high bookmark and save rates.',
    supportingInsights: [
      'Previous VS Code video has 98.5K views with 82% retention',
      'Audience polls indicate 76% use VS Code daily',
      'High sponsor conversion potential for developer tooling brands'
    ],
    reasoningData: {
      trendScore: 8.9,
      urgency: 'Medium',
      competitorSaturation: 'Moderate',
      estimatedReachMultiplier: '1.8x above baseline',
      targetAudienceKeywords: ['VS Code Extensions', 'AI Coding', 'Copilot alternatives', 'Productivity'],
      recommendedHookFormula: 'Curiosity Gap + Instant Time Savings',
      digitalTwinAlignment: 'Leverages Aarav’s signature IDE dark mode aesthetic'
    }
  },
  {
    id: 'opp_003',
    creatorId: 'creator_001',
    title: 'Stop Building To-Do Apps: 3 AI Portfolio Projects That Get Hired',
    description:
      'Career-focused advice guiding junior developers to replace generic portfolio projects with real-world agentic AI prototypes.',
    audienceFit: 98,
    contentFit: 89,
    relevance: 95,
    platform: 'LinkedIn & Instagram',
    format: 'Carousel & Text Post',
    reason:
      'Hiring seasons create anxiety for students; career and portfolio advice yields 3.5x higher comment threads and saves.',
    supportingInsights: [
      'LinkedIn engagement is 62% higher on career transition topics',
      'Junior developers are asking how to stand out against AI layoffs',
      'High probability of viral reposting by recruiters and tech leads'
    ],
    reasoningData: {
      trendScore: 9.4,
      urgency: 'High',
      competitorSaturation: 'Moderate',
      estimatedReachMultiplier: '2.1x above baseline',
      targetAudienceKeywords: ['Junior Developer Portfolio', 'AI Projects', 'Tech Careers', 'Resume Tips'],
      recommendedHookFormula: 'Contrarian Statement + High Value Blueprint',
      digitalTwinAlignment: 'Directly solves core target audience pain point: career entry'
    }
  },
  {
    id: 'opp_004',
    creatorId: 'creator_001',
    title: 'Python Automation: Auto-Summarize Research Papers into Notion',
    description:
      'Step-by-step practical automation script connecting an open API to personal knowledge bases.',
    audienceFit: 88,
    contentFit: 92,
    relevance: 87,
    platform: 'YouTube',
    format: '16:9 In-Depth Walkthrough',
    reason:
      'Hands-on code walkthroughs with download links generate high mailing list subscribers and community loyalty.',
    supportingInsights: [
      'Notion + AI is a trending workflow search topic',
      'Scripts with GitHub repos attached get 4x more community stars'
    ],
    reasoningData: {
      trendScore: 8.4,
      urgency: 'Low',
      competitorSaturation: 'Medium',
      estimatedReachMultiplier: '1.5x above baseline',
      targetAudienceKeywords: ['Python Script', 'Notion API', 'Study Automation', 'Workflow'],
      recommendedHookFormula: 'Before/After manual workflow comparison',
      digitalTwinAlignment: 'Fulfills hands-on code expectation'
    }
  }
];

export const MOCK_CONTENT_ITEMS = [
  {
    contentId: 'content_001',
    creatorId: 'creator_001',
    title: 'AI in Education: Stop Studying 8 Hours a Day',
    topic: 'AI in education',
    platform: 'instagram',
    contentType: 'reel',
    status: 'published',
    views: 124000,
    likes: 14200,
    shares: 4800,
    retentionScore: 88,
    publishedAt: '2026-09-28T14:00:00.000Z'
  },
  {
    contentId: 'content_002',
    creatorId: 'creator_001',
    title: 'Top 3 VS Code Extensions for AI Devs',
    topic: 'VS Code extensions',
    platform: 'youtube',
    contentType: 'long_video_script',
    status: 'published',
    views: 98500,
    likes: 8900,
    shares: 2100,
    retentionScore: 82,
    publishedAt: '2026-09-25T16:30:00.000Z'
  },
  {
    contentId: 'content_003',
    creatorId: 'creator_001',
    title: 'Build a Real-Time Agentic AI Bot in 60s',
    topic: 'AI Agents',
    platform: 'linkedin',
    contentType: 'post',
    status: 'published',
    views: 45200,
    likes: 3840,
    shares: 1420,
    retentionScore: 91,
    publishedAt: '2026-09-22T09:15:00.000Z'
  },
  {
    contentId: 'content_004',
    creatorId: 'creator_001',
    title: 'Why Most Junior Devs Fail AI Prompts',
    topic: 'Prompt Engineering',
    platform: 'instagram',
    contentType: 'reel',
    status: 'draft',
    views: 0,
    likes: 0,
    shares: 0,
    retentionScore: null,
    publishedAt: null
  }
];

export const MOCK_STUDIO_GENERATIONS = {
  youtube: {
    title: 'Run ANY Open-Source AI Locally on Your Laptop (Complete 2026 Beginner Guide)',
    hook: 'What if you could run ChatGPT-level AI on your laptop without paying $20/month, without internet, and completely private? In this video, I will show you how to do it in 3 minutes.',
    script: `[0:00 - 0:15] Hook: Show terminal launching a lightning fast local model while unplugged from Wi-Fi.
[0:15 - 0:45] Why Local AI Matters: Privacy, cost, and zero rate limits.
[0:45 - 2:00] Step 1: Install Ollama in 1 click (Windows, Mac, Linux).
[2:00 - 4:00] Step 2: Pick the best lightweight model for 8GB or 16GB RAM.
[4:00 - 6:30] Step 3: Connect OpenWebUI for a beautiful ChatGPT-like browser interface.
[6:30 - 7:45] Bonus: How to feed your private code or PDF files into the local model.
[7:45 - 8:30] Outro & CTA: Download the step-by-step cheatsheet in description. Subscribe for weekly developer blueprints!`,
    description: `Learn how to run private, offline AI models directly on your laptop in under 3 minutes! No cloud bills, no privacy leaks, and zero subscriptions.\n\n📌 Code & Setup Commands:\n👉 Download Ollama: https://ollama.ai\n👉 Cheat sheet repo: https://github.com/creator-ai/local-llm-guide\n\nTIMESTAMPS:\n0:00 - The Offline AI Demo\n0:45 - Prerequisites & RAM Specs\n2:00 - Installing Ollama\n4:00 - Picking Models\n6:30 - WebUI Setup\n\n#LocalAI #OpenSource #DevTools #Python #ArtificialIntelligence`
  },
  instagram: {
    carousel: [
      'Slide 1: Stop paying for AI subscriptions. Run it FREE & OFFLINE on your laptop 💻🔥 (Swipe for the 3-step setup)',
      'Slide 2: 1. Download Ollama (free CLI tool for macOS, Windows, Linux). It manages all open-source models with zero configuration.',
      'Slide 3: 2. Run your first model: open terminal and type `ollama run llama3:8b`. That’s literally it.',
      'Slide 4: 3. Want a ChatGPT UI? Run Open-WebUI via Docker in 1 command and chat with your local documents privately.',
      'Slide 5: Pro-Tip: Works 100% offline on airplanes, coffee shops, and protects sensitive company code.',
      'Slide 6: Save this post & comment "LOCAL" to get my one-page terminal command cheatsheet sent straight to your DMs!'
    ],
    caption: `You don’t need an $8,000 server to run cutting-edge AI in 2026 🤯 Most developers don’t realize that an ordinary 16GB laptop can run world-class models faster than cloud APIs without spending a penny.\n\nSave this post so you have the setup ready for your next hacking weekend! 🚀`,
    hashtags: ['#LocalAI', '#TechTutorial', '#DeveloperTips', '#ProgrammingHumor', '#SoftwareEngineer', '#AITools', '#CodingLife'],
    cta: 'Comment "LOCAL" below and I’ll DM you the exact 1-click install script!'
  },
  reel: {
    hook: 'Stop paying $20 every single month for AI! Here is how to run it 100% free, offline on your laptop in 60 seconds.',
    script: `[0:00 - 0:03] Face to camera holding laptop: "Stop paying $20 every month for AI subscriptions."
[0:03 - 0:10] Cut to screen: "Go to Ollama.com, click download for your operating system."
[0:10 - 0:25] Open terminal, zoom in on cursor typing: "Type 'ollama run deepseek-r1:8b' and hit enter."
[0:25 - 0:42] Show prompt responding in real-time with zero Wi-Fi connection: "Notice my Wi-Fi is turned off. Pure local speed, completely private."
[0:42 - 0:55] "Add OpenWebUI on top if you want the classic browser interface."
[0:55 - 1:00] Hold laptop: "Drop a comment with 'OFFLINE' and I'll send you my curated list of top 5 lightweight models!"`,
    cta: 'Drop a comment with "OFFLINE" to get the 3-minute setup cheatsheet.'
  },
  linkedin: {
    headline: 'Why 72% of Engineering Teams are Moving to Local AI (And how to set it up in 3 minutes)',
    post: `Cloud AI APIs are incredible until you get hit with two things:\n1. Strict data compliance and confidentiality limits.\n2. Unexpected monthly token bills at scale.\n\nIn 2026, 8B-parameter open source models run effortlessly on standard developer laptops at 45 tokens per second.\n\nHere is the exact 3-step stack I recommend to our engineering students:\n\n1. Engine: Ollama (runs locally with automated Apple Silicon / CUDA acceleration)\n2. Interface: OpenWebUI (self-hosted ChatGPT equivalent)\n3. Orchestration: LangChain / LlamaIndex local bindings\n\nZero data leaves your machine. Zero latency bottlenecks during Wi-Fi outages.\n\nHave you experimented with local LLM deployments in your team yet? What models are you finding most reliable?`,
    cta: 'Share your thoughts in the comments or repost to help your fellow developer network.'
  }
};

export const MOCK_ANALYZER_RESULTS = {
  overallScore: 88,
  hookScore: 92,
  clarity: 89,
  audienceFit: 94,
  cta: 82,
  originality: 85,
  strengths: [
    'Outstanding curiosity gap in the first sentence with clear value promise',
    'High resonance with junior developer demographic looking to optimize study time',
    'Concrete, actionable steps rather than generic platitudes',
    'Authentic tone calibrated closely to your Digital Twin persona'
  ],
  weaknesses: [
    'Call to action could be more specific regarding what starter files are included',
    'Step 2 assumes knowledge of voice mode which may require a 3-second visual pointer',
    'Hashtag group slightly over-indexes on general student tags rather than developer tags'
  ],
  suggestions: [
    'Include a 2-second on-screen text counter: "Step 1 of 3" to boost retention pacing',
    'Change the CTA trigger word to a punchier 4-letter keyword like "CODE" or "FLOW"',
    'Add an explicit reminder that this workflow works on both Windows and macOS'
  ]
};

export const MOCK_CRITIC_RESULTS = {
  overallScore: 86,
  hook: 90,
  clarity: 88,
  audienceFit: 92,
  originality: 84,
  cta: 78,
  strengths: [
    'Strong contrast between expensive cloud services and free local computing',
    'Matches Aarav’s signature "no fluff, just code" delivery style',
    'Pacing is tight and fits within the standard 60-second retention curve'
  ],
  problems: [
    'The call-to-action is standard and lacks an urgency trigger',
    'Does not address whether 8GB RAM laptops will run smoothly',
    'Opening visual transition could be sharper to grab scrollers immediately'
  ],
  suggestions: [
    'Add a quick 2-word overlay: "Works on 8GB RAM!" to eliminate viewer hesitation',
    'Upgrade CTA to offer a downloadable 1-page PDF command cheat sheet',
    'Make the first 2 seconds punchier with a visual "WiFi disconnected" icon'
  ],
  improvedVersion: {
    hook: 'Your laptop can run ChatGPT-level AI completely OFFLINE in 2026 — even with just 8GB RAM. Here is how in 60 seconds.',
    script: `[0:00 - 0:03] Hold up laptop with Wi-Fi toggled OFF: "Your laptop can run ChatGPT-level AI completely OFFLINE — even on 8GB RAM."
[0:03 - 0:12] Quick screen grab: "Step 1: Download Ollama. Free, open source, 1-click install."
[0:12 - 0:28] Terminal punch-in: "Step 2: Type 'ollama run deepseek-r1:8b'. It downloads and spins up a local model on your CPU or GPU automatically."
[0:28 - 0:45] Fast typing demo: "Zero internet. 100% private code. Infinite free queries with 0 token limits."
[0:45 - 0:52] Split screen with OpenWebUI: "Want the ChatGPT interface? Just hook it up to OpenWebUI in 1 command."
[0:52 - 1:00] CTA: "Comment 'OFFLINE' and I'll send you my 1-page terminal cheatsheet + the top 3 models for 8GB laptops!"`,
    caption: `Yes, you can run cutting-edge AI with ZERO Wi-Fi and ZERO subscriptions 🤯 Even an 8GB MacBook or Windows laptop can do this smoothly in 2026.\n\nSave this post for your next project and comment "OFFLINE" to get the complete setup cheat sheet in your DMs! 🚀`,
    cta: 'Comment "OFFLINE" for the free 1-page setup cheat sheet & RAM compatibility guide!'
  }
};

export const MOCK_ANALYTICS = {
  creatorId: 'creator_001',
  period: '30d',
  summary: {
    totalViews: 482500,
    viewsGrowth: '+23.4%',
    totalLikes: 38400,
    likesGrowth: '+18.9%',
    totalComments: 6420,
    commentsGrowth: '+28.1%',
    totalShares: 9150,
    sharesGrowth: '+34.5%',
    totalFollowers: 86400,
    followersGrowth: '+4,200',
    averageEngagementRate: '8.7%',
    estimatedWatchTimeHours: 3210
  },
  performanceOverTime: [
    { date: 'Sep 04', views: 12400, engagement: 1100, followers: 82300 },
    { date: 'Sep 08', views: 16800, engagement: 1540, followers: 82900 },
    { date: 'Sep 12', views: 24500, engagement: 2300, followers: 83500 },
    { date: 'Sep 16', views: 19800, engagement: 1820, followers: 84100 },
    { date: 'Sep 20', views: 32000, engagement: 3100, followers: 84800 },
    { date: 'Sep 24', views: 44200, engagement: 4250, followers: 85400 },
    { date: 'Sep 28', views: 58000, engagement: 5600, followers: 86000 },
    { date: 'Oct 02', views: 49200, engagement: 4780, followers: 86400 }
  ],
  platformBreakdown: [
    {
      platform: 'instagram',
      name: 'Instagram',
      followers: 45200,
      views: 265000,
      engagementRate: '9.2%',
      postsCount: 14,
      growth: '+18.2%'
    },
    {
      platform: 'youtube',
      name: 'YouTube',
      followers: 28400,
      views: 182000,
      engagementRate: '7.9%',
      postsCount: 6,
      growth: '+26.8%'
    },
    {
      platform: 'linkedin',
      name: 'LinkedIn',
      followers: 12800,
      views: 35500,
      engagementRate: '6.8%',
      postsCount: 10,
      growth: '+31.4%'
    }
  ],
  topPerformingContent: [
    {
      contentId: 'content_001',
      title: 'AI in Education: Stop Studying 8 Hours a Day',
      platform: 'Instagram',
      format: 'Reel',
      views: 124000,
      likes: 14200,
      comments: 2150,
      shares: 4800,
      retentionScore: 88,
      status: 'High Performer'
    },
    {
      contentId: 'content_002',
      title: 'Top 3 VS Code Extensions for AI Devs',
      platform: 'YouTube',
      format: 'Video',
      views: 98500,
      likes: 8900,
      comments: 1420,
      shares: 2100,
      retentionScore: 82,
      status: 'Steady Evergreen'
    },
    {
      contentId: 'content_003',
      title: 'Build a Real-Time Agentic AI Bot in 60s',
      platform: 'LinkedIn',
      format: 'Post',
      views: 45200,
      likes: 3840,
      comments: 890,
      shares: 1420,
      retentionScore: 91,
      status: 'High Viral Save'
    },
    {
      contentId: 'content_005',
      title: 'The Clean Python Checklist for Beginners',
      platform: 'Instagram',
      format: 'Carousel',
      views: 38400,
      likes: 3120,
      comments: 640,
      shares: 1120,
      retentionScore: 84,
      status: 'High Saves'
    }
  ],
  aiInsights: [
    'Reels published between 6 PM - 8 PM IST receive 38% higher completion rate and 2.4x more saves.',
    'Tutorials featuring split-screen terminal demonstrations outperform single-camera talking head videos by 2.1x.',
    'LinkedIn audience shows massive appetite for practical prompt breakdowns with step-by-step code snippets.',
    'Saves-to-reach ratio is highest on carousel cheat sheets (7.4%), making them your best driver of follower conversion.',
    'Videos mentioning "Local AI" and "Offline" generate 3x more comments asking for direct download links.'
  ]
};

export const MOCK_LEARNING_CENTER = {
  metrics: {
    postsAnalyzed: 142,
    interactionsAnalyzed: 58400,
    successfulContent: 84,
    averageContent: 46,
    underperformingContent: 12,
    accuracyScore: 94.8,
    modelCalibrationVersion: 'v2.4.1 (Oct 2026)'
  },
  detectedPatterns: [
    {
      id: 'pat_001',
      tag: 'New Pattern Detected',
      type: 'high_impact',
      title: 'Practical Hands-On Tutorials Outperform General Tech News',
      description:
        'Your audience has shown 64% higher watch time and 3.2x more comments with actionable step-by-step code builds compared to abstract AI industry news summaries.',
      detectedDate: 'Yesterday, 18:30 IST',
      confidence: '98%',
      actionRecommendation: 'Prioritize tactical build guides in your weekly schedule.'
    },
    {
      id: 'pat_002',
      tag: 'Hook Optimization',
      type: 'positive',
      title: 'Immediate On-Screen Terminal Proof in First 2 Seconds',
      description:
        'Videos where code or live execution appears within the first 120 frames hold 78% viewer retention past the 15-second benchmark, compared to 34% when showing personal greeting intros.',
      detectedDate: '3 days ago',
      confidence: '95%',
      actionRecommendation: 'Apply immediate screen recording b-roll on every short-form hook.'
    },
    {
      id: 'pat_003',
      tag: 'Content Decay Alert',
      type: 'warning',
      title: 'General "Top 5 AI Websites" Formats Experiencing Fatigue',
      description:
        'Audience engagement with generic multi-tool listicles has dropped by 22% over the last 45 days as viewers demand deeper single-tool mastery.',
      detectedDate: 'Last week',
      confidence: '91%',
      actionRecommendation: 'Pivot listicles toward comprehensive workflows solving 1 specific problem.'
    },
    {
      id: 'pat_004',
      tag: 'Platform Synergy',
      type: 'positive',
      title: 'Reels to LinkedIn Carousel Repurposing Yields 180% Extra Reach',
      description:
        'Converting vertical reel scripts into 5-slide PDF carousels generates 12,000+ incremental views on LinkedIn with zero new filming overhead.',
      detectedDate: '2 weeks ago',
      confidence: '96%',
      actionRecommendation: 'Use the AI Studio multi-platform export on every approved script.'
    }
  ],
  workflowLoop: [
    {
      stage: 'ANALYZE',
      stepNumber: 1,
      description: 'Ingest past content, viewer watch-time curves, saves, and comment semantics.',
      status: 'Active'
    },
    {
      stage: 'UNDERSTAND',
      stepNumber: 2,
      description: 'Calibrate your Creator Digital Twin voice, hook preferences, and topical authority.',
      status: 'Active'
    },
    {
      stage: 'RECOMMEND',
      stepNumber: 3,
      description: 'Surface high-urgency opportunity cards with algorithmic audience-fit reasoning.',
      status: 'Active'
    },
    {
      stage: 'CREATE',
      stepNumber: 4,
      description: 'Generate multi-platform adapted scripts, carousels, and video storyboards.',
      status: 'Active'
    },
    {
      stage: 'CRITIQUE',
      stepNumber: 5,
      description: 'Run deep AI content audits to eliminate weak hooks, pacing drops, and vague CTAs.',
      status: 'Active'
    },
    {
      stage: 'LEARN',
      stepNumber: 6,
      description: 'Measure post performance and feed signals back into your Digital Twin memory.',
      status: 'Active'
    }
  ]
};

export const MOCK_VIDEO_DATA = {
  videoId: 'video_001',
  creatorId: 'creator_001',
  title: 'Local LLMs on Your Laptop - 60s Reel',
  status: 'completed',
  progressPercentage: 100,
  aspectRatio: '9:16',
  durationSeconds: 58,
  scenes: [
    {
      sceneNumber: 1,
      timestamp: '0:00 - 0:03',
      narration: 'Stop paying $20 every month for AI subscriptions.',
      visualPrompt: 'Close up modern desk with glowing holographic study plan, smooth cinematic camera push-in',
      bRollKeywords: ['student desk', 'hologram', 'focus'],
      renderedClipUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'
    },
    {
      sceneNumber: 2,
      timestamp: '0:03 - 0:15',
      narration: 'Go to Ollama.com, click download for your operating system.',
      visualPrompt: 'Screen recording UI showing 1-click terminal setup',
      bRollKeywords: ['ui demo', 'ai prompt', 'flashcards'],
      renderedClipUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
    },
    {
      sceneNumber: 3,
      timestamp: '0:15 - 0:38',
      narration: 'Type ollama run deepseek-r1:8b and watch it execute offline.',
      visualPrompt: 'Fast typing demo in dark IDE with code highlights',
      bRollKeywords: ['terminal', 'dark mode', 'python'],
      renderedClipUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'
    },
    {
      sceneNumber: 4,
      timestamp: '0:38 - 0:58',
      narration: 'Comment OFFLINE and I will DM you the exact 1-page setup cheatsheet!',
      visualPrompt: 'Aarav holding laptop with smiling friendly outro badge',
      bRollKeywords: ['creator outro', 'cta', 'cheatsheet'],
      renderedClipUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
    }
  ],
  clipCandidates: [
    {
      id: 'clip_01',
      title: 'Hook Clip: Offline AI Reveal',
      timestamp: '0:00 - 0:08',
      duration: '8s',
      viralScore: 94,
      suggestedPlatform: 'Instagram Reel'
    },
    {
      id: 'clip_02',
      title: 'Action Clip: 1-Click Terminal Command',
      timestamp: '0:15 - 0:32',
      duration: '17s',
      viralScore: 89,
      suggestedPlatform: 'YouTube Shorts'
    },
    {
      id: 'clip_03',
      title: 'CTA Clip: Free Cheatsheet Comment Trigger',
      timestamp: '0:48 - 0:58',
      duration: '10s',
      viralScore: 86,
      suggestedPlatform: 'TikTok'
    }
  ],
  assets: [
    {
      id: 'asset_01',
      name: 'Ollama_Terminal_ScreenRecording.mp4',
      type: 'video',
      size: '42.8 MB',
      duration: '02:14',
      uploadedAt: 'Today, 14:20'
    },
    {
      id: 'asset_02',
      name: 'A_Roll_TalkingHead_Take2.mp4',
      type: 'video',
      size: '124.5 MB',
      duration: '03:40',
      uploadedAt: 'Today, 14:25'
    },
    {
      id: 'asset_03',
      name: 'Local_LLM_Script_v3.md',
      type: 'script',
      size: '4.2 KB',
      uploadedAt: 'Today, 13:10'
    },
    {
      id: 'asset_04',
      name: 'Cyberpunk_LoFi_BGM.mp3',
      type: 'audio',
      size: '6.8 MB',
      duration: '02:45',
      uploadedAt: 'Yesterday'
    }
  ]
};
