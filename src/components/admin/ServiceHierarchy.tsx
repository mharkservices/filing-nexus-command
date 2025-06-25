
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, ChevronRight, ChevronDown, Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ServiceCategory } from "@/types/service";

interface ServiceHierarchyProps {
  services: ServiceCategory[];
  onServicesChange: (services: ServiceCategory[]) => void;
}

const ServiceHierarchy = ({ services, onServicesChange }: ServiceHierarchyProps) => {
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [newService, setNewService] = useState<Partial<ServiceCategory>>({
    name: "",
    description: "",
    level: "main",
    status: "draft",
    parentId: undefined,
    documentRequirements: [],
    order: 0
  });

  const getServiceHierarchy = () => {
    const mainServices = services.filter(s => s.level === 'main');
    const serviceMap = new Map();
    
    services.forEach(service => {
      if (!serviceMap.has(service.parentId || 'root')) {
        serviceMap.set(service.parentId || 'root', []);
      }
      serviceMap.get(service.parentId || 'root').push(service);
    });

    return { mainServices, serviceMap };
  };

  const handleAddService = () => {
    if (!newService.name || !newService.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const service: ServiceCategory = {
      id: Date.now().toString(),
      name: newService.name,
      description: newService.description,
      level: newService.level || 'main',
      status: newService.status || 'draft',
      parentId: newService.parentId,
      documentRequirements: [],
      order: services.length,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    onServicesChange([...services, service]);
    setNewService({
      name: "",
      description: "",
      level: "main",
      status: "draft",
      parentId: undefined,
      documentRequirements: [],
      order: 0
    });
    setIsAddServiceOpen(false);
    
    toast({
      title: "Success",
      description: "Service added successfully.",
    });
  };

  const handleDeleteService = (serviceId: string) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    onServicesChange(updatedServices);
    toast({
      title: "Success",
      description: "Service deleted successfully.",
    });
  };

  const toggleExpand = (serviceId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedCategories(newExpanded);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "main": return "bg-blue-100 text-blue-800";
      case "sub": return "bg-purple-100 text-purple-800";
      case "variant": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const { mainServices, serviceMap } = getServiceHierarchy();
  const parentOptions = services.filter(s => s.level !== 'variant');

  const renderServiceRow = (service: ServiceCategory, depth: number = 0) => {
    const hasChildren = serviceMap.has(service.id);
    const isExpanded = expandedCategories.has(service.id);
    const children = serviceMap.get(service.id) || [];

    return (
      <>
        <TableRow key={service.id}>
          <TableCell>
            <div className="flex items-center" style={{ paddingLeft: `${depth * 20}px` }}>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(service.id)}
                  className="p-1 mr-2"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              )}
              <div>
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-gray-500 truncate max-w-xs">
                  {service.description}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge variant="secondary" className={getLevelColor(service.level)}>
              {service.level}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant="secondary" className={getStatusBadgeColor(service.status)}>
              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
            </Badge>
          </TableCell>
          <TableCell>{service.documentRequirements?.length || 0}</TableCell>
          <TableCell>{service.pricing?.basePrice ? `₹${service.pricing.basePrice.toLocaleString()}` : '-'}</TableCell>
          <TableCell>{service.lastModified}</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDeleteService(service.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {hasChildren && isExpanded && children.map((child: ServiceCategory) => 
          renderServiceRow(child, depth + 1)
        )}
      </>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Service Hierarchy</CardTitle>
            <CardDescription>
              Manage your service categories, sub-services, and variants
            </CardDescription>
          </div>
          
          <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Create a new service in the hierarchy.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={newService.name || ""}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="Enter service name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Service Level</Label>
                  <Select value={newService.level} onValueChange={(value: "main" | "sub" | "variant") => setNewService({ ...newService, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Service</SelectItem>
                      <SelectItem value="sub">Sub Service</SelectItem>
                      <SelectItem value="variant">Service Variant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(newService.level === 'sub' || newService.level === 'variant') && (
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent Service</Label>
                    <Select value={newService.parentId} onValueChange={(value) => setNewService({ ...newService, parentId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent service" />
                      </SelectTrigger>
                      <SelectContent>
                        {parentOptions.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} ({service.level})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newService.description || ""}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Describe the service offering"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newService.status} onValueChange={(value: "active" | "inactive" | "draft") => setNewService({ ...newService, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddService} className="w-full">
                  Add Service
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mainServices.map((service) => renderServiceRow(service))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceHierarchy;
