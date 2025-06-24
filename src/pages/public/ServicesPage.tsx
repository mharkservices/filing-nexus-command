
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, FileText, Shield, Clock, DollarSign, Users, CheckCircle, ArrowRight } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const ServicesPage = () => {
  const services = [
    {
      icon: Building,
      title: 'Business Registration & Incorporation',
      description: 'Complete business formation services including LLC, Corporation, and Partnership registrations.',
      features: ['State filing assistance', 'EIN application', 'Operating agreements', 'Corporate bylaws'],
      price: 'Starting at $199',
      popular: false
    },
    {
      icon: FileText,
      title: 'Tax Document Preparation',
      description: 'Professional tax preparation and filing services for individuals and businesses.',
      features: ['Form preparation', 'Tax optimization', 'Quarterly filings', 'Audit support'],
      price: 'Starting at $149',
      popular: true
    },
    {
      icon: Shield,
      title: 'Compliance Management',
      description: 'Stay compliant with ongoing regulatory requirements and annual reporting obligations.',
      features: ['Annual reports', 'License renewals', 'Compliance tracking', 'Deadline reminders'],
      price: 'Starting at $99/month',
      popular: false
    },
    {
      icon: Clock,
      title: 'Document Storage & Retrieval',
      description: 'Secure cloud-based document management with instant access and advanced search.',
      features: ['Unlimited storage', 'Advanced search', 'Version control', '24/7 access'],
      price: 'Starting at $29/month',
      popular: false
    },
    {
      icon: DollarSign,
      title: 'Financial Filing Services',
      description: 'Comprehensive financial document preparation and regulatory filing assistance.',
      features: ['Financial statements', 'SEC filings', 'Bank submissions', 'Investor reports'],
      price: 'Custom pricing',
      popular: false
    },
    {
      icon: Users,
      title: 'Consulting & Support',
      description: 'Expert guidance and personalized consulting for complex filing requirements.',
      features: ['One-on-one consultation', 'Strategy planning', 'Custom solutions', 'Priority support'],
      price: 'Starting at $150/hour',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your specific needs and requirements to create a customized plan.'
    },
    {
      step: '02',
      title: 'Documentation',
      description: 'Our experts prepare and review all necessary documents with attention to detail.'
    },
    {
      step: '03',
      title: 'Filing',
      description: 'We handle all submissions and communications with relevant authorities.'
    },
    {
      step: '04',
      title: 'Follow-up',
      description: 'Ongoing support and monitoring to ensure continued compliance and success.'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Filing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions for all your document filing and compliance needs. 
            From business formation to ongoing maintenance, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of professional filing services designed to meet your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-shadow ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {service.popular && (
                  <Badge className="absolute -top-2 left-4 bg-blue-500">Most Popular</Badge>
                )}
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-blue-600 mb-4">{service.price}</div>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We follow a proven process to ensure your filing needs are met efficiently and accurately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every business is unique. Contact us to discuss your specific requirements and get a customized quote.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServicesPage;
