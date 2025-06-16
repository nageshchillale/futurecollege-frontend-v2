import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { MapPin } from 'lucide-react';

export default function CollegePage({ currentPage, setCurrentPage }) {
  const [formData, setFormData] = useState({ percentage: '', category: '', location: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.percentage || !formData.category) {
      alert('Please fill in required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const mockResults = [
        {
          name: "College of Engineering Pune",
          location: "Pune, Maharashtra",
          cutoff: 85,
          probability: 75
        },
        {
          name: "Government College of Engineering",
          location: "Aurangabad, Maharashtra",
          cutoff: 78,
          probability: 85
        },
        {
          name: "Walchand College of Engineering",
          location: "Sangli, Maharashtra",
          cutoff: 82,
          probability: 65
        }
      ];
      setResults(mockResults);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Find Your Perfect Engineering College</h1>

        {/* Prediction Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diploma Percentage *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.percentage}
                onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your diploma percentage"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                <option value="OPEN">Open</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="SEBC">SEBC</option>
                <option value="NT">NT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter preferred location (optional)"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Predicting...' : 'Predict Colleges'}
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Predicted Colleges for You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((college, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">{college.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{college.location}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cutoff:</span>
                      <span className="text-sm font-medium">{college.cutoff}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Probability:</span>
                      <span className={`text-sm font-bold ${
                        college.probability >= 70
                          ? 'text-green-600'
                          : college.probability >= 50
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {college.probability}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          college.probability >= 70
                            ? 'bg-green-500'
                            : college.probability >= 50
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${college.probability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
