
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Shield } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const CompliancePage = () => {
  const complianceServices = [
    {
      title: 'Annual Compliance Package',
      description: 'Complete annual filing and compliance management',
      price: '₹8,999',
      features: ['Annual Return Filing', 'Board Resolution', 'Financial Statement Filing', 'Compliance Calendar']
    },
    {
      title: 'ROC Filing Services',
      description: 'Registrar of Companies filing and documentation',
      price: '₹3,999',
      features: ['Form Filing', 'Document Preparation', 'ROC Liaison', 'Status Updates']
    },
    {
      title: 'Board Meeting Support',
      description: 'Board meeting documentation and compliance',
      price: '₹2,499',
      features: ['Meeting Minutes', 'Resolution Drafting', 'Notice Preparation', 'Compliance Check']
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Compliance Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay compliant with all regulatory requirements and avoid penalties
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {complianceServices.map((service, index) => (
                <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default CompliancePage;
