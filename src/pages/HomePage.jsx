import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // 🟢 Add this
import { ArrowRight, Search, BookOpen, Users, GraduationCap, Star, TrendingUp } from 'lucide-react';

export default function HomePage({ currentPage, setCurrentPage }) {
  const navigate = useNavigate(); // 🟢 Hook to programmatically navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/prediction'); // ✅ Go to prediction page
    } else {
      navigate('/login'); // 🚪 Go to login/signup
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex items-center justify-between px-8 py-16 max-w-7xl mx-auto">
  <div className="flex-1 max-w-2xl relative">
    <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
      Find Your Best-Fit<br />
      <span className="text-gray-800">Engineering College</span>
    </h1>

    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
      Effortlessly predict which colleges you can get into for Direct Second Year Engineering 
      based on your diploma percentage, category, and preferences. No complex filters - 
      just fast, accurate, and personalized results.
    </p>

    <form onSubmit={handleSubmit}>
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <span>LET’S GO</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>

    {/* ✅ Moved inside the same div */}
    <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-cyan-400 rounded-full animate-bounce"></div>
  </div>

        {/* Right Illustration */}
        <div className="flex-1 relative">
          <div className="relative w-full h-96">
            <div className="absolute top-0 right-0 w-32 h-20 bg-blue-100 rounded-full opacity-60"></div>
            <div className="absolute top-10 right-20 w-24 h-16 bg-purple-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-20 right-0 w-28 h-18 bg-blue-100 rounded-full opacity-40"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-64 h-48 bg-white rounded-lg shadow-2xl border-4 border-blue-200 transform rotate-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white rounded-lg">
                    <div className="p-4">
                      <div className="h-2 bg-blue-200 rounded mb-3"></div>
                      <div className="h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 bg-blue-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-8 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg floating-element">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg floating-element-delayed">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-4 -right-8 w-14 h-14 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg floating-element-delayed-2">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>

                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-1 h-8 bg-blue-600 transform rotate-45 origin-top absolute top-12 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </div>

            <div className="absolute top-4 left-8 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-4 w-6 h-6 bg-pink-400 rounded-full bounce-delayed"></div>
            <div className="absolute top-16 right-8 w-10 h-10 bg-green-400 rounded-full pulse-delayed"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FutureCollege.com ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Prediction</h3>
              <p className="text-gray-600">AI-powered college prediction based on your diploma percentage and category</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Results</h3>
              <p className="text-gray-600">Get precise admission probability for Direct Second Year Engineering</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
              <p className="text-gray-600">Read authentic reviews from current students and alumni</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          .floating-element {
            animation: float 3s ease-in-out infinite;
          }
          .floating-element-delayed {
            animation: float 3s ease-in-out infinite;
            animation-delay: 1s;
          }
          .floating-element-delayed-2 {
            animation: float 3s ease-in-out infinite;
            animation-delay: 2s;
          }
          .bounce-delayed {
            animation: bounce 2s infinite;
            animation-delay: 1.5s;
          }
          .pulse-delayed {
            animation: pulse 2s infinite;
            animation-delay: 0.5s;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-25%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      <Footer /> {/* ✅ Footer placed at the bottom */}
    </div>
  );
}
