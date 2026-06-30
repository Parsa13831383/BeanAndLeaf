import Reveal from '../components/Reveal';
import { Amp } from '../components/Marks';
import { chapter } from '../data/content';

export default function Chapter() {
  return (
    <section className="section panel--ink chapter">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {chapter.eyebrow}
        </Reveal>
        <Reveal as="h2" className="display chapter__heading" delay={0.08}>
          {chapter.heading.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </Reveal>
        <Reveal as="p" className="chapter__body" delay={0.16}>
          {chapter.body}
        </Reveal>
        <Reveal delay={0.24} style={{ marginTop: '2.4rem' }}>
          <span className="display" style={{ fontSize: '2rem' }}>
            Bean <Amp /> Leaf
          </span>
        </Reveal>
      </div>
    </section>
  );
}
