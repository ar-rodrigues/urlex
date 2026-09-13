"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "@/lib/navigation";

type Props = {
  children: React.ReactNode;
};

/**
 * Page enter: opacity only (no slide) so the swap doesn't read as a flash.
 * Hero mount animations handle the visible motion above the fold.
 */
export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.32,
        ease: "easeOut",
        delay: 0.05,
      }}
    >
      {children}
    </motion.div>
  );
}
