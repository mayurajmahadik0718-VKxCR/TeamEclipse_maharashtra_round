import React from 'react';
import { Search, Brain, Lightbulb, PenTool, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';

const steps = [
  { key: 'ANALYZE', label: 'Analyze', icon: Search, desc: 'Audit past performance & audience retention drops' },
  { key: 'UNDERSTAND', label: 'Understand', icon: Brain, desc: 'Calibrate your Creator Digital Twin voice & DNA' },
  { key: 'RECOMMEND', label: 'Recommend', icon: Lightbulb, desc: 'Surface high-fit content opportunities & timing' },
  { key: 'CREATE', label: 'Create', icon: PenTool, desc: 'Generate multi-platform scripts, hooks & assets' },
  { key: 'CRITIQUE', label: 'Critique', icon: CheckCircle, desc: 'AI content audit for hook retention & CTA clarity' },
  { key: 'LEARN', label: 'Learn', icon: RefreshCw, desc: 'Feed measured post signals back into Twin memory' },
];

export const WorkflowLoop = ({ currentStage = 'RECOMMEND' }) => {
  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', fontWeight: 800 }}>
          Autonomous Intelligence Engine
        </span>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
          CreatorAI Closed Operating Loop
        </h3>
      </div>

      <div
        className="stagger-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          position: 'relative',
        }}
      >
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = currentStage.toUpperCase() === step.key;

          return (
            <div
              key={step.key}
              className={`glass-inner-card stagger-item ${isCurrent ? 'active-loop-stage' : ''}`}
              style={{
                backgroundColor: isCurrent ? 'rgba(16, 185, 129, 0.16)' : undefined,
                borderColor: isCurrent ? 'rgba(52, 211, 153, 0.75)' : undefined,
                boxShadow: isCurrent ? '0 0 20px rgba(16, 185, 129, 0.35)' : undefined,
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: isCurrent ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCurrent ? '#ffffff' : 'var(--text-secondary)',
                  }}
                >
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                  0{idx + 1}
                </span>
              </div>

              <div>
                <strong style={{ fontSize: '14px', color: isCurrent ? '#ffffff' : 'var(--text-primary)', display: 'block' }}>
                  {step.label}
                </strong>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowLoop;
