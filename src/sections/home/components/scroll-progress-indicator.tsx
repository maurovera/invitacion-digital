'use client';

import { motion } from 'motion/react';

interface ScrollProgressIndicatorProps {
  activeSection: string;
  sections: readonly string[];
}

export default function ScrollProgressIndicator({
  activeSection,
  sections,
}: ScrollProgressIndicatorProps) {
  const progress = (sections.indexOf(activeSection) + 1) / sections.length;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 origin-left z-40"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress }}
      transition={{ duration: 0.3 }}
    />
  );
}
