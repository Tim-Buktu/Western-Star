import React, { useState, useEffect } from 'react'
import { Mail, Search, Menu, X, Tag } from 'lucide-react'
import logo from '../assets/logo.png'
import { getCMSData } from '../utils/cms'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const siteData = getCMSData('site')
  const navData = getCMSData('navigation')
  const topicsData = getCMSData('topics')

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setShowSearch(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const navItems = (navData?.items || [
    { id: 1, label: 'Latest', href: '#preview', isVisible: true },
    { id: 2, label: 'Topics', href: '#topics', isVisible: true },
    { id: 3, label: 'About', href: '#about', isVisible: true },
  ]).filter((i) => i.isVisible !== false)

  const activeTopics = (topicsData?.items || []).filter((t) => t.isActive)

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'border-b border-brand-gray/30 bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'border-b border-brand-gray/20 bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}>
          {/* Left: Brand */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="Western Star logo" 
                className={`rounded-lg object-cover ring-2 ring-brand-gray/30 group-hover:ring-brand-teal/50 transition-all duration-300 transform group-hover:scale-110 ${
                  scrolled ? 'w-7 h-7' : 'w-8 h-8'
                }`} 
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-teal/20 to-brand-coral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className={`font-bold tracking-tight text-brand-navy group-hover:text-brand-teal transition-all duration-300 ${
              scrolled ? 'text-lg' : 'text-lg sm:text-xl'
            }`}>
              {siteData?.title || 'Western Star'}
            </span>
          </a>

          {/* Center: Nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-brand-navy/70">
            {navItems.map((it, index) => (
              <a 
                key={it.id ?? it.label} 
                href={it.href} 
                className="relative py-2 hover:text-brand-teal transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {it.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-brand-teal to-brand-coral scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <div className="absolute inset-0 rounded-lg bg-brand-teal/5 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search trigger (desktop) */}
            <button
              aria-label="Search"
              className={`hidden md:inline-flex items-center justify-center rounded-full border transition-all duration-300 transform hover:scale-110 group ${
                showSearch 
                  ? 'w-10 h-10 border-brand-teal bg-brand-teal text-white shadow-lg' 
                  : 'w-10 h-10 border-brand-gray/30 bg-brand-gray/50 text-brand-navy/70 hover:text-brand-teal hover:bg-white hover:border-brand-teal/30 hover:shadow-md'
              }`}
              onClick={() => setShowSearch((v) => !v)}
            >
              <Search className={`transition-all duration-300 ${showSearch ? 'w-4 h-4 rotate-90' : 'w-4 h-4'}`} />
            </button>

            {/* Subscribe */}
            <a
              href="#signup"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-coral px-6 py-2.5 text-sm font-semibold text-white hover:from-brand-teal hover:to-brand-orange hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
            >
              <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" /> 
              Subscribe
            </a>

            {/* Mobile controls */}
            <button
              className={`md:hidden inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 transform hover:scale-110 ${
                mobileOpen 
                  ? 'text-brand-coral bg-brand-coral/10 border border-brand-coral/20' 
                  : 'text-brand-navy/70 hover:text-brand-teal hover:bg-brand-teal/10'
              }`}
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary sections row (desktop) */}
      {activeTopics.length > 0 && (
        <div className={`hidden lg:block border-t transition-all duration-300 ${
          scrolled 
            ? 'border-brand-gray/20 bg-gradient-to-r from-brand-gray/30 to-white/50' 
            : 'border-brand-gray/10 bg-gradient-to-r from-brand-gray/20 to-white/30'
        }`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className={`flex items-center gap-4 overflow-x-auto transition-all duration-300 ${
              scrolled ? 'py-2' : 'py-3'
            }`}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy/60 shrink-0">
                <Tag className="w-4 h-4 text-brand-teal" /> Topics
              </span>
              <div className="flex items-center gap-2">
                {activeTopics.map((t, index) => (
                  <a
                    key={t.id}
                    href="#topics"
                    className="px-4 py-2 rounded-full border border-brand-gray/30 bg-white/80 backdrop-blur-sm text-xs font-semibold text-brand-navy/70 hover:bg-brand-teal hover:border-brand-teal hover:text-white hover:shadow-lg transition-all duration-300 whitespace-nowrap transform hover:scale-105 group"
                    title={t.description}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="group-hover:animate-pulse">{t.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search dropdown (desktop) */}
      <div className={`absolute inset-x-0 top-full border-b border-brand-gray/20 bg-white/95 backdrop-blur-lg shadow-2xl transition-all duration-500 ${
        showSearch 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="flex items-center gap-4 rounded-2xl border border-brand-gray/30 bg-gradient-to-r from-brand-gray/20 to-white/50 backdrop-blur-sm px-6 py-4 shadow-lg">
            <Search className="w-6 h-6 text-brand-teal animate-pulse" />
            <input
              autoFocus
              type="text"
              placeholder="Search articles, topics, companies, insights..."
              className="bg-transparent text-lg outline-none placeholder:text-brand-navy/50 text-brand-navy flex-1 font-medium"
            />
            <button
              className="text-sm font-semibold text-brand-navy/60 hover:text-brand-teal px-4 py-2 rounded-lg hover:bg-white/50 transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowSearch(false)}
            >
              Close
            </button>
          </div>
          
          {/* Quick suggestions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wide text-brand-navy/50">Popular Topics</h4>
              <div className="flex flex-wrap gap-2">
                {['Tech', 'Policy', 'Business', 'Global'].map((topic) => (
                  <button key={topic} className="px-3 py-1 text-xs font-medium bg-brand-teal/10 text-brand-teal rounded-full hover:bg-brand-teal hover:text-white transition-all duration-300">
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`lg:hidden border-t border-brand-gray/20 bg-white/95 backdrop-blur-lg shadow-xl transition-all duration-500 ${
        mobileOpen 
          ? 'opacity-100 max-h-screen pointer-events-auto' 
          : 'opacity-0 max-h-0 pointer-events-none overflow-hidden'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
          {/* Mobile Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-brand-gray/30 bg-gradient-to-r from-brand-gray/20 to-white/50 backdrop-blur-sm px-4 py-4">
            <Search className="w-5 h-5 text-brand-teal" />
            <input 
              type="text" 
              placeholder="Search everything..." 
              className="bg-transparent text-base outline-none placeholder:text-brand-navy/50 text-brand-navy flex-1 font-medium" 
            />
          </div>
          
          {/* Mobile Navigation */}
          <div className="space-y-2">
            {navItems.map((it, index) => (
              <a 
                key={it.id ?? it.label} 
                href={it.href} 
                className="flex items-center px-4 py-4 rounded-xl text-base font-semibold text-brand-navy hover:text-brand-teal hover:bg-brand-teal/5 transition-all duration-300 transform hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300">{it.label}</span>
              </a>
            ))}
            <a 
              href="#signup" 
              className="flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-orange to-brand-coral hover:from-brand-teal hover:to-brand-orange transition-all duration-300 transform hover:scale-105 group"
              onClick={() => setMobileOpen(false)}
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" /> 
              <span className="group-hover:translate-x-1 transition-transform duration-300">Subscribe</span>
            </a>
          </div>

          {/* Mobile Topics */}
          {activeTopics.length > 0 && (
            <div className="pt-4 border-t border-brand-gray/20">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-navy/60 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-teal" />
                Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTopics.map((t, index) => (
                  <a 
                    key={t.id} 
                    href="#topics" 
                    className="px-4 py-2 rounded-full border border-brand-gray/30 bg-white/80 backdrop-blur-sm text-sm font-semibold text-brand-navy hover:bg-brand-teal hover:border-brand-teal hover:text-white transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
