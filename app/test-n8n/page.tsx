// app/test-n8n/page.tsx
'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function TestN8nPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTest = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/test-n8n')
      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Error desconocido')
        setResult(data)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-4">
          <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Test de Conexión n8n
          </span>
        </h1>

        <p className="text-center text-gray-300 mb-12 text-lg">
          Verifica que tu webhook de n8n esté funcionando correctamente
        </p>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-purple-500/30 shadow-2xl backdrop-blur mb-8">
          <button
            onClick={handleTest}
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Probando...
              </>
            ) : (
              'Probar Conexión'
            )}
          </button>
        </div>

        {/* Resultado exitoso */}
        {result && !error && (
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-3xl p-8 border-2 border-green-500/50 shadow-2xl backdrop-blur mb-8">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-green-300 mb-2">¡Conexión Exitosa! ✅</h2>
                <p className="text-green-200 mb-4">El webhook de n8n está funcionando correctamente.</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 text-sm font-mono text-gray-300 overflow-auto max-h-48">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-gradient-to-br from-red-900/40 to-pink-900/40 rounded-3xl p-8 border-2 border-red-500/50 shadow-2xl backdrop-blur mb-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-red-300 mb-2">Error de Conexión ❌</h2>
                <p className="text-red-200 mb-4">{error}</p>
              </div>
            </div>

            {result && (
              <div className="bg-slate-900/50 rounded-xl p-4 text-sm font-mono text-gray-300 overflow-auto max-h-48">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}

            <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-xl">
              <h3 className="font-bold text-yellow-300 mb-2">📋 Checklist de solución:</h3>
              <ul className="text-yellow-200 text-sm space-y-2">
                <li>✓ Verifica que el archivo <code className="bg-slate-900 px-2 py-1 rounded">.env.local</code> exista en la carpeta frontend</li>
                <li>✓ Comprueba que <code className="bg-slate-900 px-2 py-1 rounded">N8N_WEBHOOK_URL</code> sea correcta</li>
                <li>✓ Verifica que el webhook esté activo en n8n</li>
                <li>✓ Comprueba la conectividad a internet</li>
                <li>✓ Reinicia el servidor Next.js: <code className="bg-slate-900 px-2 py-1 rounded">npm run dev</code></li>
              </ul>
            </div>
          </div>
        )}

        {/* Información útil */}
        <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-3xl p-8 border-2 border-blue-500/50 shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-bold text-blue-300 mb-4">📌 Información de Configuración</h2>
          
          <div className="space-y-4 text-blue-200 text-sm">
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="font-bold text-blue-300 mb-2">1️⃣ Archivo .env.local:</p>
              <code className="text-xs block bg-slate-800 p-3 rounded text-gray-300 overflow-auto">
                N8N_WEBHOOK_URL=https://tu-dominio/webhook/limpieza-reserva
              </code>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="font-bold text-blue-300 mb-2">2️⃣ Ubicación correcta:</p>
              <code className="text-xs block text-gray-300">
                frontend/.env.local
              </code>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="font-bold text-blue-300 mb-2">3️⃣ Después de crear/editar:</p>
              <code className="text-xs block text-gray-300">
                Reinicia el servidor: npm run dev
              </code>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}