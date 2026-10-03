import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Check,
  FileText,
  ShieldCheck,
  Wand2,
} from 'lucide-react';
import { aiService } from '../services/aiService';

export const ContentCriticPage = ({ creator }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Content passed from ContentStudioPage or fallback
  const passedContent = location.state?.content || null;
  const passedPlatform = location.state?.platform || 'reel';
  const passedTopic = location.state?.topic || 'Local LLMs on Your Laptop';

  const [criticData, setCriticData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(null);

  const fetchCritique = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.criticizeContent({
        topic: passedTopic,
        platform: passedPlatform,
        content: passedContent,
      });

      if (res?.data) {
        setCriticData(res.data);
      }
    } catch (err) {
      setError(err?.message || 'Failed to criticize content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCritique();
  }, [passedTopic, passedPlatform]);

  const handleApplyImprovement = () => {
    setApplied(true);
    setTimeout(() => {
      // Navigate back to studio with improved version
      navigate('/content-studio', {
        state: {
          improvedContent: criticData?.improvedVersion,
          platform: passedPlatform,
        },
      });
    }, 800);
  };

  const handleBackToStudio = () => {
    navigate('/content-studio');
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#34d399';
    if (score >= 75) return '#818cf8';
    if (score >= 60) return '#fbbf24';
    return '#fb7185';
  };

  return (
    <div>
      <Header
        title="AI Content Critic"
        subtitle="Unbiased objective teardown and algorithmic score optimization before you hit record."
        action={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleBackToStudio} className="btn-secondary" style={{ fontSize: '13px' }}>
              <ArrowLeft size={14} /> Back to Studio
            </button>
            <button onClick={fetchCritique} disabled={loading} className="btn-secondary" style={{ fontSize: '13px' }}>
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Regenerate
            </button>
            <button onClick={handleApplyImprovement} className="btn-primary" style={{ fontSize: '13px' }}>
              {applied ? <Check size={14} /> : <Wand2 size={14} />}
              <span>{applied ? 'Improvement Applied!' : 'Apply Improvement'}</span>
            </button>
          </div>
        }
      />

      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Sparkles size={32} color="var(--primary)" style={{ animation: 'spin 2s linear infinite', margin: '0 auto 16px auto' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>AI Critic is evaluating script pacing & retention...</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Auditing hook urgency, clarity, audience fit, originality, and CTA conversion.
          </p>
        </div>
      ) : criticData ? (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Score Matrix Banner */}
          <div
            className="card card-lift"
            style={{
              background: 'linear-gradient(135deg, rgba(24, 32, 50, 0.75) 0%, rgba(17, 23, 38, 0.82) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Evaluation Results</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Platform Target: <strong style={{ color: '#fff', textTransform: 'capitalize' }}>{passedPlatform}</strong>
                  </span>
                </div>
              </div>
              <Badge variant="cyan">Overall: {criticData.overallScore}/100</Badge>
            </div>

            {/* Score Breakdown Bar */}
            <div
              className="stagger-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '12px',
                textAlign: 'center',
              }}
            >
              <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '12px 8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Overall Score</span>
                <strong style={{ fontSize: '22px', fontWeight: 800, color: getScoreColor(criticData.overallScore) }}>
                  {criticData.overallScore}
                </strong>
              </div>
              <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '12px 8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Hook</span>
                <strong style={{ fontSize: '22px', fontWeight: 800, color: getScoreColor(criticData.hook) }}>
                  {criticData.hook}%
                </strong>
              </div>
              <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '12px 8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Clarity</span>
                <strong style={{ fontSize: '22px', fontWeight: 800, color: getScoreColor(criticData.clarity) }}>
                  {criticData.clarity}%
                </strong>
              </div>
              <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '12px 8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Audience Fit</span>
                <strong style={{ fontSize: '22px', fontWeight: 800, color: getScoreColor(criticData.audienceFit) }}>
                  {criticData.audienceFit}%
                </strong>
              </div>
              <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '12px 8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Originality</span>
                <strong style={{ fontSize: '22px', fontWeight: 800, color: getScoreColor(criticData.originality) }}>
                  {criticData.originality}%
                </strong>
              </div>
              <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '12px 8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>CTA</span>
                <strong style={{ fontSize: '22px', fontWeight: 800, color: getScoreColor(criticData.cta) }}>
                  {criticData.cta}%
                </strong>
              </div>
            </div>
          </div>

          {/* Tri-Column Insights: Strengths, Problems, Suggestions */}
          <div className="grid-3">
            {/* Strengths */}
            <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> Key Strengths
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {criticData.strengths?.map((str, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                    <span style={{ color: '#10b981' }}>•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problems */}
            <div className="card" style={{ borderLeft: '4px solid #f43f5e' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fb7185', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} /> Detected Problems
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {criticData.problems?.map((prob, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                    <span style={{ color: '#fb7185' }}>•</span>
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#818cf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lightbulb size={16} /> Suggestions to 10x
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {criticData.suggestions?.map((sug, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                    <span style={{ color: '#818cf8' }}>•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Improved Version Showcase */}
          {criticData.improvedVersion && (
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
                borderColor: 'rgba(16, 185, 129, 0.3)',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#34d399',
                    }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800 }}>AI Improved Version</h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Retention optimized with stronger urgency hook and high-converting CTA
                    </span>
                  </div>
                </div>

                <button onClick={handleApplyImprovement} className="btn-primary" style={{ fontSize: '13px' }}>
                  {applied ? <Check size={14} /> : <Wand2 size={14} />}
                  <span>{applied ? 'Applied to Studio!' : 'Apply This Improvement'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#34d399', fontWeight: 700 }}>
                    Optimized Hook (0:00 - 0:03)
                  </span>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginTop: '4px', backgroundColor: 'rgba(10, 13, 20, 0.5)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    "{criticData.improvedVersion.hook}"
                  </p>
                </div>

                {criticData.improvedVersion.script && (
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
                      Optimized Timed Script
                    </span>
                    <pre
                      style={{
                        fontSize: '13px',
                        color: '#e2e8f0',
                        marginTop: '4px',
                        backgroundColor: 'rgba(10, 13, 20, 0.5)',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'var(--font-mono)',
                        lineHeight: 1.5,
                      }}
                    >
                      {criticData.improvedVersion.script}
                    </pre>
                  </div>
                )}

                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Upgraded Call to Action (CTA)
                  </span>
                  <p style={{ fontSize: '13px', color: '#c084fc', marginTop: '4px', fontWeight: 600 }}>
                    {criticData.improvedVersion.cta}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
            <button onClick={handleBackToStudio} className="btn-secondary">
              <ArrowLeft size={16} /> Back to Studio
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={fetchCritique} className="btn-secondary">
                <RefreshCw size={16} /> Regenerate
              </button>
              <button onClick={handleApplyImprovement} className="btn-primary">
                <Wand2 size={16} /> Apply Improvement
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No Content to Criticize"
          description="Send content from the AI Content Studio or enter a draft to run an algorithmic teardown."
          action={
            <button onClick={handleBackToStudio} className="btn-primary" style={{ fontSize: '13px' }}>
              Open Studio
            </button>
          }
        />
      )}
    </div>
  );
};

export default ContentCriticPage;
