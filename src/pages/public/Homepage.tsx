
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Clock, Users, CheckCircle, ArrowRight, Building, Star } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const Homepage = () => {
  const features = [
    {
      icon: Building,
      title: 'Business Registration',
      description: 'Complete company and LLP registration services with end-to-end support and documentation.'
    },
    {
      icon: Shield,
      title: 'Legal Compliance',
      description: 'Stay compliant with all regulatory requirements including ROC filings and annual returns.'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Fast turnaround times with real-time updates on your application status.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 support from qualified professionals and chartered accountants.'
    }
  ];

  const services = [
    'Private Limited Company Registration',
    'Limited Liability Partnership (LLP)',
    'GST Registration & Filing',
    'Trademark & Copyright Protection',
    'Income Tax Return Filing',
    'Annual ROC Compliance'
  ];

  const stats = [
    { number: '50,000+', label: 'Companies Registered' },
    { number: '99.9%', label: 'Success Rate' },
    { number: '24/7', label: 'Customer Support' },
    { number: '15+', label: 'Years Experience' }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-sky-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              India's #1 Platform for
              <span className="block bg-gradient-to-r from-orange-600 to-sky-500 bg-clip-text text-transparent">Business Registration</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Register your company online in just 15 minutes. Trusted by over 50,000+ entrepreneurs 
              across India for hassle-free business registration and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
                <Link to="/services">
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Talk to Expert</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-orange-600">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ZenithFilings?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make business registration simple, fast, and affordable with our expert team and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-orange-100">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Business Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From company registration to ongoing compliance, we provide end-to-end 
                business solutions to help you succeed.
              </p>
              
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <Link to="/services">
                    View All Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-8 border border-orange-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted by Thousands</h3>
                  <p className="text-gray-600 mb-4">
                    Join over 50,000+ satisfied customers who have successfully registered their businesses with us.
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">4.9/5 Customer Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-sky-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get your business registered today with India's most trusted platform. 
            Quick, affordable, and completely online.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-50" asChild>
            <Link to="/contact">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Homepage;
