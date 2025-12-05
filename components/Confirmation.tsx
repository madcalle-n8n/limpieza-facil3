// components/Confirmation.tsx - VERSIÓN CORREGIDA
'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2, Calendar, Clock, User, Phone, MapPin, Mail } from 'lucide-react'
import { sendReservationToN8N } from '@/lib/api'

interface ConfirmationProps {
  reservationData: any
  onSubmit: () => void
  onBack: () => void
}

export default function Confirmation({ reservationData, onSubmit, onBack }: ConfirmationProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [reservationId, setReservationId] = useState<string>('')

  // ✅ FUNCIÓN MEJORADA para formatear fecha - Acepta string, Date o null
  const formatDate = (dateInput: string | Date | null | undefined): string => {
    // Validar entrada vacía
    if (!dateInput) {
      return 'Fecha no seleccionada'
    }
    
    try {
      let dateObj: Date
      
      // Si ya es un objeto Date
      if (dateInput instanceof Date) {
        dateObj = dateInput
      } 
      // Si es string
      else if (typeof dateInput === 'string') {
        // Limpiar espacios en blanco
        const trimmedDate = dateInput.trim()
        if (trimmedDate === '') {
          return 'Fecha no seleccionada'
        }
        dateObj = new Date(trimmedDate)
      } 
      // Tipo no soportado
      else {
        console.warn('Tipo de fecha no soportado:', typeof dateInput, dateInput)
        return 'Formato de fecha inválido'
      }
      
      // Validar que la fecha es válida
      if (isNaN(dateObj.getTime())) {
        console.warn('Fecha inválida:', dateInput)
        return 'Fecha inválida'
      }
      
      // Formatear correctamente
      return dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Error formateando fecha:', dateInput, error)
      return String(dateInput) // Devolver como string en último caso
    }
  }

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('📝 Datos a enviar:', reservationData)
      
      // Validar datos mínimos
      if (!reservationData.customer?.name || !reservationData.customer?.phone) {
        throw new Error('Faltan datos obligatorios del cliente')
      }

      // Convertir date a string ISO si es Date (necesario para enviar a n8n)
      let dateToSend = ''
      if (reservationData.date instanceof Date) {
        dateToSend = reservationData.date.toISOString()
      } else if (typeof reservationData.date === 'string') {
        dateToSend = reservationData.date
      }

      console.log('📅 Fecha a enviar:', dateToSend)

      const result = await sendReservationToN8N({
        plan: reservationData.plan || '',
        date: dateToSend,
        time: reservationData.time || '',
        customer: {
          name: reservationData.customer.name,
          phone: reservationData.customer.phone,
          email: reservationData.customer.email || '',
          address: reservationData.customer.address || '',
          specialInstructions: reservationData.customer.specialInstructions || ''
        }
      })

      // Generar ID de reserva local si n8n no lo devolvió
      const finalReservationId = result?.reservation_id || 
        `LOCAL-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      
      setReservationId(finalReservationId)
      setSuccess(true)
      
      // Esperar 4 segundos antes de redirigir
      setTimeout(() => {
        if (onSubmit) onSubmit()
      }, 4000)
      
    } catch (err: any) {
      console.error('❌ Error confirmando reserva:', err)
      setError(err.message || 'Error al procesar la reserva. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // Si ya tuvo éxito, mostrar pantalla de éxito
  if (success) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        
        <h3 className="text-4xl font-bold text-gray-900 mb-6">
          ¡Reserva Confirmada! 🎉
        </h3>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-200 rounded-2xl p-6">
            <p className="text-xl text-gray-800 mb-4">
              Tu reserva ha sido procesada correctamente.
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-gray-300">
              <p className="font-bold text-lg text-gray-900 mb-2">ID de Reserva</p>
              <p className="text-2xl font-mono text-blue-700 bg-blue-50 p-3 rounded">
                {reservationId}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Guarda este número para cualquier consulta
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 max-w-lg mx-auto">
          <p className="text-lg text-gray-700">
            📱 Recibirás un mensaje por Telegram en los próximos minutos.
          </p>
          <p className="text-lg text-gray-700">
            📧 Si proporcionaste email, también recibirás confirmación allí.
          </p>
        </div>
        
        <div className="mt-10 animate-pulse">
          <div className="inline-flex items-center text-blue-600 font-semibold text-lg">
            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
            Redirigiendo en 4 segundos...
          </div>
        </div>
      </div>
    )
  }

  // Renderizar formulario de confirmación
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Confirma tu reserva
      </h2>

      {/* Resumen en dos columnas */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 mb-10 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-6 border-b">
          📋 Resumen completo
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Servicio */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
              Detalles del servicio
            </h4>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold text-lg">
                    {reservationData.plan?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-gray-600">Plan</div>
                  <div className="text-xl font-bold text-gray-900 capitalize">
                    {reservationData.plan || 'No seleccionado'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <div className="text-gray-600">Fecha</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatDate(reservationData.date)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <div className="text-gray-600">Hora</div>
                  <div className="text-xl font-bold text-gray-900">
                    {reservationData.time || 'No seleccionada'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cliente */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-green-600" />
              Tus datos
            </h4>
            
            <div className="space-y-5">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-500 mr-4" />
                <div>
                  <div className="text-gray-600">Nombre</div>
                  <div className="text-lg font-medium text-gray-900">
                    {reservationData.customer?.name || 'No proporcionado'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-4" />
                <div>
                  <div className="text-gray-600">Teléfono</div>
                  <div className="text-lg font-medium text-gray-900">
                    {reservationData.customer?.phone || 'No proporcionado'}
                  </div>
                </div>
              </div>
              
              {reservationData.customer?.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-4" />
                  <div>
                    <div className="text-gray-600">Email</div>
                    <div className="text-lg font-medium text-gray-900">
                      {reservationData.customer.email}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mr-4 mt-1" />
                <div>
                  <div className="text-gray-600">Dirección</div>
                  <div className="text-lg font-medium text-gray-900">
                    {reservationData.customer?.address || 'No proporcionada'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Instrucciones especiales */}
        {reservationData.customer?.specialInstructions && (
          <div className="mt-10 pt-8 border-t">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">📝 Instrucciones especiales</h4>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
              <p className="text-gray-800 text-lg">
                {reservationData.customer.specialInstructions}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Términos */}
      <div className="mb-10 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-200">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mt-2 mr-5 w-6 h-6 cursor-pointer"
            required
          />
          <label htmlFor="terms" className="text-gray-800 text-lg cursor-pointer">
            ✅ <span className="font-bold">Acepto los términos y condiciones:</span> Confirmo que la información es correcta 
            y autorizo el contacto por Telegram para coordinar la visita. Entiendo que puedo cancelar o modificar 
            con 24 horas de anticipación sin costo. Los datos se utilizarán únicamente para prestar el servicio.
          </label>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-10 p-6 bg-red-50 border-2 border-red-300 rounded-2xl animate-shake">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-7 h-7 text-red-600 mr-3" />
            <h5 className="text-xl font-bold text-red-700">Error al procesar</h5>
          </div>
          <p className="text-red-600 mb-3">{error}</p>
          <p className="text-red-500 text-sm">
            Si el problema persiste, contacta al +34 600 123 456 o intenta nuevamente.
          </p>
        </div>
      )}

      {/* Botones */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-10 py-5 border-3 border-gray-400 text-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-100 disabled:opacity-50 transition-all"
        >
          ↩️ Volver a datos
        </button>
        
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-7 h-7 mr-4 animate-spin" />
              Enviando a n8n...
            </>
          ) : (
            <>
              <CheckCircle className="w-7 h-7 mr-4" />
              ✅ Confirmar Reserva (Enviar a n8n)
            </>
          )}
        </button>
      </div>

      {/* Info n8n */}
      <div className="mt-12 pt-8 border-t text-center">
        <div className="inline-flex items-center bg-gray-100 rounded-full px-5 py-2 mb-4">
          <span className="text-sm font-medium text-gray-700">
            🔗 Conectado a: n8nprueba.serveftp.com
          </span>
        </div>
        <p className="text-gray-600">
          Tu reserva se enviará automáticamente a nuestro sistema de automatización (n8n)
        </p>
      </div>
    </div>
  )
}