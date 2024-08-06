"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedLines: React.FC = () => {
  const [isHalfway, setIsHalfway] = useState(true);

  const handleButtonClick = () => {
    setIsHalfway((prev) => !prev);
  };

  const getPathLength1 = () => (isHalfway ? 0.5 : 1);
  const getPathLength2 = () => (isHalfway ? 0 : 1);

  return (
    <div className="w-full flex flex-col items-center md:py-[10vw]">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={handleButtonClick}
      >
        Animate Arrow
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="200"
        viewBox="0 0 44 75"
      >
        <defs>
          {/* <mask id="mask1" maskUnits="userSpaceOnUse">
            <motion.path
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeDasharray="100.8186"
              strokeDashoffset="100.8186"
              d="M 24.3018,49.658 C 15.0191,46.9092 18.5393,38.1126 25.6256,38.2163 35.5458,38.3614 34.8431,54.3874 22.6943,54.1023 12.0123,53.8516 7.34095,40.0402 18.4391,30.1787 29.5373,20.3173 29.9235,12.5622 27.8005,9.28112"
              initial={{ strokeDashoffset: 100.8186 }}
              animate={{ strokeDashoffset: getPathLength1() * 100.8186 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </mask> */}
          <mask id="mask2" maskUnits="userSpaceOnUse">
            <motion.path
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeDasharray="83.6713"
              strokeDashoffset="83.6713"
              d="M 27.8005,9.28112 C 25.1382,5.16638 17.6602,8.86888 20.5194,22.1412 L 28.1788,57.6956 C 31.6264,73.699 16.4903,72.3627 15.035,62.329"
              initial={{ strokeDashoffset: 83.6713 }}
              animate={{ strokeDashoffset: getPathLength2() * 83.6713 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                delay: isHalfway ? 0 : 2,
              }}
            />
          </mask>
        </defs>
        <path
          className="clef"
          fill="black"
          stroke="black"
          strokeWidth="0.1"
          mask="url(#mask1)"
          d="M 26.8522,9.90048 C 26.912,9.95039 26.9649,10.0085 27.0101,10.075 27.4815,10.7683 28.6214,14.0098 25.3767,19.8157 22.846,24.3437 11.0718,30.2815 10.2077,40.9075 9.45969,50.1477 19.1325,56.9723 27.4811,54.2894 33.0239,52.5081 35.8812,44.0959 32.4504,39.7568 23.3964,28.3057 8.87616,45.8309 22.9422,50.6319 21.4126,49.4286 20.37,48.4968 20.1759,47.3578 18.286,36.2692 34.9591,39.1968 30.4666,49.7165 28.6194,54.0421 21.1577,54.879 16.9085,51.0198 13.3489,47.787 11.7693,41.5593 15.7305,37.0885 21.0956,31.0332 27.4302,25.5974 29.1125,17.3081 29.7841,13.9988 29.4887,10.9357 28.6445,8.70078 Z"
        />
        <path
          className="clef"
          fill="black"
          stroke="black"
          strokeWidth="0.1"
          mask="url(#mask2)"
          d="M 15.7311,63.3465 C 15.3353,65.46 17.5402,69.8491 21.9764,69.9924 27.3392,70.1658 30.7655,66.0634 29.1692,59.3682 L 21.164,22.4229 C 20.2111,18.0249 20.9262,15.6394 21.4351,14.2178 22.7185,10.6326 25.8192,9.03863 26.8522,9.90048 L 28.6445,8.70078 C 26.9883,4.31578 23.2199,3.11893 20.4997,9.50576 19.1217,12.7412 18.6085,15.989 19.9279,22.2128 L 27.9268,59.9444 C 28.4995,62.6457 28.1161,66.3629 25.595,68.0714 24.3461,68.9177 19.9267,69.5001 18.8455,67.48"
        />
        <path
          className="clef dot"
          opacity="0"
          d="M 15.6702,63.6634 A 3.77139,3.8362 1.075 0 1 19.5129,59.8986 3.77139,3.8362 1.075 0 1 23.2116,63.8049 3.77139,3.8362 1.075 0 1 19.3689,67.5697 3.77139,3.8362 1.075 0 1 15.6702,63.6634 Z"
        >
          <animate
            attributeName="opacity"
            dur="0.05s"
            values="0;1"
            begin="an2.end-0.05s"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
  );
};

export default AnimatedLines;
