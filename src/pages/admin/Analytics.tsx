
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Users,
  Globe,
  TrendingUp,
  Clock,
  MousePointer,
  Eye,
  DollarSign
} from "lucide-react";

const Analytics = () => {
  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "1y", label: "Last year" }
  ];

  const analyticsData = {
    overview: [
      {
        title: "Total Visitors",
        value: "24,567",
        change: "+12.5%",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      },
      {
        title: "Page Views",
        value: "89,234",
        change: "+8.2%",
        icon: Eye,
        color: "text-green-600",
        bgColor: "bg-green-50"
      },
      {
        title: "Conversion Rate",
        value: "3.24%",
        change: "+0.5%",
        icon: TrendingUp,
        color: "text-purple-600",
        bgColor: "bg-purple-50"
      },
      {
        title: "Revenue",
        value: "₹4,56,789",
        change: "+15.3%",
        icon: DollarSign,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50"
      }
    ],
    topPages: [
      { page: "/services/company-registration", views: 12543, percentage: 85 },
      { page: "/services/gst-registration", views: 8934, percentage: 68 },
      { page: "/services/trademark-registration", views: 6789, percentage: 52 },
      { page: "/blog/business-compliance-guide", views: 4567, percentage: 35 },
      { page: "/about-us", views: 3456, percentage: 28 }
    ],
    userActivity: [
      { hour: "00:00", users: 245 },
      { hour: "04:00", users: 178 },
      { hour: "08:00", users: 567 },
      { hour: "12:00", users: 892 },
      { hour: "16:00", users: 1234 },
      { hour: "20:00", users: 678 }
    ],
    deviceStats: [
      { device: "Desktop", users: 15678, percentage: 64 },
      { device: "Mobile", users: 7890, percentage: 32 },
      { device: "Tablet", users: 999, percentage: 4 }
    ],
    servicePerformance: [
      { service: "Company Registration", inquiries: 456, conversions: 87, rate: 19.1 },
      { service: "GST Registration", inquiries: 334, conversions: 78, rate: 23.4 },
      { service: "Trademark Registration", inquiries: 289, conversions: 45, rate: 15.6 },
      { service: "Annual Compliance", inquiries: 198, conversions: 56, rate: 28.3 }
    ]
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time insights and performance metrics</p>
          </div>
          
          <Select defaultValue="30d">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.overview.map((stat, index) => (
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
                  {stat.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Top Pages</span>
              </CardTitle>
              <CardDescription>
                Most visited pages on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium truncate">{page.page}</span>
                      <span className="text-sm text-gray-500">{page.views.toLocaleString()}</span>
                    </div>
                    <Progress value={page.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MousePointer className="w-5 h-5 text-purple-600" />
                <span>Device Statistics</span>
              </CardTitle>
              <CardDescription>
                User device breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.deviceStats.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{device.users.toLocaleString()}</span>
                      <span className="text-xs text-gray-400">({device.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>Service Performance</span>
            </CardTitle>
            <CardDescription>
              Conversion rates and performance metrics for each service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Inquiries</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Conversions</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Rate</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.servicePerformance.map((service, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{service.service}</td>
                      <td className="py-3 px-4 text-right">{service.inquiries}</td>
                      <td className="py-3 px-4 text-right">{service.conversions}</td>
                      <td className="py-3 px-4 text-right">{service.rate}%</td>
                      <td className="py-3 px-4 text-right">
                        <div className="w-20 ml-auto">
                          <Progress value={service.rate} className="h-2" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* User Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>User Activity Timeline</span>
            </CardTitle>
            <CardDescription>
              Hourly user activity throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              {analyticsData.userActivity.map((activity, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-2">{activity.hour}</div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{activity.users}</div>
                    <div className="text-xs text-blue-500">users</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
