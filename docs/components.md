# Design System Component Specifications - Wedding Invitation Platform

Describes components implemented in `src/components/ui/` for visual consistency.

## Components Directory

### 1. `Button`

Props:

- `variant`: `'primary' | 'secondary' | 'gold' | 'outline' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`

### 2. `Card`

Props:

- `variant`: `'dark' | 'light' | 'outline'`
  Wraps contents in glassmorphic styling or outline borders.

### 3. `Input`

Props:

- `label`: string
- `error`: string
  Standard form input styled with dark gray backgrounds and gold highlight borders.

### 4. `Badge`

Props:

- `status`: `InvitationStatus`
  Color-coded indicator showing Pending, Confirmed, Declined, or Expired status.

### 5. `Modal`

Props:

- `isOpen`: boolean
- `onClose`: function
- `title`: string
  Overlay modal dialog with glassmorphic backing and exit triggers.

### 6. `Typography`

Props:

- `variant`: `'h1' | 'h2' | 'h3' | 'body' | 'caption'`
  Enforces Cormorant Garamond for headings and Inter/Lato for description details.
