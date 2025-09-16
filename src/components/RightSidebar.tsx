import { Brain, Target, BookOpen, Award, TrendingUp, Lightbulb, Star } from 'lucide-react';

export const RightSidebar: React.FC = () => {

  // AI-powered achievement suggestions
  const aiSuggestions = [
    { 
      title: 'Complete Google Cloud Certification', 
      reason: 'Based on your technical interests',
      difficulty: 'Medium',
      points: '+50 pts'
    },
    { 
      title: 'Participate in Hackathon', 
      reason: 'Popular among your peers',
      difficulty: 'Hard',
      points: '+100 pts'
    },
    { 
      title: 'Publish Research Paper', 
      reason: 'Next step in your journey',
      difficulty: 'Hard',
      points: '+150 pts'
    },
  ];

  // Achievement categories to explore
  const categorySuggestions = [
    { name: 'AI/ML Certifications', trending: true, count: '234 new this month' },
    { name: 'Open Source Contributions', trending: true, count: '156 new this month' },
    { name: 'Leadership Roles', trending: false, count: '89 new this month' },
    { name: 'Research Publications', trending: true, count: '67 new this month' },
  ];

  // Skills in demand
  const skillsDemand = [
    { skill: 'Machine Learning', demand: 95, growth: '+12%' },
    { skill: 'React Development', demand: 88, growth: '+8%' },
    { skill: 'Data Science', demand: 92, growth: '+15%' },
    { skill: 'Cloud Computing', demand: 85, growth: '+10%' },
  ];

  // Achievement leaderboard
  const leaderboard = [
    { rank: 1, name: 'Kanhaiya', points: 1250, avatar: '/assets/Profile.jpg' },
    { rank: 2, name: 'Abhinav', points: 1180, avatar: '/assets/abhinav.jpg' },
    { rank: 3, name: 'Apoorva', points: 1050, avatar: '/assets/apporva.jpg' },
  ];

  return (
    <div className="space-y-4">
      {/* AI Achievement Suggestions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-2">
            <Brain size={18} className="text-purple-600" />
            <h3 className="font-semibold text-gray-900">AI Recommendations</h3>
            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">Powered by AI</span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{suggestion.title}</h4>
                  <span className="text-xs text-purple-600 font-medium">{suggestion.points}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{suggestion.reason}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    suggestion.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                    suggestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {suggestion.difficulty}
                  </span>
                  <Target size={12} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
            View all recommendations
          </button>
        </div>
      </div>

      {/* Skills in Demand */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <TrendingUp size={18} className="text-green-600" />
            <h3 className="font-semibold text-gray-900">Skills in Demand</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {skillsDemand.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.skill}</span>
                  <span className="text-xs text-green-600 font-medium">{item.growth}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                    style={{ width: `${item.demand}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Leaderboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Award size={18} className="text-yellow-600" />
            <h3 className="font-semibold text-gray-900">Monthly Leaders</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {leaderboard.map((leader) => (
              <div key={leader.rank} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    leader.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    leader.rank === 2 ? 'bg-gray-100 text-gray-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {leader.rank}
                  </span>
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{leader.name}</h4>
                  <p className="text-xs text-gray-500">{leader.points} points</p>
                </div>
                {leader.rank === 1 && <Star size={14} className="text-yellow-500" />}
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
            View full leaderboard
          </button>
        </div>
      </div>

      {/* Achievement Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Lightbulb size={18} className="text-orange-600" />
            <h3 className="font-semibold text-gray-900">Achievement Insights</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 font-medium mb-1">Portfolio Strength</p>
              <p className="text-xs text-blue-700">Your technical achievements are 85% stronger than average</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-900 font-medium mb-1">Trending Achievement</p>
              <p className="text-xs text-green-700">AI/ML certifications are up 45% this month</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-900 font-medium mb-1">Career Tip</p>
              <p className="text-xs text-purple-700">Add open-source contributions to boost your profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <BookOpen size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900">Trending Categories</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {categorySuggestions.map((category, index) => (
              <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                  {category.trending && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">🔥 Trending</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
