import { useState } from 'react';
import { Image, Video, FileText, Smile, Send } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const CreatePost: React.FC = () => {
  const { user } = useAuthStore();
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission here
    console.log('Post content:', postContent);
    setPostContent('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'}
          alt={user?.name || 'User'}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div 
              className={`border border-gray-300 rounded-lg transition-all duration-200 ${
                isExpanded ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder="Share your achievement or experience..."
                className="w-full p-3 border-none rounded-lg resize-none focus:outline-none"
                rows={isExpanded ? 4 : 1}
              />
              
              {isExpanded && (
                <div className="border-t border-gray-200 p-3">
                  {/* Media Options */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Image size={18} />
                        <span className="text-sm">Photo</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Video size={18} />
                        <span className="text-sm">Video</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <FileText size={18} />
                        <span className="text-sm">Document</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Smile size={18} />
                        <span className="text-sm">Achievement</span>
                      </button>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="mb-3">
                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select Category</option>
                      <option value="technical">Technical</option>
                      <option value="sports">Sports</option>
                      <option value="cultural">Cultural</option>
                      <option value="nss">NSS</option>
                      <option value="research">Research</option>
                      <option value="certification">Certification</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  {/* Visibility Selection */}
                  <div className="mb-3">
                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="public">🌍 Public - Anyone can see</option>
                      <option value="organization">🏢 Organization - Only GEC Bilaspur</option>
                      <option value="private">🔒 Private - Only me</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setIsExpanded(false);
                        setPostContent('');
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!postContent.trim()}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md transition-colors"
                    >
                      <Send size={16} />
                      <span>Post</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
