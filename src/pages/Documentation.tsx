
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CaptchaContainer from '@/components/captcha/CaptchaContainer';
import { ArrowLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Documentation = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="group"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Retour
            </Button>
            <h1 className="text-xl font-semibold">Documentation CaptchaPro</h1>
          </div>
          <div>
            <Button variant="outline" onClick={() => window.location.href = '/api'}>
              API
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <div 
          className={`bg-white border-r transition-all duration-300 h-[calc(100vh-4rem)] sticky top-16 ${
            sidebarCollapsed ? 'w-14' : 'w-64'
          }`}
        >
          <div className="p-3 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${
                sidebarCollapsed ? 'rotate-0' : 'rotate-180'
              }`} />
            </Button>
          </div>
          
          {!sidebarCollapsed && (
            <nav className="px-3 py-2">
              <div className="mb-4">
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Commencer</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#introduction" className="block p-2 hover:bg-gray-100 rounded-md">Introduction</a>
                  </li>
                  <li>
                    <a href="#installation" className="block p-2 hover:bg-gray-100 rounded-md">Installation</a>
                  </li>
                  <li>
                    <a href="#quickstart" className="block p-2 hover:bg-gray-100 rounded-md">Guide rapide</a>
                  </li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">API Client</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#client-api" className="block p-2 hover:bg-gray-100 rounded-md">Client API</a>
                  </li>
                  <li>
                    <a href="#react" className="block p-2 hover:bg-gray-100 rounded-md">React</a>
                  </li>
                  <li>
                    <a href="#vanilla-js" className="block p-2 hover:bg-gray-100 rounded-md">JavaScript</a>
                  </li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">API Serveur</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#verification" className="block p-2 hover:bg-gray-100 rounded-md">Vérification</a>
                  </li>
                  <li>
                    <a href="#webhooks" className="block p-2 hover:bg-gray-100 rounded-md">Webhooks</a>
                  </li>
                  <li>
                    <a href="#analytics" className="block p-2 hover:bg-gray-100 rounded-md">Analytics</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Avancé</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#customization" className="block p-2 hover:bg-gray-100 rounded-md">Personnalisation</a>
                  </li>
                  <li>
                    <a href="#accessibility" className="block p-2 hover:bg-gray-100 rounded-md">Accessibilité</a>
                  </li>
                  <li>
                    <a href="#security" className="block p-2 hover:bg-gray-100 rounded-md">Sécurité</a>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>
        
        {/* Main content */}
        <div className="flex-1 px-4 py-8 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <section id="introduction" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Documentation CaptchaPro</h2>
              <p className="text-lg text-gray-700 mb-4">
                CaptchaPro est un service de vérification humaine conçu pour être plus accessible et convivial que les CAPTCHAs traditionnels.
                Basé sur la reconnaissance de formes colorées plutôt que sur des textes déformés ou des grilles d'images, il offre une expérience utilisateur améliorée.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Pourquoi choisir CaptchaPro ?</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span> 
                    <span>Interface intuitive avec des formes colorées faciles à identifier.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span> 
                    <span>Fonctionnalités d'accessibilité pour les personnes malvoyantes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span> 
                    <span>Taux de conversion plus élevé que les CAPTCHAs traditionnels (jusqu'à 30% d'amélioration).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span> 
                    <span>Intégration facile dans tout type de site web ou application.</span>
                  </li>
                </ul>
              </div>
              
              <Tabs defaultValue="example">
                <TabsList>
                  <TabsTrigger value="example">Exemple</TabsTrigger>
                  <TabsTrigger value="how-it-works">Comment ça marche</TabsTrigger>
                </TabsList>
                <TabsContent value="example" className="p-4 border rounded-lg mt-2">
                  <p className="mb-4 text-sm text-gray-600">
                    Voici un exemple de CaptchaPro en action. Essayez de sélectionner les formes demandées pour voir comment fonctionne la vérification.
                  </p>
                  <div className="flex justify-center">
                    <CaptchaContainer 
                      width={280}
                      height={200}
                      accessibility={{
                        enableAudioFallback: true,
                        highContrast: false
                      }}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="how-it-works" className="p-4 border rounded-lg mt-2">
                  <p className="text-gray-700 mb-3">
                    CaptchaPro génère un ensemble de formes colorées et demande à l'utilisateur d'identifier et sélectionner des formes spécifiques. Le processus fonctionne comme suit :
                  </p>
                  <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                    <li>L'utilisateur reçoit une instruction pour sélectionner certaines formes (par ex. "tous les triangles bleus")</li>
                    <li>Le CAPTCHA génère un ensemble aléatoire de formes sur un canvas</li>
                    <li>L'utilisateur identifie et clique sur les formes correspondant à l'instruction</li>
                    <li>À la vérification, le système compare les sélections avec les réponses attendues</li>
                    <li>Si la sélection est correcte, un token de vérification est généré</li>
                    <li>Ce token est ensuite validé côté serveur pour confirmer l'authenticité</li>
                  </ol>
                </TabsContent>
              </Tabs>
            </section>
            
            <section id="installation" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Installation</h2>
              <p className="mb-4">
                CaptchaPro peut être intégré de plusieurs façons. Choisissez la méthode qui convient le mieux à votre projet.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Via CDN</h3>
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                <pre className="text-sm"><code>{`<script src="https://cdn.captchapro.com/captcha.min.js"></script>`}</code></pre>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Via NPM (pour React, Vue, Angular)</h3>
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                <pre className="text-sm"><code>{`npm install captchapro-client --save

