
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, RefreshCw, AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { systemDiagnostics } from "@/services/systemDiagnostics";

interface DiagnosticPanelProps {
  showTitle?: boolean;
  compact?: boolean;
}

const DiagnosticPanel = ({ showTitle = true, compact = false }: DiagnosticPanelProps) => {
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runQuickDiagnostic = async () => {
    setIsRunning(true);
    try {
      const health = await systemDiagnostics.runDiagnostics();
      setSystemHealth(health);
    } catch (error) {
      console.error('Diagnostic failed:', error);
    } finally {
      setIsRunning(false);
    }
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
      <Badge variant="secondary" className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          {systemHealth ? getStatusIcon(systemHealth.overall) : <Activity className="w-4 h-4" />}
          <span className="text-sm font-medium">
            System Status: {systemHealth ? systemHealth.overall : 'Unknown'}
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={runQuickDiagnostic}
          disabled={isRunning}
        >
          <RefreshCw className={`w-3 h-3 mr-1 ${isRunning ? 'animate-spin' : ''}`} />
          Check
        </Button>
      </div>
    );
  }

  return (
    <Card>
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>System Diagnostics</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={runQuickDiagnostic}
              disabled={isRunning}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
              Run Check
            </Button>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {!systemHealth && !isRunning && (
          <div className="text-center py-4 text-gray-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click "Run Check" to diagnose system health</p>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-4">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Running diagnostics...</p>
          </div>
        )}

        {systemHealth && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Status:</span>
              {getStatusBadge(systemHealth.overall)}
            </div>

            {systemHealth.overall !== 'healthy' && (
              <Alert variant={systemHealth.overall === 'error' ? 'destructive' : 'default'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {systemHealth.overall === 'error' 
                    ? 'Critical issues detected. Please review the diagnostics.'
                    : 'Some issues found. System is functional but may need attention.'
                  }
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              {systemHealth.checks.slice(0, 3).map((check: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(check.status)}
                    <span className="text-sm">{check.category}</span>
                  </div>
                  {getStatusBadge(check.status)}
                </div>
              ))}
              {systemHealth.checks.length > 3 && (
                <p className="text-xs text-gray-500 text-center">
                  +{systemHealth.checks.length - 3} more checks
                </p>
              )}
            </div>

            <div className="text-xs text-gray-500 text-center">
              Last checked: {new Date(systemHealth.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosticPanel;
