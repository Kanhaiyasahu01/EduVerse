import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Users, UserPlus, Settings, Award, Plus, Search, Calendar, Building } from 'lucide-react';
import { dummyPosts, dummyOrganizations } from '../data/dummyData';
import { Link } from 'react-router-dom';

export const OrganizationDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Organization-specific data
  const organizationPosts = dummyPosts.filter(post => post.author.organization === user?.organization);
  // const approvedPosts = organizationPosts.filter(post => post.status === 'approved');
  const pendingPosts = organizationPosts.filter(post => post.status === 'pending');
  const organization = dummyOrganizations.find(org => org.name === user?.organization);

  const stats = [
    { label: 'Total Students', count: organization?.studentCount || 0, color: 'bg-blue-500', icon: Users },
    { label: 'Faculty Members', count: organization?.facultyCount || 0, color: 'bg-green-500', icon: UserPlus },
    { label: 'Total Posts', count: organizationPosts.length, color: 'bg-purple-500', icon: Award },
    { label: 'Pending Approvals', count: pendingPosts.length, color: 'bg-yellow-500', icon: Calendar },
  ];

  const facultyMembers = [
    { id: 'f1', name: 'Dr. Sarah Faculty', department: 'Technical', email: 'sarah@gecbilaspur.edu', students: 45 },
    { id: 'f2', name: 'Prof. Rajesh Kumar', department: 'NSS', email: 'rajesh@gecbilaspur.edu', students: 78 },
    { id: 'f3', name: 'Dr. Priya Sharma', department: 'Sports', email: 'priya@gecbilaspur.edu', students: 32 },
    { id: 'f4', name: 'Dr. Amit Verma', department: 'Cultural', email: 'amit@gecbilaspur.edu', students: 56 },
  ];

  const recentActivities = [
    { type: 'new_student', message: 'New student registration: Rahul Sharma', time: '2 hours ago' },
    { type: 'faculty_approval', message: 'Dr. Sarah approved 3 technical posts', time: '4 hours ago' },
    { type: 'event_created', message: 'New event: Annual Tech Fest 2024', time: '1 day ago' },
    { type: 'achievement', message: 'Sports team won inter-college championship', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Organization Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={organization?.logo}
                alt={organization?.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{organization?.name}</h1>
                <p className="text-gray-600">{organization?.description}</p>
                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                  <span>{organization?.studentCount} Students</span>
                  <span>•</span>
                  <span>{organization?.facultyCount} Faculty</span>
                  <span>•</span>
                  <span>{organization?.categories.length} Departments</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Plus size={16} className="inline mr-1" />
                Add Faculty
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings size={20} />
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

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'students', label: 'Students' },
                { id: 'faculty', label: 'Faculty Management' },
                { id: 'departments', label: 'Departments' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'settings', label: 'Settings' },
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
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Performance */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                  <div className="space-y-4">
                    {organization?.categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{category}</h4>
                            <p className="text-sm text-gray-500">Active department</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {Math.floor(Math.random() * 50) + 20} students
                          </p>
                          <p className="text-xs text-gray-500">
                            {Math.floor(Math.random() * 20) + 5} achievements
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faculty' && (
              <div className="space-y-6">
                {/* Faculty Management */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Faculty Management</h3>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        <UserPlus size={16} className="inline mr-1" />
                        Add New Faculty
                      </button>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search faculty..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">All Departments</option>
                        {organization?.categories.map(cat => (
                          <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {facultyMembers.map((faculty) => (
                        <div key={faculty.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <Users size={20} className="text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{faculty.name}</h4>
                              <p className="text-sm text-gray-500">{faculty.email}</p>
                              <p className="text-sm text-gray-500">Department: {faculty.department}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{faculty.students} Students</p>
                            <div className="flex space-x-2 mt-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Student Engagement</h4>
                      <p className="text-2xl font-bold text-blue-700">85%</p>
                      <p className="text-sm text-blue-600">Active participation rate</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Achievement Rate</h4>
                      <p className="text-2xl font-bold text-green-700">92%</p>
                      <p className="text-sm text-green-600">Posts approved this month</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Department Growth</h4>
                      <p className="text-2xl font-bold text-purple-700">+12%</p>
                      <p className="text-sm text-purple-600">New registrations</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-2">Event Participation</h4>
                      <p className="text-2xl font-bold text-orange-700">78%</p>
                      <p className="text-sm text-orange-600">Average attendance</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/posts" className="w-full block text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    📋 Browse All Posts
                  </Link>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    📊 Generate NAAC Report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    👥 Bulk Student Import
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    🏆 Create Competition
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    📧 Send Announcements
                  </button>
                </div>
              </div>

              {/* Pending Requests */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Pending Requests</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-900">Student Join Requests</p>
                    <p className="text-xs text-yellow-700">5 students waiting for approval</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Faculty Applications</p>
                    <p className="text-xs text-blue-700">2 applications pending review</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Event Proposals</p>
                    <p className="text-xs text-green-700">3 events awaiting approval</p>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">●  Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Storage</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">●  75% Used</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Status</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">●  Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};