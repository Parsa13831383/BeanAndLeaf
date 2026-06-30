import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';
import { ArrowUpRight } from '../components/Marks';
import { visit } from '../data/content';

const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Bean & Leaf Coffee House, 76 Hertford Street, Coventry CV1 1LB');

export default function Visit() {
  return (
    <section id="visit" className="section panel--warm">
      <div className="container">
        <Reveal className="visit__photo-wrap" y={0}>
          <img
            src="/4.jpg"
            alt="Bean & Leaf Coffee House — 76 Hertford Street, Coventry"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className="visit__grid">
          <div>
            <SectionHead eyebrow={visit.eyebrow} heading={visit.heading} />

            <Reveal delay={0.1}>
              <address className="visit__address">
                {visit.address.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </address>
              <p className="visit__landmark">{visit.landmark}</p>

              <div className="visit__details">
                {visit.details.map((d) => (
                  <div key={d.k} className="visit__detail">
                    <div className="visit__detail-k">{d.k}</div>
                    <div className="visit__detail-v">{d.v}</div>
                  </div>
                ))}
              </div>

              <a className="visit__map" href={mapsHref} target="_blank" rel="noreferrer">
                Open in Maps <ArrowUpRight />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="eyebrow" style={{ marginBottom: '1.4rem' }}>
              Opening hours
            </p>
            <div className="hours">
              {visit.hours.map((h) => {
                const closed = h.time.toLowerCase() === 'closed';
                return (
                  <div key={h.day} className={`hours__row ${closed ? 'hours__row--closed' : ''}`}>
                    <span className="hours__day">{h.day}</span>
                    <span className="hours__time">{h.time}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
