import { clsx } from 'clsx'

/**
 * Merge conditional class names. Thin wrapper around clsx so the rest of the
 * app has a single, swappable entry point for class-name composition.
 */
export function cn(...inputs) {
  return clsx(...inputs)
}
