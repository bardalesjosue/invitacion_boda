import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FamilyService } from '@/services/familyService'
import { Button, Input, Typography } from '@/components/ui'

export const FamilyNew: React.FC = () => {
  const navigate = useNavigate()
  const [nombreFamilia, setNombreFamilia] = useState('')
  const [cantidadPermitida, setCantidadPermitida] = useState(4)
  const [telefono, setTelefono] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombreFamilia.trim()) {
      alert('Por favor ingresa el nombre de la familia.')
      return
    }

    setSubmitting(true)
    try {
      await FamilyService.createFamily(nombreFamilia.trim(), cantidadPermitida, telefono.trim())
      navigate('/admin/families')
    } catch (error) {
      console.error('Error creating invitation:', error)
      alert('Ocurrió un error al guardar la invitación.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 text-wedding-cream bg-wedding-dark min-h-screen">
      <div className="mb-6">
        <Typography variant="h1" className="text-3xl font-serif">
          Crear Nueva Invitación
        </Typography>
        <Typography variant="caption" className="text-gray-400 mt-1">
          Define los datos de la familia invitada y sus pases permitidos.
        </Typography>
      </div>

      <div className="max-w-md p-6 rounded-lg glass-dark border border-wedding-gold/15 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6 font-sans">
          <div>
            <label className="block text-sm text-gray-300 font-semibold mb-1.5">
              Nombre de la Familia
            </label>
            <Input
              value={nombreFamilia}
              onChange={(e) => setNombreFamilia(e.target.value)}
              placeholder="e.g. Familia Bardales Erazo"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-semibold mb-1.5">
              Pases Permitidos
            </label>
            <Input
              type="number"
              value={cantidadPermitida}
              onChange={(e) => setCantidadPermitida(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-semibold mb-1.5">
              Teléfono (opcional)
            </label>
            <Input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="e.g. +504 88009251"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Si ya lo registras aquí, el invitado no tendrá que escribirlo.
            </p>
          </div>

          <div className="flex gap-4 pt-2">
            <Link to="/admin/families" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="gold" className="flex-1" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Crear Invitación'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
