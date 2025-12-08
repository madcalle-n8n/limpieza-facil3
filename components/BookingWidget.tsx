// components/BookingWidget.tsx
'use client'

import { useState } from 'react'
import { Check, Calendar, Clock, User, ArrowLeft, ArrowRight, Sparkles, CheckCircle, Zap, Heart, Lightbulb } from 'lucide-react'
import PlanSelection from './PlanSelection'
import DateSelection from './DateSelection'
import TimeSelection from './TimeSelection'
import CustomerInfo from './CustomerInfo'
import Confirmation from './Confirmation'

const STEPS = [
  { id: 1, title: 'Plan', icon: Sparkles, description: 'Elige tu plan', color: 'from-blue-500 to-cyan-500' },
  { id: 2, title: 'Fecha', icon: Calendar, description: 'Selecciona el día', color: 'from-purple-500 to-pink-500' },
  { id: 3, title: 'Hora', icon: Clock, description: 'Elige el horario', color: 'from-orange-500 to-red-500' },
  { id: 4, title: 'Tus datos', icon: User, description: 'Información personal', color: 'from-green-500 to-emerald-500' },
  { id: 5, title: 'Confirmar', icon: CheckCircle, description: 'Revisa y confirma', color: 'from-indigo-500 to-purple-500' }
]

