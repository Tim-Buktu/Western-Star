import React, { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Tag, Share2, Clock, ExternalLink } from 'lucide-react'
import { getCMSData } from '../utils/cms'
import api from '../utils/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NewsletterDetailPage({ newsletterId }) {
  const [newsletter, setNewsletter] = useState(null)
  const [relatedNewsletters, setRelatedNewsletters] = useState([])
  const [loading, setLoading] = useState(true)

  const [availableTags, setAvailableTags] = useState([])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const [nlData, tags] = await Promise.all([
          getCMSData('newsletters'),
          getCMSData('availableTags'),
        ])
        if (cancelled) return
        setAvailableTags(Array.isArray(tags) ? tags : [])
        let current = (nlData?.items || []).find(n => n.id.toString() === newsletterId)
        // If not found or missing fields, fetch directly from API for freshest data
        if (!current) {
          try {
            const fresh = await api.getNewsletter(newsletterId)
            current = fresh || null
          } catch (_) {
            // ignore
          }
        }
        if (current) {
          setNewsletter({
            ...current,
            tags: Array.isArray(current.tags) ? current.tags : [],
          })
          const related = (nlData.items || [])
            .filter(n => n.id !== current.id && n.tags?.some(tag => current.tags?.includes(tag)))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3)
          setRelatedNewsletters(related)
        } else {
          setNewsletter(null)
          setRelatedNewsletters([])
        }
      } catch (e) {
        if (!cancelled) {
          console.error('Failed to load newsletter detail:', e)
          setNewsletter(null)
          setRelatedNewsletters([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    // live updates
    const onCMSUpdate = () => load()
    window.addEventListener('cmsDataUpdated', onCMSUpdate)
    return () => { cancelled = true; window.removeEventListener('cmsDataUpdated', onCMSUpdate) }
  }, [newsletterId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading newsletter...</p>
        </div>
      </div>
    )
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Newsletter Not Found</h1>
            <p className="text-gray-600 mb-8">The newsletter you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => window.location.href = '/newsroom'}
              className="inline-flex items-center px-6 py-3 bg-brand-teal text-white rounded-xl hover:bg-brand-teal/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Newsroom
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    pink: 'bg-pink-100 text-pink-800 border-pink-200',
    cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsletter.title,
          text: newsletter.keyDiscussion,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Back Navigation */}
      <div className="border-b border-gray-200/80 bg-white/90 backdrop-blur-md sticky top-[72px] z-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.location.href = '/newsroom'}
              className="inline-flex items-center text-sm text-gray-600 hover:text-brand-teal transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Newsroom
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center text-sm text-gray-600 hover:text-brand-teal transition-colors duration-200 group"
              >
                <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 animate-fadeInUp">
            {newsletter.tags.map((tag) => (
              <span
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 hover:scale-105 ${
                  tagColorClasses[getTagColor(tag)]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight animate-fadeInUp" style={{animationDelay: '100ms'}}>
            {newsletter.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-10 animate-fadeInUp" style={{animationDelay: '200ms'}}>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 mr-2 text-brand-teal" />
              {newsletter.displayDate ? newsletter.displayDate : formatDate(newsletter.date)}
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 mr-2 text-brand-teal" />
              {Math.max(1, Math.ceil(newsletter.content?.split(' ').length / 200))} min read
            </div>
            <button
              onClick={handleShare}
              className="flex items-center bg-gray-50 hover:bg-brand-teal hover:text-white px-4 py-2 rounded-full transition-all duration-200 group"
            >
              <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Share
            </button>
          </div>

          {/* Featured Image */}
          {(newsletter.image || newsletter.image?.url) && (
            <div className="mb-10 animate-fadeInUp" style={{animationDelay: '300ms'}}>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={typeof newsletter.image === 'string' ? newsletter.image : newsletter.image.url}
                  alt={typeof newsletter.image === 'string' ? newsletter.title : (newsletter.image.alt || newsletter.title)}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          )}

          {/* Key Discussion */}
          <div className="bg-gradient-to-r from-brand-teal/5 via-brand-navy/5 to-brand-coral/5 rounded-3xl p-8 mb-10 border border-gray-100 animate-fadeInUp" style={{animationDelay: '400ms'}}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-teal rounded-2xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Discussion Points</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {newsletter.keyDiscussion}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Newsletter Content */}
        <div className="prose prose-lg max-w-none">
          {newsletter.content ? (
            <div 
              className="leading-relaxed text-gray-800"
              dangerouslySetInnerHTML={{ __html: newsletter.content }}
            />
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="text-yellow-800">
                Full newsletter content is being processed and will be available soon.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Link */}
        {newsletter.newsletterUrl && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Read Full Newsletter</h3>
                <p className="text-sm text-gray-600">
                  Access the complete newsletter with all formatting and images.
                </p>
              </div>
              <a
                href={newsletter.newsletterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-brand-teal text-white rounded-xl hover:bg-brand-teal/90 transition-colors"
              >
                Open Newsletter
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        )}
      </article>

      {/* Related Newsletters */}
      {relatedNewsletters.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">Related Newsletters</h2>
            <p className="text-gray-600 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              Discover more insights on similar topics
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedNewsletters.map((related, index) => (
              <RelatedNewsletterCard
                key={related.id}
                newsletter={related}
                formatDate={formatDate}
                getTagColor={getTagColor}
                tagColorClasses={tagColorClasses}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

// Related Newsletter Card Component
function RelatedNewsletterCard({ newsletter, formatDate, getTagColor, tagColorClasses, index }) {
  const handleClick = () => {
    window.location.href = `/newsletter/${newsletter.id}`
  }

  return (
    <article 
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 animate-fadeInUp"
      style={{animationDelay: `${(index + 2) * 100}ms`}}
      onClick={handleClick}
    >
      {(newsletter.image || newsletter.image?.url) && (
        <div className="relative overflow-hidden">
          <img
            src={typeof newsletter.image === 'string' ? newsletter.image : newsletter.image.url}
            alt={typeof newsletter.image === 'string' ? newsletter.title : (newsletter.image.alt || newsletter.title)}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap gap-1 mb-3">
          {newsletter.tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                tagColorClasses[getTagColor(tag)]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-teal transition-colors leading-tight">
          {newsletter.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {newsletter.displayDate ? newsletter.displayDate : formatDate(newsletter.date)}
          </div>
          <div className="flex items-center text-sm font-medium text-brand-teal group-hover:text-brand-navy transition-colors">
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </article>
  )
}
