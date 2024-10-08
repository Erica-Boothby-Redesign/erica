"use client";

import { spline_font } from "@/app/utils/fonts";
import hero from "../../../../public/images/workshop/hero.webp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const Workshop_hero = () => {
  const [start_anime, setstart_anime] = useState(false);
  useEffect(() => {
    setstart_anime(true);
  }, []);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "end 110%"],
  });
  const [yvalue, setyvalue] = useState(0);

  const y = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  useMotionValueEvent(y, "change", (latest) => {
    setyvalue(latest);
  });

  const [start_text_anime, set_start_text_anime] = useState(false);
  const text_ref = useRef(null);

  const useinvew = useInView(text_ref);

  useEffect(() => {
    console.log(useinvew);
    if (useinvew) {
      set_start_text_anime(true);
    }
  }, [useinvew]);
  return (
    <>
      <div
        ref={ref}
        className="w-full md:block hidden  md:h-[53vw] md:px-[2vw] md:py-[1vw]"
      >
        <div className="h-full w-full overflow-hidden md:px-[5vw] md:py-[8vw] md:items-end flex md:rounded-[1vw]  bg-[grey] relative">
          <div className="overflow-hidden  z-[10]">
            <h1
              style={{
                transition: "0.5s ease",
                //   opacity: start_anime ? 1 : 0,
                transform: start_anime
                  ? "translate(0,0)"
                  : "translate(0%,100%)",
              }}
              className={`${spline_font.className} font-semibold md:text-[4vw] text-[#DFE4DF]  md:leading-[4.1vw] z-[10] md:w-[60vw]`}
            >
              WORKSHOP
            </h1>
          </div>
          <Image
            src={hero}
            alt="hero image"
            className="w-full h-fit absolute left-0 top-0"
            style={{
              transition: yvalue > 1 ? "" : "0.45s ease",
              opacity: start_anime ? 1 : 0,
              scale: start_anime ? yvalue : 1.8,
            }}
          />
          <div className="w-full h-full left-0 top-0 absolute bg-black bg-opacity-[43%]"></div>
        </div>
      </div>
      <div className="w-full md:py-[5vw] md:px-[10vw]">
        <div ref={text_ref} className="overflow-hidden md:py-[5vw]">
          <h2
            style={{
              transition: "0.9s ease",
              //   opacity: start_anime ? 1 : 0,
              transform: start_text_anime
                ? "translate(0,0)"
                : "translate(0%,100%)",
            }}
            className={`uppercase ${spline_font.className} text-[#707270] font-light md:text-[4vw] md:leading-[5.2vw] text-center`}
          >
            Led by Erica Boothby, Ph.D., Senior Lecturer at The Wharton School,
            University of Pennsylvania
          </h2>
        </div>
      </div>
    </>
  );
};

export default Workshop_hero;
