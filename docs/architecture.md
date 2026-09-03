# System Architecture - Wedding Invitation Platform

This platform is structured as a professional, feature-based Single Page Application (SPA) utilizing **React 19**, **TypeScript**, **Vite**, **Zustand**, and **Firebase (Firestore, Storage, Auth)**.

## Project Directory Reorganization

The codebase follows a feature-based architecture to guarantee clean modular separation and scalability:

- `/docs`: Global specifications, model designs, and guidelines.
- `/src/app`: Application entry point, global layout wrapper providers, and routing.
- `/src/assets`: Bundled media pipeline (images, audio, icons, fonts).
- `/src/components/ui`: Shared design system UI primitives (Button, Card, Input, Badge, Typography, Modal).
- `/src/config`: App parameters, validated environments, constant routes, and Firebase instance init.
- `/src/features`: Domain modules wrapping specific views, logic, and state.
  - `envelope/`, `invitation/`, `countdown/`, `gallery/`, `maps/`, `gifts/`, `rsvp/`, `admin/`, `authentication/`.
- `/src/lib`: Common library wrappers (Firestore, Storage, Logger).
- `/src/services`: Cross-feature logic services (e.g. excel export utility).
- `/src/store`: Global Zustand state management slices.
- `/src/types`: Centralized TypeScript interfaces.
- `/src/utils`: Common utility functions.
- `/src/animations`: Sourced GSAP timeline definitions and transitions.

## Routing Layout

The enrouting system handles public visitor entry points, dynamic guest tokens, and secure administration routes:

```
/                             -> Redirect to /welcome
/welcome                      -> Welcoming greeting page
/envelope                     -> Openable greeting card
/invitation                   -> Main invitation section
/gallery                      -> Media photos section
/location                     -> Maps address coordinates
/gifts                        -> Table registry info
/rsvp                         -> Confirmation form
/i/:token                     -> Guest entry verifier portal
/admin/login                  -> Secure auth login
/admin/dashboard              -> Statistics dashboard
/admin/families               -> CRUD list, filter, search families
/admin/family/new             -> Creation form
/admin/family/edit/:id        -> Edition form
/admin/gallery                -> Photo manager admin panel
/admin/settings               -> Settings admin panel
/admin/export                 -> Spreadsheet downloader
```
