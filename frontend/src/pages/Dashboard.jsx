import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { Eye, Heart, Share2, Sparkles, TrendingUp, Video, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const chartData = [
  { name: 'Mon', views: 42000 },
  { name: 'Tue', views: 58000 },
  { name: 'Wed', views: 71000 },
  { name: 'Thu', views: 64000 },
  { name: 'Fri', views: 89000 },
  { name: 'Sat', views: 112000 },
  { name: 'Sun', views: 98000 },
];

export const Dashboard = ({ creator, digitalTwin }) => {
  return (
    <div>
      <Header
        title={`Welcome back, ${creator?.name || 'Creator'} 👋`}
        subtitle="Here is your CreatorAI command center and Digital Twin overview."
        action={
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/content-studio" className="btn-primary">
              <Sparkles size={16} /> Generate Content
            </Link>
          </div>
        }
      />

      {/* Digital Twin Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Creator Digital Twin Active</h2>
              <Badge variant="cyan">Tone: {digitalTwin?.tone?.primary || 'Friendly'}</Badge>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Niche: <strong style={{ color: '#fff' }}>{creator?.primaryNiche || 'AI & Tech Education'}</strong> • Target: {digitalTwin?.targetAudience?.demographic?.slice(0, 50) || 'Students and devs'}...
            </p>
          </div>
        </div>
        <Link to="/digital-twin" className="btn-secondary" style={{ fontSize: '13px' }}>
          View Persona Model &rarr;
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <StatCard
          title="Total Views (30 Days)"
          value="482.5K"
          change="+23.4%"
          icon={Eye}
          note="Combined across Instagram, YouTube, LinkedIn"
        />
        <StatCard
          title="Avg Engagement Rate"
          value="8.7%"
          change="+1.2%"
          icon={TrendingUp}
          note="Industry average is 3.5%"
        />
        <StatCard
          title="Total Likes & Saves"
          value="38.4K"
          change="+18.9%"
          icon={Heart}
          note="9,150 direct shares generated"
        />
      </div>

      {/* Chart & Quick Actions */}
      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Weekly Engagement Velocity</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#232e48" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#182032', borderColor: '#232e48', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="views" stroke="#6366f1" fillOpacity={1} fill="url(#viewsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Quick Studio Workflows</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/content-studio" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                  <PenTool size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Generate Reel / Post Script</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Input topic, get hooks, timed script & hashtags</p>
                </div>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>Start &rarr;</span>
            </Link>

            <Link to="/video-studio" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)' }}>
                  <Video size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600 }}>AI Video Storyboard</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Convert scripts into scene-by-scene video prompts</p>
                </div>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: 600 }}>Start &rarr;</span>
            </Link>

            <div style={{
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase' }}>
                AI Recommendation
              </span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Posting vertical reels between 6 PM - 8 PM IST yields 38% higher completion rates for your niche.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
