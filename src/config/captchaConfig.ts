
export type CaptchaTheme = 'light' | 'dark' | 'auto' | 'custom';

export interface CaptchaConfig {
  siteKey: string;
  theme: CaptchaTheme;
  customColors?: {
    primary?: string;
    background?: string;
    text?: string;
    accent?: string;
  };
  accessibility: {
    enableAudioFallback: boolean;
    highContrast: boolean;
  };
  analytics: {
    enabled: boolean;
    sendEvents: boolean;
  };
  webhooks?: {
    onVerified?: string;
    onFailed?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
}

export const defaultConfig: CaptchaConfig = {
  siteKey: 'demo-site-key',
  theme: 'auto',
  accessibility: {
    enableAudioFallback: false,
    highContrast: false,
  },
  analytics: {
    enabled: true,
    sendEvents: false,
  },
  difficulty: 'medium',
};

export type CaptchaEvent = 
  | 'verified' 
  | 'failed' 
  | 'generated' 
  | 'attempted';

export interface CaptchaEventData {
  siteKey: string;
  timestamp: number;
  type: CaptchaEvent;
  attemptCount?: number;
  verificationTime?: number; // ms
  userAgent?: string;
  ipAddress?: string; // Sera masqué pour la confidentialité
}

export const ANALYTICS_ENDPOINT = 'https://api.captchapro.com/analytics';
export const VERIFICATION_ENDPOINT = 'https://api.captchapro.com/verify';
