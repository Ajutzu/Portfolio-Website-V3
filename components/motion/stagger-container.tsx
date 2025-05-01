'use client'

import { motion } from 'framer-motion'

interface StaggerContainerProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    className?: string
}

export function StaggerContainer({ 
    children, 
    delay = 0, 
    duration = 0.5, 
    className 
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.21, 0.47, 0.32, 0.98],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
} 