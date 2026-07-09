export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Remaps a value from one range to another, clamped to the output range.
 * Used throughout the building construction timeline to isolate a scroll
 * segment (e.g. 0.2–0.3) and re-normalize it to a local 0–1 progress.
 */
export function mapRange(value, inMin, inMax, outMin = 0, outMax = 1) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1)
  return outMin + t * (outMax - outMin)
}
