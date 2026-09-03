import { create } from 'zustand'
import type { Invitation } from '@/types'

interface AppState {
  isEnvelopeOpened: boolean
  isPlayingMusic: boolean
  activeSection: string
  inviteToken: string | null
  invitationData: Invitation | null
  familyData: Invitation | null
  setEnvelopeOpened: (opened: boolean) => void
  setPlayingMusic: (playing: boolean) => void
  setActiveSection: (section: string) => void
  setInviteToken: (token: string | null) => void
  setInvitationData: (data: Invitation | null) => void
  setFamilyData: (data: Invitation | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  isEnvelopeOpened: false,
  isPlayingMusic: false,
  activeSection: 'welcome',
  inviteToken: typeof window !== 'undefined' ? localStorage.getItem('wedding_invite_token') : null,
  invitationData: null,
  familyData: null,
  setEnvelopeOpened: (opened) => set({ isEnvelopeOpened: opened }),
  setPlayingMusic: (playing) => set({ isPlayingMusic: playing }),
  setActiveSection: (section) => set({ activeSection: section }),
  setInviteToken: (token) => {
    if (token) {
      localStorage.setItem('wedding_invite_token', token)
    } else {
      localStorage.removeItem('wedding_invite_token')
    }
    set({ inviteToken: token })
  },
  setInvitationData: (data) => set({ invitationData: data, familyData: data }),
  setFamilyData: (data) => set({ familyData: data, invitationData: data }),
}))
