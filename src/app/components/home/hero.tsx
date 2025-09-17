"use client";
import Image from "next/image";
import hero from "../../../../public/images/home/hero.webp";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import {
  Agatho_regular,
  Helvetica_light,
  eb_gramond_italic_font,
} from "@/app/utils/fonts";

const Hero_home = () => {
  const [start_anime, setstart_anime] = useState(false);
  useEffect(() => {
    setstart_anime(true);
  }, []);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["end start", "end 110%"],
    offset: ["2% 2%", "140% end"],
  });
  const [yvalue, setyvalue] = useState(1);

  const y = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  useMotionValueEvent(y, "change", (latest) => {
    setyvalue(latest);
  });

  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  const width = globalThis.innerWidth;
  useEffect(() => {
    setcalwidth(width);
  }, [width]);
  const handleResize = () => {
    setcalwidth(globalThis.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial call to set the width on component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  const [calwidth, setcalwidth] = useState(0);

  return (
    <>
      <div
        ref={ref}
        className="w-full flex md:px-[10vw] md:pb-[2vw]  flex-col justify-end  overflow-hidden md:h-[62vw] h-[180vw] relative text-[#DFE4DF]  px-[3%] pb-[15vw]"
      >
        <Image
          style={{
            transition: yvalue > 1 ? "" : "0.45s ease",
            transform: `translate(-50%, -50%) scale(${
              calwidth < 765 ? "3" : start_anime ? yvalue : 1.4
            })`,
            filter: start_anime ? "" : "blur(10px)",
          }}
          src={hero}
          alt="hero image"
          className="absolute_center left-[50%] top-[50%] absolute w-full h-fit"
        />
        <div className="w-full  h-[50%] bg-gradient-to-t from-[black]  md:from-black md:via-black via-black left-0  bottom-0 z-[10] absolute   md:bg-opacity-[20%]"></div>
        {/* left text */}
        <div className="z-[10] md:w-[20vw] bottom-[2%]  absolute md:bottom-[50%] translate-y-[-50%] md:px-0   block md:flex justify-start md:right-[10vw]  overflow-hidden ">
          {/* <p
            style={{
              transition: "0.5s ease",
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            className={`${Helvetica_light.className} md:text-[1.5vw] text-[4vw] md:leading-[2.3vw] leading-[5vw]  z-[10] md:w-auto w-[50vw] `}
          >
            Educator, Scholar, Professor & Speaker
          </p> */}
        </div>
        <div className=" z-[10] overflow-hidden  ">
          <h1
            style={{
              transition: "0.65s ease",
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            className={`md:text-[15vw] text-[19vw]  leading-[28vw] text-[white]  z-[10] md:leading-[12.5vw] ${Agatho_regular.className}`}
          >
            ERICA
          </h1>
        </div>

        {/* right text */}
        <div className=" z-[100] md:pr-[2vw]  md:mt-0 mt-[-4vw] overflow-hidden">
          <h1
            style={{
              transition: "0.65s ease",
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            className={`md:text-[15vw]  md:leading-[17vw] text-[19vw] leading-[28vw] text-white   md:text-end  ${Agatho_regular.className}`}
          >
            BOOTHBY
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero_home;
