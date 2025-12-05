// app/page.tsx
import BookingWidget from '@/components/BookingWidget'
import { Sparkles, CheckCircle, Zap, Shield, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center mb-20">
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 blur-2xl opacity-60"></div>
              <div className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full">
                <span className="text-white font-bold flex items-center gap-2 justify-center">
                  <Sparkles className="w-5 h-5" />
                  Tu hogar impecable en minutos
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Limpieza Fácil
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Reserva tu servicio de limpieza profesional en <span className="font-bold text-orange-400">5 minutos</span>.
            Sin contratos, sin sorpresas. Solo calidad y confianza.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all shadow-xl">
              Reservar Ahora
            </button>
            <button className="px-8 py-4 border-2 border-purple-400 text-purple-300 rounded-xl font-bold text-lg hover:bg-purple-400/10 transition-all">
              Ver Planes
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/50 backdrop-blur">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">2000+</div>
              <p className="text-gray-300 text-sm mt-1">Clientes Felices</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/50 backdrop-blur">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">4.9★</div>
              <p className="text-gray-300 text-sm mt-1">Calificación</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/50 backdrop-blur">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">15min</div>
              <p className="text-gray-300 text-sm mt-1">Respuesta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          <span className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
            ¿Por qué confiar en nosotros?
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-8 border border-green-500/50 backdrop-blur hover:border-green-400/80 transition-all transform hover:scale-105">
              <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Profesionales Verificados</h3>
              <p className="text-gray-300">Todos nuestros profesionales están verificados y asegurados</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-blue-500/50 backdrop-blur hover:border-blue-400/80 transition-all transform hover:scale-105">
              <Zap className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Súper Rápido</h3>
              <p className="text-gray-300">Reserva en menos de 5 minutos</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/50 backdrop-blur hover:border-purple-400/80 transition-all transform hover:scale-105">
              <Shield className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">100% Seguro</h3>
              <p className="text-gray-300">Seguro de responsabilidad civil incluido</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl p-8 border border-red-500/50 backdrop-blur hover:border-red-400/80 transition-all transform hover:scale-105">
              <Users className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Mismo Profesional</h3>
              <p className="text-gray-300">El mismo limpiador en cada visita</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-2xl p-8 border border-indigo-500/50 backdrop-blur hover:border-indigo-400/80 transition-all transform hover:scale-105">
              <Award className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Garantía 24h</h3>
              <p className="text-gray-300">Repetimos gratis si no quedas satisfecho</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-teal-600/20 to-cyan-600/20 rounded-2xl p-8 border border-teal-500/50 backdrop-blur hover:border-teal-400/80 transition-all transform hover:scale-105">
              <Sparkles className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Flexibilidad Total</h3>
              <p className="text-gray-300">Cancela sin costo hasta 24h antes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Widget */}
      <BookingWidget />

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 mt-20">
        <div className="bg-gradient-to-r from-slate-800 to-slate-800 rounded-3xl p-8 md:p-12 border border-purple-500/30 backdrop-blur">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
            <span className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
              ¿Necesitas ayuda?
            </span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="text-center flex-1">
              <div className="inline-block mb-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <span className="text-white font-bold">📞 Teléfono</span>
              </div>
              <p className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">+34 600 123 456</p>
              <p className="text-gray-300 mt-2">Disponible 24/7</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
            <div className="text-center flex-1">
              <div className="inline-block mb-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <span className="text-white font-bold">💬 Telegram</span>
              </div>
              <p className="text-xl font-bold text-white">@LimpiezaFacilBot</p>
              <p className="text-gray-300 mt-2">Respuesta en 5 minutos</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
            <div className="text-center flex-1">
              <div className="inline-block mb-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <span className="text-white font-bold">📧 Email</span>
              </div>
              <p className="text-lg font-bold text-white">info@limpiezafacil.es</p>
              <p className="text-gray-300 mt-2">Respuesta en 2 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}