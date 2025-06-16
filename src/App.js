import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import CollegePage from './pages/CollegePage';
import ReviewPage from './pages/ReviewPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'colleges': return <CollegePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
      case 'reviews': return <ReviewPage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
      default: return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
    }
  };

  return renderPage();
}