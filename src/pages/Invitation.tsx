import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { FamilyService } from '@/services/familyService'
import { CountdownClock } from '@/components/countdown/CountdownClock'
import type { Family } from '@/types'
import gsap from 'gsap'

import { Location } from './Location'
import { Gifts } from './Gifts'
import { RsvpPage } from './RsvpPage'

export const Invitation: React.FC = () => {
  const routeLocation = useLocation()
  const { inviteToken } = useAppStore()
  const [family, setFamily] = useState<Family | null>(null)
  const [loading, setLoading] = useState(!!inviteToken)
  const [scale, setScale] = useState(1)
  const [activeSection, setActiveSection] = useState('welcome')

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  // References for sections
  const sectionWelcomeRef = useRef<HTMLDivElement>(null)
  const sectionLocationRef = useRef<HTMLDivElement>(null)
  const sectionGiftsRef = useRef<HTMLDivElement>(null)
  const sectionRsvpRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inviteToken) {
      let active = true
      FamilyService.getByToken(inviteToken)
        .then((family) => {
          if (active && family) {
            setFamily(family)
          }
        })
        .catch((err) => console.error('Error fetching family details:', err))
        .finally(() => {
          if (active) {
            setLoading(false)
          }
        })
      return () => {
        active = false
      }
    }
  }, [inviteToken])

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth || window.innerWidth
        const containerHeight = containerRef.current.clientHeight || window.innerHeight

        // On mobile, fill the entire screen (cover) instead of
        // letterboxing the card so the background image reaches every edge.
        const isMobile = window.innerWidth < 768
        const scaleX = containerWidth / 550
        const scaleY = containerHeight / 800

        setScale(isMobile ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY))
      }
    }

    const timer = setTimeout(handleResize, 50)
    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Intro animations flow using GSAP
  useEffect(() => {
    if (animatedRef.current) return
    animatedRef.current = true

    const timer = setTimeout(() => {
      const tl = gsap.timeline()

      // 1. Zoom in the card container from 0.95 to 1.0
      tl.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: scale * 0.95,
        },
        {
          opacity: 1,
          scale: scale,
          duration: 0.75,
          ease: 'power2.out',
        },
      )
        // 2. Fade in names (with slide up)
        .fromTo(
          namesRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.35',
        )
        // 3. Fade in other texts (with slide up)
        .fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5',
        )
    }, 200)

    return () => clearTimeout(timer)
  }, [scale])

  // Handle scrolling navigation and hash updates
  const scrollToSection = (id: string) => {
    let element: HTMLElement | null = null
    if (id === 'welcome') element = sectionWelcomeRef.current
    else if (id === 'location') element = sectionLocationRef.current
    else if (id === 'gifts') element = sectionGiftsRef.current
    else if (id === 'rsvp') element = sectionRsvpRef.current

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  // Scroll to hash on mount or when route location changes
  useEffect(() => {
    if (routeLocation.hash) {
      const id = routeLocation.hash.replace('#', '')
      const timer = setTimeout(() => {
        scrollToSection(id)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [routeLocation])

  // Detect which section is actually visible, independent of each section's real height
  useEffect(() => {
    const sectionEntries: [string, React.RefObject<HTMLElement | null>][] = [
      ['welcome', sectionWelcomeRef],
      ['location', sectionLocationRef],
      ['gifts', sectionGiftsRef],
      ['rsvp', sectionRsvpRef],
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const match = sectionEntries.find(([, ref]) => ref.current === visible.target)
          if (match) {
            setActiveSection(match[0])
          }
        }
      },
      { root: scrollContainerRef.current, threshold: [0.5] },
    )

    sectionEntries.forEach(([, ref]) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative h-dvh w-full bg-[#12221A] text-wedding-cream overflow-hidden select-none">
      {/* Decorative Gold Stars/Flecks in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-wedding-gold/25 via-transparent to-transparent bg-gradient-to-b from-[#112019] to-[#1a2d23]"></div>

      {/* Snap Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-auto scroll-smooth snap-y snap-mandatory select-none"
      >
        {/* Section 1: Welcome / Card */}
        <section
          ref={sectionWelcomeRef}
          id="welcome"
          className="w-full h-full flex items-center justify-center snap-start relative overflow-hidden bg-transparent"
        >
          {/* Scalable Card Wrapper */}
          <div
            ref={containerRef}
            className="w-full h-full flex justify-center items-center z-10 overflow-hidden"
          >
            <div
              ref={cardRef}
              className="relative transition-all duration-300 origin-center bg-wedding-cream rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-wedding-gold/15"
              style={{
                width: '550px',
                height: '800px',
                transform: `scale(${scale})`,
                backgroundImage: "url('/images/fondo.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Gold Heart Outline */}
              <div className="absolute top-[125px] left-0 right-0 flex justify-center items-center select-none">
                <svg
                  className="w-5 h-5 text-[#C8A14B] opacity-80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              {/* Padres Section */}
              <div className="absolute top-[152px] left-0 right-0 flex flex-col items-center justify-start select-none px-6 text-center">
                <span className="font-sans text-[9px] tracking-[0.18em] text-[#8E6B23] uppercase font-bold mb-1.5">
                  Con la bendición de Dios y de nuestros padres
                </span>
                <div className="flex justify-center items-center gap-6 w-full max-w-[420px]">
                  <div className="flex-1 text-right leading-normal">
                    <p className="font-serif text-[11px] font-bold text-[#2C3E2E] tracking-[0.3px]">
                      Eric Bardales
                    </p>
                    <p className="font-serif text-[11px] font-bold text-[#2C3E2E] tracking-[0.3px] -mt-0.5">
                      Miriam Erazo
                    </p>
                  </div>
                  <div className="h-[22px] w-[1px] bg-[#E8DCC4]"></div>
                  <div className="flex-1 text-left leading-normal">
                    <p className="font-serif text-[11px] font-bold text-[#2C3E2E] tracking-[0.3px]">
                      Reina Cruz
                    </p>
                  </div>
                </div>
              </div>

              {/* Nuestra Boda Header */}
              <div className="absolute top-[225px] left-0 right-0 flex flex-col items-center justify-start select-none">
                <span className="font-serif text-[10px] tracking-[3px] text-[#8E6B23] uppercase font-bold">
                  Te invitamos a nuestra boda
                </span>
                <span className="text-[#C8A14B] text-[8px] mt-1">♥</span>
              </div>

              {/* Couple Names */}
              <div
                ref={namesRef}
                className="absolute top-[265px] left-0 right-0 flex flex-col items-center justify-start select-none"
              >
                <h1
                  className="font-brittany text-[68px] text-[#394D3B] leading-none pl-2 -translate-x-1.5"
                  style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.08)' }}
                >
                  Josué
                </h1>
                <span
                  className="font-brittany text-[34px] text-[#B58C28] leading-none my-1.5 -translate-x-1"
                  style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.06)' }}
                >
                  &
                </span>
                <h1
                  className="font-brittany text-[68px] text-[#394D3B] leading-none pr-2 -translate-x-2"
                  style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.08)' }}
                >
                  Mariela
                </h1>
              </div>

              {/* Gold Botanical Divider */}
              <div className="absolute top-[452px] left-0 right-0 flex justify-center items-center select-none">
                <svg
                  className="w-[185px] h-[16px] text-[#C8A14B]/80"
                  viewBox="0 0 100 10"
                  fill="currentColor"
                >
                  {/* Center Heart */}
                  <path d="M50 7.5l-.6-.5C47.2 5.1 46 4 46 2.7 46 1.7 46.7 1 47.7 1c.5 0 1 .3 1.3.7l1 1.2 1-1.2c.3-.4.8-.7 1.3-.7 1 0 1.7.7 1.7 1.7 0 1.3-1.2 2.4-3.4 4.3l-.6.5z" />
                  {/* Left branch */}
                  <path
                    d="M44 5c-4 0-8-.5-12-1.5-3-1-6-2.5-9-3 .5.8 1.2 1.5 2 2 3 .5 6 1.5 9 2 4 1 8 1.5 12 1.5h1v-1h-3z"
                    opacity="0.7"
                  />
                  <path
                    d="M38 3c-1.5-.5-3.5-.8-5-1.5.8-.3 1.5-.3 2.2 0 1.2.5 2.5 1 3.5 1.5-.2.4-.5.7-.7 1z"
                    opacity="0.8"
                  />
                  <path
                    d="M28 2.5c-1-.5-2.5-.8-3.5-1.5.7-.2 1.3-.2 1.8 0 .8.5 1.8 1 2.5 1.5-.2.4-.5.7-.8 1z"
                    opacity="0.8"
                  />
                  {/* Right branch */}
                  <path
                    d="M56 5c4 0 8-.5 12-1.5 3-1 6-2.5 9-3-.5.8-1.2 1.5-2 2-3 .5-6 1.5-9 2-4 1-8 1.5-12 1.5h-1v-1h3z"
                    opacity="0.7"
                  />
                  <path
                    d="M62 3c1.5-.5 3.5-.8 5-1.5-.8-.3-1.5-.3-2.2 0-1.2.5-2.5 1-3.5 1.5.2.4.5.7.7 1z"
                    opacity="0.8"
                  />
                  <path
                    d="M72 2.5c1-.5 2.5-.8 3.5-1.5-.7-.2-1.3-.2-1.8 0-.8.5-1.8 1-2.5 1.5.2.4.5.7.8 1z"
                    opacity="0.8"
                  />
                </svg>
              </div>

              {/* Fade-in Text Section */}
              <div ref={textRef} className="absolute inset-0">
                {/* Invitation Message */}
                <div className="absolute top-[478px] left-0 right-0 px-10 text-center select-none">
                  <p className="font-serif text-[11.5px] font-semibold text-[#555] tracking-[2.5px] leading-[1.75] uppercase">
                    Es un honor que nos acompañe
                    <br />
                    en este día tan especial.
                  </p>
                </div>

                {/* Family Name */}
                <div className="absolute top-[522px] left-0 right-0 px-8 text-center select-none">
                  {!loading && family && (
                    <p className="font-serif text-[15px] font-bold text-[#B58C28] italic capitalize tracking-wide leading-snug">
                      {family.nombreFamilia}
                    </p>
                  )}
                </div>

                {/* Pase Especial */}
                <div className="absolute top-[556px] left-0 right-0 text-center select-none">
                  {!loading && family && (
                    <div className="flex flex-col items-center">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#394D3B]/5 border border-[#394D3B]/10">
                        <span className="text-[8px]">🎫</span>
                        <span className="font-sans text-[7.5px] tracking-wider text-[#394D3B] uppercase font-bold">
                          {family.cantidadPermitida}{' '}
                          {family.cantidadPermitida === 1 ? 'PASE INDIVIDUAL' : `PASES PERMITIDOS`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date Card */}
                <div className="absolute top-[590px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[420px] h-[92px] bg-[#FDFBF7] border border-[#E8DCC4] rounded-[18px] shadow-[0_4px_12px_rgba(57,77,59,0.04)] flex items-center justify-between px-6 select-none">
                  {/* Left Column: VIERNES */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <span className="font-serif text-[14px] font-bold text-[#394D3B] uppercase tracking-wider">
                      Viernes
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[55px] w-[1px] bg-[#E8DCC4]"></div>

                  {/* Center Column: 4 DICIEMBRE 2026 */}
                  <div className="flex-[1.2] flex flex-col items-center justify-center text-center">
                    <span className="font-playfair text-[38px] font-bold text-[#333] leading-none">
                      4
                    </span>
                    <span className="font-serif text-[11px] font-semibold text-[#8E6B23] uppercase tracking-widest mt-0.5">
                      Diciembre
                    </span>
                    <span className="font-serif text-[10px] font-semibold text-[#8E6B23]/70 uppercase tracking-widest mt-0.5">
                      2026
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[55px] w-[1px] bg-[#E8DCC4]"></div>

                  {/* Right Column: 6:00 PM HRS. */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <span className="font-serif text-[14px] font-bold text-[#394D3B] uppercase tracking-wider">
                      6:00 PM
                    </span>
                    <span className="font-serif text-[11px] text-[#394D3B]/70 uppercase tracking-widest mt-0.5">
                      Hrs.
                    </span>
                  </div>
                </div>

                {/* Countdown Clock */}
                <div className="absolute top-[690px] left-0 right-0 flex flex-col items-center justify-start select-none">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[#C8A14B] text-[10px]">♥</span>
                    <span className="font-serif text-[9.5px] tracking-[2px] text-[#8E6B23] uppercase font-bold">
                      Faltan para el gran día
                    </span>
                  </div>
                  <CountdownClock />
                </div>

                {/* Gold Botanical Divider below Countdown */}
                <div className="absolute top-[752px] left-0 right-0 flex justify-center items-center select-none opacity-60">
                  <svg
                    className="w-[120px] h-[10px] text-[#C8A14B]"
                    viewBox="0 0 100 10"
                    fill="currentColor"
                  >
                    <path
                      d="M50 5c-5 0-10-.5-15-1.5-.5.8-1 1.5-1.5 2 5 .5 10.5 1 16.5.5h1v-1h-1z"
                      opacity="0.7"
                    />
                    <path
                      d="M50 5c5 0 10-.5 15-1.5.5.8 1 1.5 1.5 2-5 .5-10.5 1-16.5.5h-1v-1h1z"
                      opacity="0.7"
                    />
                  </svg>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-[2px] left-0 right-0 flex flex-col items-center justify-center select-none text-center gap-1">
                  <span className="font-sans text-[8px] tracking-[2.5px] text-[#394D3B]/70 uppercase font-bold">
                    Desliza para descubrir
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-[#394D3B]/50 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Location */}
        <section
          ref={sectionLocationRef}
          id="location"
          className="w-full min-h-dvh flex items-center justify-center snap-start py-10 relative"
        >
          <div
            className={`transition-all duration-700 w-full flex justify-center px-4 ${
              activeSection === 'location'
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <Location />
          </div>
        </section>

        {/* Section 3: Gifts */}
        <section
          ref={sectionGiftsRef}
          id="gifts"
          className="w-full min-h-dvh flex items-center justify-center snap-start py-10 relative"
        >
          <div
            className={`transition-all duration-700 w-full flex justify-center px-4 ${
              activeSection === 'gifts'
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <Gifts />
          </div>
        </section>

        {/* Section 5: RSVP */}
        <section
          ref={sectionRsvpRef}
          id="rsvp"
          className="w-full min-h-dvh flex items-center justify-center snap-start pt-10 pb-24 relative"
        >
          <div
            className={`transition-all duration-700 w-full flex justify-center px-4 ${
              activeSection === 'rsvp'
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <RsvpPage key={family?.id || 'rsvp-empty'} />
          </div>
        </section>
      </div>
    </div>
  )
}
