'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2, Calendar, Clock, User, Phone, MapPin, Mail, Sparkles, Shield, PartyPopper } from 'lucide-react'

interface ConfirmationProps {
  reservationData?: any
  onSubmit?: () => void
  onBack?: () => void
}

export default function Confirmation({ reservationData, onSubmit, onBack }: ConfirmationProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [reservationId, setReservationId] = useState<string>('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const formatDate = (dateInput: string | Date | null | undefined): string => {
    if (!dateInput) return 'Fecha no seleccionada'
    
    try {
      let dateObj: Date
      
      if (dateInput instanceof Date) {
        dateObj = dateInput
      } else if (typeof dateInput === 'string') {
        const trimmedDate = dateInput.trim()
        if (trimmedDate === '') return 'Fecha no seleccionada'
        dateObj = new Date(trimmedDate)
      } else {
        return 'Formato de fecha inválido'
      }
      
      if (isNaN(dateObj.getTime())) return 'Fecha inválida'
      
      return dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return String(dateInput)
    }
  }

  const handleConfirm = async () => {
    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // Simular envío a n8n
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const finalReservationId = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      setReservationId(finalReservationId)
      setSuccess(true)
      
      setTimeout(() => {
        if (onSubmit) onSubmit()
      }, 5000)
      
    } catch (err: any) {
      setError(err.message || 'Error al procesar la reserva. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // Pantalla de éxito
  if (success) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-3xl opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-full shadow-2xl animate-bounce">
            <CheckCircle className="w-20 h-20 text-white" strokeWidth={3} />
          </div>
        </div>
        
        <h3 className="text-5xl font-black mb-4">
          <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            ¡Reserva Confirmada!
          </span>
        </h3>
        
        <div className="flex justify-center gap-2 mb-8">
          <PartyPopper className="w-8 h-8 text-yellow-400 animate-bounce" />
          <span className="text-4xl">🎉</span>
          <PartyPopper className="w-8 h-8 text-pink-400 animate-bounce" style={{animationDelay: '0.2s'}} />
        </div>
        
        <div className="max-w-lg mx-auto mb-10">
          <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 rounded-3xl p-8 backdrop-blur">
            <p className="text-xl text-gray-200 mb-6">
              Tu reserva ha sido procesada exitosamente
            </p>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-400/50 rounded-2xl p-6 shadow-2xl">
              <p className="text-gray-400 text-sm mb-2">ID DE RESERVA</p>
              <p className="text-3xl font-black font-mono text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text">
                {reservationId}
              </p>
              <p className="text-gray-400 text-sm mt-3">
                💾 Guarda este código para futuras consultas
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 max-w-lg mx-auto mb-10">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-4 backdrop-blur">
            <p className="text-gray-200">
              📱 <strong>Telegram:</strong> Mensaje en los próximos minutos
            </p>
          </div>
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-4 backdrop-blur">
            <p className="text-gray-200">
              📧 <strong>Email:</strong> Confirmación enviada
            </p>
          </div>
        </div>
        
        <div className="inline-flex items-center bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 px-6 py-3 rounded-full backdrop-blur">
          <Loader2 className="w-5 h-5 mr-3 animate-spin text-blue-400" />
          <span className="text-gray-200 font-semibold">Redirigiendo en 5 segundos...</span>
        </div>
      </div>
    )
  }

  // Formulario de confirmación
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-3xl shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <h2 className="text-5xl font-black mb-3">
          <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Confirma tu Reserva
          </span>
        </h2>
        <p className="text-gray-300 text-lg">
          Revisa todos los detalles antes de confirmar
        </p>
      </div>

      {/* Resumen */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/30 rounded-3xl p-8 mb-8 shadow-2xl backdrop-blur">
        <h3 className="text-2xl font-bold text-white mb-8 pb-6 border-b border-gray-700 flex items-center">
          <CheckCircle className="w-7 h-7 mr-3 text-purple-400" />
          Resumen de tu reserva
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detalles del servicio */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-300 mb-4 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-3"></div>
              Detalles del Servicio
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl backdrop-blur">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl mr-4 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Plan</div>
                  <div className="text-xl font-bold text-white capitalize">
                    {reservationData?.plan || 'No seleccionado'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl backdrop-blur">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl mr-4 shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Fecha</div>
                  <div className="text-lg font-bold text-white capitalize">
                    {formatDate(reservationData?.date)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-2xl backdrop-blur">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl mr-4 shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Hora</div>
                  <div className="text-xl font-bold text-white">
                    {reservationData?.time || 'No seleccionada'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Datos del cliente */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-300 mb-4 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full mr-3"></div>
              Tus Datos
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl backdrop-blur">
                <User className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <div className="text-gray-400 text-sm">Nombre</div>
                  <div className="text-lg font-semibold text-white">
                    {reservationData?.customer?.name || 'No proporcionado'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl backdrop-blur">
                <Phone className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <div className="text-gray-400 text-sm">Teléfono</div>
                  <div className="text-lg font-semibold text-white">
                    {reservationData?.customer?.phone || 'No proporcionado'}
                  </div>
                </div>
              </div>
              
              {reservationData?.customer?.email && (
                <div className="flex items-center p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl backdrop-blur">
                  <Mail className="w-5 h-5 text-purple-400 mr-3" />
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-lg font-semibold text-white">
                      {reservationData.customer.email}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start p-4 bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30 rounded-2xl backdrop-blur">
                <MapPin className="w-5 h-5 text-pink-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-sm">Dirección</div>
                  <div className="text-base font-semibold text-white">
                    {reservationData?.customer?.address || 'No proporcionada'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Instrucciones especiales */}
        {reservationData?.customer?.specialInstructions && (
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h4 className="text-lg font-bold text-gray-300 mb-4">📝 Instrucciones Especiales</h4>
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-2xl p-6 backdrop-blur">
              <p className="text-gray-200 text-lg">
                {reservationData.customer.specialInstructions}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Términos */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-2 border-blue-500/30 rounded-3xl backdrop-blur">
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 mr-4 w-6 h-6 cursor-pointer accent-blue-500"
          />
          <div className="text-gray-200">
            <span className="font-bold text-white">Acepto los términos y condiciones:</span>
            <span className="block mt-2 text-gray-300">
              Confirmo que la información es correcta y autorizo el contacto por Telegram. 
              Puedo cancelar o modificar con 24h de anticipación sin costo. 
              Los datos se usan únicamente para prestar el servicio.
            </span>
          </div>
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-8 p-6 bg-gradient-to-r from-red-900/40 to-pink-900/40 border-2 border-red-500/50 rounded-2xl backdrop-blur animate-shake">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-7 h-7 text-red-400 mr-3" />
            <h5 className="text-xl font-bold text-red-300">Error al procesar</h5>
          </div>
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {/* Botones */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 transition-all transform hover:scale-105 shadow-xl"
        >
          ← Volver a datos
        </button>
        
        <button
          onClick={handleConfirm}
          disabled={loading || !acceptedTerms}
          className="px-10 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 transition-all flex items-center justify-center shadow-xl transform hover:scale-105"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CheckCircle className="w-6 h-6 mr-3" />
              Confirmar Reserva
            </>
          )}
        </button>
      </div>

      {/* Info de seguridad */}
      <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl backdrop-blur">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
          <div>
            <h4 className="text-white font-bold mb-1">Conexión Segura</h4>
            <p className="text-gray-300 text-sm">
              🔒 Tu información está protegida con encriptación de última generación
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}} />
    </div>
  )
}