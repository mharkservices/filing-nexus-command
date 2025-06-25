
export interface ValidationRule {
  type: 'expiry_date' | 'min_info' | 'format_specific';
  value: string;
  message: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  templateFile?: string;
  instructions: string[];
  category: string;
  version: string;
  isActive: boolean;
  createdDate: string;
  lastModified: string;
}

export interface DocumentValidation {
  id: string;
  name: string;
  rules: ValidationRule[];
  errorMessage: string;
  isActive: boolean;
}

export interface DocumentSubmission {
  id: string;
  documentRequirementId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected' | 'requires_resubmission';
  validationResults: ValidationResult[];
  ocrResults?: OCRResult;
  submittedBy: string;
  verifiedBy?: string;
  verificationDate?: string;
  rejectionReason?: string;
}

export interface ValidationResult {
  ruleId: string;
  ruleName: string;
  status: 'passed' | 'failed' | 'warning';
  message: string;
  details?: string;
}

export interface OCRResult {
  extractedText: string;
  confidence: number;
  keyFields: Record<string, string>;
  processingDate: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  allowedFormats: string[];
  maxSize: number;
  templates: DocumentTemplate[];
  validations: DocumentValidation[];
  isActive: boolean;
}
