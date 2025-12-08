'use client'

import { useState, useCallback } from 'react'
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
  const [localSelectedTime, setLocalSelectedTime] = useState(selectedTime || '');

  const timeSlots = {
    morning: {
      label: 'Mañana',
      icon: Sun,
      color: 'from-yellow-400 to-orange-400',
      times: ['08:00', '09:00', '10:00', '11:00']
    },
    afternoon: {
      label: 'Tarde',
      icon: Sunset,
      color: 'from-orange-400 to-red-400',
      times: ['12:00', '13:00', '14:00', '15:00', '16:00']
    },
    evening: {
      label: 'Noche',
      icon: Moon,
      color: 'from-indigo-400 to-purple-400',
      times: ['17:00', '18:00', '19:00', '20:00']
    }
  };

  const handleTimeSelect = useCallback((time: string) => {
    setLocalSelectedTime(time);
    if (onSelectTime) onSelectTime(time);
  }, [onSelectTime]);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Sin fecha';
    const weekdays = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/80 to-orange-900/80 p-4 md:p-10 lg:p-12 glass">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-down">
        <h2 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
          <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
            Elige tu horario
          </span>
        </h2>
        <p className="text-gray-300 text-lg">
          Selecciona la hora que mejor se adapte a ti
        </p>
      </div>

      {/* Fecha seleccionada */}
      {selectedDate && (
        <div className="mb-10 p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Fecha seleccionada</p>
                <p className="text-lg font-bold text-white capitalize">{formatDate(selectedDate)}</p>
              </div>
            </div>
            {localSelectedTime && (
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-400" />
                <div className="text-right">
                  <p className="text-sm text-gray-400">Hora</p>
                  <p className="text-lg font-bold text-white">{localSelectedTime}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Horarios */}
      <div className="space-y-8 mb-10 animate-fade-in">
        {Object.entries(timeSlots).map(([key, period]) => {
          const Icon = period.icon;
          return (
            <div key={key} className="animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-gradient-to-br ${period.color} p-2.5 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{period.label}</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {period.times.map((time) => {
                  const isSelected = localSelectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-4 rounded-xl font-bold transition-all duration-300 transform shadow-md ${
                        isSelected
                          ? `bg-gradient-to-r ${period.color} text-white shadow-2xl scale-105 animate-fade-in`
                          : 'bg-slate-800/50 border border-slate-700 text-gray-200 hover:border-orange-500/50 hover:bg-slate-800 hover:scale-105'
                      }`}
                    >
                      <div className="text-lg">{time}</div>
                      {isSelected && <CheckCircle className="w-4 h-4 mt-1 mx-auto animate-fade-in" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botones */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-slate-700 text-gray-300 rounded-lg font-bold bg-slate-900/60 hover:bg-slate-800/80 hover:border-orange-400 transition-all duration-200 shadow-md"
        >
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!localSelectedTime}
          className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-md ${
            localSelectedTime 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-2xl hover:scale-105' 
              : 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
          }`}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}