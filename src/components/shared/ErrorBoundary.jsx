import { Component } from 'react'
import { RefreshCw } from 'lucide-react'

/**
 * Top-level class error boundary — React still requires a class component
 * for this (no hook equivalent). Catches render-time errors anywhere below
 * it and shows a branded fallback instead of a blank white screen, which is
 * what a Fortune 500 client would otherwise see on a production bug.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // In production this is the hook point for an error-reporting service
    // (Sentry, LogRocket, etc). Left as a console call so nothing is
    // silently swallowed during development.
    console.error('Unhandled UI error:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-6 bg-structural-950 px-6 text-center">
        <span className="font-display text-xs tracking-[0.3em] text-concrete-500">
          SOMETHING WENT WRONG
        </span>
        <h1 className="max-w-md font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
          We hit a structural snag.
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-ink-400">
          The page failed to render correctly. Reloading usually resolves this — if it keeps
          happening, please get in touch directly.
        </p>
        <button
          type="button"
          onClick={this.handleReload}
          className="mt-2 inline-flex items-center gap-2 rounded-sm bg-concrete-500 px-6 py-3 font-display text-sm font-medium text-structural-950 transition-colors hover:bg-concrete-300"
        >
          <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
          Reload Page
        </button>
      </main>
    )
  }
}
