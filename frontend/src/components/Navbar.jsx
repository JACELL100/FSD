import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, NavLink } from "react-router-dom";
import { Home, Grid, LogIn } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Website Name - Left Side */}
        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg"
          >
            <Grid className="text-white" size={24} />
          </motion.div>
          <h1 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Project Portal
          </h1>
        </div>

        {/* Navigation Links - Center */}
        <div className="flex items-center space-x-8">
          {[
            { name: "Home", path: "/", icon: Home },
            { name: "Projects", path: "/projects", icon: Grid },
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                relative group flex items-center space-x-2 
                text-gray-300 hover:text-white 
                transition-all duration-300 
                ${isActive ? "text-white" : ""}
              `}
            >
              {({ isActive }) => (
                <>
                  <link.icon size={20} />
                  <span className="font-medium">{link.name}</span>

                  {/* Glowing Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  )}

                  {/* Hover Glow Effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 
                    rounded-lg opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 -z-10"
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Login Button - Right Side */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="
            flex items-center space-x-2 
            bg-gradient-to-r from-blue-600 to-purple-600 
            text-white px-4 py-2 rounded-full 
            hover:from-blue-700 hover:to-purple-700 
            transition-all duration-300 
            shadow-lg hover:shadow-xl
            group
          "
        >
          <LogIn
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span>Login</span>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
