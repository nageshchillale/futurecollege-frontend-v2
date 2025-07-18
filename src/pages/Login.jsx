import React, { useState } from 'react';
import api from '../api'; // ✅ Correct API import
import { useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, BookOpen,Award, Mail, Lock, User, ArrowRight,
  GraduationCap,  Target
} from 'lucide-react';

const AuthPages = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const res = await api.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert(res.data);
        setIsSignUp(false);
      } else {
        const res = await api.login(formData.email, formData.password);
        const token = res.data.token;
        localStorage.setItem('token', token);
        alert("✅ Login successful!");
        navigate('/prediction');
      }
    } catch (err) {
      alert("❌ Error: " + (err.response?.data || err.message));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const FloatingIcon = ({ Icon, className, bgColor, delay = 0 }) => (
    <div
      className={`absolute w-16 h-16 ${bgColor} rounded-full flex items-center justify-center shadow-lg animate-bounce ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Floating Icons */}
      <FloatingIcon Icon={GraduationCap} className="top-20 left-10" bgColor="bg-blue-500" delay={0} />
      <FloatingIcon Icon={BookOpen} className="top-32 right-20" bgColor="bg-green-500" delay={1} />
      <FloatingIcon Icon={Award} className="bottom-32 left-20" bgColor="bg-purple-500" delay={2} />
      <FloatingIcon Icon={Target} className="bottom-20 right-10" bgColor="bg-pink-500" delay={0.5} />

      {/* Background SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M 100 150 Q 300 200 500 180 T 900 200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
        <path d="M 200 300 Q 400 250 600 280 T 1000 250" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
      </svg>

      {/* Form Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Create your account to find the perfect college' : 'Sign in to continue on Futurecollege.com'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute inset-y-0 left-0 pl-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 pl-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 pl-4 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 pr-4 inset-y-0 flex items-center">
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>

              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute inset-y-0 left-0 pl-4 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 pr-4 inset-y-0 flex items-center">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 flex items-center justify-center space-x-2 group">
                <span>{isSignUp ? "LET'S GO" : 'SIGN IN'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button onClick={() => setIsSignUp(!isSignUp)} className="ml-2 text-blue-600 hover:text-blue-500 font-semibold">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
