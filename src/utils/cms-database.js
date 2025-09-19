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
  return await apiAddNewsletter(newsletter);
};

export const updateNewsletter = async (id, updates) => {
  console.log('📧 Updating newsletter via database API:', id);
  // TODO: Implement API update
  return updates;
};

export const deleteNewsletter = async (id) => {
  console.log('📧 Deleting newsletter via database API:', id);
  // TODO: Implement API delete
  return true;
};

// News article functions  
export const addNewsArticle = async (article) => {
  console.log('📰 Adding news article via database API:', article.title);
  return await apiAddNewsArticle(article);
};

export const updateNewsArticle = async (id, updates) => {
  console.log('📰 Updating news article via database API:', id);
  // TODO: Implement API update
  return updates;
};

export const deleteNewsArticle = async (id) => {
  console.log('📰 Deleting news article via database API:', id);
  // TODO: Implement API delete
  return true;
};

// Tag functions
export const getAvailableTags = async () => {
  const tags = await apiGetAvailableTags();
  return tags;
};

// Trending topics functions
export const addTrendingTopic = async (topic) => {
  console.log('🔥 Adding trending topic via database API:', topic.title);
  // TODO: Implement API call
  return topic;
};

export const updateTrendingTopic = async (id, updates) => {
  console.log('🔥 Updating trending topic via database API:', id);
  // TODO: Implement API update
  return updates;
};

export const deleteTrendingTopic = async (id) => {
  console.log('🔥 Deleting trending topic via database API:', id);
  // TODO: Implement API delete  
  return true;
};

export const reorderTrendingTopics = async (topics) => {
  console.log('🔥 Reordering trending topics via database API');
  // TODO: Implement API reorder
  return topics;
};

export const moveTrendingTopic = async (from, to) => {
  console.log('🔥 Moving trending topic via database API:', from, '->', to);
  // TODO: Implement API move
  return true;
};

// Testimonial functions
export const addTestimonial = async (testimonial) => {
  console.log('💬 Adding testimonial via database API:', testimonial.name);
  // TODO: Implement API call
  return testimonial;
};

export const updateTestimonial = async (id, updates) => {
  console.log('💬 Updating testimonial via database API:', id);
  // TODO: Implement API update
  return updates;
};

export const deleteTestimonial = async (id) => {
  console.log('💬 Deleting testimonial via database API:', id);
  // TODO: Implement API delete
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
  return await addMultipleNewsletters(jsonData);
};

// News showcase functions
export const reorderNewsArticles = async (articles) => {
  console.log('📰 Reordering news articles via database API');
  // TODO: Implement API reorder
  return articles;
};

export const moveNewsArticle = async (from, to) => {
  console.log('📰 Moving news article via database API:', from, '->', to);
  // TODO: Implement API move
  return true;
};

export const setNewsShowcaseSection = async (articleId, section) => {
  console.log('📰 Setting news showcase section via database API:', articleId, section);
  // TODO: Implement API update
  return true;
};

export const toggleNewsVisibility = async (articleId, visible) => {
  console.log('📰 Toggling news visibility via database API:', articleId, visible);
  // TODO: Implement API update
  return true;
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

export const resetCMSData = () => {
  console.log('🔄 Resetting CMS data via database API');
  apiClearCMSCache();
  return true;
};

export const testLocalStorage = () => {
  console.log('🧪 Testing localStorage - now using database instead');
  return { mode: 'database', localStorage: false };
};

// Default export for backward compatibility
export default {
  getCMSData,
  updateCMSData,
  setCMSData,
  addNewsletter,
  addNewsArticle,
  getAvailableTags,
  resetCMSData
};
