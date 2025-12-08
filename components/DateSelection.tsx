'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, CheckCircle } from 'lucide-react'

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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: (Date | null)[] = [];
    const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    for (let i = startDay; i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1);
      days.push(prevDate);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const isDateAvailable = (date: Date) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return date >= startOfToday;
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isSameMonth = (date: Date, month: Date) => {
    return date.getMonth() === month.getMonth() &&
           date.getFullYear() === month.getFullYear();
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/80 to-pink-900/80 p-4 md:p-10 lg:p-12 glass">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-down">
        <h2 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Elige la fecha
          </span>
        </h2>
        <p className="text-gray-300 text-lg">
          Selecciona el día que prefieras
        </p>
      </div>

      {/* Calendario */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8 backdrop-blur-xl animate-fade-in">
        {/* Navegación */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-slate-700 rounded-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
          </div>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-slate-700 rounded-lg transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-bold text-sm text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Días */}
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.map((day, dayIndex) => {
                if (!day) return <div key={dayIndex} />;
                const available = isDateAvailable(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                return (
                  <button
                    key={dayIndex}
                    onClick={() => available && onSelectDate && onSelectDate(day)}
                    disabled={!available}
                    className={`p-3 rounded-lg font-bold transition-all text-sm duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-110 animate-fade-in'
                        : available && isCurrentMonth
                          ? 'bg-slate-700 text-white hover:bg-slate-600 hover:scale-105'
                          : 'bg-slate-900/50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div>{day.getDate()}</div>
                    {isSelected && <CheckCircle className="w-3 h-3 mx-auto mt-1 animate-fade-in" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-slate-700 text-gray-300 rounded-lg font-bold bg-slate-900/60 hover:bg-slate-800/80 hover:border-pink-400 transition-all duration-200 shadow-md"
        >
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-md ${
            selectedDate
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:scale-105'
              : 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
          }`}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}