// Central timing / easing config so GSAP, Framer Motion and CSS transitions
// never drift out of sync with each other.
export const EASE = {
  structural: [0.16, 1, 0.3, 1],
  structuralCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
  enter: [0.22, 1, 0.36, 1],
  exit: [0.7, 0, 0.84, 0],
}

export const DURATION = {
  micro: 0.2,
  reveal: 0.8,
  page: 0.6,
}

// Scroll distance (in px) the building-construction ScrollTrigger stays
// pinned for before releasing back to normal scroll — this is just the
// pin's boundary now (stepping between stages is driven by discrete wheel
// gestures, not by scrubbing across this distance).
export const BUILDING_SCROLL_LENGTH = 600

// Named progress checkpoints for the construction scroll experience.
// Consolidated down to 5 story beats (from an original 11) so each scroll
// gesture covers a meaningful chunk of the build rather than a lot of very
// similar, closely-spaced steps.
export const CONSTRUCTION_STAGES = {
  blueprint: [0, 0.2],
  foundation: [0.2, 0.4],
  structure: [0.4, 0.6],
  facade: [0.6, 0.8],
  sunset: [0.8, 1.0],
}

export const NAV = {
  heightIdle: 88,
  heightScrolled: 64,
  scrollThreshold: 40,
}
