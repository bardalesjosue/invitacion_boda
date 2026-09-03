# Development Roadmap - Wedding Invitation Platform

Project development sequence mapped across Sprints.

## Sprint 1: Project Setup & Restructuring (Current)

- [x] Reorganize folder structures to Feature-Based layouts under `src/features`.
- [x] Set up central configurations (`config/` env, routes, constants).
- [x] Define TypeScript models (`types/`) and Firestore base repositories.
- [x] Establish layout providers and app entry point enroutings.
- [x] Implement Design System core components.
- [x] Build the Families CRUD Admin panel skeleton.

## Sprint 2: Envelope & Welcome Views

- [ ] Build welcome section.
- [ ] Implement Envelope opening animations with GSAP timelines.

## Sprint 3: Main Invitation Section

- [ ] Show customized welcome greeting per token.
- [ ] Implement countdown timer.
- [ ] Setup maps and navigation.
- [ ] Setup cash envelope instructions.

## Sprint 4: Photo Gallery

- [ ] Carousel layout.
- [ ] Fullscreen lightbox view.

## Sprint 5: RSVP form

- [ ] Validation checks with React Hook Form + Zod.
- [ ] Sync attendance to Firestore subcollections.

## Sprint 6: Admin Dashboard

- [ ] Statistics visual analytics.
- [ ] Full CRUD editing and token generators.

## Sprint 7: Data Utilities & Hosting

- [ ] Excel exportation using SheetJS.
- [ ] QR download utilities.
- [ ] Build optimization & deploy to Firebase Hosting.
