import React, { useState, useEffect } from 'react'
import { ArrowRight, Mail, CheckCircle, Zap, Users, Star, Sparkles, TrendingUp, Globe } from 'lucide-react'
import { subscribeWithBeehiiv } from '../utils/beehiiv'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [consent, setConsent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ state: 'error', message: 'Enter a valid business email.' })
      return
    }
    if (!consent) {
      setStatus({ state: 'error', message: 'Please accept the privacy notice.' })
      return
    }
    setStatus({ state: 'loading', message: 'Subscribing…' })
    try {
      const res = await subscribeWithBeehiiv(email)
      setStatus({ state: 'success', message: "Welcome aboard! Check your inbox for our welcome guide." })
      setEmail(''); setConsent(false)
    } catch (e) {
      setStatus({ state: 'error', message: 'Something went wrong. Try again.' })
    }
  }

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
      <Sparkles className="absolute bottom-60 right-1/5 w-6 h-6 text-brand-coral/40 animate-pulse" style={{animationDelay: '2s'}} />
      <Globe className="absolute top-80 right-1/4 w-4 h-4 text-brand-teal/30 animate-bounce" style={{animationDelay: '1.5s'}} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-teal/20 to-brand-coral/20 border border-brand-teal/30 rounded-full px-8 py-4 text-brand-teal text-sm font-bold mb-10 backdrop-blur-lg shadow-xl">
            <Mail className="w-5 h-5 animate-pulse" />
            <span className="bg-gradient-to-r from-brand-coral to-brand-orange bg-clip-text text-transparent">Join 10,000+ industry leaders</span>
          </div>
          
          <h2 className="text-5xl sm:text-7xl font-black mb-8 bg-gradient-to-r from-white via-brand-gray to-white bg-clip-text text-transparent leading-tight">
            Stay Ahead of the Curve
          </h2>
          
          <p className="text-xl sm:text-2xl text-brand-gray/90 max-w-4xl mx-auto leading-relaxed font-medium">
            Get exclusive insights, breaking news, and actionable intelligence delivered to your inbox. 
            <span className="text-brand-coral font-bold"> No fluff, just the stories that move markets.</span>
          </p>
        </div>

        {/* Enhanced benefits with creative design */}
        <div className={`grid sm:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/20 to-brand-orange/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-brand-coral/20 rounded-3xl p-8 group-hover:border-brand-coral/40 transition-all duration-500 transform group-hover:scale-105">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-coral/30 to-brand-orange/30 border border-brand-coral/40 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-10 h-10 text-brand-coral group-hover:animate-pulse" />
              </div>
              <h3 className="text-white font-black text-xl mb-4 group-hover:text-brand-coral transition-colors duration-300">Daily Insights</h3>
              <p className="text-brand-gray/80 text-base leading-relaxed font-medium">Curated intelligence that matters to your business decisions and market movements</p>
            </div>
          </div>
          
          <div className="text-center group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 to-brand-orange/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-brand-teal/20 rounded-3xl p-8 group-hover:border-brand-teal/40 transition-all duration-500 transform group-hover:scale-105">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-teal/30 to-brand-orange/30 border border-brand-teal/40 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-10 h-10 text-brand-teal group-hover:animate-pulse" />
              </div>
              <h3 className="text-white font-black text-xl mb-4 group-hover:text-brand-teal transition-colors duration-300">Expert Analysis</h3>
              <p className="text-brand-gray/80 text-base leading-relaxed font-medium">Deep-dive reports from industry veterans and market experts worldwide</p>
            </div>
          </div>
          
          <div className="text-center group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-brand-coral/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-brand-orange/20 rounded-3xl p-8 group-hover:border-brand-orange/40 transition-all duration-500 transform group-hover:scale-105">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-orange/30 to-brand-coral/30 border border-brand-orange/40 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-10 h-10 text-brand-orange group-hover:animate-pulse" />
              </div>
              <h3 className="text-white font-black text-xl mb-4 group-hover:text-brand-orange transition-colors duration-300">Exclusive Access</h3>
              <p className="text-brand-gray/80 text-base leading-relaxed font-medium">First access to reports, events, and premium networking opportunities</p>
            </div>
          </div>
        </div>

        {/* Enhanced signup form with creative design */}
        <div className={`max-w-3xl mx-auto relative transition-all duration-1000 delay-500 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/20 via-brand-teal/10 to-brand-orange/20 rounded-3xl blur-2xl animate-pulse" />
          <form onSubmit={onSubmit} className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-brand-teal/30 rounded-3xl p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1 relative group">
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 text-brand-gray/60 w-6 h-6 group-focus-within:text-brand-teal transition-colors duration-300" />
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your professional email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl bg-white/10 border border-brand-gray/30 pl-16 pr-6 py-5 text-white text-lg placeholder:text-brand-gray/60 outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all duration-300 hover:bg-white/15 hover:border-brand-teal/50"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={status.state === 'loading'}
                className="inline-flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-brand-coral to-brand-orange px-10 py-5 font-black text-white text-lg hover:from-brand-teal hover:to-brand-coral hover:shadow-2xl hover:shadow-brand-coral/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 group"
              >
                {status.state === 'loading' ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  <>
                    <span className="group-hover:animate-pulse">Get Started</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-start gap-4 text-sm text-brand-gray/80 mb-8">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-5 h-5 rounded-lg border-brand-gray/50 bg-white/10 text-brand-coral focus:ring-brand-coral focus:ring-offset-0 transition-all duration-300 hover:border-brand-teal"
              />
              <label htmlFor="consent" className="leading-relaxed font-medium">
                I agree to receive Western Star emails and accept the{' '}
                <a className="text-brand-coral hover:text-brand-orange underline transition-colors font-bold" href="#privacy">
                  Privacy Notice
                </a>.
              </label>
            </div>
            
            {status.state !== 'idle' && (
              <div className={`p-6 rounded-2xl border backdrop-blur-lg transition-all duration-500 ${
                status.state === 'error' 
                  ? 'bg-brand-coral/10 border-brand-coral/30 text-brand-coral' 
                  : status.state === 'success' 
                  ? 'bg-brand-teal/10 border-brand-teal/30 text-brand-teal' 
                  : 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange'
              }`}>
                <div className="flex items-center gap-4">
                  {status.state === 'success' && <CheckCircle className="w-6 h-6 flex-shrink-0 animate-pulse" />}
                  {status.state === 'loading' && <div className="w-6 h-6 border-3 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin flex-shrink-0" />}
                  <span className="font-bold text-lg">{status.message}</span>
                </div>
              </div>
            )}
          </form>
          
          <div className="text-center mt-10">
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
    </section>
  )
}
