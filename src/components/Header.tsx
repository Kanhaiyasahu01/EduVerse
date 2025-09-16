import React from 'react';
import { LogIn, UserPlus, LogOut, GraduationCap, Search, Home, Users, Bell, MessageSquare, FileText } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // const getRoleIcon = () => {
  //   if (!user) return null;
    
  //   switch (user.role) {
  //     case 'student':
  //       return <GraduationCap size={16} className="text-blue-500" />;
  //     case 'faculty':
  //       return <User size={16} className="text-green-500" />;
  //     case 'organization':
  //       return <div className="w-4 h-4 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">O</div>;
  //     default:
  //       return <User size={16} />;
  //   }
  // };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4 flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <GraduationCap className="text-white" size={18} />
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:block">EduVerse</span>
            </Link>
            
            {isAuthenticated && (
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          {isAuthenticated && (
            <nav className="flex items-center space-x-1 mx-4">
              <Link
                to="/dashboard"
                className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Home size={20} />
                <span className="text-xs mt-1 hidden sm:block">Home</span>
              </Link>
              <Link
                to="/posts"
                className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/posts') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText size={20} />
                <span className="text-xs mt-1 hidden sm:block">Posts</span>
              </Link>
              <Link
                to="/network"
                className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/network') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users size={20} />
                <span className="text-xs mt-1 hidden sm:block">Network</span>
              </Link>
              <Link
                to="/messages"
                className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/messages') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare size={20} />
                <span className="text-xs mt-1 hidden sm:block">Messages</span>
              </Link>
              <Link
                to="/notifications"
                className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors relative ${
                  isActive('/notifications') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold border-2 border-white">3</span>
                </div>
                <span className="text-xs mt-1 hidden sm:block">Notifications</span>
              </Link>
            </nav>
          )}

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/profile"
                  className={`flex items-center space-x-2 px-2 py-1 rounded-md cursor-pointer transition-colors ${
                    isActive('/profile') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={
                      user?.avatar || 
                      (user?.role === 'organization' 
                        ? 'https://images.unsplash.com/photo-1562774053-701939374585?w=32&h=32&fit=crop'
                        : user?.role === 'faculty'
                        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
                        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                      )
                    }
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-xs hidden sm:block">
                    <p className="font-medium">Me</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 transition-colors p-1"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                >
                  <LogIn size={16} />
                  <span>Sign in</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm"
                >
                  <UserPlus size={16} />
                  <span className="hidden sm:inline">Join now</span>
                  <span className="sm:hidden">Join</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
