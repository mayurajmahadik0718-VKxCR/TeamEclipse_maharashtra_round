import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'Get started by creating your first piece of content.',
  action,
}) => {
  return (
    <div
      className="card"
      style={{
        textAlign: 'center',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          marginBottom: '16px',
        }}
      >
        <Icon size={28} />
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          maxWidth: '420px',
          marginBottom: action ? '20px' : '0',
          lineHeight: '1.5',
        }}
      >
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
