import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/to-do-list.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Tooltip } from "../components/ui/tooltip";

function Navbar() {
  const { user, token, logout } = useUser();
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const MotionLink = motion.create(Link);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAdmin = user?.role === "admin" || user?.email === "admin@todoapp.com";

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full flex items-center justify-between p-4 
                 bg-background/80 backdrop-blur-md border-b border-border shadow-sm z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
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
          className="text-foreground font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          To-Do List
        </span>
      </div>

      {!isAuthPage && (
        <>
          <div className="hidden md:flex gap-4 items-center">
            <Tooltip label="Toggle theme">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
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
              </Button>
            </Tooltip>

            {token && (
              <MotionLink to="/">
                <Button
                  variant="secondary"
                  className="shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </Button>
              </MotionLink>
            )}

            {isAdmin && (
              <MotionLink to="/admin-dashboard">
                <Button
                  variant="secondary"
                  className="shadow-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  Admin Dashboard
                </Button>
              </MotionLink>
            )}

            {token && (
              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span>{user?.username || "User"}</span>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    {(user?.username || "U").charAt(0).toUpperCase()}
                  </div>
                </Button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-md p-2"
                    >
                      <MotionLink to="/edit-account">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm"
                          whileHover={{ scale: 1.02 }}
                        >
                          Edit Account
                        </Button>
                      </MotionLink>

                      <MotionLink to="/delete-account">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm"
                          whileHover={{ scale: 1.02 }}
                        >
                          Delete Account
                        </Button>
                      </MotionLink>

                      <Separator className="my-2" />

                      <Button
                        variant="destructive"
                        className="w-full justify-start text-sm"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Tooltip label="Toggle theme">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </Tooltip>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-full"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>

          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute top-full left-0 w-full bg-background border-t border-border shadow-md flex flex-col p-4 space-y-3 md:hidden z-40"
              >
                {token && (
                  <Button variant="secondary" onClick={() => navigate("/")}>
                    Home
                  </Button>
                )}

                {isAdmin && (
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/admin-dashboard")}
                  >
                    Admin Dashboard
                  </Button>
                )}

                {token && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/edit-account")}
                    >
                      Edit Account
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => navigate("/delete-account")}
                    >
                      Delete Account
                    </Button>

                    <Separator />

                    <Button variant="destructive" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.nav>
  );
}

export default Navbar;
