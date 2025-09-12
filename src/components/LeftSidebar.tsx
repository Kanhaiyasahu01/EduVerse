import { useAuthStore } from '../store/authStore';
import { GraduationCap, User, Award, Users, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LeftSidebar: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  const getRoleIcon = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'student':
        return <GraduationCap size={20} className="text-blue-500" />;
      case 'faculty':
        return <User size={20} className="text-green-500" />;
      case 'organization':
        return <div className="w-5 h-5 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">O</div>;
      default:
        return <User size={20} />;
    }
  };

  const stats = [
    { icon: Award, label: 'Achievements', value: '12' },
    { icon: Users, label: 'Connections', value: '89' },
    { icon: BookOpen, label: 'Certificates', value: '5' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* User Profile Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-4">
          <div className="relative -mt-8 mb-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-full border-4 border-white bg-white"
            />
          </div>
          
          <div className="text-center">
            <Link to="/profile" className="block">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600">{user?.name}</h3>
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-2">
              {getRoleIcon()}
              <span className="text-sm text-gray-600 capitalize">{user?.role}</span>
            </div>
            {user?.organizationId && (
              <p className="text-sm text-gray-500 mb-3">GEC Bilaspur</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-100 px-6 py-4">
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <stat.icon size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">{stat.label}</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-100 px-6 py-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Link to="/posts" className="w-full block text-left text-sm text-blue-600 hover:text-blue-700 py-1">
            <FileText size={14} className="inline mr-2" />
            Browse Posts
          </Link>
          <Link to="/profile" className="w-full block text-left text-sm text-blue-600 hover:text-blue-700 py-1">
            <User size={14} className="inline mr-2" />
            View Profile
          </Link>
          <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1">
            Add Achievement
          </button>
          <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1">
            Connect with Peers
          </button>
        </div>
      </div>
    </div>
  );
};
