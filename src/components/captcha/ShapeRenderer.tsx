
import React from 'react';
import { Shape } from '@/hooks/useShapeGenerator';
import { cn } from '@/lib/utils';

interface ShapeRendererProps {
  shape: Shape;
  onClick: (id: string) => void;
  highContrast?: boolean;
}

const ShapeRenderer: React.FC<ShapeRendererProps> = ({ shape, onClick, highContrast = false }) => {
  const { id, type, x, y, size, color, rotation, isSelected } = shape;
  
  // Common classes for all shapes
  const commonClasses = cn(
    'cursor-pointer smooth-transition transform-gpu',
    'hover:filter hover:brightness-110 hover:drop-shadow-md',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50',
    isSelected ? 'stroke-2 stroke-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : 'stroke-none',
  );

  // Styles for high contrast mode
  const getHighContrastStyles = () => {
    if (!highContrast) return {};

    return {
      strokeWidth: 3,
      stroke: '#000000',
      strokeOpacity: 0.8,
      filter: isSelected ? 'drop-shadow(0 0 4px white)' : 'none',
    };
  };

  // Create SVG paths for different shapes
  const renderShape = () => {
    const highContrastStyles = getHighContrastStyles();

    switch (type) {
      case 'circle':
        return (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            fill={color}
            className={commonClasses}
            onClick={() => onClick(id)}
            style={highContrastStyles}
          />
        );
        
      case 'square':
        return (
          <rect
            x="4"
            y="4"
            width={size - 8}
            height={size - 8}
            fill={color}
            className={commonClasses}
            onClick={() => onClick(id)}
            style={highContrastStyles}
          />
        );
        
      case 'triangle':
        const points = `${size / 2},4 ${size - 4},${size - 4} 4,${size - 4}`;
        return (
          <polygon
            points={points}
            fill={color}
            className={commonClasses}
            onClick={() => onClick(id)}
            style={highContrastStyles}
          />
        );
        
      case 'star':
        // Create a 5-point star
        const outerRadius = size / 2 - 4;
        const innerRadius = outerRadius / 2;
        let starPoints = '';
        
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / 5) * i;
          const x = size / 2 + radius * Math.sin(angle);
          const y = size / 2 - radius * Math.cos(angle);
          
          starPoints += `${x},${y} `;
        }
        
        return (
          <polygon
            points={starPoints.trim()}
            fill={color}
            className={commonClasses}
            onClick={() => onClick(id)}
            style={highContrastStyles}
          />
        );
        
      default:
        return null;
    }
  };

  // Enhanced ARIA attributes for accessibility
  const ariaAttributes = {
    role: "button",
    "aria-label": `${type} shape, color ${color.replace('#', '')}`,
    "aria-pressed": isSelected ? "true" : "false",
    tabIndex: 0,
  };

  // Create SVG container with appropriate positioning
  return (
    <svg
      width={size}
      height={size}
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
        transformOrigin: 'center',
        zIndex: isSelected ? 10 : 1,
      }}
      viewBox={`0 0 ${size} ${size}`}
      className={isSelected ? 'animate-pulse-subtle' : ''}
      {...ariaAttributes}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(id);
          e.preventDefault();
        }
      }}
    >
      {renderShape()}
    </svg>
  );
};

export default ShapeRenderer;
