import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  FileText,
  GraduationCap,
  Settings,
  Edit3,
  UserPlus,
  BarChart3
} from 'lucide-react';
import type { OrganizationProfile as OrganizationProfileType } from '../types';

// Mock organization profile data
const mockOrganizationProfile: OrganizationProfileType = {
  id: '3',
  name: 'GEC Bilaspur',
  email: 'org@demo.com',
  logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&h=150&fit=crop',
  description: 'Government Engineering College Bilaspur is a premier technical institution committed to excellence in engineering education, research, and innovation. Established in 1986, we have been nurturing engineers who contribute to nation-building.',
  establishedYear: '1986',
  location: 'Bilaspur, Chhattisgarh, India',
  website: 'https://gecbilaspur.ac.in',
  phone: '+91 7752-260832',
  accreditation: ['NAAC A+ Grade', 'NBA Accredited', 'AICTE Approved'],
  departments: [
    'Computer Science & Engineering',
    'Mechanical Engineering', 
    'Electrical Engineering',
    'Civil Engineering',
    'Electronics & Communication',
    'Information Technology',
    'NSS',
    'Sports',
    'Cultural Activities'
  ],
  facultyCount: 120,
  studentCount: 2400,
  totalPosts: 450,
  totalEvents: 89,
  achievements: [
    {
      id: '1',
      title: 'NAAC A+ Grade Accreditation',
      description: 'Achieved highest NAAC grading for academic excellence',
      category: 'Accreditation',
      date: '2023-08-15',
      verifiedBy: 'NAAC'
    },
    {
      id: '2',
      title: 'Best Engineering College Award 2023',
      description: 'Recognized as the best engineering college in Chhattisgarh',
      category: 'Award',
      date: '2023-12-01',
      verifiedBy: 'State Government'
    },
    {
      id: '3',
      title: 'NIRF Ranking 150-200',
      description: 'Featured in NIRF ranking 2024 in engineering category',
      category: 'Ranking',
      date: '2024-01-10',
      verifiedBy: 'NIRF'
    }
  ],
  joinedAt: '2022-01-01'
};

// Mock analytics data
const mockAnalytics = {
  monthlyGrowth: {
    students: 12,
    posts: 45,
    events: 8,
    achievements: 15
  },
  departmentStats: [
    { name: 'Computer Science', students: 480, posts: 89, events: 15 },
    { name: 'Mechanical', students: 420, posts: 67, events: 12 },
    { name: 'Electrical', students: 380, posts: 56, events: 10 },
    { name: 'Civil', students: 350, posts: 45, events: 8 },
    { name: 'NSS', students: 200, posts: 120, events: 25 },
    { name: 'Sports', students: 150, posts: 73, events: 19 }
  ],
  recentActivities: [
    { type: 'Post Approved', description: 'National Hackathon Winner announcement', time: '2 hours ago' },
    { type: 'New Faculty', description: 'Dr. John Smith joined Computer Science', time: '1 day ago' },
    { type: 'Event Created', description: 'Annual Tech Fest 2024 announced', time: '2 days ago' },
    { type: 'Achievement', description: 'Student won state-level competition', time: '3 days ago' }
  ]
};

const OrganizationProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const profile = mockOrganizationProfile;
  const analytics = mockAnalytics;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'departments', label: 'Departments', icon: GraduationCap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* About Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">About</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        </div>
        {isEditing ? (
          <textarea
            className="w-full p-3 border rounded-lg resize-none"
            rows={4}
            defaultValue={profile.description}
          />
        ) : (
          <p className="text-gray-700">{profile.description}</p>
        )}
      </div>

      {/* Institution Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Institution Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Established</span>
            <p className="font-medium">{profile.establishedYear}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Location</span>
            <p className="font-medium">{profile.location}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Website</span>
            {profile.website && (
              <a
                href={profile.website}
                className="font-medium text-blue-600 hover:text-blue-800 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
          </div>
          <div>
            <span className="text-sm text-gray-500">Phone</span>
            <p className="font-medium">{profile.phone}</p>
          </div>
        </div>
      </div>

      {/* Accreditations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accreditations</h3>
        <div className="flex flex-wrap gap-2">
          {profile.accreditation.map((accred, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {accred}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {analytics.recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.type}</p>
                <p className="text-gray-600 text-sm">{activity.description}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profile.departments.map((department, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{department}</h4>
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Students:</span>
                <span className="font-medium">
                  {analytics.departmentStats.find(d => d.name.includes(department.split(' ')[0]))?.students || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Posts:</span>
                <span className="font-medium">
                  {analytics.departmentStats.find(d => d.name.includes(department.split(' ')[0]))?.posts || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Events:</span>
                <span className="font-medium">
                  {analytics.departmentStats.find(d => d.name.includes(department.split(' ')[0]))?.events || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <UserPlus className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">+{analytics.monthlyGrowth.students}</p>
              <p className="text-gray-600">New Students</p>
              <p className="text-green-600 text-sm">This month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">+{analytics.monthlyGrowth.posts}</p>
              <p className="text-gray-600">New Posts</p>
              <p className="text-blue-600 text-sm">This month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">+{analytics.monthlyGrowth.events}</p>
              <p className="text-gray-600">Events</p>
              <p className="text-purple-600 text-sm">This month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">+{analytics.monthlyGrowth.achievements}</p>
              <p className="text-gray-600">Achievements</p>
              <p className="text-orange-600 text-sm">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
        <div className="space-y-4">
          {analytics.departmentStats.map((dept, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{dept.name}</h4>
                <div className="flex space-x-6 text-sm text-gray-600 mt-1">
                  <span>{dept.students} students</span>
                  <span>{dept.posts} posts</span>
                  <span>{dept.events} events</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((dept.posts / 120) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      {profile.achievements.map((achievement) => (
        <div key={achievement.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                {achievement.title}
              </h4>
              <p className="text-gray-700 mb-3">{achievement.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(achievement.date).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {achievement.category}
                </span>
                {achievement.verifiedBy && (
                  <span className="text-green-600">
                    Verified by {achievement.verifiedBy}
                  </span>
                )}
              </div>
            </div>
            <Award className="h-6 w-6 text-yellow-500 flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-green-600 to-blue-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-10 mb-4">
              <img
                src={profile.logo}
                alt={profile.name}
                className="w-32 h-32 rounded-lg border-4 border-white shadow-lg object-cover"
              />
              <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-lg text-gray-600">Educational Institution</p>
                <p className="text-gray-500">Established {profile.establishedYear}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {profile.email}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {profile.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {profile.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Joined {new Date(profile.joinedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{profile.studentCount}</p>
                <p className="text-gray-600">Students</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{profile.facultyCount}</p>
                <p className="text-gray-600">Faculty</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{profile.totalPosts}</p>
                <p className="text-gray-600">Posts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{profile.totalEvents}</p>
                <p className="text-gray-600">Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'departments' && renderDepartments()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'achievements' && renderAchievements()}
            {activeTab === 'settings' && (
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-500">Organization settings coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
