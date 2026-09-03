import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

export const PublicLayout: React.FC = () => {
  const { isPlayingMusic, setPlayingMusic } = useAppStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize background music globally
  useEffect(() => {
    audioRef.current = new Audio('/audio/wedding-song.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.25 // Set volume to a softer, more elegant level (25%)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Sync music store state to actual audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.play().catch((err) => console.log('Audio playback blocked:', err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlayingMusic])

  const toggleMusic = () => {
    setPlayingMusic(!isPlayingMusic)
  }

  return (
    <div className="relative min-h-screen bg-[#12221A] text-wedding-cream antialiased selection:bg-wedding-gold selection:text-wedding-dark">
      {/* Floating Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-wedding-gold/30 bg-[#FAF9F6]/10 backdrop-blur-md text-wedding-gold hover:bg-[#FAF9F6]/20 transition-all duration-300 shadow-lg active:scale-95 select-none cursor-pointer"
        title={isPlayingMusic ? 'Pausar música' : 'Reproducir música'}
      >
        <span className="text-base">{isPlayingMusic ? '🔊' : '🔇'}</span>
      </button>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}
