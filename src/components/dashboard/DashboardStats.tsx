
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Activity, BarChart2, Shield, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon, trend }) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="rounded-full bg-muted p-2 text-muted-foreground">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'} flex items-center gap-1`}>
        {trend === 'up' && '↑'}
        {trend === 'down' && '↓'}
        {description}
      </p>
    </CardContent>
  </Card>
);

const DashboardStats: React.FC = () => {
  // Sample data for the bar chart
  const weeklyData = [
    { name: 'Lun', value: 432 },
    { name: 'Mar', value: 362 },
    { name: 'Mer', value: 518 },
    { name: 'Jeu', value: 491 },
    { name: 'Ven', value: 603 },
    { name: 'Sam', value: 321 },
    { name: 'Dim', value: 289 },
  ];
  
  // Sample data for the line chart (monthly trend)
  const monthlyData = [
    { month: 'Jan', verifications: 4500 },
    { month: 'Fév', verifications: 5200 },
    { month: 'Mar', verifications: 6100 },
    { month: 'Avr', verifications: 5800 },
    { month: 'Mai', verifications: 7200 },
    { month: 'Juin', verifications: 8100 },
    { month: 'Juil', verifications: 9400 },
    { month: 'Août', verifications: 8700 },
    { month: 'Sep', verifications: 10200 },
    { month: 'Oct', verifications: 11500 },
    { month: 'Nov', verifications: 12800 },
    { month: 'Déc', verifications: 13456 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Vérifications Totales"
          value="13,456"
          description="+23% par rapport au mois dernier"
          icon={<Activity size={16} />}
          trend="up"
        />
        <StatsCard
          title="Taux de réussite"
          value="98.7%"
          description="+2.1% par rapport au mois dernier"
          icon={<BarChart2 size={16} />}
          trend="up"
        />
        <StatsCard
          title="Tentatives frauduleuses"
          value="234"
          description="-12% par rapport au mois dernier"
          icon={<Shield size={16} />}
          trend="down"
        />
        <StatsCard
          title="Domaines actifs"
          value="7"
          description="+1 nouveau cette semaine"
          icon={<Globe size={16} />}
          trend="up"
        />
      </div>
      
      <Tabs defaultValue="daily" className="w-full">
        <TabsList>
          <TabsTrigger value="daily">Données journalières</TabsTrigger>
          <TabsTrigger value="monthly">Tendance mensuelle</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Vérifications par jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
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
        </TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Tendance mensuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="verifications" 
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardStats;
