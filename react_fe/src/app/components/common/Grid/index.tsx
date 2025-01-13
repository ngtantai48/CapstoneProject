import React, { CSSProperties, ReactNode } from 'react';

interface GridComponentProps {
  children: ReactNode;
  gap?: string;
  padding?: string;
  minWidth?: string;
}

const GridComponent: React.FC<GridComponentProps> = ({
  children,
  gap = '16px',
  padding = '16px',
  minWidth = '200px',
}) => {
  const gridStyle: CSSProperties = {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
    gap: gap,
    padding: padding,
  };

  return <div style={gridStyle}>{children}</div>;
};

export default GridComponent;
