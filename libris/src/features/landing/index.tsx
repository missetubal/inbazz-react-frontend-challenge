import {
  Hero,
  Navbar,
  Features,
  ShelfPreview,
  Footer,
  Cta,
  Stats,
} from './components';

export const LandingWrapper = () => {
  return (
    <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Features />
      <ShelfPreview />
      <Stats />
      <Cta />
      <Footer />
    </div>
  );
};
