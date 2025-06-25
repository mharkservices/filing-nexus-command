
export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  order: number;
  type: 'manual' | 'automated' | 'conditional';
  isRequired: boolean;
  estimatedDuration: number; // in hours
  assignedRoles: string[];
  requiredDocuments: string[];
  actions: WorkflowAction[];
  conditions?: WorkflowCondition[];
}

export interface WorkflowAction {
  id: string;
  name: string;
  type: 'approve' | 'reject' | 'request_info' | 'assign' | 'notify' | 'complete';
  description: string;
  nextStageId?: string;
  isAutomated: boolean;
  triggerConditions?: string[];
}

export interface WorkflowCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
  action: 'proceed' | 'skip' | 'escalate';
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  serviceId: string;
  stages: WorkflowStage[];
  slaHours: number;
  escalationRules: EscalationRule[];
  isActive: boolean;
  createdDate: string;
  lastModified: string;
}

export interface EscalationRule {
  id: string;
  triggerCondition: 'time_exceeded' | 'stage_stuck' | 'approval_required';
  triggerValue: number; // hours for time-based, stage count for stage-based
  escalateTo: string[]; // user IDs or role names
  action: 'notify' | 'reassign' | 'auto_approve';
  message: string;
}

export interface WorkflowInstance {
  id: string;
  templateId: string;
  serviceRequestId: string;
  currentStageId: string;
  status: 'in_progress' | 'completed' | 'escalated' | 'cancelled';
  startDate: string;
  expectedCompletionDate: string;
  actualCompletionDate?: string;
  assignedTo?: string;
  stageHistory: WorkflowStageHistory[];
  slaStatus: 'on_track' | 'at_risk' | 'breached';
}

export interface WorkflowStageHistory {
  stageId: string;
  stageName: string;
  startDate: string;
  endDate?: string;
  assignedTo: string;
  action: string;
  comments?: string;
  duration?: number; // in hours
}

export interface WorkflowMetrics {
  averageCompletionTime: number;
  slaComplianceRate: number;
  bottleneckStages: string[];
  escalationCount: number;
  throughput: number; // requests per day
}
