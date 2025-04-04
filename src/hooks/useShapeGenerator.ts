
import { useState, useCallback, useMemo } from 'react';

// Types
export type ShapeType = 'circle' | 'square' | 'triangle' | 'star';
export type TargetShape = {
  type: ShapeType;
  color?: string;
  size?: 'small' | 'medium' | 'large';
};

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  isTarget: boolean;
  isSelected: boolean;
}

interface UseShapeGeneratorProps {
  canvasWidth: number;
  canvasHeight: number;
  shapeCount?: number;
  targetShape?: TargetShape;
  highContrast?: boolean;
}

// Constants
const STANDARD_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
const HIGH_CONTRAST_COLORS = ['#0000FF', '#00AA00', '#FFCC00', '#FF0000', '#9900FF', '#FF00FF'];
const MIN_SIZE = 30;
const MAX_SIZE = 60;
const MIN_DISTANCE = 40; // Minimum distance between shapes

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const useShapeGenerator = ({
  canvasWidth,
  canvasHeight,
  shapeCount = 10,
  targetShape,
  highContrast = false,
}: UseShapeGeneratorProps) => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  // Select the appropriate color palette
  const COLORS = useMemo(() => 
    highContrast ? HIGH_CONTRAST_COLORS : STANDARD_COLORS
  , [highContrast]);

  // Check if a position is valid (not too close to existing shapes)
  const isValidPosition = (x: number, y: number, size: number, shapes: Shape[]): boolean => {
    for (const shape of shapes) {
      const distance = Math.sqrt(Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2));
      if (distance < (size + shape.size) / 2 + MIN_DISTANCE) {
        return false;
      }
    }
    return true;
  };

  // Generate new set of shapes
  const generateShapes = useCallback(() => {
    const newShapes: Shape[] = [];
    const shapeTypes: ShapeType[] = ['circle', 'square', 'triangle', 'star'];
    
    // Determine how many target shapes to include (1-3)
    const targetCount = Math.floor(Math.random() * 3) + 1;
    
    // Determine the target shape type if not provided
    const targetShapeType = targetShape?.type || getRandomItem(shapeTypes);
    const targetColor = targetShape?.color || getRandomItem(COLORS);
    
    for (let i = 0; i < shapeCount; i++) {
      // Choose if this shape will be a target shape
      const isTarget = i < targetCount;
      
      // Determine shape properties
      let type: ShapeType;
      let color: string;
      
      if (isTarget) {
        // For target shapes, use the target type and color
        type = targetShapeType;
        color = targetColor;
      } else {
        // For non-target shapes, use random types and colors
        // Avoid using the same type as the target if possible
        do {
          type = getRandomItem(shapeTypes);
        } while (type === targetShapeType && Math.random() > 0.3); // 30% chance to allow same type
        
        // Avoid using the same color as the target if possible
        do {
          color = getRandomItem(COLORS);
        } while (color === targetColor && Math.random() > 0.3); // 30% chance to allow same color
      }
      
      // Determine size (smaller for harder identification)
      let size: number;
      
      if (targetShape?.size) {
        size = targetShape.size === 'small' 
          ? MIN_SIZE + Math.random() * 10
          : targetShape.size === 'medium'
            ? MIN_SIZE + 15 + Math.random() * 10
            : MAX_SIZE - 10 + Math.random() * 10;
      } else {
        size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
      }
      
      // Find a valid position
      let x: number, y: number;
      let attempts = 0;
      const maxAttempts = 50;
      
      do {
        x = size + Math.random() * (canvasWidth - size * 2);
        y = size + Math.random() * (canvasHeight - size * 2);
        attempts++;
        
        if (attempts > maxAttempts) {
          // If we can't find a valid position after many attempts,
          // reduce the size and try again
          size = Math.max(MIN_SIZE, size * 0.9);
          attempts = 0;
        }
      } while (!isValidPosition(x, y, size, newShapes) && attempts < maxAttempts);
      
      // Add the shape
      newShapes.push({
        id: `shape-${i}`,
        type,
        x,
        y,
        size,
        color,
        rotation: Math.random() * 360,
        isTarget,
        isSelected: false,
      });
    }
    
    setShapes(newShapes);
    return newShapes;
  }, [canvasWidth, canvasHeight, shapeCount, targetShape, COLORS]);

  // Toggle selection state of a shape
  const toggleSelectShape = useCallback((id: string) => {
    setShapes(prev => 
      prev.map(shape => 
        shape.id === id ? { ...shape, isSelected: !shape.isSelected } : shape
      )
    );
  }, []);

  // Get target shape information
  const targetInfo = useMemo(() => {
    if (!shapes.length) return null;
    
    const targetShapes = shapes.filter(shape => shape.isTarget);
    if (!targetShapes.length) return null;
    
    const firstTarget = targetShapes[0];
    return {
      type: firstTarget.type,
      color: firstTarget.color,
      count: targetShapes.length
    };
  }, [shapes]);

  // Reset all selections
  const resetSelections = useCallback(() => {
    setShapes(prev => 
      prev.map(shape => ({ ...shape, isSelected: false }))
    );
  }, []);

  return {
    shapes,
    targetInfo,
    generateShapes,
    toggleSelectShape,
    resetSelections
  };
};
