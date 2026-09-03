import React, { useState, useEffect } from 'react'
import { FamilyService } from '@/services/familyService'
import { Typography } from '@/components/ui'

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<{
    totalFamilies: number
    totalPasses: number
    totalConfirmed: number
    totalDeclined: number
    pendingCount: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const fetchStats = async () => {
      try {
        const data = await FamilyService.getStatistics()
        if (active) {
          setStats(data)
        }
      } catch (err) {
        console.error('Error fetching statistics:', err)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchStats()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="p-6 text-wedding-cream bg-wedding-dark min-h-screen">
      <div className="mb-8">
        <Typography variant="h1" className="text-3xl font-serif">
          Dashboard Administrativo
        </Typography>
        <Typography variant="caption" className="text-gray-400 mt-1">
          Estadísticas globales de confirmación y pases en tiempo real.
        </Typography>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-6 rounded-lg glass-dark animate-pulse h-[116px]"></div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="p-6 rounded-lg glass-dark border border-wedding-gold/15 shadow-lg">
            <h3 className="font-sans text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
              Total Invitaciones
            </h3>
            <p className="text-4xl font-serif text-wedding-gold font-bold">{stats.totalFamilies}</p>
          </div>
          <div className="p-6 rounded-lg glass-dark border border-wedding-gold/15 shadow-lg">
            <h3 className="font-sans text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
              Pases Totales
            </h3>
            <p className="text-4xl font-serif text-wedding-gold font-bold">{stats.totalPasses}</p>
          </div>
          <div className="p-6 rounded-lg glass-dark border border-green-500/20 shadow-lg bg-green-950/5">
            <h3 className="font-sans text-xs text-green-400/80 uppercase tracking-wider mb-2 font-semibold">
              Confirmados
            </h3>
            <p className="text-4xl font-serif text-green-500 font-bold">{stats.totalConfirmed}</p>
          </div>
          <div className="p-6 rounded-lg glass-dark border border-yellow-500/20 shadow-lg bg-yellow-950/5">
            <h3 className="font-sans text-xs text-yellow-400/80 uppercase tracking-wider mb-2 font-semibold">
              Pendientes
            </h3>
            <p className="text-4xl font-serif text-yellow-500 font-bold">{stats.pendingCount}</p>
          </div>
          <div className="p-6 rounded-lg glass-dark border border-red-500/20 shadow-lg bg-red-950/5">
            <h3 className="font-sans text-xs text-red-400/80 uppercase tracking-wider mb-2 font-semibold">
              Declinados / No Usados
            </h3>
            <p className="text-4xl font-serif text-red-500 font-bold">{stats.totalDeclined}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">Error al cargar las estadísticas.</div>
      )}
    </div>
  )
}
