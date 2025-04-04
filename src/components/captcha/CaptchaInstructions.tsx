
import React from 'react';
import { cn } from '@/lib/utils';

interface CaptchaInstructionsProps {
  targetType?: string;
  targetColor?: string;
  targetCount?: number;
  errorMessage?: string | null;
  className?: string;
  showApiInfo?: boolean;
  highContrast?: boolean;
}

const CaptchaInstructions: React.FC<CaptchaInstructionsProps> = ({
  targetType,
  targetColor,
  targetCount = 0,
  errorMessage,
  className,
  showApiInfo = false,
  highContrast = false
}) => {
  // Helper function to format the color name
  const formatColorName = (color: string) => {
    // Convert hex to color name
    const colorMap: Record<string, string> = {
      '#3B82F6': 'bleu',
      '#10B981': 'vert',
      '#F59E0B': 'jaune',
      '#EF4444': 'rouge',
      '#8B5CF6': 'violet',
      '#EC4899': 'rose',
      // High contrast colors
      '#0000FF': 'bleu',
      '#00AA00': 'vert',
      '#FFCC00': 'jaune',
      '#FF0000': 'rouge',
      '#9900FF': 'violet',
      '#FF00FF': 'rose'
    };
    
    return colorMap[color] || color;
  };

  // Format shape type in French
  const formatShapeType = (type?: string) => {
    const shapeMap: Record<string, string> = {
      'circle': 'cercle',
      'square': 'carré',
      'triangle': 'triangle',
      'star': 'étoile'
    };
    
    return type ? shapeMap[type] || type : '';
  };

  // Generate instruction based on target parameters
  const getInstruction = () => {
    if (!targetType) return 'Chargement...';
    
    const colorName = targetColor ? formatColorName(targetColor) : 'de n\'importe quelle couleur';
    const shapeName = formatShapeType(targetType);
    const pluralSuffix = targetCount && targetCount > 1 ? 's' : '';
    const countText = targetCount ? `les ${targetCount}` : 'tous les';
    
    return (
      <>
        <span className="font-medium">Veuillez sélectionner {countText} {colorName} {shapeName}{pluralSuffix}</span>
      </>
    );
  };

  return (
    <div 
      className={cn(
        'rounded-lg p-4 shadow-sm transition-all duration-300',
        highContrast 
          ? 'bg-white border-2 border-black text-black' 
          : (errorMessage 
              ? 'bg-red-50/80 border border-red-100' 
              : 'bg-white/80 backdrop-blur-sm border border-white/10'
            ),
        className
      )}
      role="region"
      aria-label="Instructions du CAPTCHA"
    >
      <div className="flex flex-col space-y-2">
        <div className="text-center">
          <p className={cn(
            "text-sm mb-1",
            highContrast ? "text-gray-800" : "text-muted-foreground"
          )}>
            {showApiInfo ? 'CaptchaPro™' : 'Pour vérifier que vous êtes humain'}
          </p>
          <p className="text-base">
            {getInstruction()}
          </p>
        </div>
        
        {errorMessage && (
          <div className="mt-2 text-sm text-red-500 text-center animate-fade-in" role="alert">
            {errorMessage}
          </div>
        )}
        
        {showApiInfo && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            <a href="/api" className="text-blue-500 hover:underline">
              Intégrer ce CAPTCHA dans votre application ?
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptchaInstructions;
