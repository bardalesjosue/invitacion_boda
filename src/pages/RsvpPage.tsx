import React, { useState, useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { FamilyService } from '@/services/familyService'
import { InvitationStatus } from '@/config/constants'
import { getGuestConfirmationUrl } from '@/lib/whatsapp'

export const RsvpPage: React.FC = () => {
  const { inviteToken, invitationData, setInvitationData } = useAppStore()

  const invitation = invitationData

  const [attending, setAttending] = useState<boolean | null>(() => {
    if (!invitationData) return null
    return invitationData.estado === InvitationStatus.Confirmed
      ? true
      : invitationData.estado === InvitationStatus.Declined
        ? false
        : null
  })
  const [attendeesCount, setAttendeesCount] = useState<number>(() => {
    if (!invitationData) return 1
    return invitationData.confirmados > 0
      ? invitationData.confirmados
      : invitationData.cantidadPermitida
  })
  const phone = invitationData?.telefono || ''
  const [message, setMessage] = useState<string>(() => invitationData?.mensaje || '')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(() => !invitationData && !!inviteToken)
  const [error, setError] = useState<string | null>(null)

  // Load invitationData if missing but token exists (without forcing route redirect)
  useEffect(() => {
    if (!inviteToken || invitationData) return

    let active = true
    FamilyService.getByToken(inviteToken)
      .then((family) => {
        if (active) {
          if (family) {
            setInvitationData(family)
          } else {
            setError('No pudimos encontrar tu invitación.')
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching family details in RSVP:', err)
        if (active) {
          setError('Error al cargar la invitación.')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [inviteToken, invitationData, setInvitationData])

  const handleIncrement = () => {
    if (invitation && attendeesCount < invitation.cantidadPermitida) {
      setAttendeesCount((prev) => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (attendeesCount > 1) {
      setAttendeesCount((prev) => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!invitation || attending === null) return

    setSubmitting(true)
    try {
      const targetStatus = attending ? InvitationStatus.Confirmed : InvitationStatus.Declined
      const finalCount = attending ? attendeesCount : 0

      await FamilyService.confirmAttendance(invitation.id, targetStatus, finalCount, message, phone)

      // Update store state
      const updatedInvitation = {
        ...invitation,
        estado: targetStatus,
        confirmados: finalCount,
        mensaje: message,
        telefono: phone,
      }
      setInvitationData(updatedInvitation)
      setSuccess(true)
    } catch (err) {
      console.error('Error al guardar RSVP:', err)
      alert('Hubo un error al enviar tu respuesta. Por favor, intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    const welcomeSection = document.getElementById('welcome')
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-[520px] rounded-2xl glass-dark border border-wedding-gold/15 p-8 text-center flex flex-col items-center justify-center my-4 min-h-[300px]">
        <p className="font-sans animate-pulse text-wedding-gold tracking-widest text-sm uppercase">
          Cargando tu confirmación...
        </p>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="w-full max-w-[520px] rounded-2xl glass-dark border border-wedding-gold/15 p-8 text-center flex flex-col items-center gap-4 my-4">
        <span className="text-3xl text-[#C8A14B] animate-pulse">✉️</span>
        <h2 className="font-serif text-2xl text-[#FAF8F2] tracking-[1.5px] uppercase">
          Confirmación de Asistencia
        </h2>
        <div className="w-[80px] h-[1px] bg-wedding-gold/30 mx-auto my-1"></div>
        <p className="font-sans text-[13.5px] text-[#D4CDC3] leading-relaxed max-w-[360px] mt-2">
          ¡Queremos compartir este gran día contigo!
          <br />
          <br />
          Para poder confirmar tus pases especiales y registrar tu asistencia, por favor accede
          utilizando el <strong>enlace personal</strong> que te enviamos.
        </p>
        <div className="w-full h-[1px] bg-wedding-gold/20 my-2"></div>
        <a
          href={getGuestConfirmationUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-xl bg-wedding-gold hover:bg-wedding-gold-satin text-wedding-dark font-sans text-xs tracking-widest font-bold uppercase transition active:scale-95 text-center flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          💬 Confirmar por WhatsApp
        </a>
      </div>
    )
  }

  if (success) {
    return (
      <div className="w-full max-w-[500px] rounded-2xl glass-dark border border-wedding-gold/20 shadow-2xl p-8 text-center flex flex-col items-center gap-6 animate-scale-up animate-fade-in my-4">
        <div className="w-16 h-16 rounded-full bg-wedding-gold/10 border border-wedding-gold flex items-center justify-center text-3xl animate-bounce">
          ✨
        </div>
        <h2 className="font-serif text-3xl text-wedding-gold tracking-wide">
          ¡Respuesta Registrada!
        </h2>
        <p className="font-sans text-sm text-wedding-cream leading-relaxed">
          {attending
            ? `Muchas gracias por confirmar. Hemos reservado ${attendeesCount} ${attendeesCount === 1 ? 'pase' : 'pases'} para la ${invitation.nombreFamilia}.`
            : `Lamentamos que no puedas acompañarnos. Agradecemos mucho tu respuesta para la ${invitation.nombreFamilia}.`}
        </p>
        <div className="w-full h-[1px] bg-wedding-gold/10 my-2"></div>
        <p className="font-serif italic text-wedding-gold/80 text-sm">"Josué & Mariela"</p>
        <p className="font-sans text-[11px] text-gray-400">
          (Puedes deslizar hacia arriba para volver a ver la invitación)
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[520px] rounded-2xl glass-dark border border-wedding-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden z-10 flex flex-col my-4">
      {/* Header decoration */}
      <div className="p-6 text-center border-b border-wedding-gold/10">
        <span className="font-allura text-[28px] text-[#B58C28] leading-none block mb-1">
          Nuestra Boda
        </span>
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-wedding-cream tracking-[2px] uppercase">
          Confirmación de Asistencia
        </h1>
        <div className="w-[100px] h-[1px] bg-wedding-gold/30 mx-auto mt-3"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 font-sans text-wedding-cream">
        {/* Family Section */}
        <div className="space-y-1">
          <span className="text-[10px] tracking-widest uppercase text-wedding-gold font-bold">
            Invitación Para:
          </span>
          <div className="px-4 py-3 rounded-xl bg-wedding-dark-gray/40 border border-wedding-gold/10 font-serif text-lg font-bold text-wedding-cream capitalize">
            {invitation.nombreFamilia}
          </div>
        </div>

        {/* Allowed passes */}
        <div className="flex justify-between items-center bg-wedding-gold/5 px-4 py-2.5 rounded-xl border border-wedding-gold/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎫</span>
            <span className="text-[11px] tracking-wider uppercase font-bold text-[#E5C158]">
              Pases Reservados:
            </span>
          </div>
          <span className="font-serif text-lg font-bold text-wedding-gold">
            {invitation.cantidadPermitida} {invitation.cantidadPermitida === 1 ? 'PASE' : 'PASES'}
          </span>
        </div>

        {/* Attending Toggle */}
        <div className="space-y-3">
          <span className="text-[10px] tracking-widest uppercase text-wedding-gold font-bold">
            ¿Asistirás a la celebración?
          </span>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`py-3.5 px-4 rounded-xl border font-bold text-xs tracking-wider uppercase transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                attending === true
                  ? 'bg-wedding-gold border-wedding-gold text-wedding-dark shadow-[0_4px_12px_rgba(201,162,39,0.3)]'
                  : 'bg-wedding-dark-gray/30 border-wedding-gold/20 text-wedding-cream hover:bg-wedding-dark-gray/50'
              }`}
            >
              <span className="text-lg">🎉</span>
              <span>Sí, asistiré</span>
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`py-3.5 px-4 rounded-xl border font-bold text-xs tracking-wider uppercase transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                attending === false
                  ? 'bg-red-950/40 border-red-500 text-red-200 shadow-[0_4px_12px_rgba(239,68,68,0.15)]'
                  : 'bg-wedding-dark-gray/30 border-wedding-gold/20 text-wedding-cream hover:bg-wedding-dark-gray/50'
              }`}
            >
              <span className="text-lg">💔</span>
              <span>No podré asistir</span>
            </button>
          </div>
        </div>

        {/* Attendees Counter */}
        {attending === true && (
          <div className="p-4 rounded-xl bg-wedding-dark-gray/25 border border-wedding-gold/10 space-y-3 animate-slide-down">
            <div className="flex justify-between items-center">
              <span className="text-[11px] tracking-wider uppercase text-gray-400 font-bold">
                ¿Cuántos pases utilizarás?
              </span>
              <span className="text-xs text-wedding-gold font-bold">
                Máximo: {invitation.cantidadPermitida}
              </span>
            </div>
            <div className="flex items-center justify-center gap-6 py-2">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={attendeesCount <= 1}
                className={`w-10 h-10 rounded-full border border-wedding-gold/40 flex items-center justify-center text-lg font-bold transition select-none cursor-pointer active:scale-90 ${
                  attendeesCount <= 1
                    ? 'opacity-30 cursor-not-allowed border-gray-700 text-gray-600'
                    : 'text-wedding-gold hover:bg-wedding-gold/10'
                }`}
              >
                −
              </button>
              <span className="font-serif text-3xl font-bold text-wedding-cream w-12 text-center">
                {attendeesCount}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                disabled={attendeesCount >= invitation.cantidadPermitida}
                className={`w-10 h-10 rounded-full border border-wedding-gold/40 flex items-center justify-center text-lg font-bold transition select-none cursor-pointer active:scale-90 ${
                  attendeesCount >= invitation.cantidadPermitida
                    ? 'opacity-30 cursor-not-allowed border-gray-700 text-gray-600'
                    : 'text-wedding-gold hover:bg-wedding-gold/10'
                }`}
              >
                +
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center italic">
              No necesitas escribir los nombres de tus acompañantes.
            </p>
          </div>
        )}

        {/* Custom Message Area */}
        <div className="space-y-1.5">
          <span className="text-[10px] tracking-widest uppercase text-wedding-gold font-bold">
            Mensaje para los novios (opcional):
          </span>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tus buenos deseos o felicitaciones aquí..."
            className="w-full px-4 py-3 rounded-xl bg-wedding-dark-gray/30 border border-wedding-gold/20 text-wedding-cream focus:outline-none focus:border-wedding-gold transition resize-none font-sans text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 px-4 rounded-xl border border-wedding-gold/30 hover:bg-wedding-dark-gray/40 text-wedding-cream font-sans text-xs tracking-widest font-bold uppercase transition active:scale-95 cursor-pointer"
          >
            Volver al Inicio
          </button>
          <button
            type="submit"
            disabled={attending === null || submitting}
            className={`flex-1 py-3 px-4 rounded-xl font-sans text-xs tracking-widest font-bold uppercase transition active:scale-95 cursor-pointer text-center ${
              attending === null
                ? 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-wedding-gold hover:bg-wedding-gold-satin text-wedding-dark border border-wedding-gold'
            }`}
          >
            {submitting ? 'Guardando...' : 'Enviar Confirmación'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 my-2 text-wedding-gold/20 select-none">
          <div className="h-[1px] flex-1 bg-wedding-gold/10"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#B58C28]">
            o también
          </span>
          <div className="h-[1px] flex-1 bg-wedding-gold/10"></div>
        </div>

        <a
          href={getGuestConfirmationUrl(invitation.nombreFamilia)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-xl border border-[#B58C28]/40 hover:bg-wedding-gold/10 text-wedding-gold font-sans text-xs tracking-widest font-bold uppercase transition active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          💬 Confirmar por WhatsApp
        </a>
      </form>
    </div>
  )
}
