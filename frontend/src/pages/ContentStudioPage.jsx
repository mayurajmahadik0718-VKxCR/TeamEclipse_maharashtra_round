import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import {
  PenTool,
  Sparkles,
  Copy,
  Check,
  Send,
  Wand2,
  Share2,
  FileText,
  Youtube,
  Instagram,
  Linkedin,
  Video,
} from 'lucide-react';
import { contentService } from '../services/contentService';
import { opportunityService } from '../services/opportunityService';

const AVAILABLE_PLATFORMS = [
  { id: 'youtube', label: 'YouTube', icon: Youtube, color: '#f43f5e' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: '#ec4899' },
  { id: 'reel', label: 'Instagram Reel', icon: Video, color: '#a855f7' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: '#0ea5e9' },
];

export const ContentStudioPage = ({ creator, digitalTwin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Opportunity prefill if routed from Opportunities or Dashboard
  const prefilled = location.state?.prefilledOpportunity;

  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(prefilled?.id || 'custom');
  const [topic, setTopic] = useState(prefilled?.title || 'Local LLMs on Your Laptop in Under 3 Minutes');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['youtube', 'instagram', 'reel', 'linkedin']);
  const [activeTab, setActiveTab] = useState('youtube');
  const [tone, setTone] = useState(digitalTwin?.tone?.primary || 'friendly');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [improving, setImproving] = useState(false);

  // Editable platform outputs
  const [outputs, setOutputs] = useState({
    youtube: {
      title: 'Run ANY Open-Source AI Locally on Your Laptop (Complete 2026 Beginner Guide)',
      hook: 'What if you could run ChatGPT-level AI on your laptop without paying $20/month, without internet, and completely private? In this video, I will show you how to do it in 3 minutes.',
      script: `[0:00 - 0:15] Hook: Show terminal launching a lightning fast local model while unplugged from Wi-Fi.\n[0:15 - 0:45] Why Local AI Matters: Privacy, cost, and zero rate limits.\n[0:45 - 2:00] Step 1: Install Ollama in 1 click (Windows, Mac, Linux).\n[2:00 - 4:00] Step 2: Pick the best lightweight model for 8GB or 16GB RAM.\n[4:00 - 6:30] Step 3: Connect OpenWebUI for a beautiful ChatGPT-like browser interface.\n[6:30 - 7:45] Bonus: How to feed your private code or PDF files into the local model.\n[7:45 - 8:30] Outro & CTA: Download the step-by-step cheatsheet in description.`,
      description: `Learn how to run private, offline AI models directly on your laptop in under 3 minutes! No cloud bills, no privacy leaks, and zero subscriptions.\n\nTIMESTAMPS:\n0:00 - The Offline AI Demo\n0:45 - Prerequisites & RAM Specs\n2:00 - Installing Ollama\n4:00 - Picking Models\n6:30 - WebUI Setup\n\n#LocalAI #OpenSource #DevTools #Python`,
    },
    instagram: {
      carousel: `Slide 1: Stop paying for AI subscriptions. Run it FREE & OFFLINE on your laptop 💻🔥\nSlide 2: 1. Download Ollama for your OS\nSlide 3: 2. Run your first model: ollama run llama3:8b\nSlide 4: 3. Want a ChatGPT UI? Run Open-WebUI via Docker in 1 command\nSlide 5: Pro-Tip: Works 100% offline on airplanes and coffee shops\nSlide 6: Comment "LOCAL" for the free terminal cheat sheet!`,
      caption: `You don't need an $8,000 server to run cutting-edge AI in 2026 🤯 An ordinary 16GB laptop can run world-class models faster than cloud APIs without spending a penny. Save this post!`,
      hashtags: '#LocalAI, #TechTutorial, #DeveloperTips, #Programming, #AITools, #CodingLife',
      cta: 'Comment "LOCAL" below and I’ll DM you the exact 1-click install script!',
    },
    reel: {
      hook: 'Stop paying $20 every single month for AI! Here is how to run it 100% free, offline on your laptop in 60 seconds.',
      script: `[0:00 - 0:03] Face to camera holding laptop: "Stop paying $20 every month for AI subscriptions."\n[0:03 - 0:10] Cut to screen: "Go to Ollama.com, click download."\n[0:10 - 0:25] Open terminal: "Type 'ollama run deepseek-r1:8b' and hit enter."\n[0:25 - 0:42] Show prompt responding offline: "Notice Wi-Fi is OFF. Pure local speed, completely private."\n[0:42 - 0:55] "Add OpenWebUI on top for the browser interface."\n[0:55 - 1:00] "Comment 'OFFLINE' and I'll send you my curated list of top 5 lightweight models!"`,
      cta: 'Drop a comment with "OFFLINE" to get the 3-minute setup cheatsheet.',
    },
    linkedin: {
      headline: 'Why 72% of Engineering Teams are Moving to Local AI (And how to set it up in 3 minutes)',
      post: `Cloud AI APIs are incredible until you get hit with two things:\n1. Strict data confidentiality limits.\n2. Unexpected monthly token bills at scale.\n\nIn 2026, 8B-parameter open source models run effortlessly on standard developer laptops at 45 tokens per second.\n\nHere is the exact 3-step stack I recommend to our engineering students:\n1. Engine: Ollama\n2. Interface: OpenWebUI\n3. Orchestration: LangChain / LlamaIndex\n\nHave you experimented with local LLM deployments in your team yet?`,
      cta: 'Share your thoughts in the comments or repost to help your developer network.',
    },
  });

  useEffect(() => {
    opportunityService.getOpportunities(creator?.id || 'creator_001').then((res) => {
      if (res?.data) setOpportunities(res.data);
    });
  }, [creator?.id]);

  const handleSelectOpportunity = (oppId) => {
    setSelectedOpportunityId(oppId);
    if (oppId === 'custom') return;
    const opp = opportunities.find((o) => o.id === oppId);
    if (opp) {
      setTopic(opp.title);
    }
  };

  const togglePlatform = (platId) => {
    if (selectedPlatforms.includes(platId)) {
      if (selectedPlatforms.length > 1) {
        const next = selectedPlatforms.filter((p) => p !== platId);
        setSelectedPlatforms(next);
        if (activeTab === platId) setActiveTab(next[0]);
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platId]);
    }
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await contentService.generateContent({
        creatorId: creator?.id || 'creator_001',
        topic,
        platform: activeTab,
        contentType: activeTab === 'reel' ? 'reel' : 'post',
        tone,
      });

      if (res?.data?.generated) {
        setOutputs(res.data.generated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = async () => {
    setImproving(true);
    await new Promise((r) => setTimeout(r, 600));
    setOutputs((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        hook: `🔥 2026 Breakthrough: ${prev[activeTab]?.hook || ''}`,
      },
    }));
    setImproving(false);
  };

  const handleCopy = () => {
    const activeData = outputs[activeTab];
    let textToCopy = '';
    if (activeTab === 'youtube') {
      textToCopy = `TITLE:\n${activeData.title}\n\nHOOK:\n${activeData.hook}\n\nSCRIPT:\n${activeData.script}\n\nDESCRIPTION:\n${activeData.description}`;
    } else if (activeTab === 'instagram') {
      textToCopy = `CAROUSEL SLIDES:\n${activeData.carousel}\n\nCAPTION:\n${activeData.caption}\n\nHASHTAGS:\n${activeData.hashtags}\n\nCTA:\n${activeData.cta}`;
    } else if (activeTab === 'reel') {
      textToCopy = `HOOK:\n${activeData.hook}\n\nSCRIPT:\n${activeData.script}\n\nCTA:\n${activeData.cta}`;
    } else if (activeTab === 'linkedin') {
      textToCopy = `HEADLINE:\n${activeData.headline}\n\nPOST:\n${activeData.post}\n\nCTA:\n${activeData.cta}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToCritic = () => {
    const activeData = outputs[activeTab];
    navigate('/critic', {
      state: {
        platform: activeTab,
        topic,
        content: activeData,
      },
    });
  };

  const updateField = (platformKey, fieldKey, val) => {
    setOutputs((prev) => ({
      ...prev,
      [platformKey]: {
        ...prev[platformKey],
        [fieldKey]: val,
      },
    }));
  };

  return (
    <div>
      <Header
        title="AI Content Studio"
        subtitle="Multi-platform generator calibrated to your Creator Digital Twin voice and visual pacing."
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Badge variant="cyan">Tone: {tone}</Badge>
            <Badge variant="purple">Active Model: v2.4</Badge>
          </div>
        }
      />

      {/* Top Configuration Bar: Opportunity & Platform Selection */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Select Opportunity or Custom Idea
            </label>
            <select
              value={selectedOpportunityId}
              onChange={(e) => handleSelectOpportunity(e.target.value)}
              className="input-field"
            >
              <option value="custom">-- Custom Topic / Idea --</option>
              {opportunities.map((opp) => (
                <option key={opp.id} value={opp.id}>
                  ⭐ {opp.title} ({opp.audienceFit}% Fit)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Topic / Core Hook Concept
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="input-field"
              placeholder="e.g. Local LLMs on your laptop..."
            />
          </div>
        </div>

        {/* Multi-Platform Selector Checkboxes / Pills */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Target Platforms (Select Multiple for Simultaneous Adaptation)
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {AVAILABLE_PLATFORMS.map((plat) => {
              const Icon = plat.icon;
              const isChecked = selectedPlatforms.includes(plat.id);
              return (
                <button
                  type="button"
                  key={plat.id}
                  onClick={() => togglePlatform(plat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${isChecked ? plat.color : 'var(--border-color)'}`,
                    backgroundColor: isChecked ? `${plat.color}15` : 'transparent',
                    color: isChecked ? '#fff' : 'var(--text-secondary)',
                    fontWeight: isChecked ? 600 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={16} color={isChecked ? plat.color : 'var(--text-muted)'} />
                  <span>{plat.label}</span>
                  {isChecked && <Check size={14} color={plat.color} />}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary"
            style={{ fontSize: '14px', padding: '10px 20px' }}
          >
            <Sparkles size={16} /> {loading ? 'Generating Multi-Platform Content...' : 'Generate Content'}
          </button>
        </div>
      </div>

      {/* Studio Workspace: Tabs & Editable Cards */}
      <div className="card">
        {/* Platform Tabs Header */}
        <div className="tabs-container">
          {selectedPlatforms.map((platId) => {
            const plat = AVAILABLE_PLATFORMS.find((p) => p.id === platId);
            const Icon = plat?.icon || FileText;
            return (
              <button
                key={platId}
                onClick={() => setActiveTab(platId)}
                className={`tab-btn ${activeTab === platId ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{plat?.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global Action Toolbar: [Generate] [Improve] [Copy] [Send to Critic] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: 'rgba(10, 13, 20, 0.5)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge variant="cyan" style={{ textTransform: 'uppercase' }}>
              Editing: {activeTab}
            </Badge>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              All fields are fully editable before export
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleImprove}
              disabled={improving}
              className="btn-secondary"
              style={{ fontSize: '13px', padding: '6px 12px' }}
              title="Enhance hook and retention"
            >
              <Wand2 size={14} color="#a855f7" /> {improving ? 'Improving...' : 'Improve'}
            </button>
            <button
              onClick={handleCopy}
              className="btn-secondary"
              style={{ fontSize: '13px', padding: '6px 12px' }}
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleSendToCritic}
              className="btn-primary"
              style={{ fontSize: '13px', padding: '6px 14px' }}
            >
              <Send size={14} /> Send to Critic &rarr;
            </button>
          </div>
        </div>

        {/* Dynamic Platform Content Editors */}
        {activeTab === 'youtube' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                YouTube Video Title
              </label>
              <input
                type="text"
                value={outputs.youtube.title}
                onChange={(e) => updateField('youtube', 'title', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                First 3-Second Retention Hook
              </label>
              <textarea
                value={outputs.youtube.hook}
                onChange={(e) => updateField('youtube', 'hook', e.target.value)}
                rows={2}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Full Timed Video Script & Outline
              </label>
              <textarea
                value={outputs.youtube.script}
                onChange={(e) => updateField('youtube', 'script', e.target.value)}
                rows={7}
                className="input-field"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Video Description & Links
              </label>
              <textarea
                value={outputs.youtube.description}
                onChange={(e) => updateField('youtube', 'description', e.target.value)}
                rows={4}
                className="input-field"
              />
            </div>
          </div>
        )}

        {activeTab === 'instagram' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Carousel Slides Breakdown
              </label>
              <textarea
                value={outputs.instagram.carousel}
                onChange={(e) => updateField('instagram', 'carousel', e.target.value)}
                rows={6}
                className="input-field"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Post Caption
              </label>
              <textarea
                value={outputs.instagram.caption}
                onChange={(e) => updateField('instagram', 'caption', e.target.value)}
                rows={4}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Targeted Hashtags
              </label>
              <input
                type="text"
                value={outputs.instagram.hashtags}
                onChange={(e) => updateField('instagram', 'hashtags', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Call to Action (CTA)
              </label>
              <input
                type="text"
                value={outputs.instagram.cta}
                onChange={(e) => updateField('instagram', 'cta', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        )}

        {activeTab === 'reel' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                High-Retention Opening Hook (0:00 - 0:03)
              </label>
              <input
                type="text"
                value={outputs.reel.hook}
                onChange={(e) => updateField('reel', 'hook', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                60-Second Timed Script & Camera Actions
              </label>
              <textarea
                value={outputs.reel.script}
                onChange={(e) => updateField('reel', 'script', e.target.value)}
                rows={7}
                className="input-field"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Closing Call to Action (CTA)
              </label>
              <input
                type="text"
                value={outputs.reel.cta}
                onChange={(e) => updateField('reel', 'cta', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        )}

        {activeTab === 'linkedin' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Scroll-Stopping LinkedIn Headline
              </label>
              <input
                type="text"
                value={outputs.linkedin.headline}
                onChange={(e) => updateField('linkedin', 'headline', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Main Post Body
              </label>
              <textarea
                value={outputs.linkedin.post}
                onChange={(e) => updateField('linkedin', 'post', e.target.value)}
                rows={8}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Engagement Question & CTA
              </label>
              <input
                type="text"
                value={outputs.linkedin.cta}
                onChange={(e) => updateField('linkedin', 'cta', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentStudioPage;
