import React, { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus, Eye, Tag, Users, ChevronRight, ExternalLink, PlayCircle, Download } from 'lucide-react'
import { getCMSData, processArticleContent, getRelatedArticles } from '../utils/cms'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NewsArticlePage({ articleId }) {
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  // Local state for CMS data
  const [newsData, setNewsData] = useState({ items: [] })
  const [availableTags, setAvailableTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const [news, tags] = await Promise.all([
          getCMSData('news'),
          getCMSData('availableTags'),
        ])
        if (cancelled) return
        setNewsData(news || { items: [] })
        setAvailableTags(Array.isArray(tags) ? tags : [])

        const found = (news?.items || news?.articles || []).find(item => item.id.toString() === articleId)
        if (found) {
          const processedArticle = await processArticleContent(found)
          if (!cancelled) setArticle(processedArticle)
          const related = await getRelatedArticles(found.tags || [], found.id)
          if (!cancelled) setRelatedArticles(related)
        } else {
          if (!cancelled) {
            setArticle(null)
            setRelatedArticles([])
          }
        }
      } catch (e) {
        if (!cancelled) {
          console.error('Failed to load article data:', e)
          setArticle(null)
          setRelatedArticles([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [articleId])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))

      // Update active section based on scroll position
      const sections = document.querySelectorAll('[data-section]')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.dataset.section)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content?.replace(/<[^>]*>/g, '').split(' ').length || 0
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  }

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  if (loading || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 h-1 bg-gray-100 z-40">
        <div 
          className="h-full bg-gradient-to-r from-brand-teal to-brand-coral transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Article Header */}
      <article className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Image with Overlay */}
          {article.image && (
            <div className="absolute inset-0">
              <img
                src={typeof article.image === 'string' ? article.image : article.image.url}
                alt={typeof article.image === 'string' ? article.title : (article.image.alt || article.title)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
            </div>
          )}
          
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 lg:py-24">
            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Newsroom
            </button>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                tagColorClasses[getTagColor(article.category)]
              } bg-white`}>
                {article.category}
              </span>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {article.displayDate ? article.displayDate : formatDate(article.date)}
              </div>
              <div className="flex items-center text-white/80 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {estimateReadingTime(article.content)} min read
              </div>
              {article.views && (
                <div className="flex items-center text-white/80 text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  {article.views.toLocaleString()} views
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Summary */}
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mb-8">
              {article.summary}
            </p>

            {/* Author & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {article.author && (
                  <div className="flex items-center gap-3">
                    {article.author.avatar && (
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-10 h-10 rounded-full ring-2 ring-white/20"
                      />
                    )}
                    <div>
                      <div className="font-medium text-white">{article.author.name}</div>
                      {article.author.role && (
                        <div className="text-sm text-white/70">{article.author.role}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={shareArticle}
                  className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 backdrop-blur-sm rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-brand-teal text-white' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="relative bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12" data-section="tags">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                      tagColorClasses[getTagColor(tag)]
                    }`}
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Main Content */}
            <div 
              className="prose prose-lg prose-gray max-w-none"
              data-section="content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Key Insights/Highlights */}
            {article.insights && (
              <div className="mt-12 p-8 bg-gradient-to-br from-brand-teal/5 to-brand-coral/5 rounded-3xl border border-brand-teal/10" data-section="insights">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">!</span>
                  </div>
                  Key Insights
                </h3>
                <ul className="space-y-4">
                  {article.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-brand-coral rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Downloads/Resources */}
            {article.resources && (
              <div className="mt-12" data-section="resources">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h3>
                <div className="grid gap-4">
                  {article.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                          {resource.type === 'video' ? (
                            <PlayCircle className="w-5 h-5 text-brand-teal" />
                          ) : (
                            <Download className="w-5 h-5 text-brand-teal" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{resource.title}</div>
                          <div className="text-sm text-gray-500">{resource.description}</div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-brand-teal transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Article Footer Actions */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Last updated: {formatDate(article.lastUpdated || article.date)}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={shareArticle}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-teal hover:bg-brand-teal hover:text-white rounded-xl border border-brand-teal transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
                      isBookmarked 
                        ? 'bg-brand-teal text-white border-brand-teal' 
                        : 'text-brand-teal hover:bg-brand-teal hover:text-white border-brand-teal'
                    }`}
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore more insights on similar topics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedArticles.map((related, index) => (
                  <RelatedArticleCard 
                    key={related.id} 
                    article={related} 
                    index={index}
                    formatDate={formatDate}
                    getTagColor={getTagColor}
                    tagColorClasses={tagColorClasses}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  )
}

// Related Article Card Component
function RelatedArticleCard({ article, index, formatDate, getTagColor, tagColorClasses }) {
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
            tagColorClasses[getTagColor(article.category)]
          }`}>
            {article.category}
          </span>
          <span className="text-xs text-gray-500">
            {(article.displayDate || formatDate(article.date)).replace(/,.*/, '')}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {article.summary}
        </p>

        {/* Read More */}
        <div className="flex items-center text-sm font-medium text-brand-teal group-hover:text-brand-navy transition-colors">
          Read Article
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </article>
  )
}
