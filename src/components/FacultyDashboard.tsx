import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { CheckCircle, XCircle, Clock, Users, FileText, Brain, Bell, Filter, Search } from 'lucide-react';
import { dummyPosts } from '../data/dummyData';
import type { Post } from '../types';

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [aiProcessingPosts, setAiProcessingPosts] = useState<Set<string>>(new Set());
  const [aiResults, setAiResults] = useState<Map<string, any>>(new Map());
  
  // State to track dynamic post status changes during demo
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  // Faculty-specific data - For demo purposes, show all posts from the same organization
  const pendingApprovals = posts.filter(post => post.status === 'pending');
  const approvedPosts = posts.filter(post => post.status === 'approved');
  const rejectedPosts = posts.filter(post => post.status === 'rejected');

  const departments = ['NSS', 'Sports', 'Cultural', 'Technical', 'Research'];
  
  const stats = [
    { label: 'Pending Approvals', count: pendingApprovals.length, color: 'bg-yellow-500', icon: Clock },
    { label: 'Approved This Month', count: approvedPosts.length, color: 'bg-green-500', icon: CheckCircle },
    { label: 'Students in Dept', count: 156, color: 'bg-blue-500', icon: Users },
    { label: 'Total Posts', count: pendingApprovals.length + approvedPosts.length + rejectedPosts.length, color: 'bg-purple-500', icon: FileText },
  ];

  const handleApprove = (postId: string, reason?: string) => {
    console.log('Approving post:', postId, 'Reason:', reason);
    
    // Update post status to approved
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              status: 'approved' as const,
              approvedBy: {
                id: user?.id || 'faculty1',
                name: user?.name || 'Faculty Member',
                role: 'faculty' as const
              }
            }
          : post
      )
    );
  };

  const handleReject = (postId: string, reason: string) => {
    console.log('Rejecting post:', postId, 'Reason:', reason);
    
    // Update post status to rejected
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              status: 'rejected' as const,
              rejectionReason: reason,
              rejectedBy: {
                id: user?.id || 'faculty1',
                name: user?.name || 'Faculty Member',
                role: 'faculty' as const
              }
            }
          : post
      )
    );
  };

  const handleAIVerification = async (post: any) => {
    // Add post to processing set
    setAiProcessingPosts(prev => new Set([...prev, post.id]));
    
    // Remove any existing result for this post
    setAiResults(prev => {
      const newResults = new Map(prev);
      newResults.delete(post.id);
      return newResults;
    });

    try {
      // Simulate AI processing (replace with actual AI service call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI result (replace with actual AIVerificationService.verifyPost call)
      const mockResult = {
        authenticity_score: 75,
        category_match: 100,
        confidence: 80,
        auto_decision: 'review',
        reasoning: 'While the claim is plausible, the lack of specific details and supporting evidence lowers the authenticity score. The claim fits the Social Service category perfectly. Further information is needed.',
        red_flags: [
          'Lack of specific details about the organization and execution of the blood donation camp',
          'Absence of supporting evidence (attachments)'
        ],
        suggestions: [
          'Provide details about the planning process, challenges faced, and the number of volunteers involved.',
          'Attach photographs or a report of the blood donation camp as evidence.'
        ]
      };

      // Remove from processing and add result
      setAiProcessingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(post.id);
        return newSet;
      });

      setAiResults(prev => new Map([...prev, [post.id, mockResult]]));
    } catch (error) {
      console.error('AI verification failed:', error);
      setAiProcessingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(post.id);
        return newSet;
      });
    }
  };

  const handleAIDecision = (postId: string, decision: 'approved' | 'rejected', reason: string) => {
    if (decision === 'approved') {
      handleApprove(postId, reason);
    } else {
      handleReject(postId, reason);
    }
    
    // Clear the AI result for this post
    setAiResults(prev => {
      const newResults = new Map(prev);
      newResults.delete(postId);
      return newResults;
    });
  };

  const renderAIResults = (postId: string) => {
    const isProcessing = aiProcessingPosts.has(postId);
    const result = aiResults.get(postId);

    if (!isProcessing && !result) return null;

    return (
      <div className="mt-4 border-t pt-4">
        {isProcessing ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <div>
                <h4 className="font-medium text-blue-900 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  AI analyzing post...
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Our AI is examining the content for authenticity, category match, and potential issues. This usually takes a few seconds.
                </p>
              </div>
            </div>
          </div>
        ) : result ? (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                AI Verification Results
              </h4>
              <button
                onClick={() => setAiResults(prev => {
                  const newResults = new Map(prev);
                  newResults.delete(postId);
                  return newResults;
                })}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-800">Authenticity</span>
                  <span className="text-lg font-bold text-orange-600">{result.authenticity_score}%</span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Category Match</span>
                  <span className="text-lg font-bold text-green-600">{result.category_match}%</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800">AI Confidence</span>
                  <span className="text-lg font-bold text-blue-600">{result.confidence}%</span>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className={`p-3 rounded-lg mb-4 ${
              result.auto_decision === 'approve' ? 'bg-green-50 border border-green-200' :
              result.auto_decision === 'reject' ? 'bg-red-50 border border-red-200' :
              'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium">AI Recommends: </span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  result.auto_decision === 'approve' ? 'bg-green-100 text-green-800' :
                  result.auto_decision === 'reject' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {result.auto_decision.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{result.reasoning}</p>
            </div>

            {/* Issues and Suggestions */}
            {(result.red_flags?.length > 0 || result.suggestions?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {result.red_flags?.length > 0 && (
                  <div>
                    <h5 className="font-medium text-red-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Issues Detected
                    </h5>
                    <ul className="space-y-1">
                      {result.red_flags.map((flag: string, index: number) => (
                        <li key={index} className="text-sm text-red-700 flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.suggestions?.length > 0 && (
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      AI Suggestions
                    </h5>
                    <ul className="space-y-1">
                      {result.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleAIDecision(postId, 'approved', `AI recommended approval: ${result.reasoning}`)}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex-1"
              >
                <CheckCircle size={16} />
                <span>Accept AI & Approve</span>
              </button>
              <button
                onClick={() => handleAIDecision(postId, 'rejected', `AI recommended rejection: ${result.reasoning}`)}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-1"
              >
                <XCircle size={16} />
                <span>Accept AI & Reject</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const renderPostActions = (post: any) => (
    <div className="mt-4">
      {/* Manual Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => handleApprove(post.id, 'Manually approved by faculty')}
          className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex-1"
        >
          <CheckCircle size={16} />
          <span>Approve</span>
        </button>
        <button
          onClick={() => handleReject(post.id, 'Manually rejected by faculty')}
          className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-1"
        >
          <XCircle size={16} />
          <span>Reject</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Faculty Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
              <p className="text-gray-600">Department: {user?.department || 'NSS'} | GEC Bilaspur</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingApprovals.length}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'pending', label: 'Pending Approvals', count: pendingApprovals.length },
                    { id: 'approved', label: 'Approved', count: approvedPosts.length },
                    { id: 'rejected', label: 'Rejected', count: rejectedPosts.length },
                    { id: 'public', label: 'Public Posts', count: 0 },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter size={16} className="text-gray-500" />
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept.toLowerCase()}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Content */}
            <div className="space-y-4">
              {activeTab === 'pending' && pendingApprovals.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
                  {/* AI Verify Button - Top Right */}
                  <button
                    onClick={() => handleAIVerification(post)}
                    className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md text-sm"
                  >
                    <Brain className="w-4 h-4" />
                    <span>AI Verify</span>
                  </button>
                  
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 pr-20"> {/* Add right padding to avoid overlap with AI button */}
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{post.author.role}</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">
                          Pending Review
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      
                      {post.attachments && post.attachments.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {post.attachments.map((attachment, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                                📄 {attachment}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-sm text-gray-500 mb-3">
                        Department: {post.department} • Category: {post.category}
                      </div>

                      {renderPostActions(post)}
                      {renderAIResults(post.id)}
                    </div>
                  </div>
                </div>
              ))}

              {activeTab === 'approved' && approvedPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                          ✓ Approved
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-700">{post.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {activeTab === 'rejected' && rejectedPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          ✗ Rejected
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      
                      {/* Show rejection reason if available */}
                      {post.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                          <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                          <p className="text-sm text-red-700">{post.rejectionReason}</p>
                        </div>
                      )}
                      
                      {/* Show who rejected it */}
                      {post.rejectedBy && (
                        <div className="text-sm text-gray-500">
                          Rejected by {post.rejectedBy.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {(activeTab === 'pending' && pendingApprovals.length === 0) && (
                <div className="text-center py-8">
                  <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
                  <p className="text-gray-600">All caught up! No posts require your approval.</p>
                </div>
              )}

              {(activeTab === 'approved' && approvedPosts.length === 0) && (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No approved posts</h3>
                  <p className="text-gray-600">No posts have been approved yet.</p>
                </div>
              )}

              {(activeTab === 'rejected' && rejectedPosts.length === 0) && (
                <div className="text-center py-8">
                  <XCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected posts</h3>
                  <p className="text-gray-600">No posts have been rejected.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Faculty Tools */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full block text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    📋 Browse All Posts
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    📊 Generate Department Report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    👥 View Student List
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    📝 Create Announcement
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    🏆 Organize Competition
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="pb-2 border-b border-gray-100">
                    <p className="text-gray-900">Approved: Hackathon Participation</p>
                    <p className="text-gray-500">2 hours ago</p>
                  </div>
                  <div className="pb-2 border-b border-gray-100">
                    <p className="text-gray-900">Rejected: Workshop Certificate</p>
                    <p className="text-gray-500">4 hours ago</p>
                  </div>
                  <div>
                    <p className="text-gray-900">New submission received</p>
                    <p className="text-gray-500">6 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Department Students */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Top Students</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Kanhaiya', achievements: 12, avatar: '/src/assets/Profile.jpg' },
                    { name: 'Abhinav', achievements: 8, avatar: '/src/assets/abhinav.jpg' },
                    { name: 'Apoorva', achievements: 6, avatar: '/src/assets/apporva.jpg' },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.achievements} achievements</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};