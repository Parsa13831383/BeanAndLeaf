import SectionHead from '../components/SectionHead';
import { Stagger, childVariants } from '../components/Reveal';
import { motion } from 'framer-motion';
import { bar } from '../data/content';

export default function Bar() {
  return (
    <section id="bar" className="section">
      <div className="container">
        <SectionHead eyebrow={bar.eyebrow} heading={bar.heading} />

        <Stagger as="div" className="bar__list" gap={0.06}>
          {bar.items.map((item) => (
            <motion.div key={item.name} variants={childVariants} className="bar__item">
              <div className="bar__name">{item.name}</div>
              <div className="bar__tag">{item.tag}</div>
              <p className="bar__detail">{item.detail}</p>
            </motion.div>
          ))}
        </Stagger>

        <p className="bar__note">{bar.note}</p>
      </div>
    </section>
  );
}
