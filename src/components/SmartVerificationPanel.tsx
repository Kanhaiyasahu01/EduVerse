import React, { useState, useEffect } from 'react';
import { AIVerificationService, type AIVerificationRequest, type AIVerificationResponse } from '../services/AIVerificationService';
import { CheckCircle, XCircle, AlertTriangle, Brain, TrendingUp, Flag, Lightbulb } from 'lucide-react';

interface SmartVerificationPanelProps {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    attachments?: { name: string; type: string; url?: string }[];
    author: {
      name: string;
      year?: number;
      department?: string;
      previousActivities?: string[];
    };
  };
  onDecision: (decision: 'approved' | 'rejected', reason: string) => void;
  onClose?: () => void;
}

const SmartVerificationPanel: React.FC<SmartVerificationPanelProps> = ({ 
  post, 
  onDecision, 
  onClose 
}) => {
  const [aiResult, setAiResult] = useState<AIVerificationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [manualReason, setManualReason] = useState('');

  useEffect(() => {
    analyzePost();
  }, [post]);

  const analyzePost = async () => {
    setLoading(true);
    try {
      const request: AIVerificationRequest = {
        postContent: `${post.title}\n\n${post.content}`,
        category: post.category,
        attachments: post.attachments || [],
        metadata: {
          studentYear: post.author.year || 2,
          department: post.author.department || 'General',
          previousActivities: post.author.previousActivities || [],
          authorName: post.author.name
        }
      };

      const result = await AIVerificationService.verifyPost(request);
      setAiResult(result);
    } catch (error) {
      console.error('AI verification failed:', error);
    }
    setLoading(false);
  };

  const handleAIDecision = (decision: 'approved' | 'rejected') => {
    if (!aiResult) return;
    
    const reason = decision === 'approved' 
      ? `AI Auto-${decision}: ${aiResult.reasoning}` 
      : `AI Auto-${decision}: ${aiResult.red_flags.join(', ')}`;
    
    onDecision(decision, reason);
  };

  const handleManualDecision = (decision: 'approved' | 'rejected') => {
    const reason = manualReason || `Manually ${decision} by faculty`;
    onDecision(decision, reason);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'approve': return 'text-green-600 bg-green-50 border-green-200';
      case 'reject': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-medium text-gray-700">AI analyzing post...</span>
          </div>
        </div>
        <div className="mt-4 bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            Our AI is examining the content for authenticity, category match, and potential issues. This usually takes a few seconds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Verification Results</h2>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* AI Scores */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${getScoreColor(aiResult?.authenticity_score || 0)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Authenticity Score</p>
                <p className="text-2xl font-bold">{aiResult?.authenticity_score || 0}%</p>
              </div>
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${getScoreColor(aiResult?.category_match || 0)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Category Match</p>
                <p className="text-2xl font-bold">{aiResult?.category_match || 0}%</p>
              </div>
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${getScoreColor(aiResult?.confidence || 0)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">AI Confidence</p>
                <p className="text-2xl font-bold">{aiResult?.confidence || 0}%</p>
              </div>
              <Brain className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className={`p-4 rounded-lg border-2 ${getDecisionColor(aiResult?.auto_decision || 'review')}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {aiResult?.auto_decision === 'approve' && <CheckCircle className="w-6 h-6" />}
              {aiResult?.auto_decision === 'reject' && <XCircle className="w-6 h-6" />}
              {aiResult?.auto_decision === 'review' && <AlertTriangle className="w-6 h-6" />}
              <div>
                <h3 className="font-semibold text-lg">
                  AI Recommends: {aiResult?.auto_decision?.toUpperCase() || 'REVIEW'}
                </h3>
                <p className="text-sm opacity-80">{aiResult?.reasoning}</p>
              </div>
            </div>
            
            {aiResult?.auto_decision === 'approve' && (
              <button
                onClick={() => handleAIDecision('approved')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Auto-Approve
              </button>
            )}
            
            {aiResult?.auto_decision === 'reject' && (
              <button
                onClick={() => handleAIDecision('rejected')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Auto-Reject
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Red Flags and Suggestions */}
      {(aiResult?.red_flags?.length || aiResult?.suggestions?.length) && (
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiResult?.red_flags?.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Flag className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">Issues Detected</h4>
                </div>
                <ul className="space-y-2">
                  {aiResult.red_flags.map((flag, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {aiResult?.suggestions?.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">AI Suggestions</h4>
                </div>
                <ul className="space-y-2">
                  {aiResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual Override */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Decision</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments (Optional)
          </label>
          <textarea
            value={manualReason}
            onChange={(e) => setManualReason(e.target.value)}
            placeholder="Add your reasoning for this decision..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleManualDecision('approved')}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Approve</span>
          </button>
          
          <button
            onClick={() => handleManualDecision('rejected')}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject</span>
          </button>
        </div>

        {/* AI Details Toggle */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showDetails ? 'Hide' : 'Show'} Technical Details
          </button>
          
          {showDetails && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(aiResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartVerificationPanel;
