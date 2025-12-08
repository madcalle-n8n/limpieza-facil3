// lib/api.ts - Comunicación con n8n
/**
 * API functions para comunicar con el backend
 */

export interface ReservationData {
  plan: string
  date: string // ISO string format
  time: string
  customer: {
    name: string
    phone: string
    email?: string
    address: string
    specialInstructions?: string
    accessibilityNeeds?: boolean
  }
}

export interface ApiResponse {
  success: boolean
  reservation_id?: string
  error?: string
  message?: string
}

/**
 * Envía la reserva a n8n a través de nuestra API Route
 */
export async function sendReservationToN8N(data: ReservationData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/reserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || `Error ${response.status}`,
        message: result.message,
      }
    }

    return {
      success: true,
      reservation_id: result.reservation_id,
      ...result,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error de conexión',
    }
  }
}

/**
 * Verificar si el webhook de n8n está disponible
 */
export async function checkN8NHealth(): Promise<boolean> {
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 
    'https://n8nprueba.serveftp.com/webhook/api/reserva'
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'GET', // Algunos webhooks aceptan GET para healthcheck
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    return response.ok || response.status === 405 // 405 = Method Not Allowed (webhook solo acepta POST)
  } catch (error) {
    console.error('❌ n8n no está disponible:', error)
    return false
  }
}