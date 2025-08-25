// Content Management System Data
export const cmsData = {
  // Site metadata
  site: {
    title: "Western Star",
    description: "Your daily dose of insights to navigate the complex market dynamics — technology, business, policy & regulations, investment, and global trends.",
    topBanner: "Indonesia. Tech. Business. Policy. Investment. Global Signals."
  },

  // Available tags/categories for content
  availableTags: [
    { id: 1, name: "POLICY & REGULATIONS", color: "blue", isActive: true },
    { id: 2, name: "INTERNATIONAL RELATIONS", color: "green", isActive: true },
    { id: 3, name: "GLOBAL ECONOMY", color: "purple", isActive: true },
    { id: 4, name: "TECHNOLOGY", color: "orange", isActive: true },
    { id: 5, name: "CORPORATE", color: "indigo", isActive: true },
    { id: 6, name: "CAREER", color: "yellow", isActive: true },
    { id: 7, name: "FINANCIAL", color: "pink", isActive: true },
    { id: 8, name: "LIFESTYLE", color: "cyan", isActive: true },
    { id: 9, name: "INNOVATION", color: "teal", isActive: true },
    { id: 10, name: "CULTURAL", color: "red", isActive: true }
  ],

  // Hero section
  hero: {
    badge: {
      text: "Daily or every 2 days",
      isActive: true
    },
    title: "Western Star",
    subtitle: "Your daily dose of insights to navigate the complex market dynamics — technology, business, policy & regulations, investment, and global trends."
  },

  // Trending topics section (ContentPreview)
  trendingTopics: {
    title: "Breaking News",
    isVisible: true,
    headlines: [
      "Policy shifts reshape Indonesia's digital economy landscape",
      "International partnerships drive new tech investments", 
      "Global supply chain disruptions impact local markets",
      "Corporate earnings reveal technology sector strength",
      "Innovation hubs emerge across Southeast Asia",
    ],
    items: [
      {
        id: 1,
        category: "TECHNOLOGY",
        title: "AI Revolution Continues: ChatGPT's mobile app generates $2B revenue milestone",
        summary: "OpenAI's mobile application has reached a significant financial milestone, earning an impressive $2.91 per install across both iOS and Android platforms.",
        date: "Dec 19, 2024",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 2,
        category: "CORPORATE",
        title: "Cohere Secures $6.8B Valuation as AI Investment Doubles Down",
        summary: "The Canadian AI startup has successfully raised additional funding, reflecting continued investor confidence in enterprise AI solutions.",
        date: "Dec 18, 2024",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 3,
        category: "POLICY & REGULATIONS",
        title: "New Digital Economy Regulations Reshape Market Dynamics",
        summary: "Government announces comprehensive framework for digital taxation and cross-border e-commerce, affecting major tech platforms.",
        date: "Dec 17, 2024",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 4,
        category: "INTERNATIONAL RELATIONS",
        title: "Southeast Asia Trade Alliance Strengthens Economic Cooperation",
        summary: "Regional leaders announce expanded partnerships focusing on technology transfer and sustainable development initiatives.",
        date: "Dec 16, 2024",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 5,
        category: "GLOBAL ECONOMY",
        title: "Central Bank Policy Shifts Impact Regional Investment Flows",
        summary: "Federal Reserve decisions trigger reassessment of emerging market strategies among institutional investors.",
        date: "Dec 15, 2024",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 6,
        category: "FINANCIAL",
        title: "Green Bond Market Reaches Record Highs in Asia-Pacific",
        summary: "Sustainable finance instruments gain momentum as corporations prioritize ESG compliance and climate targets.",
        date: "Dec 14, 2024",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 7,
        category: "INNOVATION",
        title: "Revolutionary Solar Technology Achieves 40% Efficiency Rate",
        summary: "Breakthrough in perovskite solar cells promises to transform renewable energy landscape with unprecedented efficiency gains.",
        date: "Dec 13, 2024",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 8,
        category: "CAREER",
        title: "Remote Work Policies Drive New Talent Acquisition Strategies",
        summary: "Companies adapt hiring practices as professionals increasingly prioritize flexible work arrangements and location independence.",
        date: "Dec 12, 2024",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 9,
        category: "LIFESTYLE",
        title: "Wellness Technology Integration Transforms Healthcare Access",
        summary: "Digital health platforms and wearable devices create new paradigms for preventive care and patient engagement.",
        date: "Dec 11, 2024",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 10,
        category: "CULTURAL",
        title: "Digital Preservation Initiatives Protect Regional Heritage",
        summary: "Technology partnerships enable comprehensive documentation and global access to traditional arts and cultural practices.",
        date: "Dec 10, 2024",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },

  // Topics/Features section
  topics: {
    title: "What we cover",
    items: [
      {
        id: 1,
        icon: "TrendingUp",
        title: "Tech & Business",
        description: "Signals from Indonesia's tech and enterprise landscape you can act on.",
        isActive: true
      },
      {
        id: 2,
        icon: "Scale",
        title: "Policy & Regulation",
        description: "Clarity on rules, incentives, and compliance that shift markets.",
        isActive: true
      },
      {
        id: 3,
        icon: "Landmark",
        title: "Investment",
        description: "Deal flow, sectors in motion, and capital allocators' playbooks.",
        isActive: true
      },
      {
        id: 4,
        icon: "Globe",
        title: "Global Dynamics",
        description: "How macro currents and geopolitics ripple through Indonesia.",
        isActive: true
      }
    ]
  },

  // Navigation
  navigation: {
    items: [
      { id: 1, label: "Preview", href: "#preview", isVisible: true },
      { id: 2, label: "Topics", href: "#topics", isVisible: true },
      { id: 3, label: "About", href: "#about", isVisible: true }
    ]
  },

    // Newsletter archive
  newsletters: {
    title: "Daily Newsletter Archive",
    items: [
      {
        id: 1,
        date: "Aug 15, 2025",
        title: "AI infra bets and Indonesia's power puzzle",
        summary: "Gemini Ultra rollouts meet local grid constraints; winners and risks for 2025.",
        link: "#"
      },
      {
        id: 2,
        date: "Aug 14, 2025",
        title: "Nickel to batteries: why policy sequencing matters",
        summary: "Tariffs, midstream investments, and the downstream employment trade-offs.",
        link: "#"
      },
      {
        id: 3,
        date: "Aug 13, 2025",
        title: "Payments: interchange, QRIS, and the SME margin squeeze",
        summary: "As rails mature, distribution edges shift to compliance and ops.",
        link: "#"
      }
    ]
  },



  // Testimonials section
  testimonials: {
    title: "Built for clarity, not noise",
    subtitle: "Trusted by professionals who need reliable insights to make informed decisions",
    items: [
      {
        id: 1,
        name: "Dimas Pratama",
        title: "Partner, Jakarta VC",
        text: "Ringkas tapi tajam. Membantu tim investasi kami memilah sinyal dari noise setiap pagi.",
        isActive: true
      },
      {
        id: 2,
        name: "Rani Wibowo",
        title: "Head of Strategy, Tech Co.",
        text: "Persilangan market intel + policy awareness yang pas untuk keputusan cepat.",
        isActive: true
      },
      {
        id: 3,
        name: "Andika Putra",
        title: "Director, PE Fund",
        text: "Nada insider/investor terasa, tapi tetap kredibel dan netral pada data.",
        isActive: true
      }
    ]
  },

  // Footer
  footer: {
    links: [
      { id: 1, label: "Privacy", href: "#privacy", isVisible: true },
      { id: 2, label: "Terms", href: "#terms", isVisible: true },
      { id: 3, label: "Contact", href: "#contact", isVisible: true }
    ],
    copyright: "Western Star. All rights reserved."
  }
};

// CMS Helper functions
export const updateCMSData = (section, field, value) => {
  // Get current data including any saved changes
  const currentData = getCMSData();
  
  if (typeof currentData[section] === 'object' && currentData[section] !== null) {
    if (field.includes('.')) {
      // Handle nested fields like 'hero.title'
      const keys = field.split('.');
      let target = currentData[section];
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
    } else {
      currentData[section][field] = value;
    }
  }
  
  // Save the updated data to localStorage
  localStorage.setItem('westernStarCMS', JSON.stringify(currentData));
  
  // Trigger a custom event to notify components of data changes
  window.dispatchEvent(new CustomEvent('cmsDataUpdated', { 
    detail: { section, field, value } 
  }));
};

// Helper: shallow-deep merge to preserve new defaults while keeping saved edits
function mergeDefaults(defaults, saved) {
  if (!saved) return defaults
  const out = { ...defaults }
  for (const key of Object.keys(saved)) {
    const sVal = saved[key]
    const dVal = defaults[key]
    if (Array.isArray(sVal)) {
      out[key] = sVal // prefer user arrays
    } else if (sVal && typeof sVal === 'object' && dVal && typeof dVal === 'object') {
      out[key] = { ...dVal, ...sVal }
    } else if (sVal !== undefined) {
      out[key] = sVal
    }
  }
  return out
}

export const getAvailableTags = () => {
  // Convert the availableTags from cmsData to the expected format
  return cmsData.availableTags.map(tag => ({
    value: tag.name,
    label: tag.name,
    color: tag.color,
    active: tag.isActive
  }));
};

// Fix the getCMSData function - the field parameter was missing
export const getCMSData = (section = null, field = null) => {
  // In a real application, this would fetch from a database
  const savedRaw = localStorage.getItem('westernStarCMS')
  let data = cmsData
  if (savedRaw) {
    try {
      const savedParsed = JSON.parse(savedRaw)
      data = mergeDefaults(cmsData, savedParsed)
      // also merge nested known sections to include new keys
      if (savedParsed.trendingTopics) {
        data.trendingTopics = mergeDefaults(cmsData.trendingTopics, savedParsed.trendingTopics)
      }
      if (savedParsed.site) {
        data.site = mergeDefaults(cmsData.site, savedParsed.site)
      }
      if (savedParsed.topics) {
        data.topics = mergeDefaults(cmsData.topics, savedParsed.topics)
      }
      if (savedParsed.navigation) {
        data.navigation = mergeDefaults(cmsData.navigation, savedParsed.navigation)
      }
      if (savedParsed.footer) {
        data.footer = mergeDefaults(cmsData.footer, savedParsed.footer)
      }
      if (savedParsed.newsletters) {
        data.newsletters = mergeDefaults(cmsData.newsletters, savedParsed.newsletters)
      }
      if (savedParsed.testimonials) {
        data.testimonials = mergeDefaults(cmsData.testimonials, savedParsed.testimonials)
      }
    } catch {
      // ignore parse errors and fall back to defaults
    }
  }
  
  if (!section) return data
  if (!field) return data[section]
  
  if (field.includes('.')) {
    const keys = field.split('.')
    let result = data[section]
    for (const key of keys) {
      result = result?.[key]
      if (result === undefined) break
    }
    return result
  }
  
  return data[section]?.[field]
}

// Restore helpers used by the CMS Admin
export const addTrendingTopic = (newTopic) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const newId = Math.max(0, ...currentTopics.map(t => t.id || 0)) + 1
  const topicWithId = { ...newTopic, id: newId }
  
  updateCMSData('trendingTopics', 'items', [...currentTopics, topicWithId])
  return topicWithId
}

export const updateTrendingTopic = (id, updatedTopic) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const updatedTopics = currentTopics.map(topic => 
    topic.id === id ? { ...topic, ...updatedTopic } : topic
  )
  
  updateCMSData('trendingTopics', 'items', updatedTopics)
}

