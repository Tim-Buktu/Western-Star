import React, { useEffect, useState } from 'react'
import { ArrowRight, Play, Sparkles, TrendingUp } from 'lucide-react'
import { getCMSData } from '../utils/cms'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [heroData, setHeroData] = useState({})
  const [siteData, setSiteData] = useState({})

  useEffect(() => {
    setMounted(true)
    
    // Load hero data
    const loadData = async () => {
      try {
        const [hero, site] = await Promise.all([
          getCMSData('hero'),
          getCMSData('site')
        ])
        setHeroData(hero || {})
        setSiteData(site || {})
      } catch (error) {
        console.error('Error loading hero data:', error)
        setHeroData({})
        setSiteData({})
      }
    }
    
    loadData()

    // Listen to CMS updates to keep hero/site live
    const handleCMSUpdate = async (event) => {
      const section = event?.detail?.section
      if (section === 'hero' || section === 'site') {
        try {
          const [hero, site] = await Promise.all([
            getCMSData('hero'),
            getCMSData('site')
          ])
          setHeroData(hero || {})
          setSiteData(site || {})
        } catch (e) {
          console.error('Failed to refresh hero/site after CMS update', e)
        }
      }
    }

    window.addEventListener('cmsDataUpdated', handleCMSUpdate)
    return () => window.removeEventListener('cmsDataUpdated', handleCMSUpdate)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-gray/30 via-white to-brand-teal/5">
      {/* Enhanced Creative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-teal/20 to-brand-coral/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-brand-orange/15 to-brand-coral/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-brand-navy/10 to-brand-teal/10 rounded-full blur-2xl"></div>
        
        {/* Enhanced Geometric decorations */}
        <div className="absolute top-40 right-1/4 w-4 h-4 bg-brand-coral/80 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-brand-teal/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-16 w-2 h-20 bg-gradient-to-b from-brand-orange/40 to-transparent animate-pulse"></div>
        <div className="absolute bottom-60 right-16 w-1 h-16 bg-gradient-to-b from-brand-teal/40 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-brand-orange rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-brand-teal rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced Badge with animation */}
          {heroData?.badge?.isActive && (
            <div className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-brand-teal to-brand-coral text-white px-8 py-4 text-sm font-bold mb-10 shadow-xl hover:shadow-2xl transform transition-all duration-500 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span className="animate-pulse">{heroData.badge.text}</span>
              <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Enhanced Main Headline with staggered animation */}
          <h1 className={`text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-10 transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-brand-navy via-brand-teal to-brand-coral bg-clip-text text-transparent animate-gradient bg-300% hover:animate-none transition-all duration-1000">
              {heroData?.title || siteData?.title}
            </span>
          </h1>

          {/* Enhanced Subtitle with fade-in animation */}
          <p className={`text-lg sm:text-xl lg:text-2xl text-brand-navy/70 leading-relaxed mb-14 max-w-4xl mx-auto font-medium transition-all duration-700 delay-300 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {heroData?.subtitle || siteData?.description}
          </p>

          {/* Enhanced CTA Buttons with staggered animation */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 transition-all duration-700 delay-500 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <a
              href="https://westernstar.beehiiv.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-coral px-12 py-6 text-lg font-bold text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-teal to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative group-hover:animate-pulse">Get Started Today</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300"></div>
            </a>
            
            <button className="group inline-flex items-center gap-4 rounded-2xl border-2 border-brand-navy/20 bg-white/90 backdrop-blur-lg px-12 py-6 text-lg font-bold text-brand-navy hover:border-brand-teal hover:text-brand-teal hover:bg-white hover:shadow-xl transition-all duration-300">
              <Play className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:animate-pulse">Watch Demo</span>
            </button>
          </div>

          {/* Enhanced Stats with animation and icons */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-12 text-center transition-all duration-700 delay-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-coral rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-brand-navy mb-3 group-hover:text-brand-teal transition-colors duration-300">50+</div>
              <div className="text-brand-navy/60 font-semibold text-lg">White Listed Sources</div>
            </div>
            
            <div className="group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-coral rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-brand-navy mb-3 group-hover:text-brand-orange transition-colors duration-300">9+</div>
              <div className="text-brand-navy/60 font-semibold text-lg">Key Categories</div>
            </div>
            
            <div className="group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-coral to-brand-teal rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-8 h-8 text-white transform rotate-45" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-brand-navy mb-3 group-hover:text-brand-coral transition-colors duration-300">100%</div>
              <div className="text-brand-navy/60 font-semibold text-lg">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
