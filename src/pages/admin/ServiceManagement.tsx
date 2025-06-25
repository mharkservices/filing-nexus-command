
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ServiceHierarchy from "@/components/admin/ServiceHierarchy";
import ServiceStats from "@/components/admin/ServiceStats";
import DocumentManagement from "@/components/admin/DocumentManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCategory, ServiceData } from "@/types/service";

const ServiceManagement = () => {
  // Convert legacy services to new format
  const legacyServices: ServiceData[] = [
    {
      id: "1",
      name: "Private Limited Company Registration",
      category: "incorporation",
      description: "Complete registration of Private Limited Company with all legal formalities",
      price: 6999,
      status: "active",
      createdDate: "2024-01-01",
      lastModified: "2024-01-15",
      documents: ["PAN Card", "Aadhaar Card", "Address Proof", "Utility Bill"]
    },
    {
      id: "2",
      name: "GST Registration",
      category: "tax",
      description: "Goods and Services Tax registration for businesses",
      price: 2499,
      status: "active",
      createdDate: "2024-01-02",
      lastModified: "2024-01-14",
      documents: ["Business Registration", "PAN Card", "Bank Statement"]
    },
    {
      id: "3",
      name: "Trademark Registration",
      category: "legal",
      description: "Protect your brand with trademark registration",
      price: 4999,
      status: "active",
      createdDate: "2024-01-03",
      lastModified: "2024-01-13",
      documents: ["Logo/Brand", "Business Details", "Class Selection"]
    },
    {
      id: "4",
      name: "Annual Filing Service",
      category: "compliance",
      description: "Annual ROC filing and compliance services",
      price: 3999,
      status: "draft",
      createdDate: "2024-01-10",
      lastModified: "2024-01-10",
      documents: ["Financial Statements", "Directors Details", "Shareholding Pattern"]
    }
  ];

  // Convert legacy services to new format
  const convertLegacyToNew = (legacy: ServiceData[]): ServiceCategory[] => {
    return legacy.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      level: 'main' as const,
      status: service.status,
      documentRequirements: service.documents.map((doc, index) => ({
        id: `${service.id}-doc-${index}`,
        name: doc,
        type: 'mandatory' as const,
        formats: ['pdf', 'jpg', 'png'],
        maxSize: 5,
        validationRules: []
      })),
      pricing: {
        basePrice: service.price,
        additionalFees: [],
        discounts: [],
        currency: 'INR'
      },
      order: parseInt(service.id),
      createdDate: service.createdDate,
      lastModified: service.lastModified
    }));
  };

  const [services, setServices] = useState<ServiceCategory[]>(
    convertLegacyToNew(legacyServices)
  );

  const handleServicesChange = (newServices: ServiceCategory[]) => {
    setServices(newServices);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600 mt-1">Manage your service hierarchy, pricing, and document configurations</p>
        </div>

        {/* Stats Cards */}
        <ServiceStats services={services} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="hierarchy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hierarchy">Service Hierarchy</TabsTrigger>
            <TabsTrigger value="documents">Document Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hierarchy" className="space-y-6">
            <ServiceHierarchy 
              services={services} 
              onServicesChange={handleServicesChange}
            />
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <DocumentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ServiceManagement;
