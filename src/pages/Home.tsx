import React from 'react'

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-wedding-cream bg-wedding-dark p-6">
      <h1 className="font-serif text-4xl md:text-6xl text-wedding-gold mb-4">Nuestra Boda</h1>
      <p className="font-sans text-lg text-center max-w-md">
        Te invitamos a celebrar este día tan especial con nosotros.
      </p>
    </div>
  )
}
