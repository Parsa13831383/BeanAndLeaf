import SectionHead from '../components/SectionHead';
import Reveal, { Stagger, childVariants } from '../components/Reveal';
import { motion } from 'framer-motion';
import { LeafMark } from '../components/Marks';
import { kitchen } from '../data/content';

export default function Kitchen() {
  return (
    <section className="section panel--crema">
      <div className="container">
        <div className="kitchen__grid">
          <div>
            <SectionHead eyebrow={kitchen.eyebrow} heading={kitchen.heading} />
            <Reveal as="p" className="kitchen__body" delay={0.1}>
              {kitchen.body}
            </Reveal>
          </div>

          <Stagger as="ul" className="kitchen__list" gap={0.05}>
            {kitchen.list.map((item) => (
              <motion.li key={item} variants={childVariants}>
                <LeafMark className="lf" />
                {item}
              </motion.li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
