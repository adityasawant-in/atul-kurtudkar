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

// Named progress checkpoints from the Phase 1 construction timeline plan.
// Every stage component (Building, Crane, Skyline, lighting) reads its own
// slice out of this table via mapRange().
export const CONSTRUCTION_STAGES = {
  blueprint: [0, 0.1],
  excavation: [0.1, 0.2],
  foundation: [0.2, 0.3],
  basement: [0.3, 0.4],
  groundFloor: [0.4, 0.5],
  firstFloor: [0.5, 0.6],
  secondFloor: [0.6, 0.7],
  facade: [0.7, 0.8],
  landscaping: [0.8, 0.9],
  liveIn: [0.9, 0.95],
  sunset: [0.95, 1.0],
}

export const NAV = {
  heightIdle: 88,
  heightScrolled: 64,
  scrollThreshold: 40,
}
