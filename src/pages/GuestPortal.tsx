import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { FamilyService } from '@/services/familyService'

export const GuestPortal: React.FC = () => {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const { setInviteToken, setInvitationData } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const validateToken = async () => {
      if (!token) {
        setError('Enlace de invitación no válido')
        setLoading(false)
        return
      }

      try {
        const family = await FamilyService.getByToken(token)
        if (!active) return

        if (family) {
          setInviteToken(token)
          setInvitationData(family)
          navigate('/envelope')
        } else {
          setError(
            'No pudimos encontrar tu invitación. Por favor, verifica el enlace o contacta a los novios.',
          )
        }
      } catch (err) {
        console.error('Error validating invitation token:', err)
        if (active) {
          setError('Ocurrió un error al cargar tu invitación. Intenta de nuevo más tarde.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    validateToken()

    return () => {
      active = false
    }
  }, [token, navigate, setInviteToken, setInvitationData])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-wedding-dark text-wedding-cream">
        <p className="font-sans animate-pulse text-wedding-gold tracking-widest text-sm uppercase">
          Cargando tu invitación premium...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-wedding-dark text-wedding-cream p-6 text-center select-none">
        <div className="max-w-md p-8 rounded-2xl glass-dark border border-red-900/30 flex flex-col items-center gap-4">
          <span className="text-4xl">✉️</span>
          <h2 className="font-serif text-2xl text-wedding-gold">Invitación No Encontrada</h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">{error}</p>
        </div>
      </div>
    )
  }

  return null
}
