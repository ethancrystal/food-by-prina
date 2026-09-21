import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Menu from './Menu';
import Sides from './Sides';
import Ordering from './Ordering';
import Gallery from './Gallery';
import Faq from './Faq';
import Contact from './Contact';
import Footer from './Footer';

export default function RestaurantSite() {
  return (
    <div className="bg-[#0d0b09] min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Sides />
        <Ordering />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