# ou avec yarn
yarn add captchapro-client`}</code></pre>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 my-6">
                <h4 className="font-medium text-yellow-800">Important</h4>
                <p className="text-yellow-700 text-sm">
                  Pour utiliser CaptchaPro, vous aurez besoin d'une clé de site. Vous pouvez en obtenir une en vous inscrivant sur notre <a href="/api" className="text-blue-600 hover:underline">page API</a>.
                </p>
              </div>
            </section>
            
            <section id="quickstart" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Guide rapide</h2>
              <p className="mb-4">
                Voici comment intégrer rapidement CaptchaPro dans votre application.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">HTML de base</h3>
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`<!-- 1. Ajoutez le conteneur pour le CAPTCHA -->
<div id="captcha-container"></div>

<!-- 2. Ajoutez un champ caché pour stocker le token -->
<input type="hidden" id="captcha-token" name="captcha-token">

<!-- 3. Ajoutez le script CaptchaPro -->
<script src="https://cdn.captchapro.com/captcha.min.js"></script>

<!-- 4. Initialisez CaptchaPro -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    CaptchaPro.render('captcha-container', {
      siteKey: 'your-site-key',
      onVerified: function(token) {
        document.getElementById('captcha-token').value = token;
      }
    });
  });
</script>`}</code></pre>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Validation côté serveur</h3>
              <p className="mb-3">
                Après soumission du formulaire, validez le token côté serveur :
              </p>
              
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// Exemple PHP
$token = $_POST['captcha-token'];
$secret = 'your-secret-key';

$response = file_get_contents('https://api.captchapro.com/verify?token=' . $token . '&secret=' . $secret);
$result = json_decode($response);

if ($result->success) {
  // Le CAPTCHA est valide, traitez le formulaire
} else {
  // Le CAPTCHA est invalide ou expiré
}`}</code></pre>
              </div>
              
              <Button className="mt-4" onClick={() => document.getElementById('client-api')?.scrollIntoView({ behavior: 'smooth' })}>
                En savoir plus sur l'API client
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </section>
            
            <section id="client-api" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">API Client</h2>
              <p className="mb-4">
                L'API client CaptchaPro vous permet d'intégrer et de contrôler le CAPTCHA dans votre interface utilisateur.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3" id="react">Intégration React</h3>
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`import { CaptchaAPI } from 'captchapro-client';
import React, { useState } from 'react';

const ContactForm = () => {
  const [token, setToken] = useState('');
  
  const handleCaptchaVerified = (token) => {
    setToken(token);
  };
  
  return (
    <form>
      {/* Champs du formulaire */}
      
      <CaptchaAPI 
        siteKey="your-site-key"
        onVerified={handleCaptchaVerified}
        theme="light"
        accessibility={{
          enableAudioFallback: true,
          highContrast: false
        }}
      />
      
      <input type="hidden" name="captcha-token" value={token} />
      
      <button type="submit" disabled={!token}>
        Envoyer
      </button>
    </form>
  );
};`}</code></pre>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3" id="vanilla-js">Intégration JavaScript Vanilla</h3>
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// Initialisation du service
CaptchaPro.init({
  siteKey: 'your-site-key',
  analytics: {
    enabled: true,
    sendEvents: true
  }
});

