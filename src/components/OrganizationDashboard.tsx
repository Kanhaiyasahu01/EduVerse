import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Users, UserPlus, Settings, Award, Plus, Search, Calendar, Building } from 'lucide-react';
import { dummyPosts, dummyOrganizations } from '../data/dummyData';
import { Link } from 'react-router-dom';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { IntegrationDashboard } from './IntegrationDashboard';
import InstitutionalAnalyticsService from '../services/InstitutionalAnalyticsService';

export const OrganizationDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  const handleGenerateNAACReport = async () => {
    try {
      const reportData = await InstitutionalAnalyticsService.generateComprehensiveReport(user?.organization || 'Your Organization');
      await InstitutionalAnalyticsService.exportReportAsPDF(reportData, 'NAAC');
    } catch (error) {
      console.error('Error generating NAAC report:', error);
    }
  };

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
    { id: 'f1', name: 'Dr. Kanhaiya Faculty', department: 'Technical', email: 'kanhaiya@gecbilaspur.edu', students: 45 },
    { id: 'f2', name: 'Prof. Abhinav Kumar', department: 'NSS', email: 'abhinav@gecbilaspur.edu', students: 78 },
    { id: 'f3', name: 'Dr. Anshu Sharma', department: 'Sports', email: 'anshu@gecbilaspur.edu', students: 32 },
    { id: 'f4', name: 'Dr. Apoorva Verma', department: 'Cultural', email: 'apoorva@gecbilaspur.edu', students: 56 },
  ];

  const students = [
    {
      id: 's1',
      name: 'Kanhaiya Lal Sahu',
      email: 'kanhaiya.sahu@gecbilaspur.edu',
      rollNumber: 'CSE2022001',
      department: 'Computer Science Engineering',
      year: '3rd Year',
      semester: 6,
      cgpa: 8.7,
      attendance: 85,
      avatar: '/assets/Profile.jpg',
      achievements: 12,
      posts: 5,
      joinedDate: '2022-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Kanhaiya Faculty'
    },
    {
      id: 's2',
      name: 'Abhinav Kumar',
      email: 'abhinav.kumar@gecbilaspur.edu',
      rollNumber: 'CSE2022002',
      department: 'Computer Science Engineering',
      year: '3rd Year',
      semester: 6,
      cgpa: 8.4,
      attendance: 88,
      avatar: '/assets/abhinav.jpg',
      achievements: 8,
      posts: 7,
      joinedDate: '2022-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Kanhaiya Faculty'
    },
    {
      id: 's3',
      name: 'Anshu Sharma',
      email: 'anshu.sharma@gecbilaspur.edu',
      rollNumber: 'CSE2022003',
      department: 'Computer Science Engineering',
      year: '3rd Year',
      semester: 6,
      cgpa: 8.9,
      attendance: 92,
      avatar: '/assets/anshu.jpg',
      achievements: 15,
      posts: 9,
      joinedDate: '2022-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Kanhaiya Faculty'
    },
    {
      id: 's4',
      name: 'Apoorva Verma',
      email: 'apoorva.verma@gecbilaspur.edu',
      rollNumber: 'CSE2022004',
      department: 'Computer Science Engineering',
      year: '3rd Year',
      semester: 6,
      cgpa: 9.1,
      attendance: 94,
      avatar: '/assets/apporva.jpg',
      achievements: 18,
      posts: 11,
      joinedDate: '2022-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Kanhaiya Faculty'
    },
    {
      id: 's5',
      name: 'Shakish Patel',
      email: 'shakish.patel@gecbilaspur.edu',
      rollNumber: 'EE2022001',
      department: 'Electrical Engineering',
      year: '3rd Year',
      semester: 6,
      cgpa: 8.2,
      attendance: 80,
      avatar: '/assets/shakish.jpg',
      achievements: 6,
      posts: 4,
      joinedDate: '2022-08-15',
      status: 'Active',
      mentorFaculty: 'Prof. Abhinav Kumar'
    },
    {
      id: 's6',
      name: 'Venkatesh Reddy',
      email: 'venkatesh.reddy@gecbilaspur.edu',
      rollNumber: 'ME2022001',
      department: 'Mechanical Engineering',
      year: '3rd Year',
      semester: 6,
      cgpa: 7.8,
      attendance: 78,
      avatar: '/assets/venk.jpg',
      achievements: 4,
      posts: 3,
      joinedDate: '2022-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Anshu Sharma'
    },
    {
      id: 's7',
      name: 'Priya Singh',
      email: 'priya.singh@gecbilaspur.edu',
      rollNumber: 'CSE2023001',
      department: 'Computer Science Engineering',
      year: '2nd Year',
      semester: 4,
      cgpa: 8.6,
      attendance: 89,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b691?w=150&h=150&fit=crop&crop=face',
      achievements: 5,
      posts: 6,
      joinedDate: '2023-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Kanhaiya Faculty'
    },
    {
      id: 's8',
      name: 'Rohit Sharma',
      email: 'rohit.sharma@gecbilaspur.edu',
      rollNumber: 'CSE2023002',
      department: 'Computer Science Engineering',
      year: '2nd Year',
      semester: 4,
      cgpa: 7.9,
      attendance: 82,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      achievements: 3,
      posts: 2,
      joinedDate: '2023-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Kanhaiya Faculty'
    },
    {
      id: 's9',
      name: 'Neha Gupta',
      email: 'neha.gupta@gecbilaspur.edu',
      rollNumber: 'EE2023001',
      department: 'Electrical Engineering',
      year: '2nd Year',
      semester: 4,
      cgpa: 8.3,
      attendance: 86,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      achievements: 7,
      posts: 4,
      joinedDate: '2023-08-15',
      status: 'Active',
      mentorFaculty: 'Prof. Abhinav Kumar'
    },
    {
      id: 's10',
      name: 'Arjun Patel',
      email: 'arjun.patel@gecbilaspur.edu',
      rollNumber: 'ME2023001',
      department: 'Mechanical Engineering',
      year: '2nd Year',
      semester: 4,
      cgpa: 7.5,
      attendance: 75,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      achievements: 2,
      posts: 1,
      joinedDate: '2023-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Anshu Sharma'
    },
    {
      id: 's11',
      name: 'Sneha Yadav',
      email: 'sneha.yadav@gecbilaspur.edu',
      rollNumber: 'CE2022001',
      department: 'Civil Engineering',
      year: '3rd Year',
      semester: 6,
      cgpa: 8.0,
      attendance: 83,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      achievements: 6,
      posts: 5,
      joinedDate: '2022-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Apoorva Verma'
    },
    {
      id: 's12',
      name: 'Vikram Singh',
      email: 'vikram.singh@gecbilaspur.edu',
      rollNumber: 'CE2023001',
      department: 'Civil Engineering',
      year: '2nd Year',
      semester: 4,
      cgpa: 7.7,
      attendance: 79,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      achievements: 1,
      posts: 2,
      joinedDate: '2023-08-15',
      status: 'Active',
      mentorFaculty: 'Dr. Apoorva Verma'
    }
  ];

  const departments = [
    {
      id: 'cse',
      name: 'Computer Science Engineering',
      code: 'CSE',
      head: 'Dr. Rajesh Kumar',
      headEmail: 'rajesh.kumar@gecbilaspur.edu',
      headPhone: '+91-9876543210',
      established: '2010',
      studentCount: 120,
      facultyCount: 8,
      totalCourses: 45,
      labs: 6,
      description: 'The Computer Science Engineering department focuses on cutting-edge technology, programming, algorithms, and software development.',
      achievements: [
        'Published 15+ research papers in 2024',
        'Won National Hackathon Championship',
        '95% placement record in top MNCs',
        'State-level coding competition winners'
      ],
      facilities: [
        'Advanced Computer Lab with 60 systems',
        'AI/ML Research Laboratory',
        'Software Development Center',
        'Project Innovation Hub',
        'High-speed Internet Connectivity',
        'Latest Programming Tools & IDEs'
      ],
      courses: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Database Management Systems',
        'Computer Networks',
        'Operating Systems',
        'Machine Learning',
        'Web Development',
        'Mobile App Development'
      ],
      avgCGPA: 8.4,
      avgAttendance: 87,
      activeProjects: 12,
      budget: '₹25,00,000'
    },
    {
      id: 'ee',
      name: 'Electrical Engineering',
      code: 'EE',
      head: 'Dr. Priya Sharma',
      headEmail: 'priya.sharma@gecbilaspur.edu',
      headPhone: '+91-9876543211',
      established: '2008',
      studentCount: 95,
      facultyCount: 6,
      totalCourses: 38,
      labs: 4,
      description: 'The Electrical Engineering department specializes in power systems, electronics, control systems, and renewable energy technologies.',
      achievements: [
        'Designed award-winning solar power system',
        'Published research on smart grid technology',
        '88% placement in electrical companies',
        'Won state-level robotics competition'
      ],
      facilities: [
        'Power Systems Laboratory',
        'Electronics & Communication Lab',
        'Control Systems Lab',
        'Renewable Energy Research Center',
        'High Voltage Testing Lab',
        'Microprocessor & Embedded Systems Lab'
      ],
      courses: [
        'Circuit Analysis',
        'Power Systems',
        'Control Systems',
        'Digital Electronics',
        'Microprocessors',
        'Renewable Energy Systems',
        'Electrical Machines',
        'Power Electronics'
      ],
      avgCGPA: 8.1,
      avgAttendance: 84,
      activeProjects: 8,
      budget: '₹20,00,000'
    },
    {
      id: 'me',
      name: 'Mechanical Engineering',
      code: 'ME',
      head: 'Dr. Amit Singh',
      headEmail: 'amit.singh@gecbilaspur.edu',
      headPhone: '+91-9876543212',
      established: '2009',
      studentCount: 85,
      facultyCount: 5,
      totalCourses: 35,
      labs: 5,
      description: 'The Mechanical Engineering department covers thermodynamics, manufacturing, design, robotics, and automotive engineering.',
      achievements: [
        'Developed innovative manufacturing processes',
        'Won national design competition',
        '82% placement in automotive industry',
        'Published papers on sustainable manufacturing'
      ],
      facilities: [
        'Manufacturing Technology Lab',
        'Thermodynamics Laboratory',
        'CAD/CAM Design Center',
        'Materials Testing Lab',
        'Robotics & Automation Lab',
        '3D Printing & Prototyping Center'
      ],
      courses: [
        'Thermodynamics',
        'Manufacturing Processes',
        'Machine Design',
        'Fluid Mechanics',
        'Heat Transfer',
        'Robotics',
        'Automotive Engineering',
        'CAD/CAM'
      ],
      avgCGPA: 7.9,
      avgAttendance: 81,
      activeProjects: 6,
      budget: '₹18,00,000'
    },
    {
      id: 'ce',
      name: 'Civil Engineering',
      code: 'CE',
      head: 'Dr. Sunita Patel',
      headEmail: 'sunita.patel@gecbilaspur.edu',
      headPhone: '+91-9876543213',
      established: '2007',
      studentCount: 75,
      facultyCount: 4,
      totalCourses: 32,
      labs: 3,
      description: 'The Civil Engineering department focuses on construction, infrastructure development, environmental engineering, and sustainable building practices.',
      achievements: [
        'Designed eco-friendly building structures',
        'Research on earthquake-resistant construction',
        '78% placement in construction companies',
        'Won state-level infrastructure design award'
      ],
      facilities: [
        'Concrete Technology Lab',
        'Soil Mechanics Laboratory',
        'Environmental Engineering Lab',
        'Surveying Equipment Center',
        'Structural Analysis Lab',
        'Construction Materials Testing Lab'
      ],
      courses: [
        'Structural Analysis',
        'Concrete Technology',
        'Soil Mechanics',
        'Environmental Engineering',
        'Transportation Engineering',
        'Construction Management',
        'Building Planning',
        'Surveying'
      ],
      avgCGPA: 7.8,
      avgAttendance: 80,
      activeProjects: 4,
      budget: '₹15,00,000'
    },
    {
      id: 'nss',
      name: 'National Service Scheme',
      code: 'NSS',
      head: 'Dr. Meera Gupta',
      headEmail: 'meera.gupta@gecbilaspur.edu',
      headPhone: '+91-9876543214',
      established: '2010',
      studentCount: 200,
      facultyCount: 3,
      totalCourses: 0,
      labs: 0,
      description: 'NSS promotes community service, social awareness, and personality development through various outreach programs and volunteering activities.',
      achievements: [
        'Organized 50+ community service camps',
        'Planted 5,000+ trees in rural areas',
        'Conducted health awareness programs',
        'Blood donation drives with 1000+ donors'
      ],
      facilities: [
        'Community Service Center',
        'Event Management Hall',
        'Resource Documentation Center',
        'Volunteer Training Room',
        'First Aid & Health Care Unit',
        'Environmental Awareness Center'
      ],
      courses: [
        'Community Development',
        'Social Awareness Programs',
        'Environmental Conservation',
        'Health & Hygiene Education',
        'Rural Development',
        'Leadership Training'
      ],
      avgCGPA: 0,
      avgAttendance: 0,
      activeProjects: 15,
      budget: '₹8,00,000'
    },
    {
      id: 'sports',
      name: 'Sports Department',
      code: 'SPORTS',
      head: 'Coach Vikram Yadav',
      headEmail: 'vikram.yadav@gecbilaspur.edu',
      headPhone: '+91-9876543215',
      established: '2008',
      studentCount: 150,
      facultyCount: 2,
      totalCourses: 0,
      labs: 0,
      description: 'The Sports Department promotes physical fitness, sportsmanship, and competitive spirit through various indoor and outdoor sports activities.',
      achievements: [
        'Won inter-college basketball championship',
        'State-level athletics medal winners',
        'Regional cricket tournament champions',
        'Produced 5 state-level players'
      ],
      facilities: [
        'Multi-purpose Sports Complex',
        'Basketball & Volleyball Courts',
        'Cricket Ground with Pavilion',
        'Indoor Badminton Courts',
        'Gymnasium with Modern Equipment',
        'Swimming Pool (Under Construction)'
      ],
      courses: [
        'Physical Fitness Training',
        'Team Sports Coaching',
        'Individual Sports Training',
        'Sports Psychology',
        'Nutrition & Health',
        'Sports Management'
      ],
      avgCGPA: 0,
      avgAttendance: 0,
      activeProjects: 8,
      budget: '₹12,00,000'
    }
  ];

  const recentActivities = [
    { type: 'new_student', message: 'New student registration: Kanhaiya', time: '2 hours ago' },
    { type: 'faculty_approval', message: 'Dr. Kanhaiya approved 3 technical posts', time: '4 hours ago' },
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
                { id: 'integrations', label: 'Integrations' },
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

            {activeTab === 'departments' && (
              <div className="space-y-6">
                {/* Department Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{departments.length}</div>
                      <div className="text-sm text-gray-600">Total Departments</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {departments.reduce((acc, dept) => acc + dept.studentCount, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {departments.reduce((acc, dept) => acc + dept.facultyCount, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Faculty</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {departments.reduce((acc, dept) => acc + dept.labs, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Labs</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {departments.reduce((acc, dept) => acc + dept.activeProjects, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Active Projects</div>
                    </div>
                  </div>
                </div>

                {/* Department Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {departments.map((department) => (
                    <div key={department.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      {/* Department Header */}
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold">{department.name}</h3>
                            <p className="text-blue-100 mt-1">Established: {department.established}</p>
                          </div>
                          <div className="text-right">
                            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                              <span className="font-bold">{department.code}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Department Stats */}
                      <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{department.studentCount}</div>
                            <div className="text-xs text-gray-600">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{department.facultyCount}</div>
                            <div className="text-xs text-gray-600">Faculty</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{department.labs}</div>
                            <div className="text-xs text-gray-600">Labs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-600">{department.activeProjects}</div>
                            <div className="text-xs text-gray-600">Projects</div>
                          </div>
                        </div>

                        {/* Department Head Info */}
                        <div className="border-t border-gray-200 pt-4 mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Department Head</h4>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <Users size={16} className="text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{department.head}</div>
                              <div className="text-sm text-gray-500">{department.headEmail}</div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-700">{department.description}</p>
                        </div>

                        {/* Performance Metrics (for academic departments) */}
                        {department.avgCGPA > 0 && (
                          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{department.avgCGPA}</div>
                              <div className="text-xs text-gray-600">Avg CGPA</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">{department.avgAttendance}%</div>
                              <div className="text-xs text-gray-600">Avg Attendance</div>
                            </div>
                          </div>
                        )}

                        {/* Key Achievements */}
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Key Achievements</h5>
                          <div className="space-y-1">
                            {department.achievements.slice(0, 3).map((achievement, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Award size={12} className="text-yellow-500 mt-1 flex-shrink-0" />
                                <span className="text-xs text-gray-700">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Budget */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-sm font-medium text-gray-900">Annual Budget</span>
                          <span className="text-sm font-bold text-green-600">{department.budget}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 mt-4">
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                          <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Department Facilities Overview */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.slice(0, 4).map((department) => (
                      <div key={department.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">{department.code} - Facilities</h4>
                        <div className="space-y-2">
                          {department.facilities.slice(0, 4).map((facility, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{facility}</span>
                            </div>
                          ))}
                          {department.facilities.length > 4 && (
                            <div className="text-xs text-gray-500 mt-2">
                              +{department.facilities.length - 4} more facilities
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Distribution */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution by Department</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {departments.filter(dept => dept.totalCourses > 0).map((department) => (
                      <div key={department.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4">
                        <div className="text-center mb-3">
                          <div className="text-xl font-bold text-indigo-600">{department.totalCourses}</div>
                          <div className="text-sm text-gray-600">{department.code} Courses</div>
                        </div>
                        <div className="space-y-1">
                          {department.courses.slice(0, 3).map((course, index) => (
                            <div key={index} className="text-xs text-gray-700 bg-white bg-opacity-60 rounded px-2 py-1">
                              {course}
                            </div>
                          ))}
                          {department.courses.length > 3 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{department.courses.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                {/* Students Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{students.length}</div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {(students.reduce((acc, student) => acc + student.cgpa, 0) / students.length).toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">Average CGPA</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(students.reduce((acc, student) => acc + student.attendance, 0) / students.length)}%
                      </div>
                      <div className="text-sm text-gray-600">Avg Attendance</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {students.reduce((acc, student) => acc + student.achievements, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Achievements</div>
                    </div>
                  </div>
                </div>

                {/* Student Management */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Student Management</h3>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        <UserPlus size={16} className="inline mr-1" />
                        Add New Student
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div className="flex-1 w-full relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search students..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">All Departments</option>
                        <option value="cse">Computer Science Engineering</option>
                        <option value="ee">Electrical Engineering</option>
                        <option value="me">Mechanical Engineering</option>
                        <option value="ce">Civil Engineering</option>
                      </select>
                      <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">All Years</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Year</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">CGPA</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Attendance</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Achievements</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={student.avatar}
                                    alt={student.name}
                                    className="w-10 h-10 rounded-full"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900">{student.name}</div>
                                    <div className="text-sm text-gray-500">{student.rollNumber}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-900">{student.department}</td>
                              <td className="py-4 px-4 text-sm text-gray-900">{student.year}</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  student.cgpa >= 9 ? 'bg-green-100 text-green-800' :
                                  student.cgpa >= 8 ? 'bg-blue-100 text-blue-800' :
                                  student.cgpa >= 7 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {student.cgpa}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  student.attendance >= 90 ? 'bg-green-100 text-green-800' :
                                  student.attendance >= 80 ? 'bg-blue-100 text-blue-800' :
                                  student.attendance >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {student.attendance}%
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-1">
                                  <Award size={14} className="text-yellow-500" />
                                  <span className="text-sm font-medium text-gray-900">{student.achievements}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  {student.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    View
                                  </button>
                                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                                    Edit
                                  </button>
                                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                    Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Department-wise Student Distribution */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Student Distribution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Computer Science Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'].map((dept) => {
                      const deptStudents = students.filter(student => student.department === dept);
                      const avgCGPA = deptStudents.length > 0 
                        ? (deptStudents.reduce((acc, student) => acc + student.cgpa, 0) / deptStudents.length).toFixed(1)
                        : '0.0';
                      return (
                        <div key={dept} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{deptStudents.length}</div>
                            <div className="text-sm text-gray-600 mb-2">{dept.replace(' Engineering', '')}</div>
                            <div className="text-xs text-gray-500">Avg CGPA: {avgCGPA}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Performing Students */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Students</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {students
                      .sort((a, b) => b.cgpa - a.cgpa)
                      .slice(0, 6)
                      .map((student, index) => (
                        <div key={student.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-12 h-12 rounded-full"
                              />
                              {index < 3 && (
                                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                                }`}>
                                  {index + 1}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.department.replace(' Engineering', '')}</div>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm font-medium text-blue-600">CGPA: {student.cgpa}</span>
                                <span className="text-sm text-orange-600">🏆 {student.achievements}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard organizationName={user?.organization || 'Your Organization'} />
            )}

            {activeTab === 'integrations' && (
              <IntegrationDashboard organizationName={user?.organization || 'GEC Bilaspur'} />
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
                  <button 
                    onClick={handleGenerateNAACReport}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
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
                  <button 
                    onClick={() => setActiveTab('integrations')}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    🔗 Manage Integrations
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    🏫 Sync GEC Bilaspur ERP
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