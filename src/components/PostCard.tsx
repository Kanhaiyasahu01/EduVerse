import React from 'react';
import { Heart, MessageCircle, Share2, CheckCircle, Clock, X, MoreHorizontal } from 'lucide-react';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getStatusIcon = () => {
    switch (post.status) {
      case 'approved':
        return <CheckCircle className="text-green-500" size={14} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={14} />;
      case 'rejected':
        return <X className="text-red-500" size={14} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (post.status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <img
              src={post.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                  {post.author.name}
                </h3>
                {post.status === 'approved' && getStatusIcon()}
              </div>
              <p className="text-sm text-gray-500 mb-1">
                {post.author.organization} • {formatDate(post.createdAt)}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                  {post.status === 'approved' ? 'Verified' : post.status}
                </span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className={`${post.images.length === 1 ? '' : 'px-4'}`}>
          <div className={`grid gap-1 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className={`w-full object-cover ${
                  post.images && post.images.length === 1 ? 'h-80' : 'h-48'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Approved by */}
      {post.approvedBy && post.status === 'approved' && (
        <div className="px-4 py-2 text-sm text-gray-600 flex items-center space-x-1 bg-green-50">
          <CheckCircle size={14} className="text-green-500" />
          <span>Verified by {post.approvedBy.name}</span>
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
          </div>
          <div className="text-xs">
            {post.visibility === 'public' ? '🌍 Public' : 
             post.visibility === 'organization' ? '🏢 Organization' : '🔒 Private'}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-around">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors flex-1 justify-center">
            <Heart size={20} />
            <span className="font-medium">Like</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors flex-1 justify-center">
            <MessageCircle size={20} />
            <span className="font-medium">Comment</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors flex-1 justify-center">
            <Share2 size={20} />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
