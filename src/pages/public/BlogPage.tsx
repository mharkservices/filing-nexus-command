
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, Tag, ArrowRight } from 'lucide-react';
import PublicLayout from '@/components/public/PublicLayout';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Essential Documents for Business Registration: A Complete Checklist',
      excerpt: 'Starting a new business? Make sure you have all the required documents ready for a smooth registration process.',
      content: 'When starting a new business, having the right documents prepared can make the registration process much smoother...',
      author: 'Sarah Johnson',
      date: '2024-06-20',
      readTime: '5 min read',
      category: 'Business Registration',
      tags: ['business', 'registration', 'documents', 'checklist'],
      featured: true
    },
    {
      id: 2,
      title: 'Tax Filing Deadlines 2024: What You Need to Know',
      excerpt: 'Stay on top of important tax deadlines throughout the year to avoid penalties and ensure compliance.',
      content: 'Tax season can be stressful, but staying organized and knowing key deadlines can help you manage the process effectively...',
      author: 'Michael Chen',
      date: '2024-06-15',
      readTime: '7 min read',
      category: 'Tax Preparation',
      tags: ['tax', 'deadlines', '2024', 'compliance'],
      featured: false
    },
    {
      id: 3,
      title: 'Digital Document Management: Best Practices for Small Businesses',
      excerpt: 'Learn how to organize and secure your business documents with modern digital solutions.',
      content: 'In today\'s digital age, proper document management is crucial for business success and compliance...',
      author: 'Emily Rodriguez',
      date: '2024-06-10',
      readTime: '6 min read',
      category: 'Document Management',
      tags: ['digital', 'management', 'organization', 'security'],
      featured: true
    },
    {
      id: 4,
      title: 'Understanding LLC vs Corporation: Which is Right for Your Business?',
      excerpt: 'Compare the benefits and drawbacks of different business structures to make an informed decision.',
      content: 'Choosing the right business structure is one of the most important decisions you\'ll make as an entrepreneur...',
      author: 'David Park',
      date: '2024-06-05',
      readTime: '8 min read',
      category: 'Business Registration',
      tags: ['LLC', 'corporation', 'business structure', 'comparison'],
      featured: false
    },
    {
      id: 5,
      title: 'Compliance Calendar: Key Dates Every Business Should Track',
      excerpt: 'Never miss important compliance deadlines with our comprehensive business calendar guide.',
      content: 'Staying compliant with various regulations requires careful tracking of important dates and deadlines...',
      author: 'Lisa Thompson',
      date: '2024-05-30',
      readTime: '4 min read',
      category: 'Compliance',
      tags: ['compliance', 'calendar', 'deadlines', 'tracking'],
      featured: false
    },
    {
      id: 6,
      title: 'The Future of Digital Filing: Trends to Watch in 2024',
      excerpt: 'Explore emerging technologies and trends that are shaping the future of document filing and management.',
      content: 'Technology continues to transform how businesses handle their filing and compliance requirements...',
      author: 'Robert Kim',
      date: '2024-05-25',
      readTime: '6 min read',
      category: 'Technology',
      tags: ['digital', 'future', 'trends', 'technology'],
      featured: false
    }
  ];

  const categories = [
    'all',
    'Business Registration',
    'Tax Preparation',
    'Document Management',
    'Compliance',
    'Technology'
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Filing Insights & Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest news, tips, and insights about business filing, 
            compliance, and document management.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              All Articles ({filteredPosts.length})
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/blog/${post.id}`}>Read Article</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default BlogPage;
