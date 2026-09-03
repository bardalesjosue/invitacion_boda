import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useAppStore } from '@/store/useAppStore'

export const Envelope: React.FC = () => {
  const navigate = useNavigate()
  const { isPlayingMusic, setPlayingMusic, invitationData } = useAppStore()
  const [isOpening, setIsOpening] = useState(false)

  const envelopeRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<SVGSVGElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleOpenEnvelope = () => {
    if (isOpening) return
    setIsOpening(true)
    setPlayingMusic(true) // Automatically start music when opened

    const tl = gsap.timeline({
      onComplete: () => {
        // Navigate to the full invitation layout after the animation ends
        navigate('/invitation')
      },
    })

    // Animation timeline
    tl.to(sealRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    })
      .to(
        flapRef.current,
        {
          transformOrigin: 'top center',
          scaleY: -1,
          zIndex: 5,
          duration: 0.6,
          ease: 'power1.inOut',
        },
        '-=0.1',
      )
      .to(
        cardRef.current,
        {
          y: '-80%',
          zIndex: 20,
          duration: 1.0,
          ease: 'power2.out',
        },
        '-=0.1',
      )
      .to(
        wrapperRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '-=0.2',
      )
  }

  const toggleMusic = () => {
    setPlayingMusic(!isPlayingMusic)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-wedding-cream">
      {/* Decorative Top Leaf Garland */}
      <div className="absolute top-0 inset-x-0 flex justify-between pointer-events-none opacity-80 max-w-5xl mx-auto">
        <svg
          className="w-40 h-40 md:w-56 md:h-56 text-wedding-earth fill-current transform rotate-12 -translate-y-4 -translate-x-4"
          viewBox="0 0 100 100"
        >
          <path d="M10,90 Q30,60 70,30 Q40,30 20,60 Z" />
          <path d="M30,70 Q50,45 80,20 Q60,25 40,50 Z" />
          <path d="M50,50 Q70,30 90,10 Q75,18 60,35 Z" />
        </svg>
        <svg
          className="w-40 h-40 md:w-56 md:h-56 text-wedding-earth fill-current transform -scale-x-100 rotate-12 -translate-y-4 translate-x-4"
          viewBox="0 0 100 100"
        >
          <path d="M10,90 Q30,60 70,30 Q40,30 20,60 Z" />
          <path d="M30,70 Q50,45 80,20 Q60,25 40,50 Z" />
          <path d="M50,50 Q70,30 90,10 Q75,18 60,35 Z" />
        </svg>
      </div>

      {/* Main Header */}
      <div className="text-center z-10 flex flex-col items-center select-none mt-2">
        <span className="font-allura text-[34px] text-[#B58C28] leading-none mb-10 block">
          Nuestra Boda
        </span>
        <h1 className="font-brittany text-6xl md:text-8xl text-wedding-earth mb-2">Josué</h1>
        <span className="font-brittany text-4xl md:text-5xl text-[#B58C28] my-1 block">&</span>
        <h1 className="font-brittany text-6xl md:text-8xl text-wedding-earth mb-4">Mariela</h1>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-wedding-gold">
          <span className="h-[1px] w-8 bg-wedding-gold/30"></span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path
              d="M12,22 C12,22 4,16 4,10 C4,6 7,3 12,3 C17,3 20,6 20,10 C20,16 12,22 12,22 Z"
              className="hidden"
            />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="h-[1px] w-8 bg-wedding-gold/30"></span>
        </div>
      </div>

      {/* Interactive 3D Envelope Wrapper */}
      <div
        ref={wrapperRef}
        className="relative my-8 w-full max-w-[440px] aspect-[4/3] z-20 flex items-center justify-center select-none"
      >
        <div
          ref={envelopeRef}
          className="relative w-full h-full bg-[#EAE5D8] rounded shadow-xl overflow-visible"
        >
          {/* Inner Card (slides out) */}
          <div
            ref={cardRef}
            className="absolute inset-x-4 top-2 bottom-2 rounded shadow-2xl p-4 flex flex-col items-center justify-center border border-wedding-gold/10 z-10 transition-transform overflow-hidden bg-wedding-cream"
            style={{
              backgroundImage: "url('/images/fondo.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col items-center justify-center mt-4 text-center z-10 select-none">
              {/* Parents Section */}
              <span className="font-sans text-[6px] tracking-[0.15em] text-[#C8A14B] uppercase mb-0.5 font-bold">
                Con la bendición de Dios y nuestros padres
              </span>
              <div className="flex justify-center items-center gap-1.5 mb-2 text-[7px] font-serif text-[#394D3B]/80 font-bold">
                <span>Eric Bardales Mirian Erazo</span>
                <span className="text-[#9FB5A4]">•</span>
                <span>Reina Cruz</span>
              </div>

              <span className="font-sans text-[8px] tracking-[0.25em] text-[#C8A14B] uppercase mb-1.5 font-semibold">
                Nuestra Boda
              </span>
              <h2
                className="font-brittany text-[34px] text-[#394D3B] leading-none"
                style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.08)' }}
              >
                Josué
              </h2>
              <span className="font-brittany text-[20px] text-[#394D3B] my-1 leading-none">y</span>
              <h2
                className="font-brittany text-[34px] text-[#394D3B] leading-none"
                style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.08)' }}
              >
                Mariela
              </h2>
              <div className="w-[80px] h-[1px] bg-[#9FB5A4] rounded-full my-2.5"></div>
              <p className="font-serif text-[9px] font-semibold text-[#2F2F2F] uppercase tracking-[1.5px] leading-relaxed">
                Es un honor invitarte
                <br />a la celebración
              </p>

              {/* Family Personalization */}
              {invitationData && (
                <div className="mt-2 flex flex-col items-center">
                  <span className="font-sans text-[6px] tracking-[0.1em] text-[#394D3B]/70 uppercase font-semibold">
                    Para:
                  </span>
                  <p className="font-serif text-[11px] font-bold text-[#394D3B] italic capitalize tracking-normal mt-0.5 max-w-[220px] truncate">
                    {invitationData.nombreFamilia}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Envelope Flap (Top Triangle) */}
          <svg
            ref={flapRef}
            className="absolute top-0 inset-x-0 w-full h-[55%] z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] filter"
            viewBox="0 0 100 55"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 50,55" fill="#FAF6EC" />
            {/* Monogram inside the flap */}
            <text
              x="50"
              y="22"
              textAnchor="middle"
              fill="#6B7A52"
              fontSize="6"
              fontFamily="Cinzel, Georgia, serif"
              letterSpacing="1"
            >
              M & J
            </text>
            <text x="50" y="30" textAnchor="middle" fill="#C9A227" fontSize="4">
              ♥
            </text>
          </svg>

          {/* Left, Right and Bottom folds (CSS Overlay shapes) */}
          <div className="absolute inset-0 z-[25] pointer-events-none">
            {/* Left triangle */}
            <svg
              className="absolute inset-y-0 left-0 h-full w-[55%] filter drop-shadow-[2px_0_3px_rgba(0,0,0,0.08)]"
              viewBox="0 0 55 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 55,50 0,100" fill="#FAF6EC" />
            </svg>
            {/* Right triangle */}
            <svg
              className="absolute inset-y-0 right-0 h-full w-[55%] filter drop-shadow-[-2px_0_3px_rgba(0,0,0,0.08)]"
              viewBox="0 0 55 100"
              preserveAspectRatio="none"
            >
              <polygon points="55,0 0,50 55,100" fill="#FAF6EC" />
            </svg>
            {/* Bottom triangle */}
            <svg
              className="absolute bottom-0 inset-x-0 w-full h-[55%] filter drop-shadow-[0_-3px_5px_rgba(0,0,0,0.1)]"
              viewBox="0 0 100 55"
              preserveAspectRatio="none"
            >
              <polygon points="0,55 100,55 50,0" fill="#FAF6EC" />
            </svg>
          </div>

          {/* Wax Seal Button (click trigger) */}
          <div
            ref={sealRef}
            onClick={handleOpenEnvelope}
            className="absolute top-[48%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-40 w-16 h-16 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
          >
            {/* Realistic wax seal effect using metallic gold radial gradients */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D8B44A] via-[#C9A227] to-[#A07C16] border border-[#8C6B10] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-1 rounded-full border border-dashed border-[#8C6B10]/40"></div>
              {/* Embossed Leaf logo */}
              <svg
                className="w-8 h-8 text-[#FAF6EC] opacity-95 filter drop-shadow-[1px_1px_1px_rgba(0,0,0,0.4)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  className="hidden"
                />
                <path
                  d="M17 8c-.7 0-1.37.1-2 .29V4c0-1.1-.9-2-2-2s-2 .9-2 2v5.12c-.93-.84-2.12-1.37-3.44-1.37-2.6 0-4.66 2.37-4.12 5.06C4.01 15.65 6.22 18 9 18c2.6 0 4.66-2.37 4.12-5.06l1.24-1.24c.73.47 1.62.74 2.57.74.83 0 1.61-.21 2.3-.57l1.34 1.34c.27.27.7.27.97 0s.27-.7 0-.97L17 8z"
                  className="hidden"
                />
                {/* Branch icon path */}
                <path d="M12.5 19.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm.35-4.24l.71-.71c.2-.2.2-.51 0-.71L12.5 12.8c-.2-.2-.51-.2-.71 0l-.71.71c-.2.2-.2.51 0 .71l1.06 1.06c.2.18.51.18.71-.02zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.72 13.78l-1.06-1.06c-.39-.39-.39-1.02 0-1.41l1.41-1.41c.39-.39 1.02-.39 1.41 0l1.06 1.06c.39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom instructions and quotes */}
      <div className="flex flex-col items-center gap-6 z-10 text-center select-none">
        <div className="flex flex-col items-center">
          <span className="font-serif text-[15px] tracking-[5px] text-wedding-gold font-bold uppercase animate-pulse">
            Haz clic para abrir
          </span>
          <span className="text-wedding-gold/60 text-xs mt-1.5">▼</span>
        </div>

        <div className="max-w-xs mx-auto border-t border-wedding-gold/20 pt-4 px-2">
          <p className="font-serif italic text-[14.5px] font-semibold text-wedding-earth leading-relaxed">
            "Y sobre todo, vístanse de amor, que es el vínculo perfecto."
          </p>
          <span className="block font-sans text-[9px] tracking-wider text-gray-500 uppercase mt-2">
            Colosenses 3:14
          </span>
        </div>

        {/* Music Control Action */}
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-wedding-gold/50 bg-white hover:bg-[#C9A227] hover:text-white hover:border-[#C9A227] text-[#B58D1F] font-sans text-[11px] font-medium tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
        >
          <span className="text-sm">{isPlayingMusic ? '🔊' : '🔇'}</span>
          <span>{isPlayingMusic ? 'Pausar música' : 'Activar música'}</span>
        </button>
      </div>
    </div>
  )
}
