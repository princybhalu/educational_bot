import React, { useState, useEffect, useRef } from 'react';
import '../../style/IntroductionComponent.css';
import IntroductionImage from '../../assets/landing-page/introduction.png';

const IntroductionComponent: React.FC = () => {
  const [isOldMethod, setIsOldMethod] = useState(true);

  const toggleContent = () => {
    setIsOldMethod(!isOldMethod);
  };

  useEffect(() => {
    const interval = setInterval(toggleContent, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container my-5">
      <div className="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-none text-center text-[#003366] my-5">
        <p>Why Traditional Learning </p>
        <p className="font-semibold">Isn&rsquo;t Enough</p>
      </div>
      <div className="buttons flex flex-col sm:flex-row justify-center my-5 bg-[#FFE2CF] p-3">
        <div
          className={`buttonOfIntroduction ${isOldMethod ? 'active' : ''} flex-1 text-center`}
          onClick={() => setIsOldMethod(true)}
        >
          Traditional Learning Method
        </div>
        <div
          className={`buttonOfIntroduction ${!isOldMethod ? 'active' : ''} flex-1 text-center`}
          onClick={() => setIsOldMethod(false)}
        >
          With our AI
        </div>
      </div>

      <div className="content">
        {isOldMethod ? (
          <div className="text-content">
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-none font-bold text-[#003366]">
              In a typical classroom,
            </h2>
            <p className="text-1xl md:text-2xl lg:text-3xl leading-tight md:leading-none">
              One teacher handles many students, each with different learning
              needs. This one-size-fits-all approach often leaves students
              feeling lost or behind, even though they&rsquo;re fully capable of
              succeeding.
            </p>
            <ul className="m-2">
              <li>One teacher handles many students</li>
              <li>One teacher handles many students</li>
              <li>One teacher handles many students</li>
              <li>One teacher handles many students</li>
            </ul>
          </div>
        ) : (
          <div className="text-content">
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-none font-bold text-[#003366]">
              In a modern classroom,
            </h2>
            <p className="text-1xl md:text-2xl lg:text-3xl leading-tight md:leading-none">
              Teachers use personalized learning approaches to cater to the
              individual needs of each student. This method helps students stay
              engaged and succeed at their own pace.
            </p>
            <ul className="m-2">
              <li>Personalized learning plans</li>
              <li>Use of technology to aid learning</li>
              <li>Regular feedback and assessments</li>
              <li>Collaborative learning environments</li>
            </ul>
          </div>
        )}
        <div className="image-content">
          <img
            src={IntroductionImage}
            alt="Illustration of a teacher surrounded by multiple students"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroductionComponent;
