import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useAppStore.setState({
      isEnvelopeOpened: false,
      isPlayingMusic: false,
      activeSection: 'welcome',
      inviteToken: null,
      invitationData: null,
      familyData: null,
    })
  })

  it('should initialize with default values', () => {
    const state = useAppStore.getState()
    expect(state.isEnvelopeOpened).toBe(false)
    expect(state.isPlayingMusic).toBe(false)
    expect(state.activeSection).toBe('welcome')
    expect(state.inviteToken).toBeNull()
    expect(state.invitationData).toBeNull()
    expect(state.familyData).toBeNull()
  })

  it('should update isEnvelopeOpened', () => {
    useAppStore.getState().setEnvelopeOpened(true)
    expect(useAppStore.getState().isEnvelopeOpened).toBe(true)
  })

  it('should update activeSection', () => {
    useAppStore.getState().setActiveSection('gallery')
    expect(useAppStore.getState().activeSection).toBe('gallery')
  })
})
