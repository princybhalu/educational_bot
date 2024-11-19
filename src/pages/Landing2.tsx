import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/landing-v3/NavbarOfLanding';
import UpcomingPageSection from '../components/landing-v3/UpcomingPageSection5';
import SubscriptionForm from '../components/landing-v3/SubscriptionForm';

export default function Landing2() {
  return (
    <>
      <Navbar />
      <UpcomingPageSection />
      <div className="h-[100vh]"></div>
      <SubscriptionForm />
    </>
  );
}
