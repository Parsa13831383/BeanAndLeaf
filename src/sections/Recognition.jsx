import SectionHead from '../components/SectionHead';
import Reveal, { Stagger, childVariants } from '../components/Reveal';
import { motion } from 'framer-motion';
import { recognition } from '../data/content';

export default function Recognition() {
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

        <Stagger className="rec__voices" gap={0.1}>
          {recognition.voices.map((v, i) => (
            <motion.figure key={i} variants={childVariants} className="rec__voice">
              <div className="rec__stars" aria-label="Five stars">
                ★★★★★
              </div>
              <blockquote className="rec__quote">{v.quote}</blockquote>
              <figcaption className="rec__source">{v.source}</figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
