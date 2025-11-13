import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeAuth } from './utils/auth.js';

export default function Start() {
  const [activeTab, setActiveTab] = useState('signup');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signinLoading, setSigninLoading] = useState(false);
  const [signinError, setSigninError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL
      ? import.meta.env.VITE_API_BASE_URL
      : 'http://localhost:5001';

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    setSignupLoading(true);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      password,
      phone: formData.get('phone') || null,
      organization: formData.get('organization') || null,
      company: formData.get('organization') || null,
      industry: formData.get('industry') || null,
      role: formData.get('designation') || null,
      location: formData.get('location') || null,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      storeAuth(data.token, data.refreshToken || null, data.expiresAt || null, data.user);
      navigate('/assessment');
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(error.message || 'Failed to create account');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setSigninError('');
    setSigninLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      storeAuth(data.token, data.refreshToken || null, data.expiresAt || null, data.user);
      navigate('/assessment');
    } catch (error) {
      console.error('Signin error:', error);
      setSigninError(error.message || 'Failed to sign in');
    } finally {
      setSigninLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .bg-leafy {
          background-image: url('/backdrop-green-leaves_23-2147836966.jpg');
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #2d3748; }
        ::-webkit-scrollbar-thumb { background: #4a5568; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #718096; }
        .tab-inactive { color: #9CA3AF; border-bottom: 2px solid transparent; }
        .tab-active { color: #FFFFFF; border-bottom: 2px solid #10B981; }
        .form-select-dark {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
      `}</style>

      {/* Header (same as Home.jsx) */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-lg border-b-2 border-green-500">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-gray-100">
              <img src="/SF-logo.png" alt="Sustainable Futures logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Sustainability Futures</h1>
              <p className="text-xs md:text-sm text-gray-600">Increase Sensitivity in Sustainability</p>
            </div>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              Home
            </button>
            <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-green-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-green-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M15.75 9H2.25m13.5 0-3.75 3.75M15.75 9l-3.75-3.75" /></svg>
              Login
            </button>
            <button className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" /></svg>
              Leaderboard
            </button>
            <button className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
              ESG Compliance
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(o => !o)}
              className="text-gray-900 focus:outline-none"
            >
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`${mobileOpen ? '' : 'hidden'} md:hidden bg-white pb-4 shadow-lg`} id="mobile-menu">
          <div className="flex flex-col items-center gap-4 px-4">
            <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              Home
            </button>
            <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-green-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-green-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M15.75 9H2.25m13.5 0-3.75 3.75M15.75 9l-3.75-3.75" /></svg>
              Login
            </button>
            <button className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" /></svg>
              Leaderboard
            </button>
            <button className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
              ESG Compliance
            </button>
          </div>
        </div>
      </header>

      <div className="relative min-h-screen w-full flex items-center justify-center bg-leafy bg-cover bg-center p-4 md:p-8 pt-24 md:pt-28">
        <div className="absolute inset-0 bg-black/20 z-0"></div>

        <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-black/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-16 flex flex-col justify-between">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">Welcome to Sustainable Futures !</h1>
              <p className="text-base lg:text-lg text-gray-300">
We believe in increasing sensibility in sustainability that creates a sustainable future essential for the well-being of our planet and future generations.


              </p>
              <img src="/SF-logo.png" alt="Sustainable Futures logo" className="mt-8 mx-auto w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-lg" />
            </div>

            <div className="mt-16 md:mt-0">
              <a href="#" className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-gray-900 rounded-full text-sm font-medium shadow-lg hover:bg-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.04 15.8l-4.2-4.21 1.41-1.41 2.79 2.79 5.59-5.59 1.41 1.41-7 7z" />
                </svg>
                presented by <span className="font-bold">Sustainable Futures</span>
              </a>
            </div>
          </div>

          <div className="p-8 md:p-16 bg-gray-900/10">
            <div className="w-full max-w-md mx-auto">
              <div className="flex mb-8">
                <button
                  className={`flex-1 py-3 text-xl font-bold text-center ${activeTab === 'signup' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
                <button
                  className={`flex-1 py-3 text-xl font-bold text-center ${activeTab === 'signin' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('signin')}
                >
                  Sign In
                </button>
              </div>

              <div className="w-full">
                {activeTab === 'signup' ? (
                  <form className="w-full" onSubmit={handleSignupSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6">
                        <div>
                          <label htmlFor="name" className="text-sm font-medium text-gray-400">Full Name *</label>
                          <input id="name" name="name" type="text" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="email-signup" className="text-sm font-medium text-gray-400">Email Address *</label>
                          <input id="email-signup" name="email" type="email" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone Number *</label>
                          <input id="phone" name="phone" type="tel" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="organization" className="text-sm font-medium text-gray-400">Organization *</label>
                          <input id="organization" name="organization" type="text" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="designation" className="text-sm font-medium text-gray-400">Designation *</label>
                          <input id="designation" name="designation" type="text" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="location" className="text-sm font-medium text-gray-400">Location *</label>
                          <input id="location" name="location" type="text" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="industry" className="text-sm font-medium text-gray-400">Industry *</label>
                          <select id="industry" name="industry" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 focus:ring-0 form-select-dark">
                            <option value="" className="bg-gray-800 text-white">Select</option>
                            <option value="tech" className="bg-gray-800 text-white">Technology</option>
                            <option value="finance" className="bg-gray-800 text-white">Finance</option>
                            <option value="health" className="bg-gray-800 text-white">Healthcare</option>
                            <option value="other" className="bg-gray-800 text-white">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="company-size" className="text-sm font-medium text-gray-400">Company Size</label>
                          <select id="company-size" name="company-size" className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 focus:ring-0 form-select-dark">
                            <option value="" className="bg-gray-800 text-white">Select company size</option>
                            <option value="1-50" className="bg-gray-800 text-white">1-50</option>
                            <option value="51-200" className="bg-gray-800 text-white">51-200</option>
                            <option value="201-1000" className="bg-gray-800 text-white">201-1000</option>
                            <option value="1000+" className="bg-gray-800 text-white">1000+</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="experience" className="text-sm font-medium text-gray-400">Experience Level</label>
                          <select id="experience" name="experience" className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 focus:ring-0 form-select-dark">
                            <option value="" className="bg-gray-800 text-white">Select experience level</option>
                            <option value="entry" className="bg-gray-800 text-white">Entry</option>
                            <option value="mid" className="bg-gray-800 text-white">Mid-Level</option>
                            <option value="senior" className="bg-gray-800 text-white">Senior</option>
                            <option value="exec" className="bg-gray-800 text-white">Executive</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="revenue" className="text-sm font-medium text-gray-400">Annual Revenue</label>
                          <select id="revenue" name="revenue" className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 focus:ring-0 form-select-dark">
                            <option value="" className="bg-gray-800 text-white">Select revenue range</option>
                            <option value="<1m" className="bg-gray-800 text-white">&lt; $1M</option>
                            <option value="1m-10m" className="bg-gray-800 text-white">$1M - $10M</option>
                            <option value="10m-100m" className="bg-gray-800 text-white">$10M - $100M</option>
                            <option value=">100m" className="bg-gray-800 text-white">&gt; $100M</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="goals" className="text-sm font-medium text-gray-400">Sustainability Goals</label>
                        <textarea id="goals" name="goals" rows={3} className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" placeholder="Describe your organization's sustainability goals..."></textarea>
                      </div>
                      <div>
                        <label htmlFor="password-signup" className="text-sm font-medium text-gray-400">Create Password *</label>
                        <input id="password-signup" name="password" type="password" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="text-sm font-medium text-gray-400">Confirm Password *</label>
                        <input id="confirm-password" name="confirm-password" type="password" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={signupLoading}
                      className={`w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg mt-10 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all shadow-lg ${signupLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {signupLoading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {signupError && (
                      <p className="text-center text-red-400 mt-4 text-sm">
                        {signupError}
                      </p>
                    )}

                    <p className="text-center text-gray-400 mt-6 text-sm">
                      Already a Member?{' '}
                      <button type="button" className="font-medium text-green-400 hover:text-green-300" onClick={() => setActiveTab('signin')}>
                        Sign in here
                      </button>
                    </p>
                  </form>
                ) : (
                  <form className="w-full" onSubmit={handleSigninSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="email-signin" className="text-sm font-medium text-gray-400">Your Email</label>
                        <input id="email-signin" name="email" type="email" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="password-signin" className="text-sm font-medium text-gray-400">Password</label>
                        <input id="password-signin" name="password" type="password" required className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-green-500 transition-colors" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={signinLoading}
                      className={`w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg mt-10 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all shadow-lg ${signinLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {signinLoading ? 'Signing In...' : 'Sign In'}
                    </button>

                    {signinError && (
                      <p className="text-center text-red-400 mt-4 text-sm">
                        {signinError}
                      </p>
                    )}

                    <p className="text-center text-gray-400 mt-6 text-sm">
                      Don't have an account?{' '}
                      <button type="button" className="font-medium text-green-400 hover:text-green-300" onClick={() => setActiveTab('signup')}>
                        Sign up here
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (same as Home.jsx) */}
      <footer className="relative z-10 bg-green-950 text-gray-300 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <img src="/SF-logo.png" alt="Sustainable Futures logo" className="w-12 h-12 object-contain" />
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-white">
                  Sustainable <span className="block font-normal">Futures</span>
                </h4>
              </div>
              <p className="text-gray-400">
                At Sustainable Futures, our story began with a passion for creating a more sustainable future for our planet.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="Email Us" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </a>
                <a href="#" aria-label="Call Us" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.836-.184-5.253-2.6-5.438-5.438l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" /></svg>
                </a>
                <a href="#" aria-label="View Location" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                </a>
              </div>
            </div>

            <div className="space-y-6 md:col-span-1">
              <h4 className="text-xl md:text-2xl font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3 text-base md:text-lg">
                {[
                  { label: 'Privacy Policy', url: 'https://sustainablefuturespcs.org/privacy-policy/' },
                  { label: 'Terms and Conditions', url: 'https://sustainablefuturespcs.org/terms-and-conditions/' },
                  { label: 'Refund Policy', url: 'https://sustainablefuturespcs.org/refund-policy/' },
                  { label: 'My Account', url: 'https://sustainablefuturespcs.org/my-account-2/' },
                  { label: 'Registration', url: 'https://sustainablefuturespcs.org/registration/' }
                ].map(item => (
                  <li key={item.label}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-300 transition-all duration-300 hover:translate-x-1">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 md:col-span-1">
              <div className="space-y-4">
                <h4 className="text-xl md:text-2xl font-semibold text-white">Contact Us</h4>
                <a href="mailto:info@sustainablefuturespcs.org" className="flex items-center gap-3 text-base md:text-lg hover:text-green-300 transition-colors">
                  <svg className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                  <span className="break-all">info@sustainablefuturespcs.org</span>
                </a>
              </div>
              <div className="space-y-4 pt-4">
                <h4 className="text-xl md:text-2xl font-semibold text-white">Location</h4>
                <p className="flex items-start gap-3 text-base md:text-lg">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                  <span>
                    Plot 146, JLPL Industrial Area<br />
                    Sector 82, Mohali (PB)<br />
                    India 140306
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-6 md:col-span-2 xl:col-span-1">
              <h4 className="text-xl md:text-2xl font-semibold text-white">Get in touch</h4>
              <form action="#" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" required className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                  <input type="email" placeholder="Email" required className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                </div>
                <input type="text" placeholder="Mobile" className="w-full p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                <textarea placeholder="Message" rows={4} required className="w-full p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-200 text-gray-900 border border-gray-300 flex items-center justify-center font-mono font-bold text-xl tracking-widest">
                    D8Y04I
                  </div>
                  <input type="text" placeholder="Enter Captcha" required className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                </div>
                <button type="submit" className="w-full py-4 px-6 rounded-lg bg-green-500 text-white font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-green-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2024 Sustainable Futures. All rights reserved.</p>
              <p>Building a sustainable future, one assessment at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
