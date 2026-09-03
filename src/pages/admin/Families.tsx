import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'react-qr-code'
import type { Invitation } from '@/types'
import { FamilyService } from '@/services/familyService'
import { Badge, Button, Input, Modal, Typography } from '@/components/ui'
import { INVITATION_STATUS_OPTIONS } from '@/config/constants'
import { getInviteLink, sendWhatsAppInvite, sendWhatsAppReminder } from '@/lib/whatsapp'

export const Families: React.FC = () => {
  const [families, setFamilies] = useState<Invitation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedFamily, setSelectedFamily] = useState<Invitation | null>(null)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)

  const fetchFamilies = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)
    }
    try {
      const data = await FamilyService.getAllFamilies()
      setFamilies(data)
    } catch (error) {
      console.error('Error fetching families:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true
    Promise.resolve().then(() => {
      if (active) {
        fetchFamilies(false)
      }
    })
    return () => {
      active = false
    }
  }, [])

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta invitación?')) {
      await FamilyService.deleteFamily(id)
      fetchFamilies()
    }
  }

  const filteredFamilies = families.filter((f) => {
    const matchesSearch = f.nombreFamilia.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === 'all' || f.estado === statusFilter
    return matchesSearch && matchesFilter
  })

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(getInviteLink(id))
    alert('¡Enlace de invitación copiado!')
  }

  const handleOpenQr = (family: Invitation) => {
    setSelectedFamily(family)
    setIsQrModalOpen(true)
  }

  return (
    <div className="p-6 text-wedding-cream bg-wedding-dark min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <Typography variant="h1" className="text-3xl font-serif">
            Panel de Invitaciones
          </Typography>
          <Typography variant="caption" className="text-gray-400 mt-1">
            Administra tus invitaciones, pases y accesos QR en tiempo real.
          </Typography>
        </div>
        <Link to="/admin/family/new">
          <Button variant="gold">+ Crear Invitación</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Buscar familia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-4 py-2.5 rounded bg-wedding-dark-gray border border-wedding-gold/20 text-wedding-cream focus:outline-none focus:border-wedding-gold transition"
        >
          <option value="all">Todos los estados</option>
          {INVITATION_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-end">
          <Typography variant="caption" className="text-wedding-gold">
            Mostrando {filteredFamilies.length} de {families.length} invitaciones
          </Typography>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg glass-dark border border-wedding-gold/10">
        <table className="w-full text-left font-sans border-collapse">
          <thead>
            <tr className="border-b border-wedding-gold/10 text-wedding-gold bg-wedding-dark-gray/30">
              <th className="p-4 text-sm font-medium">Familia</th>
              <th className="p-4 text-sm font-medium">Pases Asignados</th>
              <th className="p-4 text-sm font-medium">Confirmados</th>
              <th className="p-4 text-sm font-medium">Estado</th>
              <th className="p-4 text-sm font-medium">Fecha de Creación</th>
              <th className="p-4 text-sm font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500 animate-pulse">
                  Cargando invitaciones...
                </td>
              </tr>
            ) : filteredFamilies.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No se encontraron invitaciones
                </td>
              </tr>
            ) : (
              filteredFamilies.map((f) => (
                <tr
                  key={f.id}
                  className="border-b border-wedding-gold/5 hover:bg-wedding-dark-gray/20 transition"
                >
                  <td className="p-4">
                    <div className="font-semibold text-wedding-cream">{f.nombreFamilia}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {f.telefono || 'Sin teléfono'}
                    </div>
                  </td>
                  <td className="p-4 text-sm">{f.cantidadPermitida}</td>
                  <td className="p-4 text-sm text-green-400">{f.confirmados || 0}</td>
                  <td className="p-4">
                    <Badge status={f.estado} />
                  </td>
                  <td className="p-4 text-sm text-gray-300">
                    {f.fechaCreacion ? new Date(f.fechaCreacion).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4 text-right space-x-2 space-y-1 md:space-y-0">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(f.id)}>
                      Copiar Link
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleOpenQr(f)}>
                      QR
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white border-none cursor-pointer"
                      onClick={() => sendWhatsAppInvite(f)}
                    >
                      Enviar WhatsApp
                    </Button>
                    {f.estado === 'Confirmado' && (
                      <Button
                        variant="gold"
                        size="sm"
                        className="cursor-pointer font-bold bg-wedding-gold text-wedding-dark border-none"
                        onClick={() => sendWhatsAppReminder(f)}
                      >
                        Recordatorio
                      </Button>
                    )}
                    <Link to={`/admin/family/edit/${f.id}`}>
                      <Button variant="gold" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(f.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* QR Modal */}
      {selectedFamily && (
        <Modal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          title={`Código QR - ${selectedFamily.nombreFamilia}`}
        >
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
            <QRCode value={getInviteLink(selectedFamily.id)} size={200} />
            <Typography
              variant="body"
              className="mt-4 text-black font-semibold text-center break-all"
            >
              {getInviteLink(selectedFamily.id)}
            </Typography>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="primary" onClick={() => setIsQrModalOpen(false)}>
              Cerrar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
