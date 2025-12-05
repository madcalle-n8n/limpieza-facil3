// lib/api.ts - Comunicación con n8n
export interface ReservationData {
  plan: string
  date: string // ISO string format
  time: string
  customer: {
    name: string
    phone: string
    email: string
    address: string
    specialInstructions: string
  }
}

export interface N8NResponse {
  success: boolean
  reservation_id?: string
  message?: string
  error?: string
}

/**
 * Envía una reserva al webhook de n8n
 */
export async function sendReservationToN8N(data: ReservationData): Promise<N8NResponse> {
  // En lugar de llamar directamente a n8n, usamos nuestra API Route como intermediario
  // Esto resuelve problemas de CORS porque la petición va de servidor a servidor
  const API_ROUTE = '/api/reserva'
  
  // DEBUG: Información detallada para troubleshooting
  console.log('=== DEBUG RESERVA ===')
  console.log('🔗 Enviando a API Route:', API_ROUTE)
  console.log('📦 Datos a enviar:', JSON.stringify(data, null, 2))
  console.log('====================')
  
  try {
    const response = await fetch(API_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) // Enviamos directamente los datos de la reserva
    })

    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

    // Leer el texto de respuesta primero
    const textResponse = await response.text()
    console.log('📄 Response text:', textResponse)

    // Si la respuesta está vacía, n8n procesó correctamente pero no devolvió JSON
    if (!textResponse || textResponse.trim() === '') {
      if (response.ok) {
        return {
          success: true,
          reservation_id: `N8N-${Date.now()}`,
          message: 'Reserva enviada correctamente a n8n'
        }
      } else {
        throw new Error(`Error ${response.status}: n8n no devolvió respuesta`)
      }
    }

    // Intentar parsear JSON
    let jsonResponse: any
    try {
      jsonResponse = JSON.parse(textResponse)
    } catch (parseError) {
      console.warn('⚠️ La respuesta no es JSON válido:', textResponse)
      // Si n8n devolvió HTML o texto plano pero el status es OK
      if (response.ok) {
        return {
          success: true,
          reservation_id: `N8N-${Date.now()}`,
          message: 'Reserva recibida por n8n'
        }
      } else {
        throw new Error(`Error ${response.status}: ${textResponse.substring(0, 200)}`)
      }
    }

    // Validar respuesta de error HTTP
    if (!response.ok) {
      throw new Error(
        jsonResponse.error || 
        jsonResponse.message || 
        `Error HTTP ${response.status}`
      )
    }

    // Respuesta exitosa
    return {
      success: true,
      reservation_id: jsonResponse.reservation_id || jsonResponse.id,
      message: jsonResponse.message || 'Reserva procesada correctamente'
    }

  } catch (error: any) {
    console.error('❌ Error enviando a n8n:', error)
    
    // Diferenciar entre errores de red y errores del servidor
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar con n8n. Verifica la URL del webhook.')
    }
    
    throw new Error(error.message || 'Error desconocido al enviar a n8n')
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