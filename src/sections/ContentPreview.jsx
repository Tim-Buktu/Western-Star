import React, { useEffect, useState } from 'react'
import { Clock, ArrowUpRight, Flame, TrendingUp, Eye, Share2, Bookmark } from 'lucide-react'
import { getCMSData, getAvailableTags } from '../utils/cms'

export default function ContentPreview() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [headlineList, setHeadlineList] = useState([])
  const [availableTags, setAvailableTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const [trending, tags] = await Promise.all([
          getCMSData('trendingTopics'),
          getAvailableTags(),
        ])
        if (cancelled) return
        // trending may be an array; normalize to list
        const rawItems = Array.isArray(trending?.items) ? trending.items : Array.isArray(trending) ? trending : []
        const items = rawItems.map(it => ({
          ...it,
          // Normalize fields possibly coming from backend aggregate
          tags: Array.isArray(it.tags) ? it.tags : [],
          image: it.image?.url || it.image || '',
        }))
        setHeadlineList(items)
        setAvailableTags(Array.isArray(tags) ? tags : [])
      } catch (e) {
        if (!cancelled) {
          console.error('Failed to load content preview data:', e)
          setHeadlineList([])
          setAvailableTags([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="bg-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Latest News</h2>
          <p className="text-red-100">Loading…</p>
        </div>
      </section>
    )
  }

  if (headlineList.length === 0) {
    return (
      <section className="bg-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Latest News</h2>
          <p className="text-red-100">No articles available</p>
        </div>
      </section>
    )
  }

  // Get categories from available tags only
  const getCategories = () => {
    const tagCategories = (availableTags || [])
      .filter(tag => tag.active || tag.isActive)
      .map(tag => tag.value || tag.name)
    
    return ['ALL', ...tagCategories]
  }

  const categories = getCategories()
  
  // Enhanced filtering to work with tags field and sorting by position
  const filteredItems = selectedCategory === 'ALL' 
    ? headlineList 
    : headlineList.filter(item => {
        // Check tags field
        if (item.tags && Array.isArray(item.tags)) {
          return item.tags.some(tag => {
            const tagValue = typeof tag === 'string' ? tag : (tag.value || tag.name)
            return tagValue === selectedCategory
          })
        }
        
        return false
      })

  // Sort by position (ascending order, with items without position at the end)
  const sortedItems = [...filteredItems].sort((a, b) => {
    const positionA = a.position || 9999
    const positionB = b.position || 9999
    return positionA - positionB
  })
  
  const [lead, second, ...rest] = sortedItems
  const sideArticles = rest.slice(0, 3)
  const trendingHeadlines = rest.slice(3, 8)

  // Safety check for lead article
  if (!lead) {
    return (
      <section className="bg-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Latest News</h2>
          <p className="text-red-100">No articles available for selected category</p>
        </div>
      </section>
    )
  }

  // Get display info for category buttons
  const getCategoryDisplayInfo = (category) => {
    if (category === 'ALL') return { label: 'ALL', color: null }
    
    const tag = availableTags.find(t => t.value === category)
    return {
      label: tag ? tag.label : category,
      color: tag ? tag.color : null
    }
  }

  // Helper function to get primary tag for display
  const getPrimaryTag = (article) => {
    if (!article || !article.tags || !Array.isArray(article.tags) || article.tags.length === 0) {
      return null
    }
    
    // Get the first tag
    const firstTag = article.tags[0]
    const tagValue = typeof firstTag === 'string' ? firstTag : firstTag.value
    
    // Find the tag info for styling
    const tagInfo = (availableTags || []).find(t => (t.value || t.name) === tagValue)
    return {
      value: tagValue,
      label: tagInfo ? (tagInfo.label || tagInfo.name) : tagValue,
      color: tagInfo ? tagInfo.color : 'gray'
    }
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-red-400/20 to-orange-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-purple-300/15 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-emerald-300/10 to-teal-400/10 rounded-full blur-xl"></div>
        {/* Geometric shapes */}
        <div className="absolute top-40 left-10 w-3 h-3 bg-red-500/40 rounded-full"></div>
        <div className="absolute bottom-40 right-16 w-2 h-2 bg-blue-500/40 rounded-full"></div>
        <div className="absolute top-60 right-1/4 w-1 h-16 bg-gradient-to-b from-orange-400/30 to-transparent"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20">
        {/* Header with Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Breaking News
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
                Headlines
              </h2>
              <p className="text-gray-600 text-lg">Stay informed with the latest developments</p>
            </div>
            
            {/* Enhanced Category Filters with Active Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
              {categories.map((category, index) => {
                const categoryInfo = getCategoryDisplayInfo(category)
                const isActive = selectedCategory === category
                const colors = [
                  'from-red-500 to-rose-600',
                  'from-blue-500 to-cyan-600', 
                  'from-emerald-500 to-teal-600',
                  'from-purple-500 to-violet-600',
                  'from-orange-500 to-amber-600',
                  'from-pink-500 to-rose-600',
                  'from-indigo-500 to-blue-600',
                  'from-green-500 to-emerald-600',
                  'from-yellow-500 to-orange-500',
                  'from-slate-500 to-gray-600'
                ]
                const gradientColor = colors[index % colors.length]
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                      isActive
                        ? `bg-gradient-to-r ${gradientColor} text-white shadow-lg hover:shadow-xl`
                        : 'bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200/50 hover:bg-white hover:shadow-md hover:border-gray-300'
                    }`}
                  >
                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse">
                        <div className="absolute inset-0.5 bg-red-500 rounded-full"></div>
                      </div>
                    )}
                    
                    {categoryInfo.label}
                    
                    {/* Results count for active filter */}
                    {isActive && category !== 'ALL' && (
                      <span className="ml-2 bg-white/20 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full">
                        {filteredItems.length}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Creative Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lead Story - Enhanced Design */}
          <div className="lg:col-span-7">
            <article className="group cursor-pointer h-full">
              <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl shadow-gray-900/20 transform hover:scale-[1.02] transition-all duration-500">
                {lead?.image && (
                  <img 
                    src={lead.image} 
                    alt={lead.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                )}
                {/* Creative overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-blue-600/10" />
                
                {/* Floating elements */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    {getPrimaryTag(lead) && (
                      <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                        {getPrimaryTag(lead).label}
                      </span>
                    )}
                    <span className="text-white/90 text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {lead.date}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-red-100 transition-colors">
                    {lead.title}
                  </h1>
                  
                  {lead.source && (
                    <div className="text-orange-300 text-sm font-semibold mb-4 flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                      {lead.source}
                    </div>
                  )}
                  
                  <p className="text-gray-200 leading-relaxed text-base line-clamp-3 mb-6 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                    {lead.description || lead.summary}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Read More
                    </button>
                    <div className="flex gap-2">
                      <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Enhanced Secondary Content */}
          <div className="lg:col-span-5 space-y-6">
            {/* Secondary Story with Creative Design */}
            {second ? (
              <article className="group cursor-pointer">
                <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 shadow-xl shadow-blue-600/20 transform hover:scale-105 transition-all duration-500">
                  {second?.image && (
                    <img 
                      src={second.image} 
                      alt={second?.title || 'Secondary story'} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-overlay" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {getPrimaryTag(second) && (
                        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                          {getPrimaryTag(second).label}
                        </span>
                      )}
                      <span className="text-blue-200 text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">{second?.date || ''}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-blue-100 transition-colors line-clamp-2">
                      {second?.title || 'Untitled'}
                    </h2>
                    {second?.source && (
                      <div className="text-purple-300 text-xs mb-2 flex items-center gap-1">
                        <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                        {second.source}
                      </div>
                    )}
                    <p className="text-gray-300 text-sm line-clamp-2">{second?.description || second?.summary || ''}</p>
                  </div>
                </div>
              </article>
            ) : (
              // Graceful placeholder when no secondary story exists
              <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300/60 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="inline-flex items-center gap-2 text-slate-600 mb-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Preview</span>
                  </div>
                  <p className="text-slate-700 font-semibold">Add more headlines to see a secondary story here.</p>
                </div>
              </div>
            )}

            {/* Creative Quick Stories */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                Quick Reads
              </h3>
              {sideArticles.map((article, index) => {
                const cardColors = [
                  'from-emerald-50 to-teal-50 border-emerald-200',
                  'from-rose-50 to-pink-50 border-rose-200', 
                  'from-amber-50 to-orange-50 border-amber-200'
                ]
                const textColors = [
                  'text-emerald-700',
                  'text-rose-700',
                  'text-amber-700'
                ]
                return (
                  <article key={article.id} className="group cursor-pointer">
                    <div className={`flex gap-4 p-4 rounded-xl bg-gradient-to-br ${cardColors[index % cardColors.length]} border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                      {article?.image && (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                        />
                      )}
                      {!article?.image && (
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getPrimaryTag(article) && (
                            <span className={`inline-block ${textColors[index % textColors.length]} bg-white/80 text-xs font-semibold px-2 py-1 rounded-lg`}>
                              {getPrimaryTag(article).label}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {article.date} • {article.source}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* Creative Trending Headlines Panel */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/30 relative">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl">Trending Now</h3>
                  <p className="text-gray-400 text-sm">Most discussed stories</p>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingHeadlines.map((headline, index) => {
                const gradients = [
                  'from-red-500/90 to-orange-600/90',
                  'from-blue-500/90 to-purple-600/90',
                  'from-emerald-500/90 to-teal-600/90',
                  'from-pink-500/90 to-rose-600/90',
                  'from-indigo-500/90 to-blue-600/90'
                ]
                return (
                  <div key={headline.id} className="group cursor-pointer">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 transform hover:-translate-y-2 hover:shadow-2xl">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`flex-none w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} text-white text-lg font-bold flex items-center justify-center shadow-lg`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-base font-bold leading-tight line-clamp-2 group-hover:text-orange-300 transition-colors mb-2">
                            {headline.title}
                          </h4>
                          {headline.source && (
                            <div className="text-orange-400 text-sm font-medium mb-2 flex items-center gap-1">
                              <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                              {headline.source}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {headline.description && (
                        <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {headline.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        {getPrimaryTag(headline) && (
                          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                            {getPrimaryTag(headline).label}
                          </span>
                        )}
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold px-8 py-4 rounded-full hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <span>Explore All Stories</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
