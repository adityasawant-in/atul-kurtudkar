import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './layout/Navbar/Navbar'
import { PageWrapper } from './layout/PageWrapper'
import { Loader } from './layout/Loader/Loader'
import { NoiseOverlay } from './components/shared/NoiseOverlay'
import { Vignette } from './components/shared/Vignette'
import { ScrollProgressBar } from './components/shared/ScrollProgressBar'
import { CursorGlow } from './components/shared/CursorGlow'
import { ErrorBoundary } from './components/shared/ErrorBoundary'
import { SkipToContent } from './components/shared/SkipToContent'
import { SearchOverlay } from './components/search/SearchOverlay'

function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    function handleKeydown(e) {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (isCmdK) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    // Last-resort catch-all for errors in the app shell itself (router
    // setup, etc). Per-page errors are now caught earlier and more
    // gracefully by the ErrorBoundary inside PageWrapper, which keeps the
    // navbar alive and self-heals on navigation — this outer one should
    // rarely, if ever, trigger.
    <ErrorBoundary>
      <BrowserRouter>
        <SkipToContent />
        <Loader />
        <ScrollProgressBar />
        <CursorGlow />
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        <PageWrapper />
        <Vignette />
        <NoiseOverlay />
        <SearchOverlay open={searchOpen} onClose={closeSearch} />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App