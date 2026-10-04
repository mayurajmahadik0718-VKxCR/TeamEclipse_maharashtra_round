import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  Zap,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Video,
  PenTool,
  CheckCircle2,
  BarChart3,
  Layers,
  ChevronRight,
} from 'lucide-react';
import Badge from '../components/Badge';
import WorkflowLoop from '../components/WorkflowLoop';
import SplineBackground from '../components/SplineBackground';

export const LandingPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0d14',
        color: 'var(--text-primary)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Spline 3D Scene Background (Behind UI, non-blocking) */}
      <SplineBackground />

      {/* Foreground Interactive UI Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Navbar */}
        <header
          style={{
            borderBottom: '1px solid rgba(35, 46, 72, 0.65)',
            backgroundColor: 'rgba(10, 13, 20, 0.75)',
            backdropFilter: 'blur(16px)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: '1240px',
              margin: '0 auto',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                }}
              >
                <Sparkles size={20} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                Creator<span style={{ color: '#818cf8' }}>AI</span>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/login" className="btn-ghost" style={{ fontSize: '14px' }}>
                Log In
              </Link>
              <Link to="/signup" className="btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                Get Started Free <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="animate-fade-in-up" style={{ padding: '80px 24px 60px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div
            className="ambient-glow"
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '350px',
              background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>
            <div className="badge-glow" style={{ display: 'inline-flex', marginBottom: '20px', borderRadius: '9999px' }}>
              <Badge variant="cyan" style={{ padding: '6px 14px', fontSize: '13px' }}>
                <Sparkles size={14} /> Introducing Creator Digital Twin v2.4
              </Badge>
            </div>

            <h1
              style={{
                fontSize: 'clamp(36px, 5.5vw, 64px)',
                fontWeight: 900,
                letterSpacing: '-1.5px',
                lineHeight: 1.15,
                marginBottom: '24px',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.7)',
              }}
            >
              The AI-Powered Operating Platform for{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Modern Creators
              </span>
            </h1>

            <p
              style={{
                fontSize: '18px',
                color: '#cbd5e1',
                lineHeight: 1.6,
                maxWidth: '680px',
                margin: '0 auto 36px auto',
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.6)',
              }}
            >
              Ideate, script, produce, and adapt multimedia content across YouTube, Instagram, Reels, and LinkedIn
              while preserving your authentic voice through your personalized <strong>Creator Digital Twin</strong>.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/dashboard" className="btn-primary" style={{ padding: '12px 28px', fontSize: '16px' }}>
                <Zap size={18} /> Launch Creator Workspace
              </Link>
              <Link to="/login" className="btn-secondary" style={{ padding: '12px 24px', fontSize: '16px' }}>
                Sign In to Your Twin <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive 6-Stage Loop Section */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 70px 24px' }}>
          <WorkflowLoop currentStage="RECOMMEND" />
        </section>

        {/* Feature Pillar Highlights */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', fontWeight: 800 }}>
              Core Platform Pillars
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '6px' }}>
              Engineered for Retention, Authenticity & Scale
            </h2>
          </div>

          <div className="grid-3 stagger-container">
            <div className="card card-lift stagger-item">
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '16px',
                }}
              >
                <Bot size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                Creator Digital Twin
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Models your vocabulary, pacing, audience pain points, signature catchphrases, and visual aesthetics
                so AI never sounds generic or robotic.
              </p>
            </div>

            <div className="card card-lift stagger-item">
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  marginBottom: '16px',
                }}
              >
                <PenTool size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                Multi-Platform Studio
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                One idea automatically calibrated for YouTube scripts, Instagram carousels, vertical Reels, and
                high-engagement LinkedIn posts simultaneously.
              </p>
            </div>

            <div className="card card-lift stagger-item">
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-green)',
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                AI Content Critic
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Audits your hooks, clarity, CTA strength, and retention curves before you hit publish. Delivers
                1-click improved scripts instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid rgba(35, 46, 72, 0.65)',
            padding: '40px 24px',
            backgroundColor: 'rgba(17, 23, 38, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--primary)" />
              <span style={{ fontSize: '14px', fontWeight: 700 }}>CreatorAI</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• Built by Team Eclipse</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <Link to="/dashboard" style={{ color: 'inherit' }}>Dashboard</Link>
              <Link to="/login" style={{ color: 'inherit' }}>Log In</Link>
              <Link to="/signup" style={{ color: 'inherit' }}>Sign Up</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
