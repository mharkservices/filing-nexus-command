
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Users } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const HRAPage = () => {
  const hraServices = [
    {
      title: 'HRA Exemption Calculation',
      description: 'Calculate maximum HRA tax exemption',
      price: '₹1,499',
      features: ['HRA Calculation', 'Tax Benefit Analysis', 'Documentation Support', 'Expert Consultation']
    },
    {
      title: 'Rent Agreement Preparation',
      description: 'Legal rent agreement for HRA claims',
      price: '₹2,999',
      features: ['Legal Rent Agreement', 'Stamp Paper', 'Registration Support', 'HRA Compliance']
    },
    {
      title: 'HRA Tax Planning',
      description: 'Comprehensive HRA and tax planning',
      price: '₹4,999',
      features: ['Annual Tax Planning', 'HRA Optimization', 'Investment Planning', 'Quarterly Review']
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              HRA Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              House Rent Allowance calculation and tax optimization services
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hraServices.map((service, index) => (
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

export default HRAPage;
