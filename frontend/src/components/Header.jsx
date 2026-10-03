import React from 'react';

export const Header = ({ title, subtitle, action }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '28px',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default Header;
