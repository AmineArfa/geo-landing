'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ScoreDial from '@/components/ScoreDial'
import { seedFromDomain, type SeedData } from '@/lib/seed'
import { enter, enterReduced, spring } from '@/lib/motion'

export default function Hero() {
  const [domain, setDomain] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [scanData, setScanData] = useState<SeedData | null>(null)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(800)
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get viewport height on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight)
    }
  }, [])

  // Scroll-based parallax for background (2-4% of viewport)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(
    scrollY,
    [0, viewportHeight],
    shouldReduceMotion ? [0, 0] : [0, viewportHeight * 0.03] // 3% of viewport height
  )

  // Sticky CTA scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight
        // Show after first fold (100vh)
        setShowStickyCTA(scrollPosition > viewportHeight * 0.8)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Check initial position
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!domain.trim()) {
      inputRef.current?.focus()
      return
    }

    // Trigger loading state
    setIsLoading(true)
    setScanData(null)

    // Simulate API delay (400-700ms)
    const delay = Math.random() * 300 + 400
    await new Promise((resolve) => setTimeout(resolve, delay))

    // Generate seeded data
    const data = seedFromDomain(domain.trim())
    setScanData(data)
    setIsLoading(false)

    // Analytics placeholder: scan_submitted event
  }

  const handleStickyCTAClick = () => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Focus input after scroll
      setTimeout(() => {
        inputRef.current?.focus()
      }, 600)
    }
  }

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-1"
      >
        {/* Cinematic background with kinetic gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={
            !shouldReduceMotion
              ? {
                  y: parallaxY,
                }
              : undefined
          }
        >
          {/* Subtle gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-acc-1/5 via-transparent to-acc-2/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,140,255,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,229,168,0.06),transparent_60%)]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container-content w-full max-w-[1200px] py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Headline */}
            <motion.h1
              className="display mb-6"
              {...(shouldReduceMotion ? enterReduced() : enter())}
            >
              See how AI engines perceive your brand
            </motion.h1>

            {/* Subline */}
            <motion.p
              className="text-[18px] text-ink-2 mb-12 max-w-2xl mx-auto"
              {...(shouldReduceMotion ? enterReduced(0.1) : enter(0.1))}
            >
              Get your GEO Score and discover your AI visibility, share of voice,
              and brand perception across Pulse engines
            </motion.p>

            {/* Input Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-12"
              {...(shouldReduceMotion ? enterReduced(0.2) : enter(0.2))}
            >
              <label htmlFor="domain-input" className="sr-only">
                Enter your domain
              </label>
              <input
                id="domain-input"
                ref={inputRef}
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="flex-1 px-6 py-3 rounded-2xl border border-line bg-bg-1 text-ink-1 text-[18px] placeholder:text-ink-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc-1 focus-visible:border-transparent transition-all"
                disabled={isLoading}
                aria-label="Domain name"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || !domain.trim()}
                className="whitespace-nowrap"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingShimmer />
                    Scanning...
                  </span>
                ) : (
                  'Run my scan'
                )}
              </Button>
            </motion.form>

            {/* Results Section */}
            {scanData && (
              <motion.div
                className="mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={spring}
              >
                {/* Score Dial */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={spring}
                >
                  <ScoreDial score={scanData.score} />
                </motion.div>

                {/* Metric Cards - Staggered */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                  <MetricCard
                    label="AI Mentions"
                    value={scanData.mentions.toLocaleString()}
                    delay={0}
                  />
                  <MetricCard
                    label="Share of Visibility"
                    value={`${scanData.sovPct} %`}
                    delay={0.06}
                  />
                  <MetricCard
                    label="Sentiment"
                    value={scanData.sentiment}
                    delay={0.12}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Mini CTA */}
      {showStickyCTA && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-bg-1 px-4 py-3 shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0.01 } : spring}
        >
          <div className="container-content flex items-center justify-between max-w-[1200px] mx-auto">
            <p className="text-small font-medium text-ink-1">
              {domain ? `Ready to scan ${domain}?` : 'Ready to see your GEO Score?'}
            </p>
            <Button variant="primary" onClick={handleStickyCTAClick}>
              Run my scan
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}

// Loading shimmer component
function LoadingShimmer() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  )
}

// Metric card component
interface MetricCardProps {
  label: string
  value: string
  delay: number
}

function MetricCard({ label, value, delay }: MetricCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      {...(shouldReduceMotion ? enterReduced(delay) : enter(delay))}
    >
      <Card variant="elevated" className="text-center">
        <div className="text-small text-ink-2 mb-2">{label}</div>
        <div className="text-[32px] font-semibold leading-none text-ink-1 tabular-nums">
          {value}
        </div>
      </Card>
    </motion.div>
  )
}

