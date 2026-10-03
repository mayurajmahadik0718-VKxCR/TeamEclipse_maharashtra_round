import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import LoadingSkeleton from '../components/LoadingSkeleton';
import {
  BarChart3,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Users,
  TrendingUp,
  Sparkles,
  Layers,
  ArrowUpRight,
  Lightbulb,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { analyticsService } from '../services/analyticsService';

export const AnalyticsPage = ({ creator }) => {
  const [period, setPeriod] = useState('30d');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartMetric, setChartMetric] = useState('views');

  useEffect(() => {
    setLoading(true);
    analyticsService
      .getCreatorAnalytics(creator?.id || 'creator_001', period)
      .then((res) => {
        if (res?.data) setAnalytics(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [creator?.id, period]);

  const summary = analytics?.summary || {
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
  };

  const performanceData = analytics?.performanceOverTime || [
    { date: 'Sep 04', views: 12400, engagement: 1100, followers: 82300 },
    { date: 'Sep 08', views: 16800, engagement: 1540, followers: 82900 },
    { date: 'Sep 12', views: 24500, engagement: 2300, followers: 83500 },
    { date: 'Sep 16', views: 19800, engagement: 1820, followers: 84100 },
    { date: 'Sep 20', views: 32000, engagement: 3100, followers: 84800 },
    { date: 'Sep 24', views: 44200, engagement: 4250, followers: 85400 },
    { date: 'Sep 28', views: 58000, engagement: 5600, followers: 86000 },
    { date: 'Oct 02', views: 49200, engagement: 4780, followers: 86400 },
  ];

  const platformData = analytics?.platformBreakdown?.map((p) => ({
    name: p.name || p.platform,
    views: p.views,
    followers: p.followers,
    engagementRate: parseFloat(p.engagementRate) || 8.0,
  })) || [
    { name: 'Instagram', views: 265000, followers: 45200, engagementRate: 9.2 },
    { name: 'YouTube', views: 182000, followers: 28400, engagementRate: 7.9 },
    { name: 'LinkedIn', views: 35500, followers: 12800, engagementRate: 6.8 },
  ];

  const topContent = analytics?.topPerformingContent || [];
  const aiInsights = analytics?.aiInsights || [];

  return (
    <div>
      <Header
        title="Performance Analytics"
        subtitle="Consolidated cross-platform telemetry, audience velocity, and AI-detected growth levers."
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['7d', '30d', '90d'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: `1px solid ${period === p ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: period === p ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-card)',
                  color: period === p ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        }
      />

      {loading ? (
        <LoadingSkeleton count={3} height="120px" />
      ) : (
        <>
          {/* 6 Stats Cards: Views, Likes, Comments, Shares, Followers, Engagement Rate */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <StatCard
              title="Views"
              value={(summary.totalViews / 1000).toFixed(1) + 'K'}
              change={summary.viewsGrowth}
              icon={Eye}
            />
            <StatCard
              title="Likes"
              value={(summary.totalLikes / 1000).toFixed(1) + 'K'}
              change={summary.likesGrowth || '+18.9%'}
              icon={Heart}
            />
            <StatCard
              title="Comments"
              value={(summary.totalComments || 6420).toLocaleString()}
              change={summary.commentsGrowth || '+28.1%'}
              icon={MessageSquare}
            />
            <StatCard
              title="Shares"
              value={(summary.totalShares || 9150).toLocaleString()}
              change={summary.sharesGrowth || '+34.5%'}
              icon={Share2}
            />
            <StatCard
              title="Followers"
              value={(summary.totalFollowers / 1000).toFixed(1) + 'K'}
              change={summary.followersGrowth || '+4.2K'}
              icon={Users}
            />
            <StatCard
              title="Engagement Rate"
              value={summary.averageEngagementRate || '8.7%'}
              change="+1.2%"
              icon={TrendingUp}
            />
          </div>

          {/* Charts Section: Performance Over Time & Views by Platform */}
          <div className="grid-2" style={{ marginBottom: '28px' }}>
            {/* Performance Over Time Chart */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Performance Over Time</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Velocity trendline</span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setChartMetric('views')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: chartMetric === 'views' ? '#6366f1' : 'transparent',
                      color: chartMetric === 'views' ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                    }}
                  >
                    Views
                  </button>
                  <button
                    onClick={() => setChartMetric('engagement')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: chartMetric === 'engagement' ? '#10b981' : 'transparent',
                      color: chartMetric === 'engagement' ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                    }}
                  >
                    Engagement
                  </button>
                  <button
                    onClick={() => setChartMetric('followers')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: chartMetric === 'followers' ? '#a855f7' : 'transparent',
                      color: chartMetric === 'followers' ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                    }}
                  >
                    Followers
                  </button>
                </div>
              </div>

              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={chartMetric === 'views' ? '#6366f1' : chartMetric === 'engagement' ? '#10b981' : '#a855f7'}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={chartMetric === 'views' ? '#6366f1' : chartMetric === 'engagement' ? '#10b981' : '#a855f7'}
                          stopOpacity={0.0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#232e48" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#182032',
                        borderColor: '#232e48',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={chartMetric}
                      stroke={chartMetric === 'views' ? '#6366f1' : chartMetric === 'engagement' ? '#10b981' : '#a855f7'}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#metricGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Views by Platform Bar Chart */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Platform Distribution</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Views across channels</span>
                </div>
                <Badge variant="cyan">Cross-Platform</Badge>
              </div>

              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#232e48" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#182032',
                        borderColor: '#232e48',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Bar dataKey="views" fill="#818cf8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Content Performance Table */}
          <div className="card" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Content Performance Matrix</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Individual post metrics and retention scores</span>
              </div>
              <Badge variant="primary">{topContent.length} Posts Analyzed</Badge>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Content Title</th>
                    <th>Platform</th>
                    <th>Format</th>
                    <th>Views</th>
                    <th>Likes</th>
                    <th>Shares</th>
                    <th>Retention</th>
                    <th>AI Classification</th>
                  </tr>
                </thead>
                <tbody>
                  {topContent.map((item) => (
                    <tr key={item.contentId}>
                      <td style={{ fontWeight: 600 }}>{item.title}</td>
                      <td>
                        <Badge variant="cyan">{item.platform}</Badge>
                      </td>
                      <td>{item.format}</td>
                      <td style={{ fontWeight: 700 }}>{(item.views / 1000).toFixed(1)}K</td>
                      <td>{(item.likes / 1000).toFixed(1)}K</td>
                      <td>{item.shares?.toLocaleString() || '1.4K'}</td>
                      <td>
                        <span style={{ color: item.retentionScore >= 85 ? '#34d399' : '#818cf8', fontWeight: 700 }}>
                          {item.retentionScore}%
                        </span>
                      </td>
                      <td>
                        <Badge variant={item.status.includes('High') ? 'success' : 'purple'}>
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insights Section: Clearly Labeled as AI-Generated Observations */}
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
              borderColor: 'rgba(99, 102, 241, 0.35)',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(99, 102, 241, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818cf8',
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>AI-Generated Observations & Intelligence</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Continuous algorithmic analysis trained on your performance history
                  </span>
                </div>
              </div>

              <Badge variant="cyan">
                <Sparkles size={12} /> Autonomous AI Observation Engine
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
              {aiInsights.map((insight, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    backgroundColor: 'rgba(10, 13, 20, 0.6)',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span style={{ color: '#22d3ee', fontWeight: 800, fontSize: '16px', lineHeight: 1.2 }}>•</span>
                  <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
