
import { CaptchaConfig, defaultConfig } from '@/config/captchaConfig';
import { analyticsService } from '@/services/analyticsService';

class CaptchaService {
  private config: CaptchaConfig = { ...defaultConfig };
  private instances: Map<string, { element: HTMLElement; instanceId: string }> = new Map();
  private callbacks: Map<string, { onVerify: (token: string) => void; onError: () => void }> = new Map();
  private initialized = false;
  
  /**
   * Initialise le service CaptchaPro
   */
  init(config: Partial<CaptchaConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    
    // Configure analytics
    analyticsService.configure(
      this.config.siteKey,
      this.config.analytics.enabled, 
      this.config.analytics.sendEvents
    );
    
    this.initialized = true;
    return this;
  }
  
  /**
   * Rend un CAPTCHA dans l'élément DOM spécifié
   */
  render(elementId: string, options: { 
    onVerified?: (token: string) => void;
    onError?: () => void;
    siteKey?: string;
    theme?: 'light' | 'dark' | 'auto';
  } = {}) {
    if (!this.initialized) {
      this.init();
    }
    
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`CaptchaPro: Element with ID "${elementId}" not found`);
      return null;
    }
    
    // Générer un ID unique pour cette instance
    const instanceId = `captcha-instance-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Stocker l'instance et les callbacks
    this.instances.set(instanceId, { element, instanceId });
    this.callbacks.set(instanceId, { 
      onVerify: options.onVerified || (() => {}),
      onError: options.onError || (() => {})
    });
    
    // Marquer l'élément pour le rendu React
    element.setAttribute('data-captcha-id', instanceId);
    element.setAttribute('data-captcha-site-key', options.siteKey || this.config.siteKey);
    element.setAttribute('data-captcha-theme', options.theme || this.config.theme);
    
    // Dans une vraie implémentation, nous injecterions le composant React ici
    // Simulation pour la démo
    element.innerHTML = `
      <div class="captcha-placeholder" style="width: 100%; min-height: 300px; border: 1px solid #e2e8f0; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center">
        <p>CaptchaPro will render here (ID: ${instanceId})</p>
      </div>
    `;
    
    return instanceId;
  }
  
  /**
   * Vérifie un token CAPTCHA côté client (limité)
   * Dans une vraie implémentation, la validation se ferait côté serveur
   */
  verify(token: string): { valid: boolean; siteKey?: string; timestamp?: number } {
    if (!token) return { valid: false };
    
    const parts = token.split('_');
    if (parts.length !== 3) return { valid: false };
    
    const [siteKey, timestamp] = parts;
    const now = Date.now();
    const tokenAge = now - parseInt(timestamp, 10);
    
    // Tokens valides pendant 5 minutes maximum
    const isValid = tokenAge < 5 * 60 * 1000;
    
    return { 
      valid: isValid, 
      siteKey, 
      timestamp: parseInt(timestamp, 10) 
    };
  }
  
  /**
   * Réinitialise une instance spécifique
   */
  reset(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      console.error(`CaptchaPro: Instance "${instanceId}" not found`);
      return false;
    }
    
    // Dans une vraie implémentation, nous réinitialiserions le composant React
    const element = instance.element;
    element.querySelector('.captcha-placeholder')?.setAttribute(
      'data-reset', 
      Date.now().toString()
    );
    
    return true;
  }
  
  /**
   * Supprime une instance CAPTCHA
   */
  remove(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) return false;
    
    const element = instance.element;
    element.innerHTML = '';
    element.removeAttribute('data-captcha-id');
    element.removeAttribute('data-captcha-site-key');
    element.removeAttribute('data-captcha-theme');
    
    this.instances.delete(instanceId);
    this.callbacks.delete(instanceId);
    
    return true;
  }
  
  /**
   * Exécute le callback de vérification pour une instance
   * (utilisé en interne par le composant CAPTCHA)
   */
  executeVerifyCallback(instanceId: string, token: string) {
    const callbacks = this.callbacks.get(instanceId);
    if (callbacks) {
      callbacks.onVerify(token);
      return true;
    }
    return false;
  }
  
  /**
   * Exécute le callback d'erreur pour une instance
   * (utilisé en interne par le composant CAPTCHA)
   */
  executeErrorCallback(instanceId: string) {
    const callbacks = this.callbacks.get(instanceId);
    if (callbacks) {
      callbacks.onError();
      return true;
    }
    return false;
  }
}

// Export d'une instance singleton
export const captchaService = new CaptchaService();

// Pour l'intégration globale dans window
declare global {
  interface Window {
    FriendlyShapeCaptcha?: CaptchaService;
  }
}

// Ajouter à l'objet window pour l'accès via le script vanilla
if (typeof window !== 'undefined') {
  window.FriendlyShapeCaptcha = captchaService;
}
