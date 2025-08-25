import React, { useState, useRef, useEffect } from 'react'
import { TrendingUp, Scale, Globe, Briefcase, Users, DollarSign, Heart, Lightbulb, Palette, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAvailableTags } from '../utils/cms'

const categoryIconMap = {
  'POLICY & REGULATIONS': Scale,
  'INTERNATIONAL RELATIONS': Globe,
  'GLOBAL ECONOMY': TrendingUp,
  'TECHNOLOGY': Lightbulb,
  'CORPORATE': Briefcase,
  'CAREER': Users,
  'FINANCIAL': DollarSign,
  'LIFESTYLE': Heart,
  'INNOVATION': Lightbulb,
  'CULTURAL': Palette
};

const categoryDescriptions = {
  'POLICY & REGULATIONS': 'Navigate regulatory changes and policy shifts that shape business landscapes.',
  'INTERNATIONAL RELATIONS': 'Global diplomatic insights affecting trade and regional partnerships.',
  'GLOBAL ECONOMY': 'Economic trends, market movements, and financial indicators worldwide.',
  'TECHNOLOGY': 'Innovation breakthroughs, digital transformation, and emerging tech trends.',
  'CORPORATE': 'Business strategy, leadership insights, and corporate governance developments.',
  'CAREER': 'Professional growth, workplace evolution, and career advancement strategies.',
  'FINANCIAL': 'Investment analysis, market intelligence, and financial sector updates.',
  'LIFESTYLE': 'Work-life balance trends and consumer behavior insights.',
  'INNOVATION': 'Breakthrough research, disruptive technologies, and future-forward thinking.',
  'CULTURAL': 'Social trends, cultural shifts, and their business implications.'
};

export default function Topics() {
  const availableTags = getAvailableTags().filter(tag => tag.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  // Safe checks to prevent errors
  if (!availableTags || availableTags.length === 0) {
    return (
      <section id="topics" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Cover</h2>
            <p className="text-gray-600">Topics are being loaded...</p>
          </div>
        </div>
      </section>
    );
  }

  const cardWidth = 320; // Approximate width of each card including gap
  const visibleCards = Math.min(3, availableTags.length);
  const maxIndex = Math.max(0, availableTags.length - visibleCards);

  const scroll = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (availableTags.length > 0) {
      scrollToIndex(currentIndex);
    }
  }, [currentIndex, availableTags.length]);

  return (
    <section id="topics" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      {/* Subtle professional background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Minimal geometric accents */}
        <div className="absolute top-40 right-1/4 w-1 h-16 bg-gradient-to-b from-blue-200/40 to-transparent"></div>
        <div className="absolute bottom-48 left-1/4 w-1 h-12 bg-gradient-to-b from-violet-200/40 to-transparent"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-32">
        {/* Professional Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-blue-50 border border-slate-200/50 text-slate-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Coverage Areas</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
            What We Cover
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive insights across the sectors that drive strategic decisions in today's complex business environment
          </p>
        </div>
        
        {/* Professional Horizontal Carousel */}
        <div className="relative">
          {/* Refined navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-6">
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:border-slate-300 hover:shadow-md transform hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:border-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-6">
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:border-slate-300 hover:shadow-md transform hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:border-slate-200"
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
              {availableTags.map((tag, index) => {
                const IconComponent = categoryIconMap[tag.value] || TrendingUp;
                const colorSchemes = [
                  { 
                    gradient: 'from-blue-600 to-blue-700', 
                    glow: 'shadow-blue-500/15',
                    bg: 'from-blue-50/80 to-blue-100/50',
                    border: 'border-blue-100',
                    text: 'text-blue-900',
                    icon: 'text-blue-600'
                  },
                  { 
                    gradient: 'from-indigo-600 to-indigo-700', 
                    glow: 'shadow-indigo-500/15',
                    bg: 'from-indigo-50/80 to-indigo-100/50',
                    border: 'border-indigo-100',
                    text: 'text-indigo-900',
                    icon: 'text-indigo-600'
                  },
                  { 
                    gradient: 'from-violet-600 to-violet-700', 
                    glow: 'shadow-violet-500/15',
                    bg: 'from-violet-50/80 to-violet-100/50',
                    border: 'border-violet-100',
                    text: 'text-violet-900',
                    icon: 'text-violet-600'
                  },
                  { 
                    gradient: 'from-purple-600 to-purple-700', 
                    glow: 'shadow-purple-500/15',
                    bg: 'from-purple-50/80 to-purple-100/50',
                    border: 'border-purple-100',
                    text: 'text-purple-900',
                    icon: 'text-purple-600'
                  },
                  { 
                    gradient: 'from-slate-600 to-slate-700', 
                    glow: 'shadow-slate-500/15',
                    bg: 'from-slate-50/80 to-slate-100/50',
                    border: 'border-slate-100',
                    text: 'text-slate-900',
                    icon: 'text-slate-600'
                  }
                ];
                const scheme = colorSchemes[index % colorSchemes.length];
                
                return (
                  <div key={tag.value} className="group cursor-pointer flex-shrink-0 w-80 snap-center">
                    <div className={`relative h-full bg-gradient-to-br ${scheme.bg} backdrop-blur-sm rounded-2xl border ${scheme.border} p-8 hover:shadow-lg ${scheme.glow} transition-all duration-300 transform hover:-translate-y-1`}>
                      {/* Professional icon container */}
                      <div className={`relative w-14 h-14 bg-white border ${scheme.border} rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-300 shadow-sm`}>
                        <IconComponent className={`w-7 h-7 ${scheme.icon}`} />
                      </div>
                      
                      {/* Content */}
                      <h3 className={`text-xl font-bold ${scheme.text} mb-4 leading-tight`}>
                        {tag.label}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {categoryDescriptions[tag.value]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Refined carousel dots indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {availableTags.length > visibleCards && Array.from({ length: Math.max(1, availableTags.length - visibleCards + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-slate-300 w-2 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Professional CTA */}
        <div className="mt-24 text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Need Specialized Coverage?
            </h3>
            <p className="text-slate-600 mb-10 leading-relaxed">
              We're continuously expanding our analysis to meet evolving market needs. Share your specific industry focus areas with us.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
              Request Coverage Area
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
