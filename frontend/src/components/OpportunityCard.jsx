import React from 'react';
import { Sparkles, ArrowRight, Layers, Flame, BrainCircuit } from 'lucide-react';
import Badge from './Badge';

export const OpportunityCard = ({
  opportunity,
  onViewReasoning,
  onCreateCampaign,
  showFullDetails = false,
}) => {
  if (!opportunity) return null;

  return (
    <div
      className="card card-lift stagger-item"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        background: 'linear-gradient(180deg, #182032 0%, #131929 100%)',
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Badge variant="cyan">{opportunity.platform}</Badge>
            <Badge variant="purple">{opportunity.format}</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '12px', fontWeight: 700 }}>
            <Flame size={14} />
            <span>High Urgency</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.35 }}>
          {opportunity.title}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
          {opportunity.description}
        </p>

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            backgroundColor: 'rgba(10, 13, 20, 0.5)',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Audience Fit</span>
            <strong style={{ fontSize: '16px', color: '#34d399', fontWeight: 800 }}>{opportunity.audienceFit}%</strong>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Content Fit</span>
            <strong style={{ fontSize: '16px', color: '#818cf8', fontWeight: 800 }}>{opportunity.contentFit}%</strong>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Relevance</span>
            <strong style={{ fontSize: '16px', color: '#22d3ee', fontWeight: 800 }}>{opportunity.relevance}%</strong>
          </div>
        </div>

        {/* Reason */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
            Algorithmic Rationale
          </span>
          <p style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '4px', lineHeight: 1.45 }}>
            {opportunity.reason}
          </p>
        </div>

        {/* Supporting Insights */}
        {opportunity.supportingInsights && opportunity.supportingInsights.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Supporting Signals
            </span>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {opportunity.supportingInsights.map((insight, idx) => (
                <li key={idx} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <button
          type="button"
          onClick={() => onViewReasoning && onViewReasoning(opportunity)}
          className="btn-secondary"
          style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '8px 12px' }}
        >
          <BrainCircuit size={15} /> View Reasoning
        </button>
        <button
          type="button"
          onClick={() => onCreateCampaign && onCreateCampaign(opportunity)}
          className="btn-primary"
          style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '8px 12px' }}
        >
          <Sparkles size={15} /> Create Campaign
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
