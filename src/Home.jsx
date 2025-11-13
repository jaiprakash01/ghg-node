import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const tryPlay = () => {
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        });
      }
    };

    // Ensure the browser reloads sources in case of earlier 404 caching
    videoEl.load();

    if (videoEl.readyState >= 2) {
      tryPlay();
    } else {
      videoEl.addEventListener('canplay', tryPlay, { once: true });
    }

    return () => {
      videoEl.removeEventListener('canplay', tryPlay);
    };
  }, []);

  return (
    <>
      {/* Page-scoped global styles needed for the background video and sparkles */}
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        #bg-video {
          position: fixed;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          z-index: -10;
          transform: translateX(-50%) translateY(-50%);
          object-fit: cover;
          filter: brightness(0.7);
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .sparkle {
          position: absolute;
          color: #FFD700;
          font-size: 1.5rem;
          opacity: 0.8;
          animation: sparkle-anim 3s infinite ease-in-out;
        }
        @keyframes sparkle-anim {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        id="bg-video"
        ref={videoRef}
        poster="/ba.jpg"
      >
        <source src="/287510_large_compressed.mp4" type="video/mp4" />
        <source src="https://cdn.pixabay.com/video/2025/06/24/287510_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      

      {/* Header */}
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
            <button onClick={() => navigate('/leaderboard')} className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" /></svg>
              Leaderboard
            </button>
            <button onClick={() => navigate('/esg-compliance')} className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
            <button onClick={() => navigate('/leaderboard')} className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" /></svg>
              Leaderboard
            </button>
            <button onClick={() => navigate('/esg-compliance')} className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
              ESG Compliance
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 pt-32 md:pt-40 md:p-12 text-center text-white">
        <div className="relative mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white text-shadow">
            Turn Green into Gold
          </h1>
          <span className="sparkle" style={{ top: '-10px', left: '-30px', animationDelay: '0s' }}>&#10022;</span>
          <span className="sparkle" style={{ top: '0px', right: '-40px', animationDelay: '1s' }}>&#10024;</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-200 text-shadow mb-4">
          Master Sustainability
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl text-shadow mb-12">
          Get your GHG Score to understand your ESG level through our interactive assessment game
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mb-12">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg transform transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">ESG Score</h3>
            <p className="text-gray-300">Comprehensive Assessment</p>
          </div>

          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg transform transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Leaderboard</h3>
            <p className="text-gray-300">Compete & Compare</p>
          </div>

          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg transform transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Progress</h3>
            <p className="text-gray-300">Track Your Journey</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button onClick={() => navigate('/start')} className="text-base md:text-lg font-semibold text-white py-4 px-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-green-300">
            <span className="mr-2">&#9654;</span>
            Start Your ESG Journey
          </button>
          <button onClick={() => navigate('/leaderboard')} className="text-base md:text-lg font-semibold text-white py-4 px-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300">
            <span className="mr-2">&#128065;</span>
            View Leaderboard
          </button>
        </div>

        {/* Fun sparkle */}
        <span className="sparkle" style={{ bottom: '10%', left: '10%', fontSize: '2rem', color: '#60a5fa', animationDelay: '0.5s' }}>
          &#10052;
        </span>
      </main>

      {/* Footer */}
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
