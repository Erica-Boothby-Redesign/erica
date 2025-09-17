"use client";

import { eb_gramond_font, spline_font } from "@/app/utils/fonts";
import hero from "../../../../public/images/media/hero.webp";
import dp from "../../../../public/images/media/dp.webp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Modal_text_edit from "../general-component/modal_text_edit";
import Modal_img_edit from "../general-component/modal_img_edit";
import Edit_text from "../general-component/edit_text";
import Edit_img from "../general-component/edit_img";

const Media_hero = ({ page_data }: any) => {
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
    offset: ["end start", "end 130%"],
  });
  const [yvalue, setyvalue] = useState(0);

  const y = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

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
  const [active_user_data, setactive_user_data] = useState(page_data);

  const [edit_text, setedit_text] = useState(false);
  const [record_Name, setrecord_Name] = useState("");
  const [edit_img, setedit_img] = useState(false);

  // for tracking
  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("media_page")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setactive_user_data(data);
        // console.log(data);
      }
    };

    fetchInitialData();

    // Real-time subscription

    const handleUpdates = (payload: any) => {
      console.log("Update received!", payload);
      setactive_user_data((prevData: any) =>
        prevData.map((item: any) =>
          item.id === payload.new.id ? payload.new : item,
        ),
      );

      fetchInitialData();
    };

    const subscription = supabase
      .channel("media_page_channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "media_page" },
        handleUpdates,
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <>
      {edit_text && (
        <Modal_text_edit
          edit_text={edit_text}
          record_Name={record_Name}
          setedit_text={setedit_text}
          table={"media_page"}
        />
      )}
      {/* for the image editing */}
      {edit_img && (
        <Modal_img_edit
          edit_img={edit_img}
          record_Name={record_Name}
          setedit_img={setedit_img}
          table={"media_page"}
        />
      )}
      <div
        ref={ref}
        className="w-full flex justify-center items-center pt-[30vw]   md:px-[2vw] flex-col md:py-[8vw] relative gap-[10vw] md:gap-[2vw]"
      >
        <div className="overflow-hidden md:px-0 px-[3%] relative z-[10]">
          <h1
            style={{
              transition: "0.5s ease",
              //   opacity: start_anime ? 1 : 0,
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            className={`${spline_font.className} uppercase  font-bold md:text-[8vw] text-[#DFE4DF]  md:leading-[8.5vw] z-[10] text-center text-[15vw] leading-[16.5vw]`}
          >
            {active_user_data[0].heading}
            {isloggedin && (
              <Edit_text
                record={"heading"}
                setedit_text={setedit_text}
                setrecord_Name={setrecord_Name}
                text={active_user_data[0].heading}
              />
            )}
          </h1>
        </div>
        {/* the woman image */}
        <div
          style={{
            transition: "0.5s ease",
            opacity: start_anime ? 1 : 0,
            scale: start_anime ? 1 : 0.5,
          }}
          className=" relative bg-[#A58D90] rounded-[30vw] md:rounded-[11vw] h-[80vw]  w-[60vw] md:h-[30vw] md:w-[22.8vw] z-[10] overflow-hidden"
        >
          {" "}
          {isloggedin && (
            <Edit_img
              record={"profile_bg"}
              setedit_img={setedit_img}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].profile_bg}
            />
          )}
          <Image
            src={active_user_data[0].profile_bg}
            unoptimized
            width="0"
            height="0"
            alt="hero image"
            className="w-full h-fit absolute  translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]  z-[10]"
            style={{
              transition: yvalue > 1 ? "" : "0.45s ease",
              transform: `translateY(-50%) translateX(-50%) scale(${
                calWidth < 768 ? "" : start_anime ? yvalue : 1.8
              })`,
              //   scale: start_anime ? yvalue : 1.8,
            }}
          />
        </div>

        <div className="overflow-hidden relative">
          {isloggedin && (
            <Edit_text
              record={"occupation"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].occupation}
            />
          )}
          <p
            style={{
              transition: "0.5s ease",
              //   opacity: start_anime ? 1 : 0,
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            dangerouslySetInnerHTML={{ __html: active_user_data[0].occupation }}
            className={`md:text-[1.5vw] ${eb_gramond_font.className} font-bold text-center md:leading-[2vw]`}
          ></p>
        </div>
        <div className="md:h-[51%]  h-[62%] w-[97%] rounded-[5vw]   md:w-[96vw] overflow-hidden  md:rounded-[1vw]   bg-[#a58d90c4] absolute md:top-[1vw] top-[2vw] left-[50%] translate-x-[-50%]">
          <div className="w-full h-full    bg-black relative">
            <div className="absolute   bottom-0 md:right-0  w-full md:h-full h-[70vw] z-[100]">
              {isloggedin && (
                <Edit_img
                  record={"hero_bg"}
                  setedit_img={setedit_img}
                  setrecord_Name={setrecord_Name}
                  text={active_user_data[0].hero_bg}
                />
              )}
            </div>
            <Image
              src={active_user_data[0].hero_bg}
              unoptimized
              width="0"
              height="0"
              alt="hero image"
              className="w-full h-fit   absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]"
              style={{
                transition: yvalue > 1 ? "" : "0.45s ease",
                transform: `translateX(-50%) translateY(-50%) scale(${
                  calWidth < 768 ? "3.2" : start_anime ? yvalue : 1.8
                }) `,
                // scale: ,
              }}
            />
          </div>
          <div className="w-full h-full left-0 top-0 absolute bg-[#27070E] bg-opacity-[50%]"></div>
        </div>
      </div>{" "}
      {isloggedin && (
        <p className="text-[red] uppercase text-center text-sm ">
          Please note that updates may take up to 5 seconds to reflect after
          each change due to site caching.
        </p>
      )}
      <div className="w-full md:h-[8vw]"></div>
    </>
  );
};

export default Media_hero;
