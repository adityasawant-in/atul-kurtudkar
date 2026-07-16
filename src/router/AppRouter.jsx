import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { Services } from '../pages/Services'
import { ServiceDetail } from '../pages/ServiceDetail'
import { Projects } from '../pages/Projects'
import { ProjectDetail } from '../pages/ProjectDetail'
import { Contact } from '../pages/Contact'
import { NotFound } from '../pages/NotFound'

/**
 * The homepage keeps its single long-scroll layout (see Home.jsx), while
 * About/Services/Projects/Contact are now full dedicated routes with their
 * own hero, SEO and content — reusable :serviceId / :slug templates power
 * every individual service and project page.
 *
 * `location` is passed in explicitly (rather than read internally via
 * `useLocation()`) so this stays decoupled from the live router context —
 * see PageWrapper.jsx for why that matters for the page-transition
 * animation.
 */
export function AppRouter({ location }) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:serviceId" element={<ServiceDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
