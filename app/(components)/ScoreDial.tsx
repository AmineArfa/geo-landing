'use client'

import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { spring } from '@/lib/motion'

interface ScoreDialProps {
  score: number // 0-100
  size?: number // diameter in pixels
  strokeWidth?: number
}

export default function ScoreDial({
  score,
  size = 200,
  strokeWidth = 12,
}: ScoreDialProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const progress = useMotionValue(0)
  const springProgress = useSpring(progress, {
    stiffness: 120,
    damping: 18,
  })

  // Calculate dimensions
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  // Transform spring progress to strokeDashoffset
  const strokeOffset = useTransform(
    springProgress,
    (value) => circumference * (1 - value / 100)
  )

  useEffect(() => {
    // Start animation when score changes
    if (shouldReduceMotion) {
      progress.set(score)
      setDisplayScore(score)
    } else {
      // Reset to 0 first, then animate to score
      progress.set(0)
      setDisplayScore(0)
      // Request animation frame to ensure initial value is set before animating
      requestAnimationFrame(() => {
        progress.set(score)
      })
    }
  }, [score, progress, shouldReduceMotion])

  useEffect(() => {
    // Update display score based on spring animation
    const unsubscribe = springProgress.on('change', (latest) => {
      setDisplayScore(Math.round(latest))
    })
    return () => unsubscribe()
  }, [springProgress])

  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return '#00E5A8' // acc-1 (fluo mint)
    if (score >= 60) return '#5B8CFF' // acc-2 (electric blue)
    return 'rgba(11,15,23,0.4)' // ink-2 muted
  }

  const color = getColor()

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative"
        style={{ width: size, height: size }}
        aria-label={`GEO Score: ${displayScore}`}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          aria-hidden="true"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(11,15,23,0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              shouldReduceMotion
                ? { strokeDashoffset: circumference * (1 - score / 100) }
                : {}
            }
            style={
              !shouldReduceMotion
                ? {
                    strokeDashoffset: strokeOffset,
                  }
                : undefined
            }
            transition={shouldReduceMotion ? { duration: 0.01 } : spring}
          />
        </svg>
        {/* Score text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.span
              className="block text-[56px] font-bold leading-none text-ink-1 tabular-nums"
              aria-live="polite"
              aria-atomic="true"
            >
              {displayScore}
            </motion.span>
            <span className="text-small mt-1 block text-ink-2">GEO Score</span>
          </div>
        </div>
      </div>
    </div>
  )
}
