import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { FileText, Plus, Search, Filter, Edit, Trash2, Eye, Globe, AlertTriangle, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { errorLogger } from "@/services/errorLogger";

interface ContentData {
  id: string;
  title: string;
  type: "page" | "blog" | "service" | "legal";
  status: "published" | "draft" | "archived";
  author: string;
  createdDate: string;
  lastModified: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  content?: string;
}

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [isEditContentOpen, setIsEditContentOpen] = useState(false);
  const [isViewContentOpen, setIsViewContentOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingContent, setEditingContent] = useState<ContentData | null>(null);
  const [newContent, setNewContent] = useState({
    title: "",
    type: "page" as const,
    status: "draft" as const,
    seoTitle: "",
    metaDescription: "",
    slug: "",
    content: ""
  });

  const [contents, setContents] = useState<ContentData[]>([
    {
      id: "1",
      title: "Private Limited Company Registration Guide",
      type: "service",
      status: "published",
      author: "Admin",
      createdDate: "2024-01-01",
      lastModified: "2024-01-15",
      seoTitle: "Complete Guide to Private Limited Company Registration in India",
      metaDescription: "Learn how to register a private limited company in India with step-by-step guide, required documents, and fees.",
      slug: "private-limited-company-registration-guide",
      content: "This comprehensive guide covers everything you need to know about registering a private limited company in India..."
    },
    {
      id: "2",
      title: "GST Registration Process",
      type: "service",
      status: "published",
      author: "Editor",
      createdDate: "2024-01-02",
      lastModified: "2024-01-14",
      seoTitle: "GST Registration Online - Documents, Process & Fees",
      metaDescription: "Complete guide to GST registration in India. Know the process, required documents, and fees for GST registration.",
      slug: "gst-registration-process",
      content: "GST registration is mandatory for businesses with turnover exceeding Rs. 20 lakhs..."
    },
    {
      id: "3",
      title: "Understanding Business Compliance in 2024",
      type: "blog",
      status: "published",
      author: "Content Writer",
      createdDate: "2024-01-03",
      lastModified: "2024-01-13",
      seoTitle: "Business Compliance Requirements in India 2024",
      metaDescription: "Stay compliant with latest business regulations in India. Complete guide to business compliance requirements.",
      slug: "business-compliance-2024",
      content: "Business compliance has become increasingly important in 2024 with new regulations..."
    },
    {
      id: "4",
      title: "Terms of Service",
      type: "legal",
      status: "published",
      author: "Legal Team",
      createdDate: "2024-01-04",
      lastModified: "2024-01-12",
      seoTitle: "Terms of Service - ZenithFilings",
      metaDescription: "Terms and conditions for using ZenithFilings services and platform.",
      slug: "terms-of-service",
      content: "These terms of service govern your use of our platform and services..."
    },
    {
      id: "5",
      title: "New Service Launch - Trademark Registration",
      type: "blog",
      status: "draft",
      author: "Marketing Team",
      createdDate: "2024-01-10",
      lastModified: "2024-01-10",
      seoTitle: "Trademark Registration Services Now Available",
      metaDescription: "Protect your brand with our new trademark registration services. Get started today.",
      slug: "trademark-registration-launch",
      content: "We're excited to announce the launch of our new trademark registration services..."
    }
  ]);

  const contentTypes = [
    { value: "page", label: "Page" },
    { value: "blog", label: "Blog Post" },
    { value: "service", label: "Service Page" },
    { value: "legal", label: "Legal Document" }
  ];

  useEffect(() => {
    const initializeContent = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Simulate content loading (in real app, this would be an API call)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        errorLogger.log('info', 'Content Management initialized successfully', undefined, {
          component: 'ContentManagement',
          action: 'initialize',
          userId: 'admin'
        });
        
      } catch (error) {
        setHasError(true);
        setErrorMessage('Failed to load content. Please try refreshing the page.');
        errorLogger.log('error', 'Failed to initialize Content Management', error as Error, {
          component: 'ContentManagement',
          action: 'initialize'
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeContent();
  }, []);

  const filteredContents = contents.filter(content => {
    try {
      const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           content.seoTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || content.type === selectedType;
      const matchesStatus = selectedStatus === "all" || content.status === selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    } catch (error) {
      errorLogger.log('error', 'Error filtering content', error as Error, {
        component: 'ContentManagement',
        action: 'filter'
      });
      return false;
    }
  });

  const generateSlug = (title: string) => {
    try {
      return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    } catch (error) {
      errorLogger.log('error', 'Error generating slug', error as Error, {
        component: 'ContentManagement',
        action: 'generateSlug'
      });
      return 'untitled-content';
    }
  };

  const validateContent = (content: typeof newContent) => {
    const errors = [];
    
    if (!content.title.trim()) errors.push('Title is required');
    if (!content.seoTitle.trim()) errors.push('SEO Title is required');
    if (content.metaDescription.length > 160) errors.push('Meta description should be under 160 characters');
    if (content.slug && !/^[a-z0-9-]+$/.test(content.slug)) errors.push('Slug should only contain lowercase letters, numbers, and hyphens');
    
    return errors;
  };

  const handleViewContent = (content: ContentData) => {
    setSelectedContent(content);
    setIsViewContentOpen(true);
  };

  const handleEditContent = (content: ContentData) => {
    setEditingContent(content);
    setIsEditContentOpen(true);
  };

  const handleUpdateContent = async () => {
    if (!editingContent) return;
    
    try {
      setIsLoading(true);
      
      const validationErrors = validateContent({
        title: editingContent.title,
        type: editingContent.type,
        status: editingContent.status,
        seoTitle: editingContent.seoTitle,
        metaDescription: editingContent.metaDescription,
        slug: editingContent.slug,
        content: editingContent.content || ""
      });
      
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedContent = {
        ...editingContent,
        lastModified: new Date().toISOString().split('T')[0]
      };

      setContents(contents.map(content => 
        content.id === editingContent.id ? updatedContent : content
      ));
      
      setIsEditContentOpen(false);
      setEditingContent(null);
      
      toast({
        title: "Success",
        description: "Content updated successfully.",
      });

      errorLogger.log('info', 'Content updated successfully', undefined, {
        component: 'ContentManagement',
        action: 'update',
        contentId: editingContent.id
      });
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });

      errorLogger.log('error', 'Failed to update content', error as Error, {
        component: 'ContentManagement',
        action: 'update'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContent = async () => {
    try {
      setIsLoading(true);
      
      const validationErrors = validateContent(newContent);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      const content: ContentData = {
        id: Date.now().toString(),
        ...newContent,
        author: "Admin",
        slug: newContent.slug || generateSlug(newContent.title),
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setContents([...contents, content]);
      setNewContent({
        title: "",
        type: "page",
        status: "draft",
        seoTitle: "",
        metaDescription: "",
        slug: "",
        content: ""
      });
      setIsAddContentOpen(false);
      
      toast({
        title: "Success",
        description: "Content created successfully.",
      });

      errorLogger.log('info', 'Content created successfully', undefined, {
        component: 'ContentManagement',
        action: 'create',
        contentId: content.id
      });
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });

      errorLogger.log('error', 'Failed to create content', error as Error, {
        component: 'ContentManagement',
        action: 'create'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (contentId: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setContents(contents.filter(content => content.id !== contentId));
      
      toast({
        title: "Success",
        description: "Content deleted successfully.",
      });

      errorLogger.log('info', 'Content deleted successfully', undefined, {
        component: 'ContentManagement',
        action: 'delete',
        contentId
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content. Please try again.",
        variant: "destructive",
      });

      errorLogger.log('error', 'Failed to delete content', error as Error, {
        component: 'ContentManagement',
        action: 'delete',
        contentId
      });
    } finally {
      setIsLoading(false);
    }
  };

  const retryOperation = () => {
    setHasError(false);
    setErrorMessage("");
    window.location.reload();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "page": return "bg-blue-100 text-blue-800";
      case "blog": return "bg-purple-100 text-purple-800";
      case "service": return "bg-green-100 text-green-800";
      case "legal": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (hasError) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>System Error</AlertTitle>
            <AlertDescription className="mt-2">
              {errorMessage}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4"
                onClick={retryOperation}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600 mt-1">Create and manage website content, pages, and blog posts</p>
          </div>
          
          <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
                <DialogDescription>
                  Add new content to your website with SEO optimization.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newContent.title}
                      onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                      placeholder="Enter content title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Content Type</Label>
                    <Select value={newContent.type} onValueChange={(value: any) => setNewContent({ ...newContent, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={newContent.seoTitle}
                    onChange={(e) => setNewContent({ ...newContent, seoTitle: e.target.value })}
                    placeholder="SEO optimized title for search engines"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={newContent.metaDescription}
                    onChange={(e) => setNewContent({ ...newContent, metaDescription: e.target.value })}
                    placeholder="Brief description for search engines (150-160 characters)"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500">
                    {newContent.metaDescription.length}/160 characters
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={newContent.slug}
                      onChange={(e) => setNewContent({ ...newContent, slug: e.target.value })}
                      placeholder="url-friendly-slug"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newContent.status} onValueChange={(value: any) => setNewContent({ ...newContent, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newContent.content}
                    onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                    placeholder="Write your content here..."
                    rows={6}
                  />
                </div>
                
                <Button 
                  onClick={handleAddContent} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Content"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* View Content Dialog */}
        <Dialog open={isViewContentOpen} onOpenChange={setIsViewContentOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedContent?.title}</DialogTitle>
              <DialogDescription>
                {selectedContent?.seoTitle}
              </DialogDescription>
            </DialogHeader>
            {selectedContent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Badge variant="secondary" className={getTypeBadgeColor(selectedContent.type)}>
                      {contentTypes.find(type => type.value === selectedContent.type)?.label}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge variant="secondary" className={getStatusBadgeColor(selectedContent.status)}>
                      {selectedContent.status.charAt(0).toUpperCase() + selectedContent.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>URL Slug</Label>
                  <p className="text-sm text-gray-600">/{selectedContent.slug}</p>
                </div>
                <div>
                  <Label>Meta Description</Label>
                  <p className="text-sm text-gray-600">{selectedContent.metaDescription}</p>
                </div>
                <div>
                  <Label>Author</Label>
                  <p className="text-sm text-gray-600">{selectedContent.author}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Created</Label>
                    <p className="text-sm text-gray-600">{selectedContent.createdDate}</p>
                  </div>
                  <div>
                    <Label>Last Modified</Label>
                    <p className="text-sm text-gray-600">{selectedContent.lastModified}</p>
                  </div>
                </div>
                {selectedContent.content && (
                  <div>
                    <Label>Content</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm whitespace-pre-wrap">{selectedContent.content}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Content Dialog */}
        <Dialog open={isEditContentOpen} onOpenChange={setIsEditContentOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Content</DialogTitle>
              <DialogDescription>
                Modify the content details and settings.
              </DialogDescription>
            </DialogHeader>
            {editingContent && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                      placeholder="Enter content title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Content Type</Label>
                    <Select value={editingContent.type} onValueChange={(value: any) => setEditingContent({ ...editingContent, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-seoTitle">SEO Title</Label>
                  <Input
                    id="edit-seoTitle"
                    value={editingContent.seoTitle}
                    onChange={(e) => setEditingContent({ ...editingContent, seoTitle: e.target.value })}
                    placeholder="SEO optimized title for search engines"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-metaDescription">Meta Description</Label>
                  <Textarea
                    id="edit-metaDescription"
                    value={editingContent.metaDescription}
                    onChange={(e) => setEditingContent({ ...editingContent, metaDescription: e.target.value })}
                    placeholder="Brief description for search engines (150-160 characters)"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500">
                    {editingContent.metaDescription.length}/160 characters
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-slug">URL Slug</Label>
                    <Input
                      id="edit-slug"
                      value={editingContent.slug}
                      onChange={(e) => setEditingContent({ ...editingContent, slug: e.target.value })}
                      placeholder="url-friendly-slug"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select value={editingContent.status} onValueChange={(value: any) => setEditingContent({ ...editingContent, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editingContent.content || ""}
                    onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                    placeholder="Write your content here..."
                    rows={6}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleUpdateContent} 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Content"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsEditContentOpen(false);
                      setEditingContent(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* System Status Alert */}
        {isLoading && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Processing</AlertTitle>
            <AlertDescription>
              Please wait while we process your request...
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contents.length}</div>
              <p className="text-xs text-muted-foreground">All content pieces</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Globe className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contents.filter(c => c.status === 'published').length}</div>
              <p className="text-xs text-muted-foreground">Live content</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <FileText className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contents.filter(c => c.status === 'draft').length}</div>
              <p className="text-xs text-muted-foreground">Work in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contents.filter(c => c.type === 'blog').length}</div>
              <p className="text-xs text-muted-foreground">Blog articles</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Table */}
        <Card>
          <CardHeader>
            <CardTitle>Content Library</CardTitle>
            <CardDescription>
              Manage all your website content, SEO settings, and publication status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContents.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{content.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {content.seoTitle}
                          </div>
                          <div className="text-xs text-gray-400">
                            /{content.slug}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getTypeBadgeColor(content.type)}>
                          {contentTypes.find(type => type.value === content.type)?.label || content.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusBadgeColor(content.status)}>
                          {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>{content.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewContent(content)}
                            title="View content"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditContent(content)}
                            title="Edit content"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(content.id)}
                            className="text-red-600 hover:text-red-700"
                            disabled={isLoading}
                            title="Delete content"
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

export default ContentManagement;
