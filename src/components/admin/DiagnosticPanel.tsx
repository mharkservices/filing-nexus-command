import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  threshold: number;
  icon: React.ReactNode;
}

interface SystemAlert {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

const DiagnosticPanel = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock system metrics - in real implementation, these would come from monitoring APIs
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: "CPU Usage",
      value: 68,
      unit: "%",
      status: "warning",
      threshold: 80,
      icon: <Cpu className="w-4 h-4" />
    },
    {
      name: "Memory Usage", 
      value: 45,
      unit: "%",
      status: "healthy",
      threshold: 85,
      icon: <MemoryStick className="w-4 h-4" />
    },
    {
      name: "Disk Usage",
      value: 72,
      unit: "%", 
      status: "healthy",
      threshold: 90,
      icon: <HardDrive className="w-4 h-4" />
    },
    {
      name: "Database Response",
      value: 145,
      unit: "ms",
      status: "healthy",
      threshold: 500,
      icon: <Database className="w-4 h-4" />
    },
    {
      name: "API Response Time",
      value: 89,
      unit: "ms",
      status: "healthy", 
      threshold: 200,
      icon: <Server className="w-4 h-4" />
    },
    {
      name: "Network Latency",
      value: 23,
      unit: "ms",
      status: "healthy",
      threshold: 100,
      icon: <Wifi className="w-4 h-4" />
    }
  ]);

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: "1",
      type: "warning",
      title: "High CPU Usage",
      message: "CPU usage has been above 65% for the last 10 minutes",
      timestamp: "2024-01-15T10:30:00Z",
      resolved: false
    },
    {
      id: "2", 
      type: "info",
      title: "Database Maintenance",
      message: "Scheduled database optimization completed successfully",
      timestamp: "2024-01-15T09:15:00Z",
      resolved: true
    },
    {
      id: "3",
      type: "error",
      title: "Payment Gateway",
      message: "Temporary connectivity issues with payment processor",
      timestamp: "2024-01-15T08:45:00Z", 
      resolved: true
    }
  ]);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate metric updates
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value + Math.floor(Math.random() * 10) - 5
    })));
    
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "error": return "destructive";
      default: return "default";
    }
  };

  const healthyCount = metrics.filter(m => m.status === "healthy").length;
  const warningCount = metrics.filter(m => m.status === "warning").length;
  const criticalCount = metrics.filter(m => m.status === "critical").length;
  const activeAlerts = alerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthyCount}</div>
            <p className="text-xs text-muted-foreground">Out of {metrics.length} services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warningCount}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Metrics</CardTitle>
              <CardDescription>
                Real-time system performance indicators
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshMetrics}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {metric.icon}
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(metric.status)}
                    <Badge variant="secondary" className={getStatusColor(metric.status)}>
                      {metric.value}{metric.unit}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Usage</span>
                    <span>Threshold: {metric.threshold}{metric.unit}</span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.threshold) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            System alerts and notifications from the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>{alert.title}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.resolved ? "default" : "destructive"}>
                      {alert.resolved ? "Resolved" : "Active"}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                </AlertTitle>
                <AlertDescription>
                  {alert.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticPanel;
