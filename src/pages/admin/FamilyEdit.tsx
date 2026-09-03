import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FamilyService } from '@/services/familyService'
import { Button, Input, Typography } from '@/components/ui'
import { InvitationStatus, INVITATION_STATUS_OPTIONS } from '@/config/constants'
import type { Invitation } from '@/types'

export const FamilyEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [nombreFamilia, setNombreFamilia] = useState('')
  const [cantidadPermitida, setCantidadPermitida] = useState(4)
  const [telefono, setTelefono] = useState('')
  const [estado, setEstado] = useState<InvitationStatus>('Pendiente')
  const [confirmados, setConfirmados] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    const loadInvitation = async () => {
      if (!id) return
      try {
        const family = await FamilyService.getFamily(id)
        if (active && family) {
          setNombreFamilia(family.nombreFamilia)
          setCantidadPermitida(family.cantidadPermitida)
          setTelefono(family.telefono || '')
          setEstado(family.estado)
          setConfirmados(family.confirmados || 0)
          setMensaje(family.mensaje || '')
        }
      } catch (error) {
        console.error('Error fetching invitation:', error)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    loadInvitation()
    return () => {
      active = false
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    if (!nombreFamilia.trim()) {
      alert('Por favor ingresa el nombre de la familia.')
      return
    }

    setSubmitting(true)
    try {
      const updateData: Partial<Invitation> = {
        nombreFamilia: nombreFamilia.trim(),
        cantidadPermitida,
        telefono: telefono.trim(),
        estado,
        confirmados: estado === InvitationStatus.Confirmed ? confirmados : 0,
        mensaje: mensaje.trim(),
      }
      await FamilyService.updateFamily(id, updateData)
      navigate('/admin/families')
    } catch (error) {
      console.error('Error updating invitation:', error)
      alert('Ocurrió un error al actualizar la invitación.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-wedding-cream bg-wedding-dark min-h-screen flex items-center justify-center">
        <p className="font-sans animate-pulse text-wedding-gold tracking-widest uppercase">
          Cargando invitación...
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 text-wedding-cream bg-wedding-dark min-h-screen">
      <div className="mb-6">
        <Typography variant="h1" className="text-3xl font-serif">
          Editar Invitación
        </Typography>
        <Typography variant="caption" className="text-gray-400 mt-1">
          Actualiza los datos, pases y respuesta de RSVP para esta invitación.
        </Typography>
      </div>

      <div className="max-w-md p-6 rounded-lg glass-dark border border-wedding-gold/15 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div>
            <label className="block text-sm text-gray-300 font-semibold mb-1">
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
            <label className="block text-sm text-gray-300 font-semibold mb-1">
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
            <label className="block text-sm text-gray-300 font-semibold mb-1">Teléfono</label>
            <Input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="e.g. +504 88009251"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-semibold mb-1">
              Estado de Invitación
            </label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value as InvitationStatus)}
              className="w-full px-4 py-2.5 rounded bg-wedding-dark-gray border border-wedding-gold/20 text-wedding-cream focus:outline-none focus:border-wedding-gold transition"
            >
              {INVITATION_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {estado === InvitationStatus.Confirmed && (
            <div>
              <label className="block text-sm text-gray-300 font-semibold mb-1">
                Asistentes Confirmados
              </label>
              <Input
                type="number"
                value={confirmados}
                onChange={(e) =>
                  setConfirmados(
                    Math.min(cantidadPermitida, Math.max(0, parseInt(e.target.value) || 0)),
                  )
                }
                min={0}
                max={cantidadPermitida}
                required
              />
              <p className="text-[10px] text-gray-400 mt-1">
                No puede ser mayor que los pases permitidos ({cantidadPermitida}).
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 font-semibold mb-1">
              Mensaje de los Invitados
            </label>
            <textarea
              rows={3}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-wedding-dark-gray border border-wedding-gold/20 text-wedding-cream focus:outline-none focus:border-wedding-gold transition resize-none text-sm"
              placeholder="Sin mensaje"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <Link to="/admin/families" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="gold" className="flex-1" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
