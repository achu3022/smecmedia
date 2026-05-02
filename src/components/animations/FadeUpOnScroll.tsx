"use client"

import { motion } from "framer-motion"

interface FadeUpOnScrollProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function FadeUpOnScroll({
  children,
  delay = 0,
  className,
}: FadeUpOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
