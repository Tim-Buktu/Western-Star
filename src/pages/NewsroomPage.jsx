import React, { useState, useMemo, useEffect } from 'react'
import { Search, Calendar, Tag, ExternalLink, Filter, TrendingUp, Clock, Grid, List, SortAsc, SortDesc, X } from 'lucide-react'
import { getCMSData } from '../utils/cms'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NewsroomPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedYear, setSelectedYear] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // State-backed CMS data
  const [newsletterData, setNewsletterData] = useState({ items: [] })
  const [availableTags, setAvailableTags] = useState([])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const [n, tags] = await Promise.all([
          getCMSData('newsletters'),
          getCMSData('availableTags'),
        ])
        if (!cancelled) {
          setNewsletterData(n || { items: [] })
          setAvailableTags(Array.isArray(tags) ? tags : [])
        }
      } catch (e) {
        if (!cancelled) {
          setNewsletterData({ items: [] })
          setAvailableTags([])
        }
        console.error('Failed to load newsroom data:', e)
      }
    }
    load()

    const handleCMSUpdate = async () => {
      await load()
    }
    window.addEventListener('cmsDataUpdated', handleCMSUpdate)
    return () => {
      cancelled = true
      window.removeEventListener('cmsDataUpdated', handleCMSUpdate)
    }
  }, [])

  // Filter and search newsletters
  const filteredNewsletters = useMemo(() => {
    let filtered = [...(newsletterData.items || [])]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(newsletter =>
        newsletter.title.toLowerCase().includes(query) ||
        newsletter.keyDiscussion.toLowerCase().includes(query) ||
        newsletter.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (newsletter.content && newsletter.content.toLowerCase().includes(query))
      )
    }

    // Filter by tags (multiple selection)
    if (selectedTags.length > 0) {
      filtered = filtered.filter(newsletter =>
        selectedTags.some(tag => newsletter.tags.includes(tag))
      )
    }

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(newsletter =>
  new Date(newsletter.date).getFullYear().toString() === selectedYear
      )
    }

    // Sort newsletters
    switch (sortBy) {
      case 'date-desc':
  return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))
      case 'date-asc':
  return [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date))
      case 'title-asc':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      case 'title-desc':
        return [...filtered].sort((a, b) => b.title.localeCompare(a.title))
      default:
  return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }, [newsletterData.items, searchQuery, selectedTags, selectedYear, sortBy])

  // Get unique years from newsletters
  const availableYears = useMemo(() => {
    const years = [...new Set(
      (newsletterData.items || []).map(newsletter => 
        new Date(newsletter.date).getFullYear().toString()
      )
    )].sort((a, b) => b - a)
    return years
  }, [newsletterData.items])

  // Get unique tags from newsletters
  const newsletterTags = useMemo(() => {
    const tags = [...new Set(
      (newsletterData.items || []).flatMap(newsletter => newsletter.tags)
    )]
    return tags
  }, [newsletterData.items])

  // Get featured newsletter (most recent)
  const featuredNewsletter = useMemo(() => {
    return [...(newsletterData.items || [])]
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  }, [newsletterData.items])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateShort = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getTagColor = (tagName) => {
    const tag = availableTags.find(t => t.name === tagName)
    return tag?.color || 'gray'
  }

  const tagColorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
    pink: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100',
    teal: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
    red: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    gray: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setSelectedYear('all')
    setSortBy('date-desc')
  }

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedYear !== 'all' || sortBy !== 'date-desc'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Navbar />
      
      {/* Hero Section with Featured Newsletter */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-teal/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-coral rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-teal rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-orange rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-brand-teal font-medium text-sm mb-6">
              <TrendingUp className="w-4 h-4" />
              {(newsletterData.items || []).length} newsletters published
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Western Star
              <span className="block text-3xl sm:text-5xl bg-gradient-to-r from-brand-teal to-brand-coral bg-clip-text text-transparent">
                Newsroom
              </span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Explore our complete archive of insights on technology, business, policy, and global trends. 
              From day one to the present, discover the stories shaping tomorrow.
            </p>
          </div>

          {/* Featured Newsletter */}
          {featuredNewsletter && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group cursor-pointer"
                   onClick={() => {
                     if (typeof window !== 'undefined' && typeof window.navigateTo === 'function') {
                       window.navigateTo(`/newsletter/${featuredNewsletter.id}`)
                     } else {
                       window.location.href = `/newsletter/${featuredNewsletter.id}`
                     }
                   }}>
                <div className="flex items-start gap-6">
                  {(featuredNewsletter.image || featuredNewsletter.image?.url) && (
                    <div className="hidden md:block w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={typeof featuredNewsletter.image === 'string' ? featuredNewsletter.image : featuredNewsletter.image.url}
                        alt={typeof featuredNewsletter.image === 'string' ? featuredNewsletter.title : (featuredNewsletter.image.alt || featuredNewsletter.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-brand-teal text-white text-xs font-medium rounded-full">
                        Latest
                      </span>
                      <span className="text-white/70 text-sm">
                        {featuredNewsletter.displayDate ? featuredNewsletter.displayDate : formatDate(featuredNewsletter.date)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-teal transition-colors duration-300 line-clamp-2">
                      {featuredNewsletter.title}
                    </h2>
                    <p className="text-white/80 leading-relaxed line-clamp-3 mb-4">
                      {featuredNewsletter.keyDiscussion}
                    </p>
                    <div className="flex items-center gap-2">
                      {featuredNewsletter.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/20 text-white/90 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      <ExternalLink className="w-4 h-4 text-brand-teal ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-[72px] z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search newsletters by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                showFilters || hasActiveFilters
                  ? 'bg-brand-teal text-white border-brand-teal'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-teal hover:text-brand-teal'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                  {[searchQuery && 1, selectedTags.length, selectedYear !== 'all' && 1, sortBy !== 'date-desc' && 1].filter(Boolean).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-brand-teal text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-teal'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-brand-teal text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-teal'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">A to Z</option>
              <option value="title-desc">Z to A</option>
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}

            <div className="text-sm text-gray-500 ml-auto">
              {filteredNewsletters.length} newsletter{filteredNewsletters.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tags Filter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Filter by Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {newsletterTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          selectedTags.includes(tag)
                            ? `${tagColorClasses[getTagColor(tag)]} ring-2 ring-offset-1 ring-${getTagColor(tag)}-300`
                            : `bg-gray-50 text-gray-600 border-gray-200 hover:${tagColorClasses[getTagColor(tag)]}`
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Filter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Filter by Year</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedYear('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                        selectedYear === 'all'
                          ? 'bg-brand-teal text-white border-brand-teal'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-teal hover:text-brand-teal'
                      }`}
                    >
                      All Years
                    </button>
                    {availableYears.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          selectedYear === year
                            ? 'bg-brand-teal text-white border-brand-teal'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-teal hover:text-brand-teal'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Grid/List */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {filteredNewsletters.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No newsletters found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {hasActiveFilters
                  ? 'Try adjusting your search query or filters to find what you\'re looking for.'
                  : 'No newsletters have been published yet. Check back soon for the latest insights!'
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl hover:bg-brand-teal/90 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }`}>
            {filteredNewsletters.map((newsletter, index) => (
              <NewsletterCard
                key={newsletter.id}
                newsletter={newsletter}
                formatDate={formatDate}
                formatDateShort={formatDateShort}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                viewMode={viewMode}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

// Newsletter Card Component
function NewsletterCard({ newsletter, formatDate, formatDateShort, getTagColor, tagColorClasses, viewMode, index }) {
  const handleCardClick = () => {
    // Navigate to individual newsletter page
    if (typeof window !== 'undefined' && typeof window.navigateTo === 'function') {
      window.navigateTo(`/newsletter/${newsletter.id}`)
    } else {
      window.location.href = `/newsletter/${newsletter.id}`
    }
  }

  if (viewMode === 'list') {
    return (
      <article 
        className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 animate-fadeInUp`}
        style={{ animationDelay: `${index * 50}ms` }}
        onClick={handleCardClick}
      >
        <div className="flex items-start gap-6 p-6">
          {/* Image */}
          {(newsletter.image || newsletter.image?.url) && (
            <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-32 h-24">
              <img
                src={typeof newsletter.image === 'string' ? newsletter.image : newsletter.image.url}
                alt={typeof newsletter.image === 'string' ? newsletter.title : (newsletter.image.alt || newsletter.title)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Tags and Date */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-wrap gap-2">
                {newsletter.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                      tagColorClasses[getTagColor(tag)]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {newsletter.tags.length > 2 && (
                  <span className="text-xs text-gray-500 font-medium px-2 py-1">
                    +{newsletter.tags.length - 2}
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {newsletter.displayDate ? newsletter.displayDate : formatDateShort(newsletter.date)}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
              {newsletter.title}
            </h3>

            {/* Key Discussion */}
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
              {newsletter.keyDiscussion}
            </p>

            {/* Read More */}
            <div className="flex items-center text-sm font-medium text-brand-teal group-hover:text-brand-navy transition-colors">
              Read Full Article
              <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Grid view (default)
  return (
    <article 
      className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 animate-fadeInUp`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleCardClick}
    >
      {/* Image */}
      {(newsletter.image || newsletter.image?.url) && (
        <div className="relative overflow-hidden">
          <img
            src={typeof newsletter.image === 'string' ? newsletter.image : newsletter.image.url}
            alt={typeof newsletter.image === 'string' ? newsletter.title : (newsletter.image.alt || newsletter.title)}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Floating Date Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium text-gray-700">
            {newsletter.displayDate ? newsletter.displayDate : formatDateShort(newsletter.date)}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {newsletter.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                tagColorClasses[getTagColor(tag)]
              } group-hover:shadow-sm`}
            >
              {tag}
            </span>
          ))}
          {newsletter.tags.length > 2 && (
            <span className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
              +{newsletter.tags.length - 2} more
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-teal transition-colors leading-tight">
          {newsletter.title}
        </h3>

        {/* Key Discussion */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
          {newsletter.keyDiscussion}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {Math.max(1, Math.ceil((newsletter.keyDiscussion?.length || 0) / 200))} min read
          </div>
          <div className="flex items-center text-sm font-medium text-brand-teal group-hover:text-brand-navy transition-colors">
            Read More
            <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </article>
  )
}
