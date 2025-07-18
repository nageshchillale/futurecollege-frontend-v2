import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, BarChart2 } from 'lucide-react';

// Format category names for user-friendly display
const formatCategoryName = (category) => {
  switch (category) {
    case 'GOPEN': return 'General Open';
    case 'GSC': return 'General SC';
    case 'GNTA': return 'General NTA';
    case 'GOBC': return 'General OBC';
    case 'LOPEN': return 'Ladies Open';
    case 'LOBC': return 'Ladies OBC';
    case 'EWS': return 'EWS';
    case 'GST': return 'General ST';
    case 'GSEBC': return 'General SEBC';
    default: return category;
  }
};

export default function CollegePage() {
  const [collegeData, setCollegeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-25');

  const [selectedInstituteName, setSelectedInstituteName] = useState(null);

  // ✅ Fetch data when year changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSelectedInstituteName(null); // Reset selected institute when year changes

      try {
       const response = await fetch(`${process.env.REACT_APP_API}/api/cutoffs/${selectedYear}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCollegeData(data);
      } catch (err) {
        setError(`Failed to fetch data for ${selectedYear}. Please try again.`);
        console.error("Error fetching college data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const allFilteredColleges = collegeData.filter(college =>
    college.institute.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const uniqueInstituteNames = [...new Set(allFilteredColleges.map(college => college.institute))].sort();

  const branchesOfSelectedInstitute = collegeData.filter(college =>
    college.institute === selectedInstituteName &&
    (selectedCourse === '' || college.course === selectedCourse) &&
    (selectedCategory === '' || Object.keys(college.cutoffs).includes(selectedCategory))
  );

  const uniqueCourses = [''].concat([...new Set(collegeData.map(college => college.course))].sort());
  const uniqueCategories = [''].concat([...new Set(collegeData.flatMap(college => Object.keys(college.cutoffs)))].sort());

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 font-inter">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-blue-700 text-lg font-semibold">Loading college data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-red-50 font-inter">
        <div className="text-center p-6 bg-white rounded-lg shadow-xl border border-red-200">
          <p className="text-xl text-red-600 font-bold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()} // Simple reload to re-fetch
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-[calc(100vh-80px)] font-inter">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
          <span className="text-indigo-800">
            Colleges & respective Cutoffs
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          Discover detailed cutoff ranks and percentiles for engineering courses across various categories and academic years.
        </p>
      </header>

      {!selectedInstituteName && (
        <section className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 max-w-5xl mx-auto p-5 bg-white shadow-xl rounded-2xl border border-gray-200 animate-fade-in">
          <div className="relative flex-grow w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search college name..."
              className="w-full pl-12 pr-5 py-3.5 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 text-base shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <BarChart2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
            <select
              className="w-full pl-12 pr-9 py-3.5 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 text-base shadow-sm appearance-none"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2024-25">2024-25 Cutoff</option>
              <option value="2023-24">2023-24 Cutoff</option>
            </select>
            <ChevronLeft className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </section>
      )}

      {!selectedInstituteName ? (
        <>
          {uniqueInstituteNames.length === 0 && (
            <p className="text-center text-2xl text-gray-600 mt-12 font-medium">
              No colleges found for "<span className="font-semibold text-blue-700">{searchTerm}</span>" in {selectedYear}.
              <br />Try a different search term or year.
            </p>
          )}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mx-auto max-w-7xl animate-fade-in-up">
            {uniqueInstituteNames.map(instituteName => (
              <div
                key={instituteName}
                className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group flex flex-col justify-between"
                onClick={() => setSelectedInstituteName(instituteName)}
              >
                <div className="p-6 sm:p-7 flex items-center justify-center h-full">
                  <h2 className="text-base sm:text-lg font-bold text-blue-800 text-center group-hover:text-blue-700 transition-colors duration-300 text-wrap">
                    {instituteName}
                  </h2>
                </div>
                <div className="bg-blue-50 px-6 py-3 text-sm text-blue-700 border-t border-blue-100 flex items-center justify-center font-semibold">
                  View Details
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <section className="animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 max-w-7xl mx-auto gap-5 p-4 bg-white shadow-xl rounded-2xl border border-gray-200">
            <button
              onClick={() => {
                setSelectedInstituteName(null);
                setSearchTerm('');
                setSelectedCourse('');
                setSelectedCategory('');
              }}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center self-start sm:self-center font-medium shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Colleges
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center flex-grow">
              <span className="text-blue-700">
                {selectedInstituteName}
              </span> Cutoffs ({selectedYear})
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 self-end sm:self-center w-full sm:w-auto">
              <div className="relative w-full">
                <select
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-700 shadow-sm appearance-none"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">All Branches</option>
                  {uniqueCourses.map((course) =>
                    course && <option key={course} value={course}>{course}</option>
                  )}
                </select>
                <ChevronLeft className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <div className="relative w-full">
                <BarChart2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-700 shadow-sm appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((category) =>
                    category && <option key={category} value={category}>{formatCategoryName(category)}</option>
                  )}
                </select>
                <ChevronLeft className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {branchesOfSelectedInstitute.length === 0 ? (
            <p className="text-center text-2xl text-gray-600 mt-12 font-medium">
              No branches found matching your filters for this college.
              <br />Try adjusting your course or category selections.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mx-auto max-w-7xl animate-fade-in-up">
              {branchesOfSelectedInstitute.map((entry) => (
                <div
                  key={`${entry.choice_code}-${selectedYear}`}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6 sm:p-7 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-1 leading-tight">
                        {entry.course}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <span className="font-medium mr-1">Choice Code:</span> {entry.choice_code}
                      </p>
                    </div>
                    <div className="p-2 rounded-full text-blue-700 hidden sm:block">
                      {/* Placeholder - could add a small icon or just remove the div if empty */}
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <BarChart2 className="w-5 h-5 mr-2 text-blue-500" /> Cutoff Details
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Percentile</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {Object.entries(entry.cutoffs).map(([category, data]) => (
                            <tr key={category} className="hover:bg-blue-50 transition-colors duration-150 odd:bg-white even:bg-gray-50">
                              <td className="px-6 py-3 text-sm font-medium text-gray-900">{formatCategoryName(category)}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{data.rank}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{data.percent}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}