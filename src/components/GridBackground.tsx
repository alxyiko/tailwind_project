// GridBackground.tsx
import React from 'react';

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, black 1px, transparent 1px),
          linear-gradient(to bottom, black 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        backgroundPosition: 'center center',
      }}
    >
      {children}
    </div>
  );
};

export default GridBackground;