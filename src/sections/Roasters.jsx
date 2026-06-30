import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';
import { roasters } from '../data/content';

export default function Roasters() {
  const loop = [...roasters.guests, ...roasters.guests];

  return (
    <section className="section panel--ink">
      <div className="container">
        <div className="roasters__grid">
          <div className="roasters__text">
            <SectionHead eyebrow={roasters.eyebrow} heading={roasters.heading} />
            <Reveal as="p" className="lede roasters__intro" delay={0.1}>
              {roasters.intro}
            </Reveal>
            <Reveal className="roasters__card" delay={0.15}>
              <div className="roasters__house-label">{roasters.house.role}</div>
              <div className="roasters__house-name">{roasters.house.name}</div>
              <div className="roasters__house-place">{roasters.house.place}</div>
              <div className="roasters__cupping">
                {roasters.cupping.map((note) => (
                  <span key={note} className="roasters__note">
                    {note}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="roasters__photo-wrap" y={28} delay={0.08}>
            <img
              src="/1.jpg"
              alt="Speciality coffee from Oddkin Roasters — single-origin bags showing tasting notes"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>

        <div className="marquee" aria-label="Recent guest roasters">
          <div className="marquee__track">
            {loop.map((g, i) => (
              <span className="marquee__item" key={i} aria-hidden={i >= roasters.guests.length}>
                {g.name}
                <span className="marquee__dot" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
