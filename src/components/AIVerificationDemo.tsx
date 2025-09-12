import React, { useState } from 'react';
import SmartVerificationPanel from './SmartVerificationPanel';
import { Brain, FileText } from 'lucide-react';

const AIVerificationDemo: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  
  const samplePost = {
    id: 'demo-1',
    title: 'NSS Blood Donation Camp Volunteer',
    content: `I participated as a volunteer in the Blood Donation Camp organized by NSS unit of our college on March 15, 2024. The event was held in collaboration with Red Cross Society. I helped in registration of donors, managed the refreshment counter, and assisted medical staff throughout the day. We successfully collected 150 units of blood. This was a great opportunity to serve the community and save lives. I received a certificate of appreciation for my dedicated service.`,
    category: 'NSS',
    attachments: [
      { name: 'nss_certificate.pdf', type: 'certificate' },
      { name: 'blood_camp_photo.jpg', type: 'photo' }
    ],
    author: {
      name: 'Rahul Sharma',
      year: 3,
      department: 'Computer Science',
      previousActivities: ['Environmental awareness drive', 'Tree plantation']
    }
  };

  const handleDemoDecision = (decision: 'approved' | 'rejected', reason: string) => {
    alert(`Post ${decision}!\nReason: ${reason}`);
    setShowDemo(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Verification System Demo</h2>
          <p className="text-gray-600 mb-6">
            Experience how our AI automatically verifies student posts for authenticity and appropriateness.
          </p>
          
          <button
            onClick={() => setShowDemo(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            <Brain className="w-5 h-5" />
            <span>Try AI Verification Demo</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Sample Post to Verify</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Category:</span>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{samplePost.category}</span>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Title:</span>
              <p className="mt-1 text-gray-900">{samplePost.title}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Content:</span>
              <p className="mt-1 text-gray-700 text-sm leading-relaxed">{samplePost.content}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Attachments:</span>
              <div className="mt-1 space-y-1">
                {samplePost.attachments.map((attachment, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    📎 {attachment.name} ({attachment.type})
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Student:</span>
              <p className="mt-1 text-gray-700 text-sm">
                {samplePost.author.name} - {samplePost.author.year} Year, {samplePost.author.department}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">What the AI will analyze:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Content authenticity and believability</li>
            <li>• Match between content and selected category</li>
            <li>• Consistency with student profile</li>
            <li>• Quality and relevance of attachments</li>
            <li>• Language patterns and details</li>
            <li>• Potential red flags or suspicious elements</li>
          </ul>
        </div>
      </div>

      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <SmartVerificationPanel
              post={samplePost}
              onDecision={handleDemoDecision}
              onClose={() => setShowDemo(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIVerificationDemo;
