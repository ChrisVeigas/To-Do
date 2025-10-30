import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/to-do-list.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const { user, token, logout } = useUser();
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const MotionLink = motion.create(Link);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full flex items-center justify-between p-4 
                 bg-[#E9F1EF]/80 dark:bg-[#1E1E1E]/80 
                 backdrop-blur-sm z-50 shadow-md"
    >
      {isAuthPage ? (
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2 mx-auto">
            <motion.img
              src={logo}
              alt="To-Do Logo"
              className="w-9 h-9"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            />
            <span className="text-[#3C5556] dark:text-gray-200 font-bold text-xl">
              To-Do List
            </span>
          </div>

          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-[#2A2A2A] 
                       shadow-md text-[#3C5556] dark:text-yellow-300 ml-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <motion.img
              src={logo}
              alt="To-Do Logo"
              className="w-8 h-8 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/")}
            />
            <span
              className="text-[#3C5556] dark:text-gray-200 font-bold text-xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              To-Do List
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-[#2A2A2A] 
                         shadow-md text-[#3C5556] dark:text-yellow-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {token && (
              <MotionLink
                to="/"
                className="bg-white dark:bg-[#2A2A2A] 
                           text-[#3C5556] dark:text-gray-200 
                           hover:text-[#E09789] font-medium 
                           px-3 py-1 rounded-md shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Home
              </MotionLink>
            )}

            {token && (
              <div className="relative">
                <motion.button
                  className="flex items-center gap-2 
                             text-[#3C5556] dark:text-gray-200 
                             font-medium px-3 py-1 rounded-md 
                             bg-white dark:bg-[#2A2A2A] shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span>{user?.username || "User"}</span>
                  <div
                    className="w-8 h-8 rounded-full 
                                  bg-[#3C5556] dark:bg-gray-500 
                                  text-white flex items-center justify-center"
                  >
                    {(user?.username || "U").charAt(0).toUpperCase()}
                  </div>
                </motion.button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-0 mt-2 w-48 
                                 bg-white dark:bg-[#2A2A2A] 
                                 rounded-lg shadow-lg p-2 
                                 text-[#3C5556] dark:text-gray-200"
                    >
                      <MotionLink
                        to="/edit-account"
                        className="block w-full text-left px-3 py-2 rounded-md 
                                   hover:bg-gray-50 dark:hover:bg-[#3A3A3A]"
                        whileHover={{ scale: 1.02 }}
                      >
                        Edit Account
                      </MotionLink>

                      <MotionLink
                        to="/delete-account"
                        className="block w-full text-left px-3 py-2 rounded-md 
                                   hover:bg-gray-50 dark:hover:bg-[#3A3A3A]"
                        whileHover={{ scale: 1.02 }}
                      >
                        Delete Account
                      </MotionLink>

                      <button
                        className="w-full text-left px-3 py-2 rounded-md 
                                   hover:bg-red-50 dark:hover:bg-red-900/30 
                                   text-red-600"
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
        </>
      )}
    </motion.nav>
  );
}

export default Navbar;
