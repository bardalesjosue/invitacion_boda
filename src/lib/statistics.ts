import type { Invitation } from '@/types'
import { InvitationStatus } from '@/config/constants'

export interface InvitationStatistics {
  totalFamilies: number
  totalPasses: number
  totalConfirmed: number
  totalDeclined: number
  pendingCount: number
}

/**
 * Pure calculation, kept separate from data fetching (SRP) so it can be
 * unit-tested without touching Firestore.
 */
export function calculateStatistics(invitations: Invitation[]): InvitationStatistics {
  let totalPasses = 0
  let totalConfirmed = 0
  let totalDeclined = 0
  let pendingCount = 0

  invitations.forEach((inv) => {
    totalPasses += inv.cantidadPermitida
    if (inv.estado === InvitationStatus.Confirmed) {
      totalConfirmed += inv.confirmados || 0
      // The remaining unconfirmed pases are considered declined / not used
      const declinedFromConfirmed = inv.cantidadPermitida - (inv.confirmados || 0)
      totalDeclined += Math.max(0, declinedFromConfirmed)
    } else if (inv.estado === InvitationStatus.Declined) {
      totalDeclined += inv.cantidadPermitida
    } else if (inv.estado === InvitationStatus.Pending) {
      pendingCount += inv.cantidadPermitida
    }
  })

  return {
    totalFamilies: invitations.length,
    totalPasses,
    totalConfirmed,
    totalDeclined,
    pendingCount,
  }
}
