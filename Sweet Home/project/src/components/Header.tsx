import React, { useState } from 'react';
import { Home, User, Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-600" /><b>Sweet Home </b>
          <h1 className="text-xl font-bold text-blue-600"></h1>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`font-medium transition-colors hover:text-blue-600 ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/saved" 
            className={`font-medium transition-colors hover:text-blue-600 ${
              location.pathname === '/saved' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            Saved Properties
          </Link>
          {isAuthenticated ? (
            <button 
              onClick={logout}
              className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`py-2 font-medium ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/saved" 
              className={`py-2 font-medium ${
                location.pathname === '/saved' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Saved Properties
            </Link>
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-2 font-medium text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;