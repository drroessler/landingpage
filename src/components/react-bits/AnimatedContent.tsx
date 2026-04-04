import { type ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  distance = 40,
  direction = "vertical",
  reverse = false,
  duration = 0.7,
  delay = 0,
  className = "",
}: AnimatedContentProps) {
  const axis = direction === "horizontal" ? "x" : "y";
  const offset = reverse ? -distance : distance;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, [axis]: offset }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
