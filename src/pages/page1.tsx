import React from 'react';

const Page1 = () => {
  return (
    <>
      <div className="flex flex-col p-10 lg:px-48 gap-10">
        <div className="text-blue-900 text-3xl font-semibold">
          Beat Exam Stress With Confidence
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full h-[250px] bg-sky-300 flex items-center justify-center">
            Image
          </div>
          <div className="flex flex-col justify-between py-4 gap-10">
            <div className="text-md">
              We know how stressful exams be. That&apos;s why{' '}
              <b>our AI goes beyond just teaching.</b>
              It helps you tackle your exam anxiety by understanding your
              learning style and customizing the approach accodingly.
              You&apos;ll <b>fill more confident and prepared</b>&nbsp;then even
              before!
            </div>
            <button className="py-2 px-4 bg-blue-900 hover:bg-blue-800 text-white text-md font-semibold rounded-md inline w-fit">
              Let AI Help You Overcome Exam Stress
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page1;
