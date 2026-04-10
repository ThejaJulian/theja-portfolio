'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Brain, Database, Layers } from 'lucide-react'
import Image from 'next/image'

/* ============================================
   Strength Cards Data
============================================ */
const strengths = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Building robust web applications with React, Node.js, ASP.NET, and modern frameworks.',
    color: 'from-primary to-cyan-400',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Developing intelligent systems with TensorFlow, scikit-learn, and deep learning models.',
    color: 'from-accent to-teal-400',
  },
  {
    icon: Database,
    title: 'Data Science',
    description: 'Extracting insights from complex datasets using Python, SQL, and visualization tools.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Layers,
    title: 'System Design',
    description: 'Architecting scalable solutions with clean code principles and best practices.',
    color: 'from-teal-500 to-green-500',
  },
]

/* ============================================
   About Section Component
   Professional summary with animated cards
============================================ */
export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Turning Ideas into
              <span className="text-primary"> Digital Reality</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              A passionate developer bridging the gap between cutting-edge technology and real-world solutions.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass p-8 rounded-2xl space-y-6">
                {/* Profile Picture in About Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative shrink-0">
                    {/* Animated border gradient */}
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-60 group-hover:opacity-100 animate-gradient-shift" />
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-primary/30">
                      <Image
                        src="/profile.jpg"
                        alt="Theja Khruomo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Decorative corner accents */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-semibold">Professional Summary</h3>
                    <p className="text-primary text-sm mt-1">Full Stack Developer & AI/ML Engineer</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {"I'm"} <span className="text-foreground font-medium">Theja Khruomo</span>, a dedicated 
                    Full Stack Developer and AI/ML Engineer with a passion for creating innovative 
                    digital solutions. My expertise spans across modern web technologies, data science, 
                    and machine learning.
                  </p>
                  
                  <p>
                    Currently expanding my skills as a <span className="text-primary">Data Science Intern</span> at 
                    KAPsLOCK Softwares, where I work on real-world projects involving data analysis, 
                    predictive modeling, and business intelligence solutions.
                  </p>
                  
                  <p>
                    I believe in writing clean, maintainable code and building applications that 
                    not only work flawlessly but also provide exceptional user experiences. My 
                    goal is to leverage technology to solve complex problems and create meaningful impact.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">4+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">1+</div>
                    <div className="text-sm text-muted-foreground">Years Exp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">4+</div>
                    <div className="text-sm text-muted-foreground">Certifications</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Strength Cards */}
            <motion.div 
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-4"
            >
              {strengths.map((strength, index) => (
                <motion.div
                  key={strength.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative glass p-6 rounded-xl overflow-hidden cursor-pointer"
                >
                  {/* Gradient border effect on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${strength.color}`} style={{ padding: '1px' }}>
                    <div className="absolute inset-[1px] bg-card rounded-xl" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${strength.color} flex items-center justify-center group-hover:animate-pulse-glow`}>
                      <strength.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-lg">{strength.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {strength.description}
                    </p>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
