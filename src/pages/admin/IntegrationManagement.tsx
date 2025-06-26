
import AdminLayout from "@/components/admin/AdminLayout";
import SystemIntegration from "@/components/admin/SystemIntegration";
import UserOnboarding from "@/components/admin/UserOnboarding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IntegrationManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integration & Onboarding</h1>
          <p className="text-gray-600 mt-1">Manage system integrations and user onboarding flows</p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="integrations">System Integrations</TabsTrigger>
            <TabsTrigger value="onboarding">User Onboarding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="integrations" className="space-y-6">
            <SystemIntegration />
          </TabsContent>
          
          <TabsContent value="onboarding" className="space-y-6">
            <UserOnboarding />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default IntegrationManagement;