export default function BookingWidget() {
  const [currentStep, setCurrentStep] = useState(1)
  const [reservationData, setReservationData] = useState({
    plan: '',
    date: null as Date | null,
    time: '',
    customer: {
      name: '',
      phone: '',
      email: '',
      address: '',
      specialInstructions: '',
      accessibilityNeeds: false
    }
  })

  const handleNext = () => {
    const canProceed = (() => {
      if (currentStep === 1) return !!reservationData.plan
      if (currentStep === 2) return !!reservationData.date
      if (currentStep === 3) return !!reservationData.time
      if (currentStep === 4) {
        const { name, phone, address } = reservationData.customer
        return !!name?.trim() && !!phone?.trim() && !!address?.trim()
      }
      return true
    })()

    if (!canProceed) return

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const updateReservationData = (key: string, value: any) => {
    setReservationData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateCustomerData = (key: string, value: any) => {
    setReservationData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [key]: value
      }
    }))
  }

  const handleSubmitReservation = async () => {
    try {
      console.log('✅ Enviando reserva:', reservationData)
      alert('¡Reserva confirmada! Te contactaremos por Telegram en los próximos minutos.')
      
      setReservationData({
        plan: '',
        date: null,
        time: '',
        customer: {
          name: '',
          phone: '',
          email: '',
          address: '',
          specialInstructions: '',
          accessibilityNeeds: false
        }
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('❌ Error en la reserva:', error)
      alert('Error al realizar la reserva. Por favor, inténtalo de nuevo.')
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PlanSelection
            selectedPlan={reservationData.plan}
            onSelectPlan={(plan: string) => updateReservationData('plan', plan)}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <DateSelection
            selectedDate={reservationData.date}
            onSelectDate={(date: Date) => updateReservationData('date', date)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <TimeSelection
            selectedTime={reservationData.time}
            selectedDate={reservationData.date}
            onSelectTime={(time: string) => updateReservationData('time', time)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <CustomerInfo
            customerData={reservationData.customer}
            onUpdate={updateCustomerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <Confirmation
            reservationData={reservationData}
            onSubmit={handleSubmitReservation}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <section className="relative w-full py-20 px-4 md:px-8">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-12 relative overflow-hidden rounded-3xl">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-orange-400 to-pink-500 p-4 rounded-3xl shadow-2xl">
                  <Sparkles className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Reserva tu Limpieza
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed">
              En solo <span className="font-bold text-orange-400">5 pasos</span> tendrás tu hogar impecable
            </p>
            
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-semibold text-sm shadow-lg">
                ✓ Rápido
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold text-sm shadow-lg">
                ✓ Seguro
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-sm shadow-lg">
                ✓ Fácil
              </div>
            </div>
          </div>

          {/* Desktop Progress Bar */}
          <div className="hidden md:block mb-20 bg-gradient-to-r from-slate-800/50 to-slate-800/50 rounded-3xl p-8 shadow-2xl border border-purple-500/30 backdrop-blur">
            <div className="flex justify-between items-center mb-12">
              <div>
                <div className="text-gray-300 text-sm mb-2">PROGRESO</div>
                <div className="text-5xl font-black">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">{currentStep}</span>
                  <span className="text-gray-400 text-3xl"> / {STEPS.length}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-2xl shadow-lg">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                <span className="font-bold text-white text-lg">En proceso...</span>
              </div>
            </div>
            
            <div className="relative mb-12">
              <div className="absolute top-10 left-0 right-0 h-4 bg-gray-700 rounded-full"></div>
              <div 
                className="absolute top-10 left-0 h-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full transition-all duration-700 shadow-2xl"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full shadow-xl animate-pulse"></div>
              </div>
              
              <div className="relative flex justify-between">
                {STEPS.map((step) => {
                  const isCompleted = currentStep > step.id
                  const isCurrent = currentStep === step.id
                  const Icon = step.icon
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center relative">
                      <div className="relative">
                        {isCurrent && (
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} blur-2xl opacity-60 animate-pulse`}></div>
                        )}
                        
                        <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 transform shadow-2xl ${
                          isCompleted 
                            ? `bg-gradient-to-br ${step.color} scale-110` 
                            : isCurrent 
                              ? `bg-gradient-to-br ${step.color} border-4 border-white scale-125` 
                              : 'bg-gray-700 border-4 border-gray-600 scale-100'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-10 h-10 text-white" strokeWidth={3} />
                          ) : (
                            <Icon className={`w-10 h-10 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center max-w-[140px]">
                        <div className={`font-bold text-base mb-2 transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent' 
                            : isCurrent 
                              ? 'bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent text-lg' 
                              : 'text-gray-400'
                        }`}>
                          {step.title}
                        </div>
                        <div className={`text-xs transition-all duration-300 ${
                          isCurrent ? 'text-gray-100 font-semibold' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="md:hidden mb-8 bg-gradient-to-r from-slate-800/50 to-slate-800/50 rounded-2xl p-6 shadow-2xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-300">
                Paso <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">{currentStep}</span>/{STEPS.length}
              </div>
              <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${STEPS[currentStep - 1].color} text-white font-bold text-sm shadow-lg`}>
                {STEPS[currentStep - 1].title}
              </div>
            </div>
            
            <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-700 shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="mt-3 text-center text-sm text-gray-300 font-semibold">
              {STEPS[currentStep - 1].description}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/50 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-2 border-purple-500/40 backdrop-blur">
            {renderStepContent()}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/50 backdrop-blur hover:shadow-xl transition-all">
              <Heart className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Confianza</h3>
              <p className="text-gray-300 text-sm">Profesionales verificados</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/50 backdrop-blur hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Rápido</h3>
              <p className="text-gray-300 text-sm">Menos de 5 minutos</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/50 backdrop-blur hover:shadow-xl transition-all">
              <Lightbulb className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Completo</h3>
              <p className="text-gray-300 text-sm">Todo en un lugar</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex justify-between gap-4 mb-8">
            <button
              onClick={handleBack}
              disabled={currentStep <= 1}
              className={`px-8 py-4 rounded-2xl flex items-center font-bold transition-all ${
                currentStep > 1 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:shadow-2xl' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Volver
            </button>
            
            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                className="ml-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-2xl flex items-center transform hover:scale-105 transition-all"
              >
                Siguiente
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmitReservation}
                className="ml-auto px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                <CheckCircle className="w-6 h-6 mr-2 inline" />
                Confirmar
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between gap-2 mb-8">
            <button
              onClick={handleBack}
              disabled={currentStep <= 1}
              className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center font-bold transition-all ${
                currentStep > 1 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmitReservation}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold"
              >
                Confirmar
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}