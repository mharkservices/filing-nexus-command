
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import UserStatsCards from "@/components/admin/UserStatsCards";
import UserFilters from "@/components/admin/UserFilters";
import UserTable from "@/components/admin/UserTable";
import UserActivity from "@/components/admin/UserActivity";
import AddUserDialog from "@/components/admin/AddUserDialog";

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

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15",
      joinDate: "2023-12-01",
      requestsCount: 12,
      totalSpent: 45000
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      lastLogin: "2024-01-14",
      joinDate: "2023-11-15",
      requestsCount: 8,
      totalSpent: 32000
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "user",
      status: "pending",
      lastLogin: "Never",
      joinDate: "2024-01-10",
      requestsCount: 0,
      totalSpent: 0
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      role: "user",
      status: "inactive",
      lastLogin: "2023-12-20",
      joinDate: "2023-10-05",
      requestsCount: 5,
      totalSpent: 18500
    }
  ]);

  const [userActivity] = useState<UserActivityData[]>([
    {
      id: "1",
      userId: "1",
      action: "Login",
      timestamp: "2024-01-15T10:30:00Z",
      details: "Successful login from Chrome on Windows"
    },
    {
      id: "2",
      userId: "1", 
      action: "Service Request",
      timestamp: "2024-01-15T09:15:00Z",
      details: "Created GST Registration request"
    },
    {
      id: "3",
      userId: "2",
      action: "Document Upload",
      timestamp: "2024-01-14T16:45:00Z",
      details: "Uploaded PAN card for verification"
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (user: UserData) => {
    setUsers([...users, user]);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Success",
      description: "User deleted successfully.",
    });
  };

  const handleExportUsers = () => {
    const csvContent = [
      ["Name", "Email", "Role", "Status", "Requests", "Total Spent", "Join Date"],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.requestsCount.toString(),
        user.totalSpent.toString(),
        user.joinDate
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "User data exported successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportUsers}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <AddUserDialog onAddUser={handleAddUser} />
          </div>
        </div>

        {/* Stats Cards */}
        <UserStatsCards users={users} />

        {/* Main Content with Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users Directory</TabsTrigger>
            <TabsTrigger value="activity">User Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>
                  Search and filter users by name, email, role, or status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
                <UserTable users={filteredUsers} onDeleteUser={handleDeleteUser} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <UserActivity users={users} userActivity={userActivity} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>
                  Insights into user behavior and engagement patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Advanced user analytics will be implemented here</p>
                  <p className="text-sm mt-2">Coming soon: User engagement metrics, retention analysis, and behavioral insights</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
