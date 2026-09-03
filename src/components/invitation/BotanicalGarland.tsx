import React from 'react'

export const BotanicalGarland: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`w-full select-none pointer-events-none ${className}`}
      viewBox="0 0 500 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        {/* Soft Shadow for Flowers */}
        <filter id="flower-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4B563F" floodOpacity="0.12" />
        </filter>

        {/* Sage Green Leaf Gradients */}
        <linearGradient id="leaf-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8DA38B" />
          <stop offset="100%" stopColor="#5E735B" />
        </linearGradient>
        <linearGradient id="leaf-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3B89F" />
          <stop offset="100%" stopColor="#758A71" />
        </linearGradient>
        <linearGradient id="leaf-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4D7BF" />
          <stop offset="100%" stopColor="#96AB91" />
        </linearGradient>

        {/* Flower Petal Gradients */}
        <linearGradient id="petal-grad-white" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FAF6EE" />
        </linearGradient>
        <linearGradient id="petal-grad-cream" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF6EE" />
          <stop offset="100%" stopColor="#F0E8D9" />
        </linearGradient>

        {/* Golden Stem & Sparkle Gradients */}
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF6F0" />
          <stop offset="30%" stopColor="#E0C068" />
          <stop offset="70%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#9E7818" />
        </linearGradient>

        {/* Reusable Leaf Type A (Round Sage Eucalyptus) */}
        <g id="leaf-round">
          <path d="M0 0 C-15 -18 -32 -10 -30 10 C-28 25 -10 22 0 0" fill="url(#leaf-grad-1)" />
          <path
            d="M0 0 C-6 -8 -15 -10 -20 0"
            stroke="#9CB09A"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Reusable Leaf Type B (Oval Silver Dollar Leaf) */}
        <g id="leaf-oval">
          <path d="M0 0 C-8 -22 -24 -24 -24 -2 C-24 16 -8 18 0 0" fill="url(#leaf-grad-2)" />
          <path
            d="M0 0 C-3 -10 -11 -12 -14 -1"
            stroke="#B6C7B4"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Reusable Leaf Type C (Small Light Leaf) */}
        <g id="leaf-small">
          <path d="M0 0 C-5 -12 -15 -12 -16 -1 C-17 9 -6 11 0 0" fill="url(#leaf-grad-light)" />
        </g>

        {/* Reusable Golden Leaf Accent */}
        <g id="leaf-gold">
          <path
            d="M0 0 C-6 -15 -18 -8 -16 6 C-14 16 -5 14 0 0"
            fill="url(#gold-grad)"
            opacity="0.8"
          />
        </g>

        {/* Reusable Peony Flower Component */}
        <g id="peony" filter="url(#flower-shadow)">
          {/* Outer Petals */}
          <path
            d="M-22 -8 C-35 -20 -40 5 -25 22 C-10 38 10 28 -22 -8 Z"
            fill="url(#petal-grad-cream)"
            opacity="0.95"
          />
          <path
            d="M22 -8 C35 -20 40 5 25 22 C10 38 -10 28 22 -8 Z"
            fill="url(#petal-grad-cream)"
            opacity="0.95"
          />
          <path
            d="M-8 -25 C-22 -38 12 -42 18 -22 C24 -2 0 15 -8 -25 Z"
            fill="url(#petal-grad-cream)"
            opacity="0.95"
          />
          <path
            d="M-12 24 C-28 35 5 42 16 28 C27 14 5 -8 -12 24 Z"
            fill="url(#petal-grad-cream)"
            opacity="0.95"
          />

          {/* Middle Petals */}
          <circle cx="-14" cy="-5" r="13" fill="url(#petal-grad-white)" />
          <circle cx="14" cy="-5" r="13" fill="url(#petal-grad-white)" />
          <circle cx="0" cy="-14" r="13" fill="url(#petal-grad-white)" />
          <circle cx="0" cy="12" r="13" fill="url(#petal-grad-white)" />

          {/* Inner Petals (Center Buds) */}
          <path d="M-8 -3 C-15 -10 -15 8 -5 10 C5 12 5 -8 -8 -3 Z" fill="#FFFFFF" />
          <path d="M8 -3 C15 -10 15 8 5 10 C-5 12 -5 -8 8 -3 Z" fill="#FFFFFF" />
          <path d="M0 -8 C-8 -15 8 -15 6 -3 C4 9 -4 9 0 -8 Z" fill="#FFFFFF" />

          {/* Stamen (Golden Center) */}
          <circle cx="0" cy="0" r="4.5" fill="#E6C875" opacity="0.9" />
          <circle cx="-2" cy="-1" r="1.5" fill="#C9A227" />
          <circle cx="2" cy="1" r="1.2" fill="#D4AF37" />
          <circle cx="1" cy="-2" r="1" fill="#FFFDF0" />
          <circle cx="-1" cy="2" r="1" fill="#C9A227" />
        </g>
      </defs>

      {/* BACKGROUND ELEMENTS / STEM BRANCHES */}
      {/* Central horizontal connecting stem */}
      <path
        d="M 50 20 Q 250 55 450 20"
        stroke="url(#gold-grad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 120 25 Q 250 40 380 25"
        stroke="#73856B"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />

      {/* LEFT SWEEPING BRANCHES */}
      {/* Far Left Branch */}
      <g transform="translate(100, 26) rotate(-15)">
        <path
          d="M 0 0 Q -40 10 -80 30"
          stroke="#73856B"
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
        />
        {/* Leaves along far left branch */}
        <use href="#leaf-round" x="-20" y="3" transform="scale(0.85) rotate(-35)" />
        <use href="#leaf-oval" x="-45" y="8" transform="scale(0.75) rotate(15)" />
        <use href="#leaf-small" x="-65" y="16" transform="scale(0.8) rotate(-20)" />
        <use href="#leaf-gold" x="-35" y="0" transform="scale(0.6) rotate(45)" />
      </g>

      {/* Mid Left Branch */}
      <g transform="translate(180, 32) rotate(-5)">
        <path
          d="M 0 0 Q -40 15 -70 40"
          stroke="#73856B"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <use href="#leaf-round" x="-25" y="6" transform="scale(0.9) rotate(-10)" />
        <use href="#leaf-oval" x="-48" y="15" transform="scale(0.8) rotate(40)" />
        <use href="#leaf-small" x="-65" y="28" transform="scale(0.7) rotate(-5)" />
        <use href="#leaf-gold" x="-15" y="2" transform="scale(0.7) rotate(-25)" />
      </g>

      {/* Inner Left Branch */}
      <g transform="translate(230, 35) rotate(5)">
        <path
          d="M 0 0 Q -25 15 -50 45"
          stroke="#73856B"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <use href="#leaf-round" x="-15" y="8" transform="scale(0.8) rotate(-45)" />
        <use href="#leaf-oval" x="-35" y="22" transform="scale(0.7) rotate(20)" />
      </g>

      {/* RIGHT SWEEPING BRANCHES */}
      {/* Far Right Branch */}
      <g transform="translate(400, 26) scale(-1, 1) rotate(-15)">
        <path
          d="M 0 0 Q -40 10 -80 30"
          stroke="#73856B"
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
        />
        <use href="#leaf-round" x="-20" y="3" transform="scale(0.85) rotate(-35)" />
        <use href="#leaf-oval" x="-45" y="8" transform="scale(0.75) rotate(15)" />
        <use href="#leaf-small" x="-65" y="16" transform="scale(0.8) rotate(-20)" />
        <use href="#leaf-gold" x="-35" y="0" transform="scale(0.6) rotate(45)" />
      </g>

      {/* Mid Right Branch */}
      <g transform="translate(320, 32) scale(-1, 1) rotate(-5)">
        <path
          d="M 0 0 Q -40 15 -70 40"
          stroke="#73856B"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <use href="#leaf-round" x="-25" y="6" transform="scale(0.9) rotate(-10)" />
        <use href="#leaf-oval" x="-48" y="15" transform="scale(0.8) rotate(40)" />
        <use href="#leaf-small" x="-65" y="28" transform="scale(0.7) rotate(-5)" />
        <use href="#leaf-gold" x="-15" y="2" transform="scale(0.7) rotate(-25)" />
      </g>

      {/* Inner Right Branch */}
      <g transform="translate(270, 35) scale(-1, 1) rotate(5)">
        <path
          d="M 0 0 Q -25 15 -50 45"
          stroke="#73856B"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <use href="#leaf-round" x="-15" y="8" transform="scale(0.8) rotate(-45)" />
        <use href="#leaf-oval" x="-35" y="22" transform="scale(0.7) rotate(20)" />
      </g>

      {/* GOLD SPLAYED ACCENTS & DOTS */}
      {/* Artful golden splatters and sparkles hanging down */}
      <g stroke="none" fill="url(#gold-grad)">
        {/* Splatter particles */}
        <circle cx="210" cy="70" r="1.5" opacity="0.6" />
        <circle cx="215" cy="85" r="0.8" opacity="0.5" />
        <circle cx="290" cy="70" r="1.5" opacity="0.6" />
        <circle cx="282" cy="90" r="1.0" opacity="0.4" />
        <circle cx="150" cy="65" r="1.2" opacity="0.5" />
        <circle cx="350" cy="65" r="1.2" opacity="0.5" />
        <circle cx="70" cy="55" r="1.0" opacity="0.4" />
        <circle cx="430" cy="55" r="1.0" opacity="0.4" />

        {/* Small hanging stars / diamonds */}
        <path d="M250 82 L252 85 L250 88 L248 85 Z" opacity="0.7" />
        <path d="M125 52 L126.5 54 L125 56 L123.5 54 Z" opacity="0.5" />
        <path d="M375 52 L376.5 54 L375 56 L373.5 54 Z" opacity="0.5" />
      </g>

      {/* PEONY FLOWERS (PLACED ON TOP) */}
      {/* Central Large Peony */}
      <use href="#peony" x="250" y="38" transform="scale(1.15)" />

      {/* Medium Left Peony */}
      <use href="#peony" x="180" y="36" transform="scale(0.85) rotate(-20)" />

      {/* Medium Right Peony */}
      <use href="#peony" x="320" y="36" transform="scale(0.85) rotate(20)" />

      {/* Small Far Left Rose */}
      <use href="#peony" x="120" y="30" transform="scale(0.65) rotate(15)" />

      {/* Small Far Right Rose */}
      <use href="#peony" x="380" y="30" transform="scale(0.65) rotate(-15)" />

      {/* Tiny Leaf sprigs peeking through between flowers */}
      <use href="#leaf-small" x="150" y="24" transform="scale(0.65) rotate(60)" />
      <use href="#leaf-small" x="350" y="24" transform="scale(0.65) rotate(-60)" />
      <use href="#leaf-gold" x="215" y="20" transform="scale(0.5) rotate(10)" />
      <use href="#leaf-gold" x="285" y="20" transform="scale(0.5) rotate(-10)" />
    </svg>
  )
}
