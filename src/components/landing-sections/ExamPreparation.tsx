import React from 'react';
import '../../style/ExamPreparation.css';

const ExamPreparation = () => {
  return (
    <div className="bg-[#E5F3FF] p-20">
      <div className="content-wrapper w-full max-w-[1280px] px-5 md:px-10 mx-auto h-full min-h-[90%] flex items-center justify-center ">
        <div className="vwevwv">
          <h1 className="text-3xl md:text-4xl lg:text-5xl md:leading-none font-semibold text-[#003366] leading-tight">
            Prepare For Exams
            <br />
            Smarter, Not Harder
          </h1>
          <p className="text-xl leading-relaxed my-10">
            Preparing for exams but short on time? Our{' '}
            <strong>AI breaks down the syllabus</strong> based on marks weight
            age, guiding you to focus on the most important parts.{' '}
            <strong>
              Even with less time, you can maximize your preparation
            </strong>{' '}
            by focusing on key areas, thanks to the smart techniques{' '}
            <strong>personalized for you.</strong>
          </p>
          <a
            href="#"
            className="bg-[#003366] text-white rounded-lg p-3 border mt-20"
          >
            Start Your Exam Prep Now
          </a>
        </div>

        <div className="right-section">
          <div className="card" style={{ transform: 'rotate(1deg)' }}>
            <p>Lorem Ipsumdolor</p>
            <div className="number">
              <span className="line line-blue"></span>21<span>+</span>
            </div>
          </div>
          <div className="card" style={{ transform: 'rotate(-1deg)' }}>
            <p>Lorem Ipsumdolor</p>
            <div className="number">
              <span className="line line-yellow"></span>39<span>+</span>
            </div>
          </div>
          <div className="card" style={{ transform: 'rotate(1deg)' }}>
            <p>Lorem Ipsumdolor</p>
            <div className="number">
              <span className="line line-blue"></span>1b<span>+</span>
            </div>
          </div>
          <div className="card" style={{ transform: 'rotate(-1deg)' }}>
            <p>Lorem Ipsumdolor</p>
            <div className="number">
              <span className="line line-green"></span>2<span>x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPreparation;
