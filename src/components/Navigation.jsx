import React from 'react';

export default function Navigation({ currentPage, setCurrentPage }) {
  return (
    <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => setCurrentPage('home')}>
        Futurecollege.com
      </div>
      <nav className="flex space-x-8">
        {['home', 'colleges', 'reviews', 'about'].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`transition-colors font-medium ${
              currentPage === page ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {page === 'home' ? 'Home' :
             page === 'colleges' ? 'Colleges' :
             page === 'reviews' ? 'Reviews' : 'About Us'}
          </button>
        ))}
      </nav>
    </header>
  );
}
