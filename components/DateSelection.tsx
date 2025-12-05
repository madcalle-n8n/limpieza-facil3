'use client'

import { ChevronLeft, ChevronRight, Calendar, Sun, Sparkles, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface DateSelectionProps {
  selectedDate?: Date | null
  onSelectDate?: (date: Date) => void
  onNext?: () => void
  onBack?: () => void
}

export default function DateSelection({ 
  selectedDate, 
  onSelectDate, 
  onNext, 
  onBack 
}: DateSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const weekdayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

  // Generar días del mes actual
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days: (Date | null)[] = []
    
    // Días del mes anterior para completar semana
    const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1
    for (let i = startDay; i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1)
      days.push(prevDate)
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    // Días del siguiente mes para completar semana
    const remainingDays = 42 - days.length // 6 semanas
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }
    
    return days
  }

  const days = getDaysInMonth(currentMonth)

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isDateAvailable = (date: Date) => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return date >= startOfToday
  }

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return isSameDay(date, today)
  }

  const isSameMonth = (date: Date, month: Date) => {
    return date.getMonth() === month.getMonth() &&
           date.getFullYear() === month.getFullYear()
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const formatDate = (date: Date) => {
    const dayName = weekdayNames[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${dayName}, ${day} de ${month} de ${year}`
  }

  useEffect(() => {
    if (!selectedDate && onSelectDate) {
      const today = new Date()
      if (isDateAvailable(today)) {
        onSelectDate(today)
      }
    }
  }, [selectedDate, onSelectDate])

  // Agrupar días por semanas
  const weeks: (Date | null)[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header con animación */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-30 animate-pulse"></div>
            <Calendar className="w-16 h-16 text-purple-600 relative" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Selecciona la fecha perfecta
        </h2>
        <p className="text-xl text-gray-600">
          Elige el día que mejor te venga para el servicio de limpieza
        </p>
      </div>

      {/* Tarjeta de fecha seleccionada */}
      {selectedDate && (
        <div className="mb-8 animate-slide-down">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-1 shadow-xl">
            <div className="bg-white rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl">
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Fecha seleccionada</div>
                    <div className="text-2xl font-bold text-gray-900 capitalize">
                      {formatDate(selectedDate)}
                    </div>
                  </div>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendario mejorado */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
        {/* Header del calendario con navegación mejorada */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevMonth}
            className="group p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>
          
          <div className="text-center">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent capitalize mb-1">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <p className="text-sm text-gray-500">Selecciona cualquier día disponible</p>
          </div>
          
          <button
            onClick={handleNextMonth}
            className="group p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-7 h-7 text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div 
              key={day} 
              className={`text-center font-bold py-3 rounded-xl ${
                index >= 5 ? 'text-purple-600 bg-purple-50' : 'text-gray-700 bg-gray-50'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grid de días del calendario */}
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.map((day, dayIndex) => {
                if (!day) return <div key={dayIndex} />
                
                const available = isDateAvailable(day)
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const today = isToday(day)
                const weekend = isWeekend(day)
                const isHovered = hoveredDate && isSameDay(day, hoveredDate)

                return (
                  <button
                    key={dayIndex}
                    onClick={() => available && onSelectDate && onSelectDate(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                    disabled={!available}
                    className={`
                      relative h-16 rounded-2xl flex flex-col items-center justify-center
                      transition-all duration-300 transform
                      ${isSelected 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl scale-110 z-10' 
                        : ''}
                      ${!isSelected && available && isCurrentMonth 
                        ? 'hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-lg hover:scale-105 text-gray-900 bg-white border-2 border-gray-100' 
                        : ''}
                      ${!isSelected && available && !isCurrentMonth 
                        ? 'hover:bg-gray-50 text-gray-400 bg-white' 
                        : ''}
                      ${!available 
                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-50' 
                        : 'cursor-pointer'}
                      ${today && !isSelected 
                        ? 'border-3 border-purple-400 shadow-md' 
                        : ''}
                      ${weekend && available && !isSelected
                        ? 'bg-purple-50'
                        : ''}
                    `}
                  >
                    {/* Número del día */}
                    <div className={`text-xl font-bold ${isSelected ? 'text-white' : ''}`}>
                      {day.getDate()}
                    </div>
                    
                    {/* Indicadores */}
                    <div className="flex gap-1 mt-1">
                      {today && !isSelected && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      )}
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    {/* Badge "Hoy" */}
                    {today && (
                      <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white text-purple-600' : 'bg-purple-600 text-white'
                      }`}>
                        HOY
                      </div>
                    )}

                    {/* Glow effect en hover */}
                    {isHovered && available && !isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-md opacity-30 -z-10"></div>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Información y leyenda mejorada */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Leyenda */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border-2 border-blue-100 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
            <Sparkles className="w-6 h-6 mr-3 text-blue-600" />
            Leyenda del calendario
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-700 font-medium">Fecha seleccionada</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border-3 border-purple-400 bg-white flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-gray-700 font-medium">Hoy</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
                S
              </div>
              <span className="text-gray-700 font-medium">Fin de semana</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 font-bold">
                ×
              </div>
              <span className="text-gray-700 font-medium">No disponible</span>
            </li>
          </ul>
        </div>

        {/* Información importante */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-100 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
            <Sun className="w-6 h-6 mr-3 text-purple-600" />
            Información del servicio
          </h4>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span>Servicio disponible de <strong>lunes a sábado</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span>Recomendamos reservar con <strong>48h de antelación</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>Cancela o modifica <strong>sin costo hasta 24h antes</strong></span>
            </li>
          </ul>
        </div>
      </div>

      {/* Botones de navegación mejorados */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBack}
          className="group px-8 py-4 border-3 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center shadow-md hover:shadow-xl transform hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
          Volver a planes
        </button>
        
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className={`
            group px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center shadow-lg transform
            ${selectedDate 
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:shadow-2xl hover:scale-110' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {selectedDate ? (
            <>
              Siguiente: Elegir horario
              <ChevronRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
            </>
          ) : (
            'Selecciona una fecha para continuar'
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
      `}} />
    </div>
  )
}