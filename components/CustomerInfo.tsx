// components/CustomerInfo.tsx - VERSIÓN CORREGIDA
'use client'

import { User, Phone, Mail, MapPin, MessageSquare, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CustomerInfoProps {
  customerData: any
  onUpdate: (key: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function CustomerInfo({ customerData, onUpdate, onNext, onBack }: CustomerInfoProps) {
  // Estado para validación en tiempo real
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  
  // Campos obligatorios
  const requiredFields = ['name', 'phone', 'address']
  
  // Validación en tiempo real
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
  
  // Determinar si el formulario es válido
  const isFormValid = () => {
    return requiredFields.every(field => customerData[field]?.trim()) && 
           Object.keys(validationErrors).length === 0
  }
  
  const handleNext = () => {
    if (isFormValid()) {
      onNext()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tus datos de contacto</h2>
        <p className="text-gray-600">Completa los campos obligatorios para continuar</p>
      </div>
      
      <div className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            <User className="inline w-5 h-5 mr-2" />
            Nombre completo *
          </label>
          <input
            type="text"
            value={customerData.name || ''}
            onChange={(e) => onUpdate('name', e.target.value)}
            className={`w-full p-4 border rounded-lg text-lg ${
              validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Ej: María González"
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠️</span> {validationErrors.name}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            <Phone className="inline w-5 h-5 mr-2" />
            Teléfono *
          </label>
          <input
            type="tel"
            value={customerData.phone || ''}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className={`w-full p-4 border rounded-lg text-lg ${
              validationErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="+34 600 123 456"
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠️</span> {validationErrors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            <Mail className="inline w-5 h-5 mr-2" />
            Email (opcional)
          </label>
          <input
            type="email"
            value={customerData.email || ''}
            onChange={(e) => onUpdate('email', e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg"
            placeholder="maria@ejemplo.com"
          />
          <p className="text-sm text-gray-500 mt-1">
            Te enviaremos la confirmación aquí si lo proporcionas
          </p>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            <MapPin className="inline w-5 h-5 mr-2" />
            Dirección completa *
          </label>
          <textarea
            value={customerData.address || ''}
            onChange={(e) => onUpdate('address', e.target.value)}
            className={`w-full p-4 border rounded-lg text-lg ${
              validationErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Calle, número, piso, ciudad, código postal"
            rows={3}
          />
          {validationErrors.address && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠️</span> {validationErrors.address}
            </p>
          )}
        </div>

        {/* Instrucciones especiales */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            <MessageSquare className="inline w-5 h-5 mr-2" />
            Instrucciones especiales (opcional)
          </label>
          <textarea
            value={customerData.specialInstructions || ''}
            onChange={(e) => onUpdate('specialInstructions', e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg"
            placeholder="Llama al timbre dos veces, tengo mascota, productos ecológicos preferidos..."
            rows={3}
          />
        </div>
      </div>

      {/* Indicador de validación */}
      <div className="mt-8 p-4 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className={`w-6 h-6 mr-3 ${
              isFormValid() ? 'text-green-500' : 'text-gray-400'
            }`} />
            <span className={`font-medium ${
              isFormValid() ? 'text-green-700' : 'text-gray-600'
            }`}>
              {isFormValid() 
                ? '✓ Todos los campos obligatorios están completos' 
                : 'Completa los campos obligatorios marcados con *'}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {requiredFields.filter(f => !customerData[f]?.trim()).length} de {requiredFields.length} campos
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-10">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
        >
          Atrás
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`px-8 py-3 rounded-lg font-semibold text-lg ${
            isFormValid() 
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Siguiente: Confirmar
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-8 pt-6 border-t text-sm text-gray-500">
        <p className="mb-2">✅ Tus datos se utilizarán únicamente para coordinar el servicio</p>
        <p>✅ Nunca compartiremos tu información con terceros</p>
      </div>
    </div>
  )
}