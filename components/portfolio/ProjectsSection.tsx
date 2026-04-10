'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, Code2, Database, Brain, BarChart3 } from 'lucide-react'

/* ============================================
   Projects Data
============================================ */
const projects = [
  {
    id: 1,
    title: 'Hostel Management System',
    shortDesc: 'Comprehensive hostel administration platform with smart fee tracking.',
    fullDesc: 'A full-featured hostel management system designed to streamline administrative tasks. Features include automated fee tracking with due-date penalty calculations, interactive dashboards for real-time insights, efficient room allocation algorithms, and comprehensive student management.',
    tags: ['ASP.NET', 'SQL Server', 'JavaScript', 'Bootstrap'],
    features: ['Fee Tracking System', 'Due-Date Penalty Calculator', 'Admin Dashboard', 'Room Allocation', 'Student Records'],
    icon: Database,
    color: 'from-cyan-500 to-blue-600',
    image: '/api/placeholder/600/400',
  },
  {
    id: 2,
    title: 'ASL Hand Sign Recognition',
    shortDesc: 'Real-time American Sign Language recognition using deep learning.',
    fullDesc: 'An innovative computer vision project that enables real-time recognition of American Sign Language hand gestures. Built using TensorFlow and OpenCV, the system processes webcam input to instantly translate hand signs into text, making communication more accessible.',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    features: ['Real-time Webcam Processing', 'CNN Model Architecture', '95%+ Accuracy', 'Live Translation', 'Custom Dataset'],
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    image: '/api/placeholder/600/400',
  },
  {
    id: 3,
    title: 'Customer Behaviour Analysis',
    shortDesc: 'Data-driven insights platform for understanding customer patterns.',
    fullDesc: 'A comprehensive analytics platform that leverages machine learning to uncover hidden patterns in customer behavior. Features advanced trend analysis, predictive modeling for customer churn, and interactive Power BI dashboards for stakeholder presentations.',
    tags: ['Python', 'Power BI', 'Machine Learning', 'SQL'],
    features: ['Trend Analysis', 'ML-Powered Insights', 'Interactive Dashboards', 'Churn Prediction', 'Segmentation'],
    icon: BarChart3,
    color: 'from-orange-500 to-red-500',
    image: '/api/placeholder/600/400',
  },
  {
    id: 4,
    title: 'Student Performance Prediction',
    shortDesc: 'ML model predicting academic outcomes and identifying at-risk students.',
    fullDesc: 'An intelligent system that predicts student academic performance using various demographic and academic factors. The Flask-deployed application helps educators identify at-risk students early and provides actionable recommendations for intervention.',
    tags: ['Python', 'Flask', 'Scikit-learn', 'Pandas'],
    features: ['Risk Detection Algorithm', 'Score Prediction Model', 'Flask API Deployment', 'Feature Analysis', 'Intervention Suggestions'],
    icon: Code2,
    color: 'from-green-500 to-teal-500',
    image: '/api/placeholder/600/400',
  },
]

/* ============================================
   Project Card Component with Tilt Effect
============================================ */
function ProjectCard({ 
  project, 
  onClick 
}: { 
  project: typeof projects[0]
  onClick: () => void 
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateX((y - centerY) / 20)
    setRotateY((centerX - x) / 20)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Glow effect on hover */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300`} />
      
      <div className="relative z-10 p-6 space-y-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center transform transition-transform group-hover:scale-110`}
          style={{ transform: 'translateZ(20px)' }}
        >
          <project.icon className="w-7 h-7 text-white" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2" style={{ transform: 'translateZ(10px)' }}>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.shortDesc}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(15px)' }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* View Details indicator */}
        <div className="pt-4 border-t border-border/50">
          <span className="text-sm text-primary font-medium group-hover:underline inline-flex items-center gap-2">
            View Details
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================
   Project Modal Component
============================================ */
function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: typeof projects[0] | null
  onClose: () => void 
}) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-secondary transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with gradient */}
        <div className={`relative h-32 bg-gradient-to-br ${project.color}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-4 left-6">
            <div className="w-16 h-16 rounded-xl bg-card/90 backdrop-blur flex items-center justify-center shadow-lg">
              <project.icon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{project.fullDesc}</p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-3">Key Features</h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r ${project.color} bg-opacity-10 border border-current/20`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r ${project.color} text-white font-medium`}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg glass font-medium"
            >
              <Github className="w-4 h-4" />
              Source Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================
   Projects Section Component
============================================ */
export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium">
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Projects That Define
            <span className="text-primary"> My Expertise</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            A showcase of innovative solutions spanning web development, machine learning, and data analytics.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
