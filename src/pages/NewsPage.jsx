import React, { useState, useMemo, useEffect } from 'react'
import { Search, Calendar, Tag, ExternalLink, Filter, TrendingUp, Clock, Grid, List, X, PlayCircle, Eye, Users, BookOpen, Zap, Globe, Briefcase, Heart, Lightbulb } from 'lucide-react'
import { getCMSData } from '../utils/cms'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [viewMode, setViewMode] = useState('mosaic') // mosaic, grid, list
  const [showFilters, setShowFilters] = useState(false)
  const [newsData, setNewsData] = useState({ items: [] })
  const [availableTags, setAvailableTags] = useState([])

  // Refresh data from CMS
  const refreshData = async () => {
    try {
      const [news, tags] = await Promise.all([
        getCMSData('news'),
        getCMSData('availableTags'),
      ])
      setNewsData(news || { items: [] })
      setAvailableTags(Array.isArray(tags) ? tags : [])
    } catch (e) {
      console.error('Failed to load news data:', e)
      setNewsData({ items: [] })
      setAvailableTags([])
    }
  }

  useEffect(() => {
    refreshData()
    
    // Listen for localStorage changes (when CMS updates data)
    const handleStorageChange = () => {
      refreshData()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events from the CMS
    const handleCMSUpdate = () => {
      refreshData()
    }
    
    window.addEventListener('cmsDataUpdated', handleCMSUpdate)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cmsDataUpdated', handleCMSUpdate)
    }
  }, [])

  // Category icons mapping
  const categoryIcons = {
    'TECHNOLOGY': Zap,
    'GLOBAL ECONOMY': Globe,
    'POLICY & REGULATIONS': BookOpen,
    'INTERNATIONAL RELATIONS': Users,
    'CORPORATE': Briefcase,
    'INNOVATION': Lightbulb,
    'LIFESTYLE': Heart,
    'CULTURAL': Users,
    'FINANCIAL': TrendingUp,
    'CAREER': Users
  }

  // Filter articles
  const filteredArticles = useMemo(() => {
    let filtered = newsData.items || []

    // Only show visible articles
    filtered = filtered.filter(article => article.isVisible !== false)

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.includes(article.category)
      )
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some(tag => article.tags.includes(tag))
      )
    }

    return filtered.sort((a, b) => {
      // Sort by position first (for articles with positions), then by date
      const positionA = a.position || 9999
      const positionB = b.position || 9999
      
      if (positionA !== positionB) {
        return positionA - positionB
      }
      
  return new Date(b.date) - new Date(a.date)
    })
  }, [newsData.items, searchQuery, selectedCategories, selectedTags])

  // Get unique categories
  const availableCategories = [...new Set((newsData.items || []).map(item => item.category))]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTagColor = (tagName) => {
    const tag = availableTags.find(t => t.name === tagName)
    return tag?.color || 'gray'
  }

  const tagColorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    pink: 'bg-pink-50 text-pink-700 border-pink-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200'
  }

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
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
    setSelectedCategories([])
    setSelectedTags([])
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0

  // Get articles from CMS showcase sections (derived from loaded newsData)
  const featuredArticle = useMemo(() => {
    return (newsData.items || []).find(a => a.showcaseSection === 'featured') || null
  }, [newsData.items])
  const mosaicArticles = useMemo(() => {
    return (newsData.items || []).filter(a => a.showcaseSection === 'mosaic')
  }, [newsData.items])
  const loopArticles = useMemo(() => {
    return (newsData.items || []).filter(a => a.showcaseSection === 'loop')
  }, [newsData.items])
  
  // For search/filter results, use filtered articles
  const displayArticles = hasActiveFilters ? filteredArticles : null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-coral rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-teal rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-orange rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-brand-teal font-medium text-sm mb-6">
              <TrendingUp className="w-4 h-4" />
              {(newsData.items || []).length} articles published
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              News &
              <span className="block text-3xl sm:text-5xl bg-gradient-to-r from-brand-teal to-brand-coral bg-clip-text text-transparent">
                Analysis
              </span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              In-depth coverage of the stories shaping Southeast Asia's future. From technology breakthroughs to policy shifts, discover the insights that matter.
            </p>
          </div>
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
                placeholder="Search articles by title, content, or category..."
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
                  {[searchQuery && 1, selectedCategories.length, selectedTags.length].filter(Boolean).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('mosaic')}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  viewMode === 'mosaic'
                    ? 'bg-brand-teal text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-teal'
                }`}
              >
                Mosaic
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-brand-teal text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-teal'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-brand-teal text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-teal'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

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
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Categories Filter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map(category => {
                      const Icon = categoryIcons[category] || Tag
                      return (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                            selectedCategories.includes(category)
                              ? 'bg-brand-teal text-white border-brand-teal ring-2 ring-offset-1 ring-brand-teal/30'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-teal hover:text-brand-teal'
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          {category}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Filter by Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.slice(0, 10).map(tag => (
                      <button
                        key={tag.name}
                        onClick={() => toggleTag(tag.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          selectedTags.includes(tag.name)
                            ? `${tagColorClasses[tag.color]} ring-2 ring-offset-1`
                            : `bg-gray-50 text-gray-600 border-gray-200 hover:${tagColorClasses[tag.color]}`
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content - Two Section Layout */}
      <main className="bg-gray-50">
        {hasActiveFilters ? (
          // Show filtered search results
          filteredArticles.length === 0 ? (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
              <div className="text-center">
                <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No articles found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search query or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl hover:bg-brand-teal/90 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            // Show filtered results in selected view mode
            <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
              {viewMode === 'grid' && (
                <GridLayout
                  articles={filteredArticles}
                  formatDate={formatDate}
                  getTagColor={getTagColor}
                  tagColorClasses={tagColorClasses}
                  categoryIcons={categoryIcons}
                />
              )}
              
              {viewMode === 'list' && (
                <ListLayout
                  articles={filteredArticles}
                  formatDate={formatDate}
                  getTagColor={getTagColor}
                  tagColorClasses={tagColorClasses}
                  categoryIcons={categoryIcons}
                />
              )}
              
              {viewMode === 'mosaic' && (
                <GridLayout
                  articles={filteredArticles}
                  formatDate={formatDate}
                  getTagColor={getTagColor}
                  tagColorClasses={tagColorClasses}
                  categoryIcons={categoryIcons}
                />
              )}
            </section>
          )
        ) : (
          // Show CMS showcase sections (no active filters)
          !featuredArticle && mosaicArticles.length === 0 && loopArticles.length === 0 ? (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
              <div className="text-center">
                <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No articles found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  No articles have been published yet. Check back soon for the latest insights!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Section 1: Main Mosaic Grid */}
              <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
                {viewMode === 'mosaic' && (
                  <MosaicLayout
                    featuredArticle={featuredArticle}
                    articles={mosaicArticles} // Use CMS mosaic articles
                    formatDate={formatDate}
                    getTagColor={getTagColor}
                    tagColorClasses={tagColorClasses}
                    categoryIcons={categoryIcons}
                  />
                )}
                
                {viewMode === 'grid' && (
                  <GridLayout
                    articles={[...(featuredArticle ? [featuredArticle] : []), ...mosaicArticles, ...loopArticles]}
                    formatDate={formatDate}
                    getTagColor={getTagColor}
                    tagColorClasses={tagColorClasses}
                    categoryIcons={categoryIcons}
                  />
                )}
                
                {viewMode === 'list' && (
                  <ListLayout
                    articles={[...(featuredArticle ? [featuredArticle] : []), ...mosaicArticles, ...loopArticles]}
                    formatDate={formatDate}
                    getTagColor={getTagColor}
                    tagColorClasses={tagColorClasses}
                    categoryIcons={categoryIcons}
                  />
                )}
              </section>

              {/* Section 2: "In the Loop" - Horizontal Scrollable */}
              {loopArticles.length > 0 && (
                <InTheLoopSection
                  articles={loopArticles} // Use CMS loop articles
                  formatDate={formatDate}
                  getTagColor={getTagColor}
                  tagColorClasses={tagColorClasses}
                  categoryIcons={categoryIcons}
                />
              )}
            </>
          )
        )}
      </main>

      <Footer />
    </div>
  )
}

// Apple-inspired Mosaic Layout - Redesigned for better aesthetics
function MosaicLayout({ featuredArticle, articles, formatDate, getTagColor, tagColorClasses, categoryIcons }) {
  const handleClick = (article) => {
    window.location.href = `/news/${article.id}`
  }

  // Create sophisticated layout pattern inspired by Apple Newsroom
  const createLayoutPattern = (articles) => {
    const layoutGroups = []
    let currentIndex = 0

    while (currentIndex < articles.length) {
      // Pattern 1: Large + 2 Medium (3 articles)
      if (currentIndex + 2 < articles.length && currentIndex % 7 === 0) {
        layoutGroups.push({
          type: 'large-medium-medium',
          articles: articles.slice(currentIndex, currentIndex + 3)
        })
        currentIndex += 3
      }
      // Pattern 2: 2 Medium + Small (3 articles)  
      else if (currentIndex + 2 < articles.length && (currentIndex + 1) % 5 === 0) {
        layoutGroups.push({
          type: 'medium-medium-small',
          articles: articles.slice(currentIndex, currentIndex + 3)
        })
        currentIndex += 3
      }
      // Pattern 3: Small + Large + Small (3 articles)
      else if (currentIndex + 2 < articles.length && (currentIndex + 2) % 6 === 0) {
        layoutGroups.push({
          type: 'small-large-small',
          articles: articles.slice(currentIndex, currentIndex + 3)
        })
        currentIndex += 3
      }
      // Pattern 4: 4 Small cards in 2x2 grid
      else if (currentIndex + 3 < articles.length && (currentIndex + 3) % 8 === 0) {
        layoutGroups.push({
          type: 'four-small',
          articles: articles.slice(currentIndex, currentIndex + 4)
        })
        currentIndex += 4
      }
      // Pattern 5: Full width feature (1 article)
      else if (articles[currentIndex]?.type === 'breaking-news' || (currentIndex + 4) % 9 === 0) {
        layoutGroups.push({
          type: 'full-width',
          articles: articles.slice(currentIndex, currentIndex + 1)
        })
        currentIndex += 1
      }
      // Default: 3 equal columns
      else {
        const remaining = articles.length - currentIndex
        const takeCount = Math.min(3, remaining)
        layoutGroups.push({
          type: 'three-equal',
          articles: articles.slice(currentIndex, currentIndex + takeCount)
        })
        currentIndex += takeCount
      }
    }

    return layoutGroups
  }

  const layoutGroups = createLayoutPattern(articles)

  return (
    <div className="space-y-6">
      {/* Featured Article - Hero Section */}
      {featuredArticle && (
        <div className="mb-8">
          <FeaturedHeroCard 
            article={featuredArticle}
            onClick={() => handleClick(featuredArticle)}
            formatDate={formatDate}
            getTagColor={getTagColor}
            tagColorClasses={tagColorClasses}
            categoryIcons={categoryIcons}
          />
        </div>
      )}

      {/* Strict Row Management - Fixed Heights */}
      <div className="space-y-6">
        {layoutGroups.map((group, groupIndex) => (
          <div 
            key={groupIndex} 
            className="animate-fadeInUp" 
            style={{ animationDelay: `${groupIndex * 150}ms` }}
          >
            {group.type === 'large-medium-medium' && (
              <LargeMediumMediumPattern 
                articles={group.articles}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                categoryIcons={categoryIcons}
                onClickArticle={handleClick}
              />
            )}
            
            {group.type === 'medium-medium-small' && (
              <MediumMediumSmallPattern 
                articles={group.articles}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                categoryIcons={categoryIcons}
                onClickArticle={handleClick}
              />
            )}

            {group.type === 'small-large-small' && (
              <SmallLargeSmallPattern 
                articles={group.articles}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                categoryIcons={categoryIcons}
                onClickArticle={handleClick}
              />
            )}

            {group.type === 'four-small' && (
              <FourSmallPattern 
                articles={group.articles}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                categoryIcons={categoryIcons}
                onClickArticle={handleClick}
              />
            )}

            {group.type === 'full-width' && (
              <FullWidthPattern 
                article={group.articles[0]}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                categoryIcons={categoryIcons}
                onClickArticle={handleClick}
              />
            )}

            {group.type === 'three-equal' && (
              <ThreeEqualPattern 
                articles={group.articles}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                categoryIcons={categoryIcons}
                onClickArticle={handleClick}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Featured Hero Card - Apple-style large hero
function FeaturedHeroCard({ article, onClick, formatDate, getTagColor, tagColorClasses, categoryIcons }) {
  const Icon = categoryIcons[article.category] || Tag
  
  return (
    <article 
      className="group relative overflow-hidden rounded-3xl cursor-pointer h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-900 to-gray-800"
      onClick={onClick}
    >
      {/* Background Image */}
      {article.image && (
        <>
          <img
            src={typeof article.image === 'string' ? article.image : article.image.url}
            alt={typeof article.image === 'string' ? article.title : (article.image.alt || article.title)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </>
      )}
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="p-8 lg:p-12 max-w-4xl">
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-6">
            <Icon className="w-5 h-5 text-white" />
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
              {article.category}
            </span>
            <span className="text-white/80 text-sm">
              {article.displayDate ? article.displayDate : formatDate(article.date)}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight group-hover:text-brand-teal transition-colors duration-300">
            {article.title}
          </h1>
          
          {/* Summary */}
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl">
            {article.summary}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center gap-6">
            {article.views && (
              <div className="flex items-center text-white/70">
                <Eye className="w-5 h-5 mr-2" />
                <span className="font-medium">{article.views.toLocaleString()} views</span>
              </div>
            )}
            <div className="flex items-center text-brand-teal font-semibold">
              <span>Read Full Story</span>
              <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

// Large + Medium + Medium Pattern  
function LargeMediumMediumPattern({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons, onClickArticle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      {/* Large Card (8 columns) - Same height as medium cards */}
      <div className="lg:col-span-8">
        <AppleMosaicCard
          article={articles[0]}
          size="large"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[0])}
          forceHeight="h-[380px]"
        />
      </div>
      
      {/* Two Medium Cards (4 columns) - Stack with equal heights */}
      <div className="lg:col-span-4 space-y-4 lg:space-y-6">
        <AppleMosaicCard
          article={articles[1]}
          size="medium"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[1])}
          forceHeight="h-[182px]"
        />
        {articles[2] && (
          <AppleMosaicCard
            article={articles[2]}
            size="medium"
            formatDate={formatDate}
            getTagColor={getTagColor}
            tagColorClasses={tagColorClasses}
            categoryIcons={categoryIcons}
            onClick={() => onClickArticle(articles[2])}
            forceHeight="h-[182px]"
          />
        )}
      </div>
    </div>
  )
}

// Medium + Medium + Small Pattern
function MediumMediumSmallPattern({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons, onClickArticle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      {/* Two Medium Cards (8 columns) - All same height */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <AppleMosaicCard
          article={articles[0]}
          size="medium"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[0])}
          forceHeight="h-[280px]"
        />
        <AppleMosaicCard
          article={articles[1]}
          size="medium"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[1])}
          forceHeight="h-[280px]"
        />
      </div>
      
      {/* Small Card (4 columns) - Same height as medium cards */}
      <div className="lg:col-span-4">
        <AppleMosaicCard
          article={articles[2]}
          size="small"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[2])}
          forceHeight="h-[280px]"
        />
      </div>
    </div>
  )
}

// Small + Large + Small Pattern
function SmallLargeSmallPattern({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons, onClickArticle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      {/* Small Card (3 columns) - Same height as large card */}
      <div className="lg:col-span-3 order-2 lg:order-1">
        <AppleMosaicCard
          article={articles[0]}
          size="small"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[0])}
          forceHeight="h-[280px]"
        />
      </div>
      
      {/* Large Card (6 columns) */}
      <div className="lg:col-span-6 order-1 lg:order-2">
        <AppleMosaicCard
          article={articles[1]}
          size="large"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[1])}
          forceHeight="h-[280px]"
        />
      </div>
      
      {/* Small Card (3 columns) - Same height as large card */}
      <div className="lg:col-span-3 order-3">
        <AppleMosaicCard
          article={articles[2]}
          size="small"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(articles[2])}
          forceHeight="h-[280px]"
        />
      </div>
    </div>
  )
}

// Four Small Cards in 2x2 Grid
function FourSmallPattern({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons, onClickArticle }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {articles.map((article, index) => (
        <AppleMosaicCard
          key={article.id}
          article={article}
          size="small"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(article)}
          forceHeight="h-[280px]"
        />
      ))}
    </div>
  )
}

// Full Width Pattern (Breaking News)
function FullWidthPattern({ article, formatDate, getTagColor, tagColorClasses, categoryIcons, onClickArticle }) {
  const Icon = categoryIcons[article.category] || Tag
  
  return (
    <article 
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white border-2 border-red-200 shadow-lg hover:shadow-2xl transition-all duration-500"
      onClick={() => onClickArticle(article)}
    >
      {/* Breaking News Banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-2 z-10">
        <span className="font-bold text-sm tracking-wide">🚨 BREAKING NEWS</span>
      </div>
      
      <div className="pt-10 p-6 lg:p-8 flex flex-col md:flex-row items-start gap-6 lg:gap-8">
        {/* Image */}
        {article.image && (
          <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-full md:w-48 lg:w-64 h-48 md:h-32 lg:h-40">
            <img
              src={typeof article.image === 'string' ? article.image : article.image.url}
              alt={typeof article.image === 'string' ? article.title : (article.image.alt || article.title)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-red-600" />
              <span className="px-3 py-1 rounded-full text-sm font-medium border border-red-200 bg-red-50 text-red-700">
                {article.category}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {article.displayDate ? article.displayDate : formatDate(article.date)}
            </span>
          </div>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">
            {article.title}
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
            {article.summary}
          </p>
          
          <div className="flex items-center text-red-600 font-semibold">
            <span>Read Breaking Story</span>
            <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </article>
  )
}

// Three Equal Pattern
function ThreeEqualPattern({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons, onClickArticle }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {articles.map((article, index) => (
        <AppleMosaicCard
          key={article.id}
          article={article}
          size="medium"
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
          onClick={() => onClickArticle(article)}
          forceHeight="h-[280px]"
        />
      ))}
    </div>
  )
}

// Enhanced Apple-Style Mosaic Card
function AppleMosaicCard({ article, size, formatDate, getTagColor, tagColorClasses, categoryIcons, onClick, forceHeight }) {
  const Icon = categoryIcons[article.category] || Tag
  
  // Size configurations
  const sizeConfig = {
    small: {
      imageHeight: 'h-32',
      titleSize: 'text-sm',
      titleLines: 'line-clamp-2',
      summaryLines: 'line-clamp-2',
      padding: 'p-3',
      cardHeight: 'h-[280px]'
    },
    medium: {
      imageHeight: 'h-36',
      titleSize: 'text-sm',
      titleLines: 'line-clamp-2',
      summaryLines: 'line-clamp-2',
      padding: 'p-4',
      cardHeight: 'h-[280px]'
    },
    large: {
      imageHeight: 'h-48',
      titleSize: 'text-base',
      titleLines: 'line-clamp-2',
      summaryLines: 'line-clamp-3',
      padding: 'p-4',
      cardHeight: 'h-[380px]'
    }
  }
  
  const config = sizeConfig[size] || sizeConfig.medium
  const finalHeight = forceHeight || config.cardHeight
  
  return (
    <article 
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-gray-100 ${finalHeight} flex flex-col`}
      onClick={onClick}
    >
      {/* Image */}
      {article.image && (
        <div className={`relative overflow-hidden ${config.imageHeight}`}>
          <img
            src={typeof article.image === 'string' ? article.image : article.image.url}
            alt={typeof article.image === 'string' ? article.title : (article.image.alt || article.title)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Date Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-xs font-semibold text-gray-700">
              {(article.displayDate || formatDate(article.date)).split(',')[0]}
            </span>
          </div>
          
          {/* Special Type Badge */}
          {article.type === 'breaking-news' && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              LIVE
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`${config.padding} overflow-hidden flex-grow flex flex-col`}>
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-3 h-3 text-brand-teal flex-shrink-0" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium border truncate ${
            tagColorClasses[getTagColor(article.category)]
          }`}>
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-brand-teal transition-colors leading-tight ${config.titleSize} ${config.titleLines}`}>
          {article.title}
        </h3>

        {/* Summary - Flexible area */}
        <div className="flex-grow">
          <p className={`text-gray-600 text-sm leading-relaxed mb-3 ${config.summaryLines}`}>
            {article.summary}
          </p>
        </div>

        {/* Footer - Always at bottom */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <div className="flex items-center gap-2 truncate">
            {article.views && size !== 'small' && (
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                <span>{Math.floor(article.views / 1000)}k</span>
              </div>
            )}
            <span className="truncate">{(article.displayDate || formatDate(article.date)).split(',')[0]}</span>
          </div>
          
          <ExternalLink className="w-3 h-3 text-brand-teal group-hover:translate-x-0.5 transition-transform duration-300 flex-shrink-0" />
        </div>
      </div>
    </article>
  )
}

