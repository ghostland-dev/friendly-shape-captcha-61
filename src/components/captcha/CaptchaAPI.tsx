
import React, { useCallback, useState, useEffect } from 'react';
import CaptchaContainer from './CaptchaContainer';
import { toast } from '@/components/ui/use-toast';
import { CaptchaTheme } from '@/config/captchaConfig';
import { captchaService } from '@/services/captchaService';

interface CaptchaAPIProps {
  onVerified?: (token: string) => void;
  onFailure?: () => void;
  siteKey?: string;
  width?: number;
  height?: number;
  className?: string;
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

/**
 * CaptchaAPI component - Use this to integrate the Shape CAPTCHA into any application
 */
const CaptchaAPI: React.FC<CaptchaAPIProps> = ({
  onVerified,
  onFailure,
  siteKey = 'demo-site-key',
  width = 320,
  height = 220,
  className,
  theme = 'auto',
  customColors = {},
  accessibility = {
    enableAudioFallback: false,
    highContrast: false
  },
  verifyRemotely = false,
  webhooks
}) => {
  const [token, setToken] = useState<string | null>(null);

  // Initialize captcha service
  useEffect(() => {
    if (!captchaService) return;
    
    captchaService.init({
      siteKey,
      theme: theme as CaptchaTheme,
      customColors,
      accessibility: {
        enableAudioFallback: accessibility.enableAudioFallback || false,
        highContrast: accessibility.highContrast || false
      },
      analytics: {
        enabled: true,
        sendEvents: false
      },
      webhooks
    });
  }, [siteKey, theme, customColors, accessibility, webhooks]);

  // Generate a verification token when CAPTCHA is verified
  const handleVerified = useCallback((newToken?: string) => {
    if (!newToken) {
      console.error('No verification token received');
      return;
    }
    
    setToken(newToken);
    onVerified?.(newToken);
    
    // Success toast
    toast({
      title: "Vérification réussie",
      description: "Vous avez prouvé que vous êtes humain.",
      variant: "default",
    });
  }, [onVerified]);

  // Handle verification failure
  const handleFailure = useCallback(() => {
    setToken(null);
    onFailure?.();
    
    // Error toast
    toast({
      title: "Échec de vérification",
      description: "Veuillez réessayer ou générer un nouveau CAPTCHA.",
      variant: "destructive",
    });
  }, [onFailure]);

  return (
    <div className="captcha-api-container">
      <CaptchaContainer
        onVerified={handleVerified}
        onFailure={handleFailure}
        width={width}
        height={height}
        className={className}
        siteKey={siteKey}
        theme={theme}
        customColors={customColors}
        accessibility={accessibility}
        verifyRemotely={verifyRemotely}
        webhooks={webhooks}
      />
      
      {token && (
        <input type="hidden" name="captcha-token" value={token} />
      )}
    </div>
  );
};

export default CaptchaAPI;
