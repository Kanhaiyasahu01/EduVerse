// GEC Bilaspur Specific Integration Configurations
import type { IntegrationConfig } from '../services/IntegrationService';

export const GEC_BILASPUR_INTEGRATIONS: { [key: string]: Partial<IntegrationConfig> } = {
  // GEC Bilaspur ERP System Configuration
  GEC_ERP: {
    id: 'gec-bilaspur-erp-2024',
    name: 'GEC Bilaspur ERP System',
    type: 'ERP',
    status: 'disconnected',
    endpoint: 'https://erp.gecbilaspur.ac.in/api/v2',
    syncSettings: {
      autoSync: true,
      syncInterval: 120, // 2 hours for ERP data
    },
    dataMapping: {
      studentRecords: true,
      achievements: false, // ERP typically doesn't handle achievements
      attendance: true,
      grades: true,
      courses: true,
    },
    institutionConfig: {
      institutionId: 'GEC_BILASPUR',
      departmentMapping: {
        'CSE': 'Computer Science & Engineering',
        'IT': 'Information Technology',
        'ECE': 'Electronics & Communication Engineering',
        'EE': 'Electrical Engineering',
        'EEE': 'Electrical & Electronics Engineering',
        'ME': 'Mechanical Engineering',
        'CE': 'Civil Engineering',
        'CH': 'Chemical Engineering',
        'BME': 'Biomedical Engineering',
        'MINING': 'Mining Engineering'
      },
      customFields: {
        'institution_code': 'GECBP001',
        'university_affiliation': 'Chhattisgarh Swami Vivekanand Technical University',
        'university_code': 'CSVTU',
        'state': 'Chhattisgarh',
        'region': 'Central India',
        'naac_grade': 'B++',
        'nirf_ranking': 'Engineering 150-200',
        'aicte_approval': 'AICTE/CG/ENG/2024/001'
      }
    }
  },

  // GEC Bilaspur Moodle LMS Configuration  
  GEC_MOODLE: {
    id: 'gec-bilaspur-moodle-lms',
    name: 'GEC Bilaspur Moodle LMS',
    type: 'LMS',
    status: 'disconnected',
    endpoint: 'https://lms.gecbilaspur.ac.in/webservice/rest/server.php',
    syncSettings: {
      autoSync: true,
      syncInterval: 60, // 1 hour for LMS data
    },
    dataMapping: {
      studentRecords: true,
      achievements: true, // LMS handles course completion certificates
      attendance: true,
      grades: true,
      courses: true,
    },
    institutionConfig: {
      institutionId: 'GEC_BILASPUR_LMS',
      departmentMapping: {
        'cse': 'Computer Science Engineering',
        'it': 'Information Technology',
        'ece': 'Electronics Communication',
        'ee': 'Electrical Engineering',
        'me': 'Mechanical Engineering',
        'ce': 'Civil Engineering'
      },
      customFields: {
        'moodle_version': '4.1',
        'course_categories': 'Engineering,Management,Basic Sciences',
        'semester_system': '8-Semester',
        'academic_year': '2024-25'
      }
    }
  },

  // Chhattisgarh Technical University Portal
  CSVTU_PORTAL: {
    id: 'csvtu-university-portal',
    name: 'CSVTU University Portal',
    type: 'University_Platform',
    status: 'disconnected',
    endpoint: 'https://csvtu.ac.in/api/v1',
    syncSettings: {
      autoSync: true,
      syncInterval: 240, // 4 hours for university data
    },
    dataMapping: {
      studentRecords: true,
      achievements: false, // University focuses on academic records
      attendance: false,
      grades: true,
      courses: true,
    },
    institutionConfig: {
      institutionId: 'CSVTU_GEC_BILASPUR',
      departmentMapping: {
        '101': 'Computer Science & Engineering',
        '102': 'Information Technology',
        '103': 'Electronics & Communication Engineering',
        '104': 'Electrical Engineering',
        '105': 'Mechanical Engineering',
        '106': 'Civil Engineering'
      },
      customFields: {
        'university_code': 'CSVTU',
        'college_code': 'GECBP',
        'affiliation_number': 'CSVTU/GECBP/2024',
        'examination_scheme': 'Semester System',
        'grading_system': '10-Point Scale'
      }
    }
  },

  // AICTE Portal Integration
  AICTE_PORTAL: {
    id: 'aicte-approval-portal',
    name: 'AICTE Approval Portal',
    type: 'University_Platform',
    status: 'disconnected',
    endpoint: 'https://www.aicte-india.org/api/institutional',
    syncSettings: {
      autoSync: false, // Manual sync for compliance data
      syncInterval: 1440, // Daily sync
    },
    dataMapping: {
      studentRecords: true,
      achievements: false,
      attendance: false,
      grades: false,
      courses: true,
    },
    institutionConfig: {
      institutionId: 'AICTE_GEC_BILASPUR',
      departmentMapping: {
        'UG_CSE': 'B.Tech Computer Science Engineering',
        'UG_IT': 'B.Tech Information Technology',
        'UG_ECE': 'B.Tech Electronics Communication',
        'UG_EE': 'B.Tech Electrical Engineering',
        'UG_ME': 'B.Tech Mechanical Engineering',
        'UG_CE': 'B.Tech Civil Engineering'
      },
      customFields: {
        'aicte_id': 'AICTE/CG/ENG/GEC/BILASPUR/001',
        'approval_year': '2024-25',
        'intake_capacity': '480',
        'nba_accredited': 'Partial',
        'naac_accredited': 'B++'
      }
    }
  },

  // Library Management System
  GEC_LIBRARY: {
    id: 'gec-bilaspur-library-system',
    name: 'GEC Library Management System',
    type: 'Custom',
    status: 'disconnected',
    endpoint: 'https://library.gecbilaspur.ac.in/api',
    syncSettings: {
      autoSync: true,
      syncInterval: 180, // 3 hours
    },
    dataMapping: {
      studentRecords: true,
      achievements: true, // Library achievements like reading certificates
      attendance: false,
      grades: false,
      courses: false,
    },
    institutionConfig: {
      institutionId: 'GEC_BILASPUR_LIB',
      departmentMapping: {
        'CENTRAL': 'Central Library',
        'DEPT_CSE': 'CSE Department Library',
        'DEPT_ECE': 'ECE Department Library'
      },
      customFields: {
        'library_system': 'KOHA',
        'digital_resources': 'IEEE,ACM,Springer',
        'total_books': '75000+',
        'e_books': '25000+'
      }
    }
  }
};

