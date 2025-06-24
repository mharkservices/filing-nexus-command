
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Book, FileText, Shield, Users, Download, ExternalLink } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const DocumentationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      description: 'Learn the basics of our filing services and how to get started.',
      articles: [
        { title: 'Creating Your Account', description: 'Step-by-step guide to setting up your ZenithFilings account.' },
        { title: 'Understanding Our Services', description: 'Overview of all available filing services and their benefits.' },
        { title: 'First-Time Filing Guide', description: 'Complete walkthrough for your first document filing.' },
        { title: 'Setting Up Your Profile', description: 'How to complete your business profile for optimal service.' }
      ]
    },
    {
      id: 'business-registration',
      title: 'Business Registration',
      icon: FileText,
      description: 'Complete guides for business formation and registration processes.',
      articles: [
        { title: 'LLC Formation Guide', description: 'Everything you need to know about forming an LLC.' },
        { title: 'Corporation Setup', description: 'Step-by-step corporation registration process.' },
        { title: 'Partnership Agreements', description: 'Creating and filing partnership documentation.' },
        { title: 'EIN Application Process', description: 'How to obtain your Employer Identification Number.' },
        { title: 'State-Specific Requirements', description: 'Registration requirements by state.' }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Regulations',
      icon: Shield,
      description: 'Stay compliant with ongoing regulatory requirements.',
      articles: [
        { title: 'Annual Report Filing', description: 'Understanding and completing annual report requirements.' },
        { title: 'License Renewals', description: 'Managing business license renewal processes.' },
        { title: 'Tax Compliance Calendar', description: 'Important tax dates and filing requirements.' },
        { title: 'Regulatory Updates', description: 'Staying current with changing regulations.' },
        { title: 'Audit Preparation', description: 'Preparing for regulatory audits and reviews.' }
      ]
    },
    {
      id: 'document-management',
      title: 'Document Management',
      icon: Users,
      description: 'Best practices for organizing and managing your documents.',
      articles: [
        { title: 'Document Organization', description: 'How to organize your business documents effectively.' },
        { title: 'Security Best Practices', description: 'Keeping your sensitive documents secure.' },
        { title: 'Version Control', description: 'Managing document versions and revisions.' },
        { title: 'Access Controls', description: 'Setting up user permissions and access levels.' },
        { title: 'Backup and Recovery', description: 'Protecting your documents with proper backups.' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How long does business registration typically take?',
      answer: 'Business registration timelines vary by state and business type. LLC formations typically take 5-10 business days, while corporations may take 7-15 business days. We provide real-time status updates throughout the process.'
    },
    {
      question: 'What documents do I need to start the filing process?',
      answer: 'Required documents vary by service type. Generally, you\'ll need identification, business information, and relevant forms. We provide a complete checklist once you select your specific service.'
    },
    {
      question: 'Are my documents secure with ZenithFilings?',
      answer: 'Yes, we use enterprise-grade security including SSL encryption, secure data centers, and strict access controls. All documents are backed up and stored in compliance with industry standards.'
    },
    {
      question: 'Can I track the status of my filings?',
      answer: 'Absolutely! Our portal provides real-time status updates, and you\'ll receive email notifications at each stage of the process. You can also contact our support team for detailed updates.'
    },
    {
      question: 'What if I need help during the filing process?',
      answer: 'Our expert support team is available during business hours to assist with any questions. We also provide comprehensive guides and can schedule one-on-one consultations for complex filings.'
    },
    {
      question: 'Do you offer refunds if I\'m not satisfied?',
      answer: 'We stand behind our services with a satisfaction guarantee. If you\'re not completely satisfied, contact us within 30 days to discuss your concerns and potential refund options.'
    }
  ];

  const resources = [
    {
      title: 'Business Formation Checklist',
      description: 'Complete checklist for starting your business',
      type: 'PDF Download',
      icon: Download
    },
    {
      title: 'State Filing Requirements Guide',
      description: 'Comprehensive guide to state-specific requirements',
      type: 'Online Guide',
      icon: ExternalLink
    },
    {
      title: 'Tax Calendar Template',
      description: 'Annual tax filing calendar template',
      type: 'PDF Download',
      icon: Download
    },
    {
      title: 'Document Organization Template',
      description: 'Template for organizing business documents',
      type: 'PDF Download',
      icon: Download
    }
  ];

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.articles.some(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Documentation & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to know about our filing services, from getting started 
            to advanced compliance management.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredSections.map((section) => (
              <Card key={section.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.articles.map((article, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 hover:border-blue-500 transition-colors">
                        <h4 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600">{article.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to the most common questions about our services.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-lg border">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-gray-600">
              Helpful templates, guides, and tools to support your filing needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <resource.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{resource.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Additional Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Can't find what you're looking for? Our support team is here to help with any questions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-50 transition-colors"
          >
            Contact Support
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default DocumentationPage;
