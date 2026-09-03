import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Invitation } from '@/types'

const INVITATIONS_COLLECTION = 'invitaciones'

/**
 * Contract that any invitation persistence backend must fulfill.
 * FamilyService depends on this abstraction rather than on Firestore directly (DIP).
 */
export interface InvitationRepository {
  getById(id: string): Promise<Invitation | null>
  getByToken(token: string): Promise<Invitation | null>
  getAll(): Promise<Invitation[]>
  create(invitation: Omit<Invitation, 'id' | 'codigo' | 'fechaCreacion'>): Promise<Invitation>
  update(id: string, data: Partial<Omit<Invitation, 'id' | 'fechaCreacion'>>): Promise<void>
  delete(id: string): Promise<void>
}

export const FamilyRepository: InvitationRepository = {
  async getById(id: string): Promise<Invitation | null> {
    try {
      const docRef = doc(db, INVITATIONS_COLLECTION, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Invitation
      }
      return null
    } catch (e) {
      console.error('Error fetching invitation by id:', e)
      return null
    }
  },

  async getByToken(token: string): Promise<Invitation | null> {
    return this.getById(token)
  },

  async getAll(): Promise<Invitation[]> {
    try {
      const querySnapshot = await getDocs(collection(db, INVITATIONS_COLLECTION))
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Invitation)
    } catch (e) {
      console.error('Error fetching all invitations:', e)
      return []
    }
  },

  async create(
    invitation: Omit<Invitation, 'id' | 'codigo' | 'fechaCreacion'>,
  ): Promise<Invitation> {
    const newDocRef = doc(collection(db, INVITATIONS_COLLECTION))
    const now = new Date().toISOString()
    const newInvitation: Invitation = {
      ...invitation,
      id: newDocRef.id,
      codigo: newDocRef.id,
      fechaCreacion: now,
    }
    await setDoc(newDocRef, newInvitation)
    return newInvitation
  },

  async update(id: string, data: Partial<Omit<Invitation, 'id' | 'fechaCreacion'>>): Promise<void> {
    const docRef = doc(db, INVITATIONS_COLLECTION, id)
    await updateDoc(docRef, data)
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, INVITATIONS_COLLECTION, id)
    await deleteDoc(docRef)
  },
}
