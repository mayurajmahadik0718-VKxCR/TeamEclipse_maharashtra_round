import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Badge from '../components/Badge';
import { api } from '../services/api';
import { Video, Sparkles, Play, Layers, Clapperboard, CheckCircle } from 'lucide-react';

export const VideoStudioPage = ({ creator }) => {
  const [videoJob, setVideoJob] = useState(null);
  const [title, setTitle] = useState('AI in Education - 60s Reel');
  const [script, setScript] = useState('Stop studying 8 hours a day. Here is how AI actually helps you learn 3x faster without burning out!');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [visualStyle, setVisualStyle] = useState('minimal_tech');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load default sample video job
    api.getVideoById('video_001')
      .then((res) => {
        if (res.data) setVideoJob(res.data);
      })
      .catch(() => {
        // Fallback default
        setVideoJob({
          videoId: 'video_001',
          title: 'AI in Education - 60s Reel',
          status: 'completed',
          progressPercentage: 100,
          aspectRatio: '9:16',
          durationSeconds: 58,
          scenes: [
            {
              sceneNumber: 1,
              timestamp: '0:00 - 0:03',
              narration: 'Stop studying 8 hours a day. Here is how AI actually helps you learn 3x faster...',
              visualPrompt: 'Close up modern desk with glowing holographic study plan, smooth cinematic camera push-in',
              bRollKeywords: ['student desk', 'hologram', 'focus'],
              renderedClipUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'
            },
            {
              sceneNumber: 2,
              timestamp: '0:03 - 0:15',
              narration: 'Step 1: Feed your lecture slides into an AI tutor and ask for 5 practice questions.',
              visualPrompt: 'Screen recording UI showing PDF drop and instantaneous flashcard breakdown',
              bRollKeywords: ['ui demo', 'ai prompt', 'flashcards'],
              renderedClipUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
            }
          ]
        });
      });
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.generateVideo({
        creatorId: creator?.id || 'creator_001',
        title,
        script,
        aspectRatio,
        visualStyle,
      });
      if (res.data) setVideoJob(res.data);
    } catch (err) {
      console.error('Video generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header
        title="AI Video Studio"
        subtitle="Transform raw scripts into camera directions, visual prompts, and automated storyboards."
        action={
          <Badge variant="cyan">
            <Clapperboard size={12} /> AI Video Pipeline (Teammate 2)
          </Badge>
        }
      />

      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Generator Controls */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Video size={18} color="var(--accent-cyan)" /> Storyboard Parameters
          </h3>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Video Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Full Narration / Script
              </label>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                rows={4}
                required
                className="input-field"
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="input-field"
                >
                  <option value="9:16">9:16 (Shorts / Reels)</option>
                  <option value="16:9">16:9 (Landscape YouTube)</option>
                  <option value="1:1">1:1 (Square)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Visual Style
                </label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value)}
                  className="input-field"
                >
                  <option value="minimal_tech">Minimal Tech</option>
                  <option value="cinematic">Cinematic 4K</option>
                  <option value="3d_animation">3D Animation</option>
                  <option value="documentary">Documentary</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ justifyContent: 'center', marginTop: '6px' }}
            >
              <Sparkles size={16} />
              {loading ? 'Synthesizing Storyboard...' : 'Generate AI Storyboard'}
            </button>
          </form>
        </div>

        {/* Video Overview Status */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--primary)" /> Generation Pipeline Status
          </h3>

          {videoJob && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{videoJob.title}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {videoJob.videoId} • Aspect: {videoJob.aspectRatio}</span>
                </div>
                <Badge variant={videoJob.status === 'completed' ? 'success' : 'primary'}>
                  {videoJob.status === 'completed' ? '100% Ready' : 'Processing'}
                </Badge>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Pipeline Progress</span>
                  <span style={{ fontWeight: 600 }}>{videoJob.progressPercentage || 100}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${videoJob.progressPercentage || 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>

              <div style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
              }}>
                <strong style={{ color: '#fff' }}>Teammate 2 Integration Ready:</strong> Output matches the scene-by-scene schema defined in <code style={{ color: 'var(--primary)' }}>contracts/video.md</code>.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Storyboard Scene Breakdown */}
      {videoJob?.scenes && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
            Scene-by-Scene Visual Storyboard
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {videoJob.scenes.map((scene) => (
              <div
                key={scene.sceneNumber}
                style={{
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {scene.renderedClipUrl && (
                  <div style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={scene.renderedClipUrl}
                      alt={`Scene ${scene.sceneNumber}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}>
                      Scene {scene.sceneNumber} ({scene.timestamp})
                    </div>
                  </div>
                )}
                <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    "{scene.narration}"
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-secondary)' }}>Visual Prompt:</strong> {scene.visualPrompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoStudioPage;
