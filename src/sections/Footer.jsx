import { useState } from 'react';
import { brand } from '../data/content';
import { Amp, Instagram, ArrowUpRight } from '../components/Marks';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = () => {
    if (!email.trim()) return;
    // Prototype: wire to a real provider (Mailchimp / Beehiiv) before launch.
    setSent(true);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="display footer__word">
              Bean <Amp /> Leaf
            </span>
            <p className="footer__tagline">
              {brand.tagline}.<br />
              {brand.city}, since {brand.established}.
            </p>
          </div>

          <div className="footer__news">
            <p className="eyebrow">Stay in the loop</p>
            {sent ? (
              <p className="footer__sent">Thank you — we’ll be in touch.</p>
            ) : (
              <div className="footer__field">
                <input
                  type="email"
                  inputMode="email"
                  placeholder="Your email"
                  aria-label="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                />
                <button onClick={onSubmit} aria-label="Subscribe">
                  <ArrowUpRight />
                </button>
              </div>
            )}
            <p className="footer__news-note">News on the move, seasonal roasters and the odd treat.</p>
          </div>
        </div>

        <div className="footer__rule" />

        <div className="footer__bottom">
          <nav className="footer__contact" aria-label="Contact">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="footer__social">
              <Instagram /> {brand.instagramHandle}
            </a>
          </nav>
          <p className="footer__legal">
            © {new Date().getFullYear()} {brand.full}. Concept site.
          </p>
        </div>
      </div>
    </footer>
  );
}
