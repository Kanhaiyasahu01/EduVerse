import React from 'react';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Welcome to your student dashboard! This is where you can manage your achievements, view your portfolio, and track your progress.</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-blue-800 font-medium">Coming Soon:</p>
          <ul className="text-blue-700 mt-2 space-y-1">
            <li>• Upload and manage achievements</li>
            <li>• Auto-generated digital portfolio</li>
            <li>• Real-time dashboard with analytics</li>
            <li>• Social features and networking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};