'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/portfolio/SectionHeader'

const skills = [
  { name: 'React', color: '#61DAFB', orbit: 1 as const, level: 92 },
  { name: 'Python', color: '#3776AB', orbit: 1 as const, level: 90 },
  { name: 'Machine Learning', color: '#FF6F61', orbit: 2 as const, level: 85 },
  { name: 'ASP.NET', color: '#512BD4', orbit: 2 as const, level: 82 },
  { name: 'SQL', color: '#F29111', orbit: 1 as const, level: 88 },
  { name: 'Power BI', color: '#F2C811', orbit: 2 as const, level: 80 },
  { name: 'Tailwind CSS', color: '#06B6D4', orbit: 1 as const, level: 94 },
  { name: 'JavaScript', color: '#F7DF1E', orbit: 2 as const, level: 91 },
  { name: 'Node.js', color: '#339933', orbit: 1 as const, level: 87 },
]

function SkillBadge({
  skill,
  className,
}: {
  skill: (typeof skills)[0]
  className?: string
}) {
  const initials = skill.name.split(' ').map((w) => w.charAt(0)).join('')

  return (
    <div
      className={cn(
        'group relative flex size-14 cursor-pointer items-center justify-center rounded-full shadow-lg transition-shadow duration-300 sm:size-16',
        'hover:shadow-2xl',
        className
      )}
      style={{
        backgroundColor: `${skill.color}20`,
        border: `2px solid ${skill.color}`,
        boxShadow: `0 0 20px ${skill.color}40`,
      }}
    >
      <span className="text-center text-xs font-bold leading-tight sm:text-sm" style={{ color: skill.color }}>
        {initials}
      </span>
      <div className="pointer-events-none absolute -bottom-10 left-1/2 z-10 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <div
          className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium"
          style={{ backgroundColor: skill.color, color: '#0a0a0a' }}
        >
          {skill.name}
        </div>
      </div>
    </div>
  )
}

function SkillsOrbit() {
  const orbit1 = skills.filter((s) => s.orbit === 1)
  const orbit2 = skills.filter((s) => s.orbit === 2)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent glow-primary sm:size-28">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-foreground sm:text-3xl">9+</div>
            <div className="text-xs text-primary-foreground/80">Skills</div>
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 skills-pulse-ring"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 skills-pulse-ring skills-pulse-ring--delay"
        aria-hidden
      />

      <div className="skills-orbit-ring absolute inset-0">
        {orbit1.map((skill, index) => {
          const total = orbit1.length
          const angle = (index / total) * 360
          return (
            <div
              key={skill.name}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{ transform: `rotate(${angle}deg) translateX(min(28vw, 7.5rem))` }}
            >
              <div className="skills-orbit-counter">
                <SkillBadge skill={skill} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="skills-orbit-ring skills-orbit-ring--slow absolute inset-0">
        {orbit2.map((skill, index) => {
          const total = orbit2.length
          const angle = (index / total) * 360
          return (
            <div
              key={skill.name}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{ transform: `rotate(${angle}deg) translateX(min(42vw, 9.5rem))` }}
            >
              <div className="skills-orbit-counter skills-orbit-counter--slow">
                <SkillBadge skill={skill} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SkillBar({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="group"
    >
      <div className="flex items-center gap-4 rounded-xl p-4 transition-colors glass hover:bg-secondary/30">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${skill.color}20`, border: `1px solid ${skill.color}40` }}
        >
          <span className="font-bold" style={{ color: skill.color }}>
            {skill.name.split(' ').map((w) => w.charAt(0)).join('')}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-medium">{skill.name}</h4>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 + 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technical Arsenal"
          title={
            <>
              Skills That Power
              <span className="text-primary"> Innovation</span>
            </>
          }
          description="A diverse toolkit spanning web development, data science, and machine learning technologies."
          motionProps={{
            initial: { opacity: 0, y: 20 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5 },
          }}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block"
          >
            <SkillsOrbit />
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="mb-4 text-xl font-semibold md:hidden">My Skills</h3>
            {skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
