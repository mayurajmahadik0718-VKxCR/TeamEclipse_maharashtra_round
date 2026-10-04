import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Badge from '../components/Badge';
import WorkflowLoop from '../components/WorkflowLoop';
import LoadingSkeleton from '../components/LoadingSkeleton';
import {
  Brain,
  Sparkles,
  BookOpen,
  Radio,
  CheckCircle2,
  MinusCircle,
  AlertTriangle,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { aiService } from '../services/aiService';

export const LearningCenterPage = ({ creator }) => {
  const [learningData, setLearningData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLearning = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.learnFromPerformance(creator?.id || 'creator_001');
      if (res?.data) {
        setLearningData(res.data);
      }
    } catch (err) {
      setError(err?.message || 'Failed to load learning memory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearning();
  }, [creator?.id]);

  const metrics = learningData?.metrics || {
    postsAnalyzed: 142,
    interactionsAnalyzed: 58400,
    successfulContent: 84,
    averageContent: 46,
    underperformingContent: 12,
    accuracyScore: 94.8,
  };

  const patterns = learningData?.detectedPatterns || [];

  return (
    <div>
      <Header
        title="CreatorAI Learning"
        subtitle="The autonomous machine learning feedback loop refining your Creator Twin after every post."
        action={
          <button onClick={fetchLearning} disabled={loading} className="btn-secondary" style={{ fontSize: '13px' }}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Re-Sync Learning Memory
          </button>
        }
      />

      {loading ? (
        <LoadingSkeleton count={3} height="140px" />
      ) : (
        <>
          {/* Top Analyzed Breakdown Cards */}
          <div
            className="stagger-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            {/* Posts Analyzed */}
            <div className="card card-lift stagger-item">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Posts Analyzed</span>
                <BookOpen size={16} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800 }}>{metrics.postsAnalyzed}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Multi-platform videos & text</p>
            </div>

            {/* Interactions Analyzed */}
            <div className="card card-lift stagger-item">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Interactions Analyzed</span>
                <Radio size={16} color="var(--accent-cyan)" />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800 }}>{metrics.interactionsAnalyzed.toLocaleString()}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Comments, shares, drop-offs</p>
            </div>

            {/* Successful Content */}
            <div className="card card-lift stagger-item" style={{ borderLeft: '3px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Successful Content</span>
                <CheckCircle2 size={16} color="#34d399" />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#34d399' }}>{metrics.successfulContent}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>&gt;8.5% engagement rate</p>
            </div>

            {/* Average Content */}
            <div className="card card-lift stagger-item" style={{ borderLeft: '3px solid #6366f1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Average Content</span>
                <MinusCircle size={16} color="#818cf8" />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#818cf8' }}>{metrics.averageContent}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>4% - 8.5% baseline range</p>
            </div>

            {/* Underperforming Content */}
            <div className="card card-lift stagger-item" style={{ borderLeft: '3px solid #f43f5e' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Underperforming Content</span>
                <AlertTriangle size={16} color="#fb7185" />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#fb7185' }}>{metrics.underperformingContent}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Early drop-off points</p>
            </div>
          </div>

          {/* Visual Closed Loop: Analyze -> Understand -> Recommend -> Create -> Measure -> Learn */}
          <div style={{ marginBottom: '32px' }}>
            <WorkflowLoop currentStage="LEARN" />
          </div>

          {/* Detected Patterns Section */}
          <div className="card card-lift animate-fade-in-up" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Detected Audience Patterns</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Algorithmic discoveries shaping your next recommendation
                </span>
              </div>
              <Badge variant="cyan">
                <Brain size={12} /> {patterns.length} Active Heuristics
              </Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {patterns.map((pat) => (
                <div
                  key={pat.id}
                  className="glass-inner-card"
                  style={{
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge variant={pat.type === 'high_impact' ? 'cyan' : pat.type === 'warning' ? 'amber' : 'success'}>
                        {pat.tag}
                      </Badge>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
                        {pat.title}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span>Confidence: <strong style={{ color: '#34d399' }}>{pat.confidence}</strong></span>
                      <span>•</span>
                      <span>{pat.detectedDate}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    "{pat.description}"
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#a5b4fc',
                    }}
                  >
                    <Lightbulb size={14} color="#818cf8" />
                    <span>Action Taken: {pat.actionRecommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LearningCenterPage;
