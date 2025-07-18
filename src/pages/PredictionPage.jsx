import React, { useEffect, useState } from 'react';
import api from '../api'; // ✅ Uses custom API methods
import { useNavigate } from 'react-router-dom';
import {  Search, Users, Award, TrendingUp, Calendar } from 'lucide-react';
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

  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch branch list
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.getBranches(); // ✅ FIXED
        setBranches(response.data);
      } catch (err) {
        console.error('Error fetching branches:', err);
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setResults([]);
  setLoading(true);

  console.log('API BASE URL:', process.env.REACT_APP_API); // ✅ Log inside submit

  try {
    const token = localStorage.getItem('token');
    const response = await api.predict({
      category: formData.category,
      branch: formData.branch,
      percent: formData.percentage,
      gender: formData.gender,
      tolerance: formData.tolerance,
    }, token);

    setResults(response.data);
  } catch (err) {
    if (err.response?.status === 400) {
      setError(err.response.data);
    } else if (err.response?.status === 204) {
      setError('No colleges found for the given inputs.');
    } else {
      console.error('API Error:', err);
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
    { value: 'SEBC', label: 'Socially & Educationally Backward Classes' },
    { value: 'NTB', label: 'Nomadic Tribe B' },
    { value: 'NTC', label: 'Nomadic Tribe C' },
    { value: 'NTD', label: 'Nomadic Tribe D' },
    { value: 'NTA', label: 'Nomadic Tribe A' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-8">
                Discover Your Perfect Match
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Percentage */}
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-700">
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
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-indigo-500 focus:ring-indigo-200 focus:ring-2 transition-all outline-none"
                    />
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-700">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-indigo-500 focus:ring-indigo-200 focus:ring-2 bg-white outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-700">
                    Gender
                  </label>
                  <div className="flex gap-3">
                    {['G', 'L'].map((g) => (
                      <label key={g} className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-3 text-center rounded-xl border-2 transition-all ${
                          formData.gender === g
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-500'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="font-medium">{g === 'G' ? 'Male' : 'Female'}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Branch */}
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-700">
                    Preferred Branch *
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg bg-white outline-none focus:border-indigo-500 focus:ring-indigo-200 focus:ring-2"
                  >
                    <option value="">-- Select Your Branch --</option>
                    {branches.map((branch, idx) => (
                      <option key={idx} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                {/* Tolerance */}
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-700">
                    Tolerance Range (± %)
                  </label>
                  <input
                    type="number"
                    name="tolerance"
                    value={formData.tolerance}
                    onChange={handleChange}
                    step="0.1"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg outline-none focus:border-indigo-500 focus:ring-indigo-200 focus:ring-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Your Profile...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Search className="w-5 h-5" />
                      Predict Colleges
                    </span>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 p-2 rounded-full">
                  <Award className="text-white w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">How It Works</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Enter your academic percentage and personal details</li>
                <li>• Select your preferred branch and category</li>
                <li>• Get personalized college recommendations</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5" />
                <h3 className="text-lg font-bold">Quick Tips</h3>
              </div>
              <ul className="text-sm opacity-90 space-y-2">
                <li>• Higher tolerance gives more college options</li>
                <li>• Check multiple branches for better chances</li>
                <li>• Consider both government and private colleges</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Predicted Results */}
        {results.length > 0 && (
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Predicted Colleges</h3>
              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                {results.length} colleges found
              </span>
            </div>
            <div className="grid gap-6">
              {results.map((college, idx) => (
                <div key={idx} className="p-6 border-2 border-gray-100 rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1">
                  <h4 className="text-xl font-bold text-gray-800">{college.institute}</h4>
                  <p className="text-gray-600 mb-2">{college.course}</p>
                  <div className="flex gap-3 flex-wrap">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Choice Code: {college.choice_code}</span>
                    {college.cutoffPercent && (
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Cutoff: {college.cutoffPercent}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loader */}
        {loading && results.length === 0 && (
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow">
              <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 font-medium">Loading predictions...</span>
            </span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
console.log('API BASE URL:', process.env.REACT_APP_API);
