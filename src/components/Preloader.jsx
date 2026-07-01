import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Amp, Steam } from './Marks';
import './Preloader.css';

const EASE = [0.22, 1, 0.36, 1];
// Worst case (slow network, blocked CDN, Spline error): never trap the user
// behind the curtain for longer than this.
const MAX_WAIT_MS = 6000;
// Best case (cup ready almost instantly, e.g. warm cache): still hold for a
// beat so the brand mark reads as intentional, not a flash.
const MIN_SHOW_MS = 650;

/**
 * Preloader — a branded curtain shown until the hero's 3D cup (CupStage)
 * dispatches `cup:ready`, so the site is never revealed mid-pop-in. Falls
 * back to a hard timeout if that event never arrives.
 */
export default function Preloader() {
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const start = Date.now();
    let settled = false;
    let showTimeout;

    const finish = () => {
      if (settled) return;
      settled = true;
      const wait = Math.max(0, MIN_SHOW_MS - (Date.now() - start));
      showTimeout = window.setTimeout(() => setReady(true), wait);
    };

    window.addEventListener('cup:ready', finish, { once: true });
    const maxTimeout = window.setTimeout(finish, MAX_WAIT_MS);

    return () => {
      window.removeEventListener('cup:ready', finish);
      window.clearTimeout(maxTimeout);
      window.clearTimeout(showTimeout);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden';
    if (ready) lenis?.start();
    else lenis?.stop();
    return () => {
      document.body.style.overflow = '';
    };
  }, [ready, lenis]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        >
          <Steam className="preloader__steam" />
          <motion.div
            className="preloader__wordmark"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: reduceMotion ? 0 : 0.15 }}
          >
            <span className="display preloader__word">Bean</span>
            <Amp />
            <span className="display preloader__word">Leaf</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
