import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SavedProperties from './pages/SavedProperties';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/saved" element={<SavedProperties />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Sweet Home</h3>
                  <p className="text-gray-400 text-sm">
                    Finding the perfect student accommodation has never been easier.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a></li>
                    <li><a href="/saved" className="text-gray-400 hover:text-white transition-colors text-sm">Saved Properties</a></li>
                    <li><a href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">Login/Register</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contact</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Email: pshaikshavali2026@gmail.com
                  </p>
                  <p className="text-gray-400 text-sm">
                    Phone: +918074612700
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
                This website was made by Shaikshavali &#128522; 
              <br></br>
                &copy; {new Date().getFullYear()} Sweet Home, All rights reserved. 
                
                
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;