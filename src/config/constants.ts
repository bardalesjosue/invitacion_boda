export const InvitationStatus = {
  Pending: 'Pendiente',
  Confirmed: 'Confirmado',
  Declined: 'Declinado',
  Expired: 'Expirado',
} as const

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus]

/**
 * Single source of truth for status <select> options. Consumers map over this
 * instead of hardcoding <option> lists, so adding/renaming a status only
 * requires a change here (OCP).
 */
export const INVITATION_STATUS_OPTIONS: { value: InvitationStatus; label: string }[] =
  Object.values(InvitationStatus).map((value) => ({ value, label: value }))

export const WEDDING_CONTACT_PHONE = '50488009251'

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  INVITED: 'INVITED',
} as const

export const DESIGN_SYSTEM = {
  COLORS: {
    cream: '#F9F7F2',
    olive: '#6B7A52',
    gold: '#C9A227',
    gray: '#666666',
    black: '#222222',
  },
} as const
