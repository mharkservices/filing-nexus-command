import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Building, FileText, Shield, Clock, DollarSign, Users, CheckCircle, ArrowRight, BookOpen, Briefcase, ChevronDown } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const ServicesPage = () => {
  const services = [
    {
      icon: Building,
      title: 'Private Limited Company Registration',
      description: 'Complete registration of Private Limited Company with all legal formalities and documentation.',
      features: ['MOA & AOA preparation', 'DIN & DSC for directors', 'Name reservation', 'ROC filing'],
      price: '₹6,999',
      popular: true
    },
    {
      icon: FileText,
      title: 'LLP Registration',
      description: 'Limited Liability Partnership registration with complete documentation and compliance.',
      features: ['LLP agreement drafting', 'DIN & DSC for partners', 'Name approval', 'ROC registration'],
      price: '₹4,999',
      popular: false
    },
    {
      icon: Shield,
      title: 'GST Registration',
      description: 'Goods and Services Tax registration for businesses across all states in India.',
      features: ['GST application filing', 'Document verification', 'State-wise registration', 'GST certificate'],
      price: '₹2,499',
      popular: false
    },
    {
      icon: Briefcase,
      title: 'Trademark Registration',
      description: 'Protect your brand with comprehensive trademark registration services.',
      features: ['Trademark search', 'Application filing', 'Response to objections', 'Registration certificate'],
      price: '₹4,999',
      popular: false
    },
    {
      icon: BookOpen,
      title: 'Annual ROC Compliance',
      description: 'Complete annual compliance filing for companies and LLPs with ROC.',
      features: ['Annual return filing', 'Financial statement filing', 'AOC-4 preparation', 'MGT-7 filing'],
      price: '₹3,999',
      popular: false
    },
    {
      icon: DollarSign,
      title: 'Income Tax Return Filing',
      description: 'Professional ITR filing services for individuals and businesses.',
      features: ['ITR-1 to ITR-7 filing', 'Tax computation', 'Refund processing', 'Notice handling'],
      price: '₹1,499',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Document Collection',
      description: 'We help you gather all required documents and verify their authenticity.'
    },
    {
      step: '02',
      title: 'Application Preparation',
      description: 'Our experts prepare your application with attention to detail and accuracy.'
    },
    {
      step: '03',
      title: 'Government Filing',
      description: 'We handle all government submissions and track the application status.'
    },
    {
      step: '04',
      title: 'Certificate Delivery',
      description: 'Receive your certificates and maintain ongoing compliance support.'
    }
  ];

  const serviceCategories = [
    {
      name: 'Registrations',
      path: '/services/registrations',
      description: 'Company registration and business setup services'
    },
    {
      name: 'Compliance',
      path: '/services/compliance',
      description: 'Annual compliance and regulatory filing services'
    },
    {
      name: 'GST',
      path: '/services/gst',
      description: 'GST registration, filing and compliance services'
    },
    {
      name: 'Income Tax',
      path: '/services/income-tax',
      description: 'Income tax return filing and tax planning services'
    },
    {
      name: 'MCA',
      path: '/services/mca',
      description: 'Ministry of Corporate Affairs related services'
    },
    {
      name: 'HRA',
      path: '/services/hra',
      description: 'House Rent Allowance and related tax services'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-sky-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Business Registration & Compliance Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive solutions for company registration, tax filing, and regulatory compliance. 
            Trusted by over 50,000+ businesses across India.
          </p>
          
          {/* Service Categories Dropdown */}
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Browse Service Categories
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white border border-gray-200 shadow-lg">
                <DropdownMenuLabel className="text-orange-600 font-semibold">Service Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {serviceCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link 
                      to={category.path}
                      className="flex flex-col items-start p-3 hover:bg-orange-50 cursor-pointer"
                    >
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.description}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
              Choose from our comprehensive range of business registration and compliance services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-shadow ${service.popular ? 'ring-2 ring-orange-500' : ''}`}>
                {service.popular && (
                  <Badge className="absolute -top-2 left-4 bg-orange-500">Most Popular</Badge>
                )}
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-orange-600 mb-4">{service.price}</div>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
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
              We follow a proven 4-step process to ensure your business registration is completed efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
      <section className="py-20 bg-gradient-to-r from-orange-600 to-sky-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Business?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have successfully registered their businesses with us.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Start Registration Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServicesPage;
