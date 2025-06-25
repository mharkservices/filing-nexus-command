
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Plus,
  Eye,
  Download,
  CreditCard
} from "lucide-react";
import { ServiceRequest, UserDashboardStats } from "@/types/user-portal";

const UserDashboard = () => {
  // Mock data - in real implementation, this would come from API
  const [stats] = useState<UserDashboardStats>({
    totalRequests: 12,
    activeRequests: 4,
    completedRequests: 8,
    pendingDocuments: 3,
    unreadMessages: 2,
    averageCompletionTime: 14
  });

  const [recentRequests] = useState<ServiceRequest[]>([
    {
      id: "req-001",
      serviceId: "1",
      serviceName: "Private Limited Company Registration",
      userId: "user-1",
      status: "in_progress",
      priority: "high",
      submissionDate: "2024-01-15",
      expectedCompletionDate: "2024-01-29",
      currentStage: "Document Verification",
      progress: 65,
      totalAmount: 6999,
      paidAmount: 3499,
      documents: [],
      messages: [],
      timeline: [],
      assignedAgent: "John Doe"
    },
    {
      id: "req-002",
      serviceId: "2",
      serviceName: "GST Registration",
      userId: "user-1",
      status: "under_review",
      priority: "medium",
      submissionDate: "2024-01-20",
      expectedCompletionDate: "2024-02-05",
      currentStage: "Final Review",
      progress: 85,
      totalAmount: 2499,
      paidAmount: 2499,
      documents: [],
      messages: [],
      timeline: []
    },
    {
      id: "req-003",
      serviceId: "3",
      serviceName: "Trademark Registration",
      userId: "user-1",
      status: "requires_action",
      priority: "medium",
      submissionDate: "2024-01-10",
      currentStage: "Additional Documents Required",
      progress: 45,
      totalAmount: 4999,
      paidAmount: 0,
      documents: [],
      messages: [],
      timeline: []
    }
  ]);

  const getStatusBadge = (status: ServiceRequest['status']) => {
    const statusConfig = {
      draft: { label: "Draft", variant: "secondary" as const },
      submitted: { label: "Submitted", variant: "default" as const },
      in_progress: { label: "In Progress", variant: "default" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      completed: { label: "Completed", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const },
      requires_action: { label: "Action Required", variant: "destructive" as const }
    };
    return statusConfig[status];
  };

  const getPriorityBadge = (priority: ServiceRequest['priority']) => {
    const priorityConfig = {
      low: { label: "Low", variant: "secondary" as const },
      medium: { label: "Medium", variant: "default" as const },
      high: { label: "High", variant: "default" as const },
      urgent: { label: "Urgent", variant: "destructive" as const }
    };
    return priorityConfig[priority];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your service requests and manage documents</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
              <p className="text-xs text-muted-foreground">All time submissions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeRequests}</div>
              <p className="text-xs text-muted-foreground">Currently processing</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedRequests}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDocuments}</div>
              <p className="text-xs text-muted-foreground">Require your attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="messages">
              Messages
              {stats.unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                  {stats.unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="grid gap-6">
              {recentRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{request.serviceName}</CardTitle>
                        <CardDescription className="mt-1">
                          Request ID: {request.id} • Submitted: {new Date(request.submissionDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge {...getStatusBadge(request.status)}>{getStatusBadge(request.status).label}</Badge>
                        <Badge {...getPriorityBadge(request.priority)}>{getPriorityBadge(request.priority).label}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress: {request.currentStage}</span>
                        <span>{request.progress}%</span>
                      </div>
                      <Progress value={request.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {request.expectedCompletionDate && (
                          <span>Expected: {new Date(request.expectedCompletionDate).toLocaleDateString()}</span>
                        )}
                        {request.assignedAgent && (
                          <span className="ml-4">Agent: {request.assignedAgent}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {request.status === 'requires_action' && (
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Vault</CardTitle>
                <CardDescription>Manage and track your submitted documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Document management interface will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communication with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Messaging system will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track payments and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Payment management will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
