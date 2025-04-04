
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CaptchaContainer from '@/components/captcha/CaptchaContainer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, CheckCircle, ShieldCheck, BarChart3, Zap, Globe2, Users } from 'lucide-react';
import CaptchaInstructions from '@/components/captcha/CaptchaInstructions';

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccessibilityDemo, setShowAccessibilityDemo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setIsLoggedIn(user.isAuthenticated);
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
    toast({
      title: "Vérification Réussie",
      description: "Vous avez prouvé que vous êtes humain.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="text-xl font-semibold flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
          CaptchaPro
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/documentation')}>
            Documentation
          </Button>
          <Button variant="ghost" onClick={() => navigate('/pricing')}>
            Tarifs
          </Button>
          <Button variant="ghost" onClick={() => navigate('/api')}>
            API
          </Button>
          {isLoggedIn ? (
            <Button onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          ) : (
            <Button onClick={() => navigate('/auth')}>
              Connexion
            </Button>
          )}
        </nav>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Sécurisez votre site avec un CAPTCHA convivial et accessible
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Une alternative intuitive et inclusive aux CAPTCHAs traditionnels pour protéger vos sites contre les robots tout en offrant une expérience utilisateur agréable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/pricing')} className="group">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/api')}>
                Explorer l'API
              </Button>
            </div>
          </div>
          
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 mb-16">
            <CaptchaContainer
              onVerified={handleVerified}
              width={320}
              height={220}
              className="mx-auto"
              accessibility={{
                enableAudioFallback: showAccessibilityDemo,
                highContrast: false
              }}
            />
            
            <div className="mt-6 text-center">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={showAccessibilityDemo}
                  onChange={() => setShowAccessibilityDemo(!showAccessibilityDemo)}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Activer les fonctionnalités d'accessibilité
                </span>
              </label>
            </div>
            
            {isVerified && (
              <div className="mt-6 text-center animate-fade-in">
                <p className="mb-4 text-green-700 font-medium flex items-center justify-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Merci d'avoir confirmé que vous êtes humain !
                </p>
                <Button 
                  onClick={() => setIsVerified(false)}
                  variant="outline"
                  className="mr-3"
                >
                  Réinitialiser démo
                </Button>
              </div>
            )}
          </div>
          
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
              Pourquoi choisir CaptchaPro ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Protection efficace</h3>
                <p className="text-gray-600">
                  Bloquez les robots et les tentatives de spam automatisées tout en laissant passer les utilisateurs légitimes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Accessible à tous</h3>
                <p className="text-gray-600">
                  Expérience inclusive avec support audio et mode contraste élevé pour les personnes malvoyantes. Conforme WCAG.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Statistiques détaillées</h3>
                <p className="text-gray-600">
                  Suivez les performances de votre protection avec des analyses détaillées et des rapports sur les tentatives de fraude.
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-6">
                  Intégration facile, résultats immédiats
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Ajoutez CaptchaPro à votre site en quelques minutes seulement. Notre API simple et notre documentation complète rendent le processus d'intégration facile, même pour les débutants.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                    <span>Installation en moins de 5 minutes</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                    <span>Compatible avec tous les frameworks web</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                    <span>Documentation détaillée et support réactif</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                    <span>Personnalisable pour s'adapter à votre design</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button onClick={() => navigate('/documentation')}>
                    Consulter la documentation
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Exemple d'intégration</h3>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                  {`<script src="https://cdn.captchapro.com/captcha.min.js"></script>

<div id="captcha-container"></div>

<script>
  CaptchaPro.render('captcha-container', {
    siteKey: 'your-site-key',
    onVerified: function(token) {
      // Validation réussie !
      document.getElementById('submit-btn').disabled = false;
    }
  });
</script>`}
                </div>
                <div className="text-center">
                  <Button variant="outline" size="sm" onClick={() => navigate('/api')}>
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mb-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Des fonctionnalités adaptées à tous les besoins
                </h2>
                <ul className="space-y-4">
                  <li className="flex text-white">
                    <Zap className="h-6 w-6 mr-3 shrink-0" />
                    <div>
                      <span className="font-medium">Haute performance</span>
                      <p className="text-blue-100 text-sm">Chargement rapide, impact minimal sur le temps de chargement de vos pages</p>
                    </div>
                  </li>
                  <li className="flex text-white">
                    <Globe2 className="h-6 w-6 mr-3 shrink-0" />
                    <div>
                      <span className="font-medium">Support multilingue</span>
                      <p className="text-blue-100 text-sm">Compatible avec plus de 40 langues pour une expérience globale</p>
                    </div>
                  </li>
                  <li className="flex text-white">
                    <ShieldCheck className="h-6 w-6 mr-3 shrink-0" />
                    <div>
                      <span className="font-medium">Protection avancée</span>
                      <p className="text-blue-100 text-sm">Algorithmes adaptatifs qui s'améliorent en continu contre les nouvelles menaces</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/pricing')}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Voir nos offres
                  </Button>
                </div>
              </div>
              <div className="bg-blue-800/30 backdrop-blur-sm p-8 md:p-12 flex items-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 w-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-medium text-white">Satisfaction client</h3>
                    <div className="flex justify-center my-3">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg 
                          key={star} 
                          className="w-6 h-6 text-yellow-300 mx-0.5" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-blue-100">4.9/5 – Basé sur 2,300+ avis</p>
                  </div>
                  
                  <blockquote className="text-white italic border-l-4 border-blue-300 pl-4 mb-4">
                    "Depuis que nous avons intégré CaptchaPro, notre taux de conversion a augmenté de 15% et les plaintes concernant les CAPTCHAs ont disparu."
                    <footer className="mt-2 text-sm text-blue-200">
                      — Marie D., Responsable e-commerce
                    </footer>
                  </blockquote>
                  
                  <blockquote className="text-white italic border-l-4 border-blue-300 pl-4">
                    "Enfin un CAPTCHA que nos utilisateurs malvoyants peuvent utiliser sans difficulté. L'option audio est un vrai plus."
                    <footer className="mt-2 text-sm text-blue-200">
                      — Thomas L., Développeur web
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-semibold mb-6">
              Prêt à sécuriser votre site ?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Rejoignez des milliers d'entreprises qui font confiance à CaptchaPro pour protéger leurs sites web contre les robots et les spammeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/pricing')}>
                Commencer gratuitement
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/api')}>
                Demander une démo
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CaptchaPro</h3>
              <p className="text-sm text-gray-600 mb-4">
                La solution de vérification humaine moderne, accessible et efficace pour sécuriser vos applications web.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Produit</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/documentation" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                <li><a href="/pricing" className="text-gray-600 hover:text-gray-900">Tarifs</a></li>
                <li><a href="/api" className="text-gray-600 hover:text-gray-900">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">À propos</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Carrières</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Légal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Confidentialité</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-2">
              © {new Date().getFullYear()} CaptchaPro. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
