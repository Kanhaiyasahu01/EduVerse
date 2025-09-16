// Analytics Service for NAAC, AICTE, NIRF and Internal Evaluation Reports
import { toast } from 'react-toastify';
import { dummyPosts } from '../data/dummyData';
import type { Post } from '../types';

export interface NAACMetrics {
  curricular: {
    totalStudents: number;
    passPercentage: number;
    graduationRate: number;
    placementRate: number;
    higherStudiesPursual: number;
  };
  coCurricular: {
    sportsParticipation: number;
    culturalParticipation: number;
    technicalEvents: number;
    socialServiceActivities: number;
    leadershipRoles: number;
  };
  research: {
    studentResearchProjects: number;
    publicationsWithStudents: number;
    patentsWithStudents: number;
    conferenceParticipation: number;
  };
  extension: {
    nssParticipants: number;
    communityServiceHours: number;
    socialImpactProjects: number;
    environmentalInitiatives: number;
  };
  infrastructure: {
    digitalLiteracyRate: number;
    technologyAdoption: number;
    onlineResourceUsage: number;
  };
}

export interface AICTEMetrics {
  academic: {
    studentEnrollment: number;
    facultyStudentRatio: number;
    infrastructureUtilization: number;
    libraryUsage: number;
  };
  placement: {
    placedStudents: number;
    averageSalary: number;
    industryPartnerships: number;
    internshipCompletion: number;
  };
  innovation: {
    startupIncubated: number;
    patentsPublished: number;
    researchPublications: number;
    industryCollaborations: number;
  };
  student: {
    achievementRate: number;
    skillDevelopmentPrograms: number;
    certificationCompletion: number;
    competitionParticipation: number;
  };
}

export interface NIRFMetrics {
  teachingLearning: {
    studentStrength: number;
    facultyStudentRatio: number;
    graduationOutcome: number;
    placement: number;
    higherStudies: number;
  };
  researchProductivity: {
    publications: number;
    patents: number;
    researchProjects: number;
    phds: number;
  };
  outreach: {
    diversityInclusion: number;
    economicImpact: number;
    socialImpact: number;
    environmentalImpact: number;
  };
  perception: {
    academicReputation: number;
    employerReputations: number;
    publicationsImpact: number;
  };
}

export interface InternalMetrics {
  departmentWise: {
    [department: string]: {
      totalStudents: number;
      activeParticipation: number;
      achievements: number;
      events: number;
    };
  };
  monthlyTrends: {
    month: string;
    posts: number;
    approvals: number;
    participation: number;
  }[];
  topPerformers: {
    students: { name: string; achievements: number; department: string }[];
    departments: { name: string; engagement: number; achievements: number }[];
  };
}

export interface ReportData {
  naac: NAACMetrics;
  aicte: AICTEMetrics;
  nirf: NIRFMetrics;
  internal: InternalMetrics;
  generatedAt: string;
  organizationName: string;
  reportPeriod: {
    startDate: string;
    endDate: string;
  };
}

class InstitutionalAnalyticsService {
  private static instance: InstitutionalAnalyticsService;

  private constructor() {}

  static getInstance(): InstitutionalAnalyticsService {
    if (!InstitutionalAnalyticsService.instance) {
      InstitutionalAnalyticsService.instance = new InstitutionalAnalyticsService();
    }
    return InstitutionalAnalyticsService.instance;
  }

