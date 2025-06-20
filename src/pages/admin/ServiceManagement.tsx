
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
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
import { Package, Plus, Search, Filter, Edit, Trash2, Eye, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ServiceData {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  status: "active" | "inactive" | "draft";
  createdDate: string;
  lastModified: string;
  documents: string[];
}

const ServiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "incorporation",
    description: "",
    price: 0,
    status: "draft" as const,
    documents: ""
  });

  const [services, setServices] = useState<ServiceData[]>([
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
  ]);

  const categories = [
    { value: "incorporation", label: "Incorporation" },
    { value: "tax", label: "Tax Services" },
    { value: "legal", label: "Legal Services" },
    { value: "compliance", label: "Compliance" },
    { value: "licensing", label: "Licensing" }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || service.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddService = () => {
    if (!newService.name || !newService.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const service: ServiceData = {
      id: Date.now().toString(),
      ...newService,
      documents: newService.documents.split(',').map(doc => doc.trim()).filter(doc => doc),
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setServices([...services, service]);
    setNewService({
      name: "",
      category: "incorporation",
      description: "",
      price: 0,
      status: "draft",
      documents: ""
    });
    setIsAddServiceOpen(false);
    
    toast({
      title: "Success",
      description: "Service added successfully.",
    });
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
    toast({
      title: "Success",
      description: "Service deleted successfully.",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "incorporation": return "bg-blue-100 text-blue-800";
      case "tax": return "bg-purple-100 text-purple-800";
      case "legal": return "bg-green-100 text-green-800";
      case "compliance": return "bg-orange-100 text-orange-800";
      case "licensing": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
            <p className="text-gray-600 mt-1">Manage your service offerings and configurations</p>
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
                  Create a new service offering with pricing and requirements.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="Enter service name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newService.category} onValueChange={(value) => setNewService({ ...newService, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Describe the service offering"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value) || 0 })}
                    placeholder="Enter service price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documents">Required Documents (comma-separated)</Label>
                  <Textarea
                    id="documents"
                    value={newService.documents}
                    onChange={(e) => setNewService({ ...newService, documents: e.target.value })}
                    placeholder="PAN Card, Aadhaar Card, Address Proof"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newService.status} onValueChange={(value: any) => setNewService({ ...newService, status: value })}>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.length}</div>
              <p className="text-xs text-muted-foreground">All service offerings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.filter(s => s.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">Currently available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Services</CardTitle>
              <Package className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.filter(s => s.status === 'draft').length}</div>
              <p className="text-xs text-muted-foreground">Under development</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{Math.round(services.reduce((acc, s) => acc + s.price, 0) / services.length)}</div>
              <p className="text-xs text-muted-foreground">Average service price</p>
            </CardContent>
          </Card>
        </div>

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle>Service Directory</CardTitle>
            <CardDescription>
              Manage your service offerings, pricing, and configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {service.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getCategoryColor(service.category)}>
                          {categories.find(cat => cat.value === service.category)?.label || service.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">₹{service.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusBadgeColor(service.status)}>
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{service.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
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
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ServiceManagement;
