import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInSection = ({
  children,
  delay = 0,
  className,
}: FadeInSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
