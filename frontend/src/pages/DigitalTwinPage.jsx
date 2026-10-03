import React from 'react';
import Header from '../components/Header';
import Badge from '../components/Badge';
import { Bot, Sparkles, CheckCircle2, MessageSquare, Target, Compass, Video } from 'lucide-react';

export const DigitalTwinPage = ({ digitalTwin, creator }) => {
  if (!digitalTwin) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading Digital Twin profile...</p>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Creator Digital Twin Persona"
        subtitle="The AI persona model preserving your voice, tone, and strategic content preferences."
        action={
          <Badge variant="cyan">
            <Sparkles size={12} /> Model Synced
          </Badge>
        }
      />

      {/* Main Persona Hero Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}>
                <Bot size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{digitalTwin.creatorName}'s Digital Twin</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Niche: <strong>{digitalTwin.niche}</strong></p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Badge variant="primary">Twin ID: {digitalTwin.twinId}</Badge>
            <Badge variant="success">Active</Badge>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Primary Tone
            </span>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#818cf8', textTransform: 'capitalize', marginTop: '2px' }}>
              {digitalTwin.tone?.primary}
            </p>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Preferred Platforms
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
              {digitalTwin.preferredPlatforms?.map((p) => (
                <span key={p} style={{ fontSize: '11px', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Hook Strategy
            </span>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {digitalTwin.contentStyle?.hookStyle || 'Direct curiosity gap'}
            </p>
          </div>
        </div>
      </div>

      {/* Deep Persona Configuration */}
      <div className="grid-2">
        {/* Target Audience */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Target size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Target Audience Demographic</h3>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px' }}>
            {digitalTwin.targetAudience?.demographic}
          </p>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Experience Level:</span>{' '}
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{digitalTwin.targetAudience?.skillLevel}</span>
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Audience Pain Points:</span>
            <ul style={{ paddingLeft: '18px', marginTop: '6px', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {digitalTwin.targetAudience?.painPoints?.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tone & Personality Attributes */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <MessageSquare size={18} color="#a855f7" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Tone & Speaking Voice</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Generated content matches these vocal traits to preserve authenticity:
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {digitalTwin.tone?.attributes?.map((attr) => (
              <Badge key={attr} variant="primary">
                {attr}
              </Badge>
            ))}
          </div>

          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Signature Catchphrases:</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
            {digitalTwin.contentStyle?.signaturePhrases?.map((phrase, i) => (
              <div key={i} style={{
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '8px 12px',
                borderRadius: '6px',
                borderLeft: '3px solid var(--primary)',
              }}>
                "{phrase}"
              </div>
            ))}
          </div>
        </div>

        {/* Content Style & Aesthetic */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Compass size={18} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Content Style & Aesthetic</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Pacing & Delivery</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {digitalTwin.contentStyle?.pacing}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Visual Aesthetics</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {digitalTwin.contentStyle?.visualAesthetics}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Interests & Topic Clusters</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {digitalTwin.interests?.map((item) => (
                  <Badge key={item} variant="cyan">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Past Content Reference */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Video size={18} color="var(--accent-green)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Past Content Calibration</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Top historical references used by the AI engine to mirror winning formats:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {digitalTwin.pastContentReference?.map((ref, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 600 }}>{ref.title}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>Platform: {ref.bestPerformingPlatform}</span>
                </div>
                <Badge variant="success">
                  {ref.engagementRate}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinPage;
