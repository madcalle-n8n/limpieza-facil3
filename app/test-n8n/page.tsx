// app/test-n8n/page.tsx
'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Wifi, Server } from 'lucide-react'

export default function TestN8NPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testN8N = async () => {
    setLoading(true)
    
    try {
      const testData = {
        test: true,
        message: "Prueba de conexión desde Limpieza Fácil",
        timestamp: new Date().toISOString(),
        source: "test-page"
      }

      const response = await fetch('https://n8nprueba.serveftp.com/webhook/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      })

      setResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        url: 'https://n8nprueba.serveftp.com/webhook/reserva',
        timestamp: new Date().toLocaleTimeString()
      })

    } catch (error: any) {
      setResult({
        success: false,
        error: error.message,
        url: 'https://n8nprueba.serveftp.com/webhook/reserva'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 flex items-center">
          <Server className="w-10 h-10 mr-4 text-blue-600" />
          Prueba de Conexión n8n
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <Wifi className="w-8 h-8 mr-3 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Estado de conexión</h2>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="font-medium">URL de n8n:</span>
              <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                n8nprueba.serveftp.com
              </code>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="font-medium">Endpoint:</span>
              <code className="bg-green-100 text-green-800 px-3 py-1 rounded">
                /webhook/reserva
              </code>
            </div>
          </div>

          <button
            onClick={testN8N}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Probando conexión...
              </>
            ) : (
              <>
                <Wifi className="w-6 h-6 mr-3" />
                Probar Conexión con n8n
              </>
            )}
          </button>
        </div>

        {result && (
          <div className={`rounded-3xl p-8 border-2 ${
            result.success 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
              : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
          }`}>
            <div className="flex items-center mb-6">
              {result.success ? (
                <CheckCircle className="w-10 h-10 text-green-600 mr-4" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600 mr-4" />
              )}
              <h3 className="text-2xl font-bold">
                {result.success ? '✅ Conexión Exitosa' : '❌ Error de Conexión'}
              </h3>
            </div>
            
            <pre className="bg-black/5 p-6 rounded-xl overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
            
            <div className="mt-6 text-center text-gray-600">
              {result.success 
                ? '🎉 Tu n8n está listo para recibir reservas desde Limpieza Fácil'
                : '⚠️ Verifica que tu n8n esté corriendo y sea accesible desde internet'}
            </div>
          </div>
        )}

        <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <h4 className="text-lg font-bold text-blue-900 mb-3">📋 Próximos pasos</h4>
          <ol className="list-decimal pl-5 space-y-2 text-blue-800">
            <li>Verifica que el botón "Confirmar Reserva" funcione</li>
            <li>Revisa los logs de tu n8n para ver las reservas entrantes</li>
            <li>Configura las respuestas automáticas de Telegram</li>
            <li>Prueba el flujo completo: Web → n8n → Google Calendar → Telegram</li>
          </ol>
        </div>
      </div>
    </div>
  )
}