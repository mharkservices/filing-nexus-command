
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Download,
  Trash2,
  Activity,
  Globe,
  Database,
  Users
} from "lucide-react";
import { errorLogger } from "@/services/errorLogger";
import { systemDiagnostics, SystemDiagnostics } from "@/services/systemDiagnostics";
import { toast } from "@/hooks/use-toast";

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'error';
  checks: Array<{
    category: string;
    status: 'healthy' | 'warning' | 'error';
    message: string;
    details?: any;
  }>;
  timestamp: Date;
}

const Troubleshooting = () => {
  const [logs, setLogs] = useState(errorLogger.getLogs());
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    try {
      const health = await systemDiagnostics.runDiagnostics();
      setSystemHealth(health);
    } catch (error) {
      errorLogger.log('error', 'Failed to run system diagnostics', error as Error, {
        component: 'Troubleshooting',
        action: 'runDiagnostics'
      });
      toast({
        title: "Diagnostics Failed",
        description: "Unable to complete system diagnostics check",
        variant: "destructive",
      });
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  const clearLogs = () => {
    errorLogger.clearLogs();
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All error logs have been cleared successfully",
    });
  };

  const exportLogs = () => {
    const logsData = JSON.stringify(logs, null, 2);
    const blob = new Blob([logsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cms-error-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Logs Exported",
      description: "Error logs have been downloaded successfully",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <Shield className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      healthy: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge variant="secondary" className={colors[status as keyof typeof colors]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Troubleshooting</h1>
            <p className="text-gray-600 mt-1">Monitor system health and diagnose issues</p>
          </div>
          <Button 
            onClick={runDiagnostics} 
            disabled={isRunningDiagnostics}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRunningDiagnostics ? 'animate-spin' : ''}`} />
            Run Diagnostics
          </Button>
        </div>

        {/* System Health Overview */}
        {systemHealth && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(systemHealth.overall)}
                <span>System Health Status</span>
              </CardTitle>
              <CardDescription>
                Last checked: {systemHealth.timestamp.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">Overall Status:</span>
                  {getStatusBadge(systemHealth.overall)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemHealth.checks.map((check, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{check.category}</h4>
                      {getStatusIcon(check.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{check.message}</p>
                    {getStatusBadge(check.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* System Health Alert */}
        {systemHealth?.overall === 'error' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>System Issues Detected</AlertTitle>
            <AlertDescription>
              Critical issues have been found in your system. Please review the diagnostics above and take necessary actions.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="logs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="logs">Error Logs</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Error Logs</CardTitle>
                    <CardDescription>Recent application errors and warnings</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={exportLogs}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearLogs}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {logs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No error logs recorded</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Component</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.slice(0, 20).map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="text-sm">
                              {log.timestamp.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(log.level)}
                            </TableCell>
                            <TableCell className="max-w-md truncate">
                              {log.message}
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {log.component || 'Unknown'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>System performance and resource usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">Memory Usage</h3>
                    <p className="text-2xl font-bold mt-2">
                      {systemHealth?.checks.find(c => c.category === 'Performance')?.details?.usage 
                        ? `${Math.round(systemHealth.checks.find(c => c.category === 'Performance')?.details?.usage)}%`
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold">Network Latency</h3>
                    <p className="text-2xl font-bold mt-2">
                      {systemHealth?.checks.find(c => c.category === 'Network Connectivity')?.details?.latency 
                        ? `${systemHealth.checks.find(c => c.category === 'Network Connectivity')?.details?.latency}ms`
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold">Active Sessions</h3>
                    <p className="text-2xl font-bold mt-2">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle>Network Diagnostics</CardTitle>
                <CardDescription>Network connectivity and API endpoint status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth?.checks
                    .filter(check => check.category === 'Network Connectivity')
                    .map((check, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{check.category}</h4>
                            <p className="text-sm text-gray-600">{check.message}</p>
                          </div>
                          {getStatusBadge(check.status)}
                        </div>
                        {check.details && (
                          <div className="mt-2 text-xs text-gray-500">
                            <pre>{JSON.stringify(check.details, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Troubleshooting;
