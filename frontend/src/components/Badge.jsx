import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variantClass = {
    primary: 'badge-primary',
    success: 'badge-success',
    cyan: 'badge-cyan',
  }[variant] || 'badge-primary';

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
