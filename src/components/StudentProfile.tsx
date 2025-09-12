import React, { useState } from 'react';
import { User, Edit3, Mail, Phone, Calendar, BookOpen, Award, Briefcase, Code, ExternalLink, Github, Linkedin, Plus, Eye, ThumbsUp, MessageCircle, Download, Search, Share2, FileText, Link } from 'lucide-react';
import type { StudentProfile as IStudentProfile, Post } from '../types';

// Mock data for current student
// Mock data for student dashboard
const mockDashboardData = {
  academicPerformance: {
    cgpa: 8.7,
    currentSemester: 6,
    attendance: 85,
    subjects: [
      { name: 'Data Structures', grade: 'A', attendance: 90 },
      { name: 'Operating Systems', grade: 'A+', attendance: 88 },
      { name: 'Computer Networks', grade: 'B+', attendance: 82 },
    ]
  },
  semesterWiseResults: [
    {
      semester: 1,
      percentage: 85.6,
      sgpa: 8.8,
      attendance: 92,
      marksheetUrl: '/marksheets/sem1.pdf',
      uploadDate: '2023-01-15',
      subjects: [
        { name: 'Engineering Mathematics-I', grade: 'A', percentage: 88 },
        { name: 'Physics', grade: 'A+', percentage: 92 },
        { name: 'Basic Electronics', grade: 'B+', percentage: 82 },
        { name: 'Programming Fundamentals', grade: 'A', percentage: 87 },
      ]
    },
    {
      semester: 2,
      percentage: 87.2,
      sgpa: 9.0,
      attendance: 89,
      marksheetUrl: '/marksheets/sem2.pdf',
      uploadDate: '2023-06-20',
      subjects: [
        { name: 'Engineering Mathematics-II', grade: 'A+', percentage: 91 },
        { name: 'Chemistry', grade: 'A', percentage: 86 },
        { name: 'Digital Electronics', grade: 'A', percentage: 88 },
        { name: 'Object Oriented Programming', grade: 'A+', percentage: 90 },
      ]
    },
    {
      semester: 3,
      percentage: 86.5,
      sgpa: 8.9,
      attendance: 88,
      marksheetUrl: '/marksheets/sem3.pdf',
      uploadDate: '2024-01-10',
      subjects: [
        { name: 'Data Structures', grade: 'A', percentage: 87 },
        { name: 'Computer Organization', grade: 'A+', percentage: 89 },
        { name: 'Database Systems', grade: 'A', percentage: 86 },
        { name: 'Operating Systems', grade: 'B+', percentage: 84 },
      ]
    },
    {
      semester: 4,
      percentage: 88.1,
      sgpa: 9.1,
      attendance: 91,
      marksheetUrl: '/marksheets/sem4.pdf',
      uploadDate: '2024-06-25',
      subjects: [
        { name: 'Computer Networks', grade: 'A+', percentage: 92 },
        { name: 'Software Engineering', grade: 'A', percentage: 88 },
        { name: 'Web Technologies', grade: 'A', percentage: 87 },
        { name: 'Artificial Intelligence', grade: 'A+', percentage: 90 },
      ]
    }
  ],
  creditBasedActivities: [
    { 
      name: 'Open Source Contribution',
      credits: 2,
      status: 'Completed',
      date: '2024-08-15'
    },
    {
      name: 'Technical Workshop',
      credits: 1,
      status: 'In Progress',
      date: '2024-09-01'
    },
    {
      name: 'Research Paper',
      credits: 3,
      status: 'Pending',
      date: '2024-10-01'
    }
  ],
  upcomingDeadlines: [
    {
      title: 'Assignment Submission',
      subject: 'Computer Networks',
      dueDate: '2024-09-10'
    },
    {
      title: 'Project Presentation',
      subject: 'Operating Systems',
      dueDate: '2024-09-15'
    }
  ]
};

const mockPortfolioData = {
  generatedPortfolios: [
    {
      id: 'p1',
      type: 'Complete Portfolio',
      format: 'PDF',
      generatedAt: '2024-08-15T10:30:00Z',
      url: '/portfolios/complete-portfolio.pdf',
      shareableLink: 'https://eduverse.com/portfolio/rahul-sharma/complete',
      downloads: 15,
      views: 45
    },
    {
      id: 'p2',
      type: 'Academic Achievements',
      format: 'PDF',
      generatedAt: '2024-08-10T14:20:00Z',
      url: '/portfolios/academic-portfolio.pdf',
      shareableLink: 'https://eduverse.com/portfolio/rahul-sharma/academic',
      downloads: 8,
      views: 25
    },
    {
      id: 'p3',
      type: 'Technical Projects',
      format: 'PDF',
      generatedAt: '2024-08-05T09:15:00Z',
      url: '/portfolios/technical-portfolio.pdf',
      shareableLink: 'https://eduverse.com/portfolio/rahul-sharma/technical',
      downloads: 12,
      views: 30
    }
  ],
  templateOptions: [
    { id: 't1', name: 'Complete Portfolio', description: 'Includes all achievements, projects, and experiences' },
    { id: 't2', name: 'Academic Focus', description: 'Highlights academic achievements and certifications' },
    { id: 't3', name: 'Technical Projects', description: 'Showcases technical projects and skills' },
    { id: 't4', name: 'Leadership & Activities', description: 'Emphasizes leadership roles and extracurricular activities' }
  ]
};

