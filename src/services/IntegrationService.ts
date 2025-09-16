// Integration Service for External Systems (LMS, ERP, Digital University Platforms)
import { toast } from 'react-toastify';

export interface IntegrationConfig {
  id: string;
  name: string;
  type: 'LMS' | 'ERP' | 'University_Platform' | 'Custom';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  endpoint: string;
  apiKey?: string;
  credentials?: {
    username?: string;
    password?: string;
    token?: string;
  };
  syncSettings: {
    autoSync: boolean;
    syncInterval: number; // in minutes
    lastSync?: Date;
    nextSync?: Date;
  };
  dataMapping: {
    studentRecords: boolean;
    achievements: boolean;
    attendance: boolean;
    grades: boolean;
    courses: boolean;
  };
  institutionConfig?: {
    institutionId: string;
    departmentMapping: Record<string, string>;
    customFields: Record<string, string>;
  };
}

export interface SyncResult {
  success: boolean;
  recordsProcessed: number;
  recordsAdded: number;
  recordsUpdated: number;
  recordsSkipped: number;
  errors: string[];
  timestamp: Date;
}

export interface StudentExternalData {
  externalId: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  semester: number;
  courses: Array<{
    courseId: string;
    courseName: string;
    credits: number;
    grade?: string;
  }>;
  attendance: Array<{
    courseId: string;
    attendancePercentage: number;
    totalClasses: number;
    attendedClasses: number;
  }>;
  achievements?: Array<{
    type: string;
    title: string;
    description: string;
    date: Date;
    verified: boolean;
  }>;
}

// Predefined integration templates for common systems
export const INTEGRATION_TEMPLATES = {
  // Government Engineering College (GEC) common systems
  GEC_BILASPUR: {
    ERP: {
      name: 'GEC Bilaspur ERP System',
      type: 'ERP' as const,
      endpoint: 'https://erp.gecbilaspur.ac.in/api',
      commonEndpoints: {
        students: '/students',
        attendance: '/attendance',
        grades: '/academic/grades',
        courses: '/academic/courses'
      }
    },
    LMS: {
      name: 'GEC Moodle LMS',
      type: 'LMS' as const,
      endpoint: 'https://lms.gecbilaspur.ac.in/webservice/rest',
      commonEndpoints: {
        courses: '/core_course_get_courses',
        enrollments: '/core_enrol_get_enrolled_users',
        grades: '/core_grades_get_grades',
        activities: '/mod_assign_get_assignments'
      }
    },
    UNIVERSITY_PLATFORM: {
      name: 'Chhattisgarh Technical University Portal',
      type: 'University_Platform' as const,
      endpoint: 'https://www.ctub.in/api',
      commonEndpoints: {
        results: '/examination/results',
        registration: '/student/registration',
        syllabus: '/academic/syllabus'
      }
    }
  },
  
  // Common LMS platforms
  MOODLE: {
    name: 'Moodle LMS',
    type: 'LMS' as const,
    endpoint: '/webservice/rest/server.php',
    functions: [
      'core_webservice_get_site_info',
      'core_course_get_courses',
      'core_enrol_get_enrolled_users',
      'core_grades_get_grades'
    ]
  },
  
  CANVAS: {
    name: 'Canvas LMS',
    type: 'LMS' as const,
    endpoint: '/api/v1',
    endpoints: {
      courses: '/courses',
      students: '/courses/:courseId/students',
      assignments: '/courses/:courseId/assignments',
      submissions: '/courses/:courseId/assignments/:assignmentId/submissions'
    }
  },
  
  // Common ERP systems
  SAP_CAMPUS: {
    name: 'SAP Campus Management',
    type: 'ERP' as const,
    endpoint: '/sap/bc/rest',
    modules: ['student_records', 'academic_calendar', 'examination', 'finance']
  },
  
  ORACLE_CAMPUS: {
    name: 'Oracle Campus Solutions',
    type: 'ERP' as const,
    endpoint: '/PSIGW/RESTListeningConnector',
    services: ['STUDENT_RECORDS', 'ACADEMIC_PROGRESS', 'ENROLLMENT']
  }
};

class IntegrationService {
  private static instance: IntegrationService;
  private integrations: Map<string, IntegrationConfig> = new Map();
  private syncHistory: Map<string, SyncResult[]> = new Map();

  private constructor() {
    // Initialize with GEC Bilaspur default configurations
    this.initializeGECBilaspurDefaults();
  }

