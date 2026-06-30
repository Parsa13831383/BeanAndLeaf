import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Above-the-fold is eager; everything below the hero is code-split and
// streamed in, keeping first paint fast.
import './sections/sections.css';
const Story = lazy(() => import('./sections/Story'));
const Craft = lazy(() => import('./sections/Craft'));
const Bar = lazy(() => import('./sections/Bar'));
const Roasters = lazy(() => import('./sections/Roasters'));
const Kitchen = lazy(() => import('./sections/Kitchen'));
const Recognition = lazy(() => import('./sections/Recognition'));
const Visit = lazy(() => import('./sections/Visit'));
const Chapter = lazy(() => import('./sections/Chapter'));
const Footer = lazy(() => import('./sections/Footer'));

export default function App() {
  return (
    <>
      <a className="skip-link" href="#story">
        Skip to content
      </a>
      <Navbar />
      <main id="top">
        <Hero />
        <Suspense fallback={null}>
          <Story />
          <Craft />
          <Bar />
          <Roasters />
          <Kitchen />
          <Recognition />
          <Visit />
          <Chapter />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
