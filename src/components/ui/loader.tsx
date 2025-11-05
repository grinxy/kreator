"use client"

import { motion } from "framer-motion"

export function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <motion.div
        className="relative w-12 h-12"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-[var(--kreator-blue,#003C71)] border-t-[var(--kreator-yellow,#FFA00E)] animate-spin" />
      </motion.div>
    </div>
  )
}
