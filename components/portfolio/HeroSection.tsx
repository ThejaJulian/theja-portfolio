'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useScrollToSection } from '@/components/portfolio/SmoothScrollProvider'

// Dynamic import for 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('./Scene3D'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
  )
})

/* ============================================
   Hero Section Component
   Split layout with intro and 3D scene
============================================ */
export default function HeroSection() {
  const scrollToId = useScrollToSection()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background Scene */}
      <Scene3D />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Profile Picture & Status */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                {/* Glowing ring effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-md opacity-75 animate-pulse" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/50">
                  <Image
                    src="/profile.jpg"
                    alt="Theja Khruomo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </div>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance">
                <span className="block text-foreground">{"Hi, I'm"}</span>
                <span className="block text-primary glow-text">Theja Khruomo</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-muted-foreground sm:text-lg md:text-xl">
                <span className="text-primary font-mono">{'<'}</span>
                <span className="font-medium">Full Stack Developer</span>
                <span className="text-primary">|</span>
                <span className="font-medium">Data Science</span>
                <span className="text-primary">|</span>
                <span className="font-medium">AI/ML Engineer</span>
                <span className="text-primary font-mono">{'/>'}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Crafting innovative digital experiences at the intersection of 
              <span className="text-primary"> web development</span> and 
              <span className="text-accent"> artificial intelligence</span>. 
              Passionate about building scalable applications and extracting 
              meaningful insights from data.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('projects')
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all glow-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 glass rounded-lg font-medium hover:bg-secondary/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-sm text-muted-foreground">Connect with me:</span>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/thejakhruomo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/thejakhruomo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Reserved for 3D Scene (shows through) */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToId('about')}
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
