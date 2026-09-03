import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Photo {
  url: string
  title: string
  aspect: string
}

const PHOTOS: Photo[] = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    title: 'Nuestra Historia',
    aspect: 'aspect-[4/5]',
  },
  {
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
    title: 'Cómplices',
    aspect: 'aspect-square',
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
    title: 'Promesa de Amor',
    aspect: 'aspect-[3/4]',
  },
  {
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop',
    title: 'Hacia el Futuro',
    aspect: 'aspect-video',
  },
]

export const GalleryPage: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

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
    <>
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
        <div ref={contentRef} className="w-full flex flex-col items-center px-6">
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

          {/* 2. GALLERY TITLE */}
          <div className="flex flex-col items-center justify-center px-4 w-full mt-[14px]">
            <h2 className="font-serif text-[38px] md:text-[42px] font-semibold text-[#394D3B] tracking-[4px] md:tracking-[6px] uppercase leading-none text-center select-none">
              Galería
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

          {/* 3. Photos Grid */}
          <div className="w-full max-w-[480px] mt-[10px] pb-[40px] grid grid-cols-2 gap-4">
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto(photo.url)}
                className={`bg-[#FDFBF7] border border-[#E8DCC4] rounded-xl p-2.5 shadow-[0_6px_15px_rgba(0,0,0,0.04)] flex flex-col hover:scale-[1.03] transition-all duration-300 cursor-pointer ${
                  i === 3 ? 'col-span-2' : ''
                }`}
              >
                <div
                  className={`w-full ${photo.aspect} overflow-hidden rounded-lg border border-[#E8DCC4]/50 bg-gray-100`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2 pb-0.5 text-center">
                  <span className="font-allura text-[19px] text-[#394D3B] leading-none block">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-wedding-gold transition cursor-pointer"
          >
            ✕
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-[85vh] overflow-hidden rounded-xl shadow-2xl border border-wedding-gold/15 bg-wedding-dark"
          >
            <img
              src={selectedPhoto}
              alt="Zoomed"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
