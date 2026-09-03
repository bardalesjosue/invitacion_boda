import React from 'react'
import { InvitationStatus } from '@/config/constants'

interface BadgeProps {
  status: InvitationStatus | string
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const statusStyles = {
    [InvitationStatus.Pending]: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
    [InvitationStatus.Confirmed]: 'bg-green-500/10 text-green-400 border border-green-500/30',
    [InvitationStatus.Declined]: 'bg-red-500/10 text-red-400 border border-red-500/30',
    [InvitationStatus.Expired]: 'bg-gray-500/10 text-gray-400 border border-gray-500/30',
  }

  const label = {
    [InvitationStatus.Pending]: 'Pendiente',
    [InvitationStatus.Confirmed]: 'Confirmado',
    [InvitationStatus.Declined]: 'Declinado',
    [InvitationStatus.Expired]: 'Expirado',
  }

  const currentStyle =
    statusStyles[status as InvitationStatus] || 'bg-wedding-dark text-wedding-cream'
  const currentLabel = label[status as InvitationStatus] || status

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${currentStyle}`}
    >
      {currentLabel}
    </span>
  )
}
