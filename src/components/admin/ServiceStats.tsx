
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle,
  AlertTriangle,
  DollarSign
} from "lucide-react";

interface ServiceStatsProps {
  timeframe?: "week" | "month" | "quarter" | "year";
}

interface ServiceMetrics {
  id: string;
  name: string;
  requests: number;
  completed: number;
  averageTime: number;
  revenue: number;
  satisfaction: number;
  trend: "up" | "down" | "stable";
  trendPercentage: number;
}

const ServiceStats = ({ timeframe = "month" }: ServiceStatsProps) => {
  // Mock data - in real implementation, this would come from API
  const metrics: ServiceMetrics[] = [
    {
      id: "1",
      name: "Private Limited Company Registration",
      requests: 45,
      completed: 38,
      averageTime: 12,
      revenue: 266220,
      satisfaction: 4.8,
      trend: "up",
      trendPercentage: 15
    },
    {
      id: "2", 
      name: "GST Registration",
      requests: 32,
      completed: 29,
      averageTime: 8,
      revenue: 72468,
      satisfaction: 4.6,
      trend: "up",
      trendPercentage: 8
    },
    {
      id: "3",
      name: "Trademark Registration", 
      requests: 18,
      completed: 14,
      averageTime: 21,
      revenue: 69986,
      satisfaction: 4.4,
      trend: "down",
      trendPercentage: 5
    },
    {
      id: "4",
      name: "Income Tax Filing",
      requests: 67,
      completed: 65,
      averageTime: 3,
      revenue: 134000,
      satisfaction: 4.9,
      trend: "stable",
      trendPercentage: 2
    }
  ];

  const totalRequests = metrics.reduce((sum, m) => sum + m.requests, 0);
  const totalCompleted = metrics.reduce((sum, m) => sum + m.completed, 0);
  const totalRevenue = metrics.reduce((sum, m) => sum + m.revenue, 0);
  const avgSatisfaction = metrics.reduce((sum, m) => sum + m.satisfaction, 0) / metrics.length;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">This {timeframe}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {((totalCompleted / totalRequests) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">This {timeframe}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSatisfaction.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>
            Performance metrics for each service this {timeframe}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {metrics.map((service) => (
              <div key={service.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{service.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{service.requests} requests</span>
                      <span>{service.completed} completed</span>
                      <span>{service.averageTime} days avg</span>
                      <span>₹{(service.revenue / 1000).toFixed(0)}K revenue</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(service.trend)}
                    <span className={`text-sm ${getTrendColor(service.trend)}`}>
                      {service.trendPercentage}%
                    </span>
                    <Badge variant="secondary">
                      {service.satisfaction}★
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>{((service.completed / service.requests) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={(service.completed / service.requests) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceStats;
