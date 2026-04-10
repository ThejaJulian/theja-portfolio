'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Code, Brain, BarChart3, GraduationCap } from 'lucide-react'

/* ============================================
   Timeline Data
============================================ */
const timelineItems = [
  {
    id: 1,
    title: 'Data Science Intern',
    organization: 'KAPsLOCK Softwares',
    date: '2024 - Present',
    description: 'Working on real-world data science projects including data analysis, predictive modeling, and building business intelligence dashboards.',
    icon: Briefcase,
    color: 'from-cyan-500 to-blue-600',
    type: 'experience',
  },
  {
    id: 2,
    title: 'Hostel Management System',
    organization: 'Academic Project',
    date: '2024',
    description: 'Developed a comprehensive hostel administration platform with fee tracking, room allocation, and admin dashboards using ASP.NET.',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    type: 'project',
  },
  {
    id: 3,
    title: 'ASL Hand Sign Recognition',
    organization: 'ML Research Project',
    date: '2024',
    description: 'Built a real-time American Sign Language recognition system using TensorFlow and OpenCV with 95%+ accuracy.',
    icon: Brain,
    color: 'from-orange-500 to-red-500',
    type: 'project',
  },
  {
    id: 4,
    title: 'Customer Behaviour Analytics',
    organization: 'Data Science Project',
    date: '2023',
    description: 'Created an analytics platform for customer behavior analysis with trend detection, ML insights, and Power BI visualizations.',
    icon: BarChart3,
    color: 'from-green-500 to-teal-500',
    type: 'project',
  },
  {
    id: 5,
    title: 'Student Performance Prediction',
    organization: 'ML Deployment Project',
    date: '2023',
    description: 'Developed and deployed a machine learning model to predict student academic performance and identify at-risk students.',
    icon: GraduationCap,
    color: 'from-yellow-500 to-orange-500',
    type: 'project',
  },
]

/* ============================================
   Timeline Item Component
============================================ */
function TimelineItem({ 
  item, 
  index,
  isLast,
}: { 
  item: typeof timelineItems[0]
  index: number
  isLast: boolean
}) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`flex-1 glass p-6 rounded-2xl group hover:glow-border transition-all ${
          isEven ? 'lg:text-right' : 'lg:text-left'
        }`}
      >
        {/* Type Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
          item.type === 'experience' 
            ? 'bg-primary/10 text-primary' 
            : 'bg-accent/10 text-accent'
        }`}>
          {item.type === 'experience' ? 'Experience' : 'Project'}
        </span>

        {/* Date */}
        <p className="text-sm text-muted-foreground mb-2">{item.date}</p>

        {/* Title & Organization */}
        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-primary/80 font-medium mb-3">{item.organization}</p>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>
      </motion.div>

      {/* Center Timeline Node */}
      <div className="relative hidden lg:flex flex-col items-center">
        {/* Connector Line Above */}
        {index !== 0 && (
          <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-border" />
        )}

        {/* Node Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className={`relative z-10 w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
          style={{ boxShadow: `0 0 30px ${item.color.includes('cyan') ? '#06b6d4' : item.color.includes('purple') ? '#a855f7' : item.color.includes('orange') ? '#f97316' : item.color.includes('green') ? '#22c55e' : '#eab308'}40` }}
        >
          <item.icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Connector Line Below */}
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[80px] bg-gradient-to-b from-border to-transparent" />
        )}
      </div>

      {/* Mobile Timeline Node */}
      <div className="absolute left-0 top-6 lg:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
        >
          <item.icon className="w-5 h-5 text-white" />
        </motion.div>
        {!isLast && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-border to-transparent" />
        )}
      </div>

      {/* Spacer for desktop layout */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  )
}

/* ============================================
   Timeline Section Component
============================================ */
export default function TimelineSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" ref={sectionRef} className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium">
            My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Experience &
            <span className="text-primary"> Milestones</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            A timeline of my professional journey and key project achievements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Progress Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-0 pl-16 lg:pl-0">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === timelineItems.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
