'use client'

import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react'

/* ============================================
   Footer Component
   Dark gradient footer with social links
============================================ */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/thejakhruomo', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/thejakhruomo', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/thejakhruomo', label: 'Twitter' },
    { icon: Mail, href: 'mailto:theja.khruomo@email.com', label: 'Email' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                  <span className="text-primary-foreground font-bold text-xl">TK</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Theja Khruomo</h3>
                  <p className="text-sm text-muted-foreground">Full Stack & AI/ML Engineer</p>
                </div>
              </div>
              
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Passionate about building innovative digital solutions at the intersection of 
                web development and artificial intelligence. {"Let's"} create something amazing together.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a 
                    href="mailto:theja.khruomo@email.com"
                    className="hover:text-primary transition-colors"
                  >
                    theja.khruomo@email.com
                  </a>
                </li>
                <li>India</li>
                <li>
                  <span className="inline-flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available for work
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                &copy; {currentYear} Theja Khruomo. Built with
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                and React
              </p>
              
              <p className="text-sm text-muted-foreground">
                Designed & Developed by <span className="text-primary">Theja Khruomo</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-primary z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
