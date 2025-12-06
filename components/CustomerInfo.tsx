'use client'

import { User, Phone, Mail, MapPin, MessageSquare, CheckCircle, Shield, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CustomerInfoProps {
  customerData?: any
  onUpdate?: (key: string, value: any) => void
  onNext?: () => void
  onBack?: () => void
}

export default function CustomerInfo({ customerData = {}, onUpdate, onNext, onBack }: CustomerInfoProps) {
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const requiredFields = ['name', 'phone', 'address']
  
  useEffect(() => {
    const errors: {[key: string]: string} = {}
    
    if (!customerData.name?.trim()) {
      errors.name = 'El nombre es obligatorio'
    }
    
    if (!customerData.phone?.trim()) {
      errors.phone = 'El teléfono es obligatorio'
    } else if (!/^(\+34|0034|34)?[6-9]\d{8}$/.test(customerData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Introduce un teléfono español válido'
    }
    
    if (!customerData.address?.trim()) {
      errors.address = 'La dirección es obligatoria'
    }
    
    setValidationErrors(errors)
  }, [customerData])
  
  const isFormValid = () => {
    return requiredFields.every(field => customerData[field]?.trim()) && 
           Object.keys(validationErrors).length === 0
  }
  
  const handleNext = () => {
    if (isFormValid() && onNext) {
      onNext()
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-3xl shadow-2xl">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            Tus Datos de Contacto
          </span>
        </h2>
        <p className="text-gray-300 text-lg">
          Completa la información para coordinar tu servicio
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Nombre */}
        <div className="group">
          <label className="flex items-center text-gray-200 mb-3 font-semibold text-lg">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg mr-3 shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            Nombre completo <span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="text"
            value={customerData?.name || ''}
            onChange={(e) => onUpdate && onUpdate('name', e.target.value)}
            className={`w-full p-5 bg-white/10 backdrop-blur border-2 rounded-2xl text-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 ${
              validationErrors.name 
                ? 'border-red-500 bg-red-900/20 focus:ring-red-500/50' 
                : 'border-gray-600 focus:border-green-400 focus:ring-green-400/50 hover:border-gray-500'
            }`}
            placeholder="Ej: María González Pérez"
          />
          {validationErrors.name && (
            <div className="mt-2 flex items-center text-red-400 text-sm bg-red-900/30 p-3 rounded-lg border border-red-500/50">
              <span className="mr-2">⚠️</span> {validationErrors.name}
            </div>
          )}
        </div>

        {/* Teléfono */}
        <div className="group">
          <label className="flex items-center text-gray-200 mb-3 font-semibold text-lg">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg mr-3 shadow-lg">
              <Phone className="w-5 h-5 text-white" />
            </div>
            Teléfono <span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="tel"
            value={customerData?.phone || ''}
            onChange={(e) => onUpdate && onUpdate('phone', e.target.value)}
            className={`w-full p-5 bg-white/10 backdrop-blur border-2 rounded-2xl text-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 ${
              validationErrors.phone 
                ? 'border-red-500 bg-red-900/20 focus:ring-red-500/50' 
                : 'border-gray-600 focus:border-purple-400 focus:ring-purple-400/50 hover:border-gray-500'
            }`}
            placeholder="+34 600 123 456"
          />
          {validationErrors.phone && (
            <div className="mt-2 flex items-center text-red-400 text-sm bg-red-900/30 p-3 rounded-lg border border-red-500/50">
              <span className="mr-2">⚠️</span> {validationErrors.phone}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="group">
          <label className="flex items-center text-gray-200 mb-3 font-semibold text-lg">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg mr-3 shadow-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            Email <span className="text-gray-400 text-sm ml-2">(opcional)</span>
          </label>
          <input
            type="email"
            value={customerData?.email || ''}
            onChange={(e) => onUpdate && onUpdate('email', e.target.value)}
            className="w-full p-5 bg-white/10 backdrop-blur border-2 border-gray-600 rounded-2xl text-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:border-orange-400 focus:ring-orange-400/50 hover:border-gray-500"
            placeholder="maria@ejemplo.com"
          />
          <p className="text-sm text-gray-400 mt-2 ml-1">
            📧 Recibirás confirmación por email si lo proporcionas
          </p>
        </div>

        {/* Dirección */}
        <div className="group">
          <label className="flex items-center text-gray-200 mb-3 font-semibold text-lg">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-2 rounded-lg mr-3 shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            Dirección completa <span className="text-red-400 ml-1">*</span>
          </label>
          <textarea
            value={customerData?.address || ''}
            onChange={(e) => onUpdate && onUpdate('address', e.target.value)}
            className={`w-full p-5 bg-white/10 backdrop-blur border-2 rounded-2xl text-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 resize-none ${
              validationErrors.address 
                ? 'border-red-500 bg-red-900/20 focus:ring-red-500/50' 
                : 'border-gray-600 focus:border-pink-400 focus:ring-pink-400/50 hover:border-gray-500'
            }`}
            placeholder="Calle Principal 123, 3º B, Madrid, 28001"
            rows={3}
          />
          {validationErrors.address && (
            <div className="mt-2 flex items-center text-red-400 text-sm bg-red-900/30 p-3 rounded-lg border border-red-500/50">
              <span className="mr-2">⚠️</span> {validationErrors.address}
            </div>
          )}
        </div>

        {/* Instrucciones especiales */}
        <div className="group">
          <label className="flex items-center text-gray-200 mb-3 font-semibold text-lg">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg mr-3 shadow-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            Instrucciones especiales <span className="text-gray-400 text-sm ml-2">(opcional)</span>
          </label>
          <textarea
            value={customerData?.specialInstructions || ''}
            onChange={(e) => onUpdate && onUpdate('specialInstructions', e.target.value)}
            className="w-full p-5 bg-white/10 backdrop-blur border-2 border-gray-600 rounded-2xl text-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:border-indigo-400 focus:ring-indigo-400/50 hover:border-gray-500 resize-none"
            placeholder="Ej: Llamar al timbre 2 veces, hay mascota, preferir productos ecológicos..."
            rows={3}
          />
        </div>
      </div>

      {/* Indicador de progreso */}
      <div className={`mt-8 p-6 rounded-2xl border-2 transition-all duration-300 ${
        isFormValid() 
          ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/50' 
          : 'bg-gray-800/40 border-gray-600'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className={`w-8 h-8 mr-4 transition-colors ${
              isFormValid() ? 'text-green-400' : 'text-gray-500'
            }`} />
            <div>
              <div className={`font-bold text-lg ${
                isFormValid() ? 'text-green-300' : 'text-gray-300'
              }`}>
                {isFormValid() 
                  ? '✓ Formulario completo' 
                  : 'Completa los campos obligatorios'}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {isFormValid()
                  ? 'Listo para continuar'
                  : `Faltan ${requiredFields.filter(f => !customerData[f]?.trim()).length} campos`}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-300">
              {requiredFields.filter(f => customerData[f]?.trim()).length}
              <span className="text-xl text-gray-500">/{requiredFields.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Información de privacidad */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl backdrop-blur">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl shadow-lg flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Tu privacidad está protegida
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Tus datos solo se usan para coordinar el servicio</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>No compartimos información con terceros</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Conexión segura y encriptada</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <button
          onClick={onBack}
          className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 shadow-xl"
        >
          ← Atrás
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all transform shadow-xl ${
            isFormValid() 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl hover:scale-105' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          {isFormValid() ? 'Siguiente: Confirmar →' : 'Completa el formulario'}
        </button>
      </div>
    </div>
  )
}