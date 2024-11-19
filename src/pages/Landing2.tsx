import UpcomingPageSection from '../components/landing-v3/UpcomingPageSection2';
import React from 'react';
import Navbar from '../components/landing-v3/NavbarOfLanding';
import SubscriptionForm from '../components/landing-v3/SubscriptionForm';

const Landing2: React.FC = () => {
  return (
    <>
      <Navbar />
      <UpcomingPageSection />
      <div className="h-[100vh] bg-black"></div>
      <SubscriptionForm />
    </>
  );
};

export default Landing2;
