import React from 'react'

export const Settings: React.FC = () => {
  return (
    <div className="p-6 text-wedding-cream bg-wedding-dark min-h-screen">
      <h1 className="font-serif text-3xl text-wedding-gold mb-6">
        Configuración Global del Evento
      </h1>
      <div className="max-w-2xl p-6 rounded-lg glass-dark">
        <form className="space-y-6 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nombre Novia</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-wedding-dark-gray border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nombre Novio</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-wedding-dark-gray border border-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Fecha de la Boda</label>
            <input
              type="datetime-local"
              className="w-full px-4 py-2 rounded bg-wedding-dark-gray border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Dirección del Evento</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 rounded bg-wedding-dark-gray border border-gray-700"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-wedding-gold text-wedding-dark rounded font-medium hover:bg-wedding-gold-satin transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  )
}