// Department-specific integration mappings for GEC Bilaspur
export const GEC_DEPARTMENT_MAPPINGS = {
  'Computer Science & Engineering': {
    hod: 'Dr. Rakesh Kumar Sharma',
    labSystems: ['Programming Lab', 'DBMS Lab', 'Network Lab', 'Project Lab'],
    specializations: ['AI/ML', 'Data Science', 'Cyber Security', 'Software Engineering'],
    industryPartners: ['TCS', 'Infosys', 'Wipro', 'Tech Mahindra']
  },
  'Information Technology': {
    hod: 'Dr. Priya Sharma',
    labSystems: ['IT Lab 1', 'IT Lab 2', 'Server Room'],
    specializations: ['Cloud Computing', 'Mobile App Development', 'Web Technologies'],
    industryPartners: ['Microsoft', 'Amazon', 'Google']
  },
  'Electronics & Communication Engineering': {
    hod: 'Dr. Anil Kumar Singh',
    labSystems: ['Communication Lab', 'VLSI Lab', 'Microprocessor Lab'],
    specializations: ['VLSI Design', '5G Communication', 'IoT', 'Embedded Systems'],
    industryPartners: ['Qualcomm', 'Intel', 'Broadcom']
  },
  'Mechanical Engineering': {
    hod: 'Dr. Suresh Kumar Patel',
    labSystems: ['Manufacturing Lab', 'Thermal Lab', 'CAD Lab'],
    specializations: ['Thermal Engineering', 'Manufacturing', 'Automobile Engineering'],
    industryPartners: ['BHEL', 'L&T', 'Tata Motors']
  },
  'Civil Engineering': {
    hod: 'Dr. Ramesh Chandra Verma',
    labSystems: ['Concrete Lab', 'Survey Lab', 'Environmental Lab'],
    specializations: ['Structural Engineering', 'Environmental Engineering', 'Transportation'],
    industryPartners: ['L&T Construction', 'Shapoorji Pallonji', 'DLF']
  },
  'Electrical Engineering': {
    hod: 'Dr. Vinod Kumar Yadav',
    labSystems: ['Power Systems Lab', 'Control Systems Lab', 'Electrical Machines Lab'],
    specializations: ['Power Systems', 'Renewable Energy', 'Control Systems'],
    industryPartners: ['NTPC', 'PowerGrid', 'ABB']
  }
};

// GEC Bilaspur specific academic calendar and events
export const GEC_ACADEMIC_CONFIG = {
  academicYear: '2024-25',
  semesters: [
    {
      id: 'ODD_2024',
      name: 'Odd Semester 2024-25',
      startDate: '2024-07-15',
      endDate: '2024-11-30',
      examStartDate: '2024-12-01',
      examEndDate: '2024-12-15'
    },
    {
      id: 'EVEN_2025', 
      name: 'Even Semester 2024-25',
      startDate: '2025-01-06',
      endDate: '2025-05-15',
      examStartDate: '2025-05-20',
      examEndDate: '2025-06-05'
    }
  ],
  holidays: [
    { date: '2024-08-15', name: 'Independence Day' },
    { date: '2024-10-02', name: 'Gandhi Jayanti' },
    { date: '2024-10-24', name: 'Dussehra' },
    { date: '2024-11-12', name: 'Diwali' },
    { date: '2025-01-26', name: 'Republic Day' },
    { date: '2025-03-14', name: 'Holi' }
  ],
  events: [
    { 
      name: 'Tech Fest - INNOVENCIA 2024', 
      date: '2024-10-15',
      type: 'Technical',
      departments: ['All']
    },
    { 
      name: 'Cultural Fest - RANGMANCH 2024', 
      date: '2024-11-20',
      type: 'Cultural',
      departments: ['All']
    },
    { 
      name: 'Industry Academia Meet', 
      date: '2024-09-25',
      type: 'Industry',
      departments: ['CSE', 'IT', 'ECE']
    }
  ]
};

// Pre-configured sync schedules for GEC Bilaspur
export const GEC_SYNC_SCHEDULES = {
  DAILY: {
    time: '06:00',
    systems: ['GEC_LIBRARY', 'GEC_MOODLE'],
    description: 'Daily sync for active systems'
  },
  WEEKLY: {
    day: 'Sunday',
    time: '02:00',
    systems: ['GEC_ERP', 'CSVTU_PORTAL'],
    description: 'Weekly comprehensive sync'
  },
  MONTHLY: {
    date: 1,
    time: '01:00',
    systems: ['AICTE_PORTAL'],
    description: 'Monthly compliance data sync'
  }
};

export default {
  INTEGRATIONS: GEC_BILASPUR_INTEGRATIONS,
  DEPARTMENTS: GEC_DEPARTMENT_MAPPINGS,
  ACADEMIC: GEC_ACADEMIC_CONFIG,
  SCHEDULES: GEC_SYNC_SCHEDULES
};