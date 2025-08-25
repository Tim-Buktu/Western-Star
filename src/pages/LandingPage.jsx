import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CMSAdmin from '../components/CMSAdmin'
import Hero from '../sections/Hero'
import ContentPreview from '../sections/ContentPreview'
import NewsletterArchive from '../sections/NewsletterArchive'
import Topics from '../sections/Topics'
import Testimonials from '../sections/Testimonials'
import Subscribe from '../sections/Subscribe'
import { getCMSData } from '../utils/cms'

export default function LandingPage() {
  const siteData = getCMSData('site');

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="w-full bg-red-600 text-xs text-white tracking-wide py-2 text-center">
        {siteData?.topBanner || "Indonesia. Tech. Business. Policy. Investment. Global Signals."}
      </div>
      <Navbar />
      <Hero />
      <ContentPreview />
      <NewsletterArchive />
      <Topics />
      <Testimonials />
      <Subscribe />
      <Footer />
      <CMSAdmin />
    </div>
  )
}
