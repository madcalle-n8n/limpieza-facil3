// components/HeroSection.tsx
import { Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Texto del hero */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-semibold">¡Servicio #1 en Madrid!</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Limpieza de hogar 
              <span className="text-blue-600"> fácil y accesible</span>
              para todos
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Reserva en 3 clics. Servicio profesional. Especialmente diseñado 
              para ser fácil de usar por personas mayores.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center">
                <Check className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-lg">Sin complicaciones, todo desde tu móvil</span>
              </div>
              <div className="flex items-center">
                <Check className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-lg">Personal de confianza y verificado</span>
              </div>
              <div className="flex items-center">
                <Check className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-lg">Planes flexibles por horas o suscripción</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/reservar" 
                className="btn-accessible bg-blue-600 text-white text-center px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Reservar ahora
              </Link>
              <Link 
                href="/como-funciona" 
                className="btn-accessible bg-white text-blue-600 border-2 border-blue-600 text-center px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Ver cómo funciona
              </Link>
            </div>
          </div>
          
          {/* Imagen o ilustración */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="bg-blue-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Reserva en 3 pasos:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">1</div>
                      <span className="text-lg">Elige tu plan</span>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">2</div>
                      <span className="text-lg">Selecciona fecha y hora</span>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">3</div>
                      <span className="text-lg">Confirma y listo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}