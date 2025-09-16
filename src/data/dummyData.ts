import type { Post, Organization } from '../types';

export const dummyOrganizations: Organization[] = [
  {
    id: 'org1',
    name: 'GEC Bilaspur',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop',
    description: 'Government Engineering College, Bilaspur - Excellence in Technical Education',
    categories: ['NSS', 'Sports', 'Cultural', 'Technical', 'Clubs'],
    facultyCount: 125,
    studentCount: 2500
  },
  {
    id: 'org2',
    name: 'XYZ College',
    logo: 'https://images.unsplash.com/photo-1564585864636-7cbc10e8da6e?w=100&h=100&fit=crop',
    description: 'Excellence in education since 1950',
    categories: ['Research', 'Innovation', 'Community Service'],
    facultyCount: 89,
    studentCount: 1800
  },
  {
    id: 'org3',
    name: 'PQR Institute',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop',
    description: 'Institute of Technology and Management',
    categories: ['Entrepreneurship', 'AI/ML', 'Robotics'],
    facultyCount: 67,
    studentCount: 1200
  }
];

export const dummyPosts: Post[] = [
  {
    id: '1',
    title: 'Won First Prize in National Hackathon 2024',
    content: 'Excited to share that our team "Code Warriors" won the first prize at the National Hackathon 2024 organized by Tech India Foundation. We developed an AI-powered solution for sustainable agriculture that helps farmers optimize crop yield using machine learning algorithms and IoT sensors.',
    author: {
      id: 's1',
      name: 'Kanhaiya',
      avatar: '/src/assets/Profile.jpg',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'Technical',
    department: 'Technical',
    visibility: 'public',
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=300&fit=crop'
    ],
    attachments: ['hackathon_certificate.pdf', 'project_presentation.pdf'],
    likes: 234,
    comments: 45,
    createdAt: '2024-01-15T10:30:00Z',
    approvedBy: {
      id: 'f1',
      name: 'Dr. Sarah Faculty',
      role: 'faculty'
    }
  },
  {
    id: '2',
    title: 'Completed AWS Cloud Practitioner Certification',
    content: 'Successfully passed the AWS Cloud Practitioner exam with a score of 890/1000! This certification validates my understanding of AWS Cloud fundamentals, security, and billing. Grateful to our college for providing access to AWS Academy resources.',
    author: {
      id: 's2',
      name: 'Abhinav',
      avatar: '/src/assets/abhinav.jpg',
      role: 'student',
      organization: 'XYZ College'
    },
    category: 'Certification',
    department: 'Technical',
    visibility: 'public',
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop'
    ],
    attachments: ['aws_certificate.pdf'],
    likes: 156,
    comments: 28,
    createdAt: '2024-01-12T14:20:00Z',
    approvedBy: {
      id: 'f2',
      name: 'Prof. Amit Kumar',
      role: 'faculty'
    }
  },
  {
    id: '3',
    title: 'NSS Blood Donation Camp - 200+ Donors',
    content: 'Organized a successful blood donation camp in collaboration with City Hospital. We managed to collect blood from 200+ donors, which will help save countless lives. Proud to be part of NSS and contribute to society. Special thanks to all volunteers and donors!',
    author: {
      id: 's3',
      name: 'Anshu',
      avatar: '/src/assets/anshu.jpg',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'NSS',
    department: 'NSS',
    visibility: 'public',
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
    ],
    attachments: ['tree_plantation_report.pdf', 'participation_certificate.pdf'],
    likes: 189,
    comments: 34,
    createdAt: '2024-01-10T09:15:00Z',
    approvedBy: {
      id: 'f3',
      name: 'Dr. Meera NSS Coordinator',
      role: 'faculty'
    }
  },
  {
    id: '4',
    title: 'Research Paper Published in IEEE Conference',
    content: 'My research paper titled "Machine Learning Approaches for Predictive Healthcare Analytics" has been accepted and published in IEEE International Conference on Healthcare Informatics. This work focuses on using deep learning for early disease prediction.',
    author: {
      id: 's4',
      name: 'Apoorva',
      avatar: '/src/assets/apporva.jpg',
      role: 'student',
      organization: 'PQR Institute'
    },
    category: 'Research',
    department: 'Research',
    visibility: 'public',
    status: 'approved',
    attachments: ['ieee_paper.pdf', 'conference_certificate.pdf'],
    likes: 298,
    comments: 67,
    createdAt: '2024-01-08T16:45:00Z',
    approvedBy: {
      id: 'f4',
      name: 'Dr. Research Head',
      role: 'faculty'
    }
  },
  {
    id: '5',
    title: 'State Level Basketball Championship - Runner Up',
    content: 'Our college basketball team secured the runner-up position in the State Level Basketball Championship 2024. It was an intense tournament with 32 teams participating. We fought hard and gave our best performance. Proud of the entire team!',
    author: {
      id: 's5',
      name: 'Shakish',
      avatar: '/src/assets/shakish.jpg',
      role: 'student',
      organization: 'XYZ College'
    },
    category: 'Sports',
    visibility: 'public',
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop'
    ],
    likes: 145,
    comments: 23,
    createdAt: '2024-01-05T11:30:00Z',
    approvedBy: {
      id: 'f5',
      name: 'Coach Sports Department',
      role: 'faculty'
    }
  },
  {
    id: '6',
    title: 'Internship at Google Summer of Code',
    content: 'Thrilled to announce that I have been selected for Google Summer of Code 2024! I will be working on an open-source project related to machine learning frameworks. This is a dream come true and I am excited to contribute to the open-source community.',
    author: {
      id: 's6',
      name: 'Venkatesh',
      avatar: '/src/assets/venk.jpg',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'Internship',
    department: 'Technical',
    visibility: 'public',
    status: 'approved',
    attachments: ['internship_certificate.pdf', 'internship_report.pdf'],
    likes: 412,
    comments: 89,
    createdAt: '2024-01-03T13:20:00Z',
    approvedBy: {
      id: 'f1',
      name: 'Dr. Sarah Faculty',
      role: 'faculty'
    }
  },
  
  // Pending posts for faculty review
  {
    id: 'pending1',
    title: 'Participated in Inter-College Basketball Championship',
    content: 'Our team reached the semi-finals in the Inter-College Basketball Championship held at Sports Complex. I scored 23 points in the quarter-final match against ABC College.',
    author: {
      id: 's7',
      name: 'Kanhaiya',
      avatar: '/src/assets/Profile.jpg',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'Sports',
    department: 'Sports',
    visibility: 'public',
    status: 'pending',
    attachments: ['participation_certificate.pdf', 'score_sheet.pdf'],
    likes: 0,
    comments: 0,
    createdAt: '2024-01-20T11:30:00Z'
  },
  {
    id: 'pending2',
    title: 'Organized Blood Donation Camp',
    content: 'Successfully organized a blood donation camp in collaboration with local hospital. We managed to collect 150 units of blood and helped save many lives. This was part of our NSS initiative.',
    author: {
      id: 's8',
      name: 'Abhinav',
      avatar: '/src/assets/abhinav.jpg',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'Social Service',
    department: 'NSS',
    visibility: 'organization',
    status: 'pending',
    images: [
      'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&h=300&fit=crop'
    ],
    attachments: ['blood_donation_report.pdf', 'hospital_acknowledgment.pdf'],
    likes: 0,
    comments: 0,
    createdAt: '2024-01-19T15:45:00Z'
  },
  {
    id: 'pending3',
    title: 'Full Stack Developer Intern (MERN) at Bharat Economic Forum',
    content: 'Successfully completed a Full Stack Developer Internship at Bharat Economic Forum from May 2025 to August 2025. During this remote internship, I was promoted to Lead of the BEF Developers Committee, where I directed the GitHub organization and led 30+ developers to deliver the official BEF website using MERN stack. I also developed an email automation platform using SendGrid and OpenAI to deliver bulk emails to 1,000+ users, and built an AI-powered bulk call assistant using the Blend AI API, automating outreach to 1,000+ users per hour.',
    author: {
      id: 's9',
      name: 'Anshu',
      avatar: '/src/assets/anshu.jpg',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'Internship',
    department: 'Technical',
    visibility: 'public',
    status: 'pending',
    images: [
      '/src/assets/Internship.png'
    ],
    attachments: ['internship_certificate.pdf', 'project_reports.pdf'],
    likes: 0,
    comments: 0,
    createdAt: '2024-01-18T09:20:00Z'
  },
  {
    id: 'pending4',
    title: 'Cultural Performance at State Level Competition',
    content: 'Our college dance team performed classical Indian dance at the State Level Cultural Competition held in Delhi. We secured second position among 45 participating colleges. The performance was based on the theme "Unity in Diversity" and showcased traditional dances from different Indian states.',
    author: {
      id: 's10',
      name: 'Kanhaiya',
      avatar: '/src/assets/Profile.jpg',
      role: 'student',
      organization: 'GEC Bilaspur'
    },
    category: 'Cultural',
    department: 'Cultural',
    visibility: 'public',
    status: 'pending',
    images: [
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=500&h=300&fit=crop'
    ],
    attachments: ['performance_certificate.pdf', 'competition_photos.zip'],
    likes: 0,
    comments: 0,
    createdAt: '2024-01-17T14:30:00Z'
  }
];
