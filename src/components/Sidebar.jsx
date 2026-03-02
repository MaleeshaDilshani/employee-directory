import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-64 bg-linear-to-b from-orange-500 to-orange-600 text-white p-5 hidden md:block shadow-2xl">

      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-wide">
          Work<span className="text-yellow-200">Nest</span>
        </h2>
        <div className="h-1 w-16 bg-yellow-200 mt-2 rounded-full"></div>
      </div>

      <ul className="space-y-3">

        {/* Dashboard – Both Admin & Employee */}
        <li>
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/directory"
            className="block px-3 py-2 rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Employee Directory
          </Link>
        </li>

        <li>
          <Link
            to="/leave"
            className="block px-3 py-2 rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Leave Requests
          </Link>
        </li>

        <li>
          <Link
            to="/news"
            className="block px-3 py-2 rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Company News
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-white text-orange-600 py-2 rounded-lg font-semibold hover:bg-yellow-100 transition"
          >
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;