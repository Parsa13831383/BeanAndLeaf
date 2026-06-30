import SectionHead from '../components/SectionHead';
import Reveal, { Stagger, childVariants } from '../components/Reveal';
import { motion } from 'framer-motion';
import { craft } from '../data/content';

export default function Craft() {
  return (
    <section id="craft" className="section panel--warm">
      <div className="container">
        <SectionHead eyebrow={craft.eyebrow} heading={craft.heading} />
        <Reveal as="p" className="lede craft__intro" delay={0.1}>
          {craft.intro}
        </Reveal>

        <Stagger className="craft__cols">
          <motion.div variants={childVariants} className="craft__col">
            <div className="craft__col-mark">{craft.columns[0].mark}</div>
            <h3 className="craft__col-title">{craft.columns[0].title}</h3>
            <ul className="craft__col-lines">
              {craft.columns[0].lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </motion.div>

          <div className="craft__divider" aria-hidden />

          <motion.div variants={childVariants} className="craft__col">
            <div className="craft__col-mark">{craft.columns[1].mark}</div>
            <h3 className="craft__col-title">{craft.columns[1].title}</h3>
            <ul className="craft__col-lines">
              {craft.columns[1].lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </motion.div>
        </Stagger>
      </div>
    </section>
  );
}
