import React from 'react';

export const StatCard = ({ title, value, change, icon: Icon, note }) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
          }}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</h3>
        {change && (
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: change.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-rose)',
          }}>
            {change}
          </span>
        )}
      </div>
      {note && (
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{note}</p>
      )}
    </div>
  );
};

export default StatCard;
