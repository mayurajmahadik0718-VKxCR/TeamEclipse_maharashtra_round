import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Bot,
  Zap,
  TrendingUp,
  Flame,
  Youtube,
  Instagram,
  Linkedin,
  Video,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/Badge';

export const LoginPage = () => {
  const [email, setEmail] = useState('aarav@creatorai.io');
  const [password, setPassword] = useState('creator123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await login(email, password, rememberMe);
      if (res?.success) {
        navigate('/dashboard');
      } else {
        setError(res?.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogle();
      if (res?.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Gradient Orbs in Background */}
      <div
        className="ambient-glow"
        style={{
          position: 'absolute',
          top: '12%',
          left: '18%',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        className="ambient-glow"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          animationDelay: '-3s',
        }}
      />

      {/* Floating Ambient CreatorAI Concept Badges & Telemetry (Non-blocking) */}
      <div
        className="floating-chip float-anim-1"
        style={{
          top: '12%',
          left: '6%',
          borderColor: 'rgba(99, 102, 241, 0.35)',
        }}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444',
          }}
        >
          <Youtube size={15} />
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
            YouTube Script
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
            3-Min Setup Hook Generated
          </span>
        </div>
      </div>

      <div
        className="floating-chip float-anim-2"
        style={{
          bottom: '14%',
          left: '8%',
          borderColor: 'rgba(245, 158, 11, 0.3)',
        }}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b',
          }}
        >
          <Flame size={15} />
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
            Opportunity Detected
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
            Local LLMs • 96% Audience Fit
          </span>
        </div>
      </div>

      <div
        className="floating-chip float-anim-3"
        style={{
          top: '16%',
          right: '8%',
          borderColor: 'rgba(6, 182, 212, 0.3)',
        }}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34d399',
          }}
        >
          <ShieldCheck size={15} />
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
            Creator Health Score
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399' }}>
            94/100 • Optimal Growth
          </span>
        </div>
      </div>

      <div
        className="floating-chip float-anim-1"
        style={{
          bottom: '12%',
          right: '9%',
          borderColor: 'rgba(168, 85, 247, 0.35)',
          animationDelay: '-2s',
        }}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c084fc',
          }}
        >
          <Bot size={15} />
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
            Digital Twin Model
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
            Voice & Pacing Calibrated
          </span>
        </div>
      </div>

      {/* Main Split-Screen Container */}
      <div className="login-split-layout">
        {/* Left Side: CreatorAI Platform Story & Capabilities */}
        <div className="login-left-brand-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Brand Flag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.5)',
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Creator<span style={{ color: '#818cf8' }}>AI</span>
              </span>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Autonomous Operating Platform
              </span>
            </div>
          </div>

          {/* Heading */}
          <div>
            <div style={{ marginBottom: '10px' }}>
              <Badge variant="cyan">
                <Zap size={12} /> Next-Gen Creator Workspace
              </Badge>
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 3.8vw, 42px)',
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: '-1px',
                color: 'var(--text-primary)',
              }}
            >
              Understand, Create, and{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Scale Your Audience
              </span>
            </h1>
          </div>

          {/* Short, strong platform description */}
          <p
            style={{
              fontSize: '15px',
              color: '#cbd5e1',
              lineHeight: 1.6,
              maxWidth: '520px',
            }}
          >
            CreatorAI replaces fragmented creator workflows with a personalized <strong>Digital Twin</strong>.
            Understand audience retention, discover high-urgency content opportunities, generate multi-platform assets,
            and elevate performance through continuous closed-loop learning.
          </p>

          {/* 4 Core Pillars Feature Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div
              className="card card-lift"
              style={{
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Compass size={15} color="#818cf8" />
                <strong style={{ fontSize: '13px', color: '#f8fafc' }}>Understand Content</strong>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Map audience drop-offs and tone retention curves.
              </p>
            </div>

            <div
              className="card card-lift"
              style={{
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Flame size={15} color="#fbbf24" />
                <strong style={{ fontSize: '13px', color: '#f8fafc' }}>Discover Opportunities</strong>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Surface real-time whitespace trends with 90%+ fit.
              </p>
            </div>

            <div
              className="card card-lift"
              style={{
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Zap size={15} color="#34d399" />
                <strong style={{ fontSize: '13px', color: '#f8fafc' }}>Create Multi-Platform</strong>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Adapt 1 idea to YouTube, Reels, and LinkedIn simultaneously.
              </p>
            </div>

            <div
              className="card card-lift"
              style={{
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <TrendingUp size={15} color="#22d3ee" />
                <strong style={{ fontSize: '13px', color: '#f8fafc' }}>Improve Performance</strong>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Closed-loop AI critique that grows smarter with every post.
              </p>
            </div>
          </div>

          {/* Social Proof / Capability Ribbon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', paddingTop: '4px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Built for creators across:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                <Youtube size={14} color="#f43f5e" /> YouTube
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                <Instagram size={14} color="#ec4899" /> Instagram
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                <Video size={14} color="#a855f7" /> Reels & Shorts
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                <Linkedin size={14} color="#0ea5e9" /> LinkedIn
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Glassy Elevated Login Card */}
        <div
          className="glass-card-elevated card-lift animate-fade-in-up"
          style={{
            padding: '40px 34px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Card Header */}
          <div style={{ marginBottom: '26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text-primary)' }}>
                Welcome back 👋
              </h2>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                }}
              >
                <Sparkles size={16} />
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Sign in to access your Creator Digital Twin & workspace
            </p>
          </div>

          {error && (
            <div
              className="animate-fade-in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '20px',
                fontSize: '13px',
                color: '#fb7185',
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn-secondary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '11px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              gap: '10px',
              marginBottom: '18px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Form Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px',
              color: 'var(--text-muted)',
              fontSize: '12px',
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
            <span>or sign in with email</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="creator@example.com"
                  style={{ paddingLeft: '38px' }}
                />
                <Mail
                  size={16}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <Link to="/forgot-password" style={{ fontSize: '12px', color: '#818cf8', fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="••••••••"
                  style={{ paddingLeft: '38px' }}
                />
                <Lock
                  size={16}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" style={{ cursor: 'pointer', userSelect: 'none' }}>
                Remember me on this browser
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '4px', fontSize: '14px' }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Workspace'} <ArrowRight size={16} />
            </button>
          </form>

          {/* Signup Footer Link */}
          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '22px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#818cf8', fontWeight: 600 }}>
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
