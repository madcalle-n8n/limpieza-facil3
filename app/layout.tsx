// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AccessibilityBar from '@/components/AccessibilityBar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Limpieza Fácil | Limpieza Profesional Online 2025',
  description: 'Reserva limpieza profesional en 5 minutos. Sin contratos, sin sorpresas. Profesionales verificados. Garantía 24h.',
  keywords: 'limpieza, servicio doméstico, reserva online, Madrid',
  openGraph: {
    title: 'Limpieza Fácil',
    description: 'Limpieza profesional en línea',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        <AccessibilityBar />
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}