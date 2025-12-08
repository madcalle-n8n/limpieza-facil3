// components/AccessibilityBar.tsx
'use client'

import { useState, useEffect } from 'react'
import { Text, Contrast, Volume2, X } from 'lucide-react'

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal')
  const [highContrast, setHighContrast] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const body = document.body
    body.className = body.className.replace(/font-size-\w+/g, '')
    body.classList.add(`font-size-${fontSize}`)
    
    if (highContrast) {
      body.classList.add('high-contrast')
    } else {
      body.classList.remove('high-contrast')
    }
  }, [fontSize, highContrast])

  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-800 text-white py-3 border-b border-purple-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Accesibilidad
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded transition-colors"
          >
            {isOpen ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 pt-4 border-t border-purple-700 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Text className="w-4 h-4" />
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value as any)}
                className="text-sm bg-purple-700 border border-purple-600 rounded px-2 py-1 text-white cursor-pointer"
              >
                <option value="normal">Normal</option>
                <option value="large">Grande</option>
                <option value="xlarge">Muy Grande</option>
              </select>
            </div>

            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-all ${
                highContrast 
                  ? 'bg-orange-600' 
                  : 'bg-purple-700'
              }`}
            >
              <Contrast className="w-4 h-4" />
              {highContrast ? 'ON' : 'OFF'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}