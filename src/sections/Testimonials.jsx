import React, { useState, useEffect, useRef } from 'react'
import { Star, Quote, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { getCMSData } from '../utils/cms'

export default function Testimonials() {
  const [testimonialsData, setTestimonialsData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    // Initial load
    setTestimonialsData(getCMSData('testimonials'))

    // Listen for CMS updates
    const handleCMSUpdate = (event) => {
      if (event.detail.section === 'testimonials') {
        setTestimonialsData(getCMSData('testimonials'))
      }
    }

    window.addEventListener('cmsDataUpdated', handleCMSUpdate)
    
    return () => {
      window.removeEventListener('cmsDataUpdated', handleCMSUpdate)
    }
  }, [])

  // Calculate derived values
  const quotes = testimonialsData?.items?.filter(item => item.isActive) || []
  const cardWidth = 400 // Approximate width of each card including gap
  const visibleCards = Math.min(2, quotes.length)
  const maxIndex = Math.max(0, quotes.length - visibleCards)

  const scroll = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(prev => Math.max(0, prev - 1))
    } else {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
    }
  }

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (quotes.length > 0) {
      scrollToIndex(currentIndex)
    }
  }, [currentIndex, quotes.length])

  // Early returns AFTER all hooks
  if (!testimonialsData) {
    return (
      <section id="testimonials" className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50/30">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimonials</h2>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (quotes.length === 0) {
    return (
      <section id="testimonials" className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50/30">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimonials</h2>
            <p className="text-gray-600">No testimonials available...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      {/* Professional background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-48 left-1/4 w-1 h-16 bg-gradient-to-b from-indigo-200/40 to-transparent"></div>
        <div className="absolute bottom-48 right-1/3 w-1 h-12 bg-gradient-to-b from-violet-200/40 to-transparent"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-32">
        {/* Professional Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-indigo-50 border border-slate-200/50 text-slate-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-sm">
            <Heart className="w-4 h-4 text-indigo-600" />
            <span>Client Success Stories</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
            {testimonialsData.title || "Trusted by Industry Leaders"}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {testimonialsData.subtitle || "Join thousands of professionals who rely on our insights for strategic decision-making and competitive advantage"}
          </p>
        </div>
        
        {/* Professional Testimonials Carousel */}
        <div className="relative">
          {/* Refined navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-6">
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:border-slate-300 hover:shadow-md transform hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-6">
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:border-slate-300 hover:shadow-md transform hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Professional carousel container */}
          <div className="overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
            >
              {quotes.map((q, index) => {
                const colorSchemes = [
                  { 
                    gradient: 'from-blue-600 to-blue-700', 
                    bg: 'from-blue-50/80 to-blue-100/50',
                    border: 'border-blue-100',
                    accent: 'text-blue-900',
                    glow: 'shadow-blue-500/10',
                    quote: 'text-blue-600'
                  },
                  { 
                    gradient: 'from-indigo-600 to-indigo-700', 
                    bg: 'from-indigo-50/80 to-indigo-100/50',
                    border: 'border-indigo-100',
                    accent: 'text-indigo-900',
                    glow: 'shadow-indigo-500/10',
                    quote: 'text-indigo-600'
                  },
                  { 
                    gradient: 'from-violet-600 to-violet-700', 
                    bg: 'from-violet-50/80 to-violet-100/50',
                    border: 'border-violet-100',
                    accent: 'text-violet-900',
                    glow: 'shadow-violet-500/10',
                    quote: 'text-violet-600'
                  }
                ];
                const scheme = colorSchemes[index % colorSchemes.length];
                
                return (
                  <figure key={q.id || q.name} className="group flex-shrink-0 w-96 snap-center">
                    <div className={`relative rounded-2xl border ${scheme.border} bg-gradient-to-br ${scheme.bg} backdrop-blur-sm p-8 hover:shadow-lg ${scheme.glow} transition-all duration-300 h-full transform hover:-translate-y-1`}>
                      {/* Professional quote icon */}
                      <div className={`absolute top-6 right-6 w-10 h-10 bg-white border ${scheme.border} rounded-xl flex items-center justify-center shadow-sm`}>
                        <Quote className={`w-5 h-5 ${scheme.quote}`} />
                      </div>
                      
                      {/* Star rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${scheme.accent} fill-current opacity-80`} />
                        ))}
                      </div>
                      
                      <blockquote className="text-slate-700 leading-relaxed text-base mb-8 font-medium">
                        "{q.text}"
                      </blockquote>
                      
                      <figcaption className="flex items-center gap-4 mt-auto">
                        <div className={`w-12 h-12 bg-gradient-to-br ${scheme.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                          {q.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-base">{q.name}</div>
                          <div className={`text-sm ${scheme.accent} font-medium`}>{q.title}</div>
                        </div>
                      </figcaption>
                    </div>
                  </figure>
                )
              })}
            </div>
          </div>

          {/* Refined carousel dots indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {quotes.length > visibleCards && Array.from({ length: Math.max(1, quotes.length - visibleCards + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indigo-600 w-8' 
                    : 'bg-slate-300 w-2 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced bottom section */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-3xl p-10 max-w-3xl mx-auto shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-gray-900">10,000+</div>
                <div className="text-gray-600 font-medium">Trusted Professionals</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Community of Decision Makers
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Connect with industry leaders who rely on our insights for strategic advantage.
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-cyan-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Join the Community
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
