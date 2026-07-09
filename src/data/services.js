export const SERVICES = [
  {
    id: 'structural-design',
    title: 'Structural Design',
    description:
      'Complete RCC and steel structural design engineered for safety, efficiency and long-term durability.',
    overview:
      'We design the full structural system of a building — foundations, framing, slabs and lateral systems — balancing safety, buildability and cost from the earliest concept sketch through to issued-for-construction drawings.',
    process: [
      { title: 'Load Assessment', detail: 'Dead, live, seismic and wind loads are established against the applicable IS codes.' },
      { title: 'Structural Scheme', detail: 'A framing system is proposed and tested against architectural constraints.' },
      { title: 'Analysis & Design', detail: 'Full structural analysis and member design using industry-standard software.' },
      { title: 'Drawings & Detailing', detail: 'GFC drawings and reinforcement detailing issued for construction.' },
    ],
    benefits: [
      'Optimised member sizing keeps material cost under control.',
      'Design coordinated with architectural and MEP drawings to avoid clashes.',
      'Every design carries full calculation backup for statutory submission.',
    ],
    technologies: ['STAAD.Pro', 'ETABS', 'AutoCAD', 'IS 456 / IS 1893'],
    faqs: [
      { q: 'How long does structural design typically take?', a: 'For a mid-sized residential or commercial building, scheme design through issued drawings typically takes 6–10 weeks depending on complexity and approval cycles.' },
      { q: 'Do you provide calculations for approvals?', a: 'Yes — every design is delivered with full structural calculations formatted for municipal and statutory submission.' },
    ],
  },
  {
    id: 'rcc-design',
    title: 'RCC Design',
    description:
      'Reinforced concrete design and detailing calibrated to load, soil and seismic conditions.',
    overview:
      'Reinforced cement concrete design covering foundations, columns, beams and slabs, detailed to site-specific soil investigation reports and seismic zone requirements.',
    process: [
      { title: 'Soil Report Review', detail: 'Geotechnical data is used to select the appropriate foundation type.' },
      { title: 'Member Design', detail: 'Columns, beams and slabs are sized and reinforced to code.' },
      { title: 'Detailing', detail: 'Bar bending schedules and detailed reinforcement drawings are prepared.' },
      { title: 'Site Support', detail: 'Design queries during construction are resolved as they arise.' },
    ],
    benefits: [
      'Reinforcement detailing minimises wastage and simplifies site execution.',
      'Foundation type matched precisely to soil bearing capacity.',
      'Bar bending schedules reduce estimation errors for contractors.',
    ],
    technologies: ['STAAD.Pro', 'AutoCAD', 'IS 456', 'IS 875'],
    faqs: [
      { q: 'Can you design for an existing soil report?', a: 'Yes, we work directly from your geotechnical investigation report, or can coordinate a new soil test if none exists.' },
    ],
  },
  {
    id: 'structural-audit',
    title: 'Structural Audit',
    description:
      'Independent condition assessment and audit reporting for ageing or distressed structures.',
    overview:
      'A structured visual and instrumented assessment of an existing building\'s condition, used to certify continued occupancy, plan repairs, or satisfy municipal redevelopment and insurance requirements.',
    process: [
      { title: 'Visual Survey', detail: 'Every structural element is inspected and distress is mapped and photographed.' },
      { title: 'Non-Destructive Testing', detail: 'Rebound hammer, carbonation depth and rebar corrosion testing as needed.' },
      { title: 'Audit Report', detail: 'A structural fitness certificate and repair recommendation report is issued.' },
      { title: 'Repair Design', detail: 'If needed, a detailed repair and rehabilitation scope is designed.' },
    ],
    benefits: [
      'Statutory-format reports accepted by municipal corporations.',
      'Non-invasive testing avoids unnecessary damage to finishes.',
      'Clear, prioritised repair recommendations rather than vague findings.',
    ],
    technologies: ['Rebound Hammer', 'Carbonation Testing', 'Half-Cell Potential', 'Ultrasonic Pulse Velocity'],
    faqs: [
      { q: 'How often should a building be audited?', a: 'Municipal regulations in Maharashtra typically require structural audits every 5 years once a building crosses 30 years of age; we can confirm the exact requirement for your building\'s age and location.' },
      { q: 'What happens after the audit report?', a: 'If repairs are recommended, we can design the repair scope and supervise execution, or hand the report to your society/contractor of choice.' },
    ],
  },
  {
    id: 'construction-consultancy',
    title: 'Construction Consultancy',
    description:
      'On-site engineering supervision and consultation through every phase of construction.',
    overview:
      'Hands-on structural supervision during construction, verifying that what gets built on site matches the issued design — from formwork checks to concrete pour approvals.',
    process: [
      { title: 'Pre-Construction Review', detail: 'Drawings and site conditions are cross-checked before work begins.' },
      { title: 'Stage Inspections', detail: 'Formwork, reinforcement and concrete quality are inspected at each stage.' },
      { title: 'Query Resolution', detail: 'Design clarifications are turned around quickly to avoid site delays.' },
      { title: 'Completion Certification', detail: 'Structural completion is certified against the approved design.' },
    ],
    benefits: [
      'Reduces rework by catching deviations before concrete is poured.',
      'Faster turnaround on site queries keeps the construction schedule moving.',
      'Independent certification supports statutory occupancy approvals.',
    ],
    technologies: ['Site Inspection Checklists', 'Concrete Cube Testing', 'AutoCAD'],
    faqs: [
      { q: 'How frequently do you visit site?', a: 'Visit frequency is scoped to the project — typically weekly for active pour stages, with additional visits for critical milestones like foundation and transfer levels.' },
    ],
  },
  {
    id: 'residential-projects',
    title: 'Residential Projects',
    description:
      'Structural engineering for individual homes, bungalows and residential apartment developments.',
    overview:
      'Structural design tailored to residential scale — from an individual bungalow to a multi-storey apartment tower — balancing efficient formwork repetition with the layout freedom homeowners and developers need.',
    process: [
      { title: 'Layout Coordination', detail: 'Structural grid is aligned with the architectural floor plan.' },
      { title: 'Structural Scheme', detail: 'Foundation and framing system selected for the building height and soil.' },
      { title: 'Design & Drawings', detail: 'Full design package issued for construction and approvals.' },
      { title: 'Construction Support', detail: 'Ongoing supervision through to handover.' },
    ],
    benefits: [
      'Column placement negotiated to preserve open living spaces.',
      'Repeatable floor plates reduce formwork cost on multi-storey projects.',
      'Full statutory drawing package for municipal approval.',
    ],
    technologies: ['STAAD.Pro', 'ETABS', 'AutoCAD'],
    faqs: [
      { q: 'Can you work with our architect\'s existing plan?', a: 'Yes — we coordinate directly with your architect to fit an efficient structural grid within the approved layout.' },
    ],
  },
  {
    id: 'commercial-projects',
    title: 'Commercial Projects',
    description:
      'Structural systems designed for retail, office and mixed-use commercial developments.',
    overview:
      'Structural design for retail, office and mixed-use buildings, where large open floor plates, basement parking and long-term flexibility drive the framing strategy.',
    process: [
      { title: 'Space Planning Input', detail: 'Column grid is optimised against tenant/retail space requirements.' },
      { title: 'Basement & Podium Design', detail: 'Parking levels and transfer structures are designed where required.' },
      { title: 'Structural Design', detail: 'Full analysis and design for the complete building system.' },
      { title: 'Construction Supervision', detail: 'Site supervision through to occupancy.' },
    ],
    benefits: [
      'Column-efficient grids maximise leasable/retail floor area.',
      'Basement and transfer structures designed for future flexibility.',
      'Coordinated with MEP and facade consultants from concept stage.',
    ],
    technologies: ['ETABS', 'SAFE', 'AutoCAD'],
    faqs: [
      { q: 'Do you handle basement and deep excavation design?', a: 'Yes, including shoring and retention system design for multi-level basements in dense urban plots.' },
    ],
  },
  {
    id: 'industrial-structures',
    title: 'Industrial Structures',
    description:
      'Heavy-load structural design for warehouses, factories and industrial facilities.',
    overview:
      'Structural design for warehouses, factories and process facilities, engineered for long clear spans, heavy equipment and crane loads, and fast erection timelines.',
    process: [
      { title: 'Load Definition', detail: 'Equipment, crane and racking loads are established with the client.' },
      { title: 'Structural System Selection', detail: 'Steel or PEB systems evaluated for span and schedule requirements.' },
      { title: 'Design & Fabrication Drawings', detail: 'Detailed steel design issued for fabrication.' },
      { title: 'Erection Supervision', detail: 'Site supervision through fabrication and erection.' },
    ],
    benefits: [
      'Long-span steel systems minimise intermediate columns on the shop floor.',
      'Designs account for crane and dynamic equipment loading from day one.',
      'Fabrication-ready drawings reduce site rework.',
    ],
    technologies: ['STAAD.Pro', 'Steel Detailing (IS 800)', 'PEB Systems'],
    faqs: [
      { q: 'Do you design for overhead crane systems?', a: 'Yes, crane gantry girders and supporting columns are designed to the specific crane capacity and duty cycle.' },
    ],
  },
  {
    id: 'institutional-buildings',
    title: 'Institutional Buildings',
    description:
      'Structural consultancy for municipal, educational and public institutional buildings.',
    overview:
      'Structural consultancy for schools, municipal offices and other public institutional buildings, where long design life, public safety margins and statutory approval processes are central.',
    process: [
      { title: 'Statutory Coordination', detail: 'Design developed alongside the relevant municipal/government approval process.' },
      { title: 'Structural Design', detail: 'Framing and foundation systems designed for long-term public use.' },
      { title: 'Documentation', detail: 'Complete drawing and calculation package for statutory submission.' },
      { title: 'Construction Supervision', detail: 'On-site supervision through to handover.' },
    ],
    benefits: [
      'Designs built with generous long-term durability and safety margins.',
      'Documentation formatted for smooth statutory approval.',
      'Experience navigating municipal and government client processes.',
    ],
    technologies: ['STAAD.Pro', 'ETABS', 'AutoCAD'],
    faqs: [
      { q: 'Have you worked with municipal/government clients before?', a: 'Yes, including full-cycle consultancy for municipal administrative buildings and educational institution campuses.' },
    ],
  },
]

export function getServiceById(id) {
  return SERVICES.find((service) => service.id === id)
}
