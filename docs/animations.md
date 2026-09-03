# GSAP Animation Specifications - Wedding Invitation Platform

This document describes the GSAP timeline and scroll triggers configured across the invitation flow.

## Animation Modules

### 1. Envelope opening (`src/animations/envelope.ts`)

- **Step 1**: Rotate upper flap 180 degrees.
- **Step 2**: Pull card upwards (`y: -100%`).
- **Step 3**: Fade out envelope wrappers.

### 2. Letter entry (`src/animations/letter.ts`)

- Slight horizontal and vertical letter reveal timelines with premium easings (`power3.out`).

### 3. Countdown ticks (`src/animations/countdown.ts`)

- Number rotations and scale-up jumps on unit changes.

### 4. Scroll fades (`src/animations/fade.ts`)

- `ScrollTrigger` hooks showing up layouts when intersecting viewports.
