'use client'

import { Check, Sparkles, Zap, Crown, Star } from 'lucide-react'
import { useState } from 'react'

// Definición de los planes con colores específicos
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
    bgGradient: 'from-blue-50 to-cyan-50',
    icon: Zap,
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
    selectedBg: 'bg-blue-50',
    checkBg: 'bg-blue-100',
    checkColor: 'text-blue-600'
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
    bgGradient: 'from-purple-50 to-pink-50',
    icon: Star,
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-500',
    buttonBg: 'bg-purple-600 hover:bg-purple-700',
    selectedBg: 'bg-purple-50',
    checkBg: 'bg-purple-100',
    checkColor: 'text-purple-600'
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
    bgGradient: 'from-emerald-50 to-teal-50',
    icon: Crown,
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-500',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
    selectedBg: 'bg-emerald-50',
    checkBg: 'bg-emerald-100',
    checkColor: 'text-emerald-600'
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
    <div className="max-w-7xl mx-auto p-6">
      {/* Encabezado con animación */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30 animate-pulse"></div>
            <Sparkles className="w-16 h-16 text-purple-600 relative" />
          </div>
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
          Elige el plan perfecto para tu hogar
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Todos los planes incluyen profesional verificado, seguro de responsabilidad civil 
          y garantía de satisfacción. <span className="font-semibold text-purple-600">Sin contratos permanentes.</span>
        </p>
      </div>

      {/* Selector anual/mensual MEJORADO */}
      <div className="flex justify-center items-center mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center gap-3 border-2 border-gray-100">
          <span className={`text-lg font-semibold px-4 transition-colors ${!annualBilling ? 'text-purple-600' : 'text-gray-400'}`}>
            Mensual
          </span>
          
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-200 ${
              annualBilling ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <span className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              annualBilling ? 'translate-x-11' : 'translate-x-1'
            }`}>
              {annualBilling && <Sparkles className="w-5 h-5 m-1.5 text-purple-600" />}
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className={`text-lg font-semibold px-4 transition-colors ${annualBilling ? 'text-purple-600' : 'text-gray-400'}`}>
              Anual
            </span>
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-bounce">
              -15% 🎉
            </span>
          </div>
        </div>
      </div>

      {/* Grid de planes MEJORADO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {PLANS.map((plan, index) => {
          const displayPrice = annualBilling ? calculateAnnualPrice(plan.price) : plan.price
          const displayPeriod = annualBilling ? 'año' : plan.period
          const isSelected = localSelectedPlan === plan.id
          const Icon = plan.icon

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                isSelected ? 'scale-105' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {/* Efecto de brillo en hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} opacity-0 blur-xl transition-opacity duration-500 ${
                isSelected ? 'opacity-30' : 'group-hover:opacity-20'
              }`}></div>
              
              {/* Tarjeta principal */}
              <div className={`relative bg-white rounded-3xl border-4 p-8 transition-all duration-300 hover:shadow-2xl ${
                isSelected
                  ? `${plan.borderColor} shadow-2xl`
                  : 'border-gray-200 shadow-lg'
              }`}>
                
                {/* Badge para plan popular */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`bg-gradient-to-r ${plan.gradient} text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg animate-bounce`}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      MÁS POPULAR
                    </div>
                  </div>
                )}

                {/* Icono del plan */}
                <div className={`flex justify-center mb-6 ${plan.popular ? 'mt-4' : ''}`}>
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${plan.bgGradient} flex items-center justify-center transform transition-transform duration-300 ${
                    isSelected ? 'scale-110 rotate-12' : ''
                  }`}>
                    <Icon className={`w-10 h-10 ${plan.iconColor}`} />
                  </div>
                </div>

                {/* Encabezado del plan */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.tagline}</p>
                  
                  {/* Precio con animación */}
                  <div className="relative">
                    <div className={`text-6xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent transition-all duration-300 ${
                      isSelected ? 'scale-110' : ''
                    }`}>
                      {displayPrice}€
                    </div>
                    <div className="text-lg font-medium text-gray-500 mt-1">
                      /{displayPeriod}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-3 font-medium">{plan.description}</p>
                </div>

                {/* Características con iconos mejorados */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start group">
                      <div className={`${plan.checkBg} p-1.5 rounded-lg mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                        <Check className={`w-5 h-5 ${plan.checkColor}`} />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Información adicional con mejor diseño */}
                <div className={`border-t-2 border-gray-100 pt-6 mb-6 bg-gradient-to-br ${plan.bgGradient} -mx-8 px-8 py-6 rounded-b-2xl`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Horas/mes</div>
                      <div className="text-2xl font-bold text-gray-900">{plan.hoursPerMonth}h</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Por hora</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(plan.price / plan.hoursPerMonth)}€
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de selección mejorado */}
                <button
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                    isSelected
                      ? `${plan.buttonBg} text-white shadow-xl scale-105`
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {isSelected ? (
                    <span className="flex items-center justify-center">
                      <Check className="w-6 h-6 mr-2" />
                      ✓ Seleccionado
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Seleccionar este plan
                    </span>
                  )}
                </button>

                {/* Ahorro anual */}
                {annualBilling && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-md">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Ahorras {(plan.price * 12) - displayPrice}€ al año
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Información adicional con diseño premium */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 mb-8 border-2 border-purple-100 shadow-lg">
        <div className="flex items-start">
          <div className="bg-white rounded-2xl p-4 mr-6 shadow-md">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              ¿Necesitas algo más personalizado?
            </h4>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ofrecemos <strong className="text-purple-600">servicios puntuales</strong> sin suscripción: 
              <span className="inline-block mx-2 px-3 py-1 bg-white rounded-lg shadow-sm font-semibold">3h por 45€</span>
              <span className="inline-block mx-2 px-3 py-1 bg-white rounded-lg shadow-sm font-semibold">4h por 60€</span>
              <span className="inline-block mx-2 px-3 py-1 bg-white rounded-lg shadow-sm font-semibold">5h por 75€</span>
            </p>
            <p className="text-gray-600 mt-3">
              Contáctanos después de completar la reserva para personalizar tu servicio.
            </p>
          </div>
        </div>
      </div>

      {/* Botón de siguiente con diseño impactante */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!localSelectedPlan}
          className={`group px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform ${
            localSelectedPlan
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:shadow-2xl hover:scale-110 animate-gradient'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {localSelectedPlan ? (
            <span className="flex items-center">
              Continuar: Elegir fecha
              <svg className="w-7 h-7 ml-3 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          ) : (
            'Selecciona un plan para continuar'
          )}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}} />
    </div>
  )
}