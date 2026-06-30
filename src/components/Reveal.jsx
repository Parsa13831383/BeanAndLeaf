import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal — the one motion primitive the whole site uses.
 * Opacity + a small upward translation, smooth easing, no overshoot.
 * Apple-quiet by default. Reduced-motion users get an instant, static reveal.
 *
 * Props:
 *   as       — element/tag to render (default 'div')
 *   delay    — seconds before this element starts
 *   y        — translation distance in px (default 14)
 *   once     — only animate the first time it enters (default true)
 */
export default function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 14,
  once = true,
  className,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Stagger — wraps a list so children reveal in sequence.
 * Pair with <Reveal> children for orchestrated, not scattered, motion.
 */
export function Stagger({ as = 'div', children, gap = 0.08, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const childVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
