
import { useState, useCallback, useRef } from 'react';
import { Shape } from './useShapeGenerator';
import { analyticsService } from '@/services/analyticsService';
import { webhookService } from '@/services/webhookService';
import { VERIFICATION_ENDPOINT } from '@/config/captchaConfig';

interface UseCaptchaValidationProps {
  onSuccess?: (token?: string) => void;
  onFailure?: () => void;
  maxAttempts?: number;
  siteKey?: string;
  verifyRemotely?: boolean;
  webhooks?: {
    onVerified?: string;
    onFailed?: string;
  }
}

export const useCaptchaValidation = ({
  onSuccess,
  onFailure,
  maxAttempts = 3,
  siteKey = 'demo-site-key',
  verifyRemotely = false,
  webhooks
}: UseCaptchaValidationProps = {}) => {
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Configure webhooks if provided
  if (webhooks) {
    webhookService.configure(webhooks.onVerified, webhooks.onFailed);
  }

  // Check if the user selected all target shapes and only target shapes
  const validateSelection = useCallback((shapes: Shape[]): boolean => {
    const targetShapes = shapes.filter(shape => shape.isTarget);
    const selectedShapes = shapes.filter(shape => shape.isSelected);
    
    // Check if all selected shapes are targets
    const allSelectedAreTargets = selectedShapes.every(shape => shape.isTarget);
    
    // Check if all targets are selected
    const allTargetsAreSelected = targetShapes.every(shape => shape.isSelected);
    
    return allSelectedAreTargets && allTargetsAreSelected && selectedShapes.length > 0;
  }, []);

  // Remote verification via API if configured
  const verifyRemotely = useCallback(async (shapes: Shape[]): Promise<boolean> => {
    try {
      // Create verification payload
      const payload = {
        siteKey,
        selections: shapes.map(shape => ({ 
          id: shape.id, 
          isSelected: shape.isSelected,
          type: shape.type 
        })),
      };

      // Send to verification API
      const response = await fetch(VERIFICATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Verification server error');
      }

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error('Remote verification error:', error);
      return false;
    }
  }, [siteKey]);

  const handleValidation = useCallback(async (shapes: Shape[]) => {
    if (isVerified) return true;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Local validation first
    let isValid = validateSelection(shapes);
    
    // Remote validation if configured
    if (isValid && verifyRemotely) {
      isValid = await verifyRemotely(shapes);
    }
    
    const verificationTime = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    
    if (isValid) {
      // Generate token
      const token = generateVerificationToken(siteKey);
      setVerificationToken(token);
      setIsVerified(true);
      
      // Track success
      analyticsService.trackEvent('verified', { verificationTime });
      
      // Notify via webhook if configured
      webhookService.notifyVerificationSuccess({ token, siteKey });
      
      // Callback
      onSuccess?.(token);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Track attempt
      analyticsService.trackEvent('failed', { attemptCount: newAttempts });
      
      if (newAttempts >= maxAttempts) {
        setErrorMessage("Trop de tentatives incorrectes. Essayez un nouveau CAPTCHA.");
        webhookService.notifyVerificationFailure({ siteKey, attempts: newAttempts });
        onFailure?.();
      } else {
        setErrorMessage(`Sélection incorrecte. Il vous reste ${maxAttempts - newAttempts} tentative${maxAttempts - newAttempts > 1 ? 's' : ''}.`);
      }
    }
    
    setIsLoading(false);
    startTimeRef.current = null;
    return isValid;
  }, [attempts, isVerified, maxAttempts, onFailure, onSuccess, siteKey, validateSelection, verifyRemotely]);

  const reset = useCallback(() => {
    setAttempts(0);
    setIsVerified(false);
    setErrorMessage(null);
    setVerificationToken(null);
    startTimeRef.current = null;
  }, []);

  return {
    attempts,
    isVerified,
    isLoading,
    errorMessage,
    token: verificationToken,
    validateSelection,
    handleValidation,
    reset
  };
};

// Helper function to generate a verification token
const generateVerificationToken = (siteKey: string): string => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 10);
  // Simulé pour la démo - dans un environnement réel, nous utiliserions JWT ou similaire
  return `${siteKey}_${timestamp}_${randomPart}`;
};
