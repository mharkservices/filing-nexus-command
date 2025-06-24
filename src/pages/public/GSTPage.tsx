
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, FileText } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const GSTPage = () => {
  const gstServices = [
    {
      title: 'GST Registration',
      description: 'Complete GST registration with GSTIN certificate',
      price: '₹2,999',
      features: ['GSTIN Certificate', 'GST Login Credentials', 'Digital Signature', 'Expert Consultation']
    },
    {
      title: 'GST Return Filing',
      description: 'Monthly/Quarterly GST return filing services',
      price: '₹1,999/month',
      features: ['GSTR-1 Filing', 'GSTR-3B Filing', 'Input Tax Credit', 'Compliance Calendar']
    },
    {
      title: 'GST Consultation',
      description: 'Expert GST advice and compliance support',
      price: '₹4,999',
      features: ['Tax Planning', 'Compliance Review', 'Notice Response', 'Refund Processing']
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 text-orange-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              GST Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive GST registration, filing, and compliance solutions
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gstServices.map((service, index) => (
                <Card key={index} className="border-2 hover:border-orange-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <div className="text-2xl font-bold text-orange-600">{service.price}</div>
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

export default GSTPage;
