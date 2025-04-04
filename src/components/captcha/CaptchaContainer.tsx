
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import CaptchaCanvas from './CaptchaCanvas';
import CaptchaInstructions from './CaptchaInstructions';
import AccessibilityControl from './AccessibilityControl';
import { useShapeGenerator } from '@/hooks/useShapeGenerator';
import { useCaptchaValidation } from '@/hooks/useCaptchaValidation';
import { cn } from '@/lib/utils';
import { analyticsService } from '@/services/analyticsService';
import { CaptchaTheme } from '@/config/captchaConfig';
import { RefreshCcw, ShieldCheck } from 'lucide-react';

interface CaptchaContainerProps {
  onVerified?: (token?: string) => void;
  onFailure?: () => void;
  width?: number;
  height?: number;
  className?: string;
  siteKey?: string;
  theme?: CaptchaTheme;
  customColors?: {
    primary?: string;
    background?: string;
    text?: string;
    accent?: string;
  };
  accessibility?: {
    enableAudioFallback?: boolean;
    highContrast?: boolean;
  };
  verifyRemotely?: boolean;
  webhooks?: {
    onVerified?: string;
    onFailed?: string;
  };
}

const CaptchaContainer: React.FC<CaptchaContainerProps> = ({
  onVerified,
  onFailure,
  width = 320,
  height = 220,
  className,
  siteKey = 'demo-site-key',
  theme = 'auto',
  customColors = {},
  accessibility = {
    enableAudioFallback: false,
    highContrast: false
  },
  verifyRemotely = false,
  webhooks
}) => {
  const [canvasSize, setCanvasSize] = useState({ width, height });
  const [highContrast, setHighContrast] = useState(accessibility.highContrast);
  const [audioMode, setAudioMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize shape generator
  const {
    shapes,
    targetInfo,
    generateShapes,
    toggleSelectShape,
    resetSelections
  } = useShapeGenerator({
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height,
    shapeCount: 8,
    highContrast
  });
  
  // Initialize validation logic
  const {
    isVerified,
    isLoading,
    errorMessage,
    token,
    handleValidation,
    reset: resetValidation
  } = useCaptchaValidation({
    onSuccess: (token) => {
      onVerified?.(token);
    },
    maxAttempts: 3,
    onFailure,
    siteKey,
    verifyRemotely,
    webhooks
  });
  
  // Generate shapes on initial load
  useEffect(() => {
    generateShapes();
    analyticsService.trackEvent('generated');
  }, [generateShapes]);
  
  // Handle shape click
  const handleShapeClick = useCallback((id: string) => {
    toggleSelectShape(id);
  }, [toggleSelectShape]);
  
  // Handle verify button click
  const handleVerify = useCallback(async () => {
    analyticsService.trackEvent('attempted');
    const result = await handleValidation(shapes);
    if (!result) {
      // If validation failed, wait a moment before resetting
      setTimeout(() => {
        resetSelections();
      }, 1000);
    }
  }, [handleValidation, resetSelections, shapes]);
  
  // Handle regenerate CAPTCHA
  const handleRegenerateCaptcha = useCallback(() => {
    resetSelections();
    resetValidation();
    generateShapes();
    analyticsService.trackEvent('generated');
  }, [generateShapes, resetSelections, resetValidation]);
  
  // Toggle high contrast mode
  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => !prev);
  }, []);
  
  // Handle audio challenge completion
  const handleAudioChallengeCompleted = useCallback(() => {
    onVerified?.(token || `${siteKey}_${Date.now()}_audio`);
    setAudioMode(false);
  }, [onVerified, siteKey, token]);
  
  // Adjust canvas size based on container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        if (containerWidth < width) {
          setCanvasSize({
            width: containerWidth - 40, // Adjust for padding
            height: height * ((containerWidth - 40) / width) // Maintain aspect ratio
          });
        } else {
          setCanvasSize({ width, height });
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);
  
  // Apply theme
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800/80 backdrop-blur-md border-gray-700/50 text-white';
      case 'light': 
        return 'bg-white/80 backdrop-blur-md border-white/50 text-gray-900';
      case 'custom':
        // Pour les couleurs personnalisées, on laisse le style par défaut et on applique des styles inline
        return '';
      default: // 'auto'
        return 'glass';
    }
  };
  
  // Get custom style based on customColors prop
  const getCustomStyle = () => {
    if (theme !== 'custom') return {};
    
    return {
      backgroundColor: customColors.background || 'rgba(255, 255, 255, 0.8)',
      color: customColors.text || 'inherit',
      borderColor: customColors.accent || 'rgba(255, 255, 255, 0.2)',
      '--primary-color': customColors.primary || '#3B82F6' // Pour être utilisé dans les composants enfants
    } as React.CSSProperties;
  };

  return (
    <div 
      ref={containerRef}
      id="captcha-container"
      className={cn(
        'flex flex-col space-y-4 p-5 rounded-xl border shadow-lg transition-all duration-300',
        getThemeClasses(),
        className
      )}
      style={getCustomStyle()}
      data-site-key={siteKey}
      data-theme={theme}
    >
      <div className="text-center mb-1 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Vérification</h3>
        <div className="text-xs opacity-60 flex items-center">
          <ShieldCheck className="h-3 w-3 mr-1" />
          CaptchaPro
        </div>
      </div>
      
      <CaptchaInstructions 
        targetType={targetInfo?.type}
        targetColor={targetInfo?.color}
        targetCount={targetInfo?.count}
        errorMessage={errorMessage}
        className="animate-fade-in"
        highContrast={highContrast}
      />
      
      <CaptchaCanvas 
        shapes={shapes}
        width={canvasSize.width}
        height={canvasSize.height}
        onShapeClick={handleShapeClick}
        isVerified={isVerified}
        isLoading={isLoading}
        className="mx-auto animate-fade-in"
        highContrast={highContrast}
      />
      
      {accessibility.enableAudioFallback && (
        <AccessibilityControl 
          targetType={targetInfo?.type}
          targetColor={targetInfo?.color}
          targetCount={targetInfo?.count}
          onAudioChallengeCompleted={handleAudioChallengeCompleted}
          highContrast={highContrast}
          onToggleHighContrast={toggleHighContrast}
        />
      )}
      
      <div className="flex space-x-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleRegenerateCaptcha}
          disabled={isLoading}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Nouveau
        </Button>
        <Button
          className="flex-1"
          onClick={handleVerify}
          disabled={isVerified || isLoading}
          style={{
            backgroundColor: theme === 'custom' ? (customColors.primary || '') : ''
          }}
        >
          {isLoading ? 'Vérification...' : isVerified ? 'Vérifié' : 'Vérifier'}
        </Button>
      </div>
      
      {isVerified && token && (
        <input type="hidden" name="captcha-token" value={token} />
      )}
    </div>
  );
};

export default CaptchaContainer;
