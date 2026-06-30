import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { nav } from '../data/content';
import { Amp } from './Marks';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open. Lenis drives scroll
  // directly via window.scrollTo on every wheel/touch event, which can
  // bleed through a CSS-only overflow lock — stop/start it in step.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <div className="nav__row container">
          <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
            Bean <Amp /> Leaf
          </a>

          <nav className="nav__links" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="nav__link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#visit" className="nav__cta">
            Visit us
          </a>

          <button
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nav__burger-bar ${open ? 'is-x1' : ''}`} />
            <span className={`nav__burger-bar ${open ? 'is-x2' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="nav__sheet-links" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="display nav__sheet-link"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#visit"
                className="display nav__sheet-link"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * nav.length + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Visit us
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
