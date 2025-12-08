'use client'

import { Check, Sparkles, Zap, Crown, Star } from 'lucide-react'
import { useState } from 'react'

const PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    price: 49,
    desc: '4 horas/mes',
    features: ['Limpieza general', 'Productos incluidos', 'Garantía 24h', 'Mismo profesional'],
    gradient: 'from-blue-500 to-cyan-500',
    icon: Zap,
  },
  {
    id: 'standard',
    name: 'Estándar',
    price: 89,
    desc: '8 horas/mes',
    features: ['Limpieza profunda', 'Productos premium', 'Cocina a fondo', 'Horarios flexibles', 'Prioridad'],
    gradient: 'from-purple-500 to-pink-500',
    icon: Star,
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 129,
    desc: '12 horas/mes',
    features: ['Limpieza completa', 'Productos ecológicos', 'Todo incluido', 'Máxima prioridad', 'Inspección mensual', 'Ventanas'],
    gradient: 'from-emerald-500 to-teal-500',
    icon: Crown,
  }
]

interface PlanSelectionProps {
  selectedPlan?: string
  onSelectPlan?: (planId: string) => void
  onNext?: () => void
}

export default function PlanSelection({ selectedPlan, onSelectPlan, onNext }: PlanSelectionProps) {
  const [localSelectedPlan, setLocalSelectedPlan] = useState(selectedPlan || '');

  const handleSelectPlan = (planId: string) => {
    setLocalSelectedPlan(planId);
    if (onSelectPlan) onSelectPlan(planId);
  };

  return (
    <div className="w-full mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-16 animate-slide-down">
        <h2 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Elige tu plan
          </span>
        </h2>
        <p className="text-gray-300 text-lg">
          Profesional verificado • Seguro incluido • Sin contratos
        </p>
      </div>

      {/* Planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in">
        {PLANS.map((plan) => {
          const isSelected = localSelectedPlan === plan.id;
          const Icon = plan.icon;

          return (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan.id)}
              className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 group border-2 ${
                isSelected
                  ? `bg-gradient-to-br ${plan.gradient} shadow-2xl scale-105 animate-slide-up border-white`
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 hover:scale-105 animate-slide-up'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-fade-in">
                  ⭐ Popular
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <Icon className={`w-10 h-10 ${isSelected ? 'text-white drop-shadow-lg' : 'text-gray-400'}`} />
              </div>

              {/* Nombre y precio */}
              <h3 className={`text-xl font-bold text-center mb-2 ${isSelected ? 'text-white' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className={`text-3xl font-black text-center mb-2 ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                {plan.price}€
              </p>
              <p className={`text-sm text-center mb-4 ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
                {plan.desc}
              </p>

              {/* Features */}
              <ul className={`space-y-2 mb-6 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className={`w-full py-2 rounded-lg font-bold transition-all duration-200 shadow-md ${
                isSelected
                  ? 'bg-white text-slate-900 scale-105'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}>
                {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Botones */}
      <div className="flex gap-3 mt-8 pt-8 border-t border-slate-700">
        <button
          onClick={onNext}
          disabled={!localSelectedPlan}
          className={`flex-1 px-6 py-4 rounded-lg font-bold transition-all duration-200 shadow-md text-lg ${
            localSelectedPlan
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-2xl hover:scale-105'
              : 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
          }`}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}