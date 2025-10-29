import { Variants } from 'framer-motion'

export const spring = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 18,
}

export const enter = (delay = 0): Variants => {
  return {
    initial: {
      opacity: 0,
      y: 8,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ...spring,
        delay,
      },
    },
  }
}

export const enterReduced = (delay = 0): Variants => {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        delay,
      },
    },
  }
}
