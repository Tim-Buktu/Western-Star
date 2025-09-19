// Content Management System - DATABASE MODE
// This file now redirects all CMS operations to the database API

import { 
  getCMSData as apiGetCMSData, 
  updateCMSData as apiUpdateCMSData, 
  addNewsletter as apiAddNewsletter,
  addNewsArticle as apiAddNewsArticle,
  getAvailableTags as apiGetAvailableTags,
  clearCMSCache as apiClearCMSCache
} from './cmsApi.js';

// Force database mode immediately
if (typeof window !== 'undefined') {
  localStorage.setItem('westernStarMigrated', 'true');
  console.log('🔄 CMS forced to database mode');
}

// Core CMS functions that redirect to API
export const getCMSData = apiGetCMSData;
export const updateCMSData = apiUpdateCMSData;
export const setCMSData = apiUpdateCMSData; // Legacy alias

// Newsletter functions
export const addNewsletter = async (newsletter) => {
  console.log('📧 Adding newsletter via database API:', newsletter.title);
  const id = await apiAddNewsletter(newsletter);
  // Notify listeners and ensure fresh data
  try { apiClearCMSCache(); } catch (_) {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cmsDataUpdated', { detail: { section: 'newsletters' } }))
  }
  return id;
};

export const updateNewsletter = async (id, updates) => {
  console.log('📧 Updating newsletter via database API:', id);
  const api = await import('./api.js');
  const result = await api.default.updateNewsletter(id, updates);
  // Clear newsletters cache and broadcast update
  try { apiClearCMSCache(); } catch (_) {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cmsDataUpdated', { detail: { section: 'newsletters', id } }))
  }
  return result;
};

export const deleteNewsletter = async (id) => {
  console.log('📧 Deleting newsletter via database API:', id);
  const api = await import('./api.js');
  await api.default.deleteNewsletter(id);
  try { apiClearCMSCache(); } catch (_) {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cmsDataUpdated', { detail: { section: 'newsletters', id, deleted: true } }))
  }
  return true;
};

// News article functions  
export const addNewsArticle = async (article) => {
  console.log('📰 Adding news article via database API:', article.title);
  return await apiAddNewsArticle(article);
};

export const updateNewsArticle = async (id, updates) => {
  console.log('📰 Updating news article via database API:', id);
  const api = await import('./api.js');
  return await api.default.updateNewsArticle(id, updates);
};

export const deleteNewsArticle = async (id) => {
  console.log('📰 Deleting news article via database API:', id);
  const api = await import('./api.js');
  await api.default.deleteNewsArticle(id);
  return true;
};

// Tag functions
export const getAvailableTags = async () => {
  try {
    const tags = await apiGetAvailableTags();
    return Array.isArray(tags) ? tags : [];
  } catch (error) {
    console.error('Error getting available tags:', error);
    return [];
  }
};

// Topic functions
export const addTopic = async (topic) => {
  console.log('📋 Adding topic via database API:', topic.title);
  const api = await import('./api.js');
  return await api.default.createTopic(topic);
};

export const updateTopic = async (id, updates) => {
  console.log('📋 Updating topic via database API:', id);
  const api = await import('./api.js');
  return await api.default.updateTopic(id, updates);
};

export const deleteTopic = async (id) => {
  console.log('📋 Deleting topic via database API:', id);
  const api = await import('./api.js');
  await api.default.deleteTopic(id);
  return true;
};
export const addTrendingTopic = async (topic) => {
  console.log('🔥 Adding trending topic via database API:', topic.title);
  const api = await import('./api.js');
  return await api.default.createTrendingTopic(topic);
};

export const updateTrendingTopic = async (id, updates) => {
  console.log('🔥 Updating trending topic via database API:', id);
  const api = await import('./api.js');
  return await api.default.updateTrendingTopic(id, updates);
};

export const deleteTrendingTopic = async (id) => {
  console.log('🔥 Deleting trending topic via database API:', id);
  const api = await import('./api.js');
  await api.default.deleteTrendingTopic(id);
  return true;
};

export const reorderTrendingTopics = async (topics) => {
  console.log('🔥 Reordering trending topics via database API');
  // We don't have a bulk reorder endpoint; update positions sequentially
  const api = await import('./api.js')
  const items = Array.isArray(topics?.items) ? topics.items : Array.isArray(topics) ? topics : []
  for (let i = 0; i < items.length; i++) {
    const t = items[i]
    try {
      await api.default.updateTrendingTopic(t.id, { position: i + 1 })
    } catch (e) {
      console.warn('Failed to update trending topic position', t.id, e.message)
    }
  }
  // Clear cache
  const { default: cmsApi } = await import('./cmsApi.js')
  cmsApi.clearCMSCache?.()
  return true
};

