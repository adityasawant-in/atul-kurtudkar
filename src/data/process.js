import { MessagesSquare, ClipboardList, Compass, PencilRuler, BadgeCheck, HardHat, Flag } from 'lucide-react'

export const PROCESS_STEPS = [
  { id: '01', title: 'Client Consultation', description: 'Understanding project requirements, scope and constraints.', icon: MessagesSquare },
  { id: '02', title: 'Planning', description: 'Defining engineering approach, timelines and deliverables.', icon: ClipboardList },
  { id: '03', title: 'Site Analysis', description: 'Soil investigation and site condition assessment.', icon: Compass },
  { id: '04', title: 'Structural Design', description: 'RCC/steel design, detailing and drawing preparation.', icon: PencilRuler },
  { id: '05', title: 'Approval', description: 'Statutory approvals and design sign-off.', icon: BadgeCheck },
  { id: '06', title: 'Construction Support', description: 'On-site supervision through every construction stage.', icon: HardHat },
  { id: '07', title: 'Completion', description: 'Final inspection, handover and documentation.', icon: Flag },
]
