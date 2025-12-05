// components/Navbar.tsx
'use client'

import { Phone, Menu, X, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 shadow-2xl sticky top-0 z-50 border-b border-purple-500/30 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Limpieza Fácil
              </div>
              <div className="text-xs text-gray-400">Profesional & Rápido</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Inicio
            </Link>
            <Link href="/servicios" className="text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Servicios
            </Link>
            <Link href="/precios" className="text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Precios
            </Link>
            <Link href="/contacto" className="text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Contacto
            </Link>
            <a href="tel:+34600123456" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105">
              <Phone className="w-5 h-5" />
              +34 600 123 456
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-orange-400" />
            ) : (
              <Menu className="w-6 h-6 text-orange-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-purple-500/30 space-y-4">
            <Link href="/" className="block text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Inicio
            </Link>
            <Link href="/servicios" className="block text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Servicios
            </Link>
            <Link href="/precios" className="block text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Precios
            </Link>
            <Link href="/contacto" className="block text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Contacto
            </Link>
            <a href="tel:+34600123456" className="block w-full text-center bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
              Llamar Ahora
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}