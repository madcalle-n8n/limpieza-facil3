import HowItWorks from '@/components/HowItWorks'

export default function ComoFuncionaPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
             Así funciona Limpieza Fácil
           </h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
             Transparencia y sencillez en cada paso del proceso.
           </p>
        </div>
        
        {/* Usamos el componente existente */}
        <HowItWorks />
      </div>
    </div>
  )
}