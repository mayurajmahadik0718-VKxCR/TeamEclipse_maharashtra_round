import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Badge from '../components/Badge';
import {
  Settings,
  User,
  Sliders,
  Share2,
  Globe,
  Volume2,
  Target,
  Bell,
  LogOut,
  Check,
  Save,
} from 'lucide-react';
import { creatorService } from '../services/creatorService';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = ({ creator, digitalTwin, onRefresh }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form state
  const [name, setName] = useState(creator?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(creator?.email || 'aarav@creatorai.io');
  const [bio, setBio] = useState(creator?.bio || 'Tech educator simplifying AI and developer tools.');
  const [primaryNiche, setPrimaryNiche] = useState(creator?.primaryNiche || 'AI & Tech Education');

  // Preferences Form state
  const [language, setLanguage] = useState(digitalTwin?.language || 'English (Conversational)');
  const [primaryTone, setPrimaryTone] = useState(digitalTwin?.tone?.primary || 'friendly');
  const [emojiDensity, setEmojiDensity] = useState(digitalTwin?.preferences?.emojiDensity || 'moderate');
  const [goal, setGoal] = useState(digitalTwin?.goal || 'Scale YouTube to 100K subs & build newsletter');

  // Platform toggles
  const [platforms, setPlatforms] = useState({
    youtube: true,
    instagram: true,
    linkedin: true,
    x: true,
    tiktok: false,
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    opportunityAlerts: true,
    weeklyLearningDigest: true,
    performanceSpikeNotification: true,
  });

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavedSuccess(false);

    try {
      await creatorService.updateCreator(creator?.id || 'creator_001', {
        name,
        email,
        bio,
        primaryNiche,
      });

      await creatorService.updateDigitalTwin(creator?.id || 'creator_001', {
        language,
        goal,
        tone: {
          ...digitalTwin?.tone,
          primary: primaryTone,
        },
        preferences: {
          ...digitalTwin?.preferences,
          emojiDensity,
        },
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <Header
        title="Creator Settings & Configuration"
        subtitle="Manage your profile, Digital Twin voice parameters, connected platforms, and notifications."
        action={
          <button onClick={handleLogout} className="btn-danger" style={{ fontSize: '13px' }}>
            <LogOut size={14} /> Log Out
          </button>
        }
      />

      {savedSuccess && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          <Check size={18} />
          <span>Settings and Digital Twin parameters successfully updated!</span>
        </div>
      )}

      {/* Tabs Menu */}
      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('profile')}
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <User size={16} /> Profile
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
        >
          <Sliders size={16} /> Creator Preferences
        </button>
        <button
          onClick={() => setActiveTab('platforms')}
          className={`tab-btn ${activeTab === 'platforms' ? 'active' : ''}`}
        >
          <Share2 size={16} /> Platforms
        </button>
        <button
          onClick={() => setActiveTab('tone')}
          className={`tab-btn ${activeTab === 'tone' ? 'active' : ''}`}
        >
          <Volume2 size={16} /> Tone & Voice
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
        >
          <Target size={16} /> Goals
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
        >
          <Bell size={16} /> Notifications
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  {name ? name.charAt(0) : 'C'}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{name}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{primaryNiche}</p>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Account Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Primary Niche
                </label>
                <input
                  type="text"
                  value={primaryNiche}
                  onChange={(e) => setPrimaryNiche(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Bio & Creator Focus
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Output Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="input-field"
                >
                  <option value="English (Conversational)">English (Conversational)</option>
                  <option value="English (Technical Academic)">English (Technical Academic)</option>
                  <option value="Hinglish / Indian Tech">Hinglish / Indian Tech</option>
                  <option value="Spanish (Conversational)">Spanish (Conversational)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Emoji Density Preference
                </label>
                <select
                  value={emojiDensity}
                  onChange={(e) => setEmojiDensity(e.target.value)}
                  className="input-field"
                >
                  <option value="minimal">Minimal (Professional / Clean)</option>
                  <option value="moderate">Moderate (Standard Social Balance)</option>
                  <option value="high">High (Gen-Z / High Energy)</option>
                </select>
              </div>
            </div>
          )}

          {/* Platforms Tab */}
          {activeTab === 'platforms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Toggle which platform adapters are active during content generation:
              </p>

              {Object.keys(platforms).map((platKey) => (
                <div
                  key={platKey}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(10, 13, 20, 0.4)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'capitalize' }}>
                    {platKey === 'x' ? 'X / Twitter' : platKey}
                  </span>
                  <input
                    type="checkbox"
                    checked={platforms[platKey]}
                    onChange={(e) => setPlatforms({ ...platforms, [platKey]: e.target.checked })}
                    style={{ accentColor: 'var(--primary)', transform: 'scale(1.2)', cursor: 'pointer' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tone & Voice Tab */}
          {activeTab === 'tone' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Primary Voice & Tone Archetype
                </label>
                <select
                  value={primaryTone}
                  onChange={(e) => setPrimaryTone(e.target.value)}
                  className="input-field"
                >
                  <option value="friendly">Friendly & Encouraging (Teacher)</option>
                  <option value="inspiring">Inspiring & Polished (Design Leader)</option>
                  <option value="analytical">Analytical & Data-Driven (Researcher)</option>
                  <option value="bold">Bold & Contrarian (Growth Hacker)</option>
                  <option value="humorous">Casual & Humorous (Developer Comedian)</option>
                </select>
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Target Growth Objectives
                </label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={4}
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(10, 13, 20, 0.4)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <strong style={{ fontSize: '14px', display: 'block' }}>High-Urgency Opportunity Alerts</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Notify when search spikes match your Creator Twin niche
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.opportunityAlerts}
                  onChange={(e) => setNotifications({ ...notifications, opportunityAlerts: e.target.checked })}
                  style={{ accentColor: 'var(--primary)', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(10, 13, 20, 0.4)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <strong style={{ fontSize: '14px', display: 'block' }}>Weekly Learning Feedback Digest</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Summary of discovered audience retention patterns
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.weeklyLearningDigest}
                  onChange={(e) => setNotifications({ ...notifications, weeklyLearningDigest: e.target.checked })}
                  style={{ accentColor: 'var(--primary)', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
