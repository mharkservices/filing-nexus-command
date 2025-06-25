
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
import { Plus, Edit, Trash2, Workflow, Clock, Users, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { WorkflowTemplate, WorkflowStage } from "@/types/workflow";
import { ServiceCategory } from "@/types/service";

interface WorkflowManagementProps {
  services: ServiceCategory[];
}

const WorkflowManagement = ({ services }: WorkflowManagementProps) => {
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>([
    {
      id: "1",
      name: "Company Registration Workflow",
      description: "Standard workflow for private limited company registration",
      serviceId: "1",
      stages: [
        {
          id: "stage-1",
          name: "Document Verification",
          description: "Verify all submitted documents",
          order: 1,
          type: "manual",
          isRequired: true,
          estimatedDuration: 2,
          assignedRoles: ["document_verifier"],
          requiredDocuments: ["pan", "aadhaar", "address_proof"],
          actions: [{
            id: "action-1",
            name: "Approve Documents",
            type: "approve",
            description: "Approve verified documents",
            nextStageId: "stage-2",
            isAutomated: false
          }]
        },
        {
          id: "stage-2",
          name: "Application Filing",
          description: "File application with ROC",
          order: 2,
          type: "automated",
          isRequired: true,
          estimatedDuration: 24,
          assignedRoles: ["filing_executive"],
          requiredDocuments: [],
          actions: [{
            id: "action-2",
            name: "Submit to ROC",
            type: "complete",
            description: "Submit application to ROC portal",
            isAutomated: true
          }]
        }
      ],
      slaHours: 72,
      escalationRules: [],
      isActive: true,
      createdDate: "2024-01-01",
      lastModified: "2024-01-15"
    }
  ]);

  const [isAddWorkflowOpen, setIsAddWorkflowOpen] = useState(false);
  const [isAddStageOpen, setIsAddStageOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(null);

  const [newWorkflow, setNewWorkflow] = useState<Partial<WorkflowTemplate>>({
    name: "",
    description: "",
    serviceId: "",
    stages: [],
    slaHours: 72,
    isActive: true
  });

  const [newStage, setNewStage] = useState<Partial<WorkflowStage>>({
    name: "",
    description: "",
    type: "manual",
    isRequired: true,
    estimatedDuration: 2,
    assignedRoles: [],
    requiredDocuments: [],
    actions: []
  });

  const handleAddWorkflow = () => {
    if (!newWorkflow.name || !newWorkflow.serviceId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const workflow: WorkflowTemplate = {
      id: Date.now().toString(),
      name: newWorkflow.name,
      description: newWorkflow.description || "",
      serviceId: newWorkflow.serviceId,
      stages: [],
      slaHours: newWorkflow.slaHours || 72,
      escalationRules: [],
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setWorkflows([...workflows, workflow]);
    setNewWorkflow({
      name: "",
      description: "",
      serviceId: "",
      stages: [],
      slaHours: 72,
      isActive: true
    });
    setIsAddWorkflowOpen(false);
    
    toast({
      title: "Success",
      description: "Workflow template created successfully.",
    });
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter(w => w.id !== workflowId));
    toast({
      title: "Success",
      description: "Workflow template deleted successfully.",
    });
  };

  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service?.name || "Unknown Service";
  };

  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "manual": return "bg-blue-100 text-blue-800";
      case "automated": return "bg-green-100 text-green-800";
      case "conditional": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflow Management</h2>
          <p className="text-gray-600 mt-1">Configure automated workflows for different service types</p>
        </div>
        
        <Dialog open={isAddWorkflowOpen} onOpenChange={setIsAddWorkflowOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Workflow Template</DialogTitle>
              <DialogDescription>
                Define a new workflow template for a service type.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workflowName">Workflow Name</Label>
                <Input
                  id="workflowName"
                  value={newWorkflow.name || ""}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  placeholder="Enter workflow name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceSelect">Service</Label>
                <Select value={newWorkflow.serviceId} onValueChange={(value) => setNewWorkflow({ ...newWorkflow, serviceId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workflowDescription">Description</Label>
                <Textarea
                  id="workflowDescription"
                  value={newWorkflow.description || ""}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                  placeholder="Describe the workflow process"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slaHours">SLA (Hours)</Label>
                <Input
                  id="slaHours"
                  type="number"
                  value={newWorkflow.slaHours || 72}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, slaHours: parseInt(e.target.value) })}
                  min="1"
                />
              </div>
              <Button onClick={handleAddWorkflow} className="w-full">
                Create Workflow
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workflows Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Workflow className="w-5 h-5 mr-2" />
            Workflow Templates
          </CardTitle>
          <CardDescription>
            Manage workflow templates for different service types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Stages</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((workflow) => (
                  <TableRow key={workflow.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{workflow.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {workflow.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getServiceName(workflow.serviceId)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{workflow.stages.length} stages</span>
                        {workflow.stages.length > 0 && (
                          <div className="flex items-center gap-1">
                            {workflow.stages.slice(0, 3).map((stage, index) => (
                              <div key={stage.id} className="flex items-center">
                                <Badge variant="secondary" className={`text-xs ${getTypeBadgeColor(stage.type)}`}>
                                  {stage.name}
                                </Badge>
                                {index < Math.min(workflow.stages.length - 1, 2) && (
                                  <ArrowRight className="w-3 h-3 mx-1 text-gray-400" />
                                )}
                              </div>
                            ))}
                            {workflow.stages.length > 3 && (
                              <span className="text-xs text-gray-500">+{workflow.stages.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {workflow.slaHours}h
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusBadgeColor(workflow.isActive)}>
                        {workflow.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{workflow.lastModified}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedWorkflow(workflow);
                            setIsAddStageOpen(true);
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteWorkflow(workflow.id)}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Workflow className="w-4 h-4 mr-2" />
              Active Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.filter(w => w.isActive).length}</div>
            <p className="text-xs text-gray-500">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Avg SLA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.length > 0 ? Math.round(workflows.reduce((acc, w) => acc + w.slaHours, 0) / workflows.length) : 0}h
            </div>
            <p className="text-xs text-gray-500">Average completion time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total Stages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.reduce((acc, w) => acc + w.stages.length, 0)}
            </div>
            <p className="text-xs text-gray-500">Across all workflows</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Automation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-gray-500">Automated stages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowManagement;
