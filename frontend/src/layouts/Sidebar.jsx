import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Sparkles,
  PenTool,
  Search,
  CheckCircle2,
  Video,
  BarChart3,
  Brain,
  Settings,
  Users,
  Lightbulb,
  X,
} from 'lucide-react';

const navSections = [
  {
    title: 'Core Engine',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Creator Digital Twin', path: '/digital-twin', icon: Bot, badge: 'Persona' },
    ],
  },
  {
    title: 'Content Workspace',
    items: [
      { name: 'Opportunities', path: '/opportunities', icon: Lightbulb, badge: 'AI Picks' },
      { name: 'AI Content Studio', path: '/content-studio', icon: PenTool },
      { name: 'Content Analyzer', path: '/analyzer', icon: Search },
      { name: 'AI Content Critic', path: '/critic', icon: CheckCircle2 },
      { name: 'Video Studio & Assets', path: '/video-studio', icon: Video },
    ],
  },
  {
    title: 'Intelligence & Growth',
    items: [
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
      { name: 'AI Learning Center', path: '/learning', icon: Brain, badge: 'Loop' },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Settings', path: '/settings', icon: Settings },
    ],
  },
];

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  return (
    <aside
      className={`sidebar ${!isMobileOpen ? 'mobile-hidden' : ''}`}
      style={{
        zIndex: 50,
      }}
    >
      {/* Brand & Mobile Close */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px' }}>
              Creator<span style={{ color: '#818cf8' }}>AI</span>
            </span>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>
              Operating Platform
            </p>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            style={{
              display: 'none',
              background: 'transparent',
              color: 'var(--text-muted)',
              padding: '6px',
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav
        style={{
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {navSections.map((section) => (
          <div key={section.title}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--text-muted)',
                padding: '4px 12px 6px 12px',
              }}
            >
              {section.title}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onCloseMobile && onCloseMobile()}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      border: isActive
                        ? '1px solid rgba(99, 102, 241, 0.35)'
                        : '1px solid transparent',
                      transition: 'all 0.15s ease-in-out',
                    })}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: 'rgba(99, 102, 241, 0.25)',
                          color: '#a5b4fc',
                          padding: '1px 6px',
                          borderRadius: '6px',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Team Eclipse Foundation Box */}
      <div
        style={{
          padding: '14px',
          margin: '12px',
          borderRadius: '10px',
          backgroundColor: 'rgba(24, 32, 50, 0.7)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <Users size={14} color="var(--primary)" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Team Eclipse Foundation
          </span>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          Frontend • AI/Intelligence • Backend/DB
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
