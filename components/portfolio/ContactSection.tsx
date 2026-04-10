'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Loader2, CheckCircle } from 'lucide-react'
import { sendContactEmail, isEmailJsConfigured } from '@/lib/emailjs'

interface FormState {
  name: string
  email: string
  message: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (!isEmailJsConfigured()) {
        await new Promise((r) => setTimeout(r, 600))
        throw new Error(
          'Email service is not configured. Add NEXT_PUBLIC_EMAILJS_* variables (see .env.example) and redeploy.'
        )
      }
      await sendContactEmail(formData)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'theja.khruomo@email.com', href: 'mailto:theja.khruomo@email.com' },
    { icon: Phone, label: 'Phone', value: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' },
    { icon: MapPin, label: 'Location', value: 'India', href: '#' },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/thejakhruomo' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/thejakhruomo' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/thejakhruomo' },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 space-y-4 text-center"
        >
          <span className="inline-block rounded-full glass px-4 py-1.5 text-sm font-medium text-primary">
            Get In Touch
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {"Let's Work"}
            <span className="text-primary"> Together</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have a project in mind? {"I'd"} love to hear about it. Send me a message and {"let's"} create something
            amazing.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6 rounded-2xl glass p-8">
              <h3 className="text-2xl font-semibold">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-4 rounded-xl bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <item.icon className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <p className="mb-4 text-sm text-muted-foreground">Follow me on social media</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex size-12 items-center justify-center rounded-lg glass transition-all hover:border-primary/30 hover:bg-primary/10"
                    >
                      <social.icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl glass bg-gradient-to-r from-primary/10 to-accent/10 p-6"
            >
              <h4 className="mb-2 font-semibold">Looking to hire?</h4>
              <p className="mb-4 text-sm text-muted-foreground">
                {"I'm"} currently open to full-time opportunities and freelance projects.
              </p>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow-primary"
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl glass p-8">
              <h3 className="text-2xl font-semibold">Send a Message</h3>

              {!isEmailJsConfigured() && (
                <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                  Add EmailJS keys in <code className="font-mono text-primary">.env.local</code> to enable live email
                  delivery. See <code className="font-mono text-primary">.env.example</code>.
                </p>
              )}

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-green-400"
                >
                  <CheckCircle className="size-5 shrink-0" />
                  <span>Message sent successfully! {"I'll"} get back to you soon.</span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-medium text-primary-foreground transition-all glow-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
