import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHead from '../components/SectionHead';
import { ChevronLeft, ChevronRight } from '../components/Marks';
import { inside } from '../data/content';
import './Inside.css';

const EASE = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};

// Falls back to a plain swatch if a photo is missing or fails to load,
// so a renamed/missing file in public/cafe/ never breaks the layout.
function InsideImage({ src, alt }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) return <div className="inside__placeholder" aria-hidden />;
  return (
    <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setErrored(true)} />
  );
}

export default function Inside() {
  const { slides } = inside;
  const len = slides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (next, dir) => {
      setDirection(dir);
      setIndex(((next % len) + len) % len);
    },
    [len]
  );

  const onDragEnd = (_e, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold || info.velocity.x < -400) goTo(index + 1, 1);
    else if (info.offset.x > threshold || info.velocity.x > 400) goTo(index - 1, -1);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') goTo(index + 1, 1);
    else if (e.key === 'ArrowLeft') goTo(index - 1, -1);
  };

  const current = slides[index];

  return (
    <section className="section inside">
      <div className="container">
        <SectionHead eyebrow={inside.eyebrow} heading={inside.heading} />

        <div className="inside__stage">
          <div
            className="inside__frame"
            role="region"
            aria-roledescription="carousel"
            aria-label="Inside Bean & Leaf"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                className="inside__slide"
                custom={direction}
                variants={slideVariants}
                initial={reduceMotion ? false : 'enter'}
                animate="center"
                exit={reduceMotion ? undefined : 'exit'}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
                drag={len > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
              >
                <motion.div
                  key={`zoom-${index}`}
                  className="inside__zoom"
                  initial={reduceMotion ? false : { scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: 'linear' }}
                >
                  <InsideImage src={current.image} alt={current.title} />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {len > 1 && (
              <>
                <button
                  type="button"
                  className="inside__arrow inside__arrow--prev"
                  aria-label="Previous photo"
                  onClick={() => goTo(index - 1, -1)}
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  className="inside__arrow inside__arrow--next"
                  aria-label="Next photo"
                  onClick={() => goTo(index + 1, 1)}
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          <div className="inside__panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className="display inside__title">{current.title}</h3>
                <p className="inside__desc">{current.description}</p>
                <ul className="inside__tags">
                  {current.tags.map((tag) => (
                    <li key={tag} className="inside__tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {len > 1 && (
              <div className="inside__dots" role="tablist" aria-label="Choose photo">
                {slides.map((s, i) => (
                  <button
                    key={s.image}
                    type="button"
                    role="tab"
                    className={`inside__dot ${i === index ? 'is-active' : ''}`}
                    aria-label={`${s.title}, photo ${i + 1} of ${len}`}
                    aria-selected={i === index}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
