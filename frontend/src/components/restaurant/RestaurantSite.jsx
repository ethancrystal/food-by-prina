import React from 'react';
import Hero from './Hero';
import About from './About';
import Menu from './Menu';
import Sides from './Sides';
import Ordering from './Ordering';
import Gallery from './Gallery';
import Faq from './Faq';
import Contact from './Contact';

// Homepage sections. Header, footer, cart and sign-in live in App.js.
export default function RestaurantSite() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Sides />
      <Ordering />
      <Gallery />
      <Faq />
      <Contact />
    </>
  );
}
