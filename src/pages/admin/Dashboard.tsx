
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Package,
  FileText,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  Database
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Services",
      value: "45",
      change: "+3",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Content Pages",
      value: "89",
      change: "+8",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "Online",
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  const recentActivities = [
    {
      action: "New user registration",
      user: "John Doe",
      time: "2 minutes ago",
      type: "user"
    },
    {
      action: "Service updated",
      user: "Admin",
      time: "15 minutes ago",
      type: "service"
    },
    {
      action: "Content published",
      user: "Editor",
      time: "1 hour ago",
      type: "content"
    },
    {
      action: "System backup completed",
      user: "System",
      time: "2 hours ago",
      type: "system"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to ZenithFilings Admin</h1>
          <p className="text-blue-100 text-lg">
            Manage your platform with comprehensive administrative controls
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add New User
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Create Service
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Publish Content
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Database className="w-4 h-4 mr-2" />
                System Backup
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Latest system activities and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        by {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>System Performance</span>
            </CardTitle>
            <CardDescription>
              Real-time system metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">CPU Usage</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Memory Usage</span>
                  <span className="font-medium">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Storage Usage</span>
                  <span className="font-medium">34%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
