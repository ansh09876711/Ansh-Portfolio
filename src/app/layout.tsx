import type { Metadata } from 'next'
import './globals.css'
import SecurityGuard from './components/SecurityGuard'

export const metadata: Metadata = {
  title: 'Ansh Agarwal — AI/ML Engineer & CSE Student',
  description: 'Portfolio of Ansh Agarwal, aspiring AI/ML engineer and computer science student focused on machine learning, deep learning, and intelligent systems.',
  authors: [{ name: 'Ansh Agarwal' }],
  creator: 'Ansh Agarwal',
  publisher: 'Ansh Agarwal',
  keywords: ['Ansh Agarwal', 'AI Engineer', 'ML Engineer', 'Computer Science', 'Portfolio', 'Web Developer', 'DevOps', 'Cloud Computing'],
  openGraph: {
    title: 'Ansh Agarwal — AI/ML Engineer & CSE Student',
    description: 'Portfolio of Ansh Agarwal, aspiring AI/ML engineer and computer science student',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  other: {
    'copyright': '© 2026 Ansh Agarwal. All Rights Reserved.',
    'dcterms.rightsHolder': 'Ansh Agarwal',
    'dcterms.rights': 'Unauthorized copying, replication, or usage of this portfolio content/source code is strictly prohibited.',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:wght@300;400;600&family=Space+Mono:wght@400;700&family=Kanit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SecurityGuard />
        {children}
      </body>
    </html>
  )
}
