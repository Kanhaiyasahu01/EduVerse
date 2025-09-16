import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle,
  Clock,
  Settings,
  Edit3,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  FileText,
  TrendingUp
} from 'lucide-react';
import type { FacultyProfile as FacultyProfileType, Post } from '../types';

// Mock faculty profile data
const mockFacultyProfile: FacultyProfileType = {
  id: '2',
  name: 'Dr. Abhinav Faculty',
  email: 'faculty@demo.com',
  avatar: '/src/assets/abhinav.jpg',
  bio: 'Professor of Computer Science with 15+ years of experience in Machine Learning and Data Science. Passionate about research and mentoring students.',
  organization: 'GEC Bilaspur',
  department: 'NSS',
  designation: 'Associate Professor',
  qualifications: ['Ph.D. Computer Science', 'M.Tech. Information Technology', 'B.Tech. Computer Engineering'],
  experience: '15 years',
  phone: '+91 9876543210',
  linkedin: 'https://linkedin.com/in/drsarahfaculty',
  researchAreas: ['Machine Learning', 'Data Science', 'Artificial Intelligence', 'Computer Vision'],
  publications: [
    {
      id: '1',
      title: 'Deep Learning Approaches for Educational Data Mining',
      journal: 'IEEE Transactions on Learning Technologies',
      year: '2023',
      authors: ['Dr. Sarah Faculty', 'Dr. John Smith', 'Dr. Emily Davis'],
      doi: '10.1109/TLT.2023.1234567',
      category: 'Research Paper'
    },
    {
      id: '2',
      title: 'AI-Powered Student Performance Prediction System',
      journal: 'International Conference on Educational Technology',
      year: '2022',
      authors: ['Dr. Sarah Faculty', 'Dr. Michael Brown'],
      category: 'Conference'
    }
  ],
  approvedPosts: [],
  pendingReviews: [],
  joinedAt: '2020-08-15'
};

// Mock posts data for faculty dashboard
const mockFacultyPosts: Post[] = [
  {
    id: 'f1',
    title: 'Research Methodology Workshop Conducted',
    content: 'Successfully conducted a 3-day workshop on research methodology for final year students.',
    author: {
      id: '2',
      name: 'Dr. Abhinav Faculty',
      avatar: '/src/assets/abhinav.jpg',
      role: 'faculty',
      organization: 'GEC Bilaspur'
    },
    category: 'Workshop',
    department: 'NSS',
    visibility: 'public',
    status: 'approved',
    images: ['workshop1.jpg', 'workshop2.jpg'],
    likes: 45,
    comments: 12,
    createdAt: '2024-01-15',
    approvedBy: {
      id: '3',
      name: 'GEC Bilaspur',
      role: 'organization'
    }
  }
];

const FacultyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const profile = mockFacultyProfile;
  const posts = mockFacultyPosts;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'reviews', label: 'Review Queue', icon: CheckCircle },
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
            defaultValue={profile.bio}
          />
        ) : (
          <p className="text-gray-700">{profile.bio}</p>
        )}
      </div>

      {/* Professional Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Department</span>
            <p className="font-medium">{profile.department}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Designation</span>
            <p className="font-medium">{profile.designation}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Experience</span>
            <p className="font-medium">{profile.experience}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Organization</span>
            <p className="font-medium">{profile.organization}</p>
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications</h3>
        <div className="space-y-2">
          {profile.qualifications.map((qualification, index) => (
            <div key={index} className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <span>{qualification}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Research Areas */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Areas</h3>
        <div className="flex flex-wrap gap-2">
          {profile.researchAreas.map((area, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPublications = () => (
    <div className="space-y-4">
      {profile.publications.map((publication) => (
        <div key={publication.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                {publication.title}
              </h4>
              <p className="text-gray-600 mb-2">{publication.journal}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <span>{publication.year}</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {publication.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Authors: {publication.authors.join(', ')}
              </p>
              {publication.doi && (
                <div className="mt-2">
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DOI: {publication.doi}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                {post.title}
              </h4>
              <p className="text-gray-700 mb-3">{post.content}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  {post.likes} likes
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {post.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Reviews</h3>
          <p className="text-gray-500">All student posts have been reviewed.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-lg text-gray-600">{profile.designation}</p>
                <p className="text-gray-500">{profile.organization}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {profile.email}
              </div>
              {profile.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {profile.phone}
                </div>
              )}
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
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{profile.publications.length}</p>
                <p className="text-gray-600">Publications</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                <p className="text-gray-600">Posts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600">Pending Reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{profile.experience}</p>
                <p className="text-gray-600">Experience</p>
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
            {activeTab === 'publications' && renderPublications()}
            {activeTab === 'posts' && renderPosts()}
            {activeTab === 'reviews' && renderReviews()}
            {activeTab === 'settings' && (
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-500">Profile settings coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
