
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Headphones, Eye, VolumeX } from 'lucide-react';

interface AccessibilityControlProps {
  targetType?: string;
  targetCount?: number;
  targetColor?: string;
  onAudioChallengeCompleted?: () => void;
  highContrast?: boolean;
  onToggleHighContrast?: () => void;
}

const AccessibilityControl: React.FC<AccessibilityControlProps> = ({
  targetType,
  targetCount = 0,
  targetColor,
  onAudioChallengeCompleted,
  highContrast = false,
  onToggleHighContrast
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState(false);
  
  // Convertir la couleur hex en nom
  const getColorName = (color?: string) => {
    if (!color) return 'any color';
    
    const colorMap: Record<string, string> = {
      '#3B82F6': 'blue',
      '#10B981': 'green',
      '#F59E0B': 'yellow',
      '#EF4444': 'red',
      '#8B5CF6': 'purple',
      '#EC4899': 'pink'
    };
    
    return colorMap[color] || color;
  };
  
  // Générer le texte descriptif pour la synthèse vocale
  const generateAudioDescription = useCallback(() => {
    if (!targetType) return 'Please wait while the CAPTCHA is loading.';
    
    const colorName = getColorName(targetColor);
    const pluralSuffix = targetCount && targetCount > 1 ? 's' : '';
    const countText = targetCount ? `${targetCount}` : 'all';
    
    return `Audio CAPTCHA. Please select ${countText} ${colorName} ${targetType}${pluralSuffix} to verify you are human. Press space bar to select a shape when it is announced. Press the tab key to navigate between shapes.`;
  }, [targetType, targetColor, targetCount]);
  
  // Jouer l'audio
  const playAudioChallenge = useCallback(() => {
    if (!window.speechSynthesis) {
      alert("Sorry, your browser doesn't support the Web Speech API. Please try a modern browser.");
      return;
    }
    
    setIsPlaying(true);
    setAudioMode(true);
    
    const description = generateAudioDescription();
    const utterance = new SpeechSynthesisUtterance(description);
    utterance.rate = 1;
    utterance.onend = () => setIsPlaying(false);
    
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, [generateAudioDescription]);
  
  // Stopper l'audio
  const stopAudioChallenge = () => {
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };
  
  // Simuler la complétion du challenge audio
  const simulateCompletion = () => {
    onAudioChallengeCompleted?.();
  };

  return (
    <div className="flex items-center mt-2 justify-end space-x-2">
      {onToggleHighContrast && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs px-2 py-1 h-8"
          onClick={onToggleHighContrast}
          aria-label={highContrast ? "Désactiver le contraste élevé" : "Activer le contraste élevé"}
          title={highContrast ? "Désactiver le contraste élevé" : "Activer le contraste élevé"}
        >
          <Eye className="h-4 w-4 mr-1" />
          {highContrast ? "Contraste normal" : "Contraste élevé"}
        </Button>
      )}
      
      {!isPlaying ? (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs px-2 py-1 h-8"
          onClick={playAudioChallenge}
          disabled={isPlaying || !targetType}
          aria-label="Écouter le CAPTCHA audio"
          title="Écouter le CAPTCHA audio"
        >
          <Headphones className="h-4 w-4 mr-1" />
          Audio
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs px-2 py-1 h-8"
          onClick={stopAudioChallenge}
          aria-label="Arrêter l'audio"
          title="Arrêter l'audio"
        >
          <VolumeX className="h-4 w-4 mr-1" />
          Arrêter
        </Button>
      )}
      
      {audioMode && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs px-2 py-1 h-8 ml-2"
          onClick={simulateCompletion}
        >
          Compléter le défi audio
        </Button>
      )}
    </div>
  );
};

export default AccessibilityControl;
