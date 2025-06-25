
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Edit, Trash2, FileCheck, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DocumentRequirement, ValidationRule } from "@/types/service";

interface DocumentRequirementsProps {
  serviceId: string;
  serviceName: string;
  requirements: DocumentRequirement[];
  onRequirementsChange: (requirements: DocumentRequirement[]) => void;
}

const DocumentRequirements = ({ serviceId, serviceName, requirements, onRequirementsChange }: DocumentRequirementsProps) => {
  const [isAddRequirementOpen, setIsAddRequirementOpen] = useState(false);
  const [isEditRequirementOpen, setIsEditRequirementOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<DocumentRequirement | null>(null);

  const [newRequirement, setNewRequirement] = useState<Partial<DocumentRequirement>>({
    name: "",
    type: "mandatory",
    formats: [],
    maxSize: 5,
    validationRules: [],
    description: ""
  });

  const [newValidationRule, setNewValidationRule] = useState<Partial<ValidationRule>>({
    type: "format_specific",
    value: "",
    message: ""
  });

  const handleAddRequirement = () => {
    if (!newRequirement.name) {
      toast({
        title: "Error",
        description: "Please enter a requirement name.",
        variant: "destructive",
      });
      return;
    }

    const requirement: DocumentRequirement = {
      id: Date.now().toString(),
      name: newRequirement.name,
      type: newRequirement.type as 'mandatory' | 'optional',
      formats: newRequirement.formats || [],
      maxSize: newRequirement.maxSize || 5,
      validationRules: newRequirement.validationRules || [],
      description: newRequirement.description
    };

    onRequirementsChange([...requirements, requirement]);
    setNewRequirement({
      name: "",
      type: "mandatory",
      formats: [],
      maxSize: 5,
      validationRules: [],
      description: ""
    });
    setIsAddRequirementOpen(false);
    
    toast({
      title: "Success",
      description: "Document requirement added successfully.",
    });
  };

  const handleEditRequirement = () => {
    if (!editingRequirement) return;

    const updatedRequirements = requirements.map(req => 
      req.id === editingRequirement.id ? editingRequirement : req
    );
    
    onRequirementsChange(updatedRequirements);
    setEditingRequirement(null);
    setIsEditRequirementOpen(false);
    
    toast({
      title: "Success",
      description: "Document requirement updated successfully.",
    });
  };

  const handleDeleteRequirement = (requirementId: string) => {
    const updatedRequirements = requirements.filter(req => req.id !== requirementId);
    onRequirementsChange(updatedRequirements);
    
    toast({
      title: "Success",
      description: "Document requirement deleted successfully.",
    });
  };

  const addValidationRule = () => {
    if (!newValidationRule.type || !newValidationRule.value || !newValidationRule.message) {
      toast({
        title: "Error",
        description: "Please fill in all validation rule fields.",
        variant: "destructive",
      });
      return;
    }

    const rule: ValidationRule = {
      type: newValidationRule.type as 'expiry_date' | 'min_info' | 'format_specific',
      value: newValidationRule.value,
      message: newValidationRule.message
    };

    setNewRequirement({
      ...newRequirement,
      validationRules: [...(newRequirement.validationRules || []), rule]
    });

    setNewValidationRule({
      type: "format_specific",
      value: "",
      message: ""
    });
  };

  const formatOptions = ["pdf", "jpg", "jpeg", "png", "doc", "docx"];

  const getTypeBadgeColor = (type: string) => {
    return type === "mandatory" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <FileCheck className="w-5 h-5 mr-2" />
              Document Requirements
            </CardTitle>
            <CardDescription>
              Configure document requirements for {serviceName}
            </CardDescription>
          </div>
          
          <Dialog open={isAddRequirementOpen} onOpenChange={setIsAddRequirementOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Requirement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Document Requirement</DialogTitle>
                <DialogDescription>
                  Define a new document requirement for this service.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reqName">Document Name</Label>
                  <Input
                    id="reqName"
                    value={newRequirement.name || ""}
                    onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })}
                    placeholder="e.g., PAN Card, Aadhaar Card"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reqType">Requirement Type</Label>
                  <Select 
                    value={newRequirement.type} 
                    onValueChange={(value: "mandatory" | "optional") => setNewRequirement({ ...newRequirement, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mandatory">Mandatory</SelectItem>
                      <SelectItem value="optional">Optional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reqDesc">Description</Label>
                  <Textarea
                    id="reqDesc"
                    value={newRequirement.description || ""}
                    onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                    placeholder="Describe the document requirements"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Accepted Formats</Label>
                  <div className="flex flex-wrap gap-2">
                    {formatOptions.map((format) => (
                      <Button
                        key={format}
                        variant={(newRequirement.formats || []).includes(format) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const formats = newRequirement.formats || [];
                          if (formats.includes(format)) {
                            setNewRequirement({
                              ...newRequirement,
                              formats: formats.filter(f => f !== format)
                            });
                          } else {
                            setNewRequirement({
                              ...newRequirement,
                              formats: [...formats, format]
                            });
                          }
                        }}
                      >
                        {format.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSize">Maximum File Size (MB)</Label>
                  <Input
                    id="maxSize"
                    type="number"
                    value={newRequirement.maxSize || 5}
                    onChange={(e) => setNewRequirement({ ...newRequirement, maxSize: parseInt(e.target.value) })}
                    min="1"
                    max="50"
                  />
                </div>

                <Button onClick={handleAddRequirement} className="w-full">
                  Add Requirement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {requirements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No document requirements configured</p>
            <p className="text-sm">Add requirements to define what documents are needed for this service.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requirements.map((requirement) => (
              <div key={requirement.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{requirement.name}</h4>
                      <Badge variant="secondary" className={getTypeBadgeColor(requirement.type)}>
                        {requirement.type}
                      </Badge>
                    </div>
                    {requirement.description && (
                      <p className="text-sm text-gray-600 mb-2">{requirement.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Formats: {requirement.formats.join(", ").toUpperCase()}</span>
                      <span>Max size: {requirement.maxSize}MB</span>
                      {requirement.validationRules.length > 0 && (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {requirement.validationRules.length} validation rules
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingRequirement(requirement);
                        setIsEditRequirementOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteRequirement(requirement.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentRequirements;
