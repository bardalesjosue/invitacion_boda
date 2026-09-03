import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Providers } from './providers'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { Envelope } from '@/pages/Envelope'
import { Invitation } from '@/pages/Invitation'
import { GalleryPage } from '@/pages/GalleryPage'
import { GuestPortal } from '@/pages/GuestPortal'
import { Login } from '@/pages/admin/Login'
import { Dashboard } from '@/pages/admin/Dashboard'
import { Families } from '@/pages/admin/Families'
import { FamilyNew } from '@/pages/admin/FamilyNew'
import { FamilyEdit } from '@/pages/admin/FamilyEdit'
import { Settings } from '@/pages/admin/Settings'
import { Export } from '@/pages/admin/Export'

const HashRedirect: React.FC<{ hash: string }> = ({ hash }) => {
  const navigate = useNavigate()
  React.useEffect(() => {
    navigate(`/invitation#${hash}`, { replace: true })
  }, [navigate, hash])
  return null
}

export const AppRouter: React.FC = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          {/* Guest verification hook */}
          <Route path="/i/:token" element={<GuestPortal />} />

          {/* Public Guest Flows */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Navigate to="/envelope" replace />} />
            <Route path="welcome" element={<Navigate to="/envelope" replace />} />
            <Route path="envelope" element={<Envelope />} />
            <Route path="invitation" element={<Invitation />} />
            <Route path="gallery" element={<HashRedirect hash="gallery" />} />
            <Route path="location" element={<HashRedirect hash="location" />} />
            <Route path="gifts" element={<HashRedirect hash="gifts" />} />
            <Route path="rsvp" element={<HashRedirect hash="rsvp" />} />
          </Route>

          {/* Admin Flows */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="families" element={<Families />} />
            <Route path="family/new" element={<FamilyNew />} />
            <Route path="family/edit/:id" element={<FamilyEdit />} />
            {/* Reusing existing page placeholders */}
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="export" element={<Export />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}
