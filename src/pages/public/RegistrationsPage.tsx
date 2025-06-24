
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const RegistrationsPage = () => {
  const registrationServices = [
    {
      title: 'Private Limited Company Registration',
      description: 'Complete incorporation process with digital signature and DIN',
      price: '₹6,999',
      features: ['Name Reservation', 'Digital Signature Certificate', 'Director Identification Number', 'Incorporation Certificate'],
      popular: true
    },
    {
      title: 'LLP Registration',
      description: 'Limited Liability Partnership registration with compliance',
      price: '₹4,999',
      features: ['Name Approval', 'LLP Agreement', 'Certificate of Incorporation', 'PAN & TAN Registration']
    },
    {
      title: 'One Person Company Registration',
      description: 'OPC registration for single entrepreneur businesses',
      price: '₹5,999',
      features: ['Name Reservation', 'MOA & AOA Drafting', 'Incorporation Certificate', 'Bank Account Opening Support']
    },
    {
      title: 'Partnership Firm Registration',
      description: 'Partnership deed preparation and registration',
      price: '₹2,999',
      features: ['Partnership Deed', 'PAN Registration', 'Bank Account Opening', 'Registration Certificate']
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Business Registration Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete business registration solutions with expert guidance and government approvals
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {registrationServices.map((service, index) => (
                <Card key={index} className="relative border-2 hover:border-orange-200 transition-colors">
                  {service.popular && (
                    <Badge className="absolute -top-3 left-6 bg-orange-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">{service.price}</div>
                        <div className="text-sm text-gray-500">All inclusive</div>
                      </div>
                    </div>
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
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
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

export default RegistrationsPage;
