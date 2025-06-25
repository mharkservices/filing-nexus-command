
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ServiceCategory } from "@/types/service";
import { FileText, Upload, AlertCircle, CreditCard } from "lucide-react";

interface ServiceRequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ onSubmit, onCancel }) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: ""
    },
    serviceSpecific: {},
    documents: [],
    notes: "",
    urgentProcessing: false
  });

  // Mock services data
  const services: ServiceCategory[] = [
    {
      id: "1",
      name: "Private Limited Company Registration",
      description: "Complete registration of Private Limited Company",
      level: "main",
      status: "active",
      documentRequirements: [
        {
          id: "1",
          name: "PAN Card",
          type: "mandatory",
          formats: ["pdf", "jpg", "png"],
          maxSize: 5,
          validationRules: [],
          description: "PAN Card of all directors"
        },
        {
          id: "2",
          name: "Aadhaar Card",
          type: "mandatory",
          formats: ["pdf", "jpg", "png"],
          maxSize: 5,
          validationRules: []
        },
        {
          id: "3",
          name: "Address Proof",
          type: "mandatory",
          formats: ["pdf", "jpg", "png"],
          maxSize: 5,
          validationRules: []
        }
      ],
      pricing: {
        basePrice: 6999,
        additionalFees: [
          { id: "1", name: "Urgent Processing", amount: 2000, type: "fixed", condition: "urgent" }
        ],
        discounts: [],
        currency: "INR"
      },
      order: 1,
      createdDate: "2024-01-01",
      lastModified: "2024-01-15"
    },
    {
      id: "2",
      name: "GST Registration",
      description: "Goods and Services Tax registration",
      level: "main",
      status: "active",
      documentRequirements: [
        {
          id: "4",
          name: "Business Registration",
          type: "mandatory",
          formats: ["pdf"],
          maxSize: 10,
          validationRules: []
        },
        {
          id: "5",
          name: "Bank Statement",
          type: "mandatory",
          formats: ["pdf"],
          maxSize: 10,
          validationRules: []
        }
      ],
      pricing: {
        basePrice: 2499,
        additionalFees: [],
        discounts: [],
        currency: "INR"
      },
      order: 2,
      createdDate: "2024-01-02",
      lastModified: "2024-01-14"
    }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);
  
  const calculateTotal = () => {
    if (!selectedServiceData?.pricing) return 0;
    
    let total = selectedServiceData.pricing.basePrice;
    
    if (formData.urgentProcessing) {
      const urgentFee = selectedServiceData.pricing.additionalFees.find(
        fee => fee.condition === "urgent"
      );
      if (urgentFee) {
        total += urgentFee.amount;
      }
    }
    
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestData = {
      serviceId: selectedService,
      serviceName: selectedServiceData?.name,
      formData,
      totalAmount: calculateTotal(),
      priority: formData.urgentProcessing ? "high" : "medium"
    };
    
    onSubmit(requestData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">New Service Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Service</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">{service.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedServiceData && (
              <>
                <Separator />
                
                {/* Service Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Service Information</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">{selectedServiceData.name}</h4>
                    <p className="text-blue-700 text-sm mt-1">{selectedServiceData.description}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-lg font-bold text-blue-900">
                        ₹{selectedServiceData.pricing?.basePrice.toLocaleString()}
                      </span>
                      <Badge variant="secondary">Base Price</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, firstName: e.target.value }
                        })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, lastName: e.target.value }
                        })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, email: e.target.value }
                        })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.personalInfo.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, phone: e.target.value }
                        })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.personalInfo.address}
                      onChange={(e) => setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, address: e.target.value }
                      })}
                      required
                    />
                  </div>
                </div>

                <Separator />

                {/* Document Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Required Documents</h3>
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      You can upload documents now or later from your dashboard. All mandatory documents must be provided before processing begins.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    {selectedServiceData.documentRequirements.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          {doc.type === 'mandatory' && <Badge variant="destructive" className="ml-2">Required</Badge>}
                          {doc.type === 'optional' && <Badge variant="secondary" className="ml-2">Optional</Badge>}
                          {doc.description && (
                            <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            Formats: {doc.formats.join(", ")} • Max size: {doc.maxSize}MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-1" />
                          Upload
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Additional Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Options</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgentProcessing"
                      checked={formData.urgentProcessing}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        urgentProcessing: checked as boolean
                      })}
                    />
                    <Label htmlFor="urgentProcessing" className="text-sm">
                      Urgent Processing (+₹2,000) - Complete within 7 days
                    </Label>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific requirements or questions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                {/* Price Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Price Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Base Service Fee</span>
                      <span>₹{selectedServiceData.pricing?.basePrice.toLocaleString()}</span>
                    </div>
                    {formData.urgentProcessing && (
                      <div className="flex justify-between">
                        <span>Urgent Processing</span>
                        <span>₹2,000</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequestForm;
