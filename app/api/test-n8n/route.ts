import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const webhookUrl =
    process.env.N8N_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    'https://n8nprueba.serveftp.com/webhook/api/reserva'

  console.log('🧪 TEST N8N WEBHOOK')
  console.log('━'.repeat(60))
  console.log('URL:', webhookUrl)
  console.log('━'.repeat(60))

  if (!webhookUrl) {
    return NextResponse.json(
      { 
        success: false,
        error: 'N8N_WEBHOOK_URL no está configurada en .env.local',
        hint: 'Verifica que .env.local exista en la carpeta frontend con: N8N_WEBHOOK_URL=https://tu-url-aqui'
      },
      { status: 400 }
    )
  }

  try {
    console.log('📤 Enviando solicitud de prueba a:', webhookUrl)
    
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Prueba de conexión desde Next.js',
      plan: 'test',
      date: new Date().toISOString(),
      time: '10:00',
      customer: {
        name: 'Test User',
        phone: '+34600123456',
        email: 'test@example.com',
        address: 'Calle Test 123',
        specialInstructions: 'Esta es una prueba',
        accessibilityNeeds: false
      }
    }

    console.log('📦 Datos de prueba:', JSON.stringify(testData, null, 2))

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData)
    })

    console.log('📡 Status:', response.status)
    console.log('📡 Status Text:', response.statusText)

    const responseText = await response.text()
    console.log('📡 Response Body:', responseText)

    let parsedResponse = {}
    try {
      parsedResponse = responseText ? JSON.parse(responseText) : { message: 'Sin respuesta del servidor' }
    } catch (e) {
      parsedResponse = { raw_response: responseText }
    }

    if (response.ok) {
      console.log('✅ Test exitoso')
      return NextResponse.json({
        success: true,
        message: '✅ Conexión con n8n exitosa',
        status: response.status,
        url: webhookUrl,
        response: parsedResponse
      }, { status: 200 })
    } else {
      console.error('❌ Error del servidor n8n')
      return NextResponse.json(
        {
          success: false,
          error: `Error ${response.status}: ${response.statusText}`,
          hint: 'Verifica que la URL sea correcta y que el webhook esté activo en n8n',
          url: webhookUrl,
          status: response.status,
          response: parsedResponse,
          checklist: [
            '✓ ¿La URL es correcta?',
            '✓ ¿El webhook está activo en n8n?',
            '✓ ¿El método es POST?',
            '✓ ¿Hay espacios en blanco en la URL?',
            '✓ ¿Es HTTP o HTTPS?'
          ]
        },
        { status: response.status }
      )
    }
  } catch (error: any) {
    console.error('❌ Error de conexión:', error.message)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hint: 'Posible error de red o URL inválida',
        url: webhookUrl,
        possible_issues: [
          'Conexión a internet no disponible',
          'URL mal escrita o con espacios',
          'Certificado SSL inválido',
          'CORS bloqueado',
          'Firewall bloqueando la conexión'
        ]
      },
      { status: 500 }
    )
  }
}
