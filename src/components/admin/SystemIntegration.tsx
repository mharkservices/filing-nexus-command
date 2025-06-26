
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  Database,
  Mail,
  CreditCard,
  FileText,
  Globe,
  Key,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "error";
  category: "payment" | "communication" | "storage" | "analytics" | "legal";
  icon: React.ReactNode;
  configurable: boolean;
  lastSync?: string;
}

const SystemIntegration = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Payment gateway for processing transactions",
      status: "connected",
      category: "payment",
      icon: <CreditCard className="w-5 h-5" />,
      configurable: true,
      lastSync: "2024-01-15T10:30:00Z"
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Email delivery service for notifications",
      status: "connected",
      category: "communication",
      icon: <Mail className="w-5 h-5" />,
      configurable: true,
      lastSync: "2024-01-15T09:45:00Z"
    },
    {
      id: "aws-s3",
      name: "AWS S3",
      description: "Cloud storage for documents and files",
      status: "disconnected",
      category: "storage",
      icon: <Database className="w-5 h-5" />,
      configurable: true
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Web analytics and tracking",
      status: "connected",
      category: "analytics",
      icon: <Globe className="w-5 h-5" />,
      configurable: true,
      lastSync: "2024-01-15T08:20:00Z"
    },
    {
      id: "mca-portal",
      name: "MCA Portal",
      description: "Ministry of Corporate Affairs integration",
      status: "error",
      category: "legal",
      icon: <FileText className="w-5 h-5" />,
      configurable: true
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});

  const getStatusBadge = (status: Integration['status']) => {
    const config = {
      connected: { label: "Connected", variant: "default" as const, color: "text-green-600" },
      disconnected: { label: "Disconnected", variant: "secondary" as const, color: "text-gray-600" },
      error: { label: "Error", variant: "destructive" as const, color: "text-red-600" }
    };
    return config[status];
  };

  const handleConnect = async (integrationId: string) => {
    const apiKey = apiKeys[integrationId];
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter API key",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: "connected" as const, lastSync: new Date().toISOString() }
        : integration
    ));

    toast({
      title: "Success",
      description: `${integrations.find(i => i.id === integrationId)?.name} connected successfully`,
    });
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: "disconnected" as const }
        : integration
    ));

    toast({
      title: "Disconnected",
      description: `${integrations.find(i => i.id === integrationId)?.name} has been disconnected`,
    });
  };

  const handleTestConnection = async (integrationId: string) => {
    toast({
      title: "Testing connection...",
      description: "Please wait while we verify the integration",
    });

    // Simulate test
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Connection Test",
      description: "Integration is working correctly",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Integration List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>
                Manage third-party service connections and API integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedIntegration(integration)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                        {integration.lastSync && (
                          <p className="text-xs text-gray-500">
                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge {...getStatusBadge(integration.status)}>
                        {getStatusBadge(integration.status).label}
                      </Badge>
                      <Settings className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                {selectedIntegration ? `Configure ${selectedIntegration.name}` : "Select an integration to configure"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedIntegration ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {selectedIntegration.icon}
                      <span className="font-medium">{selectedIntegration.name}</span>
                    </div>
                    <Badge {...getStatusBadge(selectedIntegration.status)}>
                      {getStatusBadge(selectedIntegration.status).label}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Enter API key"
                        value={apiKeys[selectedIntegration.id] || ""}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          [selectedIntegration.id]: e.target.value
                        }))}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="auto-sync" />
                      <Label htmlFor="auto-sync">Enable auto-sync</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" defaultChecked />
                      <Label htmlFor="notifications">Enable notifications</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {selectedIntegration.status === "connected" ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleTestConnection(selectedIntegration.id)}
                        >
                          Test Connection
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={() => handleDisconnect(selectedIntegration.id)}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => handleConnect(selectedIntegration.id)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>

                  {selectedIntegration.status === "error" && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Connection failed. Please check your API credentials and try again.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an integration from the list to configure its settings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemIntegration;
