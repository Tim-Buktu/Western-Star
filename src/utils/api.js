// API Client for Western Star Backend
// Default to relative '/api' so Vite dev proxy can avoid CORS in development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    // Ensure no double slashes and always a valid URL
    let url = ''
    if (endpoint.startsWith('http')) {
      url = endpoint
    } else {
      url = this.baseURL.replace(/\/+$/, '') + '/' + endpoint.replace(/^\/+/, '')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      let data
      try {
        data = await response.json()
      } catch (_) {
        // Non-JSON response
        data = null
      }

      if (!response.ok) {
        const message = (data && (data.error || data.message)) || `HTTP error! status: ${response.status}`
        throw new Error(message)
      }

      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Site endpoints
  async getSite() {
    return this.request('/site')
  }

  async updateSite(data) {
    return this.request('/site', {
      method: 'PUT',
      body: data,
    })
  }

  // Hero endpoints
  async getHero() {
    return this.request('/hero')
  }

  async updateHero(data) {
    return this.request('/hero', {
      method: 'PUT',
      body: data,
    })
  }

  // Tags endpoints
  async getTags() {
    return this.request('/tags')
  }

  async createTag(data) {
    return this.request('/tags', {
      method: 'POST',
      body: data,
    })
  }

  async updateTag(id, data) {
    return this.request(`/tags/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteTag(id) {
    return this.request(`/tags/${id}`, {
      method: 'DELETE',
    })
  }

  // Authors endpoints
  async getAuthors() {
    return this.request('/authors')
  }

  async getAuthor(id) {
    return this.request(`/authors/${id}`)
  }

  async createAuthor(data) {
    return this.request('/authors', {
      method: 'POST',
      body: data,
    })
  }

  async updateAuthor(id, data) {
    return this.request(`/authors/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteAuthor(id) {
    return this.request(`/authors/${id}`, {
      method: 'DELETE',
    })
  }

  // News endpoints
  async getNews(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/news?${queryString}`)
  }

  async getNewsArticle(id) {
    return this.request(`/news/${id}`)
  }

  async createNewsArticle(data) {
    return this.request('/news', {
      method: 'POST',
      body: data,
    })
  }

  async updateNewsArticle(id, data) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteNewsArticle(id) {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    })
  }

  async reorderNewsArticles(articles) {
    return this.request('/news/reorder', {
      method: 'PUT',
      body: { articles },
    })
  }

  // Newsletters endpoints
  async getNewsletters(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/newsletters?${queryString}`)
  }

  async getNewsletter(id) {
    return this.request(`/newsletters/${id}`)
  }

  async createNewsletter(data) {
    return this.request('/newsletters', {
      method: 'POST',
      body: data,
    })
  }

  async updateNewsletter(id, data) {
    return this.request(`/newsletters/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteNewsletter(id) {
    return this.request(`/newsletters/${id}`, {
      method: 'DELETE',
    })
  }

  // Trending topics endpoints
  async getTrendingTopics() {
    return this.request('/trending-topics')
  }

  async createTrendingTopic(data) {
    return this.request('/trending-topics', {
      method: 'POST',
      body: data,
    })
  }

  async updateTrendingTopic(id, data) {
    return this.request(`/trending-topics/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteTrendingTopic(id) {
    return this.request(`/trending-topics/${id}`, {
      method: 'DELETE',
    })
  }

  // Topics endpoints
  async getTopics() {
    return this.request('/topics')
  }

  async createTopic(data) {
    return this.request('/topics', {
      method: 'POST',
      body: data,
    })
  }

  async updateTopic(id, data) {
    return this.request(`/topics/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteTopic(id) {
    return this.request(`/topics/${id}`, {
      method: 'DELETE',
    })
  }

  // Navigation endpoints
  async getNavigation() {
    return this.request('/navigation')
  }

  // Testimonials endpoints
  async getTestimonials() {
    return this.request('/testimonials')
  }

  async createTestimonial(data) {
    return this.request('/testimonials', {
      method: 'POST',
      body: data,
    })
  }

  async updateTestimonial(id, data) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteTestimonial(id) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    })
  }

  // Footer endpoints
  async getFooter() {
    return this.request('/footer')
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics/dashboard')
  }

  // Migration endpoints
  async migrateFromLocalStorage(cmsData) {
    return this.request('/migration/from-localstorage', {
      method: 'POST',
      body: { cmsData },
    })
  }

  async getMigrationStatus() {
    return this.request('/migration/status')
  }
}

export default new ApiClient()