const mockStudentProfile: IStudentProfile = {
  id: 's1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@gecbilaspur.edu',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  bio: 'Passionate Computer Science student interested in AI/ML, Full-Stack Development, and Open Source contributions. Always eager to learn new technologies and solve real-world problems.',
  organization: 'GEC Bilaspur',
  course: 'B.Tech Computer Science Engineering',
  year: '3rd Year',
  rollNumber: 'CSE2022001',
  phone: '+91-9876543210',
  linkedin: 'linkedin.com/in/rahulsharma-dev',
  github: 'github.com/rahul-dev',
  portfolio: 'rahulsharma.dev',
  skills: [
    { id: '1', name: 'React.js', level: 'Advanced', endorsements: 15 },
    { id: '2', name: 'Node.js', level: 'Intermediate', endorsements: 12 },
    { id: '3', name: 'Python', level: 'Advanced', endorsements: 18 },
    { id: '4', name: 'Machine Learning', level: 'Intermediate', endorsements: 8 },
    { id: '5', name: 'MongoDB', level: 'Intermediate', endorsements: 10 },
    { id: '6', name: 'AWS', level: 'Beginner', endorsements: 5 }
  ],
  projects: [
    {
      id: '1',
      title: 'AI-Powered Agriculture Solution',
      description: 'Developed an AI-powered solution for sustainable agriculture that helps farmers optimize crop yield using machine learning algorithms and IoT sensors.',
      technologies: ['Python', 'TensorFlow', 'IoT', 'React', 'Express.js'],
      startDate: '2023-10-01',
      endDate: '2024-01-15',
      status: 'Completed',
      githubUrl: 'https://github.com/rahul-dev/agriculture-ai',
      images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop']
    },
    {
      id: '2',
      title: 'EduVerse Platform',
      description: 'A comprehensive student activity management platform for higher education institutions.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      startDate: '2024-01-01',
      status: 'In Progress',
      githubUrl: 'https://github.com/rahul-dev/eduverse',
      liveUrl: 'https://eduverse-demo.com'
    }
  ],
  experiences: [
    {
      id: '1',
      title: 'Software Development Intern',
      company: 'Tech Solutions Pvt Ltd',
      type: 'Internship',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      description: 'Worked on developing web applications using React and Node.js. Contributed to improving system performance by 30%.',
      skills: ['React', 'Node.js', 'MongoDB', 'Git']
    },
    {
      id: '2',
      title: 'NSS Volunteer',
      company: 'National Service Scheme',
      type: 'Volunteer',
      startDate: '2022-07-01',
      description: 'Organized community service activities including blood donation camps, cleanliness drives, and educational workshops for underprivileged children.',
      skills: ['Leadership', 'Community Service', 'Event Management']
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'National Hackathon Winner',
      description: 'First prize in National Hackathon 2024 for AI-Agriculture solution',
      category: 'Technical',
      date: '2024-01-15',
      certificate: 'hackathon_certificate.pdf',
      verifiedBy: 'Tech India Foundation'
    },
    {
      id: '2',
      title: 'AWS Cloud Practitioner',
      description: 'AWS Certified Cloud Practitioner with score 890/1000',
      category: 'Certification',
      date: '2023-12-10',
      certificate: 'aws_certificate.pdf',
      verifiedBy: 'Amazon Web Services'
    }
  ],
  posts: [], // Will be populated from main posts data
  joinedAt: '2022-07-01'
};

// Mock posts data (filtered for current student)
const mockStudentPosts: Post[] = [
  {
    id: '1',
    title: 'Won First Prize in National Hackathon 2024',
    content: 'Excited to share that our team "Code Warriors" won the first prize at the National Hackathon 2024...',
    author: {
      id: 's1',
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'Technical',
    department: 'Technical',
    visibility: 'public',
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop'],
    attachments: ['hackathon_certificate.pdf', 'project_presentation.pdf'],
    likes: 234,
    comments: 45,
    createdAt: '2024-01-15T10:30:00Z'
  }
];

// Function to generate PDF portfolio
const generatePDF = (profileData: any, template: string) => {
  // This is a mock function - in real implementation, you would:
  // 1. Use a library like pdfmake or jspdf to create PDF
  // 2. Format the data according to the selected template
  // 3. Return the PDF file or URL
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`/portfolios/${template}-${Date.now()}.pdf`);
    }, 2000);
  });
};

