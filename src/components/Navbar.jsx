import { Link } from "react-router-dom";

export default function Navbar() {

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (

    <div className="flex justify-between items-center py-4">

      <h2 className="text-2xl font-bold text-indigo-600">
        Resume Analyzer
      </h2>

      <div className="flex gap-4">

        {token ? (

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>

        ) : (

          <>
            <Link
              to="/login"
              className="bg-indigo-500 text-white px-4 py-2 rounded-xl"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Signup
            </Link>
          </>

        )}

      </div>

    </div>
  );
}