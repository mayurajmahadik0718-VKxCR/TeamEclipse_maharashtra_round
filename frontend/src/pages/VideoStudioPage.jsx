import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import {
  Video,
  Sparkles,
  Play,
  Layers,
  Clapperboard,
  CheckCircle,
  Upload,
  Scissors,
  Film,
  FileCode,
  Music,
  Plus,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { videoService } from '../services/videoService';

export const VideoStudioPage = ({ creator }) => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [videoJob, setVideoJob] = useState(null);
  const [assets, setAssets] = useState([]);
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetType, setNewAssetType] = useState('video');

  // Form parameters
  const [title, setTitle] = useState('Local LLMs on Your Laptop - 60s Reel');
  const [script, setScript] = useState(
    'Stop paying $20 every single month for AI! Here is how to run it 100% free, offline on your laptop in 60 seconds.'
  );
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [visualStyle, setVisualStyle] = useState('minimal_tech');

  // Workflow Pipeline status
  const [pipelineStages] = useState([
    { name: 'Idea', status: 'completed' },
    { name: 'Script', status: 'completed' },
    { name: 'Recording', status: 'completed' },
    { name: 'AI Editing', status: 'active' },
    { name: 'Repurposing', status: 'pending' },
    { name: 'Publishing', status: 'pending' },
  ]);

  useEffect(() => {
    videoService.getVideoById('video_001').then((res) => {
      if (res?.data) {
        setVideoJob(res.data);
        if (res.data.clipCandidates) setClips(res.data.clipCandidates);
        if (res.data.assets) setAssets(res.data.assets);
      }
    });
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await videoService.generateVideo({
        creatorId: creator?.id || 'creator_001',
        title,
        script,
        aspectRatio,
        visualStyle,
      });
      if (res?.data) setVideoJob(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAsset = async (e) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;

    const res = await videoService.uploadAsset({
      name: newAssetName,
      type: newAssetType,
      size: '24.5 MB',
      duration: '01:15',
    });

    if (res?.data) {
      setAssets([res.data, ...assets]);
      setUploadModalOpen(false);
      setNewAssetName('');
    }
  };

  return (
    <div>
      <Header
        title="Video Studio & Asset Manager"
        subtitle="End-to-end video pipeline: Asset ingest, Script-to-Video scene understanding, automated clip generation, and AI-assisted timeline editing."
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setUploadModalOpen(true)} className="btn-secondary" style={{ fontSize: '13px' }}>
              <Upload size={14} /> Upload Asset
            </button>
            <Badge variant="cyan">
              <Clapperboard size={12} /> AI Video Pipeline
            </Badge>
          </div>
        }
      />

      {/* Content Workflow Pipeline Tracker (Idea -> Script -> Recording -> Editing -> Repurposing -> Publishing) */}
      <div
        className="card card-lift animate-fade-in-up"
        style={{
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(17, 23, 38, 0.9) 0%, rgba(24, 32, 50, 0.8) 100%)',
          border: '1px solid #2a3756',
        }}
      >
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
          Content Workflow Pipeline
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
            overflowX: 'auto',
            gap: '8px',
          }}
        >
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={stage.name}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor:
                    stage.status === 'completed'
                      ? 'rgba(16, 185, 129, 0.15)'
                      : stage.status === 'active'
                      ? 'rgba(99, 102, 241, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${
                    stage.status === 'completed'
                      ? 'rgba(16, 185, 129, 0.4)'
                      : stage.status === 'active'
                      ? 'rgba(99, 102, 241, 0.6)'
                      : 'var(--border-color)'
                  }`,
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor:
                      stage.status === 'completed' ? '#10b981' : stage.status === 'active' ? '#6366f1' : '#64748b',
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: stage.status === 'active' ? '#fff' : stage.status === 'completed' ? '#34d399' : 'var(--text-muted)',
                  }}
                >
                  {stage.name}
                </span>
              </div>
              {idx < pipelineStages.length - 1 && (
                <ArrowRight size={14} color="var(--border-color)" style={{ flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Studio Workspace Tabs */}
      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
        >
          <Layers size={16} /> Timeline & Scene Breakdown
        </button>
        <button
          onClick={() => setActiveTab('clips')}
          className={`tab-btn ${activeTab === 'clips' ? 'active' : ''}`}
        >
          <Scissors size={16} /> Automated Short Clips
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`tab-btn ${activeTab === 'assets' ? 'active' : ''}`}
        >
          <Film size={16} /> Asset Library
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`tab-btn ${activeTab === 'generator' ? 'active' : ''}`}
        >
          <Sparkles size={16} /> Storyboard Generator
        </button>
      </div>

      {/* Tab 1: Timeline & AI-Assisted Editing */}
      {activeTab === 'timeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>
                  {videoJob?.title || 'Local LLMs on Your Laptop'}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Duration: {videoJob?.durationSeconds || 58}s • Aspect Ratio: {videoJob?.aspectRatio || '9:16'}
                </span>
              </div>
              <Badge variant="success">AI Scene Alignment Complete</Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {videoJob?.scenes?.map((scene) => (
                <div
                  key={scene.sceneNumber}
                  style={{
                    backgroundColor: 'rgba(10, 13, 20, 0.5)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 180px',
                    gap: '16px',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>
                      Scene {scene.sceneNumber}
                    </span>
                    <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>{scene.timestamp}</strong>
                  </div>

                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                      "{scene.narration}"
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <strong>Visual Prompt:</strong> {scene.visualPrompt}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                      {scene.bRollKeywords?.map((kw, i) => (
                        <span key={i} style={{ fontSize: '10px', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {scene.renderedClipUrl ? (
                      <div style={{ width: '100%', height: '80px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={scene.renderedClipUrl}
                          alt="preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Play size={18} color="#fff" />
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          height: '80px',
                          borderRadius: '8px',
                          border: '1px dashed var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        Awaiting Clip
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Automated Short Clips */}
      {activeTab === 'clips' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>AI Short-Form Clip Candidates</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Identified highlight moments from long footage ready for multi-platform repurposing
              </span>
            </div>
            <Badge variant="cyan">3 Candidates Discovered</Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {clips.map((clip) => (
              <div
                key={clip.id}
                style={{
                  backgroundColor: 'rgba(10, 13, 20, 0.5)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <Badge variant="purple">{clip.suggestedPlatform}</Badge>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399', fontSize: '12px', fontWeight: 700 }}>
                      <TrendingUp size={14} />
                      <span>{clip.viralScore}% Viral Score</span>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                    {clip.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    <Clock size={12} />
                    <span>Timestamp: {clip.timestamp} ({clip.duration})</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                  <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '6px' }}>
                    Preview
                  </button>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '6px' }}>
                    Export Clip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Asset Library */}
      {activeTab === 'assets' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Creator Asset Library</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Raw footage, screen captures, audio BGM, and script files
              </span>
            </div>
            <button onClick={() => setUploadModalOpen(true)} className="btn-primary" style={{ fontSize: '13px' }}>
              <Plus size={14} /> Ingest New Asset
            </button>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Type</th>
                  <th>File Size</th>
                  <th>Duration</th>
                  <th>Ingest Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td style={{ fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {asset.type === 'video' ? <Film size={16} color="#818cf8" /> : asset.type === 'audio' ? <Music size={16} color="#34d399" /> : <FileCode size={16} color="#fbbf24" />}
                        <span>{asset.name}</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={asset.type === 'video' ? 'primary' : asset.type === 'audio' ? 'success' : 'amber'}>
                        {asset.type}
                      </Badge>
                    </td>
                    <td>{asset.size}</td>
                    <td>{asset.duration || 'N/A'}</td>
                    <td>{asset.uploadedAt}</td>
                    <td>
                      <button className="btn-ghost" style={{ fontSize: '12px', padding: '4px 8px' }}>
                        Connect to Script
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Storyboard Generator Form */}
      {activeTab === 'generator' && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" /> Generate New AI Storyboard
          </h3>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
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

            <div className="grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="input-field"
                >
                  <option value="9:16">9:16 (Vertical Reels / Shorts / TikTok)</option>
                  <option value="16:9">16:9 (Horizontal YouTube / Landscape)</option>
                  <option value="1:1">1:1 (Square Instagram / LinkedIn)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Visual Style
                </label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value)}
                  className="input-field"
                >
                  <option value="minimal_tech">Minimal Tech / Dark Mode IDE</option>
                  <option value="cinematic">Cinematic Documentary</option>
                  <option value="3d_animation">3D Motion Graphics</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Script Input
              </label>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                rows={5}
                required
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ justifyContent: 'center', padding: '12px' }}
            >
              {loading ? 'Synthesizing Storyboard...' : 'Compile Storyboard & Camera Directions'}
            </button>
          </form>
        </div>
      )}

      {/* Modal for Ingest Asset */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Ingest Creator Asset"
      >
        <form onSubmit={handleUploadAsset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Asset Name
            </label>
            <input
              type="text"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
              required
              className="input-field"
              placeholder="e.g. My_ScreenRecording_LocalAI.mp4"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Asset Type
            </label>
            <select
              value={newAssetType}
              onChange={(e) => setNewAssetType(e.target.value)}
              className="input-field"
            >
              <option value="video">Video Footage (.mp4, .mov)</option>
              <option value="audio">Audio Track (.mp3, .wav)</option>
              <option value="script">Script Document (.md, .txt)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setUploadModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Upload & Index
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VideoStudioPage;
