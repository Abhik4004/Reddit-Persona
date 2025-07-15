import React from 'react';
import { Brain, MessageCircle, FileText, User } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const steps = [
    { icon: FileText, text: 'Scraping Reddit posts...', delay: 0 },
    { icon: MessageCircle, text: 'Analyzing comments...', delay: 1 },
    { icon: Brain, text: 'Generating persona...', delay: 2 },
    { icon: User, text: 'Finalizing profile...', delay: 3 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Reddit Profile</h2>
        <p className="text-gray-600">
          This may take a few minutes while we process the user's activity...
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
              index === 0 ? 'bg-orange-50 border-2 border-orange-200' : 'bg-gray-50'
            }`}
            style={{
              animationDelay: `${step.delay}s`,
            }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              index === 0 ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className={`font-medium ${
                index === 0 ? 'text-orange-900' : 'text-gray-600'
              }`}>
                {step.text}
              </p>
            </div>
            {index === 0 && (
              <div className="w-6 h-6 animate-spin rounded-full border-2 border-orange-600 border-t-transparent"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is a MVP demo. In production, this would connect to a backend service 
          that handles Reddit API integration, data processing, and AI-powered persona generation.
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;