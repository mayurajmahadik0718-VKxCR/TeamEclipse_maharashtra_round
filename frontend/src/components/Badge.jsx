import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '', style = {} }) => {
  const variantClass = {
    primary: 'badge-primary',
    success: 'badge-success',
    cyan: 'badge-cyan',
    amber: 'badge-amber',
    purple: 'badge-purple',
    rose: 'badge-rose',
    neutral: 'badge-neutral',
  }[variant] || 'badge-primary';

  return (
    <span className={`badge ${variantClass} ${className}`} style={style}>
      {children}
    </span>
  );
};

export default Badge;
