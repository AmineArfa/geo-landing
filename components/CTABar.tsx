'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from './ui/Button'

export default function CTABar() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      // Check initial scroll position
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!mounted || !isVisible) return null

  const containerClass =
    'fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-bg-1 px-4 py-4 shadow-soft'

  const motionProps = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.01 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.3 },
      }

  return (
    <motion.div className={containerClass} {...motionProps}>
      <div className="container-content flex items-center justify-between">
        <div>
          <p className="text-small font-medium text-ink-1">
            Ready to see your GEO Score?
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="subtle"
            onClick={() => {
              // Analytics: cta_clicked event would be fired here
            }}
          >
            Learn more
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Analytics: cta_clicked event would be fired here
            }}
          >
            Run my scan
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
