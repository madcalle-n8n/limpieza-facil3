// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AccessibilityBar from '@/components/AccessibilityBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Limpieza Fácil - Servicio de limpieza a domicilio profesional',
  description: 'Servicio de limpieza profesional, rápido y seguro. Reserva en 5 minutos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AccessibilityBar />
        <Navbar />
        <main>
          {children}
        </main>
        <footer className="bg-slate-900 border-t border-purple-500/30 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4">Limpieza Fácil</h3>
                <p className="text-gray-400">Tu solución de limpieza profesional</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Información</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Reserva en 5 minutos</li>
                  <li>• Profesionales verificados</li>
                  <li>• Garantía 24h</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Contacto</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>📞 +34 600 123 456</li>
                  <li>💬 Telegram 24/7</li>
                  <li>📧 info@limpiezafacil.es</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-purple-500/30 pt-8 text-center text-gray-400">
              <p>© 2024 Limpieza Fácil. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}