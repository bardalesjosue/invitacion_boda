import type { Invitation } from '@/types'
import { WEDDING_CONTACT_PHONE } from '@/config/constants'

export function cleanPhoneNumber(phone: string | undefined): string {
  return phone ? phone.replace(/[^0-9]/g, '') : ''
}

export function buildWhatsAppUrl(phone: string, text: string): string {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`
}

export function getInviteLink(id: string): string {
  return `${window.location.origin}/i/${id}`
}

/** Message templates. Adding a new message type only requires adding a function here (OCP). */
export const WhatsAppMessages = {
  invite(family: Invitation): string {
    const link = getInviteLink(family.id)
    return `¡Hola, ${family.nombreFamilia}! Nos complace invitarte a nuestra boda. Puedes ver tu invitación especial y confirmar tu asistencia en el siguiente enlace: ${link}`
  },

  reminder(family: Invitation): string {
    return `¡Hola, ${family.nombreFamilia}! Te recordamos que la celebración de nuestra boda es el viernes 4 de diciembre a las 6:00 PM en el Hotel Monteolivos. ¡Nos complacerá mucho contar con tu presencia! ✨`
  },

  guestConfirmationRequest(familyName?: string): string {
    const base = 'Hola! Quiero confirmar mi asistencia a la boda de Josué y Mariela.'
    return familyName ? `${base} Mi pase es para la familia ${familyName}.` : base
  },
}

export function sendWhatsAppInvite(family: Invitation): void {
  const url = buildWhatsAppUrl(cleanPhoneNumber(family.telefono), WhatsAppMessages.invite(family))
  window.open(url, '_blank')
}

export function sendWhatsAppReminder(family: Invitation): void {
  const url = buildWhatsAppUrl(cleanPhoneNumber(family.telefono), WhatsAppMessages.reminder(family))
  window.open(url, '_blank')
}

export function getGuestConfirmationUrl(familyName?: string): string {
  return buildWhatsAppUrl(
    WEDDING_CONTACT_PHONE,
    WhatsAppMessages.guestConfirmationRequest(familyName),
  )
}
