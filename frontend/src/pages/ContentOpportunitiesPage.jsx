import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Badge from '../components/Badge';
import OpportunityCard from '../components/OpportunityCard';
import Modal from '../components/Modal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { Lightbulb, Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';
import { aiService } from '../services/aiService';

export const ContentOpportunitiesPage = ({ creator }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReasoning, setSelectedReasoning] = useState(null);

  const navigate = useNavigate();

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.generateOpportunities(creator?.id || 'creator_001');
      if (res?.data) {
        setOpportunities(res.data);
      }
    } catch (err) {
      setError(err?.message || 'Failed to load opportunity recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [creator?.id]);

  const handleCreateCampaign = (opp) => {
    navigate('/content-studio', { state: { prefilledOpportunity: opp } });
  };

  const handleViewReasoning = (opp) => {
    setSelectedReasoning(opp);
  };

  return (
    <div>
      <Header
        title="What Should You Create Next?"
        subtitle="High-urgency content opportunities curated by analyzing real-time search trends, competitor whitespace, and your Digital Twin memory."
        action={
          <button
            onClick={fetchOpportunities}
            disabled={loading}
            className="btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Opportunities
          </button>
        }
      />

      {loading ? (
        <LoadingSkeleton count={3} height="200px" />
      ) : opportunities.length > 0 ? (
        <div className="grid-2 stagger-container" style={{ gap: '24px' }}>
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onViewReasoning={handleViewReasoning}
              onCreateCampaign={handleCreateCampaign}
              showFullDetails={true}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Lightbulb}
          title="No Opportunities Found"
          description="Your Digital Twin is continually analyzing search signals. Check back shortly."
        />
      )}

      {/* Modal / Drawer for View Reasoning */}
      <Modal
        isOpen={!!selectedReasoning}
        onClose={() => setSelectedReasoning(null)}
        title={`AI Algorithmic Rationale: ${selectedReasoning?.title || ''}`}
        maxWidth="680px"
      >
        {selectedReasoning && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <Badge variant="cyan">{selectedReasoning.platform}</Badge>
              <Badge variant="purple">{selectedReasoning.format}</Badge>
              <Badge variant="success">Audience Fit: {selectedReasoning.audienceFit}%</Badge>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedReasoning.description}
            </p>

            {/* Reasoning Data Object from AI Service */}
            {selectedReasoning.reasoningData && (
              <div
                className="glass-inner-card"
                style={{
                  padding: '18px',
                  marginBottom: '20px',
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BrainCircuit size={16} color="var(--primary)" /> Algorithmic Decision Factors
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                  <div className="glass-inner-card" style={{ padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Trend Velocity</span>
                    <strong style={{ color: '#fff', fontSize: '15px' }}>{selectedReasoning.reasoningData.trendScore}/10</strong>
                  </div>
                  <div className="glass-inner-card" style={{ padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Urgency Window</span>
                    <strong style={{ color: '#f59e0b', fontSize: '15px' }}>{selectedReasoning.reasoningData.urgency}</strong>
                  </div>
                  <div className="glass-inner-card" style={{ padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Reach Multiplier</span>
                    <strong style={{ color: '#34d399', fontSize: '15px' }}>{selectedReasoning.reasoningData.estimatedReachMultiplier}</strong>
                  </div>
                  <div className="glass-inner-card" style={{ padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Saturation</span>
                    <strong style={{ color: '#818cf8', fontSize: '15px' }}>{selectedReasoning.reasoningData.competitorSaturation}</strong>
                  </div>
                </div>

                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Digital Twin Persona Alignment
                  </span>
                  <p style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '4px' }}>
                    {selectedReasoning.reasoningData.digitalTwinAlignment}
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Supporting Signals
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedReasoning.supportingInsights?.map((insight, idx) => (
                  <li key={idx} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 800 }}>•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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

export default ContentOpportunitiesPage;
