
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CaptchaAPI from '@/components/captcha/CaptchaAPI';
import IntegrationCode from '@/components/captcha/IntegrationCode';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Check } from 'lucide-react';
import { captchaService } from '@/services/captchaService';
import { CaptchaTheme } from '@/config/captchaConfig';

const Api = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [siteKey, setSiteKey] = useState("demo-site-key");
  const [generatedSiteKey, setGeneratedSiteKey] = useState("");
  const [demoTheme, setDemoTheme] = useState<CaptchaTheme>('auto');
  const [highContrast, setHighContrast] = useState(false);
  const [audioFallback, setAudioFallback] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  const handleVerified = (token: string) => {
    setIsVerified(true);
    setCaptchaToken(token);
    toast({
      title: "CAPTCHA vérifié",
      description: `Token généré: ${token.substring(0, 10)}...`,
    });
  };

  const generateApiKey = () => {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const newSiteKey = `site_${randomPart}`;
    setGeneratedSiteKey(newSiteKey);
    toast({
      title: "Clé API générée",
      description: "Ceci est une clé de démonstration. En production, enregistrez-vous pour une clé officielle.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedApiKey(true);
    toast({
      title: "Copié !",
      description: "Clé du site copiée dans le presse-papiers",
    });
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const verifyToken = () => {
    if (!captchaToken) {
      toast({
        title: "Erreur",
        description: "Aucun token à vérifier. Complétez d'abord le CAPTCHA.",
        variant: "destructive",
      });
      return;
    }

    const result = captchaService.verify(captchaToken);
    if (result.valid) {
      toast({
        title: "Token valide",
        description: `Token émis pour la clé: ${result.siteKey || 'inconnue'}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Token invalide",
        description: "Le token fourni n'est pas valide ou a expiré.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 to-gray-100 px-4 py-12 sm:px-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20 [background-size:20px_20px]"></div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-8 group"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Button>
        
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
            CaptchaPro API
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Intégrez facilement notre vérification conviviale dans vos applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <h2 className="text-xl font-medium mb-4">Démo interactive</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50/70 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium mb-2">Personnalisation</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Thème</label>
                    <select 
                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      value={demoTheme}
                      onChange={(e) => setDemoTheme(e.target.value as CaptchaTheme)}
                    >
                      <option value="auto">Auto</option>
                      <option value="light">Clair</option>
                      <option value="dark">Sombre</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Options</label>
                    <div className="space-y-1">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded mr-2"
                          checked={highContrast}
                          onChange={() => setHighContrast(!highContrast)}
                        />
                        <span className="text-sm">Contraste élevé</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded mr-2"
                          checked={audioFallback}
                          onChange={() => setAudioFallback(!audioFallback)}
                        />
                        <span className="text-sm">Audio</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <CaptchaAPI 
                  onVerified={handleVerified}
                  siteKey={siteKey}
                  theme={demoTheme}
                  accessibility={{
                    enableAudioFallback: audioFallback,
                    highContrast: highContrast
                  }}
                />
              </div>
              
              {isVerified && (
                <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-sm text-green-700 font-medium">
                      Vérification réussie !
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs" 
                      onClick={verifyToken}
                    >
                      Vérifier Token
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Token généré :</p>
                  <div className="bg-white/80 p-2 rounded text-xs font-mono overflow-x-auto">
                    {captchaToken}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <h2 className="text-xl font-medium mb-4">Obtenir une clé API</h2>
            <p className="text-sm text-gray-600 mb-4">
              Générez une clé de démonstration pour tester l'intégration. Pour une utilisation en production, vous pouvez vous inscrire à un plan payant.
            </p>
            
            <div className="flex gap-3 mb-4">
              <Button onClick={generateApiKey}>
                Générer une clé de démo
              </Button>
            </div>
            
            {generatedSiteKey && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Votre clé de site :</p>
                <div className="flex mt-1">
                  <Input 
                    value={generatedSiteKey} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => copyToClipboard(generatedSiteKey)}
                  >
                    {copiedApiKey ? <Check className="h-4 w-4" /> : "Copier"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Utilisez cette clé dans vos intégrations pour tester le CAPTCHA.
                </p>
              </div>
            )}
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
              <h3 className="font-medium text-blue-800 mb-2">Avantages de l'API CaptchaPro</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <span>Intégration facile dans n'importe quelle application web</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <span>Accessible aux personnes malvoyantes avec modes audio et contraste élevé</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <span>Taux de conversion plus élevé que les CAPTCHAs traditionnels</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <span>Tableaux de bord et statistiques détaillées</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6">Options d'intégration</h2>
          <IntegrationCode siteKey={generatedSiteKey || "your-site-key"} />
        </div>
        
        <Tabs defaultValue="usage" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="usage">Guide d'utilisation</TabsTrigger>
            <TabsTrigger value="server">Validation serveur</TabsTrigger>
            <TabsTrigger value="advanced">Options avancées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <h3 className="text-lg font-medium mb-4">Guide d'implémentation</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">1. Installation</h4>
                <p className="text-gray-700">Ajoutez notre script à votre page HTML ou installez notre package npm.</p>
                <div className="bg-gray-50 p-3 rounded-md mt-2 font-mono text-xs">
                  {`npm install captchapro-client --save`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">2. Configuration</h4>
                <p className="text-gray-700">Initialisez CaptchaPro avec votre clé de site.</p>
                <div className="bg-gray-50 p-3 rounded-md mt-2 font-mono text-xs">
                  {`CaptchaPro.init({ siteKey: "your-site-key" });`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">3. Rendu du CAPTCHA</h4>
                <p className="text-gray-700">Placez le CAPTCHA dans votre formulaire.</p>
                <div className="bg-gray-50 p-3 rounded-md mt-2 font-mono text-xs">
                  {`CaptchaPro.render('captcha-container', {
  onVerified: function(token) {
    // Store token in a hidden field
    document.getElementById('captcha-token').value = token;
  }
});`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">4. Validation</h4>
                <p className="text-gray-700">Vérifiez le token côté serveur pour compléter la validation.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="server" className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <h3 className="text-lg font-medium mb-4">Validation côté serveur</h3>
            <div className="space-y-4 text-sm">
              <p className="text-gray-700">Lorsqu'un utilisateur valide un CAPTCHA, un token est généré. Ce token doit être validé côté serveur :</p>
              
              <div className="bg-gray-50 p-3 rounded-md font-mono text-xs">
                {`// Exemple Node.js avec Express
app.post('/verify-captcha', async (req, res) => {
  const { token } = req.body;
  
  try {
    const response = await fetch('https://api.captchapro.com/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: 'your-secret-key',
        token: token
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // CAPTCHA valide, continuer le traitement
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: data.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erreur de vérification' });
  }
});`}
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md mt-2 text-blue-700 text-sm border border-blue-100">
                <h4 className="font-medium">Important</h4>
                <p>Ne faites jamais confiance uniquement à la validation côté client. La validation serveur est essentielle pour la sécurité.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <h3 className="text-lg font-medium mb-4">Options avancées</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">Personnalisation de l'apparence</h4>
                <p className="text-gray-700">CaptchaPro peut être personnalisé pour correspondre au style de votre site.</p>
                <div className="bg-gray-50 p-3 rounded-md mt-2 font-mono text-xs">
                  {`CaptchaPro.render('captcha-container', {
  siteKey: 'your-site-key',
  theme: 'dark', // 'light', 'dark', 'auto', 'custom'
  customColors: {
    primary: '#3B82F6',
    background: 'rgba(255, 255, 255, 0.9)',
    text: '#1F2937',
    accent: '#6366F1'
  },
  accessibility: {
    enableAudioFallback: true,
    highContrast: false
  }
});`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Webhooks et notifications</h4>
                <p className="text-gray-700">Recevez des notifications en temps réel.</p>
                <div className="bg-gray-50 p-3 rounded-md mt-2 font-mono text-xs">
                  {`CaptchaPro.init({
  siteKey: 'your-site-key',
  webhooks: {
    onVerified: 'https://votresite.com/webhooks/captcha-verified',
    onFailed: 'https://votresite.com/webhooks/captcha-failed'
  }
});`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Analytics</h4>
                <p className="text-gray-700">Suivez les performances de votre CAPTCHA.</p>
                <div className="bg-gray-50 p-3 rounded-md mt-2 font-mono text-xs">
                  {`CaptchaPro.init({
  siteKey: 'your-site-key',
  analytics: {
    enabled: true,
    sendEvents: true, // Envoyer les données à notre API
  }
});`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Méthodes de l'API</h4>
                <p className="text-gray-700">Contrôlez programmativement votre CAPTCHA.</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><code>CaptchaPro.reset()</code> - Réinitialiser le CAPTCHA</li>
                  <li><code>CaptchaPro.getResponse()</code> - Obtenir le token actuel</li>
                  <li><code>CaptchaPro.execute()</code> - Exécuter une vérification silencieuse</li>
                  <li><code>CaptchaPro.remove()</code> - Supprimer une instance de CAPTCHA</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium">Tarification</h2>
            <Button variant="outline" onClick={() => window.location.href = '/pricing'}>
              Voir tous les plans
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg">Démarrage</h3>
              <div className="mt-2 text-3xl font-bold">Gratuit</div>
              <p className="text-sm text-gray-600 mt-1">Pour les projets personnels</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" /> 
                  <span>1 000 vérifications/mois</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>1 domaine</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>Support par email</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow border-blue-200 bg-blue-50/50">
              <div className="absolute -mt-8 ml-2 bg-blue-600 text-white text-xs py-1 px-2 rounded-full">Populaire</div>
              <h3 className="font-medium text-lg">Standard</h3>
              <div className="mt-2 text-3xl font-bold">19€ <span className="text-base font-normal text-gray-600">/mois</span></div>
              <p className="text-sm text-gray-600 mt-1">Pour les sites professionnels</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" /> 
                  <span>50 000 vérifications/mois</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>5 domaines</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>Support prioritaire</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>Statistiques avancées</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg">Business</h3>
              <div className="mt-2 text-3xl font-bold">49€ <span className="text-base font-normal text-gray-600">/mois</span></div>
              <p className="text-sm text-gray-600 mt-1">Pour les grandes entreprises</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" /> 
                  <span>Utilisation illimitée</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>Domaines illimités</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>Support dédié</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  <span>API personnalisée</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30 mb-12">
          <h2 className="text-xl font-medium mb-4">Besoin d'aide ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-2">Documentation complète</h3>
              <p className="text-sm text-gray-600 mb-3">Consultez notre documentation détaillée pour tous les aspects de l'API.</p>
              <Button variant="outline" className="w-full">
                Voir la documentation
              </Button>
            </div>
            <div>
              <h3 className="font-medium mb-2">Contacter le support</h3>
              <p className="text-sm text-gray-600 mb-3">Notre équipe est disponible pour vous aider avec l'intégration.</p>
              <Button variant="outline" className="w-full">
                Contacter le support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Api;
