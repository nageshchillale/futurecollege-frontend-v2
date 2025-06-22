import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Import Link

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden text-sm sm:text-base">
      {/* Decorative Circles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute top-12 right-8 w-14 h-14 border border-white rounded-full"></div>
        <div className="absolute bottom-8 left-1/4 w-8 h-8 border border-white rounded-full"></div>
        <div className="absolute bottom-12 right-1/5 w-10 h-10 border border-white rounded-full"></div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="absolute top-2 right-4 bg-blue-600 hover:bg-blue-700 p-1.5 rounded-full shadow-md transition-all duration-300 hover:scale-110 z-10"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">
                Futurecollege.com
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                Your trusted partner in finding the perfect engineering college.
                We help students make informed decisions about their future with
                accurate predictions and comprehensive college information.
              </p>
            </div>

            <div className="flex space-x-8">
              <a
                href="https://www.instagram.com/nageshh_c.08/"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/nagesh-chillale"
                className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ✅ Quick Links using <Link> */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-blue-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → Home
                </Link>
              </li>
              <li>
                <Link
                  to="/colleges"
                  className="text-gray-300 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → Colleges and Cutoffs
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-gray-300 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 text-xs sm:text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-green-300">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-xs sm:text-sm">
                  Sangli, Maharashtra 436416
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-xs sm:text-sm">
                  <a href="tel:+919730995805" className="hover:text-white transition-colors">
                    +91 9730995805
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300 text-xs sm:text-sm">
                  <a href="mailto:info@futurecollege.com" className="hover:text-white transition-colors">
                    infor.futurecollege@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-base sm:text-lg font-medium mb-2 text-yellow-300">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-xs sm:text-sm"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-r-lg font-semibold transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 pt-4 border-t border-white/10">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 Futurecollege.com. All rights reserved. | Empowering Students, Building Futures.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
