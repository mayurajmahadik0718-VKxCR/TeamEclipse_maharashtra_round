import React from 'react';

export const LoadingSkeleton = ({ count = 3, height = '80px', className = '' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card"
          style={{
            height,
            backgroundColor: 'rgba(24, 32, 50, 0.45)',
            borderColor: 'rgba(35, 46, 72, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'skeleton-pulse 2.2s ease-in-out infinite',
            animationDelay: `${i * 120}ms`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.12) 50%, transparent 100%)',
              animation: 'skeleton-shimmer 1.8s infinite ease-in-out',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
