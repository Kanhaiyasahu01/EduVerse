import React, { useState, useEffect } from 'react';
import { Download, FileText, TrendingUp, Users, Award, Activity, BarChart3, PieChart } from 'lucide-react';
import InstitutionalAnalyticsService, { type ReportData } from '../services/InstitutionalAnalyticsService';

interface AnalyticsDashboardProps {
  organizationName: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ organizationName }) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [activeReportType, setActiveReportType] = useState<'NAAC' | 'AICTE' | 'NIRF' | 'Internal'>('NAAC');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateReport();
  }, [organizationName]);

  const generateReport = async () => {
    setLoading(true);
    try {
      const data = await InstitutionalAnalyticsService.generateComprehensiveReport(organizationName);
      setReportData(data);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (reportData) {
      await InstitutionalAnalyticsService.exportReportAsPDF(reportData, activeReportType);
    }
  };

  const handleExportCSV = async () => {
    if (reportData) {
      await InstitutionalAnalyticsService.exportReportAsCSV(reportData, activeReportType);
    }
  };

  const renderNAACMetrics = () => {
    if (!reportData) return null;
    
    const { naac } = reportData;
    const pieData = [
      { name: 'Sports', value: naac.coCurricular.sportsParticipation, color: COLORS[0] },
      { name: 'Cultural', value: naac.coCurricular.culturalParticipation, color: COLORS[1] },
      { name: 'Technical', value: naac.coCurricular.technicalEvents, color: COLORS[2] },
      { name: 'NSS', value: naac.coCurricular.socialServiceActivities, color: COLORS[3] },
    ];

    return (
      <div className="space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-900">Total Students</h4>
            <p className="text-2xl font-bold text-blue-700">{naac.curricular.totalStudents.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-900">Graduation Rate</h4>
            <p className="text-2xl font-bold text-green-700">{naac.curricular.graduationRate}%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900">Placement Rate</h4>
            <p className="text-2xl font-bold text-purple-700">{naac.curricular.placementRate}%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-900">Research Projects</h4>
            <p className="text-2xl font-bold text-orange-700">{naac.research.studentResearchProjects}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Co-Curricular Activities Participation
            </h3>
            <div className="space-y-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: item.color,
                          width: `${(item.value / Math.max(...pieData.map(d => d.value))) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-900 w-8">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Academic Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Pass Percentage</span>
                <span className="font-bold text-blue-600">{naac.curricular.passPercentage}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Higher Studies Pursuit</span>
                <span className="font-bold text-green-600">{naac.curricular.higherStudiesPursual}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Digital Literacy Rate</span>
                <span className="font-bold text-purple-600">{naac.infrastructure.digitalLiteracyRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extension Activities */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Extension & Outreach Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">NSS Participants</p>
              <p className="text-xl font-bold text-blue-700">{naac.extension.nssParticipants}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Service Hours</p>
              <p className="text-xl font-bold text-green-700">{naac.extension.communityServiceHours.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Impact Projects</p>
              <p className="text-xl font-bold text-purple-700">{naac.extension.socialImpactProjects}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Environmental Initiatives</p>
              <p className="text-xl font-bold text-orange-700">{naac.extension.environmentalInitiatives}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAICTEMetrics = () => {
    if (!reportData) return null;
    
    const { aicte } = reportData;
    
    return (
      <div className="space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-900">Student Enrollment</h4>
            <p className="text-2xl font-bold text-blue-700">{aicte.academic.studentEnrollment.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-900">Placed Students</h4>
            <p className="text-2xl font-bold text-green-700">{aicte.placement.placedStudents.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900">Avg. Salary (LPA)</h4>
            <p className="text-2xl font-bold text-purple-700">{(aicte.placement.averageSalary / 100000).toFixed(1)}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-900">Patents Published</h4>
            <p className="text-2xl font-bold text-orange-700">{aicte.innovation.patentsPublished}</p>
          </div>
        </div>

        {/* Innovation Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Innovation & Entrepreneurship</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Startups Incubated</span>
                <span className="font-bold text-blue-600">{aicte.innovation.startupIncubated}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Research Publications</span>
                <span className="font-bold text-green-600">{aicte.innovation.researchPublications}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Industry Collaborations</span>
                <span className="font-bold text-purple-600">{aicte.innovation.industryCollaborations}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Faculty-Student Ratio</span>
                <span className="font-bold text-blue-600">1:{Math.round(1/aicte.academic.facultyStudentRatio)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Infrastructure Utilization</span>
                <span className="font-bold text-green-600">{aicte.academic.infrastructureUtilization}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Library Usage</span>
                <span className="font-bold text-purple-600">{aicte.academic.libraryUsage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNIRFMetrics = () => {
    if (!reportData) return null;
    
    const { nirf } = reportData;
    
    return (
      <div className="space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-900">Student Strength</h4>
            <p className="text-2xl font-bold text-blue-700">{nirf.teachingLearning.studentStrength.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-900">Research Publications</h4>
            <p className="text-2xl font-bold text-green-700">{nirf.researchProductivity.publications}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900">PhD Awarded</h4>
            <p className="text-2xl font-bold text-purple-700">{nirf.researchProductivity.phds}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-900">Academic Reputation</h4>
            <p className="text-2xl font-bold text-orange-700">{nirf.perception.academicReputation}%</p>
          </div>
        </div>

        {/* NIRF Parameters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Teaching, Learning & Resources</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Faculty-Student Ratio</span>
                <span className="font-bold text-blue-600">1:{nirf.teachingLearning.facultyStudentRatio}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Graduation Outcome</span>
                <span className="font-bold text-green-600">{nirf.teachingLearning.graduationOutcome}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Placement Rate</span>
                <span className="font-bold text-purple-600">{nirf.teachingLearning.placement}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Outreach & Inclusivity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Diversity & Inclusion</span>
                <span className="font-bold text-blue-600">{nirf.outreach.diversityInclusion}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Economic Impact</span>
                <span className="font-bold text-green-600">{nirf.outreach.economicImpact}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Environmental Impact</span>
                <span className="font-bold text-purple-600">{nirf.outreach.environmentalImpact}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInternalMetrics = () => {
    if (!reportData) return null;
    
    const { internal } = reportData;
    
    const departmentData = Object.keys(internal.departmentWise).map(dept => ({
      name: dept,
      students: internal.departmentWise[dept].totalStudents,
      participation: internal.departmentWise[dept].activeParticipation,
      achievements: internal.departmentWise[dept].achievements,
    }));

    return (
      <div className="space-y-6">
        {/* Department-wise Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Department-wise Performance
          </h3>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{dept.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Students</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${(dept.students / 200) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dept.students}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Participation</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${(dept.participation / 95) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dept.participation}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Achievements</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                          style={{ width: `${(dept.achievements / 25) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dept.achievements}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Monthly Activity Trends
          </h3>
          <div className="space-y-4">
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Posts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Approvals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Participation</span>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-6">
              {internal.monthlyTrends.map((trend, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs text-gray-500">{trend.month}</div>
                  <div className="space-y-1">
                    <div className="bg-gray-100 rounded p-2">
                      <div className="text-xs text-blue-600">Posts</div>
                      <div className="font-semibold text-blue-700">{trend.posts}</div>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                      <div className="text-xs text-green-600">Approvals</div>
                      <div className="font-semibold text-green-700">{trend.approvals}</div>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                      <div className="text-xs text-yellow-600">Participation</div>
                      <div className="font-semibold text-yellow-700">{trend.participation}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Top Performing Students</h3>
            <div className="space-y-3">
              {internal.topPerformers.students.map((student, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.department}</p>
                  </div>
                  <span className="font-bold text-blue-600">{student.achievements} achievements</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Department Engagement Rates</h3>
            <div className="space-y-3">
              {internal.topPerformers.departments.map((dept, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-gray-600">{dept.achievements} total achievements</p>
                  </div>
                  <span className="font-bold text-green-600">{dept.engagement}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeReportType) {
      case 'NAAC':
        return renderNAACMetrics();
      case 'AICTE':
        return renderAICTEMetrics();
      case 'NIRF':
        return renderNIRFMetrics();
      case 'Internal':
        return renderInternalMetrics();
      default:
        return renderNAACMetrics();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating analytics report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Institutional Analytics & Reporting</h2>
            <p className="text-gray-600">Comprehensive analytics for NAAC, AICTE, NIRF & internal evaluations</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Report Type Selector */}
            <select
              value={activeReportType}
              onChange={(e) => setActiveReportType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="NAAC">NAAC Report</option>
              <option value="AICTE">AICTE Report</option>
              <option value="NIRF">NIRF Report</option>
              <option value="Internal">Internal Analytics</option>
            </select>
            
            {/* Export Buttons */}
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Report Information */}
      {reportData && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-gray-600">
              Report Period: {new Date(reportData.reportPeriod.startDate).toLocaleDateString()} - {new Date(reportData.reportPeriod.endDate).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600">
              Generated: {new Date(reportData.generatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;