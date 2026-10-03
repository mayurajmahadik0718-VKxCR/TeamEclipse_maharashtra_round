import React, { useState } from 'react';
import Header from '../components/Header';
import Badge from '../components/Badge';
import { api } from '../services/api';
import { Sparkles, Copy, Check, PenTool, Hash, FileText } from 'lucide-react';

export const ContentStudioPage = ({ creator, digitalTwin }) => {
  const [topic, setTopic] = useState('AI in education');
  const [platform, setPlatform] = useState('instagram');
  const [contentType, setContentType] = useState('reel');
  const [tone, setTone] = useState(digitalTwin?.tone?.primary || 'friendly');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.generateContent({
        creatorId: creator?.id || 'creator_001',
        topic,
        platform,
        contentType,
        tone,
      });
      setResult(response);
    } catch (err) {
      console.error('Error generating content:', err);
      // Fallback mock if backend unreachable
      setResult({
        success: true,
        contentId: 'content_mock',
        hook: `Stop making this common mistake with ${topic}! Here is what actually works in 2026.`,
        script: `[0:00 - 0:03] High energy visual hook on ${topic}.\n[0:03 - 0:25] Clear step-by-step breakdown tailored to your audience.\n[0:25 - 0:60] Closing call-to-action for ${platform}.`,
        caption: `Master ${topic} with these actionable steps! 🚀 Drop your thoughts below.`,
        hashtags: [`#${topic.replace(/\s+/g, '')}`, '#CreatorAI', '#Productivity'],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Header
        title="Content Studio"
        subtitle="Generate authentic scripts, hooks, and captions calibrated to your Digital Twin."
        action={
          <Badge variant="primary">
            <Sparkles size={12} /> Powered by CreatorAI Engine
          </Badge>
        }
      />

      <div className="grid-2">
        {/* Form Panel */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PenTool size={18} color="var(--primary)" /> Configure Prompt & Persona
          </h3>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Content Topic or Keyword
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="input-field"
                placeholder="e.g. AI in education, Top 5 VS Code plugins"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="input-field"
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="x">X (Twitter)</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="input-field"
                >
                  <option value="reel">Reel / Short (9:16)</option>
                  <option value="post">Standard Post</option>
                  <option value="carousel">Carousel Slide Deck</option>
                  <option value="long_video_script">Long Video Script (16:9)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Tone Adjustment (defaults to Digital Twin)
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="input-field"
              >
                <option value="friendly">Friendly & Encouraging</option>
                <option value="analytical">Analytical & Data-driven</option>
                <option value="inspiring">Inspiring & Visionary</option>
                <option value="humorous">Humorous & Witty</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ justifyContent: 'center', marginTop: '8px' }}
            >
              {loading ? (
                <>Generating with Digital Twin...</>
              ) : (
                <>
                  <Sparkles size={16} /> Generate Content Draft
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--accent-cyan)" /> Studio Output
            </h3>
            {result && (
              <button
                onClick={() => handleCopy(`${result.hook}\n\n${result.script}\n\n${result.caption}`)}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Script'}</span>
              </button>
            )}
          </div>

          {!result ? (
            <div style={{
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              padding: '24px',
              textAlign: 'center',
            }}>
              <Sparkles size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p style={{ fontSize: '14px', fontWeight: 500 }}>No generation yet</p>
              <p style={{ fontSize: '12px', maxWidth: '300px', marginTop: '4px' }}>
                Fill out the configuration and click "Generate Content Draft" to create structured content.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Hook */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                  Attention Hook (First 3 Seconds)
                </span>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginTop: '4px',
                  borderLeft: '3px solid var(--accent-cyan)',
                }}>
                  {result.hook}
                </p>
              </div>

              {/* Script */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Timed Script & Delivery Beats
                </span>
                <pre style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginTop: '4px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  maxHeight: '180px',
                  overflowY: 'auto',
                }}>
                  {result.script}
                </pre>
              </div>

              {/* Caption */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Caption
                </span>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {result.caption}
                </p>
              </div>

              {/* Hashtags */}
              {result.hashtags && (
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Hashtags
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {result.hashtags.map((tag, i) => (
                      <span key={i} style={{ fontSize: '11px', color: '#818cf8', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentStudioPage;
