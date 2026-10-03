import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Activity, ShieldCheck, User } from 'lucide-react';

export const Navbar = ({ creator, onSelectCreator, currentCreatorId }) => {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    api.checkHealth()
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('mock-mode'));
  }, []);

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '20px',
          backgroundColor: backendStatus === 'connected' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
          border: `1px solid ${backendStatus === 'connected' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
          fontSize: '12px',
          fontWeight: 600,
          color: backendStatus === 'connected' ? '#34d399' : '#fbbf24',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: backendStatus === 'connected' ? '#10b981' : '#f59e0b',
          }} />
          <span>{backendStatus === 'connected' ? 'Backend API Active' : 'Offline / Mock Mode'}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <select
          value={currentCreatorId}
          onChange={(e) => onSelectCreator(e.target.value)}
          className="input-field"
          style={{ width: 'auto', padding: '6px 12px', fontSize: '13px' }}
        >
          <option value="creator_001">Aarav Sharma (AI Educator)</option>
          <option value="creator_002">Priya Patel (UI/UX Designer)</option>
        </select>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 700,
          }}>
            {creator?.name ? creator.name.charAt(0) : 'C'}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{creator?.name || 'Creator'}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
