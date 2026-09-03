export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    WELCOME: '/welcome',
    ENVELOPE: '/envelope',
    INVITATION: '/invitation',
    GALLERY: '/gallery',
    LOCATION: '/location',
    GIFTS: '/gifts',
    RSVP: '/rsvp',
    GUEST_PORTAL: '/i/:token',
  },
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    FAMILIES: '/admin/families',
    FAMILY_NEW: '/admin/family/new',
    FAMILY_EDIT: '/admin/family/edit/:id',
    GALLERY: '/admin/gallery',
    SETTINGS: '/admin/settings',
    EXPORT: '/admin/export',
  },
} as const
