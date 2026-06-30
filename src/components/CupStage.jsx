import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SPLINE_SCENE_URL } from '../data/config';
import './CupStage.css';

// Code-split so the (heavy) 3D runtime never blocks first paint or the
// critical text/font rendering of the hero.
const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * CupStage — the 3D coffee cup centrepiece between BEAN and LEAF.
 *
 * Mounting is deferred a beat past first paint so the hero's typography
 * and layout settle in first; the scene then fades up on its own terms
 * once Spline reports it's actually ready, rather than popping in or
 * showing any embed-style loading chrome.
 */
export default function CupStage() {
  const reduce = useReducedMotion();
  const [start, setStart] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setStart(true), { timeout: 600 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setStart(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="cup-stage" role="img" aria-label="A cup of coffee">
      <motion.div
        className="cup-stage__floater"
        animate={reduce ? {} : { y: [0, -14, 0] }}
        transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
      >
        <motion.div
          className="cup-stage__canvas"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {start && (
            <Suspense fallback={null}>
              <Spline
                scene={SPLINE_SCENE_URL}
                className="cup-stage__spline"
                onLoad={(app) => {
                  // The scene ships its own "Text 2" lockup — redundant with
                  // the site's real BEAN / LEAF typography, so it's hidden
                  // in favour of that (sharper, on-brand, layout-controlled).
                  app.findObjectByName('Text 2')?.hide();
                  setReady(true);
                }}
              />
            </Suspense>
          )}
        </motion.div>
      </motion.div>

      {/* Ground shadow, decoupled from the floating cup. */}
      <motion.div
        className="cup-stage__shadow"
        aria-hidden
        animate={reduce ? {} : { scale: [1, 0.9, 1], opacity: [0.22, 0.15, 0.22] }}
        transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  );
}
