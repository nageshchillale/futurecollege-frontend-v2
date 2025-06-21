import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
          About <span className="text-black">FutureCollege.com</span>
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            {/* Intro */}
            <p className="text-lg text-gray-700 mb-6">
              <strong>FutureCollege.com</strong> is your trusted companion for finding the perfect engineering college 
              for <strong>Direct Second Year Engineering (DSE)</strong> admissions. We understand how critical 
              and confusing the college selection process can be, and we’re here to make it simple and stress-free.
            </p>

            {/* Mission */}
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">🎯 Our Mission</h2>
            <p className="text-gray-700 mb-6">
              To simplify the college selection process by providing accurate, data-driven predictions 
              and authentic student reviews — empowering every learner to make informed academic decisions.
            </p>

            {/* What We Offer */}
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">📦 What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>🔍 AI-powered college prediction based on your diploma marks and category</li>
              <li>🏫 Access to a comprehensive database of engineering colleges across Maharashtra</li>
              <li>⭐ Verified reviews and ratings by current students and alumni</li>
              <li>📊 College insights — cutoff ranks, fees, facilities, and more</li>
              <li>🤝 Personalized recommendations for your profile</li>
            </ul>

            {/* Future Scope */}
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">🚀 Future Scope</h2>
            <p className="text-gray-700 mb-4">
              While we currently focus on Direct Second Year Engineering admissions, we’re actively working toward 
              scaling the platform for more entrance exams and domains. Our upcoming expansions include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>📘 MHT-CET predictions for Engineering, Pharmacy & Agriculture</li>
              <li>🧠 JEE (Main & Advanced) college prediction and IIT explorer</li>
              <li>🩺 NEET UG/PG support for medical & dental colleges</li>
              <li>⚖️ Law admissions including CLAT & MH-CET Law</li>
              <li>💊 Pharmacy and Allied Health Sciences counseling</li>
              <li>📚 Career guidance tools, personality assessments, and more</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Our vision is to become India’s most student-centric, intelligent, and reliable 
              platform for college admissions and career planning.
            </p>

            {/* CTA Button */}
            <div className="text-center">
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* ✅ Footer placed at the bottom */}
    </div>
  );
}
