import TopNavbar from '../components/navbar/TopNavbar';
import React, { FC } from 'react';
import leftImage from '../assets/landing-page/left-image.png';
import rightImage from '../assets/landing-page/right-image.png';
import leftStars from '../assets/landing-page/left-stars.svg';
import rightStars from '../assets/landing-page/right-stars.svg';
import IntroductionComponent from '../components/landing-sections/IntroductionComponent';
import ExamPreparation from '../components/landing-sections/ExamPreparation';
import BeatExam from '../components/landing-sections/BeatExam';
import CareerAccordion from '../components/landing-sections/CareerAccordion';
import PricingPlans from '../components/landing-sections/PricingPlans';
import AIMentorSection from '../components/landing-sections/AIMentorSection';
import Approach from '../components/landing-sections/Approach';

const Landing: FC = () => {
  return (
    <>
      <div className="home-layout w-full h-full min-h-screen">
        <TopNavbar />
        <div className="gradient-setup">
          <div className="content-wrapper w-full max-w-[1280px] px-5 md:px-10 mx-auto h-full min-h-[90%] flex items-center justify-center relative ">
            <div className="first-gradient"></div>
            <div className="second-gradient"></div>
            <div className="w-full min-h-[90vh] flex items-center justify-center relative">
              <div className="text-center flex flex-col gap-5 items-center justify-center relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-6xl leading-tight md:leading-none font-semibold text-center">
                  Unlock the Future of Learning with{' '}
                  <span className="ai-powered">AI-Powered</span>{' '}
                  <span className="font-bold">Personalized Education</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl">
                  Experience education designed for your unique learning style
                  with the power of AI.
                </p>
                <div className="text-white bg-richblue-900 px-4 md:px-5 py-2 text-md md:text-lg rounded-lg cursor-pointer">
                  Get Started
                </div>
              </div>

              <div className="absolute w-60 h-60 md:w-60 md:h-60 bg-[#FF660080] left-0 bottom-[10%] overflow-hidden left-side-image">
                <img
                  src={leftImage}
                  alt="Left Side"
                  className="w-full h-full object-cover"
                />
                <img
                  src={leftStars}
                  alt="Stars Left"
                  className="absolute -right-4 -top-4 w-16 md:w-20 stars-image"
                />
              </div>

              <div className="absolute w-60 h-60 md:w-60 md:h-60 bg-[#D5DCE3] right-0 top-[10%] overflow-hidden right-side-image">
                <img
                  src={rightImage}
                  alt="Right Side"
                  className="w-full h-full object-cover"
                />
                <img
                  src={rightStars}
                  alt="Stars Right"
                  className="absolute -right-4 -top-4 w-16 md:w-20 stars-image"
                />
              </div>
            </div>
          </div>
        </div>
        <IntroductionComponent />
        <ExamPreparation />
        <BeatExam />
        <CareerAccordion />
        <PricingPlans />
        <Approach />
        <AIMentorSection />
      </div>
    </>
  );
};

export default Landing;
