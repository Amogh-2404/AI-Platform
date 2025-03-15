import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AI-Platform
        </Link>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
            }
          >
            Text Generator
          </NavLink>
          <NavLink
            to="/sentiment"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
            }
          >
            Sentiment Analyzer
          </NavLink>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;