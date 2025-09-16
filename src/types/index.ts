export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'student' | 'faculty' | 'organization';
    organization: string;
  };
  category: string;
  department?: string; // Department for faculty approval workflow
  visibility: 'public' | 'organization' | 'private';
  status: 'approved' | 'pending' | 'rejected';
  images?: string[];
  documents?: string[];
  attachments?: string[]; // Additional attachments like certificates, etc.
  likes: number;
  comments: number;
  createdAt: string;
  approvedBy?: {
    id: string;
    name: string;
    role: 'faculty' | 'organization';
  };
  rejectionReason?: string; // Reason for rejection with comments
  rejectedBy?: {
    id: string;
    name: string;
    role: 'faculty' | 'organization';
  };
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  categories: string[];
  facultyCount: number;
  studentCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  certificate?: string;
  verifiedBy?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  endorsements: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: 'Internship' | 'Part-time' | 'Full-time' | 'Volunteer';
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  organization: string;
  course: string;
  year: string;
  rollNumber: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  achievements: Achievement[];
  posts: Post[];
  joinedAt: string;
}

export interface FacultyProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  organization: string;
  department: string;
  designation: string;
  qualifications: string[];
  experience: string;
  phone?: string;
  linkedin?: string;
  researchAreas: string[];
  publications: Publication[];
  approvedPosts: Post[];
  pendingReviews: Post[];
  joinedAt: string;
}

export interface OrganizationProfile {
  id: string;
  name: string;
  email: string;
  logo?: string;
  description: string;
  establishedYear: string;
  location: string;
  website?: string;
  phone?: string;
  accreditation: string[];
  departments: string[];
  facultyCount: number;
  studentCount: number;
  totalPosts: number;
  totalEvents: number;
  achievements: Achievement[];
  joinedAt: string;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  authors: string[];
  doi?: string;
  category: 'Research Paper' | 'Conference' | 'Book Chapter' | 'Patent';
}
