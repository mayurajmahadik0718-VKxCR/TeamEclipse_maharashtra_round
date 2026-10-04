import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import HealthScoreCard from '../components/HealthScoreCard';
import OpportunityCard from '../components/OpportunityCard';
import Modal from '../components/Modal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import {
  Users,
  TrendingUp,
  FileText,
  Eye,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Bot,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { opportunityService } from '../services/opportunityService';
import { contentService } from '../services/contentService';
import { analyticsService } from '../services/analyticsService';

export const Dashboard = ({ creator, digitalTwin }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [recentContent, setRecentContent] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReasoning, setSelectedReasoning] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      opportunityService.getOpportunities(creator?.id || 'creator_001'),
      contentService.getRecentContent(creator?.id || 'creator_001'),
      analyticsService.getCreatorAnalytics(creator?.id || 'creator_001', '30d'),
    ])
      .then(([oppsRes, contentRes, analyticsRes]) => {
        if (!isMounted) return;
        if (oppsRes?.data) setOpportunities(oppsRes.data);
        if (contentRes?.data) setRecentContent(contentRes.data);
        if (analyticsRes?.data) setAnalyticsData(analyticsRes.data);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load dashboard data');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [creator?.id]);

  const topOpportunity = opportunities[0] || null;

  const handleCreateCampaign = (opp) => {
    navigate('/content-studio', { state: { prefilledOpportunity: opp } });
  };

  const handleViewReasoning = (opp) => {
    setSelectedReasoning(opp);
  };

  if (loading) {
    return (
      <div>
        <Header
          title={`Welcome back, ${creator?.name || 'Creator'} 👋`}
          subtitle="Loading your CreatorAI command center and recommendations..."
        />
        <LoadingSkeleton count={3} height="120px" />
      </div>
    );
  }

  const performanceSeries = analyticsData?.performanceOverTime || [
    { date: 'Mon', views: 42000, engagement: 3800 },
    { date: 'Tue', views: 58000, engagement: 5200 },
    { date: 'Wed', views: 71000, engagement: 6400 },
    { date: 'Thu', views: 64000, engagement: 5900 },
    { date: 'Fri', views: 89000, engagement: 7900 },
    { date: 'Sat', views: 112000, engagement: 9800 },
    { date: 'Sun', views: 98000, engagement: 8700 },
  ];

  return (
    <div>
      <Header
        title={`Welcome back, ${creator?.name || 'Creator'} 👋`}
        subtitle="Here is your algorithmic performance, Digital Twin vitality, and high-urgency content opportunities."
        action={
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/opportunities" className="btn-secondary" style={{ fontSize: '13px' }}>
              <Sparkles size={15} /> All Opportunities
            </Link>
            <Link to="/content-studio" className="btn-primary" style={{ fontSize: '13px' }}>
              <Sparkles size={15} /> Launch Studio
            </Link>
          </div>
        }
      />

      {/* Health Score & Digital Twin Capsule */}
      <div className="grid-2 stagger-container" style={{ marginBottom: '24px' }}>
        <HealthScoreCard
          score={creator?.healthScore || 94}
          status={creator?.healthStatus || 'Optimal Growth'}
          metrics={{
            consistency: '96%',
            retention: '92%',
            platformSynergy: '94%',
          }}
        />

        <div
          className="card card-lift stagger-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Bot size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Creator Digital Twin Model</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Synchronized to {creator?.name}
                  </span>
                </div>
              </div>
              <Badge variant="cyan">Tone: {digitalTwin?.tone?.primary || 'Friendly'}</Badge>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              {digitalTwin?.aiSummary ||
                'Your Digital Twin actively models your tone, signature catchphrases, and visual pacing to prevent robotic content generation.'}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              142 posts analyzed • 19 patterns discovered
            </span>
            <Link to="/digital-twin" style={{ fontSize: '13px', color: '#818cf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View Twin DNA <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid: Followers, Engagement, Total Posts, Average Views */}
      <div className="grid-3 stagger-container" style={{ marginBottom: '28px' }}>
        <StatCard
          title="Followers"
          value={creator?.followersCount ? `${(creator.followersCount / 1000).toFixed(1)}K` : '86.4K'}
          change="+4,200 (30d)"
          icon={Users}
          note="Across YouTube, Instagram, LinkedIn"
        />
        <StatCard
          title="Engagement"
          value={creator?.engagementRate || '8.7%'}
          change="+1.2%"
          icon={TrendingUp}
          note="Industry average is 3.5%"
        />
        <StatCard
          title="Total Posts"
          value={creator?.totalPosts || 142}
          change="+12 this month"
          icon={FileText}
          note="64% short video, 36% long/carousel"
        />
        <StatCard
          title="Average Views"
          value={creator?.avgViews ? `${(creator.avgViews / 1000).toFixed(1)}K` : '48.2K'}
          change="+23.4%"
          icon={Eye}
          note="Peak reach per publication"
        />
      </div>

      {/* AI Recommendation: "WHAT SHOULD YOU CREATE NEXT?" */}
      <div className="animate-fade-in-up" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', fontWeight: 800 }}>
              Algorithmic Content Recommendation
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              WHAT SHOULD YOU CREATE NEXT?
            </h2>
          </div>
          <Link to="/opportunities" style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View all 4 opportunities &rarr;
          </Link>
        </div>

        {topOpportunity ? (
          <OpportunityCard
            opportunity={topOpportunity}
            onViewReasoning={handleViewReasoning}
            onCreateCampaign={handleCreateCampaign}
          />
        ) : (
          <EmptyState
            icon={Sparkles}
            title="Analyzing opportunities..."
            description="Your digital twin is currently processing audience engagement curves to generate next-topic recommendations."
          />
        )}
      </div>

      {/* Performance Chart & Recent Content */}
      <div className="grid-2 stagger-container">
        {/* Performance Chart */}
        <div className="card card-lift stagger-item">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Performance Over Time</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Views and audience engagement</span>
            </div>
            <Badge variant="primary">30-Day Velocity</Badge>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={performanceSeries}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
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
                  dataKey="views"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#viewsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Content */}
        <div className="card card-lift stagger-item">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Recent Content</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Latest posts and draft status</span>
            </div>
            <Link to="/content-studio" style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600 }}>
              + New Post
            </Link>
          </div>

          {recentContent.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentContent.slice(0, 4).map((item) => (
                <div
                  key={item.contentId}
                  className="glass-inner-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ overflow: 'hidden', paddingRight: '10px' }}>
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.title}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        {item.platform} • {item.contentType}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    {item.views > 0 && (
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#34d399' }}>
                        {(item.views / 1000).toFixed(1)}K views
                      </span>
                    )}
                    <Badge variant={item.status === 'published' ? 'success' : 'amber'}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title="No recent content"
              description="Create your first post in the AI Content Studio."
              action={
                <Link to="/content-studio" className="btn-primary" style={{ fontSize: '13px' }}>
                  Open Studio
                </Link>
              }
            />
          )}
        </div>
      </div>

      {/* Modal for View Reasoning */}
      <Modal
        isOpen={!!selectedReasoning}
        onClose={() => setSelectedReasoning(null)}
        title={`AI Rationale: ${selectedReasoning?.title || ''}`}
        maxWidth="680px"
      >
        {selectedReasoning && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Badge variant="cyan">{selectedReasoning.platform}</Badge>
              <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>•</span>
              <Badge variant="purple">{selectedReasoning.format}</Badge>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedReasoning.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'rgba(10, 13, 20, 0.6)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Audience Fit</span>
                <strong style={{ fontSize: '20px', color: '#34d399', display: 'block', marginTop: '2px' }}>
                  {selectedReasoning.audienceFit}%
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Content Fit</span>
                <strong style={{ fontSize: '20px', color: '#818cf8', display: 'block', marginTop: '2px' }}>
                  {selectedReasoning.contentFit}%
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Relevance</span>
                <strong style={{ fontSize: '20px', color: '#22d3ee', display: 'block', marginTop: '2px' }}>
                  {selectedReasoning.relevance}%
                </strong>
              </div>
            </div>

            {selectedReasoning.reasoningData && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  backgroundColor: '#182032',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Trend Velocity Score:</span>
                  <strong style={{ color: '#fff' }}>{selectedReasoning.reasoningData.trendScore}/10</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Urgency Window:</span>
                  <strong style={{ color: '#f59e0b' }}>{selectedReasoning.reasoningData.urgency}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Expected Reach Multiplier:</span>
                  <strong style={{ color: '#34d399' }}>{selectedReasoning.reasoningData.estimatedReachMultiplier}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Recommended Hook Formula:</span>
                  <strong style={{ color: '#c084fc' }}>{selectedReasoning.reasoningData.recommendedHookFormula}</strong>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedReasoning(null)} className="btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  const opp = selectedReasoning;
                  setSelectedReasoning(null);
                  handleCreateCampaign(opp);
                }}
                className="btn-primary"
              >
                <Sparkles size={16} /> Create Campaign with This Opportunity
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
