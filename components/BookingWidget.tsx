// components/BookingWidget.tsx
'use client'

import { useState } from 'react'
import { Check, Calendar, Clock, User, Sparkles, CheckCircle } from 'lucide-react'
import { sendReservationToN8N } from '@/lib/api'
import PlanSelection from './PlanSelection'
import DateSelection from './DateSelection'
import TimeSelection from './TimeSelection'
import CustomerInfo from './CustomerInfo'
import Confirmation from './Confirmation'

const STEPS = [
  { id: 1, title: 'Plan', icon: Sparkles, color: 'from-blue-500 to-cyan-500' },
  { id: 2, title: 'Fecha', icon: Calendar, color: 'from-purple-500 to-pink-500' },
  { id: 3, title: 'Hora', icon: Clock, color: 'from-orange-500 to-red-500' },
  { id: 4, title: 'Datos', icon: User, color: 'from-green-500 to-emerald-500' },
  { id: 5, title: 'Confirmar', icon: CheckCircle, color: 'from-indigo-500 to-purple-500' }
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
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
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
    const payload = {
      ...reservationData,
      date: reservationData.date ? reservationData.date.toISOString() : '',
    }

    const result = await sendReservationToN8N(payload)

    if (!result.success) {
      throw new Error(result.error || 'Error al procesar la reserva')
    }

    // Limpieza de estado tras confirmar
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

    return result
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
    <div className="w-full animate-fade-in">
      {/* Header */}
      <div className="text-center mb-16 animate-slide-down">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 drop-shadow-lg">
          <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Reserva tu Limpieza
          </span>
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-300">
          En solo <span className="font-bold text-orange-400">5 pasos</span> tendrás tu hogar impecable
        </p>
      </div>

      {/* Progress Bar Desktop */}
      <div className="hidden lg:block mb-20 bg-gradient-to-r from-slate-800/50 to-slate-800/50 rounded-2xl p-6 md:p-8 shadow-xl border border-purple-500/30 backdrop-blur animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-400 text-xs md:text-sm mb-1">PASO</p>
            <div className="text-2xl md:text-4xl font-black">
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">{currentStep}</span>
              <span className="text-gray-500 text-lg md:text-2xl">/{STEPS.length}</span>
            </div>
          </div>
          <div className="flex gap-1 md:gap-2 flex-1 ml-6">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep >= step.id
                    ? `bg-gradient-to-r ${step.color}`
                    : 'bg-gray-700'
                }`}
                style={{ width: `${(100 / STEPS.length) - 2}%` }}
              />
            ))}
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-between gap-2">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id
            const isCurrent = currentStep === step.id
            const Icon = step.icon

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    isCurrent
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110 animate-fade-in`
                      : isCompleted
                        ? `bg-gradient-to-r ${step.color} text-white`
                        : 'bg-slate-700 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 md:w-6 md:h-6" /> : <Icon className="w-5 h-5 md:w-6 md:h-6" />}
                </div>
                <span className={`text-xs font-bold text-center ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress Bar Tablet/Mobile */}
      <div className="lg:hidden mb-12 bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur border border-slate-700 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300 font-bold text-sm md:text-base">
            Paso {currentStep}/{STEPS.length}
          </span>
          <span className="text-xs md:text-sm bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold">
            {STEPS[currentStep - 1].title}
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8 lg:p-10 backdrop-blur mb-10 animate-slide-up">
        {renderStepContent()}
      </div>
    </div>
  )
}