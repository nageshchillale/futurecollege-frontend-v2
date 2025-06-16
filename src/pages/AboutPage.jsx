import React from 'react';
import Navigation from '../components/Navigation';

export default function AboutPage({ currentPage, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">About FutureCollege.com</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              FutureCollege.com is your trusted companion for finding the perfect engineering college 
              for Direct Second Year Engineering admissions. We understand that choosing the right 
              college is one of the most important decisions in your academic journey.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              To simplify the college selection process by providing accurate, data-driven predictions 
              and authentic reviews, helping students make informed decisions about their engineering education.
            </p>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>AI-powered college prediction based on your academic performance</li>
              <li>Comprehensive database of engineering colleges</li>
              <li>Authentic student reviews and ratings</li>
              <li>Detailed college information and statistics</li>
              <li>Personalized recommendations</li>
            </ul>
            <div className="text-center">
              <button 
                onClick={() => setCurrentPage('colleges')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Start Your College Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}