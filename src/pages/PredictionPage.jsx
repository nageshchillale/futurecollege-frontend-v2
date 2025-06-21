import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Target, Search, BookOpen, Users, Award, TrendingUp, Calendar } from 'lucide-react';
import Footer from '../components/Footer';

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    percentage: '',
    category: 'OPEN',
    branch: '',
    gender: 'G',
    tolerance: 1.0,
  });

  const [branches, setBranches] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch available branches on page load
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cutoffs/branches');
        setBranches(response.data);
      } catch (err) {
        console.error('Error fetching branches:', err);
      }
    };

    fetchBranches();
  }, []);

  // Form change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:8080/api/cutoffs/predict', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          category: formData.category,
          branch: formData.branch,
          percent: formData.percentage,
          gender: formData.gender,
          tolerance: formData.tolerance,
        },
      });

      setResults(response.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data); // From GlobalExceptionHandler or validation
      } else if (err.response && err.response.status === 204) {
        setError('No colleges found for the given inputs.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'OPEN', label: 'General (OPEN)' },
    { value: 'OBC', label: 'Other Backward Classes' },
    { value: 'SC', label: 'Scheduled Caste' },
    { value: 'ST', label: 'Scheduled Tribe' },
    { value: 'EWS', label: 'Economically Weaker Section' },
    { value: 'SEBC', label: 'Socially & Educationally Backward Classes'},
    { value: 'NTB', label: 'Nomadic Tribe B' },
    { value: 'NTC', label: 'Nomadic Tribe C'},
    { value: 'NTD', label: 'Nomadic Tribe D'},
    { value: 'NTA', label: 'Nomadic Tribe A' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-8">
                
                <h2 className="text-lg font-bold text-gray-800">Discover Your Perfect Match</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Percentage Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Percentage Score *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                      required
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="Enter your percentage"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg font-medium outline-none"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg appearance-none bg-white outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Gender Selection */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="flex space-x-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="G"
                        checked={formData.gender === 'G'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-3 border-2 rounded-xl text-center transition-all duration-300 ${
                        formData.gender === 'G' 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                       
                        <div className="font-medium">Male</div>
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="L"
                        checked={formData.gender === 'L'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-3 border-2 rounded-xl text-center transition-all duration-300 ${
                        formData.gender === 'L' 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        
                        <div className="font-medium">Female</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Branch Selection */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Branch *
                  </label>
                  <div className="relative">
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg appearance-none bg-white outline-none"
                    >
                      <option value="">-- Select Your Branch --</option>
                      {branches.map((branch, index) => (
                        <option key={index} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                </div>

                {/* Tolerance */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tolerance Range (± %)
                  </label>
                  <input
                    type="number"
                    name="tolerance"
                    value={formData.tolerance}
                    onChange={handleChange}
                    step="0.1"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Your Profile...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>Predict Colleges</span>
                    </div>
                  )}
                </button>
              </form>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">How It Works</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600 font-bold text-xs">1</span>
                  </div>
                  <p>Enter your academic percentage and personal details</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600 font-bold text-xs">2</span>
                  </div>
                  <p>Select your preferred branch and category</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600 font-bold text-xs">3</span>
                  </div>
                  <p>Get personalized college recommendations</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5" />
                <h3 className="text-lg font-bold">Quick Tips</h3>
              </div>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Higher tolerance gives more college options</li>
                <li>• Check multiple branches for better chances</li>
                <li>• Consider both government and private colleges</li>
                <li>• Apply early to secure your preferred choice</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-8">
                
                <h3 className="text-2xl font-bold text-gray-800">Predicted Colleges</h3>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {results.length} colleges found
                </div>
              </div>

              <div className="grid gap-6">
                {results.map((college, idx) => (
                  <div
                    key={idx}
                    className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-indigo-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            #{idx + 1}
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {college.institute}
                          </h4>
                        </div>
                        <p className="text-gray-600 mb-3 text-lg">{college.course}</p>
                        <div className="flex flex-wrap gap-3">
                          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            Choice Code: {college.choice_code}
                          </div>
                          {college.cutoffPercent && (
                            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              Cutoff: {college.cutoffPercent}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 font-medium">Loading predictions...</span>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}