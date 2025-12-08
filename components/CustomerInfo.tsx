'use client'

import { User, Phone, Mail, MapPin, MessageSquare, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CustomerInfoProps {
  customerData?: any
  onUpdate?: (key: string, value: any) => void
  onNext?: () => void
  onBack?: () => void
}

export default function CustomerInfo({ customerData = {}, onUpdate, onNext, onBack }: CustomerInfoProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newErrors: { [key: string]: string } = {};
    const phoneRegex = /^[+]?[\d\s-]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!customerData.name?.trim()) newErrors.name = 'Requerido';
    if (!customerData.phone?.trim()) {
      newErrors.phone = 'Requerido';
    } else if (!phoneRegex.test(customerData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }
    if (!customerData.address?.trim()) newErrors.address = 'Requerido';
    if (customerData.email && !emailRegex.test(customerData.email)) {
      newErrors.email = 'Email inválido';
    }
    setErrors(newErrors);
  }, [customerData]);

  const isFormValid = !Object.keys(errors).length && customerData.name && customerData.phone && customerData.address;

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/80 to-indigo-900/80 p-6 md:p-10 lg:p-12 glass">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 animate-slide-down text-center drop-shadow-lg">
        Tu Información
      </h2>

      <form className="space-y-6" autoComplete="off" onSubmit={e => { e.preventDefault(); onNext && onNext(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="flex flex-col animate-slide-up">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-2">
              <User className="w-5 h-5 text-orange-400" /> Nombre
            </label>
            <input
              type="text"
              value={customerData.name || ''}
              onChange={e => onUpdate && onUpdate('name', e.target.value)}
              className={`w-full p-3 bg-slate-800/70 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all ${errors.name ? 'border-red-400 animate-shake' : 'border-slate-700'}`}
              placeholder="Juan García"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 animate-fade-in">{errors.name}</p>}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col animate-slide-up">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-2">
              <Phone className="w-5 h-5 text-green-400" /> Teléfono
            </label>
            <input
              type="tel"
              value={customerData.phone || ''}
              onChange={e => onUpdate && onUpdate('phone', e.target.value)}
              className={`w-full p-3 bg-slate-800/70 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-all ${errors.phone ? 'border-red-400 animate-shake' : 'border-slate-700'}`}
              placeholder="+34 600 123 456"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1 animate-fade-in">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col animate-slide-up md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-2">
              <Mail className="w-5 h-5 text-pink-400" /> Email (opcional)
            </label>
            <input
              type="email"
              value={customerData.email || ''}
              onChange={e => onUpdate && onUpdate('email', e.target.value)}
              className="w-full p-3 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-all"
              placeholder="juan@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1 animate-fade-in">{errors.email}</p>}
          </div>

          {/* Dirección */}
          <div className="flex flex-col animate-slide-up md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-2">
              <MapPin className="w-5 h-5 text-blue-400" /> Dirección
            </label>
            <textarea
              value={customerData.address || ''}
              onChange={e => onUpdate && onUpdate('address', e.target.value)}
              className={`w-full p-3 bg-slate-800/70 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all resize-none ${errors.address ? 'border-red-400 animate-shake' : 'border-slate-700'}`}
              placeholder="Calle Principal 123, Madrid"
              rows={2}
            />
            {errors.address && <p className="text-red-400 text-xs mt-1 animate-fade-in">{errors.address}</p>}
          </div>

          {/* Instrucciones */}
          <div className="flex flex-col animate-slide-up md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-2">
              <MessageSquare className="w-5 h-5 text-yellow-400" /> Instrucciones (opcional)
            </label>
            <textarea
              value={customerData.specialInstructions || ''}
              onChange={e => onUpdate && onUpdate('specialInstructions', e.target.value)}
              className="w-full p-3 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all resize-none"
              placeholder="Ej: Hay mascota, usar productos ecológicos..."
              rows={2}
            />
          </div>
        </div>

        {/* Status */}
        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 shadow-lg transition-all ${isFormValid ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/40' : 'bg-slate-800/60 border border-slate-700'}`}>
          <CheckCircle className={`w-6 h-6 ${isFormValid ? 'text-green-400 animate-fade-in' : 'text-gray-400'}`} />
          <span className={isFormValid ? 'text-green-300 font-bold' : 'text-gray-400'}>
            {isFormValid ? 'Formulario completo' : 'Completa los campos requeridos'}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-slate-700 text-gray-200 rounded-xl font-bold bg-slate-900/60 hover:bg-slate-800/80 hover:border-orange-400 transition-all duration-200 shadow-md"
          >
            ← Atrás
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-md ${
              isFormValid
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl'
                : 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
            }`}
          >
            Siguiente →
          </button>
        </div>
      </form>
    </div>
  );
}