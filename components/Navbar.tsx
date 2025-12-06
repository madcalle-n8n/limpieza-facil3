// components/Navbar.tsx
'use client'

import { Phone, Menu, X, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Limpieza Fácil
              </div>
              <div className="text-xs text-gray-400">Profesional & Moderno</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Inicio
            </Link>
            <Link href="#features" className="text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Características
            </Link>
            <Link href="#planes" className="text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Planes
            </Link>
            <a href="tel:+34600123456" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105">
              <Phone className="w-4 h-4" />
              Llamar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
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
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-3 animate-in">
            <Link href="/" className="block text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Inicio
            </Link>
            <Link href="#features" className="block text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Características
            </Link>
            <Link href="#planes" className="block text-gray-300 hover:text-orange-400 font-semibold transition-colors">
              Planes
            </Link>
            <a href="tel:+34600123456" className="block w-full text-center bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all">
              Llamar Ahora
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}