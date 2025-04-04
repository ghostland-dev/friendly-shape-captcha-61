
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const DashboardStats: React.FC = () => {
  // Sample data for the chart
  const data = [
    { name: 'Lun', value: 432 },
    { name: 'Mar', value: 362 },
    { name: 'Mer', value: 518 },
    { name: 'Jeu', value: 491 },
    { name: 'Ven', value: 603 },
    { name: 'Sam', value: 321 },
    { name: 'Dim', value: 289 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Vérifications Totales"
          value="13,456"
          description="+23% par rapport au mois dernier"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
        />
        <StatsCard
          title="Taux de réussite"
          value="98.7%"
          description="+2.1% par rapport au mois dernier"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>}
        />
        <StatsCard
          title="Tentatives frauduleuses"
          value="234"
          description="-12% par rapport au mois dernier"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
        />
        <StatsCard
          title="Domaines actifs"
          value="7"
          description="+1 nouveau cette semaine"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path><path d="M9 10h6"></path><path d="M9 14h6"></path></svg>}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Vérifications par jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
