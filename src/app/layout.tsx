import type { Metadata } from 'next'
import './globals.css'
import LoadingScreen from '@/components/layout/LoadingScreen'
import ScrollProgressIndicator from '@/components/layout/ScrollProgressIndicator'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animations/PageTransition'

export const metadata: Metadata = {
  title: 'SMEC Media | Graphic Design & Film Editing Institute',
  description:
    'Master Graphic Design, Film Editing & AI-powered Post Production. Industry-level training for the next generation of creative professionals.',
  keywords: [
    'graphic design',
    'film editing',
    'post production',
    'AI design',
    'video editing course',
    'film school',
  ],
  openGraph: {
    title: 'SMEC Media | Graphic Design & Film Editing Institute',
    description:
      'Master Graphic Design, Film Editing & AI-powered Post Production.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Cinzel (display) and Inter (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <LoadingScreen />
        <ScrollProgressIndicator />
        <Navbar />
        <div className="pt-16">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
        <Footer />
      </body>
    </html>
  )
}
