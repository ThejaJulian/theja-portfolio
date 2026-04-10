import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SmoothScrollProvider from '@/components/portfolio/SmoothScrollProvider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Theja Khruomo | Full Stack Developer & AI/ML Engineer',
  description: 'Premium portfolio of Theja Khruomo - Full Stack Developer, Data Science, and AI/ML Engineer. Explore innovative projects in web development, machine learning, and data analytics.',
  keywords: ['Full Stack Developer', 'AI/ML Engineer', 'Data Science', 'React', 'Python', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Theja Khruomo' }],
  creator: 'Theja Khruomo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Theja Khruomo | Full Stack Developer & AI/ML Engineer',
    description: 'Premium portfolio showcasing innovative projects in web development, machine learning, and data analytics.',
    siteName: 'Theja Khruomo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theja Khruomo | Full Stack Developer & AI/ML Engineer',
    description: 'Premium portfolio showcasing innovative projects in web development, machine learning, and data analytics.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
