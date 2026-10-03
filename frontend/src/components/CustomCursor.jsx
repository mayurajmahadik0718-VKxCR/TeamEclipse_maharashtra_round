import React, { useState, useEffect } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse), never on touch/mobile
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isLargeScreen = window.innerWidth >= 768;
    const isTouchOnly = 'ontouchstart' in window && !hasFinePointer;

    if (!hasFinePointer || isTouchOnly || !isLargeScreen) {
      setIsDesktop(false);
      return;
    }

    setIsDesktop(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering clickable interactive element
      const target = e.target;
      const isClickable = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.getAttribute('role') === 'button'
      );
      setIsPointer(!!isClickable);
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
    };
  }, [isVisible]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Subtle outer rounded ring */}
      <div
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: isPointer ? '38px' : '28px',
          height: isPointer ? '38px' : '28px',
          borderRadius: '50%',
          border: isPointer
            ? '1.5px solid rgba(129, 140, 248, 0.85)'
            : '1.5px solid rgba(99, 102, 241, 0.6)',
          backgroundColor: isPointer
            ? 'rgba(99, 102, 241, 0.2)'
            : 'rgba(99, 102, 241, 0.08)',
          boxShadow: isPointer
            ? '0 0 16px rgba(99, 102, 241, 0.5)'
            : '0 0 8px rgba(99, 102, 241, 0.25)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out, border-color 0.15s ease-out',
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
