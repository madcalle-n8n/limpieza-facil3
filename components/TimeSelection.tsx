'use client'

import { useState, useEffect } from 'react'
import { Clock, Sun, Moon, Sunset, ChevronLeft, ChevronRight, CheckCircle, Sparkles, Calendar } from 'lucide-react'

interface TimeSelectionProps {
  selectedTime?: string
  selectedDate?: Date | null
  onSelectTime?: (time: string) => void
  onNext?: () => void
  onBack?: () => void
}

export default function TimeSelection({ 
  selectedTime, 
  selectedDate, 
  onSelectTime, 
  onNext, 
  onBack 
}: TimeSelectionProps) {
  const [localSelectedTime, setLocalSelectedTime] = useState(selectedTime || '')
  const [hoveredTime, setHoveredTime] = useState<string | null>(null)

  // Horarios disponibles organizados por franjas
  const timeSlots = {
    morning: {
      label: 'Mañana',
      icon: Sun,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'from-yellow-50 to-orange-50',
      times: ['08:00', '09:00', '10:00', '11:00']
    },
    afternoon: {
      label: 'Tarde',
      icon: Sunset,
      color: 'from-orange-400 to-red-400',
      bgColor: 'from-orange-50 to-red-50',
      times: ['12:00', '13:00', '14:00', '15:00', '16:00']
    },
    evening: {
      label: 'Noche',
      icon: Moon,
      color: 'from-indigo-400 to-purple-400',
      bgColor: 'from-indigo-50 to-purple-50',
      times: ['17:00', '18:00', '19:00', '20:00']
    }
  }

  const handleTimeSelect = (time: string) => {
    setLocalSelectedTime(time)
    if (onSelectTime) onSelectTime(time)
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Sin fecha seleccionada'
    const weekdays = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    return `${weekdays[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`
  }

  // Simular disponibilidad (puedes conectar con tu API real)
  const isTimeAvailable = (time: string) => {
    // Aquí podrías hacer una llamada a tu API para verificar disponibilidad real
    return true
  }

  const getPeriodOfDay = (time: string): 'morning' | 'afternoon' | 'evening' => {
    const hour = parseInt(time.split(':')[0])
    if (hour < 12) return 'morning'
    if (hour < 17) return 'afternoon'
    return 'evening'
  }

  useEffect(() => {
    // Mantener el estado local sincronizado si el padre cambia selectedTime
    setLocalSelectedTime(selectedTime || '')
  }, [selectedTime])

  useEffect(() => {
    // Si cambia la fecha seleccionada en el padre, reseteamos la hora local
    // para evitar que quede una hora de otro día
    setLocalSelectedTime('')
    if (onSelectTime) onSelectTime('')
  }, [selectedDate, onSelectTime])

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header con animación */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-30 animate-pulse"></div>
            <Clock className="w-16 h-16 text-orange-600 relative" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Elige tu horario ideal
        </h2>
        <p className="text-xl text-gray-600">
          Selecciona la hora que mejor se adapte a tu rutina
        </p>
      </div>

      {/* Tarjeta de fecha seleccionada */}
      {selectedDate && (
        <div className="mb-8 animate-slide-down">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-1 shadow-xl">
            <div className="bg-white rounded-3xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-2xl">
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Fecha seleccionada</div>
                    <div className="text-2xl font-bold text-gray-900 capitalize">
                      {formatDate(selectedDate)}
                    </div>
                  </div>
                </div>
                {localSelectedTime && (
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl">
                      <Clock className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Hora seleccionada</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {localSelectedTime}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selector de horarios por franjas */}
      <div className="space-y-8 mb-8">
        {Object.entries(timeSlots).map(([key, period]) => {
          const Icon = period.icon
          const periodKey = key as 'morning' | 'afternoon' | 'evening'
          
          return (
            <div key={key} className="animate-slide-up">
              {/* Header de la franja horaria */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`bg-gradient-to-r ${period.color} p-3 rounded-2xl shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{period.label}</h3>
                  <p className="text-gray-600">
                    {period.times[0]} - {period.times[period.times.length - 1]}
                  </p>
                </div>
              </div>

              {/* Grid de horarios */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {period.times.map((time) => {
                  const isSelected = localSelectedTime === time
                  const available = isTimeAvailable(time)
                  const isHovered = hoveredTime === time

                  return (
                    <button
                      key={time}
                      onClick={() => available && handleTimeSelect(time)}
                      onMouseEnter={() => setHoveredTime(time)}
                      onMouseLeave={() => setHoveredTime(null)}
                      disabled={!available}
                      className={`
                        relative p-6 rounded-2xl transition-all duration-300 transform
                        ${isSelected
                          ? `bg-gradient-to-br ${period.color} text-white shadow-2xl scale-105`
                          : available
                            ? `bg-gradient-to-br ${period.bgColor} hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-current`
                            : 'bg-gray-100 opacity-50 cursor-not-allowed'
                        }
                      `}
                    >
                      {/* Hora */}
                      <div className={`text-3xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {time}
                      </div>

                      {/* Estado */}
                      <div className="flex items-center justify-center gap-2">
                        {isSelected ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-white" />
                            <span className="text-sm font-semibold text-white">Seleccionado</span>
                          </>
                        ) : available ? (
                          <span className={`text-sm font-semibold ${isHovered ? 'text-gray-700' : 'text-gray-600'}`}>
                            Disponible
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">No disponible</span>
                        )}
                      </div>

                      {/* Glow effect */}
                      {isHovered && !isSelected && available && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${period.color} rounded-2xl blur-xl opacity-20 -z-10`}></div>
                      )}

                      {/* Badge de popularidad (ejemplo) */}
                      {(time === '10:00' || time === '15:00') && !isSelected && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          Popular
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recomendaciones */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border-2 border-blue-100 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
            <Sparkles className="w-6 h-6 mr-3 text-blue-600" />
            Horarios recomendados
          </h4>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <span><strong>Mañanas (10:00-11:00):</strong> Ideal para limpiezas profundas</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sunset className="w-4 h-4 text-white" />
              </div>
              <span><strong>Tardes (15:00-16:00):</strong> Mayor flexibilidad de horarios</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Moon className="w-4 h-4 text-white" />
              </div>
              <span><strong>Noches (18:00-19:00):</strong> Perfecto para después del trabajo</span>
            </li>
          </ul>
        </div>

        {/* Información del servicio */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-100 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
            <Clock className="w-6 h-6 mr-3 text-purple-600" />
            Información importante
          </h4>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Duración mínima del servicio: <strong>2 horas</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>El profesional llegará <strong>en el horario seleccionado</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Puedes reprogramar <strong>hasta 24h antes</strong> sin coste</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mensaje si no hay fecha */}
      {!selectedDate && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8 animate-shake">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-bold text-yellow-900 mb-1">⚠️ Fecha no seleccionada</h4>
              <p className="text-yellow-700">
                Primero debes seleccionar una fecha en el paso anterior para ver los horarios disponibles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBack}
          className="group px-8 py-4 border-3 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center shadow-md hover:shadow-xl transform hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
          Volver a fecha
        </button>
        
        <button
          onClick={onNext}
          disabled={!localSelectedTime}
          className={`
            group px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center shadow-lg transform
            ${localSelectedTime 
              ? 'bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white hover:shadow-2xl hover:scale-110' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {localSelectedTime ? (
            <>
              Siguiente: Tus datos
              <ChevronRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
            </>
          ) : (
            'Selecciona un horario para continuar'
          )}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}} />
    </div>
  )
}