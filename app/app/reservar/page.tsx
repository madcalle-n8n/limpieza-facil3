import BookingWidget from '@/components/BookingWidget'

export default function ReservarPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      {/* El BookingWidget ya contiene toda la lógica. 
         Lo envolvemos en un div con padding-top (pt-24) para que no quede oculto tras la Navbar fija.
      */}
      <div className="w-full">
        <BookingWidget />
      </div>
    </div>
  )
}