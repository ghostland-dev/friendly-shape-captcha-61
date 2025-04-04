
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyIcon, ClipboardIcon, CheckIcon, Terminal, Code } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ApiEndpoint {
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  curlCommand: string;
  responseExample: string;
}

const ApiCurlExample: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const siteKey = "demo-site-key-1234"; // Use the site key from props or context if needed

  const apiEndpoints: ApiEndpoint[] = [
    {
      title: "Vérifier un captcha",
      description: "Endpoint pour vérifier si un captcha a été correctement résolu",
      method: "POST",
      endpoint: "/api/verify",
      curlCommand: `curl -X POST 'https://api.captchapro.com/api/verify' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "siteKey": "${siteKey}",
    "token": "CAPTCHA_TOKEN_FROM_CLIENT",
    "action": "login"
  }'`,
      responseExample: `{
  "success": true,
  "score": 0.9,
  "action": "login",
  "challenge_ts": "2023-06-17T12:01:35Z",
  "hostname": "example.com"
}`
    },
    {
      title: "Récupérer les statistiques",
      description: "Endpoint pour obtenir les statistiques d'utilisation du captcha",
      method: "GET",
      endpoint: "/api/stats",
      curlCommand: `curl -X GET 'https://api.captchapro.com/api/stats' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`,
      responseExample: `{
  "total_verifications": 13456,
  "success_rate": 98.7,
  "fraudulent_attempts": 234,
  "active_domains": 7,
  "daily_stats": [
    {"date": "2023-06-17", "verifications": 432, "success_rate": 98.9},
    {"date": "2023-06-18", "verifications": 362, "success_rate": 99.1}
  ]
}`
    },
    {
      title: "Configurer les règles de détection",
      description: "Endpoint pour ajuster les paramètres de détection de bots",
      method: "PUT",
      endpoint: "/api/config",
      curlCommand: `curl -X PUT 'https://api.captchapro.com/api/config' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "siteKey": "${siteKey}",
    "detection_sensitivity": "medium",
    "auto_challenge": true,
    "allowed_domains": ["example.com", "subdomain.example.com"]
  }'`,
      responseExample: `{
  "success": true,
  "message": "Configuration updated successfully",
  "config": {
    "detection_sensitivity": "medium",
    "auto_challenge": true,
    "allowed_domains": ["example.com", "subdomain.example.com"]
  }
}`
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: "Code copié",
      description: "Le code curl a été copié dans le presse-papiers",
    });
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Intégration API avec cURL</h2>
        <p className="text-muted-foreground mb-6">
          Utilisez ces commandes curl pour interagir directement avec l'API CaptchaPro. 
          Assurez-vous de remplacer <code>YOUR_API_KEY</code> et <code>CAPTCHA_TOKEN_FROM_CLIENT</code> par vos valeurs réelles.
        </p>
      </div>

      <Tabs defaultValue="curl" className="w-full">
        <TabsList>
          <TabsTrigger value="curl" className="flex items-center gap-2">
            <Terminal size={16} />
            cURL
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex items-center gap-2">
            <Code size={16} />
            Endpoints
          </TabsTrigger>
        </TabsList>

        <TabsContent value="curl">
          {apiEndpoints.map((endpoint, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{endpoint.title}</CardTitle>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                      endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'PUT' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {endpoint.endpoint}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                    <code>{endpoint.curlCommand}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(endpoint.curlCommand, index)}
                  >
                    {copiedIndex === index ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                  </Button>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Réponse exemple :</h4>
                  <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                    <code>{endpoint.responseExample}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>Référence des endpoints d'API</CardTitle>
              <CardDescription>
                Documentation complète des endpoints disponibles pour l'intégration avec CaptchaPro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Méthode</th>
                      <th className="py-3 px-4 text-left">Endpoint</th>
                      <th className="py-3 px-4 text-left">Description</th>
                      <th className="py-3 px-4 text-left">Auth</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">POST</span></td>
                      <td className="py-3 px-4">/api/verify</td>
                      <td className="py-3 px-4">Vérifier un token captcha</td>
                      <td className="py-3 px-4">Site Key</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">GET</span></td>
                      <td className="py-3 px-4">/api/stats</td>
                      <td className="py-3 px-4">Obtenir les statistiques</td>
                      <td className="py-3 px-4">API Key</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4"><span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">PUT</span></td>
                      <td className="py-3 px-4">/api/config</td>
                      <td className="py-3 px-4">Modifier la configuration</td>
                      <td className="py-3 px-4">API Key</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">GET</span></td>
                      <td className="py-3 px-4">/api/logs</td>
                      <td className="py-3 px-4">Obtenir les logs d'activité</td>
                      <td className="py-3 px-4">API Key</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4"><span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">DELETE</span></td>
                      <td className="py-3 px-4">/api/domains/{'{domain_id}'}</td>
                      <td className="py-3 px-4">Supprimer un domaine</td>
                      <td className="py-3 px-4">API Key</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Notes d'authentification :</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li><strong>Site Key</strong> : Inclus dans le corps de la requête JSON</li>
                  <li><strong>API Key</strong> : Doit être envoyé dans l'en-tête <code>Authorization</code> avec le préfixe "Bearer"</li>
                  <li>Toutes les requêtes doivent inclure l'en-tête <code>Content-Type: application/json</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiCurlExample;
