'use client'

import { motion } from 'framer-motion'

interface SlideInProps {
    children: React.ReactNode
    direction?: 'left' | 'right' | 'up' | 'down'
    delay?: number
    duration?: number
    className?: string
    once?: boolean
}

export function SlideIn({ 
    children, 
    direction = 'left', 
    delay = 0, 
    duration = 0.5, 
    className,
    once = true
}: SlideInProps) {
    const getInitialX = () => {
        switch (direction) {
            case 'left': return -100
            case 'right': return 100
            default: return 0
        }
    }

    const getInitialY = () => {
        switch (direction) {
            case 'up': return 100
            case 'down': return -100
            default: return 0
        }
    }

    return (
        <motion.div
            initial={{ 
                opacity: 0,
                x: getInitialX(),
                y: getInitialY()
            }}
            whileInView={{ 
                opacity: 1,
                x: 0,
                y: 0
            }}
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