// Rendu du CAPTCHA
const captchaId = CaptchaPro.render('captcha-container', {
  theme: 'auto',
  onVerified: function(token) {
    document.getElementById('captcha-token').value = token;
    document.getElementById('submit-button').disabled = false;
  },
  onFailure: function() {
    console.error('Vérification échouée');
  }
});

// Réinitialiser le CAPTCHA
function resetCaptcha() {
  CaptchaPro.reset(captchaId);
}`}</code></pre>
              </div>
              
              <div className="bg-gray-50 border rounded-lg p-4 mt-6">
                <h4 className="font-medium mb-2">Méthodes API disponibles</h4>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Méthode</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>CaptchaPro.init(config)</code></td>
                      <td>Initialise le service avec la configuration globale</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>CaptchaPro.render(elementId, options)</code></td>
                      <td>Rend un CAPTCHA dans l'élément spécifié</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>CaptchaPro.reset(instanceId)</code></td>
                      <td>Réinitialise un CAPTCHA spécifique</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>CaptchaPro.remove(instanceId)</code></td>
                      <td>Supprime une instance de CAPTCHA</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4"><code>CaptchaPro.verify(token)</code></td>
                      <td>Vérifie un token côté client (validation limitée)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section id="verification" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Vérification du token</h2>
              <p className="mb-4">
                Une fois que l'utilisateur a complété le CAPTCHA, vous devez vérifier le token côté serveur.
              </p>
              
              <div className="bg-gray-50 border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Endpoint de vérification</h3>
                <p className="mb-2"><code>https://api.captchapro.com/verify</code></p>
                <p className="mb-4">Méthode: <strong>POST</strong></p>
                
                <h4 className="font-medium mb-1">Paramètres</h4>
                <table className="min-w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Paramètre</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>secret</code></td>
                      <td>Votre clé secrète (ne jamais exposer côté client)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>token</code></td>
                      <td>Le token généré par le CAPTCHA</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4"><code>remoteip</code></td>
                      <td>(Optionnel) L'adresse IP de l'utilisateur</td>
                    </tr>
                  </tbody>
                </table>
                
                <h4 className="font-medium mb-1">Réponse</h4>
                <div className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                <pre className="text-sm"><code>{`{
  "success": true,
  "timestamp": "2023-06-15T14:22:31Z",
  "hostname": "example.com"
}`}</code></pre>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-red-800 mb-2">Sécurité importante</h4>
                <p className="text-red-700 text-sm">
                  Ne vous fiez jamais uniquement à la validation côté client. La vérification côté serveur est essentielle pour empêcher les attaques de bypass du CAPTCHA.
                </p>
              </div>
            </section>
            
            <section id="customization" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Personnalisation</h2>
              <p className="mb-4">
                CaptchaPro offre de nombreuses options de personnalisation pour s'adapter à votre site.
              </p>
              
              <Tabs defaultValue="themes">
                <TabsList>
                  <TabsTrigger value="themes">Thèmes</TabsTrigger>
                  <TabsTrigger value="colors">Couleurs</TabsTrigger>
                  <TabsTrigger value="size">Taille et position</TabsTrigger>
                </TabsList>
                
                <TabsContent value="themes" className="p-4 border rounded-lg mt-2">
                  <p className="mb-3">CaptchaPro propose plusieurs thèmes prédéfinis :</p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>auto</strong> - S'adapte au mode clair/sombre de l'utilisateur</li>
                    <li><strong>light</strong> - Thème clair</li>
                    <li><strong>dark</strong> - Thème sombre</li>
                    <li><strong>custom</strong> - Couleurs personnalisées</li>
                  </ul>
                  
                  <div className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                    <pre className="text-sm"><code>{`CaptchaPro.render('captcha-container', {
  siteKey: 'your-site-key',
  theme: 'dark' // 'light', 'dark', 'auto', 'custom'
});`}</code></pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="colors" className="p-4 border rounded-lg mt-2">
                  <p className="mb-3">Personnalisez complètement les couleurs avec le thème 'custom' :</p>
                  
                  <div className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                    <pre className="text-sm"><code>{`CaptchaPro.render('captcha-container', {
  siteKey: 'your-site-key',
  theme: 'custom',
  customColors: {
    primary: '#3B82F6', // Couleur principale (boutons, accents)
    background: 'rgba(255, 255, 255, 0.9)', // Fond du CAPTCHA
    text: '#1F2937', // Couleur du texte
    accent: '#6366F1' // Bordures, ombres, etc.
  }
});`}</code></pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="size" className="p-4 border rounded-lg mt-2">
                  <p className="mb-3">Ajustez la taille et la position :</p>
                  
                  <div className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                    <pre className="text-sm"><code>{`CaptchaPro.render('captcha-container', {
  siteKey: 'your-site-key',
  width: 320, // Largeur en pixels
  height: 220 // Hauteur en pixels
});

