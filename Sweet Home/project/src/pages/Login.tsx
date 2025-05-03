import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AtSign, Lock, User, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (activeTab === 'signup' && !name) {
      setError('Please enter your name');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (activeTab === 'login') {
        const success = await login(email, password);
        if (success) {
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      } else {
        // In a real app, this would register the user
        // For demo purposes, we'll just simulate success and login
        await new Promise(resolve => setTimeout(resolve, 800));
        const success = await login(email, password);
        if (success) {
          navigate('/');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const switchTab = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-blue-100 p-3">
            <User className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          {activeTab === 'login' ? 'Log in to your account' : 'Create your account'}
        </h2>
        
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-center rounded-md transition-colors ${
              activeTab === 'login' ? 'bg-white shadow-sm font-medium' : 'text-gray-600'
            }`}
            onClick={() => switchTab('login')}
          >
            Log In
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-md transition-colors ${
              activeTab === 'signup' ? 'bg-white shadow-sm font-medium' : 'text-gray-600'
            }`}
            onClick={() => switchTab('signup')}
          >
            Sign Up
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {activeTab === 'login' && (
            <div className="flex items-center justify-end">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </button>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{activeTab === 'login' ? 'Logging in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'login' ? 'Log In' : 'Create Account'}</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <p className="text-xs text-center text-gray-500">
            By {activeTab === 'login' ? 'logging in' : 'signing up'}, you agree to our 
            <a href="#" className="text-blue-600 hover:text-blue-800"> Terms of Service </a> 
            and 
            <a href="#" className="text-blue-600 hover:text-blue-800"> Privacy Policy</a>
          </p>
        </div>
        
        {/* For demo purposes - Include test credentials for login */}
        {activeTab === 'login' && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-xs text-gray-600 mb-1 font-medium">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Email: john@example.com</p>
            <p className="text-xs text-gray-600">Password: any password will work</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;