export const deleteTrendingTopic = (id) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const filteredTopics = currentTopics.filter(topic => topic.id !== id)
  
  updateCMSData('trendingTopics', 'items', filteredTopics)
}

// Newsletter management functions
export const addNewsletter = (newNewsletter) => {
  const currentNewsletters = getCMSData('newsletters', 'items') || []
  const newId = Math.max(0, ...currentNewsletters.map(n => n.id || 0)) + 1
  const newsletterWithId = { ...newNewsletter, id: newId }
  
  updateCMSData('newsletters', 'items', [...currentNewsletters, newsletterWithId])
  return newsletterWithId
}

export const updateNewsletter = (id, updatedNewsletter) => {
  const currentNewsletters = getCMSData('newsletters', 'items') || []
  const updatedNewsletters = currentNewsletters.map(newsletter => 
    newsletter.id === id ? { ...newsletter, ...updatedNewsletter } : newsletter
  )
  
  updateCMSData('newsletters', 'items', updatedNewsletters)
}

export const deleteNewsletter = (id) => {
  const currentNewsletters = getCMSData('newsletters', 'items') || []
  const filteredNewsletters = currentNewsletters.filter(newsletter => newsletter.id !== id)
  
  updateCMSData('newsletters', 'items', filteredNewsletters)
}

