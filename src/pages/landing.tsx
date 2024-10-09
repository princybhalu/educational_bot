import { useState } from "react";
import PicingSection from "../components/landing/pricingSection";
import Slider from "../components/landing/slider";
import StrugglingSection from "../components/landing/StrugglingSection";
import Footer from "../shared/footer/footer";
import Navbar from "../shared/navbar/landing";
import "../style/landing.css";
import Footer1 from "../shared/footer/footer1";

const Landing = () => {
  const [currentBg , setCurrentBg] = useState(0);
  return (
    <>
      <div className={`${"background-" + currentBg} min-h-screen`}>
        <Navbar />
        <Slider 
        //@ts-ignore
        setCurrentBgFuc={(value : any) => setCurrentBg(value)}/>
      </div>
      {/* this is used for fix width */}
      <div className="justify-between items-center max-w-[1300px] mx-auto">
        <StrugglingSection />
        <PicingSection />
      </div>
      {/* <Footer /> */}
      <Footer1 />

    </>
  );
};

export default Landing;
