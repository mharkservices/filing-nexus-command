
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  Download,
  RefreshCw
} from "lucide-react";
import { DocumentRequirement } from "@/types/service";
import { RequestDocument, DocumentUploadResult } from "@/types/user-portal";

interface DocumentUploadProps {
  requestId: string;
  documentRequirements: DocumentRequirement[];
  uploadedDocuments: RequestDocument[];
  onUpload: (file: File, documentTypeId: string) => Promise<DocumentUploadResult>;
  onDelete: (documentId: string) => void;
  onReplace: (documentId: string, file: File) => Promise<DocumentUploadResult>;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  requestId,
  documentRequirements,
  uploadedDocuments,
  onUpload,
  onDelete,
  onReplace
}) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  const getUploadedDocument = (documentTypeId: string) => {
    return uploadedDocuments.find(doc => doc.documentTypeId === documentTypeId);
  };

  const handleFileUpload = useCallback(async (file: File, documentTypeId: string) => {
    setUploadProgress(prev => ({ ...prev, [documentTypeId]: 0 }));
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[documentTypeId] || 0;
        if (current >= 90) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [documentTypeId]: current + 10 };
      });
    }, 200);

    try {
      const result = await onUpload(file, documentTypeId);
      setUploadProgress(prev => ({ ...prev, [documentTypeId]: 100 }));
      
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[documentTypeId];
          return newProgress;
        });
      }, 2000);
      
      return result;
    } catch (error) {
      clearInterval(interval);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[documentTypeId];
        return newProgress;
      });
      throw error;
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent, documentTypeId: string) => {
    e.preventDefault();
    setDraggedOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], documentTypeId);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent, documentTypeId: string) => {
    e.preventDefault();
    setDraggedOver(documentTypeId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDraggedOver(null);
  }, []);

  const getStatusIcon = (status: RequestDocument['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'requires_resubmission':
        return <RefreshCw className="w-5 h-5 text-orange-600" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: RequestDocument['status']) => {
    const statusConfig = {
      pending: { label: "Pending Review", variant: "secondary" as const },
      verified: { label: "Verified", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const },
      requires_resubmission: { label: "Resubmission Required", variant: "destructive" as const }
    };
    return statusConfig[status];
  };

  const completedDocuments = documentRequirements.filter(req => 
    getUploadedDocument(req.id)?.status === 'verified'
  ).length;

  const totalRequiredDocuments = documentRequirements.filter(req => req.type === 'mandatory').length;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Document Upload Progress</CardTitle>
            <Badge variant={completedDocuments === totalRequiredDocuments ? "default" : "secondary"}>
              {completedDocuments}/{totalRequiredDocuments} Required Documents
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round((completedDocuments / totalRequiredDocuments) * 100)}%</span>
            </div>
            <Progress 
              value={(completedDocuments / totalRequiredDocuments) * 100} 
              className="h-2"
            />
          </div>
          
          {completedDocuments === totalRequiredDocuments && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                All required documents have been uploaded and verified. Your request is ready for processing.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Document Upload Cards */}
      <div className="space-y-4">
        {documentRequirements.map((requirement) => {
          const uploadedDoc = getUploadedDocument(requirement.id);
          const isUploading = uploadProgress[requirement.id] !== undefined;
          
          return (
            <Card key={requirement.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{requirement.name}</CardTitle>
                      {requirement.type === 'mandatory' && (
                        <Badge variant="destructive">Required</Badge>
                      )}
                      {requirement.type === 'optional' && (
                        <Badge variant="secondary">Optional</Badge>
                      )}
                    </div>
                    {requirement.description && (
                      <p className="text-sm text-gray-600 mt-1">{requirement.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Formats: {requirement.formats.join(", ")} • Max size: {requirement.maxSize}MB
                    </p>
                  </div>
                  {uploadedDoc && (
                    <div className="flex items-center gap-2">
                      {getStatusIcon(uploadedDoc.status)}
                      <Badge {...getStatusBadge(uploadedDoc.status)}>
                        {getStatusBadge(uploadedDoc.status).label}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                {!uploadedDoc && !isUploading && (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      draggedOver === requirement.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDrop={(e) => handleDrop(e, requirement.id)}
                    onDragOver={(e) => handleDragOver(e, requirement.id)}
                    onDragLeave={handleDragLeave}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your file here, or
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = requirement.formats.map(f => `.${f}`).join(',');
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            handleFileUpload(file, requirement.id);
                          }
                        };
                        input.click();
                      }}
                    >
                      Choose File
                    </Button>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress[requirement.id]}%</span>
                    </div>
                    <Progress value={uploadProgress[requirement.id]} className="h-2" />
                  </div>
                )}

                {uploadedDoc && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{uploadedDoc.fileName}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadedDoc.fileSize / 1024 / 1024).toFixed(2)} MB • 
                            Uploaded {new Date(uploadedDoc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onDelete(uploadedDoc.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {uploadedDoc.status === 'rejected' && uploadedDoc.rejectionReason && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Rejection Reason:</strong> {uploadedDoc.rejectionReason}
                        </AlertDescription>
                      </Alert>
                    )}

                    {(uploadedDoc.status === 'rejected' || uploadedDoc.status === 'requires_resubmission') && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = requirement.formats.map(f => `.${f}`).join(',');
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              onReplace(uploadedDoc.id, file);
                            }
                          };
                          input.click();
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Replacement
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentUpload;
