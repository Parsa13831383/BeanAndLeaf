import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import { Stagger, childVariants } from '../components/Reveal';
import { motion } from 'framer-motion';
import { bar } from '../data/content';

// Renders the item's photo if the file exists at its /public path; falls
// back to a quiet blank swatch (no broken-image glyph) until a real photo
// is dropped in, so the layout never depends on the image loading.
function MenuThumb({ src, alt }) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <div className="bar__thumb" aria-hidden={!showImage}>
      {showImage && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

export default function Bar() {
  return (
    <section id="bar" className="section">
      <div className="container">
        <SectionHead eyebrow={bar.eyebrow} heading={bar.heading} />

        <Stagger as="div" className="bar__list" gap={0.06}>
          {bar.items.map((item) => (
            <motion.div key={item.name} variants={childVariants} className="bar__item">
              <MenuThumb src={item.image} alt={item.name} />
              <div className="bar__body">
                <div className="bar__name">{item.name}</div>
                <div className="bar__tag">{item.tag}</div>
                <p className="bar__detail">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>

        <p className="bar__note">{bar.note}</p>
      </div>
    </section>
  );
}