// Le composant s'adapte automatiquement aux écrans mobiles`}</code></pre>
                  </div>
                </TabsContent>
              </Tabs>
            </section>
            
            <section id="accessibility" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Accessibilité</h2>
              <p className="mb-4">
                CaptchaPro est conçu pour être accessible à tous les utilisateurs, y compris ceux ayant des handicaps visuels.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Mode contraste élevé</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Améliore la visibilité des formes et du texte pour les personnes ayant une déficience visuelle.
                  </p>
                  <div className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                    <pre className="text-sm"><code>{`accessibility: {
  highContrast: true
}`}</code></pre>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Mode audio</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Permet aux utilisateurs de compléter le CAPTCHA via une instruction audio.
                  </p>
                  <div className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                    <pre className="text-sm"><code>{`accessibility: {
  enableAudioFallback: true
}`}</code></pre>
                  </div>
                </div>
              </div>
              
              <p className="mb-4">
                Pour une accessibilité optimale, nous recommandons d'activer ces deux fonctionnalités :
              </p>
              
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                <pre className="text-sm"><code>{`CaptchaPro.render('captcha-container', {
  siteKey: 'your-site-key',
  accessibility: {
    enableAudioFallback: true,
    highContrast: true
  }
});`}</code></pre>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-green-800 mb-2">Conformité WCAG</h4>
                <p className="text-green-700 text-sm">
                  CaptchaPro est conçu pour se conformer aux directives WCAG 2.1 niveau AA, garantissant que votre site reste accessible à tous les utilisateurs.
                </p>
              </div>
            </section>
            
            <div className="flex justify-center mt-12 border-t pt-8">
              <Button variant="outline" className="mr-4" onClick={() => window.location.href = '/api'}>
                Explorer l'API
              </Button>
              <Button onClick={() => window.location.href = '/pricing'}>
                Voir les tarifs
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
