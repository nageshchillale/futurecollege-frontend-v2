import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentPage = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/colleges') return 'colleges';
    if (location.pathname === '/reviews') return 'reviews';
    if (location.pathname === '/about') return 'about';
    return '';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const currentPage = getCurrentPage();

  return (
    <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-black-50">
      <div
        className="text-2xl font-bold text-gray-800 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Futurecollege.com
      </div>
      <div className="flex items-center space-x-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => navigate('/')}
            className={`transition-colors font-medium ${
              currentPage === 'home'
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/colleges')}
            className={`transition-colors font-medium ${
              currentPage === 'colleges'
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Colleges & Cutoffs
          </button>
          <button
            onClick={() => navigate('/reviews')}
            className={`transition-colors font-medium ${
              currentPage === 'reviews'
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => navigate('/about')}
            className={`transition-colors font-medium ${
              currentPage === 'about'
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            About Us
          </button>
        </nav>

        {/* 🔴 Logout Button */}
         <button
      onClick={handleLogout}
      className="
        relative flex items-center gap-2 px-4 py-2
        text-white text-base font-semibold
        bg-blue-800 rounded-lg shadow-md
        overflow-hidden group
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:bg-red-700
        transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
      "
    >
      {/* Icon with dynamic styling */}
      <LogOut size={18} className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
      <span className="relative z-10">Logout</span>
      {/* Subtle background swipe on hover */}
      <span className="
        absolute inset-0 block
        bg-gradient-to-r from-transparent via-red-600/20 to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      "></span>
    </button>
      </div>
    </header>
  );
}
