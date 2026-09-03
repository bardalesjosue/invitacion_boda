import React, { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const CountdownClock: React.FC = () => {
  const targetDate = new Date('2026-12-04T18:00:00')

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date()
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center gap-6 select-none max-w-[360px] mx-auto animate-fade-in">
      {/* Column 1: Days */}
      <div className="flex flex-col items-center justify-center min-w-[50px]">
        <span className="font-serif text-[24px] font-bold text-[#8E6B23] leading-none">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-sans tracking-[1.5px] text-[#555] uppercase font-bold mt-1.5">
          Días
        </span>
      </div>

      {/* Divider */}
      <div className="h-[30px] w-[1px] bg-[#E8DCC4] self-center"></div>

      {/* Column 2: Hours */}
      <div className="flex flex-col items-center justify-center min-w-[50px]">
        <span className="font-serif text-[24px] font-bold text-[#8E6B23] leading-none">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-sans tracking-[1.5px] text-[#555] uppercase font-bold mt-1.5">
          Horas
        </span>
      </div>

      {/* Divider */}
      <div className="h-[30px] w-[1px] bg-[#E8DCC4] self-center"></div>

      {/* Column 3: Minutes */}
      <div className="flex flex-col items-center justify-center min-w-[50px]">
        <span className="font-serif text-[24px] font-bold text-[#8E6B23] leading-none">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-sans tracking-[1.5px] text-[#555] uppercase font-bold mt-1.5">
          Minutos
        </span>
      </div>

      {/* Divider */}
      <div className="h-[30px] w-[1px] bg-[#E8DCC4] self-center"></div>

      {/* Column 4: Seconds */}
      <div className="flex flex-col items-center justify-center min-w-[50px]">
        <span className="font-serif text-[24px] font-bold text-[#8E6B23] leading-none">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-sans tracking-[1.5px] text-[#555] uppercase font-bold mt-1.5">
          Segundos
        </span>
      </div>
    </div>
  )
}
