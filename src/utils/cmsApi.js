// Enhanced CMS utilities with database integration
import api from './api.js'

// Cache for API responses
let apiCache = {
  site: null,
  hero: null,
  tags: null,
  authors: null,
  news: null,
  newsletters: null,
  trendingTopics: null,
  topics: null,
  navigation: null,
  testimonials: null,
  footer: null,
  lastUpdated: {}
}

// Check if we should use localStorage (fallback) or API
const shouldUseLocalStorage = () => {
  return localStorage.getItem('westernStarCMS') && !localStorage.getItem('westernStarMigrated')
}

// Force CMS to use API (skip localStorage)
export const forceUseAPI = () => {
  localStorage.setItem('westernStarMigrated', 'true')
  // Clear cache to force API refresh
  apiCache = { lastUpdated: {} }
  console.log('✅ CMS switched to database mode')
}

// Migrate localStorage data to backend
export const migrateToBackend = async () => {
  try {
    const localData = localStorage.getItem('westernStarCMS')
    if (!localData) return { success: false, message: 'No localStorage data found' }

    const cmsData = JSON.parse(localData)
    const result = await api.migrateFromLocalStorage(cmsData)
    
    if (result.message === 'Migration completed successfully') {
      // Mark as migrated
      localStorage.setItem('westernStarMigrated', 'true')
      // Clear cache to force API refresh
      apiCache = { lastUpdated: {} }
      return { success: true, message: 'Migration completed successfully', details: result.results }
    }
    
    return { success: false, message: 'Migration failed', details: result }
  } catch (error) {
    console.error('Migration error:', error)
    return { success: false, message: error.message }
  }
}

// Get CMS data with fallback to localStorage
export const getCMSData = async (section = null, field = null) => {
  try {
    // Check if migration is needed
    if (shouldUseLocalStorage()) {
      return getLocalStorageData(section, field)
    }

    // Use API
    return await getApiData(section, field)
  } catch (error) {
    console.error('Error getting CMS data:', error)
    // Fallback to localStorage on API error
    return getLocalStorageData(section, field)
  }
}

