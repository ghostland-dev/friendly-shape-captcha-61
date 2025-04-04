
import React, { useRef, useEffect } from 'react';
import { Shape } from '@/hooks/useShapeGenerator';
import ShapeRenderer from './ShapeRenderer';
import { cn } from '@/lib/utils';

interface CaptchaCanvasProps {
  shapes: Shape[];
  width: number;
  height: number;
  onShapeClick: (id: string) => void;
  className?: string;
  isVerified?: boolean;
  isLoading?: boolean;
  highContrast?: boolean;
}

const CaptchaCanvas: React.FC<CaptchaCanvasProps> = ({
  shapes,
  width,
  height,
  onShapeClick,
  className,
  isVerified = false,
  isLoading = false,
  highContrast = false,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset the canvas sizing if needed
    if (canvasRef.current) {
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
    }
  }, [width, height]);

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-lg shadow-md',
        highContrast ? 'bg-gray-100 border-2 border-black' : 'bg-white/5 backdrop-blur-sm border border-white/10',
        'transition-all duration-500 ease-out transform',
        isVerified ? 'bg-primary/10' : isLoading ? 'bg-muted/30' : '',
        className
      )}
      style={{ width, height }}
      ref={canvasRef}
      role="application"
      aria-label="CAPTCHA de vérification de formes"
      tabIndex={0}
    >
      {/* Background pattern */}
      <div className={cn(
        "absolute inset-0",
        highContrast ? "bg-grid-pattern opacity-[0.08]" : "bg-grid-pattern opacity-[0.03]"
      )} />
      
      {/* Shapes */}
      {shapes.map((shape) => (
        <ShapeRenderer
          key={shape.id}
          shape={shape}
          onClick={isLoading || isVerified ? () => {} : onShapeClick}
          highContrast={highContrast}
        />
      ))}
      
      {/* Success overlay */}
      {isVerified && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center animate-fade-in z-20",
            highContrast ? "bg-green-200/80" : "bg-primary/10 backdrop-blur-sm"
          )}
          role="status"
          aria-label="Vérification réussie"
        >
          <div className={cn(
            "px-6 py-4 rounded-lg shadow-lg animate-scale-in transform",
            highContrast ? "bg-white border-2 border-black" : "bg-white/90 backdrop-blur-md"
          )}>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-green-600"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="text-center font-medium text-green-700">Vérification réussie</p>
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center z-20 animate-fade-in",
            highContrast ? "bg-gray-100/70" : "bg-background/50 backdrop-blur-sm"
          )}
          role="status"
          aria-label="Vérification en cours"
        >
          <div className={cn(
            "h-10 w-10 rounded-full border-4 border-t-primary animate-spin",
            highContrast ? "border-gray-300 border-t-black" : "border-primary/30 border-t-primary"
          )}></div>
        </div>
      )}
    </div>
  );
};

export default CaptchaCanvas;
