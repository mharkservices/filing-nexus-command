
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  level: 'main' | 'sub' | 'variant';
  status: 'active' | 'inactive' | 'draft';
  documentRequirements: DocumentRequirement[];
  pricing?: ServicePricing;
  processingTime?: ProcessingTime;
  order: number;
  createdDate: string;
  lastModified: string;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  type: 'mandatory' | 'optional';
  formats: string[];
  maxSize: number;
  validationRules: ValidationRule[];
  description?: string;
}

export interface ValidationRule {
  type: 'expiry_date' | 'min_info' | 'format_specific';
  value: string;
  message: string;
}

export interface ServicePricing {
  basePrice: number;
  additionalFees: Fee[];
  discounts: Discount[];
  currency: string;
}

export interface Fee {
  id: string;
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  condition?: string;
}

export interface Discount {
  id: string;
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  condition: string;
  validFrom: string;
  validTo: string;
}

export interface ProcessingTime {
  minimum: number;
  maximum: number;
  unit: 'hours' | 'days' | 'weeks';
  description?: string;
}

// Legacy interface for backward compatibility
export interface ServiceData {
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
