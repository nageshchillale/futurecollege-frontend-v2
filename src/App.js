import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AuthPages from './pages/Login';
import PredictionPage from './pages/PredictionPage';
import CollegesPage from './pages/CollegesPage';   // ✅ new import
import ReviewsPage from './pages/ReviewPage';     // ✅ new import
import AboutPage from './pages/AboutPage';         // ✅ new import

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-inter">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPages />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/colleges" element={<CollegesPage />} />   {/* ✅ new */}
          <Route path="/reviews" element={<ReviewsPage />} />     {/* ✅ new */}
          <Route path="/about" element={<AboutPage />} />         {/* ✅ new */}
        </Routes>
      </div>
    </Router>
  );
}
