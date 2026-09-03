import React, { useState } from 'react'
import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/admin/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wedding-dark text-wedding-gold">
        <p className="font-sans animate-pulse tracking-widest uppercase">Verificando sesión...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-wedding-dark text-wedding-cream">
      {/* Mobile Header */}
      <header className="flex md:hidden items-center justify-between px-6 py-4 bg-wedding-dark-gray border-b border-gray-800 z-20">
        <h2 className="font-serif text-lg text-wedding-gold tracking-wide">Boda Admin</h2>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-wedding-gold focus:outline-none p-2 cursor-pointer"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar (Responsive drawer on mobile, static on desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-800 bg-wedding-dark-gray flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-xl text-wedding-gold tracking-wide">Boda Admin</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-wedding-gold focus:outline-none p-2 cursor-pointer"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded hover:bg-wedding-dark/50 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/families"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded hover:bg-wedding-dark/50 transition"
            >
              Familias
            </Link>
            <Link
              to="/admin/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded hover:bg-wedding-dark/50 transition"
            >
              Configuración
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              handleLogout()
            }}
            className="w-full py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-900 text-red-200 rounded font-sans transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
