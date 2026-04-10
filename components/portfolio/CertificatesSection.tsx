'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, X, Calendar, Building } from 'lucide-react'

/* ============================================
   Certificates Data
============================================ */
const certificates = [
  {
    id: 1,
    title: 'Data Science Internship',
    issuer: 'KAPsLOCK Softwares',
    date: 'December 2024',
    description: 'Completed comprehensive data science internship covering data analysis, machine learning, and business intelligence.',
    skills: ['Python', 'Pandas', 'Machine Learning', 'Power BI'],
    color: 'from-cyan-500 to-blue-600',
    credentialId: 'DS-2024-001',
  },
  {
    id: 2,
    title: 'Machine Learning with Python',
    issuer: 'Online Certification',
    date: 'November 2024',
    description: 'Advanced certification in machine learning algorithms, neural networks, and model deployment using Python.',
    skills: ['TensorFlow', 'Scikit-learn', 'Deep Learning', 'Model Deployment'],
    color: 'from-purple-500 to-pink-500',
    credentialId: 'ML-2024-002',
  },
  {
    id: 3,
    title: 'React Web Development',
    issuer: 'Professional Certification',
    date: 'October 2024',
    description: 'Full-stack React development certification covering modern React patterns, hooks, and state management.',
    skills: ['React', 'JavaScript', 'Redux', 'REST APIs'],
    color: 'from-blue-500 to-cyan-500',
    credentialId: 'RWD-2024-003',
  },
  {
    id: 4,
    title: 'ASP.NET Full Stack',
    issuer: 'Microsoft Technologies',
    date: 'September 2024',
    description: 'Comprehensive certification in ASP.NET development including MVC, Web APIs, and database integration.',
    skills: ['ASP.NET', 'C#', 'SQL Server', 'Entity Framework'],
    color: 'from-violet-500 to-purple-600',
    credentialId: 'ASPNET-2024-004',
  },
]

/* ============================================
   Certificate Card Component
============================================ */
function CertificateCard({ 
  certificate, 
  onClick,
  index,
}: { 
  certificate: typeof certificates[0]
  onClick: () => void
  index: number
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Glowing border on hover */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${certificate.color} rounded-2xl opacity-0 group-hover:opacity-70 blur-sm transition-all duration-300`} />
      
      {/* Card Content */}
      <div className="relative glass rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-card/80">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${certificate.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            <Award className="w-7 h-7 text-white" />
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-lg glass opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 text-primary" />
          </motion.div>
        </div>

        {/* Title & Issuer */}
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
          {certificate.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <Building className="w-4 h-4" />
          {certificate.issuer}
        </p>

        {/* Date */}
        <p className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          {certificate.date}
        </p>

        {/* Skills Preview */}
        <div className="flex flex-wrap gap-2">
          {certificate.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>

        {/* Bottom decoration */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${certificate.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>
    </motion.div>
  )
}

/* ============================================
   Certificate Modal Component
============================================ */
function CertificateModal({ 
  certificate, 
  onClose 
}: { 
  certificate: typeof certificates[0] | null
  onClose: () => void 
}) {
  if (!certificate) return null

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
        initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg glass-strong rounded-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-secondary transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with gradient */}
        <div className={`relative h-24 bg-gradient-to-br ${certificate.color}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          
          {/* Certificate Icon */}
          <div className="absolute -bottom-8 left-6">
            <div className="w-20 h-20 rounded-2xl bg-card shadow-xl flex items-center justify-center border border-border">
              <Award className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-12 space-y-6">
          {/* Title & Issuer */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{certificate.title}</h3>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                {certificate.issuer}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {certificate.date}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {certificate.description}
          </p>

          {/* Skills */}
          <div>
            <h4 className="font-semibold mb-3">Skills Covered</h4>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 text-sm rounded-lg bg-gradient-to-r ${certificate.color} bg-opacity-10`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Credential ID */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Credential ID</p>
              <p className="font-mono text-sm">{certificate.credentialId}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${certificate.color} text-white text-sm font-medium flex items-center gap-2`}
            >
              <ExternalLink className="w-4 h-4" />
              Verify
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================
   Certificates Section Component
============================================ */
export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="certificates" ref={sectionRef} className="relative py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
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
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Certifications &
            <span className="text-primary"> Credentials</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Professional certifications validating my expertise across various technologies.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              index={index}
              onClick={() => setSelectedCert(cert)}
            />
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            certificate={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
