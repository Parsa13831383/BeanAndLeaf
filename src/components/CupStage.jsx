import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SPLINE_SCENE_URL } from '../data/config';
import './CupStage.css';

// Code-split, but the import is kicked off the moment CupStage mounts —
// the site-wide Preloader (see components/Preloader.jsx) covers this wait,
// so there's no longer a reason to delay starting the fetch.
const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * A failed scene fetch (offline, blocked CDN, ad-blocker) throws inside
 * Spline's own render path — uncaught, that takes down the entire React
 * tree, not just the cup. This contains it to just the cup, and still
 * signals the Preloader so it doesn't sit out its full fallback timeout.
 */
class CupErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    window.dispatchEvent(new Event('cup:ready'));
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/**
 * CupStage — the 3D coffee cup centrepiece between BEAN and LEAF.
 *
 * Dispatches a `cup:ready` window event once Spline reports it's actually
 * loaded, which is what tells the Preloader it's safe to reveal the page.
 *
 * The scene is a continuously-rendering WebGL canvas (physics + gaussian
 * splatting) — real cost that competes with Lenis's rAF-driven smooth
 * scroll even when the cup has long scrolled out of view. An
 * IntersectionObserver calls the runtime's own stop()/play() so it only
 * renders while actually on screen.
 */
export default function CupStage() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const stageRef = useRef(null);
  const appRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) appRef.current?.play();
        else appRef.current?.stop();
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cup-stage" role="img" aria-label="A cup of coffee" ref={stageRef}>
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
          <CupErrorBoundary>
            <Suspense fallback={null}>
              <Spline
                scene={SPLINE_SCENE_URL}
                className="cup-stage__spline"
                onLoad={(app) => {
                  // The scene ships its own "Text 2" lockup — redundant with
                  // the site's real BEAN / LEAF typography, so it's hidden
                  // in favour of that (sharper, on-brand, layout-controlled).
                  app.findObjectByName('Text 2')?.hide();
                  appRef.current = app;
                  if (!isVisibleRef.current) app.stop();
                  setReady(true);
                  window.dispatchEvent(new Event('cup:ready'));
                }}
              />
            </Suspense>
          </CupErrorBoundary>
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
