export function Divider({ className }) {
  return <div className={`h-px w-full bg-gradient-to-r from-transparent via-concrete-500/40 to-transparent ${className ?? ''}`} />
}
