import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-ink-100/85 transition-colors duration-300 hover:text-concrete-500 ${className ?? ''}`}
    >
      {isDark ? <Sun className="h-4.5 w-4.5" strokeWidth={2} /> : <Moon className="h-4.5 w-4.5" strokeWidth={2} />}
    </button>
  )
}