  /**
   * Generate comprehensive analytics for all accreditation bodies
   */
  async generateComprehensiveReport(organizationName: string): Promise<ReportData> {
    try {
      toast.info('📊 Generating comprehensive analytics report...', {
        position: 'top-right',
        autoClose: false,
        toastId: 'analytics-generation'
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      const posts = dummyPosts.filter(post => post.author.organization === organizationName);
      
      const reportData: ReportData = {
        naac: this.calculateNAACMetrics(posts),
        aicte: this.calculateAICTEMetrics(posts),
        nirf: this.calculateNIRFMetrics(posts),
        internal: this.calculateInternalMetrics(posts),
        generatedAt: new Date().toISOString(),
        organizationName,
        reportPeriod: {
          startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // Last year
          endDate: new Date().toISOString()
        }
      };

      toast.dismiss('analytics-generation');
      toast.success('✅ Analytics report generated successfully!', {
        position: 'top-right',
        autoClose: 3000
      });

      return reportData;
    } catch (error) {
      toast.dismiss('analytics-generation');
      toast.error('❌ Failed to generate analytics report', {
        position: 'top-right',
        autoClose: 5000
      });
      throw error;
    }
  }

  /**
   * Calculate NAAC-specific metrics
   */
  private calculateNAACMetrics(posts: Post[]): NAACMetrics {
    const totalPosts = posts.length;
    // const approvedPosts = posts.filter(post => post.status === 'approved');
    
    return {
      curricular: {
        totalStudents: 2500,
        passPercentage: 88.5,
        graduationRate: 92.3,
        placementRate: 78.2,
        higherStudiesPursual: 15.8
      },
      coCurricular: {
        sportsParticipation: posts.filter(post => post.category === 'Sports').length,
        culturalParticipation: posts.filter(post => post.category === 'Cultural').length,
        technicalEvents: posts.filter(post => post.category === 'Technical').length,
        socialServiceActivities: posts.filter(post => post.department === 'NSS').length,
        leadershipRoles: Math.floor(totalPosts * 0.15)
      },
      research: {
        studentResearchProjects: posts.filter(post => post.category === 'Research').length,
        publicationsWithStudents: 45,
        patentsWithStudents: 8,
        conferenceParticipation: 156
      },
      extension: {
        nssParticipants: 450,
        communityServiceHours: 12500,
        socialImpactProjects: 23,
        environmentalInitiatives: 12
      },
      infrastructure: {
        digitalLiteracyRate: 94.2,
        technologyAdoption: 87.8,
        onlineResourceUsage: 76.3
      }
    };
  }

  /**
   * Calculate AICTE-specific metrics
   */
  private calculateAICTEMetrics(posts: Post[]): AICTEMetrics {
    const technicalPosts = posts.filter(post => post.category === 'Technical' || post.category === 'Internship');
    
    return {
      academic: {
        studentEnrollment: 2500,
        facultyStudentRatio: 1 / 20,
        infrastructureUtilization: 85.4,
        libraryUsage: 72.6
      },
      placement: {
        placedStudents: 1956,
        averageSalary: 650000,
        industryPartnerships: 78,
        internshipCompletion: posts.filter(post => post.category === 'Internship').length
      },
      innovation: {
        startupIncubated: 12,
        patentsPublished: 8,
        researchPublications: 145,
        industryCollaborations: 34
      },
      student: {
        achievementRate: (posts.filter(post => post.status === 'approved').length / posts.length) * 100,
        skillDevelopmentPrograms: 67,
        certificationCompletion: posts.filter(post => post.category === 'Certification').length,
        competitionParticipation: technicalPosts.length
      }
    };
  }

  /**
   * Calculate NIRF-specific metrics
   */
  private calculateNIRFMetrics(posts: Post[]): NIRFMetrics {
    return {
      teachingLearning: {
        studentStrength: 2500,
        facultyStudentRatio: 20,
        graduationOutcome: 92.3,
        placement: 78.2,
        higherStudies: 15.8
      },
      researchProductivity: {
        publications: 145,
        patents: 8,
        researchProjects: posts.filter(post => post.category === 'Research').length,
        phds: 23
      },
      outreach: {
        diversityInclusion: 89.4,
        economicImpact: 76.8,
        socialImpact: posts.filter(post => post.department === 'NSS').length,
        environmentalImpact: 82.1
      },
      perception: {
        academicReputation: 85.6,
        employerReputations: 78.9,
        publicationsImpact: 72.4
      }
    };
  }

  /**
   * Calculate internal evaluation metrics
   */
  private calculateInternalMetrics(posts: Post[]): InternalMetrics {
    const departments = ['Technical', 'NSS', 'Sports', 'Cultural', 'Research'];
    const departmentWise: any = {};

    departments.forEach(dept => {
      const deptPosts = posts.filter(post => post.department === dept || post.category === dept);
      departmentWise[dept] = {
        totalStudents: Math.floor(Math.random() * 600) + 200,
        activeParticipation: deptPosts.length,
        achievements: deptPosts.filter(post => post.status === 'approved').length,
        events: Math.floor(deptPosts.length * 0.7)
      };
    });

    const monthlyTrends = this.generateMonthlyTrends(posts);
    const topPerformers = this.generateTopPerformers(posts);

    return {
      departmentWise,
      monthlyTrends,
      topPerformers
    };
  }

  /**
   * Generate monthly trends data
   */
  private generateMonthlyTrends(_posts: Post[]): InternalMetrics['monthlyTrends'] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      posts: Math.floor(Math.random() * 50) + 10,
      approvals: Math.floor(Math.random() * 40) + 8,
      participation: Math.floor(Math.random() * 80) + 20
    }));
  }

  /**
   * Generate top performers data
   */
  private generateTopPerformers(_posts: Post[]): InternalMetrics['topPerformers'] {
    return {
      students: [
        { name: 'Kanhaiya Lal Sahu', achievements: 12, department: 'Technical' },
        { name: 'Abhinav Kumar', achievements: 10, department: 'NSS' },
        { name: 'Anshu Sharma', achievements: 9, department: 'Sports' },
        { name: 'Apoorva Verma', achievements: 8, department: 'Cultural' },
        { name: 'Venkatesh Singh', achievements: 7, department: 'Research' }
      ],
      departments: [
        { name: 'Technical', engagement: 94.2, achievements: 156 },
        { name: 'NSS', engagement: 89.7, achievements: 134 },
        { name: 'Sports', engagement: 87.3, achievements: 98 },
        { name: 'Cultural', engagement: 83.9, achievements: 87 },
        { name: 'Research', engagement: 91.5, achievements: 76 }
      ]
    };
  }

  /**
   * Export report as PDF
   */
  async exportReportAsPDF(reportData: ReportData, reportType: 'NAAC' | 'AICTE' | 'NIRF' | 'Internal' = 'NAAC'): Promise<void> {
    try {
      toast.info('📄 Generating PDF report...', {
        position: 'top-right',
        autoClose: false,
        toastId: 'pdf-generation'
      });

      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 1500));

      const pdfContent = this.generateReportHTML(reportData, reportType);
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}_Report_${reportData.organizationName}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.dismiss('pdf-generation');
      toast.success(`✅ ${reportType} report exported successfully!`, {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      toast.dismiss('pdf-generation');
      toast.error('❌ Failed to export report', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  }

  /**
   * Generate HTML content for the report
   */
  private generateReportHTML(reportData: ReportData, reportType: string): string {
    const data = reportData[reportType.toLowerCase() as keyof ReportData] as any;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportType} Report - ${reportData.organizationName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2563eb;
            margin-bottom: 10px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }
        .metric-card {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }
        .metric-title {
            font-weight: bold;
            color: #374151;
            margin-bottom: 10px;
        }
        .metric-value {
            font-size: 1.5em;
            font-weight: bold;
            color: #2563eb;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            color: #6b7280;
            font-size: 0.9em;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th, td {
            border: 1px solid #e5e7eb;
            padding: 12px;
            text-align: left;
        }
        th {
            background: #f3f4f6;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${reportType} Report</h1>
        <h2>${reportData.organizationName}</h2>
        <p>Report Period: ${new Date(reportData.reportPeriod.startDate).toLocaleDateString()} - ${new Date(reportData.reportPeriod.endDate).toLocaleDateString()}</p>
        <p>Generated on: ${new Date(reportData.generatedAt).toLocaleDateString()}</p>
    </div>

    ${this.generateSectionHTML(data, reportType)}

    <div class="footer">
        <p>This report was generated by EduVerse Analytics Platform</p>
        <p>For more information, visit our institutional dashboard</p>
    </div>
</body>
</html>`;
  }

  /**
   * Generate section HTML based on report type
   */
  private generateSectionHTML(data: any, _reportType: string): string {
    let html = '';
    
    Object.keys(data).forEach(sectionKey => {
      const section = data[sectionKey];
      html += `<div class="section">
        <h2>${this.formatSectionTitle(sectionKey)}</h2>
        <div class="metrics-grid">`;
      
      if (typeof section === 'object' && !Array.isArray(section)) {
        Object.keys(section).forEach(metricKey => {
          const value = section[metricKey];
          html += `
            <div class="metric-card">
              <div class="metric-title">${this.formatMetricTitle(metricKey)}</div>
              <div class="metric-value">${this.formatMetricValue(value)}</div>
            </div>`;
        });
      }
      
      html += '</div></div>';
    });
    
    return html;
  }

  private formatSectionTitle(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  private formatMetricTitle(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  private formatMetricValue(value: any): string {
    if (typeof value === 'number') {
      if (value > 1 && value < 100 && value % 1 !== 0) {
        return `${value.toFixed(1)}%`;
      }
      return value.toLocaleString();
    }
    return value.toString();
  }

  /**
   * Export report as Excel CSV
   */
  async exportReportAsCSV(reportData: ReportData, reportType: 'NAAC' | 'AICTE' | 'NIRF' | 'Internal' = 'NAAC'): Promise<void> {
    try {
      toast.info('📊 Generating CSV report...', {
        position: 'top-right',
        autoClose: false,
        toastId: 'csv-generation'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const csvContent = this.generateCSVContent(reportData, reportType);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}_Report_${reportData.organizationName}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.dismiss('csv-generation');
      toast.success(`✅ ${reportType} CSV report exported successfully!`, {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      toast.dismiss('csv-generation');
      toast.error('❌ Failed to export CSV report', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  }

  private generateCSVContent(reportData: ReportData, reportType: string): string {
    const data = reportData[reportType.toLowerCase() as keyof ReportData] as any;
    let csv = `${reportType} Report - ${reportData.organizationName}\n`;
    csv += `Report Period,${new Date(reportData.reportPeriod.startDate).toLocaleDateString()},${new Date(reportData.reportPeriod.endDate).toLocaleDateString()}\n`;
    csv += `Generated On,${new Date(reportData.generatedAt).toLocaleDateString()}\n\n`;
    csv += 'Section,Metric,Value\n';

    Object.keys(data).forEach(sectionKey => {
      const section = data[sectionKey];
      if (typeof section === 'object' && !Array.isArray(section)) {
        Object.keys(section).forEach(metricKey => {
          const value = section[metricKey];
          csv += `${this.formatSectionTitle(sectionKey)},${this.formatMetricTitle(metricKey)},${value}\n`;
        });
      }
    });

    return csv;
  }
}

export default InstitutionalAnalyticsService.getInstance();