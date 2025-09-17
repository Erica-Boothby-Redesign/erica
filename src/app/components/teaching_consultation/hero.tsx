"use client";

import { spline_font } from "@/app/utils/fonts";
import hero from "../../../../public/images/consultation/hero.webp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Edit_text from "../general-component/edit_text";
import Modal_text_edit from "../general-component/modal_text_edit";
import Modal_img_edit from "../general-component/modal_img_edit";
import Edit_img from "../general-component/edit_img";

const Teaching_hero = ({ page_data }: any) => {
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
        .from("consultation_page")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setactive_user_data(data);
        console.log("this is from eididdkkkkkkkkkk");
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
      .channel("consultation_page_channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "consultation_page" },
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
          table={"consultation_page"}
        />
      )}
      {/* for the image editing */}
      {edit_img && (
        <Modal_img_edit
          edit_img={edit_img}
          record_Name={record_Name}
          setedit_img={setedit_img}
          table={"consultation_page"}
        />
      )}
      <div
        ref={ref}
        className="w-full h-[180vw] p-[2%]  md:h-[53vw] md:px-[2vw] md:py-[1vw]"
      >
        <div className="h-full w-full overflow-hidden md:px-[5vw] md:py-[8vw] items-end flex md:rounded-[1vw] rounded-[5vw] pb-[10vw] px-[6vw]  bg-[grey] relative">
          <div className="overflow-hidden  z-[70]">
            <h1
              style={{
                transition: "0.5s ease",
                //   opacity: start_anime ? 1 : 0,
                transform: start_anime
                  ? "translate(0,0)"
                  : "translate(0%,100%)",
              }}
              className={`${spline_font.className} font-semibold md:text-[4vw] text-[#DFE4DF] relative md:leading-[4.1vw] text-[10vw] leading-[11vw] z-[65] md:w-[60vw]`}
            >
              {isloggedin && (
                <Edit_text
                  record={"heading"}
                  setedit_text={setedit_text}
                  setrecord_Name={setrecord_Name}
                  text={active_user_data[0].heading}
                />
              )}
              {active_user_data[0].heading || ""}
            </h1>
          </div>
          <Image
            src={active_user_data[0].hero_img}
            unoptimized
            width="0"
            height="0"
            alt="hero image"
            className="w-full  absolute md:top-0 md:left-0 top-[50%] translate-x-[-50%] translate-y-[-50%]  md:translate-x-0 md:translate-y-0 left-[50%]   h-full object-cover "
            style={{
              transition: yvalue > 1 ? "" : "0.45s ease",
              opacity: start_anime ? 1 : 0,
              scale: calWidth < 768 ? "" : start_anime ? yvalue : 1.8,
            }}
          />
          <div className="w-full h-full left-0 top-0 absolute bg-black md:bg-opacity-[43%] bg-opacity-[10%] ">
            {" "}
            {isloggedin && (
              <Edit_img
                record={"hero_img"}
                setedit_img={setedit_img}
                setrecord_Name={setrecord_Name}
                text={active_user_data[0].hero_img}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:h-[8vw] h-[15vw]"></div>
    </>
  );
};

export default Teaching_hero;
