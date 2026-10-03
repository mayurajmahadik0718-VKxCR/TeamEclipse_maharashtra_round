import React, { useState, useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse), never on touch/mobile
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isLargeScreen = window.innerWidth >= 768;
    const isTouchOnly = 'ontouchstart' in window && !hasFinePointer;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || isTouchOnly || !isLargeScreen || prefersReducedMotion) {
      setIsDesktop(false);
      return;
    }

    setIsDesktop(true);

    const handleMouseMove = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      setPosition({ x: clientX, y: clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering clickable interactive element or interactive card
      const target = e.target;
      const isClickable = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.card-lift') ||
        target.closest('.tab-btn') ||
        target.closest('.interactive-chip') ||
        target.getAttribute('role') === 'button'
      );
      setIsPointer(!!isClickable);

      // Update gentle parallax offsets on root for ambient floating elements (throttled via RAF)
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          const offsetX = ((clientX / window.innerWidth) - 0.5) * 24;
          const offsetY = ((clientY / window.innerHeight) - 0.5) * 24;
          document.documentElement.style.setProperty('--mouse-offset-x', `${offsetX}px`);
          document.documentElement.style.setProperty('--mouse-offset-y', `${offsetY}px`);
          rafRef.current = null;
        });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Subtle atmospheric ambient glow halo following cursor */}
      <div
        className="custom-cursor-glow"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: isPointer ? '64px' : '44px',
          height: isPointer ? '64px' : '44px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s ease-out, height 0.2s ease-out',
          filter: 'blur(3px)',
        }}
        aria-hidden="true"
      />

      {/* Subtle outer rounded ring */}
      <div
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: isPointer ? '42px' : '30px',
          height: isPointer ? '42px' : '30px',
          borderRadius: '50%',
          border: isPointer
            ? '1.5px solid rgba(129, 140, 248, 0.9)'
            : '1.5px solid rgba(99, 102, 241, 0.65)',
          backgroundColor: isPointer
            ? 'rgba(99, 102, 241, 0.18)'
            : 'rgba(99, 102, 241, 0.06)',
          boxShadow: isPointer
            ? '0 0 18px rgba(99, 102, 241, 0.55)'
            : '0 0 8px rgba(99, 102, 241, 0.25)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out, border-color 0.15s ease-out, box-shadow 0.15s ease-out',
        }}
        aria-hidden="true"
      />

      {/* Subtle center precision dot */}
      <div
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#818cf8',
          boxShadow: '0 0 6px #6366f1',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