// Standard Grid Layout
function GridLayout({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <GridCard
          key={article.id}
          article={article}
          index={index}
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
        />
      ))}
    </div>
  )
}

function GridCard({ article, index, formatDate, getTagColor, tagColorClasses, categoryIcons }) {
  const Icon = categoryIcons[article.category] || Tag
  
  const handleClick = () => {
    window.location.href = `/news/${article.id}`
  }

  return (
    <article 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      {/* Image */}
      {article.image && (
        <div className="relative overflow-hidden h-48">
          <img
            src={typeof article.image === 'string' ? article.image : article.image.url}
            alt={typeof article.image === 'string' ? article.title : (article.image.alt || article.title)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium text-gray-700">
            {(article.displayDate || formatDate(article.date)).replace(/,.*/, '')}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-4 h-4 text-brand-teal" />
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            tagColorClasses[getTagColor(article.category)]
          }`}>
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-teal transition-colors leading-tight">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {article.views && (
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="w-3 h-3 mr-1" />
              {article.views.toLocaleString()}
            </div>
          )}
          <div className="flex items-center text-sm font-medium text-brand-teal group-hover:text-brand-navy transition-colors">
            Read More
            <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </article>
  )
}

// List Layout
function ListLayout({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons }) {
  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <ListCard
          key={article.id}
          article={article}
          index={index}
          formatDate={formatDate}
          getTagColor={getTagColor}
          tagColorClasses={tagColorClasses}
          categoryIcons={categoryIcons}
        />
      ))}
    </div>
  )
}

function ListCard({ article, index, formatDate, getTagColor, tagColorClasses, categoryIcons }) {
  const Icon = categoryIcons[article.category] || Tag
  
  const handleClick = () => {
    window.location.href = `/news/${article.id}`
  }

  return (
    <article 
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={handleClick}
    >
      <div className="flex items-start gap-6 p-6">
        {/* Image */}
        {article.image && (
          <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-48 h-32">
            <img
              src={typeof article.image === 'string' ? article.image : article.image.url}
              alt={typeof article.image === 'string' ? article.title : (article.image.alt || article.title)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Category & Meta */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-brand-teal" />
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                tagColorClasses[getTagColor(article.category)]
              }`}>
                {article.category}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {article.displayDate ? article.displayDate : formatDate(article.date)}
              </div>
              {article.views && (
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {article.views.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
            {article.summary}
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

// "In the Loop" Horizontal Scrollable Section
function InTheLoopSection({ articles, formatDate, getTagColor, tagColorClasses, categoryIcons }) {
  const scrollContainerRef = React.useRef(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const handleArticleClick = (article) => {
    window.location.href = `/news/${article.id}`
  }

  return (
    <section className="bg-white py-16 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">In the Loop</h2>
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="/news"
              className="text-brand-teal hover:text-brand-teal/80 font-medium transition-colors"
            >
              View All
            </a>
          </div>
          <div className="sm:hidden">
            <a
              href="/news"
              className="text-brand-teal hover:text-brand-teal/80 font-medium transition-colors text-sm"
            >
              View All
            </a>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {articles.slice(0, 8).map((article, index) => (
              <InTheLoopCard
                key={article.id}
                article={article}
                onClick={() => handleArticleClick(article)}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                categoryIcons={categoryIcons}
                index={index}
              />
            ))}
          </div>

          {/* Gradient Fade Effects - Only on larger screens */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Mobile: Show scroll hint */}
        <div className="sm:hidden flex justify-center mt-4">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Swipe to explore more
          </p>
        </div>
      </div>
    </section>
  )
}

// Individual Card for "In the Loop" Section
function InTheLoopCard({ article, onClick, formatDate, getTagColor, tagColorClasses, categoryIcons, index }) {
  const Icon = categoryIcons[article.category] || Tag

  return (
    <article
      onClick={onClick}
      className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer group border border-gray-100 animate-slideInRight snap-center"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={article.image?.url || article.image || 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1200&auto=format&fit=crop'}
          alt={article.image?.alt || article.title || 'News article image'}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            if (e.target.src !== 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1200&auto=format&fit=crop') {
              e.target.src = 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1200&auto=format&fit=crop'
            }
          }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 border border-white/20">
            <Icon className="w-3 h-3" />
            <span className="hidden sm:inline">{article.category}</span>
          </span>
        </div>

        {/* Breaking News Banner */}
        {article.type === 'breaking-news' && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              BREAKING NEWS
            </div>
          </div>
        )}

        {/* Author Avatar */}
        {article.author?.avatar && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6">
        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            {formatDate(article.publishedAt)}
          </div>
          {article.readTime && (
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {article.readTime}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-teal transition-colors leading-tight">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
          {article.summary}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className={`px-2 py-1 rounded-full text-xs font-medium border ${tagColorClasses[getTagColor(tag)]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Info */}
        {article.author && (
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{article.author.name}</p>
              {article.author.role && (
                <p className="text-xs text-gray-500 truncate">{article.author.role}</p>
              )}
            </div>
            <div className="flex items-center gap-3 text-gray-400 flex-shrink-0">
              {article.views && (
                <div className="flex items-center gap-1 text-xs">
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">{article.views}</span>
                </div>
              )}
              <ExternalLink className="w-4 h-4 group-hover:text-brand-teal group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
