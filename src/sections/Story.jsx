import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';
import { story } from '../data/content';

export default function Story() {
  return (
    <section id="story" className="section">
      <div className="container">
        <div className="story__grid">
          <SectionHead eyebrow={story.eyebrow} heading={story.heading} />

          <Reveal className="story__body" delay={0.1}>
            {story.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="story__stat">
              <span className="story__stat-value">{story.stat.value}★</span>
              <span className="story__stat-label">{story.stat.label}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
