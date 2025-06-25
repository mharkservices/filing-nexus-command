
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Edit, Trash2, FileText, Upload, Settings, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DocumentCategory, DocumentTemplate, DocumentValidation } from "@/types/document";

const DocumentManagement = () => {
  const [documentCategories, setDocumentCategories] = useState<DocumentCategory[]>([
    {
      id: "1",
      name: "Identity Documents",
      description: "Personal identification documents",
      allowedFormats: ["pdf", "jpg", "png"],
      maxSize: 5,
      templates: [],
      validations: [],
      isActive: true
    },
    {
      id: "2", 
      name: "Business Registration",
      description: "Business incorporation and registration documents",
      allowedFormats: ["pdf"],
      maxSize: 10,
      templates: [],
      validations: [],
      isActive: true
    }
  ]);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);
  const [isAddValidationOpen, setIsAddValidationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);

  const [newCategory, setNewCategory] = useState<Partial<DocumentCategory>>({
    name: "",
    description: "",
    allowedFormats: [],
    maxSize: 5,
    isActive: true
  });

  const [newTemplate, setNewTemplate] = useState<Partial<DocumentTemplate>>({
    name: "",
    description: "",
    instructions: [],
    category: "",
    version: "1.0",
    isActive: true
  });

  const [newValidation, setNewValidation] = useState<Partial<DocumentValidation>>({
    name: "",
    rules: [],
    errorMessage: "",
    isActive: true
  });

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const category: DocumentCategory = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      allowedFormats: newCategory.allowedFormats || [],
      maxSize: newCategory.maxSize || 5,
      templates: [],
      validations: [],
      isActive: newCategory.isActive || true
    };

    setDocumentCategories([...documentCategories, category]);
    setNewCategory({
      name: "",
      description: "",
      allowedFormats: [],
      maxSize: 5,
      isActive: true
    });
    setIsAddCategoryOpen(false);
    
    toast({
      title: "Success",
      description: "Document category added successfully.",
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    setDocumentCategories(documentCategories.filter(cat => cat.id !== categoryId));
    toast({
      title: "Success",
      description: "Document category deleted successfully.",
    });
  };

  const formatSelection = ["pdf", "jpg", "png", "jpeg", "doc", "docx"];

  const handleFormatChange = (format: string, checked: boolean) => {
    if (checked) {
      setNewCategory({
        ...newCategory,
        allowedFormats: [...(newCategory.allowedFormats || []), format]
      });
    } else {
      setNewCategory({
        ...newCategory,
        allowedFormats: (newCategory.allowedFormats || []).filter(f => f !== format)
      });
    }
  };

  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
          <p className="text-gray-600 mt-1">Configure document requirements, templates, and validation rules</p>
        </div>
        
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Document Category</DialogTitle>
              <DialogDescription>
                Create a new document category with specific requirements.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={newCategory.name || ""}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryDescription">Description</Label>
                <Textarea
                  id="categoryDescription"
                  value={newCategory.description || ""}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Describe the document category"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Allowed File Formats</Label>
                <div className="grid grid-cols-3 gap-2">
                  {formatSelection.map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox 
                        id={format}
                        checked={(newCategory.allowedFormats || []).includes(format)}
                        onCheckedChange={(checked) => handleFormatChange(format, checked as boolean)}
                      />
                      <Label htmlFor={format} className="text-sm">{format.toUpperCase()}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSize">Maximum File Size (MB)</Label>
                <Input
                  id="maxSize"
                  type="number"
                  value={newCategory.maxSize || 5}
                  onChange={(e) => setNewCategory({ ...newCategory, maxSize: parseInt(e.target.value) })}
                  min="1"
                  max="100"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isActive"
                  checked={newCategory.isActive || true}
                  onCheckedChange={(checked) => setNewCategory({ ...newCategory, isActive: checked as boolean })}
                />
                <Label htmlFor="isActive">Active Category</Label>
              </div>
              <Button onClick={handleAddCategory} className="w-full">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Document Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
          <CardDescription>
            Manage document categories and their requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Allowed Formats</TableHead>
                  <TableHead>Max Size</TableHead>
                  <TableHead>Templates</TableHead>
                  <TableHead>Validations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {category.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {category.allowedFormats.map((format) => (
                          <Badge key={format} variant="secondary" className="text-xs">
                            {format.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{category.maxSize} MB</TableCell>
                    <TableCell>{category.templates.length}</TableCell>
                    <TableCell>{category.validations.length}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusBadgeColor(category.isActive)}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
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
                          onClick={() => handleDeleteCategory(category.id)}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Manage document templates for standardized submissions</p>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Template
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Validations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Configure validation rules for document verification</p>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Validation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              OCR Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Configure OCR verification for key documents</p>
            <Button variant="outline" size="sm" className="w-full">
              Configure OCR
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentManagement;
