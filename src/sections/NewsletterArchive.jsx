import React, { useState, useEffect, useRef } from 'react'
import { Calendar, ArrowRight, Mail, Archive, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { getCMSData } from '../utils/cms'

export default function NewsletterArchive() {
  const [newslettersData, setNewslettersData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplayRef = useRef(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const data = await getCMSData('newsletters')
        if (!cancelled) setNewslettersData(data)
      } catch (e) {
        console.error('Failed to load newsletters:', e)
      }
    }
    load()

    // Listen for CMS updates
    const handleCMSUpdate = async (event) => {
      if (event.detail.section === 'newsletters') {
        try {
          const updatedData = await getCMSData('newsletters')
          if (!cancelled) setNewslettersData(updatedData)
        } catch (e) {
          console.error('Failed to refresh newsletters:', e)
        }
      }
    }

    window.addEventListener('cmsDataUpdated', handleCMSUpdate)
    
    return () => {
      cancelled = true
      window.removeEventListener('cmsDataUpdated', handleCMSUpdate)
    }
  }, [])

  // Filter newsletters to show only past 10 days
  const getRecentNewsletters = () => {
    if (!newslettersData?.items?.length) return []
    
    const today = new Date()
    const tenDaysAgo = new Date(today.getTime() - (10 * 24 * 60 * 60 * 1000))
    
    return newslettersData.items
      .filter(newsletter => {
        const newsletterDate = new Date(newsletter.date)
        return newsletterDate >= tenDaysAgo && newsletterDate <= today
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  const recentNewsletters = getRecentNewsletters()

  // Auto-play functionality
  useEffect(() => {
    if (recentNewsletters.length <= 1) return

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= recentNewsletters.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Change every 4 seconds

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [recentNewsletters.length])

  const nextSlide = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setCurrentIndex((prevIndex) => 
      prevIndex >= recentNewsletters.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? recentNewsletters.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setCurrentIndex(index)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatDateShort = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (!recentNewsletters.length) {
    return (
      <section id="archive" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6">
              <Archive className="w-4 h-4" />
              <span>Daily Archive</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Newsletters</h2>
            <p className="text-gray-600">No newsletters from the past 10 days available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="archive" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6 shadow-lg">
            <Archive className="w-4 h-4" />
            <span>Daily Archive</span>
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
              Past 10 Days
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Catch up on recent editions with our daily insights and analysis
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-12">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / Math.min(recentNewsletters.length, 3))}%)`,
                width: `${Math.max(recentNewsletters.length * (100 / Math.min(recentNewsletters.length, 3)), 100)}%`
              }}
            >
              {recentNewsletters.map((newsletter, index) => (
                <div 
                  key={newsletter.id} 
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / Math.min(recentNewsletters.length, 3)}%` }}
                >
                  <div 
                    className="h-full bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer group"
                    onClick={() => {
                      if (typeof window !== 'undefined' && typeof window.navigateTo === 'function') {
                        window.navigateTo(`/newsletter/${newsletter.id}`)
                      } else {
                        window.location.href = `/newsletter/${newsletter.id}`
                      }
                    }}
                  >
                    {/* Newsletter Image */}
                    {(newsletter.image || newsletter.image?.url) && (
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={typeof newsletter.image === 'string' ? newsletter.image : newsletter.image.url}
                          alt={typeof newsletter.image === 'string' ? newsletter.title : (newsletter.image.alt || newsletter.title)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Date Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-bold text-gray-700">
                          {formatDateShort(newsletter.date)}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-blue-600 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{formatDate(newsletter.date)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                        {newsletter.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {newsletter.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Daily Brief</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {recentNewsletters.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a 
            href="/newsroom" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Archive className="w-5 h-5" />
            View Complete Archive
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
