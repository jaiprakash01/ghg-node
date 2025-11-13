import React, { useState } from 'react';
import { 
  Leaf, 
  Users, 
  Shield, 
  CheckCircle, 
  Target, 
  BookOpen, 
  TrendingUp,
  Recycle,
  Heart,
  Building,
  Award,
  Play,
  ChevronDown,
  ChevronRight,
  Globe,
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const videos = [
  {
    url: 'https://cdn.pixabay.com/video/2017/08/05/11149-228491665_large.mp4',
    title: 'Environmental Sustainability',
    description: 'Discover how companies are reducing their environmental footprint through innovative practices.',
    category: 'Environmental'
  },
  {
    url: 'https://cdn.pixabay.com/video/2021/10/12/91744-636709154_large.mp4',
    title: 'Social Responsibility',
    description: 'Learn about workplace safety, employee welfare, and community engagement initiatives.',
    category: 'Social'
  },
  {
    url: 'https://cdn.pixabay.com/video/2023/06/11/166808-835670743_large.mp4',
    title: 'Corporate Governance',
    description: 'Explore transparent business practices and ethical leadership in modern organizations.',
    category: 'Governance'
  }
];

const abbreviations = [
  { abbr: 'ESG', full: 'Environmental, Social, and Governance' },
  { abbr: 'SMETA', full: 'Sedex Members Ethical Trade Audit' },
  { abbr: 'Sedex', full: 'Supplier Ethical Data Exchange' },
  { abbr: 'NOC', full: 'No Objection Certificate' },
  { abbr: 'HR', full: 'Human Resources' },
  { abbr: 'PPE', full: 'Personal Protective Equipment' },
  { abbr: 'SOP', full: 'Standard Operating Procedure' },
  { abbr: 'EHS', full: 'Environment, Health, and Safety' },
  { abbr: 'SDS', full: 'Safety Data Sheet' },
  { abbr: 'ILO', full: 'International Labour Organization' },
  { abbr: 'DEI', full: 'Diversity, Equity, and Inclusion' },
  { abbr: 'SDG', full: 'Sustainable Development Goals' }
];

const quizQuestions = [
  {
    question: "What does PPE stand for?",
    answer: "Personal Protective Equipment",
    category: "Social"
  },
  {
    question: "Which policy ensures fair working hours?",
    answer: "Working Hours Policy (Governance + Social)",
    category: "Governance"
  },
  {
    question: "What is the main purpose of SDS?",
    answer: "Safety Data Sheet - provides hazard information",
    category: "Environmental"
  }
];

const ESGCompliance = () => {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 font-['Inter']">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-lg border-b-2 border-green-500">
          <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-gray-100">
                <img 
                  src="/SF-logo.png" 
                  alt="Sustainable Futures logo" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-md" 
                  onError={(e) => (e.currentTarget.src = 'https://placehold.co/64x64/34d399/ffffff?text=SF')}
                />
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
              <button 
                onClick={() => navigate('/leaderboard')}
                className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" /></svg>
                Leaderboard
              </button>
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                ESG Compliance
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800">
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Panel */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 z-30 bg-white shadow-xl md:hidden">
              <div className="flex flex-col space-y-4 p-6">
                <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                  Home
                </button>
                <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-green-600 shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M15.75 9H2.25m13.5 0-3.75 3.75M15.75 9l-3.75-3.75" /></svg>
                  Login
                </button>
                <button 
                  onClick={() => navigate('/leaderboard')}
                  className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" /></svg>
                  Leaderboard
                </button>
                <button 
                  onClick={handleBack}
                  className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                  ESG Compliance
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-900 via-emerald-900 to-blue-900 pt-32 sm:pt-40">
          <img
            src="https://www.icertis.com/globalassets/1.-sections/contracting-basics/what-is-contract-compliance/what-is-contract-compliance-header-inset.jpeg"
            alt="Contract Compliance Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">Industry Leading Standards</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                ESG & SMETA
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400">
                  Compliance Excellence
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-green-100 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Transform your business with Environmental, Social, and Governance frameworks. 
                Build ethical operations that satisfy regulators, consumers, and investors while 
                achieving SMETA compliance through Sedex standards.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 md:px-8 md:py-4 hover:bg-white/20 transition-all duration-300">
                  <Leaf className="w-6 h-6 text-green-400" />
                  <span className="text-white font-semibold text-base md:text-lg">Environmental</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 md:px-8 md:py-4 hover:bg-white/20 transition-all duration-300">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-semibold text-base md:text-lg">Social</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 md:px-8 md:py-4 hover:bg-white/20 transition-all duration-300">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-semibold text-base md:text-lg">Governance</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 md:py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore ESG Framework
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                  Watch Introduction Video
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="overview" className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Why ESG Matters in Today's Business World</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mb-8"></div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
                  In today's world, businesses are being held to a higher standard—not just by regulators, 
                  but also by consumers, investors, and partners. ESG isn't just a buzzword for companies 
                  pursuing SMETA compliance through Sedex—it's a necessity for sustainable success and 
                  ethical operations that build trust and drive long-term value.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="bg-green-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">Regulatory Compliance</h3>
                  <p className="text-green-700">Meet evolving regulations and avoid penalties through proactive ESG implementation.</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl">
                  <div className="bg-emerald-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">Business Growth</h3>
                  <p className="text-emerald-700">Access new markets and partnerships through demonstrated ethical practices.</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                  <div className="bg-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">Stakeholder Trust</h3>
                  <p className="text-blue-700">Build confidence with investors, customers, and employees through transparency.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Gallery Section */}
        <section id="videos" className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-3xl shadow-2xl p-6 md:p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">ESG in Action: Real-World Examples</h2>
              <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
                Explore how leading organizations implement ESG principles across Environmental, 
                Social, and Governance dimensions through these comprehensive video examples.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Main Video Player */}
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl">
                  <video 
                    key={activeVideo}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                    controls
                    autoPlay
                    muted
                    poster="https://placehold.co/800x450/10594a/ffffff?text=Video+Poster"
                  >
                    <source src={videos[activeVideo].url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {videos[activeVideo].category}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{videos[activeVideo].title}</h3>
                    <p className="text-gray-200 text-sm hidden sm:block">{videos[activeVideo].description}</p>
                  </div>
                </div>
              </div>

              {/* Video Selection Panel */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">Choose Your Focus Area</h3>
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveVideo(index)}
                    className={`w-full p-4 md:p-6 rounded-2xl transition-all duration-300 text-left ${
                      activeVideo === index 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl scale-105' 
                        : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-gray-100 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`rounded-full p-3 ${
                        activeVideo === index ? 'bg-white/20' : 'bg-green-500/20'
                      }`}>
                        <Play className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            video.category === 'Environmental' ? 'bg-green-500/20 text-green-300' :
                            video.category === 'Social' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {video.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-base md:text-lg mb-2">{video.title}</h4>
                        <p className="text-sm opacity-80 line-clamp-2">{video.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ESG Pillars Section */}
        <section id="pillars" className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">The Three Pillars of ESG</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the core components that drive sustainable business practices and ethical operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Environmental Pillar */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-6 md:p-8 border border-green-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 shadow-lg">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-green-800">Environmental</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-4 text-lg">What it includes:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Waste management systems',
                      'Energy and water usage optimization',
                      'Pollution control measures',
                      'Hazardous materials handling'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-green-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-green-700 mb-3">Why it matters:</h4>
                  <p className="text-green-600 text-sm leading-relaxed">
                    Organizations that monitor and reduce environmental footprint are better prepared 
                    for legal regulations, climate risks, and cost-saving efficiencies while contributing 
                    to sustainable development goals.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6">
                  <h4 className="font-bold text-green-800 mb-3">Company Benefits:</h4>
                  <ul className="text-green-700 space-y-2">
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Reduced operational costs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Easier regulatory compliance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Higher SMETA audit scores</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Pillar */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl shadow-xl p-6 md:p-8 border border-emerald-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-800">Social</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-emerald-700 mb-4 text-lg">What it includes:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Employee health & safety programs',
                      'Human rights protection',
                      'Training & education initiatives',
                      'DEI (Diversity, Equity, Inclusion)'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-emerald-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-emerald-700 mb-3">Why it matters:</h4>
                  <p className="text-emerald-600 text-sm leading-relaxed">
                    Strong social policies create a loyal workforce, reduce legal risks, 
                    and align with ILO standards through robust HR policies, first-aid facilities, 
                    and grievance procedures.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl p-6">
                  <h4 className="font-bold text-emerald-800 mb-3">Company Benefits:</h4>
                  <ul className="text-emerald-700 space-y-2">
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Higher employee retention</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Reduced absenteeism</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Enhanced SMETA inspection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Governance Pillar */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-xl p-6 md:p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-800">Governance</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 mb-4 text-lg">What it includes:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Anti-bribery and corruption policies',
                      'Legal compliance registers',
                      'Grievance redressal systems',
                      'SOPs for ethical conduct'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-blue-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-blue-700 mb-3">Why it matters:</h4>
                  <p className="text-blue-600 text-sm leading-relaxed">
                    Strong governance builds ethical culture, reduces financial/legal risks, 
                    and satisfies investors through proper documentation like NOCs, SDS, 
                    and vendor contracts.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6">
                  <h4 className="font-bold text-blue-800 mb-3">Company Benefits:</h4>
                  <ul className="text-blue-700 space-y-2">
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Better risk management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Access to global supply chains</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Legal protection & reputation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SMETA Compliance Section */}
        <section id="compliance" className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Award className="w-10 h-10 text-green-500" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How ESG Supports SMETA Compliance</h2>
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mb-8"></div>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                Many of the "Selected" parameters in your Sedex/SMETA Achievers Tool are directly 
                tied to ESG components. By embedding ESG principles into company culture, you 
                organically strengthen your SMETA audit readiness.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-8">Key SMETA Parameters</h3>
                <div className="space-y-4">
                  {[
                    { item: 'Fire suppression equipment', category: 'Environmental' },
                    { item: 'Grievance policies', category: 'Social' },
                    { item: 'Environmental certificates', category: 'Environmental' },
                    { item: 'Social empowerment trainings', category: 'Social' },
                    { item: 'Legal compliance registers', category: 'Governance' }
                  ].map((param, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:shadow-md transition-all duration-300">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-gray-800 font-medium">{param.item}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            param.category === 'Environmental' ? 'bg-green-100 text-green-700' :
                            param.category === 'Social' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {param.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-8">Success Metrics Dashboard</h3>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div>
                      <span className="text-green-700 font-semibold">Audit Readiness Score</span>
                      <p className="text-sm text-gray-600">Overall preparation level</p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-bold">95%</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div>
                      <span className="text-green-700 font-semibold">Compliance Rating</span>
                      <p className="text-sm text-gray-600">SMETA assessment grade</p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">Excellent</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div>
                      <span className="text-green-700 font-semibold">Risk Mitigation</span>
                      <p className="text-sm text-gray-600">Operational risk reduction</p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">High Impact</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-800 mb-3">Implementation Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Phase 1: ESG Framework (Complete)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Phase 2: SMETA Prep (In Progress)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-700">Phase 3: Audit (Upcoming)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ESG Quizzes Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 rounded-3xl shadow-2xl p-6 md:p-12 text-white">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Target className="w-10 h-10 text-yellow-400" />
                <h2 className="text-3xl sm:text-4xl font-bold">Interactive ESG Knowledge Assessment</h2>
              </div>
              <p className="text-lg md:text-xl text-indigo-100 max-w-4xl mx-auto">
                ESG Quizzes are practical tools that transform knowledge into action across your organization, 
                helping teams understand and implement ESG principles effectively.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Why ESG Quizzes Matter</h3>
                <div className="space-y-6">
                  {[
                    'Assess internal understanding of ESG topics across all departments',
                    'Identify knowledge gaps before actual SMETA audits',
                    'Encourage ongoing learning and employee engagement',
                    'Track improvement over time with measurable metrics'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-indigo-100 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
                  <h4 className="font-bold text-white mb-4">Implementation Benefits</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">85%</div>
                      <div className="text-sm text-indigo-200">Knowledge Retention</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">92%</div>
                      <div className="text-sm text-indigo-200">Employee Engagement</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-8">Sample Quiz Questions</h3>
                
                <div className="space-y-6">
                  {quizQuestions.map((quiz, index) => (
                    <div key={index} className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                      activeQuiz === index ? 'bg-white/20 border-2 border-white/30' : 'bg-white/5 hover:bg-white/10'
                    }`} onClick={() => setActiveQuiz(index)}>
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          quiz.category === 'Environmental' ? 'bg-green-500/20 text-green-300' :
                          quiz.category === 'Social' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}>
                          {quiz.category}
                        </span>
                        <span className="text-sm text-indigo-200">Question {index + 1}</span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-white mb-3">{quiz.question}</h4>
                      
                      {activeQuiz === index && (
                        <div className="mt-4 p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-green-300 font-semibold">Answer:</span>
                          </div>
                          <p className="text-green-100">{quiz.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg">
                    Take Full Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Abbreviations Reference */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <BookOpen className="w-10 h-10 text-purple-500" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Essential ESG & SMETA Terminology</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Master the key abbreviations and terms essential for ESG implementation and SMETA compliance success.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <th className="text-left py-4 px-4 sm:py-6 sm:px-8 font-bold text-base sm:text-lg">Abbreviation</th>
                      <th className="text-left py-4 px-4 sm:py-6 sm:px-8 font-bold text-base sm:text-lg">Full Form</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abbreviations.map((item, index) => (
                      <tr key={index} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}>
                        <td className="py-4 px-4 sm:py-6 sm:px-8">
                          <span className="font-bold text-base sm:text-xl text-blue-600 bg-blue-50 px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                            {item.abbr}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:py-6 sm:px-8 text-gray-700 text-base sm:text-lg font-medium">{item.full}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-3xl shadow-2xl p-6 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
            
            <div className="relative text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <TrendingUp className="w-12 h-12 text-yellow-300" />
                <h2 className="text-3xl sm:text-4xl font-bold">ESG: The Future of Ethical Business</h2>
              </div>
              <div className="w-32 h-1 bg-white/30 mx-auto rounded-full mb-8"></div>
              <p className="text-xl sm:text-2xl leading-relaxed text-green-50 max-w-5xl mx-auto">
                Embracing ESG isn't just about compliance—it's about building a resilient, ethical, 
                and future-ready organization. From boosting employee welfare to minimizing environmental 
                damage and strengthening transparency, ESG helps your company do well by doing good.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
                <Leaf className="w-16 h-16 text-green-300 mx-auto mb-6" />
                <h3 className="font-bold text-2xl mb-4">Environmental Impact</h3>
                <p className="text-green-100 text-lg">Reduce footprint, increase efficiency, drive sustainable innovation</p>
              </div>
              <div className="text-center p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
                <Users className="w-16 h-16 text-emerald-300 mx-auto mb-6" />
                <h3 className="font-bold text-2xl mb-4">Social Responsibility</h3>
                <p className="text-emerald-100 text-lg">Empower people, build communities, ensure fair practices</p>
              </div>
              <div className="text-center p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
                <Shield className="w-16 h-16 text-blue-300 mx-auto mb-6" />
                <h3 className="font-bold text-2xl mb-4">Strong Governance</h3>
                <p className="text-blue-100 text-lg">Ethical practices, transparent operations, accountable leadership</p>
              </div>
            </div>

            <div className="text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Ready to Transform Your Business?</h3>
              <p className="text-lg md:text-xl text-green-100 mb-8 max-w-4xl mx-auto">
                If your organization is aiming for SMETA compliance, start by making ESG part of your 
                everyday conversation. Conduct regular ESG Quizzes, review your compliance tools, 
                and train your staff to think beyond profits toward sustainable success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  Start Your ESG Journey
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20">
                  Download ESG Guide
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-green-950 text-gray-300 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Logo and Info */}
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

            {/* Column 3: Contact/Location */}
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

            {/* Column 4: Get in touch form */}
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
};

export default ESGCompliance;
