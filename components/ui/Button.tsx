'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
  > {
  variant?: 'primary' | 'subtle' | 'link'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion()

    const baseStyles =
      'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-[180ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc-1 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      primary:
        'bg-acc-1 text-ink-1 px-6 py-3 hover:scale-[1.015] hover:-translate-y-[2px]',
      subtle:
        'bg-bg-2 text-ink-1 px-6 py-3 hover:scale-[1.015] hover:-translate-y-[2px]',
      link: 'text-ink-1 px-0 py-2 underline-offset-4 hover:underline',
    }

    const motionProps = shouldReduceMotion
      ? {}
      : {
          whileHover: { scale: 1.015, y: -2 },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.18 },
        }

    return (
      <motion.button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], className)}
        {...props}
        {...motionProps}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
