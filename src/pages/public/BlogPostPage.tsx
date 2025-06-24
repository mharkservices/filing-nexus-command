
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();

  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    id: parseInt(id || '1'),
    title: 'Essential Documents for Business Registration: A Complete Checklist',
    content: `
      <p>Starting a new business is an exciting journey, but it comes with numerous administrative requirements that must be handled correctly from the beginning. One of the most critical aspects of business formation is ensuring you have all the necessary documents prepared and filed properly.</p>
      
      <h2>Why Proper Documentation Matters</h2>
      <p>Having the right documents in order serves multiple purposes:</p>
      <ul>
        <li>Ensures legal compliance with state and federal regulations</li>
        <li>Establishes your business as a legitimate entity</li>
        <li>Protects your personal assets through proper business structure</li>
        <li>Enables you to open business bank accounts and obtain financing</li>
        <li>Allows you to hire employees and contractors legally</li>
      </ul>

      <h2>Essential Documents Checklist</h2>
      <p>Here's a comprehensive list of documents you'll need for business registration:</p>
      
      <h3>1. Articles of Incorporation/Organization</h3>
      <p>This is the foundational document that officially creates your business entity. The specific name varies depending on your business structure:</p>
      <ul>
        <li>Articles of Incorporation (for corporations)</li>
        <li>Articles of Organization (for LLCs)</li>
        <li>Certificate of Partnership (for partnerships)</li>
      </ul>

      <h3>2. Operating Agreement or Bylaws</h3>
      <p>These documents outline how your business will be managed and operated. They include:</p>
      <ul>
        <li>Management structure and roles</li>
        <li>Decision-making processes</li>
        <li>Profit and loss distribution</li>
        <li>Member/shareholder rights and responsibilities</li>
      </ul>

      <h3>3. Employer Identification Number (EIN)</h3>
      <p>Also known as a Federal Tax ID number, this is required for:</p>
      <ul>
        <li>Opening business bank accounts</li>
        <li>Filing tax returns</li>
        <li>Hiring employees</li>
        <li>Working with vendors and contractors</li>
      </ul>

      <h3>4. Business Licenses and Permits</h3>
      <p>Depending on your industry and location, you may need various licenses and permits:</p>
      <ul>
        <li>General business license</li>
        <li>Industry-specific licenses</li>
        <li>Professional certifications</li>
        <li>Health department permits</li>
        <li>Environmental permits</li>
      </ul>

      <h2>State-Specific Requirements</h2>
      <p>Each state has its own requirements for business registration. Some common variations include:</p>
      <ul>
        <li>Different filing fees and processing times</li>
        <li>Varying publication requirements</li>
        <li>Different registered agent requirements</li>
        <li>State-specific tax registrations</li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <p>When preparing your business registration documents, be sure to avoid these common pitfalls:</p>
      <ul>
        <li>Using a business name that's already taken or trademarked</li>
        <li>Incorrectly filling out forms or providing incomplete information</li>
        <li>Missing filing deadlines or renewal dates</li>
        <li>Not maintaining proper registered agent services</li>
        <li>Failing to update documents when business changes occur</li>
      </ul>

      <h2>Getting Professional Help</h2>
      <p>While it's possible to handle business registration yourself, working with experienced professionals can save time and prevent costly mistakes. Professional filing services can:</p>
      <ul>
        <li>Ensure all documents are completed correctly</li>
        <li>Handle state-specific requirements</li>
        <li>Provide ongoing compliance support</li>
        <li>Offer expedited processing when needed</li>
        <li>Maintain your documents securely</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Proper business registration is the foundation of a successful company. By ensuring you have all the necessary documents prepared and filed correctly, you're setting your business up for long-term success and compliance.</p>
      
      <p>If you need assistance with your business registration or have questions about required documentation, don't hesitate to reach out to our expert team. We're here to help make the process as smooth and efficient as possible.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-06-20',
    readTime: '8 min read',
    category: 'Business Registration',
    tags: ['business', 'registration', 'documents', 'checklist', 'compliance']
  };

  return (
    <PublicLayout>
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild>
            <Link to="/blog" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{blogPost.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {blogPost.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Need Help with Your Business Filing?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our expert team is ready to assist you with all your business registration and filing needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/contact">Get Expert Help</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/services">View Our Services</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BlogPostPage;
