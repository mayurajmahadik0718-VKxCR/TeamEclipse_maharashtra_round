import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  PenTool, 
  Video, 
  BarChart3, 
  Bot,
  Users
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Digital Twin', path: '/digital-twin', icon: Bot, badge: 'Core AI' },
  { name: 'Content Studio', path: '/content-studio', icon: PenTool },
  { name: 'Video Studio', path: '/video-studio', icon: Video },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
        }}>
          <Sparkles size={20} />
        </div>
        <div>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px' }}>Creator<span style={{ color: '#818cf8' }}>AI</span></span>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>Operating Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-muted)',
          padding: '8px 12px 4px 12px',
        }}>
          Workspace
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                transition: 'all 0.15s ease-in-out',
              })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  backgroundColor: 'rgba(99, 102, 241, 0.25)',
                  color: '#a5b4fc',
                  padding: '2px 6px',
                  borderRadius: '6px',
                }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Team Info Box */}
      <div style={{
        padding: '16px',
        margin: '12px',
        borderRadius: '10px',
        backgroundColor: 'rgba(24, 32, 50, 0.7)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Users size={14} color="var(--primary)" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Team Eclipse</span>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          3-Person Hackathon Foundation: Frontend • AI/Video • Backend
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
