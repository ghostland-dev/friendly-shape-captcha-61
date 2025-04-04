
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, CreditCard, Terminal, Activity, Code, Globe } from 'lucide-react';

interface DashboardHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  currentPage, 
  onNavigate 
}) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user info from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserName(user.name || 'Utilisateur');
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">CaptchaPro Dashboard</h1>
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant={currentPage === 'overview' ? "default" : "ghost"} 
              onClick={() => onNavigate('overview')}
              className="gap-2"
            >
              <Activity className="h-4 w-4" />
              Aperçu
            </Button>
            <Button 
              variant={currentPage === 'integrations' ? "default" : "ghost"} 
              onClick={() => onNavigate('integrations')}
              className="gap-2"
            >
              <Code className="h-4 w-4" />
              Intégrations
            </Button>
            <Button 
              variant={currentPage === 'stats' ? "default" : "ghost"} 
              onClick={() => onNavigate('stats')}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              Statistiques
            </Button>
            <Button 
              variant={currentPage === 'api' ? "default" : "ghost"} 
              onClick={() => onNavigate('api')}
              className="gap-2"
            >
              <Terminal className="h-4 w-4" />
              API
            </Button>
            <Button 
              variant={currentPage === 'settings' ? "default" : "ghost"} 
              onClick={() => onNavigate('settings')}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Paramètres
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden md:flex gap-2"
            onClick={() => onNavigate('billing')}
          >
            <CreditCard className="h-4 w-4" />
            Abonnement
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
                aria-label="User menu"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('billing')}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Abonnement</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
