import { EASE } from '../../../constants/animationConfig'

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE.structural },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE.structural } },
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

export const staggerLetter = {
  hidden: { opacity: 0, y: '0.6em', rotate: 4 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: EASE.enter },
  },
}

export const navSlide = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.structural } },
}

export const mobileMenuPanel = {
  hidden: { clipPath: 'inset(0% 0% 100% 0% round 24px)' },
  show: {
    clipPath: 'inset(0% 0% 0% 0% round 24px)',
    transition: { duration: 0.6, ease: EASE.structural },
  },
  exit: {
    clipPath: 'inset(0% 0% 100% 0% round 24px)',
    transition: { duration: 0.45, ease: EASE.exit },
  },
}

export const mobileLinkItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.enter } },
}

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.3, ease: EASE.structural } },
  tap: { scale: 0.97 },
}
