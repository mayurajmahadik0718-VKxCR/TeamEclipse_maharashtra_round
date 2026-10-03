import { loadMockData } from '../utils/dataLoader.js';

let analyticsData = loadMockData('analytics.json');

export const analyticsService = {
  getByCreatorId: (creatorId, period = '30d') => {
    const existing = analyticsData.find((a) => a.creatorId === creatorId);
    if (existing) {
      return { ...existing, period };
    }

    // Default fallback mock analytics if requested for another creator ID
    return {
      creatorId,
      period,
      summary: {
        totalViews: 125000,
        viewsGrowth: "+15.2%",
        totalLikes: 9800,
        totalShares: 2100,
        averageEngagementRate: "7.4%",
        estimatedWatchTimeHours: 940
      },
      platformBreakdown: [
        { platform: "instagram", followers: 15400, views: 72000, engagementRate: "8.1%", postsCount: 8 },
        { platform: "youtube", subscribers: 9200, views: 43000, engagementRate: "6.9%", postsCount: 3 },
        { platform: "linkedin", followers: 4500, views: 10000, engagementRate: "5.8%", postsCount: 5 }
      ],
      topPerformingContent: [
        {
          contentId: "content_mock",
          title: "Introduction to Creator Digital Twin",
          platform: "instagram",
          views: 45000,
          likes: 4200,
          shares: 1100,
          retentionScore: 85
        }
      ],
      aiInsights: [
        "Focus on 60-second vertical reels for the highest conversion rate.",
        "Your community engages most when you show real-world workflows."
      ],
      lastCalculated: new Date().toISOString()
    };
  }
};
