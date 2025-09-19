import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Edit2, Save, X, Plus, Trash2, Eye, EyeOff, GripVertical, Lock, User, Shield, Newspaper } from 'lucide-react';
import { 
  getCMSData, 
  updateCMSData,
  setCMSData,
  addTrendingTopic, 
  updateTrendingTopic, 
  deleteTrendingTopic, 
  getAvailableTags,
  addNewsletter,
  updateNewsletter,
  deleteNewsletter,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reorderTrendingTopics,
  moveTrendingTopic,
  addNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  toggleNewsVisibility
} from '../utils/cms';

// Authentication credentials
const ADMIN_EMAIL = 'timothyhapsim@gmail.com';
const ADMIN_PASSWORD = 'admin321';

export default function CMSAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [cmsData, setCmsData] = useState({});
  
  // Debounce helper to avoid spamming API on each keystroke
  const debounce = (fn, wait = 300) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };
  
  const debouncedApiUpdateRef = useRef(null);
  useEffect(() => {
    debouncedApiUpdateRef.current = debounce((section, field, value) => {
      updateCMSData(section, field, value).catch(err => {
        console.error('CMS update failed:', err);
      });
    }, 350);
  }, []);
  
  // Removed JSON upload flow for newsletters (manual HTML entry only)

  const refreshData = async () => {
    try {
      const data = await getCMSData()
      setCmsData(data || {})
    } catch (error) {
      console.error('Error refreshing CMS data:', error)
      setCmsData({})
    }
  };

  useEffect(() => {
    refreshData();
    // Check if user is already authenticated (stored in localStorage)
    const authToken = localStorage.getItem('cms_auth_token');
    const authTimestamp = localStorage.getItem('cms_auth_timestamp');
    
    if (authToken && authTimestamp) {
      const currentTime = Date.now();
      const sessionDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      
      if (authToken === btoa(ADMIN_EMAIL + ':' + ADMIN_PASSWORD) && 
          (currentTime - parseInt(authTimestamp)) < sessionDuration) {
        setIsAuthenticated(true);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('cms_auth_token');
        localStorage.removeItem('cms_auth_timestamp');
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Store auth token and timestamp in localStorage for session persistence
      localStorage.setItem('cms_auth_token', btoa(ADMIN_EMAIL + ':' + ADMIN_PASSWORD));
      localStorage.setItem('cms_auth_timestamp', Date.now().toString());
      setLoginForm({ email: '', password: '' });
      
      console.log(`CMS Login: ${ADMIN_EMAIL} at ${new Date().toISOString()}`);
    } else {
      setLoginError('Invalid email or password. Access denied.');
      console.warn(`Failed CMS login attempt: ${loginForm.email} at ${new Date().toISOString()}`);
    }
  };

  const handleLogout = () => {
    console.log(`CMS Logout: ${ADMIN_EMAIL} at ${new Date().toISOString()}`);
    setIsAuthenticated(false);
    localStorage.removeItem('cms_auth_token');
    localStorage.removeItem('cms_auth_timestamp');
    setIsOpen(false);
    setLoginForm({ email: '', password: '' });
  };

  const handleUpdateSite = (field, value) => {
    // Optimistic UI update
    setCmsData(prev => ({
      ...prev,
      site: { ...(prev.site || {}), [field]: value }
    }));
    // Debounced API call (no immediate full refresh)
    debouncedApiUpdateRef.current?.('site', field, value);
  };

  const handleUpdateHero = (field, value) => {
    // Optimistic UI update
    setCmsData(prev => ({
      ...prev,
      hero: { ...(prev.hero || {}), [field]: value }
    }));
    // Debounced API call
    debouncedApiUpdateRef.current?.('hero', field, value);
  };

  const handleUpdateTrendingSection = (field, value) => {
    // Optimistic UI update
    setCmsData(prev => ({
      ...prev,
      trendingTopics: { ...(prev.trendingTopics || {}), [field]: value }
    }));
    // Debounced API call
    debouncedApiUpdateRef.current?.('trendingTopics', field, value);
  };

  const handleSaveTopic = (topicData) => {
    const payload = {
      category: topicData.category,
      title: topicData.title,
      summary: topicData.summary,
      date: topicData.date,
      image: topicData.image,
      isVisible: topicData.isVisible
    }
    if (editingTopic?.id) {
      updateTrendingTopic(editingTopic.id, payload);
    } else {
      addTrendingTopic(payload);
    }
    setEditingTopic(null);
    refreshData();
  };

  const handleDeleteTopic = (id) => {
    if (confirm('Are you sure you want to delete this topic?')) {
      deleteTrendingTopic(id);
      refreshData();
    }
  };

  // Newsletter handlers
  const handleSaveNewsletter = (newsletterData) => {
    const payload = {
      title: newsletterData.title,
      keyDiscussion: newsletterData.keyDiscussion,
      content: newsletterData.content,
      newsletterUrl: newsletterData.newsletterUrl,
      imageUrl: newsletterData.imageUrl,
      date: newsletterData.date,
      displayDate: newsletterData.displayDate,
      tags: Array.isArray(newsletterData.tags) ? newsletterData.tags : []
    }
    if (editingNewsletter?.id) {
      updateNewsletter(editingNewsletter.id, payload);
    } else {
      addNewsletter(payload);
    }
    setEditingNewsletter(null);
    // Force cache clear and then refresh to ensure immediate reflection
    try { (window?.cmsApiClearCache || (() => {}))() } catch (_) {}
    refreshData();
  };

  const handleDeleteNewsletter = (id) => {
    if (confirm('Are you sure you want to delete this newsletter?')) {
      deleteNewsletter(id);
      try { (window?.cmsApiClearCache || (() => {}))() } catch (_) {}
      refreshData();
    }
  };

  // Testimonial handlers
  const handleSaveTestimonial = (testimonialData) => {
    if (editingTestimonial?.id) {
      updateTestimonial(editingTestimonial.id, testimonialData);
    } else {
      addTestimonial(testimonialData);
    }
    setEditingTestimonial(null);
    refreshData();
  };

  const handleDeleteTestimonial = (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
      refreshData();
    }
  };

  // News Article handlers
  const handleSaveNews = (newsData) => {
    // Map frontend form to API payload
    const payload = {
      type: newsData.type,
      category: newsData.category,
      title: newsData.title,
      summary: newsData.summary,
      content: newsData.content || '<p></p>',
      showcaseSection: newsData.showcaseSection || 'none',
      isVisible: newsData.isVisible,
      position: newsData.position || 0,
      imageUrl: newsData.image?.url || '',
      imageAlt: newsData.image?.alt || '',
      authorId: newsData.authorId || 1,
      date: newsData.date,
      displayDate: newsData.displayDate,
      tags: Array.isArray(newsData.tags) ? newsData.tags : []
    }

    if (editingNews?.id) {
      updateNewsArticle(editingNews.id, payload);
    } else {
      addNewsArticle(payload);
    }
    setEditingNews(null);
    refreshData();
  };

  const handleDeleteNews = (id) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      deleteNewsArticle(id);
      refreshData();
    }
  };

  const handleToggleNewsVisibility = (id) => {
    toggleNewsVisibility(id);
    refreshData();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-brand-teal hover:bg-brand-coral text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110"
        title="Open CMS Admin"
      >
        <Edit2 className="w-5 h-5" />
      </button>
    );
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-brand-navy/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-brand-gray">
          <div className="flex items-center justify-between p-6 border-b border-brand-gray bg-brand-navy rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Admin Access</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brand-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Secure Login Required</h3>
              <p className="text-brand-navy/60 text-sm">Enter your credentials to access the CMS</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-3">Email Address</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-navy/40 w-5 h-5" />
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-brand-gray/30 rounded-lg text-brand-navy focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-3">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-navy/40 w-5 h-5" />
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-brand-gray/30 rounded-lg text-brand-navy focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
            </div>

            {loginError && (
              <div className="p-4 bg-brand-coral/10 border border-brand-coral/30 rounded-lg">
                <p className="text-brand-coral text-sm font-semibold">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-teal to-brand-coral text-white font-bold py-3 px-6 rounded-lg hover:from-brand-coral hover:to-brand-orange transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Access CMS Dashboard
            </button>

            <div className="text-center">
              <p className="text-xs text-brand-navy/50">
                Authorized personnel only • All access is logged
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-brand-navy/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-brand-gray">
        <div className="flex items-center justify-between p-6 border-b border-brand-gray bg-brand-navy">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Content Management System</h2>
              <p className="text-brand-gray/80 text-sm">Logged in as {ADMIN_EMAIL}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-brand-coral/20 hover:bg-brand-coral text-brand-coral hover:text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
            >
              <Lock className="w-4 h-4" />
              Logout
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brand-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-brand-gray border-r border-brand-gray/50">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab('site')}
                className={`w-full text-left p-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'site' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-navy hover:bg-white hover:shadow-md'}`}
              >
                Site Settings
              </button>
              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full text-left p-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'hero' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-navy hover:bg-white hover:shadow-md'}`}
              >
                Hero Section
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`w-full text-left p-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'trending' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-navy hover:bg-white hover:shadow-md'}`}
              >
                Trending Topics
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`w-full text-left p-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'news' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-navy hover:bg-white hover:shadow-md'}`}
              >
                News Articles
              </button>
              <button
                onClick={() => setActiveTab('newsletters')}
                className={`w-full text-left p-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'newsletters' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-navy hover:bg-white hover:shadow-md'}`}
              >
                Newsletters
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full text-left p-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'testimonials' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-navy hover:bg-white hover:shadow-md'}`}
              >
                Testimonials
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-80px)] bg-white">
            {activeTab === 'site' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-navy mb-6">Site Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-3">Site Title</label>
                    <input
                      type="text"
                      value={cmsData.site?.title || ''}
                      onChange={(e) => handleUpdateSite('title', e.target.value)}
                      className="w-full p-3 bg-brand-gray border border-brand-gray/30 rounded-lg text-brand-navy focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-3">Top Banner</label>
                    <input
                      type="text"
                      value={cmsData.site?.topBanner || ''}
                      onChange={(e) => handleUpdateSite('topBanner', e.target.value)}
                      className="w-full p-3 bg-brand-gray border border-brand-gray/30 rounded-lg text-brand-navy focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-navy mb-6">Hero Section</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-3">Title</label>
                    <input
                      type="text"
                      value={cmsData.hero?.title || ''}
                      onChange={(e) => handleUpdateHero('title', e.target.value)}
                      className="w-full p-3 bg-brand-gray border border-brand-gray/30 rounded-lg text-brand-navy focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-3">Subtitle</label>
                    <textarea
                      value={cmsData.hero?.subtitle || ''}
                      onChange={(e) => handleUpdateHero('subtitle', e.target.value)}
                      rows={4}
                      className="w-full p-3 bg-brand-gray border border-brand-gray/30 rounded-lg text-brand-navy focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trending' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-brand-navy">Trending Topics</h3>
                  <button
                    onClick={() => setEditingTopic({})}
                    className="bg-brand-orange hover:bg-brand-coral text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    Add Topic
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-3">Section Title</label>
                    <input
                      type="text"
                      value={cmsData.trendingTopics?.title || ''}
                      onChange={(e) => handleUpdateTrendingSection('title', e.target.value)}
                      className="w-full p-3 bg-brand-gray border border-brand-gray/30 rounded-lg text-brand-navy focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateTrendingSection('isVisible', !cmsData.trendingTopics?.isVisible)}
                      className={`p-2 rounded ${cmsData.trendingTopics?.isVisible ? 'bg-green-600' : 'bg-gray-600'}`}
                    >
                      {cmsData.trendingTopics?.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <span className="text-gray-300">
                      Section is {cmsData.trendingTopics?.isVisible ? 'visible' : 'hidden'}
                    </span>
                  </div>
                </div>

                <div className="grid gap-2">
                  {cmsData.trendingTopics?.items
                    ?.sort((a, b) => (a.position || 9999) - (b.position || 9999))
                    ?.map((topic, index) => (
                    <div key={topic.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex items-center gap-3">
                        {/* Drag Handle */}
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              moveTrendingTopic(topic.id, 'up');
                              refreshData();
                            }}
                            disabled={index === 0}
                            className={`p-1 rounded ${index === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              moveTrendingTopic(topic.id, 'down');
                              refreshData();
                            }}
                            disabled={index === (cmsData.trendingTopics?.items?.length || 0) - 1}
                            className={`p-1 rounded ${index === (cmsData.trendingTopics?.items?.length || 0) - 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Position Badge */}
                        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium min-w-[24px] text-center">
                          {topic.position || index + 1}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-gray-400 mb-1 truncate">
                                {topic.tags && topic.tags.length > 0 
                                  ? topic.tags.join(', ') 
                                  : 'No tags'}
                              </div>
                              <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">{topic.title}</h4>
                              <div className="text-xs text-gray-500">{topic.date} • {topic.source}</div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-1 flex-shrink-0">
                              <button
                                onClick={() => setEditingTopic(topic)}
                                className="text-blue-400 hover:text-blue-300 p-1.5 rounded hover:bg-gray-700"
                                title="Edit topic"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTopic(topic.id)}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-gray-700"
                                title="Delete topic"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-brand-navy">News Articles</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingNews({})}
                      className="bg-brand-orange hover:bg-brand-coral text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      Add Article
                    </button>
                  </div>
                </div>

                {/* Showcase overview removed for simplified UI */}

                {/* Articles List */}
                <div className="space-y-3">
                  {(cmsData.news?.items || [])
                    .sort((a, b) => (a.position || 0) - (b.position || 0))
                    .map((article, index) => (
                    <div key={article.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          {/* Article Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {/* Category Badge */}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                article.category === 'TECHNOLOGY' ? 'bg-blue-100 text-blue-800' :
                                article.category === 'POLICY & REGULATIONS' ? 'bg-purple-100 text-purple-800' :
                                article.category === 'GLOBAL ECONOMY' ? 'bg-green-100 text-green-800' :
                                article.category === 'CORPORATE' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {article.category}
                              </span>
                              
                              {/* Showcase Section Badge */}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                                article.showcaseSection === 'featured' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                                article.showcaseSection === 'mosaic' ? 'border-green-200 bg-green-50 text-green-700' :
                                article.showcaseSection === 'loop' ? 'border-purple-200 bg-purple-50 text-purple-700' :
                                'border-gray-200 bg-gray-50 text-gray-700'
                              }`}>
                                {article.showcaseSection === 'featured' ? 'Featured' :
                                 article.showcaseSection === 'mosaic' ? 'Mosaic' :
                                 article.showcaseSection === 'loop' ? 'Loop' :
                                 'Not Showcased'}
                              </span>

                              {/* Visibility Badge */}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                article.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {article.isVisible ? 'Visible' : 'Hidden'}
                              </span>
                            </div>
                            
                            <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {article.summary}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{article.displayDate || article.date}</span>
                              <span>{article.views || 0} views</span>
                              <span>Position: {article.position || index + 1}</span>
                            </div>
                          </div>

                          {/* Action Buttons (simplified) */}
                          <div className="flex gap-1 items-start">
                            <button
                              onClick={() => handleToggleNewsVisibility(article.id)}
                              className={`p-1.5 rounded ${article.isVisible ? 'text-green-600 hover:text-green-800 hover:bg-green-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                              title={article.isVisible ? 'Hide article' : 'Show article'}
                            >
                              {article.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => setEditingNews(article)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                              title="Edit article"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteNews(article.id)}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                              title="Delete article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!cmsData.news?.items || cmsData.news.items.length === 0) && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No News Articles Yet</h3>
                      <p className="text-gray-500 mb-4">Start by adding your first news article to showcase on your site.</p>
                      <button
                        onClick={() => setEditingNews({})}
                        className="bg-brand-orange hover:bg-brand-coral text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Add Your First Article
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'newsletters' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Newsletter Archive</h3>
                  <button
                    onClick={() => setEditingNewsletter({})}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Newsletter
                  </button>
                </div>
                {/* JSON upload removed; manual creation only */}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={cmsData.newsletters?.title || ''}
                      onChange={(e) => updateCMSData('newsletters', 'title', e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  {cmsData.newsletters?.items?.map((newsletter) => (
                    <div key={newsletter.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-xs text-gray-400 mb-1">
                            {(newsletter.displayDate || newsletter.date)} {newsletter.tags && (
                              <span className="ml-2">
                                {newsletter.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="inline-block bg-gray-600 text-gray-200 px-2 py-0.5 rounded text-xs mr-1">
                                    {tag}
                                  </span>
                                ))}
                                {newsletter.tags.length > 2 && (
                                  <span className="text-gray-500">+{newsletter.tags.length - 2}</span>
                                )}
                              </span>
                            )}
                          </div>
                          <h4 className="text-white font-medium mb-1">{newsletter.title}</h4>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {newsletter.keyDiscussion || newsletter.summary}
                          </p>
                          {newsletter.image && (
                            <div className="mt-2">
                              <img 
                                src={newsletter.image} 
                                alt={newsletter.title}
                                className="w-16 h-12 object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingNewsletter(newsletter)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNewsletter(newsletter.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {(!cmsData.newsletters?.items || cmsData.newsletters.items.length === 0) && (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No newsletters yet. Click “Add Newsletter” to create one.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Testimonials</h3>
                  <button
                    onClick={() => setEditingTestimonial({})}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Testimonial
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={cmsData.testimonials?.title || ''}
                      onChange={(e) => updateCMSData('testimonials', 'title', e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Section Subtitle</label>
                    <textarea
                      value={cmsData.testimonials?.subtitle || ''}
                      onChange={(e) => updateCMSData('testimonials', 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  {cmsData.testimonials?.items?.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-white font-medium">{testimonial.name}</h4>
                            <span className="text-xs text-gray-400">• {testimonial.title}</span>
                            {testimonial.isActive && (
                              <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Active</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-300">"{testimonial.text}"</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingTestimonial(testimonial)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Topic Edit Modal */}
      {editingTopic && (
        <TopicEditModal
          topic={editingTopic}
          onSave={handleSaveTopic}
          onCancel={() => setEditingTopic(null)}
        />
      )}

      {/* News Article Edit Modal */}
      {editingNews && (
        <NewsEditModal
          article={editingNews}
          onSave={handleSaveNews}
          onCancel={() => setEditingNews(null)}
        />
      )}

      {/* Newsletter Edit Modal */}
      {editingNewsletter && (
        <NewsletterEditModal
          newsletter={editingNewsletter}
          onSave={handleSaveNewsletter}
          onCancel={() => setEditingNewsletter(null)}
        />
      )}

      {/* Testimonial Edit Modal */}
      {editingTestimonial && (
        <TestimonialEditModal
          testimonial={editingTestimonial}
          onSave={handleSaveTestimonial}
          onCancel={() => setEditingTestimonial(null)}
        />
      )}
    </div>
  );
}

function TopicEditModal({ topic, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: topic.title || '',
    summary: topic.summary || topic.description || '',
    category: topic.category || 'TECHNOLOGY',
    date: topic.date || new Date().toISOString().split('T')[0],
    image: topic.image || '',
    isVisible: topic.isVisible !== undefined ? topic.isVisible : true,
    tags: Array.isArray(topic.tags) ? topic.tags : []
  });

  const [availableTags, setAvailableTags] = useState([])
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const tags = await getAvailableTags()
        if (!cancelled) setAvailableTags(Array.isArray(tags) ? tags : [])
      } catch (e) {
        if (!cancelled) setAvailableTags([])
      }
    })()
    return () => { cancelled = true }
  }, [])

  const handleTagToggle = (tagValue) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.some(tag => 
        (typeof tag === 'string' ? tag : tag.value) === tagValue
      )
        ? prev.tags.filter(tag => 
            (typeof tag === 'string' ? tag : tag.value) !== tagValue
          )
        : [...prev.tags, tagValue]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            {topic.id ? 'Edit Topic' : 'Add New Topic'}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              {['TECHNOLOGY','POLICY & REGULATIONS','GLOBAL ECONOMY','CORPORATE','INTERNATIONAL RELATIONS','INNOVATION','FINANCIAL','CAREER','LIFESTYLE','CULTURAL'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isVisible"
              checked={formData.isVisible}
              onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="isVisible" className="text-sm text-gray-300">Visible</label>
          </div>
          
          {/* Tags Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {(availableTags || []).filter(tag => tag.active || tag.isActive).map((tag) => {
                const value = tag.value || tag.name
                const label = tag.label || tag.name
                const isSelected = formData.tags.some(selectedTag => 
                  (typeof selectedTag === 'string' ? selectedTag : selectedTag.value) === value
                );
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleTagToggle(value)}
                    className={`p-2 rounded text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-brand-teal text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Selected: {formData.tags.length} tag{formData.tags.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// News Article Edit Modal Component
function NewsEditModal({ article, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: article.title || '',
    summary: article.summary || '',
    category: article.category || 'TECHNOLOGY',
    type: article.type || 'feature-story',
    content: article.content || '',
  date: article.date || new Date().toISOString().split('T')[0],
  displayDate: article.displayDate || '',
    authorId: article.author?.id || 1,
    author: {
      name: article.author?.name || '',
      role: article.author?.role || '',
      avatar: article.author?.avatar || ''
    },
    image: {
      url: article.image?.url || '',
      alt: article.image?.alt || ''
    },
    tags: article.tags || [],
    showcaseSection: article.showcaseSection || 'none',
    isVisible: article.isVisible !== undefined ? article.isVisible : true,
    views: article.views || 0
  });
  const [availableTags, setAvailableTags] = useState([])
  const [availableAuthors, setAvailableAuthors] = useState([])
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const tags = await getAvailableTags()
        if (!cancelled) setAvailableTags(Array.isArray(tags) ? tags : [])
      } catch (_) {
        if (!cancelled) setAvailableTags([])
      }
      try {
        const api = await import('../utils/api.js')
        const authors = await api.default.getAuthors()
        if (!cancelled) {
          setAvailableAuthors(Array.isArray(authors) ? authors : [])
          // If current authorId is missing, default to first author if available
          setFormData(prev => ({
            ...prev,
            authorId: prev.authorId || (authors?.[0]?.id ?? 1)
          }))
        }
      } catch (_) {
        if (!cancelled) setAvailableAuthors([])
      }
    })()
    return () => { cancelled = true }
  }, [])
  const categories = ['TECHNOLOGY', 'POLICY & REGULATIONS', 'GLOBAL ECONOMY', 'CORPORATE', 'INTERNATIONAL RELATIONS', 'INNOVATION', 'FINANCIAL', 'CAREER', 'LIFESTYLE', 'CULTURAL'];
  const articleTypes = ['feature-story', 'data-story', 'breaking-news', 'analysis', 'interview'];

  const handleTagToggle = (tagName) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter(tag => tag !== tagName)
        : [...prev.tags, tagName]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {article.id ? 'Edit News Article' : 'Add New News Article'}
          </h3>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Article Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  required
                >
                  {articleTypes.map(type => (
                    <option key={type} value={type}>
                      {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Showcase Section</label>
                <select
                  value={formData.showcaseSection}
                  onChange={(e) => setFormData(prev => ({ ...prev, showcaseSection: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                >
                  <option value="none">Not Showcased</option>
                  <option value="featured">Featured Hero</option>
                  <option value="mosaic">Mosaic Grid</option>
                  <option value="loop">In The Loop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Date (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., September 2025 or Today"
                  value={formData.displayDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                />
                <p className="text-xs text-gray-500 mt-1">Shown on the site instead of the exact date. Sorting still uses Publication Date.</p>
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                rows="3"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Content (HTML)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal font-mono text-sm"
                rows="8"
                placeholder="Enter HTML content for the article..."
              />
            </div>

            {/* Author Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Author Information</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Author</label>
                <select
                  value={formData.authorId}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorId: parseInt(e.target.value, 10) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                >
                  {(availableAuthors || []).map(a => (
                    <option key={a.id} value={a.id}>{a.name} {a.role ? `— ${a.role}` : ''}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      author: { ...prev.author, name: e.target.value } 
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author Role</label>
                  <input
                    type="text"
                    value={formData.author.role}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      author: { ...prev.author, role: e.target.value } 
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author Avatar URL</label>
                  <input
                    type="url"
                    value={formData.author.avatar}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      author: { ...prev.author, avatar: e.target.value } 
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
              </div>
            </div>

            {/* Image Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Featured Image</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image.url}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      image: { ...prev.image, url: e.target.value } 
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
                  <input
                    type="text"
                    value={formData.image.alt}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      image: { ...prev.image, alt: e.target.value } 
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
              <div className="flex flex-wrap gap-2">
                {(availableTags || []).map(tag => {
                  const tagName = tag.name || tag.value
                  return (
                  <button
                    key={tagName}
                    type="button"
                    onClick={() => handleTagToggle(tagName)}
                    className={`px-3 py-1 text-sm font-medium rounded-full border transition-all ${
                      formData.tags.includes(tagName)
                        ? 'bg-brand-teal text-white border-brand-teal'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-brand-teal'
                    }`}
                  >
                    {tag.label || tag.name || tag.value}
                  </button>
                )})}
              </div>
            </div>

            {/* Settings */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="rounded border-gray-300 text-brand-teal focus:ring-brand-teal"
                />
                <span className="text-sm font-medium text-gray-700">Article is visible</span>
              </label>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors"
          >
            {article.id ? 'Update Article' : 'Create Article'}
          </button>
        </div>
      </div>
    </div>
  );
}

function NewsletterEditModal({ newsletter, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: newsletter.title || '',
    keyDiscussion: newsletter.keyDiscussion || newsletter.summary || '',
    date: newsletter.date || new Date().toISOString().split('T')[0],
    displayDate: newsletter.displayDate || '',
    newsletterUrl: newsletter.newsletterUrl || newsletter.link || '',
    content: newsletter.content || '',
    imageUrl: newsletter.imageUrl || '',
    tags: newsletter.tags || []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            {newsletter.id ? 'Edit Newsletter' : 'Add New Newsletter'}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Key Discussion</label>
            <textarea
              value={formData.keyDiscussion}
              onChange={(e) => setFormData({ ...formData, keyDiscussion: e.target.value })}
              rows={3}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Display Date (optional)</label>
            <input
              type="text"
              placeholder="e.g., Sept 19, 2025 or This Week"
              value={formData.displayDate}
              onChange={(e) => setFormData({ ...formData, displayDate: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
            <p className="text-xs text-gray-400 mt-1">This text will show instead of the exact date on the newsletter page and lists.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Newsletter URL</label>
            <input
              type="url"
              value={formData.newsletterUrl}
              onChange={(e) => setFormData({ ...formData, newsletterUrl: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Content (HTML)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-sm"
              placeholder="<p>Newsletter content...</p>"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TestimonialEditModal({ testimonial, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: testimonial.name || '',
    title: testimonial.title || '',
    text: testimonial.text || '',
    isActive: testimonial.isActive !== undefined ? testimonial.isActive : true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            {testimonial.id ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial Text</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows={4}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="isActive" className="text-sm text-gray-300">Display on website</label>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
