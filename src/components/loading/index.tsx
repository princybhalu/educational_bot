import React from "react";
import "../../style/loader.css";

const Loader: React.FC = () => {
  return (
    <div className="item-center w-full h-screen bg-black">
      {/* <div className="w"></div> */}
      <div id="container" className="loading-div mx-auto">
        <svg height="100%" width="100%" id="loader" className="">
          <circle className="dot" id="dot0" cx="100" cy="290" r="5" />
          <circle className="dot" id="dot1" cx="200" cy="270" r="5" />
          <circle className="dot" id="dot2" cx="250" cy="240" r="5" />
          <circle className="dot" id="dot3" cx="330" cy="140" r="5" />
          <circle className="dot" id="dot4" cx="290" cy="375" r="5" />
          <circle className="dot" id="dot5" cx="160" cy="440" r="5" />
          <line id="line1" x1="100" y1="290" x2="200" y2="270" /> 0-1
          <line id="line2" x1="200" y1="270" x2="250" y2="240" /> 1-2
          <line id="line3" x1="250" y1="240" x2="330" y2="140" /> 2-3
          <line id="line4" x1="250" y1="240" x2="290" y2="375" /> 2-4
          <line id="line5" x1="160" y1="440" x2="290" y2="375" /> 5-4
          <line id="line6" x1="160" y1="440" x2="200" y2="270" /> 1-5
        </svg>
      </div>
    </div>
  );
};

export default Loader;
