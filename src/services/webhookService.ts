
import { CaptchaEventData } from '@/config/captchaConfig';

class WebhookService {
  private verificationWebhook?: string;
  private failureWebhook?: string;
  
  configure(verificationWebhook?: string, failureWebhook?: string) {
    this.verificationWebhook = verificationWebhook;
    this.failureWebhook = failureWebhook;
  }
  
  async notifyVerificationSuccess(tokenData: { token: string; siteKey: string }) {
    if (!this.verificationWebhook) return;
    
    try {
      await this.sendWebhook(this.verificationWebhook, {
        status: 'success',
        event: 'verification',
        token: tokenData.token,
        siteKey: tokenData.siteKey,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to send verification webhook:', error);
    }
  }
  
  async notifyVerificationFailure(data: { siteKey: string; attempts: number }) {
    if (!this.failureWebhook) return;
    
    try {
      await this.sendWebhook(this.failureWebhook, {
        status: 'failed',
        event: 'verification',
        siteKey: data.siteKey,
        attempts: data.attempts,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to send failure webhook:', error);
    }
  }
  
  private async sendWebhook(url: string, data: any) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        keepalive: true,
      });
      
      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Webhook error:', error);
    }
  }
}

// Singleton instance
export const webhookService = new WebhookService();
