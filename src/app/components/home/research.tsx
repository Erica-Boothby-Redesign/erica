"use client";
import { dm_sans_font, spline_font } from "@/app/utils/fonts";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import arrow from "../../../../public/images/home/arrow.png";
import example from "../../../../public/images/home/example.webp";
import Image from "next/image";
import Link from "next/link";
import Refer_edit from "./refer_edit";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

const Home_research = ({ research_items }: any) => {
  const items = ["", "", "", "", ""];

  //   this is to handle scrolling
  const ref = useRef(null);
  const inside_ref = useRef(null);
  const text_ref = useRef(null);
  const scroll_opac = useRef(null);

  //   this is for switching animation values
  const [opac_animation, setopac_animation] = useState(1);
  const [switch_animation_value, setswitch_animation_value] = useState(100);

  const { scrollYProgress: scrollYProgress_img } = useScroll({
    target: ref,
    offset: ["-40% -40%", "100% end"], // Start calculating at 40% of the ref element, end at 80%
  });
  const { scrollYProgress: scrollYProgress_opac_text } = useScroll({
    target: ref,
    offset: ["-10% -10%", "40% end"], // Start calculating at 40% of the ref element, end at 80%
  });
  const { scrollYProgress: scrollYProgress_animation_value } = useScroll({
    target: ref,
    offset: ["-120% -120%", "40% end"], // Start calculating at 40% of the ref element, end at 80%
  });
  //   this is to opac the image

  const [translate_value, settranslate_value] = useState(10);

  const animation_value_calc = useTransform(
    scrollYProgress_animation_value,
    [0, 1],
    [100, 0],
  );

  // for the scroll to view text
  const animation_opac_text = useTransform(
    scrollYProgress_opac_text,
    [0, 1],
    [1, 0],
  );
  useMotionValueEvent(animation_value_calc, "change", (latest) => {
    setswitch_animation_value(latest);
  });
  useMotionValueEvent(animation_opac_text, "change", (latest) => {
    setopac_animation(latest);
  });

  //   this is for setting the actual movemet
  const translate_value_calc = useTransform(
    scrollYProgress_img,
    [0, 1],
    [10, -(100 / items.length) * (items.length - 2.8)],
  );
  useMotionValueEvent(translate_value_calc, "change", (latest) => {
    settranslate_value(latest);
  });

  const parent_width_for_progress = useTransform(
    scrollYProgress_img,
    [0, 1],
    [1, 10],
  );

  // GSAP for applying translations and opacity
  useEffect(() => {
    gsap.to(scroll_opac.current, {
      opacity: calwidth < 768 ? "" : opac_animation,
      duration: 0.5, // Adjust duration as needed
    });
    gsap.to(text_ref.current, {
      xPercent: calwidth < 768 ? "" : -switch_animation_value,
      duration: 1, // Adjust duration as needed
    });
    gsap.to(inside_ref.current, {
      xPercent: calwidth < 768 ? "" : translate_value,
      duration: 1, // Adjust duration as needed
    });
  }, [switch_animation_value, opac_animation, translate_value]);

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

  const truncateText = (text: any, wordLimit: any) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + ". . .";
    }
    return text;
  };
  return (
    <>
      <div
        ref={ref}
        className="w-full   py-[15vw] md:py-0 relative  md:mb-[10vw]"
        style={{ height: calwidth > 768 ? `${items.length * 50}vh` : "" }}
      >
        {/* this is the section for the scrollable elements */}
        <div className="w-full md:h-[100vh] gap-[10vw] flex-col justify-center sticky top-0 left-0  flex md:gap-[2vw] overflow-hidden ">
          <h2
            ref={text_ref}
            // style={{
            //   transform:
            //     calwidth < 768 ? "" : `translateX(-${switch_animation_value}%)`,
            // }}
            className={`${spline_font.className} z-[60]  md:text-[7vw] md:px-[10vw] font-medium text-[#5C3C43] md:text-start text-center  md:leading-[7vw] text-[10vw] leading-[11.5vw] `}
          >
            RESEARCH
          </h2>
          {/* i had to split the design into mobile and destop because of the complexity of the design  */}
          {/* SO THIS IS THE DESKTOP PAGE */}
          <div className="w-full relative md:block hidden  md:min-h-[33vw]  overflow-hidden  ">
            {isloggedin && <Refer_edit text={"research"} />}

            <div
              ref={scroll_opac}
              // style={{
              //   opacity: opac_animation,
              // }}
              className={`md:w-[25vw]   bg-[#DFE4DF] z-[5]   flex  justify-center items-center md:h-full   absolute left-0 md:gap-[1vw] `}
            >
              <p
                className={`${spline_font.className} z-[10] md:text-[1vw] font-bold`}
              >
                SCROLL TOO SEE MORE
              </p>
              <Image
                src={arrow}
                alt="arrow"
                className="md:w-[2.4vw] z-[10] h-fit"
              />
            </div>

            <div
              ref={inside_ref}
              // style={{
              //   transform:
              //     calwidth < 765 ? "" : `translateX(${translate_value}%)`,
              // }}
              className="absolute  md:gap-[1.2vw]  md:px-[1.5vw] z-[10] flex h-full top-0 left-[22vw]"
            >
              {research_items.map((e: any, index: any) => {
                return (
                  <Link
                    href={`/research/${e.slug}`}
                    key={index}
                    className={`md:w-[26vw] group  flex flex-col justify-between  md:h-full `}
                  >
                    <div className="w-full md:h-[29vw]  md:rounded-[1.5vw]   overflow-hidden relative flex justify-center items-center ">
                      <Image
                        src={e.image}
                        alt={e.title}
                        style={{
                          transition: "0.7s ease",
                          //   transform: `translate(-50%,-50%)`,
                        }}
                        width={500}
                        height={600}
                        // fill
                        className="w-full h-full  object-cover group-hover:scale-[1.1]"
                      />
                    </div>

                    <p
                      className={`${dm_sans_font.className} md:pl-[0.5vw]  md:pr-[2vw] font-medium md:text-[1.1vw]`}
                    >
                      {truncateText(e.caption, 13)}{" "}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>{" "}
          {/* AND THIS IS FOR THE MOBILE PAGE  */}
          <div className="w-full relative md:hidden overflow-hidden">
            {isloggedin && <Refer_edit text={"research"} />}

            <div
              className=" flex md:flex-nowrap
        overflow-x-auto 
        snap-x snap-mandatory md:snap-none
        scrollbar-hide 
        gap-[5%] 
        px-[5%] pb-[10vw] "
            >
              {research_items.map((e: any, index: any) => {
                return (
                  <Link
                    href={`/research/${e.slug}`}
                    key={index}
                    className={`md:w-[26vw] group gap-[2vw]  flex flex-col  w-[80vw]   flex-none md:flex-auto snap-center`}
                  >
                    <div className="w-full h-[100vw]  overflow-hidden rounded-[5vw] relative flex justify-center items-center ">
                      <Image
                        unoptimized
                        height="0"
                        width="0"
                        src={e.image}
                        alt={e.title}
                        style={{
                          transition: "0.7s ease",
                        }}
                        className="w-full h-full  object-cover group-hover:scale-[1.1]"
                        // className="h-full w-auto"
                      />
                    </div>

                    <p
                      className={`${dm_sans_font.className}    font-medium leading-[5vw] p-[3vw]  text-[4vw] 
                 `}
                    >
                      {truncateText(e.caption, 15)}{" "}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home_research;
