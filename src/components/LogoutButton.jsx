import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Remove token from localStorage
    localStorage.removeItem('token');

    // ✅ Navigate to login or homepage
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="
        relative
        flex items-center justify-center
        px-6 py-2
        text-lg font-semibold text-gray-700
        bg-white
        rounded-2xl
        shadow-md
        overflow-hidden
        group
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:text-red-600
        transform hover:-translate-y-0.5
      "
    >
      <span className="relative z-10">Logout</span>
      {/* Background overlay for hover effect */}
      <span className="
        absolute inset-0
        bg-gradient-to-r from-transparent via-green-50 to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      "></span>
    </button>
  );
}