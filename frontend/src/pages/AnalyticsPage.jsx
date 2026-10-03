import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { api } from '../services/api';
import { BarChart3, Eye, Heart, Share2, Clock, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AnalyticsPage = ({ creator }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalytics(creator?.id || 'creator_001')
      .then((res) => {
        if (res.data) setAnalytics(res.data);
      })
      .catch((err) => {
        console.error('Analytics load error:', err);
      })
      .finally(() => setLoading(false));
  }, [creator]);

  const platformData = analytics?.platformBreakdown?.map((item) => ({
    name: item.platform.charAt(0).toUpperCase() + item.platform.slice(1),
    views: item.views,
    followers: item.followers || item.subscribers || 0,
  })) || [
    { name: 'Instagram', views: 265000, followers: 45200 },
    { name: 'YouTube', views: 182000, followers: 28400 },
    { name: 'LinkedIn', views: 35500, followers: 12800 },
  ];

  return (
    <div>
      <Header
        title="Creator Analytics & Insights"
        subtitle="Cross-platform performance tracking and AI-driven growth recommendations."
        action={
          <Badge variant="primary">
            <Sparkles size={12} /> Last 30 Days
          </Badge>
        }
      />

      {/* Metrics Row */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <StatCard
          title="Total Views"
          value={analytics?.summary?.totalViews ? `${(analytics.summary.totalViews / 1000).toFixed(1)}K` : '482.5K'}
          change={analytics?.summary?.viewsGrowth || '+23.4%'}
          icon={Eye}
        />
        <StatCard
          title="Total Engagement"
          value={analytics?.summary?.totalLikes ? `${(analytics.summary.totalLikes / 1000).toFixed(1)}K Likes` : '38.4K'}
          change="+18.9%"
          icon={Heart}
        />
        <StatCard
          title="Estimated Watch Time"
          value={analytics?.summary?.estimatedWatchTimeHours ? `${analytics.summary.estimatedWatchTimeHours} hrs` : '3,210 hrs'}
          change="+14.5%"
          icon={Clock}
        />
      </div>

      {/* Platform Chart & AI Insights */}
      <div className="grid-2">
        {/* Platform Breakdown Chart */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} color="var(--primary)" /> Views by Platform
          </h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232e48" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#182032', borderColor: '#232e48', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Actionable Insights */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-cyan)" /> AI Growth Intelligence
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(analytics?.aiInsights || [
              "Reels published between 6 PM - 8 PM IST receive 38% higher retention.",
              "Tutorials with split-screen hooks outperform single-camera videos by 2.1x.",
              "LinkedIn audience engages heavily with practical prompt breakdowns."
            ]).map((insight, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderLeft: '3px solid var(--accent-cyan)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                }}
              >
                {insight}
              </div>
            ))}

            <div style={{
              marginTop: '12px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              fontSize: '12px',
              color: 'var(--accent-green)',
            }}>
              💡 <strong>Strategy Tip:</strong> Feeding analytics back into the Digital Twin automatically refines subsequent hook generation!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
