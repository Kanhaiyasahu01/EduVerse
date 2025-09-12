import { useState } from 'react';
import { Search, TrendingUp, Users, Award, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PostCard } from './PostCard';
import { Footer } from './Footer';
import { dummyPosts, dummyOrganizations } from '../data/dummyData';

export const LandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');

  const categories = ['all', 'Technical', 'NSS', 'Sports', 'Research', 'Certification', 'Internship', 'Cultural'];

  const filteredPosts = dummyPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    const matchesOrganization = selectedOrganization === 'all' || 
                               post.author.organization === selectedOrganization;
    
    return matchesSearch && matchesCategory && matchesOrganization && post.visibility === 'public';
  });

  const stats = [
    { icon: Users, label: 'Active Students', value: '5,500+', color: 'text-blue-600' },
    { icon: Award, label: 'Achievements', value: '1,200+', color: 'text-green-600' },
    { icon: BookOpen, label: 'Organizations', value: '50+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Success Rate', value: '95%', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">EduVerse</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for students to showcase achievements, build portfolios, and connect with opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="flex items-center space-x-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/login"
                className="flex items-center space-x-2 px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search achievements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                <select
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Organizations</option>
                  {dummyOrganizations.map(org => (
                    <option key={org.id} value={org.name}>{org.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-9">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Latest Achievements
              </h2>
              <p className="text-gray-600">
                Discover inspiring achievements from students across institutions
              </p>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <span>Join EduVerse</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.slice(0, 6).map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
                
                {filteredPosts.length > 6 && (
                  <div className="text-center py-8">
                    <Link
                      to="/signup"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <span>Join to see more</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Organizations */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Partner Organizations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leading educational institutions trusted by thousands of students and faculty
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyOrganizations.map(org => (
              <div key={org.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{org.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{org.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{org.facultyCount} Faculty</span>
                  <span>{org.studentCount} Students</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