// Testimonials management functions
export const addTestimonial = (newTestimonial) => {
  const currentTestimonials = getCMSData('testimonials', 'items') || []
  const newId = Math.max(0, ...currentTestimonials.map(t => t.id || 0)) + 1
  const testimonialWithId = { ...newTestimonial, id: newId }
  
  updateCMSData('testimonials', 'items', [...currentTestimonials, testimonialWithId])
  return testimonialWithId
}

export const updateTestimonial = (id, updatedTestimonial) => {
  const currentTestimonials = getCMSData('testimonials', 'items') || []
  const updatedTestimonials = currentTestimonials.map(testimonial => 
    testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
  )
  
  updateCMSData('testimonials', 'items', updatedTestimonials)
}

export const deleteTestimonial = (id) => {
  const currentTestimonials = getCMSData('testimonials', 'items') || []
  const filteredTestimonials = currentTestimonials.filter(testimonial => testimonial.id !== id)
  
  updateCMSData('testimonials', 'items', filteredTestimonials)
}

// Reorder trending topics
export const reorderTrendingTopics = (sourceIndex, destinationIndex) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const reorderedTopics = Array.from(currentTopics)
  const [reorderedItem] = reorderedTopics.splice(sourceIndex, 1)
  reorderedTopics.splice(destinationIndex, 0, reorderedItem)
  
  updateCMSData('trendingTopics', 'items', reorderedTopics)
}

// Move trending topic
export const moveTrendingTopic = (id, direction) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const topicIndex = currentTopics.findIndex(topic => topic.id === id)
  
  if (topicIndex === -1) return
  
  let newIndex = topicIndex
  if (direction === 'up' && topicIndex > 0) {
    newIndex = topicIndex - 1
  } else if (direction === 'down' && topicIndex < currentTopics.length - 1) {
    newIndex = topicIndex + 1
  }
  
  if (newIndex !== topicIndex) {
    reorderTrendingTopics(topicIndex, newIndex)
  }
}
