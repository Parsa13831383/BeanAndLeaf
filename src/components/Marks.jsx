/* Minimal hand-rolled marks — keeps the bundle lean (no icon library). */

export const ArrowDown = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden {...props}>
    <path d="M12 4v15m0 0 6-6m-6 6-6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRight = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden {...props}>
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
  </svg>
);

/* A simple leaf glyph used as a quiet botanical accent. */
export const LeafMark = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden {...props}>
    <path
      d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M5 19C8.5 15.5 12 12 16 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/* The brand ampersand, set in the display italic — used as a recurring mark. */
export const Amp = ({ className = '' }) => <span className={`amp ${className}`}>&amp;</span>;
