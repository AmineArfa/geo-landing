'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { enter } from '@/lib/motion'

export default function SpecimenPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-bg-1">
      <div className="container-content py-[120px]">
        {/* Typography Section */}
        <motion.section
          className="mb-[120px]"
          {...(shouldReduceMotion ? { initial: {}, animate: {} } : enter(0))}
        >
          <h2 className="mb-12">Typography</h2>

          <div className="space-y-8">
            <div>
              <p className="text-small text-ink-2 mb-2">
                Display / Hero (72px, 700)
              </p>
              <h1 className="display">
                Measure how AI engines perceive your brand
              </h1>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-2">
                H2 Heading (40px, 600)
              </p>
              <h2>Benchmark stories</h2>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-2">
                H3 Heading (24px, 600)
              </p>
              <h3>Share of visibility</h3>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-2">
                Body Text (18px, 400)
              </p>
              <p>
                GEO Analysis Benchmark measures how AI engines like ChatGPT,
                Gemini, and Claude perceive your brand. Get instant insights
                into your GEO Score, Visibility Index, and Perception Index.
              </p>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-2">
                Small Text (14px, 400)
              </p>
              <p className="text-small">
                This is small text used for labels, captions, and secondary
                information.
              </p>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-2">
                Mono Text (13px, 500)
              </p>
              <p className="text-mono">const geoScore = calculateGEO()</p>
            </div>
          </div>
        </motion.section>

        {/* Interactive Elements Section */}
        <motion.section
          className="mb-[120px]"
          {...(shouldReduceMotion ? { initial: {}, animate: {} } : enter(0.1))}
        >
          <h2 className="mb-12">Interactive Elements</h2>

          <div className="space-y-6">
            <div>
              <p className="text-small text-ink-2 mb-4">Primary Button</p>
              <Button variant="primary">Run my scan</Button>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-4">Subtle Button</p>
              <Button variant="subtle">Learn more</Button>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-4">Link Button</p>
              <Button variant="link">View documentation</Button>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-4">Disabled State</p>
              <Button variant="primary" disabled>
                Disabled button
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Layout Components Section */}
        <motion.section
          className="mb-[120px]"
          {...(shouldReduceMotion ? { initial: {}, animate: {} } : enter(0.2))}
        >
          <h2 className="mb-12">Layout Components</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="default">
              <h3 className="mb-4">Default Card</h3>
              <p className="text-small text-ink-2">
                This card uses the default variant with a border. Perfect for
                content sections that need subtle separation.
              </p>
            </Card>

            <Card variant="elevated">
              <h3 className="mb-4">Elevated Card</h3>
              <p className="text-small text-ink-2">
                This card uses the elevated variant with a soft shadow. Great
                for highlighting important content.
              </p>
            </Card>
          </div>
        </motion.section>

        {/* Spacing Scale Section */}
        <motion.section
          className="mb-[120px]"
          {...(shouldReduceMotion ? { initial: {}, animate: {} } : enter(0.3))}
        >
          <h2 className="mb-12">Spacing Scale</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">4px</div>
              <div className="h-1 w-1 bg-acc-1 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">8px</div>
              <div className="h-2 w-2 bg-acc-1 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">16px</div>
              <div className="h-4 w-4 bg-acc-1 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">24px</div>
              <div className="h-6 w-6 bg-acc-1 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">32px</div>
              <div className="h-8 w-8 bg-acc-1 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">48px</div>
              <div className="h-12 w-12 bg-acc-1 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">64px</div>
              <div className="h-16 w-16 bg-acc-1 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-small text-ink-2">120px</div>
              <div className="h-[120px] w-[120px] bg-acc-1 rounded"></div>
            </div>
          </div>
        </motion.section>

        {/* Motion Demo Section */}
        <motion.section
          className="mb-[120px]"
          {...(shouldReduceMotion ? { initial: {}, animate: {} } : enter(0.4))}
        >
          <h2 className="mb-12">Motion Demo</h2>

          <div className="space-y-8">
            <div>
              <p className="text-small text-ink-2 mb-4">
                Entrance animation (fade + 8px rise)
              </p>
              <motion.div
                className="inline-block"
                {...(shouldReduceMotion
                  ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
                  : enter(0))}
              >
                <Card variant="elevated">
                  <p>This card animates on mount</p>
                </Card>
              </motion.div>
            </div>

            <div>
              <p className="text-small text-ink-2 mb-4">Hover interactions</p>
              <div className="flex gap-4">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <Card variant="default">Hover me</Card>
                </motion.div>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <Card variant="elevated">Hover me</Card>
                </motion.div>
              </div>
            </div>

            {shouldReduceMotion && (
              <div className="text-small text-ink-2">
                Reduced motion is enabled. Animations are reduced to
                opacity-only.
              </div>
            )}
          </div>
        </motion.section>

        {/* Color Palette Section */}
        <motion.section
          className="mb-[120px]"
          {...(shouldReduceMotion ? { initial: {}, animate: {} } : enter(0.5))}
        >
          <h2 className="mb-12">Color Palette</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="h-24 w-full bg-bg-1 border border-line rounded-2xl mb-2"></div>
              <p className="text-small font-medium">bg-1</p>
              <p className="text-small text-ink-2">#ffffff</p>
            </div>
            <div>
              <div className="h-24 w-full bg-bg-2 rounded-2xl mb-2"></div>
              <p className="text-small font-medium">bg-2</p>
              <p className="text-small text-ink-2">#f6f7f9</p>
            </div>
            <div>
              <div className="h-24 w-full bg-ink-1 rounded-2xl mb-2"></div>
              <p className="text-small font-medium text-ink-2">ink-1</p>
              <p className="text-small text-ink-2">#0b0f17</p>
            </div>
            <div>
              <div className="h-24 w-full bg-acc-1 rounded-2xl mb-2"></div>
              <p className="text-small font-medium">acc-1</p>
              <p className="text-small text-ink-2">#00E5A8</p>
            </div>
            <div>
              <div className="h-24 w-full bg-acc-2 rounded-2xl mb-2"></div>
              <p className="text-small font-medium">acc-2</p>
              <p className="text-small text-ink-2">#5B8CFF</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
