'use client'

import { Sparkles, CheckCircle, Zap, Shield, Users, Award, ArrowRight, Star, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Añadido w-full al contenedor principal para asegurar centrado */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-4 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-full backdrop-blur-xl text-xs sm:text-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
            <span className="font-semibold text-orange-300">Limpieza Profesional 2025</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
              Tu Hogar
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Impecable
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl leading-relaxed px-2">
            Reserva limpieza profesional en <span className="font-bold text-orange-400">5 minutos</span>. Sin contratos, sin sorpresas.
          </p>

          {/* CTA Badges */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 flex-wrap">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-300 font-semibold text-xs sm:text-sm backdrop-blur">
              ✓ Rápido
            </div>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-300 font-semibold text-xs sm:text-sm backdrop-blur">
              ✓ Seguro
            </div>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 font-semibold text-xs sm:text-sm backdrop-blur">
              ✓ Fácil
            </div>
          </div>

          {/* CTA Buttons - Corregidos enlaces */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto px-2">
            <Link href="/reservar" className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold text-sm sm:text-lg hover:shadow-2xl transform hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2">
              Reservar Ahora
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/#planes" className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-400/50 text-purple-300 rounded-xl font-bold text-sm sm:text-lg hover:bg-purple-400/10 transition-all backdrop-blur flex items-center justify-center">
              Ver Planes
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full max-w-xl">
            <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 backdrop-blur hover:scale-110 transition-transform">
              <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                2000+
              </div>
              <p className="text-xs text-gray-400 mt-1">Clientes</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur hover:scale-110 transition-transform">
              <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center justify-center gap-1">
                4.9 <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-blue-400" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Rating</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur hover:scale-110 transition-transform">
              <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                15min
              </div>
              <p className="text-xs text-gray-400 mt-1">Respuesta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              ¿Por qué elegirnos?
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Somos la opción más moderna, confiable y accesible del mercado
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: CheckCircle, title: 'Verificados', desc: 'Profesionales verificados y asegurados', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', iconColor: 'text-green-400' },
              { icon: Zap, title: 'Rápido', desc: 'Reserva en menos de 5 minutos', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', iconColor: 'text-blue-400' },
              { icon: Shield, title: 'Seguro', desc: 'Seguro de responsabilidad civil incluido', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', iconColor: 'text-purple-400' },
              { icon: Users, title: 'Mismo Profesional', desc: 'El mismo limpiador en cada visita', color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', iconColor: 'text-orange-400' },
              { icon: Award, title: 'Garantía 24h', desc: 'Repetimos gratis si no quedas satisfecho', color: 'from-indigo-500/20 to-blue-500/20', border: 'border-indigo-500/30', iconColor: 'text-indigo-400' },
              { icon: Smartphone, title: 'Fácil de Usar', desc: 'Interfaz intuitiva para todos', color: 'from-teal-500/20 to-cyan-500/20', border: 'border-teal-500/30', iconColor: 'text-teal-400' }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} backdrop-blur-xl hover:bg-white/10 transition-all transform hover:scale-105 hover:border-white/50 cursor-pointer`}
                >
                  <Icon className={`w-10 h-10 ${feature.iconColor} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planes" className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Elige tu Plan
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Todos incluyen profesional verificado y garantía de satisfacción
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Básico', price: '49€', desc: '4 horas/mes', features: ['Limpieza general', 'Productos incluidos', 'Garantía 24h', 'Mismo profesional'], color: 'from-blue-500 to-cyan-500' },
              { name: 'Estándar', price: '89€', desc: '8 horas/mes', features: ['Limpieza profunda', 'Productos premium', 'Cocina a fondo', 'Horarios flexibles', 'Prioridad'], popular: true, color: 'from-purple-500 to-pink-500' },
              { name: 'Premium', price: '129€', desc: '12 horas/mes', features: ['Limpieza completa', 'Productos ecológicos', 'Todo incluido', 'Máxima prioridad', 'Inspección mensual', 'Ventanas'], color: 'from-emerald-500 to-teal-500' }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative group p-6 sm:p-8 rounded-3xl border-2 backdrop-blur transition-all transform hover:scale-105 ${
                  plan.popular 
                    ? `bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-purple-500/50` 
                    : 'bg-gradient-to-br from-slate-800/50 to-slate-800/50 border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`bg-gradient-to-r ${plan.color} text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1`}>
                      ⭐ MÁS POPULAR
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-1`}>
                  {plan.price}
                </p>
                <p className="text-sm sm:text-base text-gray-400 mb-6">{plan.desc}</p>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/reservar" className={`block w-full py-2 sm:py-3 rounded-lg font-bold transition-all text-center text-sm sm:text-base ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg'
                }`}>
                  Seleccionar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-800/50 border border-purple-500/20 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-8 sm:mb-12">
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  ¿Preguntas? Estamos Aquí
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { icon: '📞', title: 'Teléfono', value: '+34 600 123 456', desc: '24/7' },
                  { icon: '💬', title: 'Telegram', value: '@LimpiezaFacilBot', desc: '5 min respuesta' },
                  { icon: '📧', title: 'Email', value: 'info@limpiezafacil.es', desc: '2h respuesta' }
                ].map((contact, idx) => (
                  <div key={idx} className="text-center group hover:scale-110 transition-transform">
                    <div className="text-4xl sm:text-5xl mb-4">{contact.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{contact.title}</h3>
                    <p className="text-lg sm:text-2xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent break-words px-1">
                      {contact.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">{contact.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}