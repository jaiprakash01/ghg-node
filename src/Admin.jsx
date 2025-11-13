import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Activity, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2,
  BarChart3,
  TrendingUp,
  Award,
  Calendar,
  Building,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  LogOut,
  Shield,
  Lock,
  EyeOff,
  Globe,
  X
} from 'lucide-react';

const API_BASE_URL =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:5001';

const StandaloneAdmin = ({ onGoToMainSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  
  // Detailed data states
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [selectedUserActivities, setSelectedUserActivities] = useState([]);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showUserActivitiesModal, setShowUserActivitiesModal] = useState(false);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Function to load mock data
  const loadMockData = () => {
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'TechCorp Inc.',
        industry: 'service',
        role: 'Sustainability Manager',
        location: 'San Francisco, CA',
        created_at: '2025-07-28T05:47:08.069Z',
        last_login: '2025-07-28T05:47:08.069Z',
        payment_status: 'paid'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567891',
        company: 'GreenBank',
        industry: 'service',
        role: 'ESG Analyst',
        location: 'New York, NY',
        created_at: '2025-07-28T05:47:08.069Z',
        last_login: '2025-07-28T05:47:08.069Z',
        payment_status: 'unpaid'
      }
    ]);
    setAssessments([
      {
        id: 1,
        user_id: 1,
        user_name: 'John Doe',
        user_email: 'john@example.com',
        total_score: 85,
        max_score: 100,
        accuracy: 85,
        governance_score: 20,
        social_score: 22,
        environment_score: 23,
        esg_plus_score: 20,
        grade: 'B+',
        level: 'Intermediate',
        recommendations: ['Improve governance practices'],
        created_at: '2025-07-28T05:47:08.069Z',
        payment_status: 'paid'
      }
    ]);
    setActivities([
      {
        id: 1,
        user_id: 1,
        user_email: 'john@example.com',
        user_name: 'John Doe',
        action: 'login',
        ip_address: '192.168.1.1',
        created_at: '2025-07-28T05:47:08.069Z'
      }
    ]);
    setContacts([
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        mobile: '+1234567890',
        message: 'I would like to learn more about your ESG assessment services.',
        captcha_code: 'ABC123',
        ip_address: '192.168.1.1',
        user_agent: 'Mozilla/5.0...',
        status: 'new',
        created_at: '2025-07-28T05:47:08.069Z'
      }
    ]);
  };

  // Fetch data from API
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          setLoading(true);
          
          // Fetch real data from the API endpoints
          const [usersRes, assessmentsRes, activitiesRes, contactsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/admin/users`),
            fetch(`${API_BASE_URL}/api/admin/assessments`),
            fetch(`${API_BASE_URL}/api/admin/activities`),
            fetch(`${API_BASE_URL}/api/admin/contacts`)
          ]);
          
          if (usersRes.ok && assessmentsRes.ok && activitiesRes.ok && contactsRes.ok) {
            const usersData = await usersRes.json();
            const assessmentsData = await assessmentsRes.json();
            const activitiesData = await activitiesRes.json();
            const contactsData = await contactsRes.json();
            
            setUsers(usersData);
            setAssessments(assessmentsData);
            setActivities(activitiesData);
            setContacts(contactsData);
          } else {
            console.error('API response not ok:', { usersRes, assessmentsRes, activitiesRes, contactsRes });
            loadMockData();
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          loadMockData();
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const updateContactStatus = async (contactId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/contacts/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        const updatedContact = await response.json();
        setContacts(prev => prev.map(contact => 
          contact.id === contactId ? updatedContact : contact
        ));
      } else {
        console.error('Failed to update contact status');
        setContacts(prev => prev.map(contact => 
          contact.id === contactId ? { ...contact, status: status } : contact
        ));
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      setContacts(prev => prev.map(contact => 
        contact.id === contactId ? { ...contact, status: status } : contact
      ));
    }
  };

  const fetchAssessmentDetails = async (assessmentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/assessment-details/${assessmentId}`);
      if (response.ok) {
        const assessmentDetails = await response.json();
        setSelectedAssessment(assessmentDetails);
        setShowAssessmentModal(true);
      } else {
        console.error('Failed to fetch assessment details');
        const assessment = assessments.find(a => a.id === assessmentId);
        if (assessment) {
          setSelectedAssessment({
            ...assessment,
            user_company: users.find(u => u.id === assessment.user_id)?.company || 'N/A',
            user_role: users.find(u => u.id === assessment.user_id)?.role || 'N/A',
            answers: [
              { question: 'Mock Question 1: Sustainability Governance', answer: 'Yes' },
              { question: 'Mock Question 2: Social Responsibility', answer: 'Partially' },
              { question: 'Mock Question 3: Environmental Policy', answer: 'Yes' },
            ]
          });
          setShowAssessmentModal(true);
        }
      }
    } catch (error) {
      console.error('Error fetching assessment details:', error);
      const assessment = assessments.find(a => a.id === assessmentId);
      if (assessment) {
        setSelectedAssessment({
          ...assessment,
          user_company: users.find(u => u.id === assessment.user_id)?.company || 'N/A',
          user_role: users.find(u => u.id === assessment.user_id)?.role || 'N/A',
          answers: [
            { question: 'Mock Question 1: Sustainability Governance', answer: 'Yes' },
            { question: 'Mock Question 2: Social Responsibility', answer: 'Partially' },
            { question: 'Mock Question 3: Environmental Policy', answer: 'Yes' },
          ]
        });
        setShowAssessmentModal(true);
      }
    }
  };

  const fetchUserActivities = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/user-activities/${userId}`);
      if (response.ok) {
        const userActivities = await response.json();
        setSelectedUserActivities(userActivities);
        setShowUserActivitiesModal(true);
      } else {
        console.error('Failed to fetch user activities');
        const user = users.find(u => u.id === userId);
        setSelectedUserActivities([
          {
            id: 1,
            user_id: userId,
            user_name: user?.name || 'Unknown',
            user_email: user?.email || 'unknown@example.com',
            action: 'login',
            ip_address: '192.168.1.1',
            created_at: '2025-07-28T05:47:08.069Z'
          },
          {
            id: 2,
            user_id: userId,
            user_name: user?.name || 'Unknown',
            user_email: user?.email || 'unknown@example.com',
            action: 'assessment_completed',
            details: { total_score: 85, max_score: 100, grade: 'B+', level: 'Intermediate' },
            ip_address: '192.168.1.1',
            created_at: '2025-07-28T06:30:00.069Z'
          }
        ]);
        setShowUserActivitiesModal(true);
      }
    } catch (error) {
      console.error('Error fetching user activities:', error);
      const user = users.find(u => u.id === userId);
      setSelectedUserActivities([
        {
          id: 1,
          user_id: userId,
          user_name: user?.name || 'Unknown',
          user_email: user?.email || 'unknown@example.com',
          action: 'login',
          ip_address: '192.168.1.1',
          created_at: '2025-07-28T05:47:08.069Z'
        },
        {
          id: 2,
          user_id: userId,
          user_name: user?.name || 'Unknown',
          user_email: user?.email || 'unknown@example.com',
          action: 'assessment_completed',
          details: { total_score: 85, max_score: 100, grade: 'B+', level: 'Intermediate' },
          ip_address: '192.168.1.1',
          created_at: '2025-07-28T06:30:00.069Z'
        }
      ]);
      setShowUserActivitiesModal(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === 'aditimehra0298@gmail.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoading(true);
    } else if (email === 'admin@sustainablefuturespcs.org' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoading(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const exportToCSV = (data, filename) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C+':
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
      case 'F':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'login':
        return 'bg-green-100 text-green-800';
      case 'logout':
        return 'bg-red-100 text-red-800';
      case 'assessment_completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter data based on search and filters
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssessments = assessments.filter(assessment =>
    (assessment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     assessment.user_email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterGrade === 'all' || assessment.grade === filterGrade) &&
    (filterPayment === 'all' || assessment.payment_status === filterPayment)
  );

  const filteredActivities = activities.filter(activity =>
    activity.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (activity.user_name && activity.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredContacts = contacts.filter(contact =>
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || contact.status === filterStatus)
  );

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter your admin credentials to access the dashboard</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="aditimehra0298@gmail.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-800 mb-2">Demo Credentials:</h3>
                <div className="text-sm text-purple-700 space-y-1">
                  <p><strong>Email:</strong> aditimehra0298@gmail.com or admin@sustainablefuturespcs.org</p>
                  <p><strong>Password:</strong> admin123</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loginLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Access Admin Dashboard
                  </div>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-4">
              Secure admin access for ESG Assessment Platform
            </p>
            {onGoToMainSite && (
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
              >
                <Globe className="h-4 w-4 mr-2" />
                Go to Main ESG Site
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-center md:text-left">ESG Assessment Admin</h1>
              <p className="text-gray-600 mt-1 text-center md:text-left">Manage users, assessments, and activities</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => exportToCSV(users, 'users')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </button>
              <button
                onClick={() => exportToCSV(assessments, 'assessments')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Assessments
              </button>
              <button
                onClick={() => exportToCSV(contacts, 'contacts')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Contacts
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assessments</p>
                <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Activities</p>
                <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assessments.length > 0 
                    ? Math.round(assessments.reduce((sum, a) => sum + a.accuracy, 0) / assessments.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contact Messages</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid Assessments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assessments.filter(a => a.payment_status === 'paid').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap space-x-2 sm:space-x-8 px-4 sm:px-6">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5 inline mr-1 sm:mr-2" />
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('assessments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'assessments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-5 w-5 inline mr-1 sm:mr-2" />
                Assessments ({assessments.length})
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'activities'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Activity className="h-5 w-5 inline mr-1 sm:mr-2" />
                Activities ({activities.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Mail className="h-5 w-5 inline mr-1 sm:mr-2" />
                Contacts ({contacts.length})
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {activeTab === 'assessments' && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <select
                    value={filterPayment}
                    onChange={(e) => setFilterPayment(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              )}
              {activeTab === 'contacts' && (
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              {activeTab === 'users' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.company}</div>
                          <div className="text-sm text-gray-500 hidden sm:block">{user.industry}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">{user.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {new Date(user.last_login).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                            user.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.payment_status ? user.payment_status.charAt(0).toUpperCase() + user.payment_status.slice(1) : 'Unpaid'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => fetchUserActivities(user.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View User Activities"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'assessments' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Breakdown</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAssessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-green-600">
                                  {assessment.user_name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{assessment.user_name}</div>
                              <div className="text-sm text-gray-500">{assessment.user_email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{assessment.total_score}/{assessment.max_score}</div>
                          <div className="text-sm text-gray-500">{assessment.accuracy}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(assessment.grade)}`}>
                            {assessment.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{assessment.level}</td>
                        <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm text-gray-900">
                            <div>G: {assessment.governance_score}</div>
                            <div>S: {assessment.social_score}</div>
                            <div>E: {assessment.environment_score}</div>
                            <div>ESG+: {assessment.esg_plus_score}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            assessment.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                            assessment.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {assessment.payment_status ? assessment.payment_status.charAt(0).toUpperCase() + assessment.payment_status.slice(1) : 'Unpaid'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {new Date(assessment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => fetchAssessmentDetails(assessment.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Assessment Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'activities' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredActivities.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-purple-600">
                                  {activity.user_name ? activity.user_name.split(' ').map(n => n[0]).join('') : 
                                   activity.user_email.split('@')[0].substring(0, 2).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {activity.user_name || 'Unknown User'}
                              </div>
                              <div className="text-sm text-gray-500">{activity.user_email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(activity.action)}`}>
                            {activity.action.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {activity.details ? (
                              <div className="text-xs">
                                {activity.action === 'assessment_completed' && (
                                  <div>
                                    <div>Score: {activity.details.total_score}/{activity.details.max_score}</div>
                                    <div>Grade: {activity.details.grade}</div>
                                    <div>Level: {activity.details.level}</div>
                                  </div>
                                )}
                                {activity.action === 'question_answered' && (
                                  <div>
                                    <div>Question: {activity.details.question_id}</div>
                                    <div>Answer: {activity.details.answer}</div>
                                  </div>
                                )}
                                {activity.action === 'dashboard_viewed' && (
                                  <div>Dashboard accessed</div>
                                )}
                                {activity.action === 'leaderboard_viewed' && (
                                  <div>Leaderboard accessed</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-500">No details</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {activity.ip_address || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {new Date(activity.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => fetchUserActivities(activity.user_id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View User Activities"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {activity.action === 'assessment_completed' && activity.details?.assessment_id && (
                              <button 
                                onClick={() => fetchAssessmentDetails(activity.details.assessment_id)}
                                className="text-green-600 hover:text-green-900"
                                title="View Assessment Details"
                              >
                                <FileText className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'contacts' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-orange-600">
                                  {contact.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                              <div className="text-sm text-gray-500">{contact.email}</div>
                              {contact.mobile && (
                                <div className="text-sm text-gray-500 hidden md:block">{contact.mobile}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <div className="text-sm text-gray-900 max-w-xs truncate" title={contact.message}>
                            {contact.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            contact.status === 'new' ? 'bg-red-100 text-red-800' :
                            contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                            contact.status === 'replied' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => updateContactStatus(contact.id, 'read')}
                              className="text-blue-600 hover:text-blue-900"
                              title="Mark as Read"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => updateContactStatus(contact.id, 'replied')}
                              className="text-green-600 hover:text-green-900"
                              title="Mark as Replied"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => updateContactStatus(contact.id, 'archived')}
                              className="text-red-600 hover:text-red-900"
                              title="Archive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAssessmentModal && selectedAssessment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative top-10 sm:top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Assessment Details</h3>
                <button
                  onClick={() => setShowAssessmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">User Information</h4>
                    <p><strong>Name:</strong> {selectedAssessment.user_name}</p>
                    <p><strong>Email:</strong> {selectedAssessment.user_email}</p>
                    <p><strong>Company:</strong> {selectedAssessment.user_company}</p>
                    <p><strong>Role:</strong> {selectedAssessment.user_role}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Assessment Results</h4>
                    <p><strong>Total Score:</strong> {selectedAssessment.total_score}/{selectedAssessment.max_score}</p>
                    <p><strong>Accuracy:</strong> {selectedAssessment.accuracy}%</p>
                    <p><strong>Grade:</strong> {selectedAssessment.grade}</p>
                    <p><strong>Level:</strong> {selectedAssessment.level}</p>
                    <p><strong>Payment:</strong>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedAssessment.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                        selectedAssessment.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedAssessment.payment_status ? selectedAssessment.payment_status.charAt(0).toUpperCase() + selectedAssessment.payment_status.slice(1) : 'Unpaid'}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Category Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-sm font-medium text-blue-800">Governance</div>
                      <div className="text-lg font-bold text-blue-900">{selectedAssessment.governance_score}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-sm font-medium text-green-800">Social</div>
                      <div className="text-lg font-bold text-green-900">{selectedAssessment.social_score}</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="text-sm font-medium text-yellow-800">Environment</div>
                      <div className="text-lg font-bold text-yellow-900">{selectedAssessment.environment_score}</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="text-sm font-medium text-purple-800">ESG Plus</div>
                      <div className="text-lg font-bold text-purple-900">{selectedAssessment.esg_plus_score}</div>
                    </div>
                  </div>
                </div>
                {selectedAssessment.recommendations && selectedAssessment.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedAssessment.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-600">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedAssessment.answers && selectedAssessment.answers.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">User Answers</h4>
                    <div className="max-h-60 overflow-y-auto">
                      {selectedAssessment.answers.map((answer, index) => (
                        <div key={index} className="border-b border-gray-200 py-2">
                          <div className="text-sm font-medium text-gray-900">
                            Question {index + 1}: {answer.question}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Answer: {answer.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Completed on: {new Date(selectedAssessment.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUserActivitiesModal && selectedUserActivities.length > 0 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative top-10 sm:top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  User Activities - {selectedUserActivities[0]?.user_name}
                </h3>
                <button
                  onClick={() => setShowUserActivitiesModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">IP Address</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedUserActivities.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(activity.action)}`}>
                            {activity.action.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {activity.details ? (
                              <div className="text-xs">
                                {activity.action === 'assessment_completed' && (
                                  <div>
                                    <div>Score: {activity.details.total_score}/{activity.details.max_score}</div>
                                    <div>Grade: {activity.details.grade}</div>
                                    <div>Level: {activity.details.level}</div>
                                  </div>
                                )}
                                {activity.action === 'question_answered' && (
                                  <div>
                                    <div>Question: {activity.details.question_id}</div>
                                    <div>Answer: {activity.details.answer}</div>
                                  </div>
                                )}
                                {activity.action === 'dashboard_viewed' && (
                                  <div>Dashboard accessed</div>
                                )}
                                {activity.action === 'leaderboard_viewed' && (
                                  <div>Leaderboard accessed</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-500">No details</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {activity.ip_address || 'N/A'}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {new Date(activity.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandaloneAdmin;
