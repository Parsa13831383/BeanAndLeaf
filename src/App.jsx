import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Preloader from './components/Preloader';

// Above-the-fold is eager; everything below the hero is code-split and
// streamed in, keeping first paint fast.
import './sections/sections.css';
const Inside = lazy(() => import('./sections/Inside'));
const Story = lazy(() => import('./sections/Story'));
const Craft = lazy(() => import('./sections/Craft'));
const Bar = lazy(() => import('./sections/Bar'));
const Roasters = lazy(() => import('./sections/Roasters'));
const Kitchen = lazy(() => import('./sections/Kitchen'));
const PhotoBreak = lazy(() => import('./sections/PhotoBreak'));
const Recognition = lazy(() => import('./sections/Recognition'));
const Visit = lazy(() => import('./sections/Visit'));
const Chapter = lazy(() => import('./sections/Chapter'));
const Footer = lazy(() => import('./sections/Footer'));

export default function App() {
  return (
    <>
      <Preloader />
      <a className="skip-link" href="#story">
        Skip to content
      </a>
      <Navbar />
      <main id="top">
        <Hero />
        <Suspense fallback={null}>
          <Inside />
          <Story />
          <Craft />
          <Bar />
          <Roasters />
          <Kitchen />
          <PhotoBreak />
          <Recognition />
          <Visit />
          <Chapter />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
