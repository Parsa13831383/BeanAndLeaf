import Reveal from './Reveal';
import './SectionHead.css';

/**
 * SectionHead — eyebrow + display heading, used across sections for rhythm.
 * `heading` may contain \n for intentional line breaks.
 */
export default function SectionHead({ eyebrow, heading, align = 'left', size = 'lg' }) {
  return (
    <div className={`sec-head sec-head--${align}`}>
      {eyebrow && (
        <Reveal as="p" className="eyebrow sec-head__eyebrow">
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" className={`display sec-head__title sec-head__title--${size}`} delay={0.05}>
        {heading.split('\n').map((line, i) => (
          <span key={i} className="sec-head__line">
            {line}
          </span>
        ))}
      </Reveal>
    </div>
  );
}
