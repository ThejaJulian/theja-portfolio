'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

/* ============================================
   Component Imports
   Using dynamic imports for better performance
============================================ */

import LoadingScreen from '@/components/portfolio/LoadingScreen'
import SectionLoader from '@/components/portfolio/SectionLoader'
import Navbar from '@/components/portfolio/Navbar'
import HeroSection from '@/components/portfolio/HeroSection'
import Footer from '@/components/portfolio/Footer'

// Premium feature components
import {
  MouseFollowGlow,
  ScrollProgressIndicator,
  ParallaxBackground,
  GridBackground,
  FloatingIndicators,
  NoiseOverlay,
} from '@/components/portfolio/PremiumFeatures'

// Lazy loaded sections for better performance
const AboutSection = dynamic(() => import('@/components/portfolio/AboutSection'), {
  loading: () => <SectionLoader />,
})

const ProjectsSection = dynamic(() => import('@/components/portfolio/ProjectsSection'), {
  loading: () => <SectionLoader />,
})

const SkillsSection = dynamic(() => import('@/components/portfolio/SkillsSection'), {
  loading: () => <SectionLoader />,
})

const TimelineSection = dynamic(() => import('@/components/portfolio/TimelineSection'), {
  loading: () => <SectionLoader />,
})

const CertificatesSection = dynamic(() => import('@/components/portfolio/CertificatesSection'), {
  loading: () => <SectionLoader />,
})

const ContactSection = dynamic(() => import('@/components/portfolio/ContactSection'), {
  loading: () => <SectionLoader />,
})

/* ============================================
   Main Portfolio Page Component
   Assembles all sections into a cohesive portfolio
============================================ */
export default function PortfolioPage() {
  return (
    <>
      {/* Loading Screen Animation */}
      <LoadingScreen />

      {/* Premium Background Effects */}
      <GridBackground />
      <ParallaxBackground />
      <NoiseOverlay />
      
      {/* Mouse Follow Glow Effect */}
      <MouseFollowGlow />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Floating Section Indicators */}
      <FloatingIndicators />

      {/* Main Content */}
      <main className="relative">
        {/* Sticky Navigation */}
        <Navbar />

        {/* Hero Section with 3D Scene */}
        <HeroSection />

        {/* About Section */}
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        {/* Projects Section */}
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        {/* Skills Section with Orbit Animation */}
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>

        {/* Timeline Section */}
        <Suspense fallback={<SectionLoader />}>
          <TimelineSection />
        </Suspense>

        {/* Certificates Section */}
        <Suspense fallback={<SectionLoader />}>
          <CertificatesSection />
        </Suspense>

        {/* Contact Section with Form */}
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
