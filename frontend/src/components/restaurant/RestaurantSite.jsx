import React from 'react';
import Hero from './Hero';
import Faq from './Faq';
import { Welcome, Signature, OrderBand, MadeWithLove, PlatesGrid, SeafoodFeature } from './HomeSections';
import { HoursInfo, Featuring, ContactCard } from './InfoSections';

// Homepage. Header, footer, cart and sign-in live in App.js.
export default function RestaurantSite() {
  return (
    <>
      <Hero />
      <Welcome />
      <Signature />
      <OrderBand />
      <MadeWithLove />
      <PlatesGrid />
      <SeafoodFeature />
      <HoursInfo />
      <Featuring />
      <Faq />
      <ContactCard />
    </>
  );
}
