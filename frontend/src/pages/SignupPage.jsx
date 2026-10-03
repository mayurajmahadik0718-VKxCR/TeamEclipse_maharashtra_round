import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, ArrowRight, AlertCircle, Compass, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [niche, setNiche] = useState('AI & Tech Education');
  const [primaryPlatform, setPrimaryPlatform] = useState('youtube');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify and try again.');
      return;
    }

    setLoading(true);
    try {
      const res = await signup({
        fullName,
        email,
        password,
        niche,
        primaryPlatform,
      });

      if (res?.success) {
        navigate('/dashboard');
      } else {
        setError(res?.error || 'Registration failed.');
      }
    } catch (err) {
      setError(err?.message || 'Failed to create creator account.');
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
        padding: '32px 24px',
        position: 'relative',
      }}
    >
      <div
        className="ambient-glow"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="card card-lift animate-fade-in-up"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '36px 32px',
          backgroundColor: '#121727',
          border: '1px solid #232e4a',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.1)',
          borderRadius: '16px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              margin: '0 auto 12px auto',
              boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)',
            }}
          >
            <Sparkles size={22} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
            Initialize Your Digital Twin
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Train your personal AI engine to match your tone and style
          </p>
        </div>

        {error && (
          <div
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="input-field"
                placeholder="Aarav Sharma"
                style={{ paddingLeft: '38px' }}
              />
              <User
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

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
                placeholder="aarav@creatorai.io"
                style={{ paddingLeft: '38px' }}
              />
              <Mail
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Password
              </label>
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

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>

          <div className="grid-2" style={{ gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Primary Niche
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="input-field"
              >
                <option value="AI & Tech Education">AI & Tech Education</option>
                <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                <option value="Finance & Wealth">Finance & Wealth</option>
                <option value="Fitness & Health">Fitness & Health</option>
                <option value="Career & Productivity">Career & Productivity</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Primary Platform
              </label>
              <select
                value={primaryPlatform}
                onChange={(e) => setPrimaryPlatform(e.target.value)}
                className="input-field"
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="x">X / Twitter</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
          >
            {loading ? 'Creating Twin Persona...' : 'Create Creator Account'} <ArrowRight size={16} />
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '24px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#818cf8', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
