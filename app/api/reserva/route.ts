// app/api/reserva/route.ts
// Este archivo crea un "intermediario" entre tu frontend y n8n
// Resuelve problemas de CORS porque las peticiones van de servidor a servidor

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('📥 API Route POST: Reserva recibida')
  
  try {
    const body = await request.json()
    console.log('📦 Datos recibidos:', JSON.stringify(body, null, 2))
    
    // URL de n8n desde variables de entorno
    // Permitimos fallback a la variante pública para entornos locales mal configurados
    const WEBHOOK_URL =
      process.env.N8N_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
      'https://n8nprueba.serveftp.com/webhook/api/reserva'
    
    console.log('🔍 URL Webhook:', WEBHOOK_URL)
    
    if (!WEBHOOK_URL) {
      throw new Error(
        'N8N_WEBHOOK_URL no está configurada. Añade N8N_WEBHOOK_URL=https://n8nprueba.serveftp.com/webhook/api/reserva en frontend/.env.local y reinicia el servidor.'
      )
    }

    console.log('🔗 Enviando datos a n8n...')

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...body,
        timestamp: new Date().toISOString(),
        source: 'limpieza-facil-app'
      })
    })

    console.log('📡 Status de respuesta:', response.status, response.statusText)
    
    const responseText = await response.text()
    console.log('📡 Respuesta raw:', responseText)
    
    if (!response.ok) {
      console.error('❌ Error de n8n - Status:', response.status)
      console.error('❌ Respuesta de error:', responseText)
      throw new Error(`n8n error ${response.status}: ${responseText || response.statusText}`)
    }

    let jsonResponse: any = {}
    try {
      jsonResponse = responseText ? JSON.parse(responseText) : {}
    } catch (e) {
      console.log('⚠️ No se pudo parsear JSON, usando valores por defecto')
      jsonResponse = {
        success: true,
        reservation_id: `RES-${Date.now()}`,
        message: 'Reserva procesada correctamente'
      }
    }

    console.log('✅ Reserva exitosa:', jsonResponse)
    
    return NextResponse.json({
      success: true,
      reservation_id: jsonResponse.reservation_id || `RES-${Date.now()}`,
      ...jsonResponse
    }, { status: 200 })

  } catch (error: any) {
    console.error('❌ Error completo:', error)
    console.error('❌ Error mensaje:', error.message)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hint: 'Verifica la URL de n8n y que el webhook esté activo'
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}