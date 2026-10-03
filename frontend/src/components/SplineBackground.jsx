import React, { useEffect } from 'react';

export const SplineBackground = () => {
  useEffect(() => {
    // Ensure spline-viewer custom element definition script is loaded
    const scriptSrc = 'https://cdn.spline.design/@splinetool/viewer@2.0.66/build/spline-viewer.js';
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = scriptSrc;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      className="spline-bg-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        maxWidth: '100%',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.65,
      }}
      aria-hidden="true"
    >
      <spline-viewer
        url="https://prod.spline.design/kHZmtxToViPAmLPj/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      {/* Subtle radial & linear gradients to keep Spline subtle so text remains crystal-clear */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 35%, rgba(10, 13, 20, 0.4) 0%, rgba(10, 13, 20, 0.8) 70%, #0a0d14 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10, 13, 20, 0.5) 0%, transparent 25%, transparent 75%, rgba(10, 13, 20, 0.95) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default SplineBackground;
