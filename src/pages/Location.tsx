import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const Location: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intro animation flow using GSAP
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.98,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
      },
    ).fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      '-=0.45',
    )
  }, [])

  return (
    <div
      ref={cardRef}
      className="w-full max-w-[600px] bg-wedding-cream rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-wedding-gold/15 overflow-hidden relative z-10 my-4 flex flex-col items-center select-none"
      style={{
        backgroundImage: "url('/images/fondo-base.png')",
        backgroundSize: '100% auto',
        backgroundRepeat: 'repeat-y',
      }}
    >
      {/* Card Content Wrapper */}
      <div ref={contentRef} className="w-full flex flex-col items-center">
        {/* Flores Garland Top Spacer */}
        <div className="h-[40px] w-full"></div>

        {/* 1. Nuestra Boda Title */}
        <div className="flex flex-col items-center justify-center px-4 w-full mt-[8px]">
          <span className="font-allura text-[28px] text-[#B58C28] leading-none text-center">
            Nuestra Boda
          </span>
          <div className="relative flex items-center justify-center w-[120px] mt-[6px] mb-[12px]">
            <div className="w-full h-[2px] bg-[#9CB29B] rounded-full"></div>
            <span className="absolute bg-[#FAF9F6] px-2 text-[#C8A14B] text-[16px] font-sans">
              ♥
            </span>
          </div>
        </div>

        {/* 2. UBICACIÓN */}
        <div className="flex flex-col items-center justify-center px-4 w-full mt-[14px]">
          <h2 className="font-serif text-[42px] font-semibold text-[#394D3B] tracking-[6px] uppercase leading-none text-center select-none">
            UBICACIÓN
          </h2>
          {/* Gold Ornament Divider */}
          <div className="flex items-center justify-center mt-[8px] mb-[22px] text-[#C8A14B]">
            <svg
              className="w-[140px] h-[15px] opacity-80"
              viewBox="0 0 140 15"
              fill="none"
              stroke="currentColor"
            >
              <path d="M10 7.5h40M90 7.5h40" strokeWidth="1" strokeLinecap="round" />
              <path
                d="M50 7.5c5-5 12-5 16 0s12 5 16 0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="70" cy="7.5" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* 3. Fotografía */}
        <div className="w-[90%] max-w-[480px] px-1 mt-[28px]">
          <img
            src="/images/hotel.png"
            alt="Hotel Monteolivos"
            className="w-full aspect-[16/10] object-cover rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-[#E8DCC4]"
          />
        </div>

        {/* 4. Hotel Name */}
        <div className="w-full flex flex-col items-center justify-center px-6 mt-[22px]">
          <h3 className="font-allura text-[32px] font-normal text-[#394D3B] leading-none text-center select-none">
            Hotel Monteolivos
          </h3>
          {/* Gold Ornament Line */}
          <div className="w-[140px] h-[1.5px] bg-[#C8A14B] mt-[8px] mb-[15px] rounded-full"></div>

          {/* Dirección */}
          <div className="text-center font-serif text-[16px] font-semibold text-[#2F2F2F] tracking-[0.5px] leading-[1.5] mt-[11px] px-4">
            10 Calle, 15 Avenida SO
            <br />
            Barrio Suyapa
            <br />
            San Pedro Sula
            <br />
            Honduras
          </div>
        </div>
        {/* 7. Fecha block */}
        <div className="w-full max-w-[480px] px-4 mt-[25px] flex items-center justify-center">
          <div className="grid grid-cols-[1fr_auto_1.2fr_auto_1fr] items-center justify-items-center w-full">
            {/* Left Column: VIERNES */}
            <div className="flex flex-col items-center justify-center text-center gap-1">
              <svg
                className="w-[28px] h-[28px] text-[#394D3B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
              </svg>
              <span className="font-serif text-[15px] font-semibold text-[#2E2E2E] uppercase tracking-wide">
                Viernes
              </span>
            </div>

            {/* Left vertical divider */}
            <div className="h-[70px] w-[1px] bg-[#C8A14B]/40 relative flex items-center justify-center mx-2 md:mx-3">
              <div className="w-[4px] h-[4px] rounded-full bg-[#C8A14B]"></div>
            </div>

            {/* Center Column: 4 Diciembre 2026 */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-playfair text-[40px] font-bold text-[#2E2E2E] leading-none relative -top-0.5">
                4
              </span>
              <span className="font-serif text-[15px] font-semibold text-[#2E2E2E] tracking-wider uppercase -mt-1">
                Diciembre
              </span>
              <span className="font-serif text-[13px] font-semibold text-[#444] tracking-widest mt-0.5">
                2026
              </span>
            </div>

            {/* Right vertical divider */}
            <div className="h-[70px] w-[1px] bg-[#C8A14B]/40 relative flex items-center justify-center mx-2 md:mx-3">
              <div className="w-[4px] h-[4px] rounded-full bg-[#C8A14B]"></div>
            </div>

            {/* Right Column: 6:00 PM HRS */}
            <div className="flex flex-col items-center justify-center text-center gap-1">
              <svg
                className="w-[28px] h-[28px] text-[#394D3B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[15px] font-semibold text-[#2E2E2E] tracking-wide uppercase">
                  6:00 PM
                </span>
                <span className="font-serif text-[13px] font-semibold text-[#666] tracking-wide mt-0.5">
                  HRS.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Código de vestimenta */}
        <div className="w-[90%] max-w-[480px] mt-[30px] p-5 rounded-[22px] border border-[#E8DCC4] bg-[#FAF8F2] flex flex-col items-center justify-center text-center">
          <span className="font-sans text-[10px] tracking-[2px] text-[#C8A14B] uppercase font-bold mb-2">
            — Código de Vestimenta —
          </span>
          <span className="font-serif text-[18px] font-bold text-[#394D3B] tracking-[0.5px]">
            Formal
          </span>
        </div>

        {/* 8. Botón Google Maps */}
        <div className="w-full flex flex-col items-center justify-center mt-[28px] pb-[40px] px-6">
          <a
            href="https://www.google.com/maps/place/Hotel+Monteolivos/@15.4987825,-88.0373766,17z/data=!4m9!3m8!1s0x8f665b669c06a4e1:0x8d07ebbbc87940fc!5m2!4m1!1i2!8m2!3d15.498816!4d-88.036163!16s%2Fg%2F1tl9nmmb?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-8 rounded-full bg-[#394D3B] text-white font-sans text-[13.5px] font-bold tracking-[2px] uppercase shadow-[0_10px_18px_rgba(57,77,59,0.25)] hover:bg-[#456149] hover:-translate-y-[3px] active:scale-95 transition-all duration-300 select-none cursor-pointer"
          >
            <span>📍</span> ABRIR EN GOOGLE MAPS
          </a>
        </div>
      </div>
    </div>
  )
}
