import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { FamilyService } from '@/services/familyService'
import { Button, Typography } from '@/components/ui'

export const Export: React.FC = () => {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      const data = await FamilyService.getAllFamilies()

      // Format data for Excel representation
      const formattedData = data.map((inv, idx) => ({
        '#': idx + 1,
        'ID Invitación': inv.id,
        Código: inv.codigo,
        Familia: inv.nombreFamilia,
        Teléfono: inv.telefono || 'Sin registrar',
        'Pases Permitidos': inv.cantidadPermitida,
        Confirmados: inv.estado === 'Confirmado' ? inv.confirmados || 0 : 0,
        Estado: inv.estado,
        'Fecha Creación': inv.fechaCreacion ? new Date(inv.fechaCreacion).toLocaleString() : 'N/A',
        Mensaje: inv.mensaje || '',
      }))

      const worksheet = XLSX.utils.json_to_sheet(formattedData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Invitaciones')

      // Auto-fit columns
      const colWidths = formattedData.reduce((acc: Record<string, number>, row) => {
        Object.keys(row).forEach((key) => {
          const valStr = String((row as Record<string, unknown>)[key] || '')
          acc[key] = Math.max(acc[key] || 10, valStr.length)
        })
        return acc
      }, {})

      worksheet['!cols'] = Object.keys(colWidths).map((key) => ({
        wch: colWidths[key] + 3,
      }))

      XLSX.writeFile(
        workbook,
        `Reporte_Invitaciones_Boda_${new Date().toISOString().split('T')[0]}.xlsx`,
      )
    } catch (error) {
      console.error('Error exporting invitations:', error)
      alert('Ocurrió un error al exportar a Excel.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-6 text-wedding-cream bg-wedding-dark min-h-screen">
      <div className="mb-6">
        <Typography variant="h1" className="text-3xl font-serif">
          Exportar Datos de Invitados
        </Typography>
        <Typography variant="caption" className="text-gray-400 mt-1">
          Descarga un reporte completo en formato Excel (.xlsx) con los estados de asistencia en
          tiempo real.
        </Typography>
      </div>

      <div className="max-w-md p-6 rounded-lg glass-dark border border-wedding-gold/15 shadow-xl flex flex-col gap-4 font-sans">
        <p className="text-sm text-gray-300 leading-relaxed">
          El reporte incluirá todos los registros actuales en la base de datos, detallando el nombre
          de la familia, teléfono, cantidad de pases permitidos, pases confirmados, estado de
          confirmación, fecha de creación y los mensajes de buenos deseos enviados por los
          invitados.
        </p>

        <Button variant="gold" onClick={handleExport} disabled={exporting}>
          {exporting ? 'Generando Excel...' : 'Exportar Reporte Completo (.xlsx)'}
        </Button>
      </div>
    </div>
  )
}
