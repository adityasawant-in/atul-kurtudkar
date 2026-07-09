// Single source of truth for JS-side responsive logic (mirrors tokens.css)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
}

export const IS_MOBILE_QUERY = `(max-width: ${BREAKPOINTS.md - 1}px)`
export const IS_TABLET_QUERY = `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
export const IS_DESKTOP_QUERY = `(min-width: ${BREAKPOINTS.lg}px)`
