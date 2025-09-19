#!/usr/bin/env node

// CMS Integration Test Script
// Tests all major CMS endpoints to ensure frontend, backend, and database are aligned

const API_BASE = 'http://localhost:3001/api';

async function testEndpoint(method, endpoint, data = null) {
  const url = `${API_BASE}${endpoint}`;
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${method} ${endpoint}: SUCCESS`);
      return { success: true, data: result };
    } else {
      console.log(`❌ ${method} ${endpoint}: FAILED - ${result.error || response.statusText}`);
      return { success: false, error: result.error || response.statusText };
    }
  } catch (error) {
    console.log(`❌ ${method} ${endpoint}: ERROR - ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Starting CMS Integration Tests...\n');
  
  // Test Hero section
  console.log('📝 Testing Hero Section:');
  await testEndpoint('GET', '/hero');
  await testEndpoint('PUT', '/hero', { title: 'CMS Integration Test - Working!' });
  
  // Test Topics
  console.log('\n📋 Testing Topics:');
  await testEndpoint('GET', '/topics');
  const topicResult = await testEndpoint('POST', '/topics', {
    icon: '🧪',
    title: 'Test Topic',
    description: 'This is a test topic for CMS integration'
  });
  
  if (topicResult.success && topicResult.data.id) {
    await testEndpoint('PUT', `/topics/${topicResult.data.id}`, {
      title: 'Updated Test Topic'
    });
    await testEndpoint('DELETE', `/topics/${topicResult.data.id}`);
  }
  
  // Test Testimonials
  console.log('\n⭐ Testing Testimonials:');
  await testEndpoint('GET', '/testimonials');
  const testimonialResult = await testEndpoint('POST', '/testimonials', {
    name: 'Test User',
    title: 'Test Role',
    text: 'This is a test testimonial for CMS integration'
  });
  
  if (testimonialResult.success && testimonialResult.data.id) {
    await testEndpoint('PUT', `/testimonials/${testimonialResult.data.id}`, {
      text: 'Updated test testimonial'
    });
    await testEndpoint('DELETE', `/testimonials/${testimonialResult.data.id}`);
  }
  
  // Test Trending Topics
  console.log('\n🔥 Testing Trending Topics:');
  await testEndpoint('GET', '/trending-topics');
  const trendingResult = await testEndpoint('POST', '/trending-topics', {
    category: 'Test',
    title: 'Test Trending Topic',
    summary: 'This is a test trending topic',
    date: '2025-09-10',
    image: 'https://via.placeholder.com/400x300'
  });
  
  if (trendingResult.success && trendingResult.data.id) {
    await testEndpoint('DELETE', `/trending-topics/${trendingResult.data.id}`);
  }
  
  // Test Newsletters
  console.log('\n📧 Testing Newsletters:');
  await testEndpoint('GET', '/newsletters');
  const newsletterResult = await testEndpoint('POST', '/newsletters', {
    title: 'Test Newsletter',
    keyDiscussion: 'Test key discussion',
    date: '2025-09-10',
    tags: []
  });
  
  if (newsletterResult.success && newsletterResult.data.id) {
    await testEndpoint('DELETE', `/newsletters/${newsletterResult.data.id}`);
  }
  
  // Test News Articles
  console.log('\n📰 Testing News Articles:');
  await testEndpoint('GET', '/news');
  const newsResult = await testEndpoint('POST', '/news', {
    type: 'article',
    category: 'Test',
    title: 'Test News Article',
    summary: 'This is a test news article',
    content: 'Test content for the news article',
    date: '2025-09-10',
    authorId: 1,
    tags: []
  });
  
  if (newsResult.success && newsResult.data.id) {
    await testEndpoint('DELETE', `/news/${newsResult.data.id}`);
  }
  
  console.log('\n🎉 CMS Integration Tests Complete!');
  console.log('\nℹ️  If all tests show ✅ SUCCESS, your CMS is fully integrated and working!');
  console.log('ℹ️  You can now use the CMS interface at http://localhost:5173 to manage content.');
}

runTests().catch(console.error);