  static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  private initializeGECBilaspurDefaults(): void {
    // Enhanced GEC Bilaspur specific integrations with detailed configuration
    const gecErp: IntegrationConfig = {
      id: 'gec-bilaspur-erp-2024',
      name: 'GEC Bilaspur ERP System (Enhanced)',
      type: 'ERP',
      status: 'disconnected',
      endpoint: 'https://erp.gecbilaspur.ac.in/api/v2',
      syncSettings: {
        autoSync: false,
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
    };

    const gecLms: IntegrationConfig = {
      id: 'gec-bilaspur-moodle-lms',
      name: 'GEC Bilaspur Moodle LMS (v4.1)',
      type: 'LMS',
      status: 'disconnected',
      endpoint: 'https://lms.gecbilaspur.ac.in/webservice/rest/server.php',
      syncSettings: {
        autoSync: false,
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
    };

    const csvtuPortal: IntegrationConfig = {
      id: 'csvtu-university-portal',
      name: 'CSVTU University Portal',
      type: 'University_Platform',
      status: 'disconnected',
      endpoint: 'https://csvtu.ac.in/api/v1',
      syncSettings: {
        autoSync: false,
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
    };

    const aictePortal: IntegrationConfig = {
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
    };

    const gecLibrary: IntegrationConfig = {
      id: 'gec-bilaspur-library-system',
      name: 'GEC Library Management System',
      type: 'Custom',
      status: 'disconnected',
      endpoint: 'https://library.gecbilaspur.ac.in/api',
      syncSettings: {
        autoSync: false,
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
    };

    // Initialize all GEC Bilaspur integrations
    this.integrations.set(gecErp.id, gecErp);
    this.integrations.set(gecLms.id, gecLms);
    this.integrations.set(csvtuPortal.id, csvtuPortal);
    this.integrations.set(aictePortal.id, aictePortal);
    this.integrations.set(gecLibrary.id, gecLibrary);
  }

  // Get all configured integrations
  getAllIntegrations(): IntegrationConfig[] {
    return Array.from(this.integrations.values());
  }

  // Get integration by ID
  getIntegration(id: string): IntegrationConfig | undefined {
    return this.integrations.get(id);
  }

  // Add new integration
  addIntegration(config: IntegrationConfig): void {
    this.integrations.set(config.id, config);
    toast.success(`Integration "${config.name}" added successfully`);
  }

  // Update integration configuration
  updateIntegration(id: string, updates: Partial<IntegrationConfig>): void {
    const existing = this.integrations.get(id);
    if (existing) {
      const updated = { ...existing, ...updates };
      this.integrations.set(id, updated);
      toast.success(`Integration "${existing.name}" updated successfully`);
    }
  }

  // Remove integration
  removeIntegration(id: string): void {
    const integration = this.integrations.get(id);
    if (integration) {
      this.integrations.delete(id);
      this.syncHistory.delete(id);
      toast.success(`Integration "${integration.name}" removed successfully`);
    }
  }

  // Test connection to external system
  async testConnection(id: string): Promise<boolean> {
    const integration = this.integrations.get(id);
    if (!integration) {
      toast.error('Integration not found');
      return false;
    }

    try {
      toast.info('Testing connection...');
      
      // Simulate API call
      await this.simulateApiCall(integration.endpoint + '/health');
      
      // Update status
      integration.status = 'connected';
      this.integrations.set(id, integration);
      
      toast.success(`Connection to ${integration.name} successful`);
      return true;
    } catch (error) {
      integration.status = 'error';
      this.integrations.set(id, integration);
      
      toast.error(`Connection to ${integration.name} failed`);
      return false;
    }
  }

  // Sync data from external system
  async syncData(id: string): Promise<SyncResult> {
    const integration = this.integrations.get(id);
    if (!integration) {
      throw new Error('Integration not found');
    }

    if (integration.status !== 'connected') {
      toast.error('Integration is not connected. Please test connection first.');
      throw new Error('Integration not connected');
    }

    try {
      integration.status = 'syncing';
      this.integrations.set(id, integration);

      toast.info(`Starting sync with ${integration.name}...`);

      // Simulate data sync based on integration type
      const result = await this.performSync(integration);

      // Update sync history
      const history = this.syncHistory.get(id) || [];
      history.unshift(result);
      if (history.length > 10) history.pop(); // Keep last 10 sync results
      this.syncHistory.set(id, history);

      // Update integration status and last sync time
      integration.status = 'connected';
      integration.syncSettings.lastSync = new Date();
      integration.syncSettings.nextSync = new Date(Date.now() + integration.syncSettings.syncInterval * 60000);
      this.integrations.set(id, integration);

      if (result.success) {
        toast.success(`Sync completed: ${result.recordsProcessed} records processed, ${result.recordsAdded} added, ${result.recordsUpdated} updated`);
      } else {
        toast.warning(`Sync completed with errors: ${result.errors.length} errors found`);
      }

      return result;
    } catch (error) {
      integration.status = 'error';
      this.integrations.set(id, integration);
      
      const errorResult: SyncResult = {
        success: false,
        recordsProcessed: 0,
        recordsAdded: 0,
        recordsUpdated: 0,
        recordsSkipped: 0,
        errors: [error instanceof Error ? error.message : 'Unknown sync error'],
        timestamp: new Date()
      };

      toast.error(`Sync failed: ${errorResult.errors[0]}`);
      return errorResult;
    }
  }

  // Get sync history for an integration
  getSyncHistory(id: string): SyncResult[] {
    return this.syncHistory.get(id) || [];
  }

  // Enable/disable auto sync
  setAutoSync(id: string, enabled: boolean): void {
    const integration = this.integrations.get(id);
    if (integration) {
      integration.syncSettings.autoSync = enabled;
      this.integrations.set(id, integration);
      
      if (enabled) {
        toast.success(`Auto-sync enabled for ${integration.name}`);
        // In a real implementation, you would set up a scheduled job here
      } else {
        toast.info(`Auto-sync disabled for ${integration.name}`);
      }
    }
  }

  // Get available integration templates
  getAvailableTemplates(): typeof INTEGRATION_TEMPLATES {
    return INTEGRATION_TEMPLATES;
  }

  // Create integration from template
  createFromTemplate(templateKey: string, customConfig?: Partial<IntegrationConfig>): IntegrationConfig {
    const templates = INTEGRATION_TEMPLATES as any;
    let template = templates[templateKey];
    
    // Navigate nested templates (e.g., GEC_BILASPUR.ERP)
    if (templateKey.includes('.')) {
      const keys = templateKey.split('.');
      template = keys.reduce((obj, key) => obj[key], templates);
    }

    if (!template) {
      throw new Error(`Template ${templateKey} not found`);
    }

    const baseConfig: IntegrationConfig = {
      id: `${templateKey.toLowerCase().replace('.', '-')}-${Date.now()}`,
      name: template.name,
      type: template.type,
      status: 'disconnected',
      endpoint: template.endpoint,
      syncSettings: {
        autoSync: false,
        syncInterval: 60,
      },
      dataMapping: {
        studentRecords: true,
        achievements: true,
        attendance: true,
        grades: true,
        courses: true,
      },
      ...customConfig
    };

    return baseConfig;
  }

  // Private helper methods
  private async simulateApiCall(endpoint: string): Promise<any> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    console.log(endpoint);
    // Simulate occasional failures for testing
    if (Math.random() < 0.1) {
      throw new Error('Network connection failed');
    }
    
    return { status: 'ok', timestamp: new Date() };
  }

  private async performSync(integration: IntegrationConfig): Promise<SyncResult> {
    // Simulate sync operation
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    console.log(integration)
    const recordsProcessed = Math.floor(Math.random() * 100) + 50;
    const recordsAdded = Math.floor(recordsProcessed * 0.3);
    const recordsUpdated = Math.floor(recordsProcessed * 0.5);
    const recordsSkipped = recordsProcessed - recordsAdded - recordsUpdated;
    
    const errors: string[] = [];
    if (Math.random() < 0.2) {
      errors.push('Some records could not be processed due to data format issues');
    }
    
    return {
      success: errors.length === 0,
      recordsProcessed,
      recordsAdded,
      recordsUpdated,
      recordsSkipped,
      errors,
      timestamp: new Date()
    };
  }

  // Simulate fetching external student data
  async fetchStudentData(integrationId: string, studentId: string): Promise<StudentExternalData | null> {
    const integration = this.integrations.get(integrationId);
    if (!integration || integration.status !== 'connected') {
      return null;
    }

    // Simulate API call
    await this.simulateApiCall(integration.endpoint + `/students/${studentId}`);
    
    // Return simulated student data
    return {
      externalId: studentId,
      name: 'John Doe',
      email: 'john.doe@gecbilaspur.ac.in',
      rollNumber: '20CSE001',
      department: 'CSE',
      semester: 6,
      courses: [
        {
          courseId: 'CSE401',
          courseName: 'Machine Learning',
          credits: 4,
          grade: 'A'
        },
        {
          courseId: 'CSE402',
          courseName: 'Software Engineering',
          credits: 3,
          grade: 'B+'
        }
      ],
      attendance: [
        {
          courseId: 'CSE401',
          attendancePercentage: 85,
          totalClasses: 40,
          attendedClasses: 34
        }
      ],
      achievements: [
        {
          type: 'Competition',
          title: 'Hackathon Winner',
          description: 'First place in college hackathon',
          date: new Date(),
          verified: true
        }
      ]
    };
  }
}

export default IntegrationService.getInstance();