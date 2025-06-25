
export interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  userId: string;
  status: 'draft' | 'submitted' | 'in_progress' | 'under_review' | 'completed' | 'rejected' | 'requires_action';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submissionDate: string;
  expectedCompletionDate?: string;
  actualCompletionDate?: string;
  currentStage: string;
  progress: number; // 0-100
  totalAmount: number;
  paidAmount: number;
  documents: RequestDocument[];
  messages: RequestMessage[];
  timeline: TimelineEvent[];
  assignedAgent?: string;
  notes?: string;
}

export interface RequestDocument {
  id: string;
  requestId: string;
  documentTypeId: string;
  documentTypeName: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected' | 'requires_resubmission';
  rejectionReason?: string;
  verificationDate?: string;
  verifiedBy?: string;
  isRequired: boolean;
  downloadUrl?: string;
}

export interface RequestMessage {
  id: string;
  requestId: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'admin' | 'system';
  message: string;
  timestamp: string;
  attachments?: MessageAttachment[];
  isRead: boolean;
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  downloadUrl: string;
}

export interface TimelineEvent {
  id: string;
  requestId: string;
  event: string;
  description: string;
  timestamp: string;
  performedBy?: string;
  status: 'completed' | 'current' | 'pending';
  metadata?: Record<string, any>;
}

export interface UserDashboardStats {
  totalRequests: number;
  activeRequests: number;
  completedRequests: number;
  pendingDocuments: number;
  unreadMessages: number;
  averageCompletionTime: number;
}

export interface DocumentUploadResult {
  success: boolean;
  documentId?: string;
  fileName: string;
  message: string;
  validationErrors?: string[];
}

export interface PaymentInfo {
  requestId: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  paymentStatus: 'pending' | 'partial' | 'completed' | 'failed';
  paymentMethod?: string;
  lastPaymentDate?: string;
  invoiceUrl?: string;
}
