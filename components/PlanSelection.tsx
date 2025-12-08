'use client'

import { Check, Sparkles, Zap, Crown, Star } from 'lucide-react'
import { useState } from 'react'

const PLANS = [
  {
    id: 'basic',
    name: 'Plan Básico',
    tagline: 'Perfecto para mantenimiento semanal',
    description: '4 horas al mes (1 hora por semana)',
    price: 49,
    period: 'mes',
    features: [
      'Limpieza general de zonas comunes',
      'Productos de limpieza básicos incluidos',
      'Garantía de satisfacción de 24 horas',
      'Mismo profesional asignado'
    ],
    popular: false,
    hoursPerMonth: 4,
    gradient: 'from-blue-500 to-cyan-500',
    icon: Zap
  },
  {
    id: 'standard',
    name: 'Plan Estándar',
    tagline: 'Ideal para hogares con necesidades regulares',
    description: '8 horas al mes (2 horas por semana)',
    price: 89,
    period: 'mes',
    features: [
      'Limpieza profunda incluida',
      'Productos premium ecológicos',
      'Limpieza de cocina a fondo',
      'Planificación flexible de horarios',
      'Prioridad en reprogramaciones'
    ],
    popular: true,
    hoursPerMonth: 8,
    gradient: 'from-purple-500 to-pink-500',
    icon: Star
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    tagline: 'Máxima limpieza y comodidad',
    description: '12 horas al mes (3 horas por semana)',
    price: 129,
    period: 'mes',
    features: [
      'Limpieza completa de toda la casa',
      'Productos ecológicos premium',
      'Todos los espacios incluidos',
      'Máxima prioridad en reservas',
      'Inspección mensual gratuita',
      'Limpieza de ventanas (mensual)'
    ],
    popular: false,
    hoursPerMonth: 12,
    gradient: 'from-emerald-500 to-teal-500',
    icon: Crown
  }
]

interface PlanSelectionProps {
  selectedPlan?: string
  onSelectPlan?: (planId: string) => void
  onNext?: () => void
}

export default function PlanSelection({ selectedPlan, onSelectPlan, onNext }: PlanSelectionProps) {
  const [localSelectedPlan, setLocalSelectedPlan] = useState(selectedPlan || '')
  const [annualBilling, setAnnualBilling] = useState(false)

  const handleSelectPlan = (planId: string) => {
    setLocalSelectedPlan(planId)
    if (onSelectPlan) onSelectPlan(planId)
  }

  const calculateAnnualPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.85)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Elige tu Plan Perfecto
          </span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Profesionales verificados • Seguro incluido • <span className="font-bold text-cyan-400">Sin contratos</span>
        </p>
      </div>

      {/* Selector Mensual/Anual */}
      <div className="flex justify-center items-center mb-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex items-center gap-3 border-2 border-white/20 shadow-xl">
          <span className={`text-base font-bold px-4 transition-colors ${!annualBilling ? 'text-cyan-300' : 'text-gray-400'}`}>
            Mensual
          </span>
          
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-300 ${
              annualBilling ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
            }`}
          >
            <span className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              annualBilling ? 'translate-x-11' : 'translate-x-1'
            }`}>
              {annualBilling && <Sparkles className="w-5 h-5 m-1.5 text-purple-600" />}
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold px-4 transition-colors ${annualBilling ? 'text-purple-300' : 'text-gray-400'}`}>
              Anual
            </span>
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
              -15% 🎉
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {PLANS.map((plan, index) => {
          const displayPrice = annualBilling ? calculateAnnualPrice(plan.price) : plan.price
          const displayPeriod = annualBilling ? 'año' : plan.period
          const isSelected = localSelectedPlan === plan.id
          const Icon = plan.icon

          return (
            <div
              key={plan.id}
              className="relative group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {/* Glow effect */}
              {isSelected && (
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} blur-2xl opacity-40 animate-pulse`}></div>
              )}
              
              {/* Card */}
              <div className={`relative cursor-pointer rounded-3xl transition-all duration-300 transform hover:scale-105 ${
                isSelected 
                  ? 'bg-white/20 border-2 shadow-2xl scale-105' 
                  : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
              } ${isSelected ? `border-${plan.gradient.split(' ')[1].replace('to-', '')}` : ''} backdrop-blur-xl`}>
                
                {/* Badge Popular */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`bg-gradient-to-r ${plan.gradient} text-white px-5 py-1.5 rounded-full text-xs font-black flex items-center shadow-xl animate-bounce`}>
                      <Star className="w-4 h-4 mr-1 fill-white" />
                      MÁS POPULAR
                    </div>
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? 'pt-10' : ''}`}>
                  {/* Icono */}
                  <div className="flex justify-center mb-6">
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${plan.gradient} bg-opacity-20 flex items-center justify-center transform transition-transform ${
                      isSelected ? 'scale-110 rotate-12' : ''
                    }`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Nombre y tagline */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.tagline}</p>
                  </div>
                  
                  {/* Precio */}
                  <div className="text-center mb-6">
                    <div className={`text-5xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent mb-1 transition-transform ${
                      isSelected ? 'scale-110' : ''
                    }`}>
                      {displayPrice}€
                    </div>
                    <div className="text-gray-400">/{displayPeriod}</div>
                    <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <div className={`bg-gradient-to-br ${plan.gradient} p-1 rounded-lg mr-3 flex-shrink-0 transition-transform group-hover/item:scale-110`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 rounded-2xl mb-6 border border-white/10">
                    <div className="text-center">
                      <div className="text-gray-400 text-xs mb-1">Horas/mes</div>
                      <div className="text-2xl font-black text-white">{plan.hoursPerMonth}h</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-xs mb-1">Por hora</div>
                      <div className="text-2xl font-black text-white">
                        {Math.round(plan.price / plan.hoursPerMonth)}€
                      </div>
                    </div>
                  </div>

                  {/* Botón */}
                  <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                    isSelected
                      ? `bg-gradient-to-r ${plan.gradient} text-white shadow-xl`
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}>
                    {isSelected ? (
                      <span className="flex items-center justify-center">
                        <Check className="w-5 h-5 mr-2" />
                        Seleccionado
                      </span>
                    ) : (
                      'Seleccionar'
                    )}
                  </button>

                  {/* Ahorro */}
                  {annualBilling && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Ahorras {(plan.price * 12) - displayPrice}€
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info adicional */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 rounded-3xl p-6 mb-8 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl flex-shrink-0 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">
              ¿Necesitas algo personalizado?
            </h4>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-cyan-300">Servicios puntuales</strong> sin suscripción: 
              <span className="inline-block mx-2 px-3 py-1 bg-white/10 rounded-lg font-bold text-white border border-white/20">3h • 45€</span>
              <span className="inline-block mx-2 px-3 py-1 bg-white/10 rounded-lg font-bold text-white border border-white/20">4h • 60€</span>
              <span className="inline-block mx-2 px-3 py-1 bg-white/10 rounded-lg font-bold text-white border border-white/20">5h • 75€</span>
            </p>
          </div>
        </div>
      </div>

      {/* Botón Siguiente */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!localSelectedPlan}
          className={`group px-10 py-4 rounded-2xl font-bold text-lg transition-all transform shadow-xl ${
            localSelectedPlan
              ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white hover:shadow-2xl hover:scale-110 animate-gradient'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          {localSelectedPlan ? (
            <span className="flex items-center">
              Siguiente: Elegir Fecha
              <svg className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          ) : (
            'Selecciona un plan'
          )}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}} />
    </div>
  )
}