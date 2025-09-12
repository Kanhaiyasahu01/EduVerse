import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';
import { dummyPosts } from '../data/dummyData';
import { Filter, Search, TrendingUp } from 'lucide-react';

export const PostsFeed: React.FC = () => {
  const { user } = useAuthStore();
  const [filterBy, setFilterBy] = useState<'all' | 'public' | 'organization' | 'approved' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'relevant'>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on user role and selected filters
  const getFilteredPosts = () => {
    let filteredPosts = [...dummyPosts];

    // Role-based filtering
    switch (user?.role) {
      case 'student':
        // Students see public posts and their organization's posts
        filteredPosts = dummyPosts.filter(post => 
          post.visibility === 'public' || 
          (post.visibility === 'organization' && post.author.organization === user.organization)
        );
        break;
      case 'faculty':
        // Faculty see all posts but can focus on their department
        filteredPosts = dummyPosts;
        break;
      case 'organization':
        // Organizations see all posts
        filteredPosts = dummyPosts;
        break;
      default:
        filteredPosts = dummyPosts.filter(post => post.visibility === 'public');
    }

    // Apply additional filters
    if (filterBy !== 'all') {
      switch (filterBy) {
        case 'public':
          filteredPosts = filteredPosts.filter(post => post.visibility === 'public');
          break;
        case 'organization':
          filteredPosts = filteredPosts.filter(post => 
            post.visibility === 'organization' && 
            post.author.organization === user?.organization
          );
          break;
        case 'approved':
          filteredPosts = filteredPosts.filter(post => post.status === 'approved');
          break;
        case 'pending':
          filteredPosts = filteredPosts.filter(post => post.status === 'pending');
          break;
      }
    }

    // Apply search filter
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filteredPosts.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
        break;
      case 'relevant':
        // For now, same as recent, but could be enhanced with user behavior
        filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'recent':
      default:
        filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filteredPosts;
  };

  const filteredPosts = getFilteredPosts();

  // Get filter options based on user role
  const getFilterOptions = () => {
    const baseOptions = [
      { value: 'all', label: 'All Posts' },
      { value: 'public', label: 'Public Posts' },
    ];

    if (user?.role === 'student' || user?.role === 'faculty') {
      baseOptions.push({ value: 'organization', label: 'My Organization' });
    }

    if (user?.role === 'faculty' || user?.role === 'organization') {
      baseOptions.push(
        { value: 'approved', label: 'Approved Posts' },
        { value: 'pending', label: 'Pending Posts' }
      );
    }

    return baseOptions;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Posts Feed</h1>
              <p className="text-gray-600">
                {user?.role === 'student' && 'Discover achievements and get inspired by your peers'}
                {user?.role === 'faculty' && 'Review student achievements and stay updated with activities'}
                {user?.role === 'organization' && 'Monitor institutional activities and achievements'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp size={20} className="text-blue-600" />
              <span className="text-sm text-gray-600">{filteredPosts.length} posts</span>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, authors, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter by Type */}
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getFilterOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="relevant">Most Relevant</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Create Post - Only for students */}
              {user?.role === 'student' && (
                <div className="mb-6">
                  <CreatePost />
                </div>
              )}

              {/* Posts Feed */}
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? `No posts match your search "${searchQuery}"`
                      : 'No posts match the selected filters'
                    }
                  </p>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-0">
                  {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="text-center py-4">
                  <button className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Load more posts
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Filter Stats */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4">
              {/* Filter Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Filter Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Posts:</span>
                    <span className="font-medium">{filteredPosts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Public Posts:</span>
                    <span className="font-medium">
                      {filteredPosts.filter(p => p.visibility === 'public').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved:</span>
                    <span className="font-medium">
                      {filteredPosts.filter(p => p.status === 'approved').length}
                    </span>
                  </div>
                  {(user?.role === 'faculty' || user?.role === 'organization') && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-medium text-yellow-600">
                        {filteredPosts.filter(p => p.status === 'pending').length}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Filters</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setFilterBy('all')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      filterBy === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    🌐 All Posts
                  </button>
                  <button 
                    onClick={() => setFilterBy('public')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      filterBy === 'public' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    📢 Public Only
                  </button>
                  {(user?.role === 'student' || user?.role === 'faculty') && (
                    <button 
                      onClick={() => setFilterBy('organization')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        filterBy === 'organization' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      🏢 My Organization
                    </button>
                  )}
                  {(user?.role === 'faculty' || user?.role === 'organization') && (
                    <>
                      <button 
                        onClick={() => setFilterBy('approved')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          filterBy === 'approved' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ✅ Approved
                      </button>
                      <button 
                        onClick={() => setFilterBy('pending')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          filterBy === 'pending' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ⏳ Pending Review
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {['Technical', 'Sports', 'NSS', 'Cultural', 'Research', 'Internship'].map(category => {
                    const count = filteredPosts.filter(p => p.category === category).length;
                    return (
                      <div key={category} className="flex justify-between items-center py-1">
                        <span className="text-sm text-gray-600">{category}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
