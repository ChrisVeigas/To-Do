import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/to-do-list.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { user, token, logout } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const MotionLink = motion.create(Link);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-[#E9F1EF]/80 backdrop-blur-sm z-50 shadow-md">
      <div className="flex items-center gap-2">
        <motion.img
          src={logo}
          alt="To-Do Logo"
          className="w-8 h-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.7 }}
        />
        <span className="text-[#3C5556] font-bold text-xl">To-Do List</span>
      </div>

      <div className="flex gap-6 items-center">
        {token && (
          <MotionLink
            to="/"
            className="text-[#3C5556] hover:text-[#E09789] font-medium px-3 py-1 rounded-md shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Home
          </MotionLink>
        )}

        {!token ? (
          pathname === "/register" ? (
            <MotionLink
              to="/login"
              className="text-[#3C5556] hover:text-[#E09789] font-medium px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Login
            </MotionLink>
          ) : pathname === "/login" ? (
            <MotionLink
              to="/register"
              className="text-[#3C5556] hover:text-[#E09789] font-medium px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Register
            </MotionLink>
          ) : (
            <MotionLink
              to="/register"
              className="text-[#3C5556] hover:text-[#E09789] font-medium px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign In / Sign Up
            </MotionLink>
          )
        ) : (
          <div className="relative">
            <motion.button
              className="flex items-center gap-2 text-[#3C5556] font-medium px-3 py-1 rounded-md bg-white shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>{user?.username || "User"}</span>

              <div className="w-8 h-8 rounded-full bg-[#3C5556] text-white flex items-center justify-center">
                {(user?.username || "U").charAt(0).toUpperCase()}
              </div>
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 text-[#3C5556]"
                >
                  <MotionLink
                    to="/edit-account"
                    className="text-[#3C5556] hover:text-[#E09789] font-medium px-3 py-1 rounded-md shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Edit Account
                  </MotionLink>

                  <button
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => alert("Delete Account functionality not implemented.")}
                  >
                    Delete Account
                  </button>

                  <button
                    className="w-full text-left p-2 hover:bg-red-50 rounded-md text-red-600"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
