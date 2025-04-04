
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import IntegrationCode from '@/components/captcha/IntegrationCode';
import ApiCurlExample from '@/components/dashboard/ApiCurlExample';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';

type DashboardPage = 'overview' | 'integrations' | 'stats' | 'settings' | 'api' | 'billing' | 'profile';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<DashboardPage>('overview');
  const [siteKey, setSiteKey] = useState('demo-site-key-1234');
  const [isKeyCopied, setIsKeyCopied] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/auth');
      return;
    }
    
    try {
      const user = JSON.parse(userString);
      if (!user.isAuthenticated) {
        navigate('/auth');
      }
    } catch (e) {
      console.error('Error parsing user data', e);
      navigate('/auth');
    }
  }, [navigate]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as DashboardPage);
  };

  const handleCopySiteKey = () => {
    navigator.clipboard.writeText(siteKey);
    setIsKeyCopied(true);
    setTimeout(() => setIsKeyCopied(false), 2000);
    toast({
      title: "Clé copiée",
      description: "La clé du site a été copiée dans le presse-papiers",
    });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Bienvenue sur votre tableau de bord</h2>
              <p className="text-muted-foreground">
                Consultez vos statistiques, gérez vos intégrations et accédez à tous vos outils CaptchaPro.
              </p>
            </div>
            <DashboardStats />
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Intégrations</h2>
              <p className="text-muted-foreground mb-6">
                Utilisez ces codes pour intégrer CaptchaPro à vos sites web et applications.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Label htmlFor="site-key">Votre clé de site</Label>
                  <div className="flex mt-1">
                    <Input 
                      id="site-key" 
                      value={siteKey} 
                      readOnly 
                      className="rounded-r-none"
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={handleCopySiteKey}
                    >
                      {isKeyCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Button>Générer nouvelle clé</Button>
                </div>
              </div>
            </div>
            
            <IntegrationCode siteKey={siteKey} />
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Statistiques</h2>
              <p className="text-muted-foreground">
                Suivez l'utilisation de CaptchaPro sur tous vos domaines.
              </p>
            </div>
            <DashboardStats />
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">API et intégration cURL</h2>
              <p className="text-muted-foreground">
                Explorez notre API RESTful et utilisez ces commandes curl pour l'intégrer à vos applications.
              </p>
            </div>
            <ApiCurlExample />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Paramètres</h2>
              <p className="text-muted-foreground">
                Configurez votre compte et vos préférences CaptchaPro.
              </p>
            </div>
            {/* Settings content will go here */}
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Abonnement et facturation</h2>
              <p className="text-muted-foreground">
                Gérez votre abonnement, consultez vos factures et mettez à jour vos informations de paiement.
              </p>
            </div>
            {/* Billing content will go here */}
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Profil</h2>
              <p className="text-muted-foreground">
                Mettez à jour vos informations personnelles et vos préférences de compte.
              </p>
            </div>
            {/* Profile content will go here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
      />
      
      <main className="flex-1 container py-6 px-4">
        {renderContent()}
      </main>
      
      <footer className="border-t py-4 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CaptchaPro. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
