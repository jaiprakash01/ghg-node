import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Medal,
  Award,
  ArrowLeft,
  Crown,
  Star,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Filter,
  Search,
  Eye,
  Download,
  Menu,
  X
} from 'lucide-react';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rankings');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userResults, setUserResults] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch leaderboard data from backend
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true);
        
        // Get current user from localStorage if available
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUserId(user.id?.toString());
        }

        // Fetch assessments and users from backend
        const [assessmentsRes, usersRes] = await Promise.all([
          fetch('http://localhost:5001/api/admin/assessments'),
          fetch('http://localhost:5001/api/admin/users')
        ]);

        if (assessmentsRes.ok && usersRes.ok) {
          const assessments = await assessmentsRes.json();
          const users = await usersRes.json();
          
          // Create a map of user_id to user details
          const userMap = {};
          users.forEach(user => {
            userMap[user.id] = user;
          });
          
          // Transform assessments to leaderboard format
          const transformedResults = assessments.map(assessment => {
            const user = userMap[assessment.user_id] || {};
            return {
              user: {
                id: assessment.user_id?.toString() || '',
                name: assessment.user_name || user.name || 'Unknown User',
                organization: user.organization || user.company || assessment.user_email || '',
                location: user.location || ''
              },
              score: {
                total: assessment.total_score || 0,
                governance: assessment.governance_score || 0,
                social: assessment.social_score || 0,
                environment: assessment.environment_score || 0,
                esgPlus: assessment.esg_plus_score || 0
              },
              grade: assessment.grade || 'N/A'
            };
          });

          setUserResults(transformedResults);
        } else {
          console.error('Failed to fetch leaderboard data');
          // Fallback to empty array
          setUserResults([]);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        // Fallback to empty array
        setUserResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const sortedResults = [...userResults].sort((a, b) => b.score.total - a.score.total);

  const rankedResults = sortedResults.map((result, index) => ({
    ...result,
    rank: index + 1,
  }));

  const filteredResults = rankedResults.filter(result => {
    const matchesSearch = result.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (result.user.organization?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || result.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2: return <Medal className="w-8 h-8 text-gray-400" />;
      case 3: return <Award className="w-8 h-8 text-amber-600" />;
      default: return <Star className="w-6 h-6 text-gray-400" />;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-500';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-500';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-100';
      case 'B+':
      case 'B':
        return 'text-blue-600 bg-blue-100';
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-100';
      case 'D':
      case 'F':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const currentUserResult = rankedResults.find(result => result.user.id === currentUserId);

  const totalParticipants = rankedResults.length;
  const averageScore = totalParticipants > 0 ? Math.round(rankedResults.reduce((sum, r) => sum + r.score.total, 0) / totalParticipants) : 0;
  const highestScore = totalParticipants > 0 ? Math.max(...rankedResults.map(r => r.score.total)) : 0;
  const lowestScore = totalParticipants > 0 ? Math.min(...rankedResults.map(r => r.score.total)) : 0;

  const gradeDistribution = rankedResults.reduce((acc, result) => {
    acc[result.grade] = (acc[result.grade] || 0) + 1;
    return acc;
  }, {});

  const governanceAvg = totalParticipants > 0 ? Math.round(rankedResults.reduce((sum, r) => sum + r.score.governance, 0) / totalParticipants) : 0;
  const socialAvg = totalParticipants > 0 ? Math.round(rankedResults.reduce((sum, r) => sum + r.score.social, 0) / totalParticipants) : 0;
  const environmentAvg = totalParticipants > 0 ? Math.round(rankedResults.reduce((sum, r) => sum + r.score.environment, 0) / totalParticipants) : 0;
  const esgPlusAvg = totalParticipants > 0 ? Math.round(rankedResults.reduce((sum, r) => sum + r.score.esgPlus, 0) / totalParticipants) : 0;

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-lg border-b-2 border-green-500">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-gray-100">
              <img src="/SF-logo.png" alt="Sustainable Futures logo" className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg" onError={(e) => (e.currentTarget.src = 'https://placehold.co/64x64/EBF5EE/2E8B57?text=SF')} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Sustainability Futures</h1>
              <p className="text-xs md:text-sm text-gray-600">Increase Sensitivity in Sustainability</p>
            </div>
          </div>
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
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900">
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-30">
            <div className="flex flex-col gap-4 p-4">
              <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                Home
              </button>
              <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-green-600 shadow-lg">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M15.75 9H2.25m13.5 0-3.75 3.75M15.75 9l-3.75-3.75" /></svg>
                Login
              </button>
              <button onClick={() => navigate('/leaderboard')} className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18M6.75 16.5V9.75m4.5 6.75V5.25m4.5 11.25V12" /></svg>
                Leaderboard
              </button>
              <button onClick={() => navigate('/esg-compliance')} className="flex items-center justify-center gap-2 text-lg font-semibold text-white py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                ESG Compliance
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8 px-4 pt-[100px] md:pt-[116px]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center mb-8">
            <button
              onClick={handleBack}
              className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mr-0 sm:mr-4 mb-4 sm:mb-0 self-start sm:self-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Assessment Rankings
              </h1>
              <p className="text-gray-600 mt-2">Leaderboard of users who completed ESG assessments</p>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 items-center justify-center mt-4 text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-gray-700">{totalParticipants} participants</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-gray-700">Average: {averageScore} points</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
                  <span className="text-gray-700">Top Score: {highestScore} points</span>
                </div>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading leaderboard data...</p>
              </div>
            </div>
          )}

          {!isLoading && (
            <>
              {currentUserResult && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-6 mb-8 text-white">
                  <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                        {getRankIcon(currentUserResult.rank)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Your Rank: #{currentUserResult.rank}</h2>
                        <p className="text-green-100">Score: {currentUserResult.score.total} points</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(currentUserResult.grade)} mt-2`}>
                          Grade: {currentUserResult.grade}
                        </span>
                      </div>
                    </div>
                    <div className="text-center sm:text-right mt-4 sm:mt-0">
                      <div className="text-3xl font-bold">{currentUserResult.score.total}</div>
                      <div className="text-green-100">Total Score</div>
                      <div className="text-sm text-green-100 mt-2">
                        {currentUserResult.rank <= 3 ? '🏆 Top Performer!' : `${totalParticipants - currentUserResult.rank} participants behind you`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row bg-white/80 backdrop-blur-sm rounded-lg p-1 mb-8 shadow-lg">
                <button
                  onClick={() => setActiveTab('rankings')}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'rankings'
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  Rankings
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'analytics'
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'performance'
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Performance
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search participants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Grades</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>

              {activeTab === 'rankings' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {filteredResults.slice(0, 3).map((result, index) => (
                      <div
                        key={result.user.id}
                        className={`${
                          index === 0 ? 'md:order-2 transform md:scale-110' : 
                          index === 1 ? 'md:order-1' : 'md:order-3'
                        } bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border-2 ${
                          result.user.id === currentUserId ? 'border-green-400' : 'border-gray-200'
                        }`}
                      >
                        <div className={`w-20 h-20 ${getRankBg(result.rank)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                          {getRankIcon(result.rank)}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{result.user.name}</h3>
                        <p className="text-gray-600 mb-2">{result.user.organization}</p>
                        <div className="text-3xl font-bold text-green-600 mb-2">{result.score.total}</div>
                        <div className="text-sm text-gray-500 mb-2">assessment points</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                        <div className="mt-3">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            <Target className="w-3 h-3 mr-1" />
                            Assessment Complete
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="font-semibold text-blue-600">{result.score.governance}</div>
                            <div className="text-gray-600">Gov</div>
                          </div>
                          <div className="bg-purple-50 p-2 rounded">
                            <div className="font-semibold text-purple-600">{result.score.social}</div>
                            <div className="text-gray-600">Social</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded">
                            <div className="font-semibold text-green-600">{result.score.environment}</div>
                            <div className="text-gray-600">Env</div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded">
                            <div className="font-semibold text-orange-600">{result.score.esgPlus}</div>
                            <div className="text-gray-600">ESG+</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                      <h2 className="text-2xl font-bold text-white text-center">Assessment Rankings</h2>
                      <p className="text-green-100 text-center mt-1">Showing {filteredResults.length} participants who completed assessments</p>
                    </div>
                    <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                      {filteredResults.map((result) => (
                        <div
                          key={result.user.id}
                          className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                            result.user.id === currentUserId ? 'bg-green-50 border-l-4 border-green-500' : ''
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                            <div className="flex items-center mb-4 sm:mb-0">
                              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <span className="text-xl font-bold text-gray-600">#{result.rank}</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {result.user.name}
                                  {result.user.id === currentUserId && (
                                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">You</span>
                                  )}
                                </h3>
                                <p className="text-gray-600">{result.user.organization}</p>
                                <p className="text-sm text-gray-500">{result.user.location}</p>
                                <div className="flex items-center mt-1">
                                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    <Target className="w-3 h-3 mr-1" />
                                    Assessment Complete
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                              <div className="text-2xl font-bold text-green-600">{result.score.total}</div>
                              <div className="text-sm text-gray-500 mb-2">assessment points</div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                                {result.grade}
                              </span>
                              <div className="grid grid-cols-2 sm:flex sm:space-x-1 gap-1 mt-2 w-full sm:w-auto">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded text-center">G: {result.score.governance}</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded text-center">S: {result.score.social}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded text-center">E: {result.score.environment}</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded text-center">+: {result.score.esgPlus}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Assessment Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">{totalParticipants}</div>
                        <div className="text-sm text-gray-600">Assessment Participants</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">{averageScore}</div>
                        <div className="text-sm text-gray-600">Average Score</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">{highestScore}</div>
                        <div className="text-sm text-gray-600">Highest Score</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">{lowestScore}</div>
                        <div className="text-sm text-gray-600">Lowest Score</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Grade Distribution</h3>
                    <div className="space-y-4">
                      {Object.entries(gradeDistribution).sort().map(([grade, count]) => (
                        <div key={grade} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade)}`}>
                              {grade}
                            </span>
                            <span className="ml-2 text-gray-600">{count} participants</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-800">
                              {totalParticipants > 0 ? Math.round((count / totalParticipants) * 100) : 0}%
                            </div>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${totalParticipants > 0 ? (count / totalParticipants) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Category Averages</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                          <span className="font-medium">Governance</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{governanceAvg}</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                          <span className="font-medium">Social</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{socialAvg}</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                          <span className="font-medium">Environment</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{environmentAvg}</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                          <span className="font-medium">ESG Plus</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">{esgPlusAvg}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Score Range Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">90-100 (Excellent)</span>
                        <span className="font-medium">{rankedResults.filter(r => r.score.total >= 90).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">80-89 (Very Good)</span>
                        <span className="font-medium">{rankedResults.filter(r => r.score.total >= 80 && r.score.total < 90).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">70-79 (Good)</span>
                        <span className="font-medium">{rankedResults.filter(r => r.score.total >= 70 && r.score.total < 80).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">60-69 (Average)</span>
                        <span className="font-medium">{rankedResults.filter(r => r.score.total >= 60 && r.score.total < 70).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Below 60 (Needs Improvement)</span>
                        <span className="font-medium">{rankedResults.filter(r => r.score.total < 60).length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">🏆 Top Performers</h3>
                    <div className="space-y-4">
                      {rankedResults.slice(0, 5).map((result) => (
                        <div key={result.user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-bold text-yellow-600">#{result.rank}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{result.user.name}</div>
                              <div className="text-sm text-gray-600">{result.user.organization}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{result.score.total}</div>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                              {result.grade}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Performance Insights</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-800">Highest Score</span>
                          <span className="text-2xl font-bold text-green-600">{highestScore}</span>
                        </div>
                        <p className="text-sm text-green-600 mt-1">
                          {rankedResults.find(r => r.score.total === highestScore)?.user.name || 'N/A'}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-blue-800">Average Score</span>
                          <span className="text-2xl font-bold text-blue-600">{averageScore}</span>
                        </div>
                        <p className="text-sm text-blue-600 mt-1">All participants</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-purple-800">Grade A+ Achievers</span>
                          <span className="text-2xl font-bold text-purple-600">
                            {rankedResults.filter(r => r.grade === 'A+').length}
                          </span>
                        </div>
                        <p className="text-sm text-purple-600 mt-1">Top performers</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-orange-800">Active Participants</span>
                          <span className="text-2xl font-bold text-orange-600">{totalParticipants}</span>
                        </div>
                        <p className="text-sm text-orange-600 mt-1">Total registered</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    const csvContent = [
                      'Rank,Name,Organization,Total Score,Governance,Social,Environment,ESG Plus,Grade',
                      ...rankedResults.map(r => 
                        `${r.rank},"${r.user.name}","${r.user.organization || ''}",${r.score.total},${r.score.governance},${r.score.social},${r.score.environment},${r.score.esgPlus},${r.grade}`
                      )
                    ].join('\n');
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `esg-leaderboard-${new Date().toISOString().split('T')[0]}.csv`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Leaderboard Data
                </button>
              </div>
            </>
          )}
        </div>
      </div>

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
};

export default Leaderboard;
