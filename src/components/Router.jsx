import React, { useState, useEffect } from 'react'
import LandingPage from '../pages/LandingPage'
import NewsroomPage from '../pages/NewsroomPage'
import NewsletterDetailPage from '../pages/NewsletterDetailPage'
import NewsArticlePage from '../pages/NewsArticlePage'
import NewsPage from '../pages/NewsPage'
import WIPPage from '../pages/WIPPage'
import CMSAdmin from './CMSAdmin'
import MigrationPanel from './MigrationPanel'
import DatabaseMigrationFix from './DatabaseMigrationFix'

export default function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [params, setParams] = useState({})

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
      parseParams()
    }

    const parseParams = () => {
      const path = window.location.pathname
      const newsletterMatch = path.match(/^\/newsletter\/(.+)$/)
      const newsMatch = path.match(/^\/news\/(.+)$/)
      
      if (newsletterMatch) {
        setParams({ newsletterId: newsletterMatch[1] })
      } else if (newsMatch) {
        setParams({ articleId: newsMatch[1] })
      } else {
        setParams({})
      }
    }

    parseParams()
    window.addEventListener('popstate', handlePopState)

    // Override default link behavior
    const handleLinkClick = (e) => {
      const link = e.target.closest('a')
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
        e.preventDefault()
        navigateTo(link.getAttribute('href'))
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  const navigateTo = (path) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path)
      setCurrentPath(path)
      
      // Parse params for new path
      const newsletterMatch = path.match(/^\/newsletter\/(.+)$/)
      const newsMatch = path.match(/^\/news\/(.+)$/)
      
      if (newsletterMatch) {
        setParams({ newsletterId: newsletterMatch[1] })
      } else if (newsMatch) {
        setParams({ articleId: newsMatch[1] })
      } else {
        setParams({})
      }
    }
  }

  // Make navigateTo available globally for components that need it
  useEffect(() => {
    window.navigateTo = navigateTo
  }, [])

  // Render the appropriate page component
  let PageComponent

  // Route matching
  if (currentPath === '/newsroom') {
    PageComponent = <NewsroomPage />
  } else if (currentPath === '/research') {
    PageComponent = <WIPPage title="Research Hub" description="Our comprehensive research section with in-depth analysis and market insights." />
  } else if (currentPath === '/news') {
    PageComponent = <NewsPage />
  } else if (currentPath.startsWith('/newsletter/')) {
    const newsletterMatch = currentPath.match(/^\/newsletter\/(.+)$/)
    if (newsletterMatch) {
      PageComponent = <NewsletterDetailPage newsletterId={newsletterMatch[1]} />
    } else {
      PageComponent = <LandingPage />
    }
  } else if (currentPath.startsWith('/news/')) {
    const newsMatch = currentPath.match(/^\/news\/(.+)$/)
    if (newsMatch) {
      PageComponent = <NewsArticlePage articleId={newsMatch[1]} />
    } else {
      PageComponent = <LandingPage />
    }
  } else {
    // Default to landing page
    PageComponent = <LandingPage />
  }

  return (
    <>
      <MigrationPanel />
      <DatabaseMigrationFix />
      {PageComponent}
      <CMSAdmin />
    </>
  )
}
