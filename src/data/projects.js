export const PROJECT_CATEGORIES = [
  'Residential',
  'Commercial',
  'Industrial',
  'Institutional',
  'Structural Audit',
  'Consultancy',
]

/**
 * Every project below powers three surfaces: the /projects grid + filter,
 * the reusable /projects/:slug detail page, and the site search index.
 * Keep `stats`/`timeline`/`gallery` shapes identical across entries so the
 * detail page template never has to special-case a project.
 */
export const PROJECTS = [
  {
    slug: 'ambernath-municipal-corporation-building',
    name: 'Ambernath Municipal Corporation Building',
    location: 'Ambernath, Thane, Maharashtra',
    coordinates: { lat: 19.1858, lng: 73.1882 },
    category: 'Institutional',
    year: '2023',
    client: 'Ambernath Municipal Corporation',
    description:
      'Structural engineering consultancy for a multi-storey municipal administration building, from foundation design through to construction supervision — engineered to serve the public for decades.',
    overview:
      'A ground-plus-four civic building designed to house administrative offices, public service counters and a council chamber, engineered for a 75-year service life under Zone III seismic conditions.',
    challenges: [
      'Variable soil bearing capacity across the site footprint required a hybrid foundation strategy.',
      'Public-facing ground floor demanded large column-free spans for the service hall.',
      'Phased construction had to proceed without disrupting adjacent municipal operations.',
    ],
    solutions: [
      'Combined isolated and raft footings zoned to the geotechnical survey results.',
      'Post-tensioned transfer beams at the first floor to clear the ground-floor spans.',
      "Sequenced construction methodology coordinated with the client's operational calendar.",
    ],
    timeline: [
      { label: 'Site Analysis & Survey', duration: '3 weeks' },
      { label: 'Structural Design & Approval', duration: '6 weeks' },
      { label: 'Construction Supervision', duration: '14 months' },
      { label: 'Handover', duration: '2 weeks' },
    ],
    stats: [
      { label: 'Built-up Area', value: '42,000 sq.ft' },
      { label: 'Floors', value: 'G + 4' },
      { label: 'Structural System', value: 'RCC Frame' },
      { label: 'Seismic Zone', value: 'Zone III' },
    ],
    gallery: [
      { caption: 'Front elevation', image: '/images/ambernath-front-elevation.jpg' },
      { caption: 'Council chamber structural frame' },
      { caption: 'Foundation raft pour' },
      { caption: 'Completed facade' },
    ],
    featured: true,
  },
  {
    slug: 'kalyan-heights-residential-tower',
    name: 'Kalyan Heights Residential Tower',
    location: 'Kalyan, Thane, Maharashtra',
    coordinates: { lat: 19.2403, lng: 73.1305 },
    category: 'Residential',
    year: '2022',
    client: 'Private Developer',
    description:
      'Structural design for a G+14 residential tower with podium parking, engineered for durability and cost-efficient formwork repetition.',
    overview:
      'A fourteen-storey residential tower over a two-level podium, designed for a repeatable floor plate to keep formwork cycles fast and cost-efficient without compromising seismic performance.',
    challenges: [
      'Podium transfer structure needed to reconcile a wider parking grid with the tower column grid above.',
      'Wind loads at height required careful lateral stiffness planning without oversized shear walls eating into saleable area.',
    ],
    solutions: [
      'Transfer slab at podium level with column staggering resolved through load-path modelling.',
      'Optimised shear-wall core placement reduced lateral drift while preserving unit layouts.',
    ],
    timeline: [
      { label: 'Concept & Structural Scheme', duration: '4 weeks' },
      { label: 'Detailed Design & Drawings', duration: '8 weeks' },
      { label: 'Construction Supervision', duration: '22 months' },
      { label: 'Handover', duration: '3 weeks' },
    ],
    stats: [
      { label: 'Built-up Area', value: '1.1 lakh sq.ft' },
      { label: 'Floors', value: 'G + 14' },
      { label: 'Structural System', value: 'RCC Shear Wall Frame' },
      { label: 'Seismic Zone', value: 'Zone III' },
    ],
    gallery: [
      { caption: 'Tower silhouette' },
      { caption: 'Podium transfer structure' },
      { caption: 'Typical floor slab pour' },
    ],
  },
  {
    slug: 'dombivli-industrial-warehouse-complex',
    name: 'Dombivli Industrial Warehouse Complex',
    location: 'Dombivli MIDC, Maharashtra',
    coordinates: { lat: 19.2167, lng: 73.0833 },
    category: 'Industrial',
    year: '2023',
    client: 'Manufacturing Client (Confidential)',
    description:
      'Long-span pre-engineered steel structural design for a heavy-load warehouse and light manufacturing complex.',
    overview:
      'A 60m clear-span steel-frame warehouse designed to carry overhead crane loads and heavy racking, with a structural system chosen to keep erection time to a minimum.',
    challenges: [
      'Overhead EOT crane loading needed to be accommodated without heavy intermediate columns.',
      'Aggressive project timeline demanded a structural system suited to fast fabrication and erection.',
    ],
    solutions: [
      'Long-span portal frames in structural steel sized for combined crane and wind loading.',
      'Pre-engineered building approach with bolted connections to compress the erection schedule.',
    ],
    timeline: [
      { label: 'Structural Concept', duration: '2 weeks' },
      { label: 'Detailed Steel Design', duration: '5 weeks' },
      { label: 'Fabrication Supervision', duration: '4 months' },
      { label: 'Erection Supervision', duration: '3 months' },
    ],
    stats: [
      { label: 'Built-up Area', value: '85,000 sq.ft' },
      { label: 'Clear Span', value: '60 m' },
      { label: 'Structural System', value: 'PEB Steel Frame' },
      { label: 'Crane Capacity', value: '15 T EOT' },
    ],
    gallery: [
      { caption: 'Steel portal frame erection' },
      { caption: 'Crane gantry beam' },
      { caption: 'Completed warehouse interior' },
    ],
  },
  {
    slug: 'thane-heritage-society-structural-audit',
    name: 'Thane Heritage Society Structural Audit',
    location: 'Thane West, Maharashtra',
    coordinates: { lat: 19.2183, lng: 72.9781 },
    category: 'Structural Audit',
    year: '2024',
    client: 'Cooperative Housing Society',
    description:
      'Independent condition assessment of a 35-year-old residential society, identifying distress and recommending a phased repair programme.',
    overview:
      'A full structural audit of a four-building cooperative housing society, combining visual survey, non-destructive testing and load re-assessment to certify continued occupancy and scope repairs.',
    challenges: [
      'Concrete carbonation and rebar corrosion were visible across multiple buildings of varying age.',
      'Residents needed continued occupancy during the investigation and eventual repair works.',
    ],
    solutions: [
      'Non-destructive testing (rebound hammer, carbonation depth, half-cell potential) mapped distress without disruptive demolition.',
      'Phased repair methodology sequenced building-by-building to avoid displacing residents.',
    ],
    timeline: [
      { label: 'Visual Survey & NDT', duration: '3 weeks' },
      { label: 'Structural Audit Report', duration: '2 weeks' },
      { label: 'Repair Design', duration: '3 weeks' },
      { label: 'Repair Supervision', duration: '5 months' },
    ],
    stats: [
      { label: 'Buildings Audited', value: '4' },
      { label: 'Building Age', value: '35 years' },
      { label: 'Audit Method', value: 'NDT + Visual' },
      { label: 'Repair Scope', value: 'Structural + Waterproofing' },
    ],
    gallery: [
      { caption: 'Rebound hammer testing' },
      { caption: 'Corroded rebar exposure' },
      { caption: 'Post-repair facade' },
    ],
  },
  {
    slug: 'navi-mumbai-commercial-plaza',
    name: 'Navi Mumbai Commercial Plaza',
    location: 'Vashi, Navi Mumbai, Maharashtra',
    coordinates: { lat: 19.0771, lng: 73.0028 },
    category: 'Commercial',
    year: '2021',
    client: 'Private Developer',
    description:
      'Structural design for a mixed-use retail and office plaza with basement parking and large glazed atriums.',
    overview:
      'A four-storey commercial plaza with two basement parking levels, designed around large atrium voids for natural light while keeping retail floor plates column-efficient.',
    challenges: [
      'Two-level basement required a deep excavation and retention system in a dense urban plot.',
      'Atrium voids interrupted the regular column grid, concentrating loads onto fewer transfer members.',
    ],
    solutions: [
      'Contiguous pile wall shoring system designed for the deep basement excavation.',
      'Transfer beams and localised deep beams routed loads around the atrium voids cleanly.',
    ],
    timeline: [
      { label: 'Structural Scheme & Basement Design', duration: '5 weeks' },
      { label: 'Detailed Design', duration: '7 weeks' },
      { label: 'Construction Supervision', duration: '16 months' },
      { label: 'Handover', duration: '2 weeks' },
    ],
    stats: [
      { label: 'Built-up Area', value: '78,000 sq.ft' },
      { label: 'Basements', value: '2 Levels' },
      { label: 'Structural System', value: 'RCC Frame' },
      { label: 'Seismic Zone', value: 'Zone III' },
    ],
    gallery: [
      { caption: 'Basement excavation' },
      { caption: 'Atrium structural frame' },
      { caption: 'Completed plaza facade' },
    ],
  },
  {
    slug: 'badlapur-school-campus-consultancy',
    name: 'Badlapur School Campus Consultancy',
    location: 'Badlapur, Thane, Maharashtra',
    coordinates: { lat: 19.1556, lng: 73.2359 },
    category: 'Consultancy',
    year: '2022',
    client: 'Educational Trust',
    description:
      'End-to-end structural consultancy for a new institutional school campus, from concept through statutory approvals.',
    overview:
      'Structural consultancy for a three-block school campus including classrooms, an assembly hall with a long-span roof, and administrative offices, delivered alongside statutory approval support.',
    challenges: [
      'Assembly hall required a long clear span roof structure without intermediate columns.',
      'Statutory approvals needed close coordination across multiple structural drawing packages.',
    ],
    solutions: [
      'Steel truss roof system spanning the assembly hall, integrated cleanly with the RCC block below.',
      'Consolidated drawing and documentation package streamlined the municipal approval process.',
    ],
    timeline: [
      { label: 'Concept & Approvals', duration: '6 weeks' },
      { label: 'Detailed Structural Design', duration: '8 weeks' },
      { label: 'Construction Supervision', duration: '11 months' },
      { label: 'Handover', duration: '2 weeks' },
    ],
    stats: [
      { label: 'Built-up Area', value: '55,000 sq.ft' },
      { label: 'Blocks', value: '3' },
      { label: 'Assembly Hall Span', value: '24 m' },
      { label: 'Structural System', value: 'RCC + Steel Truss' },
    ],
    gallery: [
      { caption: 'Assembly hall truss erection' },
      { caption: 'Classroom block frame' },
      { caption: 'Completed campus' },
    ],
  },
]

export const FEATURED_PROJECT = (() => {
  const p = PROJECTS.find((project) => project.featured) ?? PROJECTS[0]
  return {
    name: p.name,
    location: p.location,
    category: `${p.category} · Municipal`,
    year: p.year,
    description: p.description,
    timeline: p.timeline,
    stats: p.stats,
  }
})()

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}

export function getRelatedProjects(project, count = 3) {
  return PROJECTS.filter((p) => p.slug !== project.slug && p.category === project.category)
    .concat(PROJECTS.filter((p) => p.slug !== project.slug && p.category !== project.category))
    .slice(0, count)
}
