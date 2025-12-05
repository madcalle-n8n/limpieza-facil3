// app/api/reserva/route.ts
// Este archivo crea un "intermediario" entre tu frontend y n8n
// Resuelve problemas de CORS porque las peticiones van de servidor a servidor

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('📥 API Route recibió petición')
  
  try {
    // Leer los datos que envió el frontend
    const body = await request.json()
    console.log('📦 Datos recibidos del frontend:', body)
    
    // Tu código actual:
// ... (resto del código igual)

    // URL del webhook de n8n - Prioriza variables, pero el fallback debe ser CORRECTO
    // IMPORTANTE: Si estás probando, usa 'webhook-test'. Si es producción, usa 'webhook'.
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 
      process.env.N8N_WEBHOOK_URL ||
      'https://n8nprueba.serveftp.com/webhook-test/api/reserva'; // <--- CORREGIDO
    
    console.log('🔗 Enviando a n8n:', WEBHOOK_URL)

// ... (resto del código igual)
    
    // Hacer la petición a n8n desde el servidor (sin CORS)
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reservationData: body,
        timestamp: new Date().toISOString(),
        source: 'web-frontend-proxy'
      })
    })
    
    console.log('📡 Respuesta de n8n - Status:', response.status)
    
    // Leer la respuesta de n8n
    const textResponse = await response.text()
    console.log('📄 Respuesta de n8n - Texto:', textResponse)
    
    // Si n8n respondió con error HTTP
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Error de n8n: ${response.status}`,
          details: textResponse 
        },
        { status: response.status }
      )
    }
    
    // Intentar parsear la respuesta como JSON
    let jsonResponse
    try {
      jsonResponse = textResponse ? JSON.parse(textResponse) : {}
    } catch (e) {
      // Si n8n no devolvió JSON pero respondió OK
      jsonResponse = {
        success: true,
        reservation_id: `N8N-${Date.now()}`,
        message: 'Reserva procesada (n8n no devolvió JSON)'
      }
    }
    
    console.log('✅ Respuesta exitosa de n8n')
    
    // Devolver la respuesta al frontend
    return NextResponse.json(jsonResponse)
    
  } catch (error: any) {
    console.error('❌ Error en API Route:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Error al procesar la reserva',
        details: error.toString()
      },
      { status: 500 }
    )
  }
}

// Manejar peticiones OPTIONS (preflight de CORS)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}