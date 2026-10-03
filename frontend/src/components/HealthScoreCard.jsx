import React from 'react';
import { Activity, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import Badge from './Badge';

export const HealthScoreCard = ({
  score = 94,
  status = 'Optimal Growth',
  metrics = {
    consistency: '96%',
    retention: '92%',
    platformSynergy: '94%',
  },
}) => {
  return (
    <div
      className="card card-lift stagger-item"
      style={{
        background: 'linear-gradient(135deg, rgba(24, 32, 50, 0.75) 0%, rgba(17, 23, 38, 0.82) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="ambient-glow"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
            }}
          >
            <Activity size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Creator Health Score
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Algorithmic vitality index</span>
          </div>
        </div>
        <Badge variant="success">
          <ShieldCheck size={12} /> {status}
        </Badge>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '12px 0',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span
            style={{
              fontSize: '44px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-muted)' }}>/100</span>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              height: '8px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '9999px',
              overflow: 'hidden',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                width: `${score}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #6366f1, #10b981)',
                borderRadius: '9999px',
                transition: 'width 0.8s ease-out',
              }}
            />
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Top <strong>5%</strong> performance calibration in your category
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
        <div style={{ background: 'rgba(10, 13, 20, 0.4)', padding: '8px 10px', borderRadius: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Consistency</span>
          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{metrics.consistency}</strong>
        </div>
        <div style={{ background: 'rgba(10, 13, 20, 0.4)', padding: '8px 10px', borderRadius: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Retention</span>
          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{metrics.retention}</strong>
        </div>
        <div style={{ background: 'rgba(10, 13, 20, 0.4)', padding: '8px 10px', borderRadius: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Platform Synergy</span>
          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{metrics.platformSynergy}</strong>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;
