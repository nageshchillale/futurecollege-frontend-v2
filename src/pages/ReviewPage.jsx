import React from 'react';
import Navigation from '../components/Navigation';

export default function ReviewPage({ currentPage, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Student Reviews</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Reviews Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're working on bringing you authentic reviews from students and alumni. 
            This feature will be available soon.
          </p>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}