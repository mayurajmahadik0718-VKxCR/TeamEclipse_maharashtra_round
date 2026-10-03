import React, { useState } from 'react';
import Header from '../components/Header';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import {
  Bot,
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Radio,
  Share2,
  TrendingUp,
  RefreshCw,
  BookOpen,
  Sliders,
} from 'lucide-react';
import { creatorService } from '../services/creatorService';
import { aiService } from '../services/aiService';

export const DigitalTwinPage = ({ digitalTwin, creator, onRefresh }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Form edit states for modal
  const [toneInput, setToneInput] = useState(digitalTwin?.tone?.primary || 'friendly');
  const [goalInput, setGoalInput] = useState(
    digitalTwin?.goal || 'Scale YouTube to 100K subscribers & launch developer masterclass'
  );
  const [pacingInput, setPacingInput] = useState(
    digitalTwin?.contentStyle?.pacing || 'Fast, high energy opening, concise step-by-step breakdown'
  );

  const handleUpdateTwin = async (e) => {
    e.preventDefault();
    setIsCalibrating(true);
    setFeedbackMessage(null);

    try {
      const res = await creatorService.updateDigitalTwin(creator?.id || 'creator_001', {
        tone: {
          primary: toneInput,
          attributes: digitalTwin?.tone?.attributes || ['practical', 'encouraging'],
        },
        goal: goalInput,
        contentStyle: {
          ...digitalTwin?.contentStyle,
          pacing: pacingInput,
        },
      });

      setFeedbackMessage('Creator Digital Twin successfully re-calibrated & synced!');
      setTimeout(() => {
        setIsUpdateModalOpen(false);
        setFeedbackMessage(null);
        if (onRefresh) onRefresh();
      }, 1200);
    } catch (err) {
      setFeedbackMessage('Failed to update Digital Twin model.');
    } finally {
      setIsCalibrating(false);
    }
  };

  if (!digitalTwin) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading Digital Twin profile...</p>
      </div>
    );
  }

  const dna = digitalTwin.contentDNA || {
    bestTopics: ['Hands-on GenAI Projects', 'VS Code Productivity', 'Python Automation'],
    bestFormats: ['9:16 Vertical Reel/Short', 'Carousel Cheat Sheet', '10-minute Deep Dive'],
    bestHooks: [
      'Stop studying 8 hours a day. Here is what actually works...',
      '3 AI tools that will save you 15 hours of coding this week',
    ],
    audienceInterests: ['Local LLMs', 'FastAPI', 'Figma to Code', 'Prompt Engineering'],
    successfulPatterns: [
      'Code demo in first 2 seconds increases completion by 42%',
      'Actionable prompt templates in captions drive 3x more saves',
    ],
    weakAreas: ['Long theoretical intros drop 55% retention before 10 seconds'],
  };

  const metrics = digitalTwin.metricsSummary || {
    postsAnalyzed: 142,
    interactionsAnalyzed: 58400,
    patternsDiscovered: 19,
  };

  return (
    <div>
      <Header
        title="Creator Digital Twin"
        subtitle="The autonomous persona engine preserving your authentic voice, visual pacing, and strategic DNA."
        action={
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="btn-primary"
            style={{ fontSize: '13px' }}
          >
            <RefreshCw size={14} /> Update Creator Twin
          </button>
        }
      />

      {/* AI Summary Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.35)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            <Bot size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800 }}>AI Twin Persona Summary</h2>
              <Badge variant="cyan">Model Active: v2.4</Badge>
              <Badge variant="purple">Memory Synced</Badge>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {digitalTwin.aiSummary}
            </p>
          </div>
        </div>

        {/* Analyzed Metrics Counter Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Posts Analyzed
              </span>
              <strong style={{ fontSize: '20px', fontWeight: 800, color: '#fff', display: 'block' }}>
                {metrics.postsAnalyzed}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(6, 182, 212, 0.2)', color: '#22d3ee' }}>
              <Radio size={20} />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Interactions Analyzed
              </span>
              <strong style={{ fontSize: '20px', fontWeight: 800, color: '#fff', display: 'block' }}>
                {metrics.interactionsAnalyzed.toLocaleString()}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
              <Lightbulb size={20} />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Patterns Discovered
              </span>
              <strong style={{ fontSize: '20px', fontWeight: 800, color: '#fff', display: 'block' }}>
                {metrics.patternsDiscovered}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Profile Section */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={18} color="var(--primary)" /> Creator Profile Attributes
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Name
            </span>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
              {creator?.name || digitalTwin.creatorName}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Primary Niche
            </span>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#818cf8', marginTop: '2px' }}>
              {digitalTwin.niche}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Target Audience
            </span>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
              {digitalTwin.targetAudience?.demographic}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Active Platforms
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
              {digitalTwin.preferredPlatforms?.map((p) => (
                <Badge key={p} variant="neutral" style={{ textTransform: 'capitalize' }}>
                  {p}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Language & Delivery
            </span>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {digitalTwin.language || 'English (Conversational)'}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Tone Calibration
            </span>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#34d399', textTransform: 'capitalize', marginTop: '2px' }}>
              {digitalTwin.tone?.primary} ({digitalTwin.tone?.attributes?.join(', ')})
            </p>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Strategic Goal
            </span>
            <p style={{ fontSize: '14px', color: '#e2e8f0', marginTop: '2px', fontWeight: 600 }}>
              {digitalTwin.goal || 'Scale cross-platform presence & maintain 8%+ engagement'}
            </p>
          </div>
        </div>
      </div>

      {/* Content DNA Matrix */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--accent-purple)" /> Content DNA Matrix
        </h3>

        <div className="grid-2">
          {/* Best Topics */}
          <div className="card">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              🔥 Best Performing Topics
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {dna.bestTopics.map((topic, i) => (
                <Badge key={i} variant="primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Best Formats */}
          <div className="card">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              📐 Best Performing Formats
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {dna.bestFormats.map((format, i) => (
                <Badge key={i} variant="cyan" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  {format}
                </Badge>
              ))}
            </div>
          </div>

          {/* Best Hooks */}
          <div className="card">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              🎣 Best Signature Hooks
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {dna.bestHooks.map((hook, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '13px',
                    color: '#e2e8f0',
                    backgroundColor: 'rgba(10, 13, 20, 0.4)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  "{hook}"
                </li>
              ))}
            </ul>
          </div>

          {/* Audience Interests */}
          <div className="card">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              🎯 Audience Interests & Search Keywords
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {dna.audienceInterests.map((interest, i) => (
                <Badge key={i} variant="purple" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Successful Patterns */}
          <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Successful Algorithmic Patterns
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {dna.successfulPatterns.map((pattern, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span>{pattern}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weak Areas */}
          <div className="card" style={{ borderLeft: '4px solid #f43f5e' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fb7185', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} /> Retention Weak Areas to Avoid
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {dna.weakAreas.map((weakness, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#f43f5e' }}>✕</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for Update Creator Twin */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update & Re-Calibrate Creator Twin"
      >
        <form onSubmit={handleUpdateTwin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {feedbackMessage && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                fontSize: '13px',
              }}
            >
              {feedbackMessage}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Primary Voice & Tone
            </label>
            <input
              type="text"
              value={toneInput}
              onChange={(e) => setToneInput(e.target.value)}
              required
              className="input-field"
              placeholder="e.g. friendly, inspiring, analytical"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Visual & Hook Pacing Preference
            </label>
            <textarea
              value={pacingInput}
              onChange={(e) => setPacingInput(e.target.value)}
              rows={3}
              className="input-field"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Current Strategic Goal
            </label>
            <textarea
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              rows={2}
              className="input-field"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCalibrating}
              className="btn-primary"
            >
              {isCalibrating ? 'Calibrating Twin Model...' : 'Save & Calibrate Twin'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DigitalTwinPage;
