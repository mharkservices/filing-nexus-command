
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "editor" | "user";
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  joinDate: string;
  requestsCount: number;
  totalSpent: number;
}

interface UserActivityData {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
}

interface UserActivityProps {
  users: UserData[];
  userActivity: UserActivityData[];
}

const UserActivity = ({ users, userActivity }: UserActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent User Activity</CardTitle>
        <CardDescription>
          Track user actions and system interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userActivity.map((activity) => {
            const user = users.find(u => u.id === activity.userId);
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{activity.action}</span>
                  </div>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivity;
