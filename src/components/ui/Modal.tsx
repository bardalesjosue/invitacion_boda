import React from 'react'
import { Card } from './Card'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />
      <Card
        variant="dark"
        className="relative w-full max-w-lg z-10 border border-wedding-gold/20 shadow-2xl"
      >
        {title && (
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-wedding-gold/10">
            <h3 className="font-serif text-xl text-wedding-gold">{title}</h3>
            <button
              onClick={onClose}
              className="text-wedding-cream/60 hover:text-wedding-cream transition text-lg"
            >
              ✕
            </button>
          </div>
        )}
        <div className="mt-2">{children}</div>
      </Card>
    </div>
  )
}
