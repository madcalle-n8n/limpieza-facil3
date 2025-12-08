'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2, Calendar, Clock, User, Phone, MapPin } from 'lucide-react'

interface ConfirmationProps {
  reservationData?: any
  onSubmit?: () => Promise<any>
  onBack?: () => void
}

export default function Confirmation({ reservationData, onSubmit, onBack }: ConfirmationProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [reservationId, setReservationId] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const formatDate = (dateInput: Date | null | undefined): string => {
    if (!dateInput) return 'No seleccionada';
    try {
      const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
      return dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  const handleConfirm = async () => {
    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    // Validaciones mínimas para evitar requests inválidos
    if (!reservationData?.plan || !reservationData?.date || !reservationData?.time) {
      setError('Faltan datos obligatorios de la reserva (plan, fecha u hora)');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('📤 Enviando reserva...');
      const result = onSubmit ? await onSubmit() : null;
      if (result && result.reservation_id) {
        setReservationId(result.reservation_id);
      } else {
        setReservationId(`RES-${Date.now()}`);
      }
      setSuccess(true);
      setTimeout(() => {
        // El estado se limpia en el onSubmit provisto
      }, 3000);
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message || 'Error al procesar la reserva');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="relative inline-flex items-center justify-center mb-8 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-3xl opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-full shadow-2xl">
            <CheckCircle className="w-20 h-20 text-white" strokeWidth={3} />
          </div>
        </div>
        <h3 className="text-5xl font-black mb-4 text-white drop-shadow-lg">
          ¡Reserva Confirmada!
        </h3>
        <div className="max-w-lg mx-auto mb-10">
          <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 backdrop-blur mb-6 animate-slide-down">
            <p className="text-xl text-gray-200 mb-6">
              Tu reserva ha sido procesada exitosamente
            </p>
            <div className="bg-slate-800 border border-green-400/50 rounded-xl p-6 shadow-xl">
              <p className="text-gray-400 text-sm mb-2">ID DE RESERVA</p>
              <p className="text-3xl font-black font-mono text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text">
                {reservationId}
              </p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            📱 Te contactaremos por Telegram en los próximos minutos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/80 to-green-900/80 p-4 md:p-10 lg:p-12 glass">
      <h2 className="text-3xl md:text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 animate-slide-down text-center drop-shadow-lg">
        Confirma tu Reserva
      </h2>
      {/* Resumen */}
      <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-6 mb-8 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-orange-400">📋</span>
            <div>
              <p className="text-xs text-gray-400">Plan</p>
              <p className="font-bold text-white capitalize">{reservationData?.plan}</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-slate-600"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Fecha</p>
              <p className="font-bold text-white">{formatDate(reservationData?.date)}</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-slate-600"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-xs text-gray-400">Hora</p>
              <p className="font-bold text-white">{reservationData?.time}</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-slate-600"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs text-gray-400">Nombre</p>
              <p className="font-bold text-white">{reservationData?.customer?.name}</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-slate-600"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Teléfono</p>
              <p className="font-bold text-white">{reservationData?.customer?.phone}</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-slate-600"></div>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-pink-400 mt-1" />
            <div>
              <p className="text-xs text-gray-400">Dirección</p>
              <p className="font-bold text-white">{reservationData?.customer?.address}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Términos */}
      <div className="mb-8 p-4 bg-slate-700/50 border border-slate-600 rounded-lg animate-fade-in">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-4 h-4 cursor-pointer accent-orange-500"
          />
          <div>
            <p className="font-bold text-white text-sm">Acepto los términos</p>
            <p className="text-gray-400 text-xs">
              Confirmo que los datos son correctos. Puedo cancelar o modificar con 24h de anticipación.
            </p>
          </div>
        </label>
      </div>
      {/* Error */}
      {error && (
        <div className="mb-8 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}
      {/* Botones */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 px-6 py-3 border border-slate-700 text-gray-300 rounded-lg font-bold bg-slate-900/60 hover:bg-slate-800/80 hover:border-green-400 disabled:opacity-50 transition-all duration-200 shadow-md"
        >
          ← Atrás
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading || !acceptedTerms}
          className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
            loading || !acceptedTerms
              ? 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl hover:scale-105'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              ✓ Confirmar
            </>
          )}
        </button>
      </div>
    </div>
  );
}