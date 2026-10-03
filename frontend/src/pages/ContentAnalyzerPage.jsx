import React, { useState } from 'react';
import Header from '../components/Header';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Gauge,
  Send,
} from 'lucide-react';
import { aiService } from '../services/aiService';

export const ContentAnalyzerPage = ({ creator }) => {
  const [content, setContent] = useState(
    `Stop studying 8 hours a day. Here is how AI actually helps you learn 3x faster without burning out!\n\n1. Feed your lecture slides into an AI tutor and generate 5 practice questions.\n2. Use audio voice mode to explain the concept back.\n3. Auto-generate flashcards for spaced repetition in 10 seconds.\n\nComment 'STUDY' to get my exact prompt templates!`
  );
  const [platform, setPlatform] = useState('instagram');
  const [contentType, setContentType] = useState('reel');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Calls aiService only, no AI logic in React
      const res = await aiService.analyzeContent({
        content,
        platform,
        contentType,
      });

      if (res?.data) {
        setAnalysisResult(res.data);
      }
    } catch (err) {
      setError(err?.message || 'Failed to analyze content.');
    } finally {
      setLoading(false);
    }
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
        title="Content Analyzer"
        subtitle="Objective multi-dimensional audit of your scripts, hooks, and retention pacing before publishing."
        action={
          <Badge variant="cyan">
            <Sparkles size={12} /> Powered by AI Intelligence Service
          </Badge>
        }
      />

      <div className="grid-2 stagger-container" style={{ alignItems: 'start', marginBottom: '32px' }}>
        {/* Input Form Panel */}
        <div className="card card-lift stagger-item">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={18} color="var(--primary)" /> Input Content Draft
          </h3>

          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="grid-2" style={{ gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Platform Selector
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="input-field"
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="x">X / Twitter</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Content Type Selector
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="input-field"
                >
                  <option value="reel">Reel / Short (Vertical)</option>
                  <option value="post">Feed Post</option>
                  <option value="carousel">Carousel Slide</option>
                  <option value="long_video_script">Long Video Script</option>
                  <option value="thread">Thread</option>
                </select>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Content Textarea
                </label>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {content.length} characters
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                required
                className="input-field"
                placeholder="Paste or write your script, hook, or draft caption here..."
                style={{ resize: 'vertical', lineHeight: 1.5, fontFamily: 'inherit' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="btn-primary"
              style={{ justifyContent: 'center', padding: '12px', fontSize: '15px' }}
            >
              {loading ? (
                <>
                  <Sparkles size={16} /> Analyzing Content via AI...
                </>
              ) : (
                <>
                  <Gauge size={16} /> Analyze Content
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div>
          {analysisResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Overall Score Card */}
              <div
                className="card"
                style={{
                  background: 'linear-gradient(135deg, rgba(24, 32, 50, 0.95) 0%, rgba(17, 23, 38, 0.9) 100%)',
                  border: '1px solid #2a3756',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
                      Algorithmic Audit Result
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Overall Quality Score</h3>
                  </div>
                  <Badge variant="cyan" style={{ textTransform: 'capitalize' }}>
                    {analysisResult.analyzedPlatform} • {analysisResult.analyzedType}
                  </Badge>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
                  <span
                    style={{
                      fontSize: '48px',
                      fontWeight: 900,
                      color: getScoreColor(analysisResult.overallScore),
                      lineHeight: 1,
                    }}
                  >
                    {analysisResult.overallScore}
                  </span>
                  <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: 600 }}>/100</span>
                </div>

                {/* Sub-Scores Grid: Hook Score, Clarity, Audience Fit, CTA, Originality */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))',
                    gap: '10px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '10px 6px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Hook Score</span>
                    <strong style={{ fontSize: '16px', color: getScoreColor(analysisResult.hookScore) }}>
                      {analysisResult.hookScore}%
                    </strong>
                  </div>

                  <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '10px 6px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Clarity</span>
                    <strong style={{ fontSize: '16px', color: getScoreColor(analysisResult.clarity) }}>
                      {analysisResult.clarity}%
                    </strong>
                  </div>

                  <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '10px 6px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Audience Fit</span>
                    <strong style={{ fontSize: '16px', color: getScoreColor(analysisResult.audienceFit) }}>
                      {analysisResult.audienceFit}%
                    </strong>
                  </div>

                  <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '10px 6px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>CTA</span>
                    <strong style={{ fontSize: '16px', color: getScoreColor(analysisResult.cta) }}>
                      {analysisResult.cta}%
                    </strong>
                  </div>

                  <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '10px 6px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Originality</span>
                    <strong style={{ fontSize: '16px', color: getScoreColor(analysisResult.originality) }}>
                      {analysisResult.originality}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Key Strengths
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {analysisResult.strengths?.map((str, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                      <span style={{ color: '#10b981' }}>•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="card" style={{ borderLeft: '4px solid #fbbf24' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fbbf24', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} /> Identified Weaknesses
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {analysisResult.weaknesses?.map((weak, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                      <span style={{ color: '#fbbf24' }}>•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#818cf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lightbulb size={16} /> Actionable AI Suggestions
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {analysisResult.suggestions?.map((sug, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                      <span style={{ color: '#818cf8' }}>•</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title="Awaiting Content"
              description="Click 'Analyze Content' to trigger multi-dimensional scoring for hook retention, clarity, and audience fit."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentAnalyzerPage;
