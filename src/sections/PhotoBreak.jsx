import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';
import { pause } from '../data/content';

export default function PhotoBreak() {
  return (
    <section className="section">
      <div className="container">
        <div className="pause__grid">
          <div>
            <SectionHead eyebrow={pause.eyebrow} heading={pause.heading} />
            <Reveal as="p" className="lede pause__body" delay={0.1}>
              {pause.body}
            </Reveal>
          </div>

          <Reveal className="pause__photo-wrap" y={28} delay={0.1}>
            <img
              src="/2.jpg"
              alt="A guest roaster's coffee, paused over at the table"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
