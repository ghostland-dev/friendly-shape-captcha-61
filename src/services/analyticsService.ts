
import { CaptchaEvent, CaptchaEventData, ANALYTICS_ENDPOINT } from '@/config/captchaConfig';

class AnalyticsService {
  private enabled: boolean = true;
  private siteKey: string = '';
  private sendEvents: boolean = false;
  
  configure(siteKey: string, enabled: boolean, sendEvents: boolean) {
    this.siteKey = siteKey;
    this.enabled = enabled;
    this.sendEvents = sendEvents;
  }
  
  async trackEvent(eventType: CaptchaEvent, data?: Partial<Omit<CaptchaEventData, 'type' | 'siteKey' | 'timestamp'>>) {
    if (!this.enabled) return;
    
    try {
      const eventData: CaptchaEventData = {
        siteKey: this.siteKey,
        timestamp: Date.now(),
        type: eventType,
        userAgent: window.navigator.userAgent,
        ...data,
      };
      
      // Log locally for debugging
      console.log(`CaptchaPro Analytics: ${eventType}`, eventData);
      
      // Send to server if enabled
      if (this.sendEvents) {
        await this.sendToServer(eventData);
      }
    } catch (error) {
      console.error('Failed to track CAPTCHA event:', error);
    }
  }
  
  private async sendToServer(eventData: CaptchaEventData) {
    try {
      const response = await fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
        // Send as a non-blocking request
        keepalive: true,
      });
      
      if (!response.ok) {
        throw new Error(`Analytics server returned ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send analytics data:', error);
    }
  }
}

// Singleton instance
export const analyticsService = new AnalyticsService();
