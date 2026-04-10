import type { ReactNode } from 'react'
import { motion, type MotionProps } from 'framer-motion'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: string
  className?: string
  motionProps?: MotionProps
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
  motionProps,
}: SectionHeaderProps) {
  return (
    <motion.div className={`mb-12 space-y-4 text-center sm:mb-16 ${className}`} {...motionProps}>
      <span className="inline-block rounded-full glass px-4 py-1.5 text-sm font-medium text-primary">
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{description}</p>
      ) : null}
    </motion.div>
  )
}