// Function to generate web link portfolio
const generateWebLink = (profileData: any, template: string) => {
  // This is a mock function - in real implementation, you would:
  // 1. Create a unique URL for the portfolio
  // 2. Save the portfolio data to the backend
  // 3. Return the shareable link
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://eduverse.com/portfolio/${profileData.id}/${template}-${Date.now()}`);
    }, 2000);
  });
};

export const StudentProfileComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('t1');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'weblink'>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState(mockPortfolioData.generatedPortfolios);
  
  const [profile] = useState<IStudentProfile>(mockStudentProfile);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'posts', label: 'Posts & Achievements', icon: Award },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'dashboard', label: 'Dynamic Dashboard', icon: BookOpen },
    { id: 'portfolio', label: 'Digital Portfolio', icon: FileText }
  ];

  const filteredPosts = mockStudentPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600">{profile.course} • {profile.year}</p>
              <p className="text-sm text-gray-500">{profile.organization}</p>
              <p className="text-sm text-gray-500">Roll No: {profile.rollNumber}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
        
        {profile.bio && (
          <div className="mt-4">
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.email && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{profile.email}</span>
            </div>
          )}
          {profile.phone && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{profile.phone}</span>
            </div>
          )}
          {profile.linkedin && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Linkedin className="w-4 h-4" />
              <a href={`https://${profile.linkedin}`} className="text-sm text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {profile.github && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Github className="w-4 h-4" />
              <a href={`https://${profile.github}`} className="text-sm text-blue-600 hover:underline">
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{profile.achievements.length}</div>
          <div className="text-sm text-gray-600">Achievements</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{profile.projects.length}</div>
          <div className="text-sm text-gray-600">Projects</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{profile.skills.length}</div>
          <div className="text-sm text-gray-600">Skills</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Briefcase className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{profile.experiences.length}</div>
          <div className="text-sm text-gray-600">Experiences</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="space-y-4">
          {profile.achievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Award className="w-5 h-5 text-yellow-500 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {new Date(achievement.date).toLocaleDateString()}
                  </span>
                  {achievement.verifiedBy && (
                    <span className="text-xs text-green-600">• Verified by {achievement.verifiedBy}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts and achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="certification">Certification</option>
            <option value="sports">Sports</option>
            <option value="cultural">Cultural</option>
            <option value="nss">NSS</option>
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'approved' ? 'bg-green-100 text-green-800' :
                      post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{post.category}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Eye className="w-5 h-5 text-gray-400" />
              </div>
              
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
              
              {post.attachments && post.attachments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments:</h4>
                  <div className="space-y-2">
                    {post.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-blue-600">
                        <Download className="w-4 h-4" />
                        <span>{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  post.visibility === 'public' ? 'bg-blue-100 text-blue-800' :
                  post.visibility === 'organization' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {post.visibility.charAt(0).toUpperCase() + post.visibility.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>
      
      <div className="grid gap-6">
        {profile.projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex space-x-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} className="text-gray-600 hover:text-blue-600">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} className="text-gray-600 hover:text-blue-600">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              {new Date(project.startDate).toLocaleDateString()} - {
                project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>
      
      <div className="space-y-6">
        {profile.experiences.map((experience) => (
          <div key={experience.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{experience.title}</h3>
                <p className="text-blue-600 font-medium">{experience.company}</p>
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mt-1">
                  {experience.type}
                </span>
              </div>
              <Briefcase className="w-6 h-6 text-gray-400" />
            </div>
            
            <p className="text-gray-700 mb-4">{experience.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {experience.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              {new Date(experience.startDate).toLocaleDateString()} - {
                experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Academic Performance Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{mockDashboardData.academicPerformance.cgpa}</div>
            <div className="text-sm text-gray-600">Current CGPA</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{mockDashboardData.academicPerformance.attendance}%</div>
            <div className="text-sm text-gray-600">Overall Attendance</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{mockDashboardData.academicPerformance.currentSemester}</div>
            <div className="text-sm text-gray-600">Current Semester</div>
          </div>
        </div>
      </div>

      {/* Semester-wise Results */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Semester-wise Academic Records</h2>
        <div className="space-y-6">
          {mockDashboardData.semesterWiseResults.map((semester, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="font-semibold text-lg text-gray-900">Semester {semester.semester}</h3>
                  <div className="flex space-x-4">
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      SGPA: {semester.sgpa}
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Percentage: {semester.percentage}%
                    </div>
                    <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Attendance: {semester.attendance}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Uploaded: {new Date(semester.uploadDate).toLocaleDateString()}
                  </div>
                  <button 
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => window.open(semester.marksheetUrl, '_blank')}
                  >
                    <Download className="w-4 h-4" />
                    <span>Marksheet</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid gap-3">
                  {semester.subjects.map((subject, subIndex) => (
                    <div key={subIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="flex items-center space-x-4">
                        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          Grade: {subject.grade}
                        </div>
                        <div className="text-sm text-gray-600">
                          {subject.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Semester */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-medium text-gray-900 mb-3">Current Semester Subjects</h3>
        <div className="space-y-3">
          {mockDashboardData.academicPerformance.subjects.map((subject, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900">{subject.name}</div>
                <div className="text-sm text-gray-600">Attendance: {subject.attendance}%</div>
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                Grade: {subject.grade}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Based Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Credit Based Activities</h2>
        <div className="space-y-4">
          {mockDashboardData.creditBasedActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{activity.name}</div>
                <div className="text-sm text-gray-600">Credits: {activity.credits}</div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  activity.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.status}
                </span>
                <div className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
        <div className="space-y-4">
          {mockDashboardData.upcomingDeadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{deadline.title}</div>
                <div className="text-sm text-gray-600">{deadline.subject}</div>
              </div>
              <div className="text-sm font-medium text-red-600">
                Due: {new Date(deadline.dueDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.skills.map((skill) => (
          <div key={skill.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{skill.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                skill.level === 'Expert' ? 'bg-purple-100 text-purple-800' :
                skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                skill.level === 'Intermediate' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {skill.level}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {skill.endorsements} endorsements
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  skill.level === 'Expert' ? 'bg-purple-500' :
                  skill.level === 'Advanced' ? 'bg-blue-500' :
                  skill.level === 'Intermediate' ? 'bg-green-500' :
                  'bg-gray-500'
                }`}
                style={{ 
                  width: `${
                    skill.level === 'Expert' ? 100 :
                    skill.level === 'Advanced' ? 80 :
                    skill.level === 'Intermediate' ? 60 : 40
                  }%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleGeneratePortfolio = async () => {
    setIsGenerating(true);
    try {
      // Get the selected template details
      const templateDetails = mockPortfolioData.templateOptions.find(t => t.id === selectedTemplate);
      
      // Generate portfolio based on selected format
      let result: string;
      if (selectedFormat === 'pdf') {
        result = await generatePDF(profile, selectedTemplate) as string;
      } else {
        result = await generateWebLink(profile, selectedTemplate) as string;
      }

      // Add the new portfolio to the list
      const newPortfolio = {
        id: `p${Date.now()}`,
        type: templateDetails?.name || 'Custom Portfolio',
        format: selectedFormat.toUpperCase(),
        generatedAt: new Date().toISOString(),
        url: selectedFormat === 'pdf' ? result : '',
        shareableLink: selectedFormat === 'weblink' ? result : `https://eduverse.com/portfolio/${profile.id}/latest`,
        downloads: 0,
        views: 0
      } as const;

      setGeneratedItems(prev => [newPortfolio, ...prev]);
    } catch (error) {
      console.error('Error generating portfolio:', error);
      // You can add error handling UI here
    } finally {
      setIsGenerating(false);
    }
  };

  const copyShareableLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // You can add a toast notification here
  };

  const renderPortfolio = () => {

    return (
      <div className="space-y-6">
        {/* Generate New Portfolio */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate New Portfolio</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {mockPortfolioData.templateOptions.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} - {template.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Format
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="pdf"
                    checked={selectedFormat === 'pdf'}
                    onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'weblink')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">PDF Document</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="weblink"
                    checked={selectedFormat === 'weblink'}
                    onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'weblink')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Web Link</span>
                </label>
              </div>
            </div>
            <button
              onClick={handleGeneratePortfolio}
              disabled={isGenerating}
              className={`flex items-center justify-center space-x-2 w-full md:w-auto px-4 py-2 ${
                isGenerating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-lg transition-colors`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Generate Portfolio</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Portfolios */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Generated Portfolios</h2>
          <div className="space-y-4">
            {generatedItems.map((portfolio) => (
              <div key={portfolio.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{portfolio.type}</h3>
                    <div className="text-sm text-gray-500">
                      Generated on {new Date(portfolio.generatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{portfolio.downloads} downloads</span>
                      <span>{portfolio.views} views</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => copyShareableLink(portfolio.shareableLink)}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <Link className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>
                    <a
                      href={portfolio.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'posts' && renderPosts()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'experience' && renderExperience()}
          {activeTab === 'skills' && renderSkills()}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'portfolio' && renderPortfolio()}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileComponent;
