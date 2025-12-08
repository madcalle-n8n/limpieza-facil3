// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Limpieza Fácil - Reserva tu limpieza profesional',
  description: 'Limpieza profesional en 5 minutos. Sin contratos, sin sorpresas.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white">
        {children}
      </body>
    </html>
  )
}