import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { FacultyDashboard } from './FacultyDashboard';
import { OrganizationDashboard } from './OrganizationDashboard';
import { dummyPosts } from '../data/dummyData';

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Render different dashboards based on user role
  if (user.role === 'faculty') {
    return <FacultyDashboard />;
  }

  if (user.role === 'organization') {
    return <OrganizationDashboard />;
  }

  // Student dashboard (default LinkedIn-style layout)
  // Filter posts based on user's role and permissions
  const getFilteredPosts = () => {
    switch (user.role) {
      case 'student':
        return dummyPosts.filter(post => 
          post.visibility === 'public' || 
          (post.visibility === 'organization' && post.author.organization === 'GEC Bilaspur')
        );
      default:
        return dummyPosts.filter(post => post.visibility === 'public');
    }
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <LeftSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              {/* Create Post Component */}
              <CreatePost />

              {/* Sort Options */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Latest Updates</h3>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="relevant">Most Relevant</option>
                  </select>
                </div>
              </div>

              {/* Posts Feed */}
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to share your achievement!</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="text-center py-4">
                  <button className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Load more posts
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
