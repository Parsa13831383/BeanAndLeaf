import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import CupStage from './CupStage';
import { ArrowDown } from './Marks';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const wordL = {
    hidden: { opacity: 0, x: reduce ? 0 : -40 },
    show: { opacity: 1, x: 0, transition: { duration: 1.1, ease: EASE, delay: 0.15 } },
  };

  const wordR = {
    hidden: { opacity: 0, x: reduce ? 0 : 40 },
    show: { opacity: 1, x: 0, transition: { duration: 1.1, ease: EASE, delay: 0.15 } },
  };

  const cupIn = {
    hidden: { opacity: 0, y: reduce ? 0 : 50, scale: reduce ? 1 : 0.92 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.3, ease: EASE, delay: 0.35 } },
  };

  return (
    <header className="hero" ref={ref}>
      <div className="hero__glow" aria-hidden />

      <motion.div
        className="hero__inner"
        style={reduce ? undefined : { y, opacity, scale }}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="eyebrow hero__eyebrow"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.8, duration: 1 } },
          }}
        >
          Independent · Family-run · Coventry, since 2017
        </motion.p>

        <div className="hero__lockup">
          <motion.span className="display hero__word hero__word--left" variants={wordL}>
            Bean
          </motion.span>

          <div className="hero__cup">
            <motion.div className="hero__cupMotion" variants={cupIn}>
              <CupStage />
            </motion.div>
          </div>

          <motion.span className="display hero__word hero__word--right" variants={wordR}>
            Leaf
          </motion.span>
        </div>

        <motion.p
          className="hero__sub"
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.95, duration: 1, ease: EASE },
            },
          }}
        >
          Speciality coffee &amp; loose-leaf tea, in the heart of the city.
        </motion.p>
      </motion.div>

      <motion.a
        href="#story"
        className="hero__cue"
        aria-label="Scroll to story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="hero__cue-label">Scroll</span>
        <motion.span
          className="hero__cue-icon"
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <ArrowDown />
        </motion.span>
      </motion.a>
    </header>
  );
}