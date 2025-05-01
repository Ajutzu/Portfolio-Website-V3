'use client'

import { motion } from 'framer-motion'

interface FadeInProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    className?: string
    once?: boolean
}

export function FadeIn({ children, delay = 0, duration = 0.5, className, once = true }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: once, margin: "-100px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
} 