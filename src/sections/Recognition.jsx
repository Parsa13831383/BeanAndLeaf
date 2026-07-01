import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHead from '../components/SectionHead';
import Reveal, { Stagger, childVariants } from '../components/Reveal';
import { ChevronLeft, ChevronRight, ArrowUpRight } from '../components/Marks';
import { recognition } from '../data/content';

const EASE = [0.22, 1, 0.36, 1];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -28 : 28, opacity: 0 }),
};

function Stars({ count = 5 }) {
  return (
    <div className="rec__stars" aria-label={`Rated ${count} out of 5 stars`}>
      {'★★★★★'.slice(0, count)}
    </div>
  );
}

export default function Recognition() {
  const { google } = recognition;
  const reviews = google.reviews;
  const len = reviews.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (next, dir) => {
      setDirection(dir);
      setIndex(((next % len) + len) % len);
    },
    [len]
  );

  // Autoplay — paused on hover/focus and skipped entirely under reduced motion.
  useEffect(() => {
    if (len <= 1 || paused || reduceMotion) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % len);
    }, 6000);
    return () => clearInterval(id);
  }, [len, paused, reduceMotion]);

  const onDragEnd = (_e, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold || info.velocity.x < -400) goTo(index + 1, 1);
    else if (info.offset.x > threshold || info.velocity.x > 400) goTo(index - 1, -1);
  };

  const current = reviews[index];

  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow={recognition.eyebrow} heading={recognition.heading} />

        <Stagger className="rec__accolades" gap={0.08}>
          {recognition.accolades.map((a) => (
            <motion.div key={a.label} variants={childVariants} className="rec__accolade">
              <div className="rec__accolade-value">{a.value}</div>
              <div className="rec__accolade-label">{a.label}</div>
            </motion.div>
          ))}
        </Stagger>

        <Reveal className="rec__google" delay={0.1}>
          <div className="rec__google-head">
            <div className="rec__google-rating">
              <span className="rec__google-score">{google.rating}</span>
              <div>
                <Stars />
                <p className="rec__google-count">{google.count} Google reviews</p>
              </div>
            </div>
            <a className="rec__google-link" href={google.link} target="_blank" rel="noreferrer">
              Read on Google <ArrowUpRight />
            </a>
          </div>

          <div
            className="rec__carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Google reviews"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.figure
                key={index}
                className="rec__review"
                custom={direction}
                variants={variants}
                initial={reduceMotion ? false : 'enter'}
                animate="center"
                exit={reduceMotion ? undefined : 'exit'}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                drag={len > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
              >
                <Stars count={current.rating} />
                <blockquote className="rec__quote">“{current.quote}”</blockquote>
                <figcaption className="rec__source">{current.name} · Google review</figcaption>
              </motion.figure>
            </AnimatePresence>

            {len > 1 && (
              <div className="rec__carousel-nav">
                <button
                  type="button"
                  className="rec__arrow"
                  aria-label="Previous review"
                  onClick={() => goTo(index - 1, -1)}
                >
                  <ChevronLeft />
                </button>

                <div className="rec__dots" role="tablist" aria-label="Choose review">
                  {reviews.map((r, i) => (
                    <button
                      key={r.name}
                      type="button"
                      role="tab"
                      className={`rec__dot ${i === index ? 'is-active' : ''}`}
                      aria-label={`Review from ${r.name}, ${i + 1} of ${len}`}
                      aria-selected={i === index}
                      onClick={() => goTo(i, i > index ? 1 : -1)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="rec__arrow"
                  aria-label="Next review"
                  onClick={() => goTo(index + 1, 1)}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
