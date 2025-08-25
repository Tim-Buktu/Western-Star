import React, { useState, useEffect } from 'react'
import { Calendar, ArrowRight, Mail, Archive, Clock, Sparkles, Star } from 'lucide-react'
import { getCMSData } from '../utils/cms'

export default function NewsletterArchive() {
  const [newslettersData, setNewslettersData] = useState(null)

  useEffect(() => {
    // Initial load
    const data = getCMSData('newsletters');
    setNewslettersData(data);

    // Listen for CMS updates
    const handleCMSUpdate = (event) => {
      if (event.detail.section === 'newsletters') {
        const updatedData = getCMSData('newsletters');
        setNewslettersData(updatedData);
      }
    }

    window.addEventListener('cmsDataUpdated', handleCMSUpdate)
    
    return () => {
      window.removeEventListener('cmsDataUpdated', handleCMSUpdate)
    }
  }, [])

  if (!newslettersData?.items?.length) {
    return (
      <section id="archive" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Newsletter Archive</h2>
            <p className="text-gray-600">Loading newsletters...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="archive" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Professional background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-56 h-56 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-slate-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
        
        {/* Subtle geometric decorations */}
        <div className="absolute top-32 right-1/3 w-2 h-2 bg-blue-400/30 rounded-full"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-indigo-400/30 rounded-full"></div>
        <Star className="absolute top-64 left-16 w-4 h-4 text-slate-400/30" />
        <Sparkles className="absolute bottom-64 right-12 w-5 h-5 text-blue-400/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold mb-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Archive className="w-4 h-4" />
            <span>Newsletter Archive</span>
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
              {newslettersData.title || "Daily Newsletter Archive"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Catch up on our previous editions. Each newsletter delivers actionable insights you can implement immediately.
          </p>
        </div>

        {/* Enhanced Newsletter Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {newslettersData.items.map((newsletter, index) => {
            const colorSchemes = [
              { 
                gradient: 'from-blue-500 to-indigo-600', 
                glow: 'shadow-blue-500/20',
                bg: 'from-blue-50 to-indigo-50',
                border: 'border-blue-200/50',
                accent: 'text-blue-600',
                headerBg: 'from-blue-100 to-indigo-100'
              },
              { 
                gradient: 'from-indigo-500 to-purple-600', 
                glow: 'shadow-indigo-500/20',
                bg: 'from-indigo-50 to-purple-50',
                border: 'border-indigo-200/50',
                accent: 'text-indigo-600',
                headerBg: 'from-indigo-100 to-purple-100'
              },
              { 
                gradient: 'from-cyan-500 to-blue-600', 
                glow: 'shadow-cyan-500/20',
                bg: 'from-cyan-50 to-blue-50',
                border: 'border-cyan-200/50',
                accent: 'text-cyan-600',
                headerBg: 'from-cyan-100 to-blue-100'
              }
            ];
            const scheme = colorSchemes[index % colorSchemes.length];
            
            return (
              <article key={newsletter.id} className="group cursor-pointer">
                <div className={`h-full bg-gradient-to-br ${scheme.bg} backdrop-blur-sm border ${scheme.border} rounded-3xl hover:shadow-2xl ${scheme.glow} transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:rotate-1`}>
                  {/* Enhanced header with date */}
                  <div className={`bg-gradient-to-r ${scheme.headerBg} p-6 border-b ${scheme.border} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="relative">
                      <div className={`flex items-center gap-2 ${scheme.accent} mb-3`}>
                        <div className={`w-8 h-8 bg-gradient-to-br ${scheme.gradient} rounded-xl flex items-center justify-center`}>
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold">{newsletter.date}</span>
                      </div>
                      <h3 className={`text-xl font-bold text-gray-900 group-hover:${scheme.accent} transition-colors leading-tight`}>
                        {newsletter.title}
                      </h3>
                    </div>
                  </div>

                  {/* Enhanced content */}
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                      {newsletter.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${scheme.gradient} rounded-xl flex items-center justify-center shadow-lg ${scheme.glow}`}>
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-medium">Newsletter</div>
                          <div className={`text-sm ${scheme.accent} font-bold`}>#{newslettersData.items.length - index}</div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 ${scheme.accent} font-bold text-sm group-hover:gap-3 transition-all`}>
                        Read edition
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative element */}
                  <div className={`absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-br ${scheme.gradient} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`}></div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Enhanced "Never Miss an Edition" CTA */}
        <div className="mt-20">
          <div className="relative overflow-hidden">
            {/* Background gradient with floating elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            
            <div className="relative rounded-3xl p-12 text-center text-white">
              {/* Floating icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-3xl mb-8 transform hover:scale-110 transition-all duration-300">
                <Mail className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Never Miss an Edition
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of professionals who start their day with Western Star insights. 
                <span className="text-white font-medium"> Get the edge you need to stay ahead.</span>
              </p>
              
              {/* Enhanced CTA with stats */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">10K+</div>
                    <div className="text-sm text-blue-200">Subscribers</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">Daily</div>
                    <div className="text-sm text-blue-200">Insights</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">Free</div>
                    <div className="text-sm text-blue-200">Forever</div>
                  </div>
                </div>
              </div>
              
              <a 
                href="#signup"
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Subscribe Free
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-blue-200 text-sm">
                <Clock className="w-4 h-4" />
                <span>Takes 30 seconds</span>
                <span className="text-white/60">•</span>
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
