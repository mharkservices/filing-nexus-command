
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  CheckCircle,
  Clock,
  BookOpen,
  Video,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: "action" | "info" | "interactive";
  icon: React.ReactNode;
}

interface UserProgress {
  userId: string;
  userName: string;
  email: string;
  joinDate: string;
  completedSteps: number;
  totalSteps: number;
  currentStep: string;
  lastActivity: string;
  status: "not_started" | "in_progress" | "completed" | "stuck";
}

const UserOnboarding = () => {
  const [onboardingSteps] = useState<OnboardingStep[]>([
    {
      id: "welcome",
      title: "Welcome to Zenith CMS",
      description: "Get familiar with the platform overview and main features",
      completed: true,
      type: "info",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: "profile_setup",
      title: "Complete Your Profile",
      description: "Add your business information and preferences",
      completed: true,
      type: "action",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "first_service",
      title: "Submit Your First Service Request",
      description: "Experience our service request process",
      completed: false,
      type: "interactive",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: "document_upload",
      title: "Upload Required Documents",
      description: "Learn how to securely upload and manage documents",
      completed: false,
      type: "action",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: "communication",
      title: "Explore Communication Features",
      description: "Discover messaging and notification settings",
      completed: false,
      type: "info",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: "completion",
      title: "Onboarding Complete",
      description: "You're all set! Start using Zenith CMS effectively",
      completed: false,
      type: "info",
      icon: <Star className="w-5 h-5" />
    }
  ]);

  const [userProgress] = useState<UserProgress[]>([
    {
      userId: "1",
      userName: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-15",
      completedSteps: 2,
      totalSteps: 6,
      currentStep: "first_service",
      lastActivity: "2024-01-15T10:30:00Z",
      status: "in_progress"
    },
    {
      userId: "2",
      userName: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-01-14",
      completedSteps: 6,
      totalSteps: 6,
      currentStep: "completion",
      lastActivity: "2024-01-14T16:45:00Z",
      status: "completed"
    },
    {
      userId: "3",
      userName: "Bob Wilson",
      email: "bob@example.com",
      joinDate: "2024-01-10",
      completedSteps: 1,
      totalSteps: 6,
      currentStep: "profile_setup",
      lastActivity: "2024-01-10T09:15:00Z",
      status: "stuck"
    }
  ]);

  const [onboardingContent, setOnboardingContent] = useState({
    welcomeMessage: "Welcome to Zenith CMS! We're excited to help you streamline your business processes.",
    guideContent: "Follow these steps to get the most out of our platform...",
    supportEmail: "support@zenithcms.com"
  });

  const getStatusBadge = (status: UserProgress['status']) => {
    const config = {
      not_started: { label: "Not Started", variant: "secondary" as const },
      in_progress: { label: "In Progress", variant: "default" as const },
      completed: { label: "Completed", variant: "default" as const },
      stuck: { label: "Needs Help", variant: "destructive" as const }
    };
    return config[status];
  };

  const calculateProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const handleSendReminder = (userId: string) => {
    toast({
      title: "Reminder Sent",
      description: "Onboarding reminder email has been sent to the user",
    });
  };

  const handleUpdateContent = () => {
    toast({
      title: "Content Updated",
      description: "Onboarding content has been updated successfully",
    });
  };

  const completedUsers = userProgress.filter(u => u.status === "completed").length;
  const activeUsers = userProgress.filter(u => u.status === "in_progress").length;
  const stuckUsers = userProgress.filter(u => u.status === "stuck").length;
  const avgCompletion = userProgress.reduce((sum, u) => sum + calculateProgress(u.completedSteps, u.totalSteps), 0) / userProgress.length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedUsers}</div>
            <p className="text-xs text-muted-foreground">Finished onboarding</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently onboarding</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Help</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stuckUsers}</div>
            <p className="text-xs text-muted-foreground">Require assistance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgCompletion)}%</div>
            <p className="text-xs text-muted-foreground">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList>
          <TabsTrigger value="progress">User Progress</TabsTrigger>
          <TabsTrigger value="steps">Onboarding Steps</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Onboarding Progress</CardTitle>
              <CardDescription>
                Track individual user progress through the onboarding process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProgress.map((user) => (
                  <div key={user.userId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{user.userName}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Badge {...getStatusBadge(user.status)}>
                          {getStatusBadge(user.status).label}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {user.completedSteps}/{user.totalSteps} steps</span>
                          <span>{calculateProgress(user.completedSteps, user.totalSteps)}%</span>
                        </div>
                        <Progress value={calculateProgress(user.completedSteps, user.totalSteps)} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Current: {onboardingSteps.find(s => s.id === user.currentStep)?.title}</span>
                          <span>Last active: {new Date(user.lastActivity).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendReminder(user.userId)}
                      >
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Steps Configuration</CardTitle>
              <CardDescription>
                Manage the onboarding flow and step requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={step.type === "action" ? "default" : "secondary"}>
                        {step.type}
                      </Badge>
                      {step.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Content</CardTitle>
              <CardDescription>
                Customize welcome messages and guidance content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea
                  id="welcome-message"
                  value={onboardingContent.welcomeMessage}
                  onChange={(e) => setOnboardingContent(prev => ({
                    ...prev,
                    welcomeMessage: e.target.value
                  }))}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="guide-content">Guide Content</Label>
                <Textarea
                  id="guide-content"
                  value={onboardingContent.guideContent}
                  onChange={(e) => setOnboardingContent(prev => ({
                    ...prev,
                    guideContent: e.target.value
                  }))}
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={onboardingContent.supportEmail}
                  onChange={(e) => setOnboardingContent(prev => ({
                    ...prev,
                    supportEmail: e.target.value
                  }))}
                />
              </div>
              
              <Button onClick={handleUpdateContent}>
                <Settings className="w-4 h-4 mr-2" />
                Update Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserOnboarding;
