import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Plus, Trash2, Eye, EyeOff, GripVertical, ArrowUp, ArrowDown, Lock, User, Shield } from 'lucide-react';
import { 
  getCMSData, 
  updateCMSData, 
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
  moveTrendingTopic
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
  const [cmsData, setCmsData] = useState(getCMSData());

  const refreshData = () => {
    setCmsData(getCMSData());
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
    updateCMSData('site', field, value);
    refreshData();
  };

  const handleUpdateHero = (field, value) => {
    updateCMSData('hero', field, value);
    refreshData();
  };

  const handleUpdateTrendingSection = (field, value) => {
    updateCMSData('trendingTopics', field, value);
    refreshData();
  };

  const handleSaveTopic = (topicData) => {
    if (editingTopic?.id) {
      updateTrendingTopic(editingTopic.id, topicData);
    } else {
      addTrendingTopic(topicData);
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
    if (editingNewsletter?.id) {
      updateNewsletter(editingNewsletter.id, newsletterData);
    } else {
      addNewsletter(newsletterData);
    }
    setEditingNewsletter(null);
    refreshData();
  };

  const handleDeleteNewsletter = (id) => {
    if (confirm('Are you sure you want to delete this newsletter?')) {
      deleteNewsletter(id);
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
                          <div className="text-xs text-gray-400 mb-1">{newsletter.date}</div>
                          <h4 className="text-white font-medium mb-1">{newsletter.title}</h4>
                          <p className="text-sm text-gray-300">{newsletter.summary}</p>
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
    description: topic.description || topic.summary || '',
    source: topic.source || '',
    date: topic.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    image: topic.image || '',
    featured: topic.featured || false,
    tags: topic.tags || []
  });

  const availableTags = getAvailableTags();

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
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="e.g., TechCrunch, Reuters, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="text"
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
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="featured" className="text-sm text-gray-300">Featured topic</label>
          </div>
          
          {/* Tags Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {availableTags.filter(tag => tag.active).map((tag) => {
                const isSelected = formData.tags.some(selectedTag => 
                  (typeof selectedTag === 'string' ? selectedTag : selectedTag.value) === tag.value
                );
                return (
                  <button
                    key={tag.value}
                    type="button"
                    onClick={() => handleTagToggle(tag.value)}
                    className={`p-2 rounded text-xs font-medium transition-all ${
                      isSelected
                        ? `bg-${tag.color}-600 text-white`
                        : `bg-gray-700 text-gray-300 hover:bg-${tag.color}-100 hover:text-${tag.color}-800`
                    }`}
                  >
                    {tag.label}
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

function NewsletterEditModal({ newsletter, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: newsletter.title || '',
    summary: newsletter.summary || '',
    date: newsletter.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    link: newsletter.link || '#'
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              rows={3}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Link</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
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
