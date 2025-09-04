import React, { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle, Zap, Users, Star, Sparkles, TrendingUp, Globe } from 'lucide-react'

export default function Subscribe() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="signup" className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-navy">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 via-transparent to-brand-coral/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-orange/5 to-transparent" />
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-teal/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-1/4 w-32 h-32 bg-gradient-to-br from-brand-coral/20 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-brand-orange/15 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
      <div className="absolute top-40 right-20 w-28 h-28 bg-gradient-to-br from-brand-teal/15 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}} />
      
      {/* Enhanced geometric shapes */}
      <div className="absolute top-32 right-1/3 w-3 h-3 bg-brand-coral/60 rounded-full animate-bounce" />
      <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-brand-teal/60 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
      <Star className="absolute top-60 left-1/5 w-5 h-5 text-brand-orange/40 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        {/* Enhanced benefits grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-200 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {[
            { icon: Zap, title: "AI-Powered Insights", desc: "Weekly analysis on how AI is reshaping media landscapes and creating new opportunities for forward-thinking entrepreneurs.", color: "brand-teal" },
            { icon: Users, title: "Exclusive Community", desc: "Connect with 10,000+ industry leaders, startup founders, and investors who are building the future of media and technology.", color: "brand-coral" },
            { icon: TrendingUp, title: "Market Intelligence", desc: "Get ahead of trends with data-driven reports on emerging technologies, funding patterns, and strategic moves by major players.", color: "brand-orange" }
          ].map((benefit, i) => (
            <div key={i} className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-${benefit.color}/50 hover:shadow-2xl hover:shadow-${benefit.color}/20 transition-all duration-500 hover:scale-105`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${benefit.color}/20 to-${benefit.color}/40 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-8 h-8 text-${benefit.color} group-hover:animate-pulse`} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-teal transition-colors duration-300">{benefit.title}</h3>
              <p className="text-brand-gray leading-relaxed font-medium">{benefit.desc}</p>
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-${benefit.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>

        {/* Enhanced social proof with dynamic stats */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-brand-gray">
            {[
              { icon: Users, number: "10,000+", label: "Active Subscribers", color: "brand-teal" },
              { icon: Globe, number: "50+", label: "Countries Reached", color: "brand-coral" },
              { icon: Sparkles, number: "95%", label: "Reader Satisfaction", color: "brand-orange" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${stat.color}/20 to-${stat.color}/40 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color} group-hover:animate-pulse`} />
                </div>
                <div className="text-left">
                  <div className={`text-3xl font-black text-${stat.color} group-hover:scale-110 transition-transform duration-300`}>{stat.number}</div>
                  <div className="text-sm font-medium opacity-80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced headline with animation */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-brand-teal via-brand-coral to-brand-orange bg-clip-text text-transparent">
              Join the Revolution
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-brand-gray max-w-4xl mx-auto leading-relaxed font-medium">
            Get exclusive insights on AI disruption, media transformation, and startup strategies delivered to your inbox. 
            <span className="text-brand-teal font-bold"> Join 10,000+ industry leaders</span> who trust our analysis.
          </p>
        </div>

        {/* Enhanced signup form with creative design */}
        <div className={`max-w-3xl mx-auto relative transition-all duration-1000 delay-500 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/20 via-brand-teal/10 to-brand-orange/20 rounded-3xl blur-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-brand-teal/30 rounded-3xl p-10 shadow-2xl text-center">
            <div className="mb-8">
              <a 
                href="https://westernstar.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-brand-coral to-brand-orange px-10 py-5 font-black text-white text-lg hover:from-brand-teal hover:to-brand-coral hover:shadow-2xl hover:shadow-brand-coral/25 transform hover:scale-105 transition-all duration-300 group"
              >
                <span className="group-hover:animate-pulse">Get Started</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-4 text-brand-gray/80 text-base font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-teal animate-pulse" />
                  <span>Free forever</span>
                </div>
                <span className="text-brand-gray/40">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-orange animate-pulse" style={{animationDelay: '0.5s'}} />
                  <span>Unsubscribe anytime</span>
                </div>
                <span className="text-brand-gray/40">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-coral animate-pulse" style={{animationDelay: '1s'}} />
                  <span className="text-brand-coral font-bold">No spam, ever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
