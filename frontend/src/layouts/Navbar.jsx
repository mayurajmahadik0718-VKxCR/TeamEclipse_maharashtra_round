import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Menu, LogOut, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ creator, onSelectCreator, currentCreatorId, onToggleMobileSidebar }) => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.checkHealth()
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('mock-mode'));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="btn-ghost"
            style={{ padding: '6px', color: 'var(--text-primary)' }}
            title="Toggle Menu"
          >
            <Menu size={20} />
          </button>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '20px',
            backgroundColor:
              backendStatus === 'connected' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            border: `1px solid ${
              backendStatus === 'connected' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'
            }`,
            fontSize: '12px',
            fontWeight: 600,
            color: backendStatus === 'connected' ? '#34d399' : '#fbbf24',
          }}
        >
          <span
            className={backendStatus === 'connected' ? 'live-pulse-dot' : ''}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: backendStatus === 'connected' ? '#10b981' : '#f59e0b',
            }}
          />
          <span>{backendStatus === 'connected' ? 'Backend Live' : 'Mock Mode (Ready)'}</span>
        </div>

        <Link
          to="/"
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: '6px',
          }}
        >
          <span>Landing Page</span>
          <ExternalLink size={12} />
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Creator Switcher */}
        <select
          value={currentCreatorId}
          onChange={(e) => onSelectCreator(e.target.value)}
          className="input-field"
          style={{ width: 'auto', padding: '6px 12px', fontSize: '13px' }}
        >
          <option value="creator_001">Aarav Sharma (AI Educator)</option>
          <option value="creator_002">Priya Patel (UI/UX Designer)</option>
        </select>

        {/* Creator Profile Capsule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {creator?.name ? creator.name.charAt(0) : 'C'}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, display: 'inline-block' }}>
            {creator?.name || 'Creator'}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn-ghost"
          style={{ padding: '6px 10px', fontSize: '12px', color: 'var(--text-muted)' }}
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
