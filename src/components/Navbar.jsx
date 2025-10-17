import { Link } from "react-router-dom";
import logo from "../assets/to-do-list.png";
import { motion } from "framer-motion";

function Navbar() {
  const MotionLink = motion(Link);
  const MotionImg = motion("img");
  const MotionNav = motion("nav");

  return (
    <MotionNav
      className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-[#E9F1EF]/80 backdrop-blur-sm z-50"
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-2">
        <MotionImg src={logo} alt="To-Do Logo" className="w-8 h-8" whileHover={{scale:1.02}} whileTap={{scale:0.7}}/>
        <span className="text-[#3C5556] font-bold text-xl">To-Do List</span>
      </div>

      <div className="flex gap-4">
        <MotionLink
          to="/"
          className="text-[#3C5556] hover:text-[#E09789] font-medium bg-slate-5 px-3 py-1 rounded-md shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Home
        </MotionLink>
        <MotionLink
          to="/register"
          className="text-[#3C5556] hover:text-[#E09789] font-medium bg-slate-5 px-3 py-1 rounded-md shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign In/Sign Up
        </MotionLink>
      </div>
    </MotionNav>
  );
}

export default Navbar;
