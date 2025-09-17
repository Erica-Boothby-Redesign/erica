"use client";

import Image from "next/image";
import hero from "../../../../public/images/research/hero.webp";
import { Helvetica_light, spline_font } from "@/app/utils/fonts";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Edit_text from "../general-component/edit_text";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Modal_text_edit from "../general-component/modal_text_edit";

const Research_hero = ({ page_data }: any) => {
  // this is to calculate for the width

  const [calWidth, setCalWidth] = useState(0);
  const width = globalThis.innerWidth;
  const handleResize = () => {
    setCalWidth(globalThis.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial call to set the width on component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  useEffect(() => {
    handleResize();
  }, [width]);

  const [start_anime, setstart_anime] = useState(false);
  useEffect(() => {
    setstart_anime(true);
  }, []);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "end 110%"],
  });
  const [yvalue, setyvalue] = useState(1);

  const y = useTransform(scrollYProgress, [0, 1], [1.4, 1]);

  useMotionValueEvent(y, "change", (latest) => {
    setyvalue(latest);
  });

  const [isloggedin, setisloggedin] = useState(false);
  const router = useRouter();

  // check if logged in
  useEffect(() => {
    // Check initial session
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setisloggedin(true);
      }
    };

    checkInitialSession();
  }, [router]);
  // this is to calculate for the width

  const [edit_text, setedit_text] = useState(false);
  const [record_Name, setrecord_Name] = useState("");
  return (
    <>
      {edit_text && (
        <Modal_text_edit
          edit_text={edit_text}
          record_Name={record_Name}
          setedit_text={setedit_text}
          table={"research_page"}
        />
      )}
      <div
        ref={ref}
        className="w-full flex flex-col  bg-[#908E8E]  items-center justify-end md:h-[55vw] h-[180vw] relative overflow-hidden  md:gap-[1.1vw] md:pb-[7vw] gap-[4vw] md:px-[12vw] pb-[12vw] px-[3.5%]"
      >
        <Image
          src={hero}
          alt="hero image"
          className="absolute object-cover h-full w-full md:top-0 md:left-0 top-[50%] translate-x-[-50%] translate-y-[-50%]  md:translate-x-0 md:translate-y-0 left-[50%]  md:w-full "
          style={{
            transition: yvalue > 1 ? "" : "0.45s ease",
            opacity: start_anime ? 1 : 0,
            scale: calWidth < 768 ? "" : start_anime ? yvalue : 1.8,
          }}
        />
        <div className="w-full h-full left-0 top-0 absolute bg-black md:bg-opacity-[43%] bg-opacity-[25%]"></div>

        <div className=" overflow-hidden">
          <h1
            style={{
              transition: "0.5s ease",
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            className={`${spline_font.className} font-bold z-[10] text-[#DFE4DF] md:text-[7vw] relative  md:leading-[7vw]  text-[10vw] leading-[11vw]`}
          >
            {page_data[0].hero}
            {isloggedin && (
              <Edit_text
                record={"hero"}
                setedit_text={setedit_text}
                setrecord_Name={setrecord_Name}
                text={page_data[0].hero}
              />
            )}
          </h1>
        </div>

        <div className=" overflow-hidden">
          <p
            style={{
              transition: "0.9s ease",
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            className={`text-[#DFE4DF] md:leading-[1.6vw] z-[10] md:text-[1.2vw] text-[4vw] relative leading-[4.8vw]  ${Helvetica_light.className}`}
          >
            {page_data[0].sub_hero}
            {isloggedin && (
              <Edit_text
                record={"sub_hero"}
                setedit_text={setedit_text}
                setrecord_Name={setrecord_Name}
                text={page_data[0].sub_hero}
              />
            )}
          </p>
        </div>

        <div className="flex w-full overflow-hidden">
          <Link
            style={{
              whiteSpace: "nowrap",
              transition: "0.9s ease",
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            href={"/"}
            className="uppercase overflow-hidden  md:p-[0.5vw] p-[2vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  rounded-[8vw]  md:rounded-[1.5vw] bg-[#440C0C] backdrop-blur-2xl bg-opacity-[20%] "
          >
            <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.3vw]  rounded-[7vw] flex justify-center items-center  md:py-[0.7vw] md:px-[1.5vw] py-[2.5vw] px-[8vw]">
              <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white text-[3.5vw]">
                View PUBLICATIONS
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* second section */}
      <div className="w-full  md:px-[12vw] px-[4%] py-[20vw] gap-[8vw] flex-col flex  md:gap-[2vw] md:py-[7vw] ">
        <h2
          className={`md:text-[5vw]  md:leading-[5vw] ${spline_font.className} text-[#1E1E1E] md:font-light font-medium text-[10vw] leading-[11vw] relative`}
        >
          {page_data[0].title}
          {isloggedin && (
            <Edit_text
              record={"title"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={page_data[0].title}
            />
          )}
        </h2>
        <p
          className={`${Helvetica_light.className} text-[#707270] text-[4vw] leading-[5vw] relative md:text-[1.2vw] md:leading-[1.8vw]`}
        >
          {page_data[0].sub_title}
          {isloggedin && (
            <Edit_text
              record={"sub_title"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={page_data[0].sub_title}
            />
          )}
        </p>
      </div>
    </>
  );
};

export default Research_hero;
