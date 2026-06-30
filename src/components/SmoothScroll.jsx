import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';

/**
 * SmoothScroll — global Lenis instance, mounted once at the root.
 *
 * `root` mode drives the real window/document scroll (no transform-faked
 * container), so position:fixed/sticky, Framer Motion's useScroll/whileInView,
 * and native anchor links all keep working unmodified.
 *
 * Fully skipped under prefers-reduced-motion: children render plain, leaving
 * native (instant) scrolling in place rather than just turning smoothing down.
 */
export default function SmoothScroll({ children }) {
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (reduceMotion) return children;

  return (
    <ReactLenis
      root
      options={{
        // Wheel/touch input stays on the lerp path (not duration/easing) —
        // a continuous, frame-rate-independent chase reads as responsive
        // and "in control" rather than floaty. 0.1 is Lenis's own tuned
        // default for this feel.
        lerp: 0.1,
        smoothWheel: true,
        // Leave touch scrolling native: forcing synced touch smoothing is
        // what makes mobile scrolling feel laggy on real devices.
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        // Anchor links (nav, hero scroll cue, skip link) get a deliberate,
        // eased jump distinct from organic wheel scrolling.
        anchors: { duration: 1.2 },
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
