import { useState, useRef } from 'react';
import { Image, Video, FileText, Smile, Send, X, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

export const CreatePost: React.FC = () => {
  const { user } = useAuthStore();
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('public');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error('Please select valid image files');
      return;
    }

    if (selectedImages.length + imageFiles.length > 5) {
      toast.error('You can upload maximum 5 images');
      return;
    }

    setSelectedImages(prev => [...prev, ...imageFiles]);

    // Create preview URLs
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      toast.error('Please enter some content for your post');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would upload images and create the post here
      console.log('Post submission:', {
        content: postContent,
        category,
        visibility,
        images: selectedImages,
        user: user?.name
      });

      // Success notification
      toast.success('🎉 Post submitted successfully! It will be reviewed by faculty.');
      
      // Reset form
      setPostContent('');
      setCategory('');
      setVisibility('public');
      setSelectedImages([]);
      setImagePreviews([]);
      setIsExpanded(false);
      
    } catch (error) {
      console.error('Post submission error:', error);
      toast.error('Failed to submit post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={
            user?.avatar || 
            (user?.role === 'organization' 
              ? 'https://images.unsplash.com/photo-1562774053-701939374585?w=48&h=48&fit=crop'
              : user?.role === 'faculty'
              ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
            )
          }
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
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Image size={18} />
                        <span className="text-sm">Photo</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
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

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category Selection */}
                  <div className="mb-3">
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
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
                    <select 
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
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
                        setCategory('');
                        setVisibility('public');
                        setSelectedImages([]);
                        setImagePreviews([]);
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!postContent.trim() || !category || isSubmitting}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Posting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Post</span>
                        </>
                      )}
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