export const moveTrendingTopic = async (id, direction) => {
  console.log('🔥 Moving trending topic via database API:', id, direction);
  // Fetch current order
  const current = await getCMSData('trendingTopics')
  const items = Array.isArray(current?.items) ? [...current.items] : []
  const index = items.findIndex(t => t.id === id)
  if (index === -1) return false
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= items.length) return false
  // swap
  ;[items[index], items[targetIndex]] = [items[targetIndex], items[index]]
  // Persist new positions
  await reorderTrendingTopics(items)
  return true
};

// Testimonial functions
export const addTestimonial = async (testimonial) => {
  console.log('💬 Adding testimonial via database API:', testimonial.name);
  const api = await import('./api.js');
  return await api.default.createTestimonial(testimonial);
};

export const updateTestimonial = async (id, updates) => {
  console.log('💬 Updating testimonial via database API:', id);
  const api = await import('./api.js');
  return await api.default.updateTestimonial(id, updates);
};

export const deleteTestimonial = async (id) => {
  console.log('💬 Deleting testimonial via database API:', id);
  const api = await import('./api.js');
  await api.default.deleteTestimonial(id);
  return true;
};

// Multiple operations
export const addMultipleNewsletters = async (newsletters) => {
  console.log('📧 Adding multiple newsletters via database API:', newsletters.length);
  const results = [];
  for (const newsletter of newsletters) {
    const result = await addNewsletter(newsletter);
    results.push(result);
  }
  return results;
};

export const importNewslettersFromJSON = async (jsonData) => {
  console.log('📧 Importing newsletters from JSON via database API');
  try {
    const arr = Array.isArray(jsonData) ? jsonData : (Array.isArray(jsonData?.newsletters) ? jsonData.newsletters : [])
    if (!Array.isArray(arr) || arr.length === 0) {
      return { success: false, message: 'No newsletters found in JSON' }
    }
    await addMultipleNewsletters(arr)
    return { success: true, message: `Imported ${arr.length} newsletters` }
  } catch (e) {
    return { success: false, message: e.message }
  }
};

// News showcase functions
export const reorderNewsArticles = async (articles) => {
  console.log('📰 Reordering news articles via database API');
  const api = await import('./api.js')
  await api.default.reorderNewsArticles(articles)
  const { default: cmsApi } = await import('./cmsApi.js')
  cmsApi.clearCMSCache?.()
  return true
};

export const moveNewsArticle = async (id, direction) => {
  console.log('📰 Moving news article via database API:', id, direction);
  const api = await import('./api.js')
  // Load current list
  const current = await getCMSData('news')
  const items = Array.isArray(current?.items) ? [...current.items] : []
  const index = items.findIndex(a => a.id === id)
  if (index === -1) return false
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= items.length) return false
  // swap locally
  ;[items[index], items[targetIndex]] = [items[targetIndex], items[index]]
  // Assign new positions and persist
  const payload = items.map((a, i) => ({ id: a.id, position: i + 1 }))
  await api.default.reorderNewsArticles(payload)
  // Clear cache for news
  const { default: cmsApi } = await import('./cmsApi.js')
  cmsApi.clearCMSCache?.()
  return true
};

export const setNewsShowcaseSection = async (articleId, section) => {
  console.log('📰 Setting news showcase section via database API:', articleId, section);
  const api = await import('./api.js')
  await api.default.updateNewsArticle(articleId, { showcaseSection: section })
  const { default: cmsApi } = await import('./cmsApi.js')
  cmsApi.clearCMSCache?.()
  return true
};

export const toggleNewsVisibility = async (articleId) => {
  console.log('📰 Toggling news visibility via database API:', articleId);
  const api = await import('./api.js')
  // Get current article to know current state
  const article = await api.default.getNewsArticle(articleId)
  await api.default.updateNewsArticle(articleId, { isVisible: !article.isVisible })
  const { default: cmsApi } = await import('./cmsApi.js')
  cmsApi.clearCMSCache?.()
  return true
};

export const getNewsByShowcaseSection = async (section) => {
  console.log('📰 Getting news by showcase section via database API:', section);
  const allNews = await getCMSData('news');
  return allNews?.items?.filter(article => article.showcaseSection === section) || [];
};

