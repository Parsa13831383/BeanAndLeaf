import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from './Marks';
import './Carousel.css';

const EASE = [0.22, 1, 0.36, 1];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};

/**
 * Carousel — a single-image-at-a-time gallery. Draggable (mouse + touch)
 * via Framer Motion, with arrow/dot fallbacks and a paused autoplay loop.
 * Only the current slide is ever mounted; its two neighbours are quietly
 * preloaded via <link rel=preload> so the next swipe never pops in blank.
 */
export default function Carousel({ images, interval = 4500, className = '' }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [restartToken, setRestartToken] = useState(0);
  const reduceMotion = useReducedMotion();
  const len = images.length;

  const goTo = useCallback(
    (nextIndex, dir) => {
      setDirection(dir);
      setIndex(((nextIndex % len) + len) % len);
      setRestartToken((t) => t + 1);
    },
    [len]
  );

  // Autoplay — paused on hover/touch, when the tab isn't visible, and
  // entirely skipped under prefers-reduced-motion.
  useEffect(() => {
    if (len <= 1 || hoverPaused || tabHidden || reduceMotion) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % len);
    }, interval);
    return () => clearInterval(id);
  }, [len, hoverPaused, tabHidden, reduceMotion, interval, restartToken]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Quietly preload the previous/next image so a swipe never shows a gap —
  // the rest of the gallery is never fetched until the user reaches it.
  useEffect(() => {
    const neighbours = [(index - 1 + len) % len, (index + 1) % len];
    const links = neighbours.map((i) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = images[i].src;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((l) => l.remove());
  }, [index, len, images]);

  const onDragEnd = (_e, info) => {
    const threshold = 70;
    if (info.offset.x < -threshold || info.velocity.x < -500) goTo(index + 1, 1);
    else if (info.offset.x > threshold || info.velocity.x > 500) goTo(index - 1, -1);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') goTo(index + 1, 1);
    else if (e.key === 'ArrowLeft') goTo(index - 1, -1);
  };

  const current = images[index];

  return (
    <div
      className={`carousel ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bean & Leaf desserts"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onTouchStart={() => setHoverPaused(true)}
      onTouchEnd={() => setHoverPaused(false)}
    >
      <div className="carousel__stage">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            className="carousel__slide"
            custom={direction}
            variants={variants}
            initial={reduceMotion ? false : 'enter'}
            animate="center"
            exit={reduceMotion ? undefined : 'exit'}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            drag={len > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
          >
            <img
              src={current.src}
              alt={current.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {len > 1 && (
          <>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--prev"
              aria-label="Previous image"
              onClick={() => goTo(index - 1, -1)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              aria-label="Next image"
              onClick={() => goTo(index + 1, 1)}
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {len > 1 && (
        <div className="carousel__dots" role="tablist" aria-label="Choose image">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              className={`carousel__dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Go to image ${i + 1} of ${len}`}
              aria-selected={i === index}
              onClick={() => goTo(i, i > index ? 1 : -1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
