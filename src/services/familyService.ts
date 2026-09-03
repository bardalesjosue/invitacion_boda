import { FamilyRepository, type InvitationRepository } from '@/lib/firestore'
import { calculateStatistics, type InvitationStatistics } from '@/lib/statistics'
import type { Invitation } from '@/types'
import { InvitationStatus } from '@/config/constants'

/**
 * Depends on the InvitationRepository abstraction, not the concrete Firestore
 * implementation (DIP) — the default repository can be swapped for a fake in tests.
 */
export function createFamilyService(repository: InvitationRepository = FamilyRepository) {
  return {
    async getFamily(id: string): Promise<Invitation | null> {
      return repository.getById(id)
    },

    async getByToken(token: string): Promise<Invitation | null> {
      return repository.getByToken(token)
    },

    async createFamily(
      nombreFamilia: string,
      cantidadPermitida: number,
      telefono: string,
    ): Promise<Invitation> {
      const invitationData: Omit<Invitation, 'id' | 'codigo' | 'fechaCreacion'> = {
        nombreFamilia,
        telefono,
        cantidadPermitida,
        estado: InvitationStatus.Pending,
        confirmados: 0,
        mensaje: '',
      }

      return repository.create(invitationData)
    },

    async updateFamily(
      id: string,
      data: Partial<Omit<Invitation, 'id' | 'codigo' | 'fechaCreacion'>>,
    ): Promise<void> {
      await repository.update(id, data)
    },

    async deleteFamily(id: string): Promise<void> {
      await repository.delete(id)
    },

    async getAllFamilies(): Promise<Invitation[]> {
      return repository.getAll()
    },

    async confirmAttendance(
      id: string,
      status: (typeof InvitationStatus)[keyof typeof InvitationStatus],
      confirmados: number,
      mensaje: string,
      telefono?: string,
    ): Promise<void> {
      const updateData: Partial<Invitation> = {
        estado: status,
        confirmados: status === InvitationStatus.Confirmed ? confirmados : 0,
        mensaje,
      }
      if (telefono !== undefined) {
        updateData.telefono = telefono
      }
      await repository.update(id, updateData)
    },

    async getStatistics(): Promise<InvitationStatistics> {
      const invitations = await repository.getAll()
      return calculateStatistics(invitations)
    },
  }
}

export const FamilyService = createFamilyService()
