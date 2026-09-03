import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '@/lib/authService'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await AuthService.signIn(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ocurrió un error al iniciar sesión.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-wedding-cream bg-wedding-dark p-6">
      <div className="w-full max-w-md p-8 rounded-lg glass-dark border border-wedding-gold/10 shadow-2xl">
        <h2 className="font-serif text-3xl text-wedding-gold mb-6 text-center tracking-wide">
          Acceso Administrador
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-sans mb-1 text-gray-400">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-wedding-dark-gray border border-wedding-gold/20 focus:outline-none focus:border-wedding-gold text-wedding-cream text-sm"
              placeholder="admin@example.com"
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-sm font-sans mb-1 text-gray-400">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-wedding-dark-gray border border-wedding-gold/20 focus:outline-none focus:border-wedding-gold text-wedding-cream text-sm"
              placeholder="••••••••"
              required
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 px-4 mt-2 rounded bg-wedding-gold text-wedding-dark font-sans font-bold hover:bg-wedding-gold-satin transition duration-200 cursor-pointer active:scale-95 uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