export const getFeaturedArticle = async () => {
  console.log('📰 Getting featured article via database API');
  const allNews = await getCMSData('news');
  return allNews?.items?.find(article => article.showcaseSection === 'featured') || null;
};

export const getMosaicArticles = async () => {
  console.log('📰 Getting mosaic articles via database API');
  const allNews = await getCMSData('news');
  return allNews?.items?.filter(article => article.showcaseSection === 'mosaic') || [];
};

export const getLoopArticles = async () => {
  console.log('📰 Getting loop articles via database API');
  const allNews = await getCMSData('news');
  return allNews?.items?.filter(article => article.showcaseSection === 'loop') || [];
};

// Utility functions
export const refreshAllArticleContent = async () => {
  console.log('🔄 Refreshing all article content via database API');
  apiClearCMSCache();
  return true;
};

export const debugNewsData = async () => {
  console.log('🐛 Debug news data via database API');
  const data = await getCMSData('news');
  console.log('News data:', data);
  return data;
};

export const clearCMSCache = () => {
  console.log('🔄 Clearing CMS cache via database API');
  apiClearCMSCache();
  return true;
};

export const resetCMSData = () => {
  console.log('🔄 Resetting CMS data via database API');
  apiClearCMSCache();
  return true;
};

export const testLocalStorage = () => {
  console.log('🧪 Testing localStorage - now using database instead');
  return { mode: 'database', localStorage: false };
};

// Article processing functions
export const processArticleContent = async (article) => {
  console.log('📰 Processing article content via database API:', article.title);
  if (!article.content) return article;
  
  const processedArticle = { ...article };
  
  // Auto-generate insights if not manually set
  if (!processedArticle.insights || processedArticle.insights.length === 0) {
    processedArticle.insights = extractKeyInsights(article.content);
  }
  
  // Auto-generate resources if not manually set
  if (!processedArticle.resources || processedArticle.resources.length === 0) {
    processedArticle.resources = extractAdditionalResources(article.content, article.tags);
  }
  
  return processedArticle;
};

export const getRelatedArticles = async (tags = [], currentArticleId = null) => {
  console.log('📰 Getting related articles via database API');
  if (!tags.length) return [];
  
  const allNews = await getCMSData('news') || { articles: [] };
  const articles = allNews.articles || [];
  const tagSet = new Set(tags.map(tag => typeof tag === 'string' ? tag.toLowerCase() : tag.name?.toLowerCase()));
  
  return articles
    .filter(article => {
      if (article.id === currentArticleId) return false;
      if (!article.isVisible) return false;
      if (!article.tags || !article.tags.length) return false;
      
      // Check if any tags match
      return article.tags.some(tag => {
        const tagName = typeof tag === 'string' ? tag : tag.name;
        return tagSet.has(tagName.toLowerCase());
      });
    })
    .sort((a, b) => {
      // Sort by number of matching tags (descending)
      const aMatches = a.tags.filter(tag => {
        const tagName = typeof tag === 'string' ? tag : tag.name;
        return tagSet.has(tagName.toLowerCase());
      }).length;
      const bMatches = b.tags.filter(tag => {
        const tagName = typeof tag === 'string' ? tag : tag.name;
        return tagSet.has(tagName.toLowerCase());
      }).length;
      if (aMatches !== bMatches) return bMatches - aMatches;
      
      // Then by date (newest first)
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 4); // Limit to 4 related articles
};

// Helper functions for article processing
const extractKeyInsights = (content) => {
  // Simple extraction of key insights from content
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
  return sentences.slice(0, 3).map(sentence => sentence.trim());
};

const extractAdditionalResources = (content, tags) => {
  // Generate some placeholder resources based on tags
  const resources = [];
  if (tags.includes('TECHNOLOGY')) {
    resources.push({
      title: 'Tech Industry Report',
      description: 'Comprehensive analysis of current technology trends',
      url: '#',
      type: 'report'
    });
  }
  if (tags.includes('POLICY & REGULATIONS')) {
    resources.push({
      title: 'Policy Guidelines',
      description: 'Latest regulatory updates and compliance information',
      url: '#',
      type: 'guide'
    });
  }
  return resources;
};

// Default export for backward compatibility
export default {
  getCMSData,
  updateCMSData,
  setCMSData,
  addNewsletter,
  addNewsArticle,
  getAvailableTags,
  clearCMSCache,
  resetCMSData,
  processArticleContent,
  getRelatedArticles
};