// Get data from localStorage (fallback/migration mode)
const getLocalStorageData = (section, field) => {
  const savedRaw = localStorage.getItem('westernStarCMS')
  let data = {}
  
  if (savedRaw) {
    try {
      data = JSON.parse(savedRaw)
    } catch (e) {
      console.error('Error parsing localStorage:', e)
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

// Get data from API
const getApiData = async (section, field) => {
  if (!section) {
    // Return all data
    const [site, hero, tags, authors, news, newsletters, trendingTopicsRaw, topics, navigation, testimonials, footer] = await Promise.all([
      getCachedApiData('site', () => api.getSite()),
      getCachedApiData('hero', () => api.getHero()),
      getCachedApiData('tags', () => api.getTags()),
      getCachedApiData('authors', () => api.getAuthors()),
      getCachedApiData('news', () => api.getNews({ limit: 100 })),
      getCachedApiData('newsletters', () => api.getNewsletters({ limit: 100 })),
      getCachedApiData('trendingTopics', () => api.getTrendingTopics()),
      getCachedApiData('topics', () => api.getTopics()),
      getCachedApiData('navigation', () => api.getNavigation()),
      getCachedApiData('testimonials', () => api.getTestimonials()),
      getCachedApiData('footer', () => api.getFooter())
    ])
    const trendingTopics = trendingTopicsRaw && trendingTopicsRaw.items ? {
      ...trendingTopicsRaw,
      items: trendingTopicsRaw.items.map(it => ({
        ...it,
        tags: Array.isArray(it.tags) ? it.tags : [],
        image: it.image?.url || it.image || ''
      }))
    } : trendingTopicsRaw

    return {
      site,
      hero,
      availableTags: tags,
      news: { title: "Latest News & Analysis", items: (news && Array.isArray(news.articles) ? news.articles : []) },
      newsletters: { title: "Daily Newsletter Archive", items: (newsletters && Array.isArray(newsletters.newsletters) ? newsletters.newsletters : []) },
  trendingTopics,
      topics,
      navigation,
      testimonials,
      footer
    }
  }

  // Get specific section
  let sectionData
  switch (section) {
    case 'site':
      sectionData = await getCachedApiData('site', () => api.getSite())
      break
    case 'hero':
      sectionData = await getCachedApiData('hero', () => api.getHero())
      break
    case 'availableTags':
      sectionData = await getCachedApiData('tags', () => api.getTags())
      break
    case 'news': {
      const newsData = await getCachedApiData('news', () => api.getNews({ limit: 100 }))
      sectionData = { title: "Latest News & Analysis", items: (newsData && Array.isArray(newsData.articles) ? newsData.articles : []) }
      break
    }
    case 'newsletters': {
      const newslettersData = await getCachedApiData('newsletters', () => api.getNewsletters({ limit: 100 }))
      sectionData = { title: "Daily Newsletter Archive", items: (newslettersData && Array.isArray(newslettersData.newsletters) ? newslettersData.newsletters : []) }
      break
    }
    case 'trendingTopics':
      sectionData = await getCachedApiData('trendingTopics', () => api.getTrendingTopics())
      break
    case 'topics':
      sectionData = await getCachedApiData('topics', () => api.getTopics())
      break
    case 'navigation':
      sectionData = await getCachedApiData('navigation', () => api.getNavigation())
      break
    case 'testimonials':
      sectionData = await getCachedApiData('testimonials', () => api.getTestimonials())
      break
    case 'footer':
      sectionData = await getCachedApiData('footer', () => api.getFooter())
      break
    default:
      return null
  }

  if (!field) return sectionData

  if (field.includes('.')) {
    const keys = field.split('.')
    let result = sectionData
    for (const key of keys) {
      result = result?.[key]
      if (result === undefined) break
    }
    return result
  }

  return sectionData?.[field]
}

// Cache API responses to avoid repeated requests
const getCachedApiData = async (key, apiCall, cacheTime = 60000) => {
  const now = Date.now()
  
  if (apiCache[key] && apiCache.lastUpdated[key] && (now - apiCache.lastUpdated[key] < cacheTime)) {
    return apiCache[key]
  }

  try {
    const data = await apiCall()
    apiCache[key] = data
    apiCache.lastUpdated[key] = now
    return data
  } catch (error) {
    console.error(`API call failed for ${key}:`, error)
    // Return cached data if available
    return apiCache[key] || null
  }
}

// Update CMS data
export const updateCMSData = async (section, field, value) => {
  try {
    if (shouldUseLocalStorage()) {
      return updateLocalStorageData(section, field, value)
    }

    // Use API
    return await updateApiData(section, field, value)
  } catch (error) {
    console.error('Error updating CMS data:', error)
    // Fallback to localStorage
    return updateLocalStorageData(section, field, value)
  }
}

// Update localStorage (fallback/migration mode)
const updateLocalStorageData = (section, field, value) => {
  const currentData = JSON.parse(JSON.stringify(getLocalStorageData()))
  
  if (!currentData[section]) {
    currentData[section] = {}
  }
  
  if (typeof currentData[section] === 'object' && currentData[section] !== null) {
    if (field.includes('.')) {
      const keys = field.split('.')
      let target = currentData[section]
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {}
        target = target[keys[i]]
      }
      target[keys[keys.length - 1]] = value
    } else {
      currentData[section][field] = value
    }
  } else {
    currentData[section] = { [field]: value }
  }
  
  localStorage.setItem('westernStarCMS', JSON.stringify(currentData))
  
  // Trigger update event
  window.dispatchEvent(new CustomEvent('cmsDataUpdated', { 
    detail: { section, field, value } 
  }))

  return value
}

// Update data via API
const updateApiData = async (section, field, value) => {
  let result

  switch (section) {
    case 'site':
      result = await api.updateSite(field === 'title' ? { title: value } : 
                                   field === 'description' ? { description: value } : 
                                   field === 'topBanner' ? { topBanner: value } : { [field]: value })
      break
    case 'hero':
      if (field === 'title' || field === 'subtitle') {
        result = await api.updateHero({ [field]: value })
      } else if (field.startsWith('badge.')) {
        const badgeField = field.split('.')[1]
        result = await api.updateHero({ badge: { [badgeField]: value } })
      }
      break
    default:
      throw new Error(`API update not implemented for section: ${section}`)
  }

  // Clear cache for this section
  delete apiCache[section]
  delete apiCache.lastUpdated[section]

  // Trigger update event
  window.dispatchEvent(new CustomEvent('cmsDataUpdated', { 
    detail: { section, field, value } 
  }))

  return result
}

// News article management with API
export const addNewsArticle = async (article) => {
  try {
    if (shouldUseLocalStorage()) {
      return addNewsArticleLocalStorage(article)
    }

    const result = await api.createNewsArticle({
      ...article,
      authorId: article.authorId || 1 // Default to first author
    })

    // Clear news cache
    delete apiCache.news
    delete apiCache.lastUpdated.news

    return result
  } catch (error) {
    console.error('Error adding news article:', error)
    return addNewsArticleLocalStorage(article)
  }
}

// LocalStorage fallback for news article creation
const addNewsArticleLocalStorage = (article) => {
  const currentNews = getLocalStorageData('news', 'items') || []
  const newId = Math.max(0, ...currentNews.map(n => n.id || 0)) + 1
  
  const articleWithId = { 
    ...article, 
    id: newId,
    date: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    views: 0,
    isVisible: true
  }
  
  const updatedNews = [...currentNews, articleWithId]
  updateLocalStorageData('news', 'items', updatedNews)
  
  return articleWithId
}

// Newsletter management with API
export const addNewsletter = async (newsletter) => {
  try {
    if (shouldUseLocalStorage()) {
      return addNewsletterLocalStorage(newsletter)
    }

    const result = await api.createNewsletter(newsletter)

    // Clear newsletters cache
    delete apiCache.newsletters
    delete apiCache.lastUpdated.newsletters

    return result.id
  } catch (error) {
    console.error('Error adding newsletter:', error)
    return addNewsletterLocalStorage(newsletter)
  }
}

// LocalStorage fallback for newsletter creation
const addNewsletterLocalStorage = (newsletter) => {
  const newsletters = getLocalStorageData('newsletters') || { items: [] }
  const currentNewsletters = newsletters.items || []
  const newId = Math.max(0, ...currentNewsletters.map(n => n.id || 0)) + 1
  
  const newNewsletter = {
    id: newId,
    dateAdded: new Date().toISOString(),
    ...newsletter
  }
  
  newsletters.items = [newNewsletter, ...currentNewsletters]
  updateLocalStorageData('newsletters', 'items', newsletters.items)
  
  return newNewsletter.id
}

// Check migration status
export const getMigrationStatus = async () => {
  try {
    return await api.getMigrationStatus()
  } catch (error) {
    console.error('Error getting migration status:', error)
    return { database: {} }
  }
}

// Clear all caches
export const clearCMSCache = () => {
  apiCache = { lastUpdated: {} }
  localStorage.removeItem('westernStarCMS')
  console.log('CMS cache cleared')
}

// Expose cache clear for UI triggers
if (typeof window !== 'undefined') {
  try {
    window.cmsApiClearCache = clearCMSCache
  } catch (_) {}
}

// Legacy functions for backward compatibility
export const getAvailableTags = async () => {
  const tags = await getCMSData('availableTags')
  if (Array.isArray(tags)) {
    return tags.map(tag => ({
      value: tag.name,
      label: tag.name,
      color: tag.color,
      active: tag.isActive
    }))
  }
  return []
}

// Export other legacy functions that components might still use
export const setCMSData = updateCMSData
export const resetCMSData = clearCMSCache

// Helper to detect if migration is available
export const isMigrationAvailable = () => {
  return !!localStorage.getItem('westernStarCMS') && !localStorage.getItem('westernStarMigrated')
}
