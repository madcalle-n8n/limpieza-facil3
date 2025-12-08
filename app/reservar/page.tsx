'use client'

import BookingWidget from '@/components/BookingWidget'

export default function ReservarPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center py-12">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8 lg:px-4">
        <BookingWidget />
      </div>
    </main>
  )
}
