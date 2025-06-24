import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer'; // ✅ added Footer
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Student Reviews</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Reviews Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're working on bringing you authentic reviews from students and alumni. 
            This feature will be available soon.
          </p>
          <div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
