import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/landing-v3/NavbarOfLanding';
import UpcomingPageSection from '../components/landing-v3/UpcomingPageSection6';
import SubscriptionForm from '../components/landing-v3/SubscriptionForm';
import Footer from '../components/landing-v3/Footer2';
import TestimonialSlider from '../components/landing-v3/TestimonialSlider6';
import SocialMediaSection from '../components/landing-v3/SocialMediaSection';
import QuotesSection from '../components/landing-v3/QuotesSection';

export default function Landing2() {
  return (
    <>
      <Navbar />
      <UpcomingPageSection />
      {/* <SubscriptionForm /> */}
      <QuotesSection />
      <SocialMediaSection />
      <TestimonialSlider />
      <Footer />
    </>
  );
}
