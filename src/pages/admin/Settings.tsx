
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Database,
  Mail,
  Globe,
  Lock,
  Save,
  Download,
  Upload
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "ZenithFilings",
    siteDescription: "Your trusted partner for business registration and compliance services",
    contactEmail: "contact@zenithfilings.com",
    supportEmail: "support@zenithfilings.com",
    phoneNumber: "+91 9876543210",
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    
    // Email Settings
    emailNotifications: true,
    marketingEmails: false,
    systemAlerts: true,
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: 30,
    
    // API Settings
    rateLimit: 1000,
    apiVersion: "v1",
    webhookUrl: ""
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup Started",
      description: "System backup has been initiated.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Data export has been initiated. You'll receive an email when complete.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-1">Configure system preferences and security settings</p>
          </div>
          
          <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>
                Basic website and business information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange("siteName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={settings.phoneNumber}
                  onChange={(e) => handleSettingChange("phoneNumber", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>
                Configure security and authentication options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                <Input
                  id="passwordExpiry"
                  type="number"
                  value={settings.passwordExpiry}
                  onChange={(e) => handleSettingChange("passwordExpiry", parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                <Input
                  id="loginAttempts"
                  type="number"
                  value={settings.loginAttempts}
                  onChange={(e) => handleSettingChange("loginAttempts", parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-green-600" />
                <span>Email Settings</span>
              </CardTitle>
              <CardDescription>
                Configure email notifications and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send system notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Send promotional emails to users</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="systemAlerts">System Alerts</Label>
                  <p className="text-sm text-gray-500">Critical system alerts</p>
                </div>
                <Switch
                  id="systemAlerts"
                  checked={settings.systemAlerts}
                  onCheckedChange={(checked) => handleSettingChange("systemAlerts", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Backup & Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-purple-600" />
                <span>Backup & Data</span>
              </CardTitle>
              <CardDescription>
                Configure backup settings and data management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoBackup">Automatic Backup</Label>
                  <p className="text-sm text-gray-500">Enable scheduled backups</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                <Input
                  id="retentionPeriod"
                  type="number"
                  value={settings.retentionPeriod}
                  onChange={(e) => handleSettingChange("retentionPeriod", parseInt(e.target.value))}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Button onClick={handleBackupNow} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Backup Now
                </Button>
                
                <Button onClick={handleExportData} variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-orange-600" />
              <span>API Configuration</span>
            </CardTitle>
            <CardDescription>
              Configure API settings and rate limiting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                <Input
                  id="rateLimit"
                  type="number"
                  value={settings.rateLimit}
                  onChange={(e) => handleSettingChange("rateLimit", parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiVersion">API Version</Label>
                <Input
                  id="apiVersion"
                  value={settings.apiVersion}
                  onChange={(e) => handleSettingChange("apiVersion", e.target.value)}
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label>API Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                  <span className="text-sm text-gray-500">Operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5 text-gray-600" />
              <span>System Status</span>
            </CardTitle>
            <CardDescription>
              Current system health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-green-700">Uptime</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">245ms</div>
                <div className="text-sm text-blue-700">Response Time</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1,234</div>
                <div className="text-sm text-purple-700">Active Sessions</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">67%</div>
                <div className="text-sm text-orange-700">Server Load</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
