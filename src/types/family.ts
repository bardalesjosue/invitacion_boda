import type { InvitationStatus } from '@/config/constants'

export interface Guest {
  id?: string
  name: string
  confirmed: boolean
}

export interface Invitation {
  id: string
  codigo: string
  nombreFamilia: string
  telefono: string
  cantidadPermitida: number
  estado: InvitationStatus
  fechaCreacion: string
  confirmados: number
  mensaje?: string
}

export type Family = Invitation
