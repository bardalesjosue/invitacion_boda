import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const Gifts: React.FC = () => {
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
      className="w-full max-w-[500px] bg-wedding-cream rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-wedding-gold/15 overflow-hidden relative z-10 my-4 flex flex-col items-center select-none"
      style={{
        backgroundImage: "url('/images/fondo-base.png')",
        backgroundSize: '100% auto',
        backgroundRepeat: 'repeat-y',
      }}
    >
      {/* Card Content Wrapper */}
      <div ref={contentRef} className="w-full flex flex-col items-center px-6 pb-10">
        {/* Flores Garland Top Spacer */}
        <div className="h-[40px] w-full"></div>

        {/* 1. Nuestra Boda Title */}
        <div className="flex flex-col items-center justify-center px-4 w-full mt-[8px]">
          <span className="font-allura text-[24px] text-[#B58C28] leading-none text-center">
            Nuestra Boda
          </span>
          <div className="relative flex items-center justify-center w-[100px] mt-[6px] mb-[12px]">
            <div className="w-full h-[2px] bg-[#9CB29B] rounded-full"></div>
            <span className="absolute bg-[#FAF9F6] px-2 text-[#C8A14B] text-[14px] font-sans">
              ♥
            </span>
          </div>
        </div>

        {/* 2. REGALOS TITLE */}
        <div className="flex flex-col items-center justify-center px-4 w-full mt-[8px]">
          <h2 className="font-serif text-[32px] md:text-[36px] font-semibold text-[#394D3B] tracking-[4px] uppercase leading-none text-center select-none">
            Mesa de Regalos
          </h2>
          {/* Gold Ornament Divider */}
          <div className="flex items-center justify-center mt-[8px] mb-[18px] text-[#C8A14B]">
            <svg
              className="w-[100px] h-[10px] opacity-80"
              viewBox="0 0 100 10"
              fill="none"
              stroke="currentColor"
            >
              <path d="M5 5h35M60 5h35" strokeWidth="1" strokeLinecap="round" />
              <circle cx="50" cy="5" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* 3. Elegant Text Card */}
        <div className="w-full max-w-[420px] mt-[8px] px-1 flex flex-col gap-4">
          <div className="bg-[#FDFBF7] border border-[#E8DCC4] rounded-[20px] p-6 shadow-[0_6px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center relative">
            <div className="text-[#394D3B]/40 mb-2.5 text-xl">🌿</div>

            <p className="font-serif text-[16px] font-semibold text-[#454545] leading-[1.5] text-center max-w-[360px] select-none italic mb-3">
              "Agradecemos de corazón el cariño que deseas tener con nosotros."
            </p>

            <p className="font-serif text-[14px] font-medium text-[#555] leading-[1.6] text-center max-w-[360px] select-none mb-4">
              Si deseas obsequiarnos algo, preferimos que sea en{' '}
              <span className="font-bold text-[#394D3B]">efectivo</span>. Será de gran ayuda para
              construir nuestro futuro juntos, y el monto queda enteramente a tu criterio: lo
              importante para nosotros es celebrar este día junto a ti.
            </p>

            <div className="w-full border-t border-[#E8DCC4] my-3"></div>

            <p className="font-serif text-[14px] font-semibold text-[#394D3B] leading-[1.5] text-center max-w-[360px] select-none">
              ¡Nos hace muy felices compartir este momento contigo!
            </p>

            <div className="text-[#394D3B]/40 mt-3 text-xl rotate-180">🌿</div>
          </div>

          {/* Lluvia de Sobres Card */}
          <div className="bg-[#FDFBF7] border border-[#E8DCC4] rounded-[20px] p-4.5 shadow-[0_6px_15px_rgba(0,0,0,0.03)] flex items-start gap-4">
            <div className="p-2.5 bg-[#394D3B]/10 rounded-xl text-[#394D3B] shrink-0">
              <svg
                className="w-5.5 h-5.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-[#394D3B] text-[13px] uppercase tracking-wider mb-0.5">
                Buzón de Sobres
              </h3>
              <p className="font-serif text-[13px] text-[#555] leading-[1.4]">
                En la recepción tendremos un buzón especial donde podrás dejar tu sobre.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
