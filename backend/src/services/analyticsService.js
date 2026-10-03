import { supabase } from '../config/supabase.js';

export const analyticsService = {
  getByCreatorId: async (creatorId, period = '30d') => {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const rows = data || [];

    const totalViews = rows.reduce((sum, row) => sum + (row.views || 0), 0);
    const totalLikes = rows.reduce((sum, row) => sum + (row.likes || 0), 0);
    const totalComments = rows.reduce((sum, row) => sum + (row.comments || 0), 0);

    const averageEngagementRate =
      totalViews > 0
        ? (((totalLikes + totalComments) / totalViews) * 100).toFixed(2) + '%'
        : '0%';

    return {
      creatorId,
      period,
      summary: {
        totalViews,
        totalLikes,
        totalComments,
        averageEngagementRate,
        contentCount: rows.length,
      },
      topPerformingContent: rows
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5)
        .map((row) => ({
          contentId: row.content_id,
          views: row.views || 0,
          likes: row.likes || 0,
          comments: row.comments || 0,
          engagement: row.engagement || 0,
        })),
      lastCalculated: new Date().toISOString(),
    };
  },
};
