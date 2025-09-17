"use client";

import {
  Helvetica_light,
  eb_gramond_font,
  eb_gramond_italic_font,
} from "@/app/utils/fonts";
import { useEffect, useRef, useState } from "react";
import hero1 from "../../../../public/images/about/hero1.webp";
import hero2 from "../../../../public/images/about/hero2.webp";
import Image from "next/image";
import { gsap } from "gsap";

import bg from "../../../../public/images/about/bg.webp";
import Link from "next/link";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
import Edit_text from "../general-component/edit_text";
import Modal_text_edit from "../general-component/modal_text_edit";
import Modal_img_edit from "../general-component/modal_img_edit";
import Edit_img from "../general-component/edit_img";
const About_hero = ({ user_data }: any) => {
  const [start_anime, setstart_anime] = useState(false);
  const [active_user_data, setactive_user_data] = useState(user_data);
  useEffect(() => {
    setstart_anime(true);
  }, []);

  //   this is to handle scrolling
  const ref = useRef(null);
  const image_ref = useRef(null);
  const image_ref_one = useRef(null);
  const image_ref_two = useRef(null);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref,
    offset: ["40% 40%", "90% end"], // Start calculating at 40% of the ref element, end at 80%
  });

  const { scrollYProgress: scrollYProgress_img } = useScroll({
    target: ref,
    offset: ["80% 80%", "100% end"], // Start calculating at 40% of the ref element, end at 80%
  });
  //   this is to opac the image

  const bg_img_opac = useTransform(scrollYProgress_img, [0, 1], [0, 1]);
  useMotionValueEvent(bg_img_opac, "change", (latest) => {
    //   console.log(latest);
    setbg_img_opacity(latest);
  });

  const [yvalue, setyvalue] = useState(-50);
  // const [start_anime, setstart_anime] = useState(-50);
  const [opac_one_img, setopac_one_img] = useState(1);
  const [opac_two_img, setopac_two_img] = useState(0);
  const [bg_img_opacity, setbg_img_opacity] = useState(0);

  const y = useTransform(scrollYProgress1, [0, 1], [-50, 25]);
  const opac_one = useTransform(scrollYProgress1, [0, 1], [1, 0]);
  const opac_two = useTransform(scrollYProgress1, [0, 1], [0, 1]);

  useMotionValueEvent(y, "change", (latest) => {
    setyvalue(latest);
  });
  useMotionValueEvent(opac_one, "change", (latest) => {
    setopac_one_img(latest);
  });
  useMotionValueEvent(opac_two, "change", (latest) => {
    setopac_two_img(latest);
  }); // this is for width calculation
  const [calWidth, setCalWidth] = useState(0);
  // const [start_anime, setstart_anime] = useState(false)

  // GSAP for applying translations and opacity
  useEffect(() => {
    gsap.to(image_ref.current, {
      xPercent: calWidth < 768 ? "" : yvalue >= 50 ? -50 : yvalue,
      duration: 1, // Adjust duration as needed
    });
    gsap.to(image_ref_one.current, {
      opacity: calWidth < 768 ? "" : opac_one_img,
      duration: 0.2, // Adjust duration as needed
    });
    gsap.to(image_ref_two.current, {
      opacity: calWidth < 768 ? "" : opac_two_img,
      duration: 0.2, // Adjust duration as needed
    });
  }, [yvalue, opac_one_img, opac_two_img, calWidth, start_anime]);

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

  const [edit_text, setedit_text] = useState(false);
  const [edit_img, setedit_img] = useState(false);
  const [record_Name, setrecord_Name] = useState("");
  const [btn_text, setbtn_text] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("about")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setactive_user_data(data);
      }
    };

    fetchInitialData();

    // Real-time subscription
    const handleInserts = (payload: any) => {
      console.log("Insert received!", payload);
      window.location.reload();
    };

    const handleUpdates = (payload: any) => {
      console.log("Update received!", payload);
      setactive_user_data((prevData: any) =>
        prevData.map((item: any) =>
          item.id === payload.new.id ? payload.new : item,
        ),
      );

      fetchInitialData();
    };

    const handleDeletes = (payload: any) => {
      console.log("Delete received!", payload);
      setactive_user_data((prevData: any) =>
        prevData.filter((item: any) => item.id !== payload.old.id),
      );
    };

    const subscription = supabase
      .channel("about_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "about" },
        handleInserts,
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "about" },
        handleUpdates,
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "about" },
        handleDeletes,
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
          table={"about"}
        />
      )}
      {edit_img && (
        <Modal_img_edit
          edit_img={edit_img}
          record_Name={record_Name}
          setedit_img={setedit_img}
          btn_text={btn_text}
          table={"about"}
        />
      )}
      <div className="w-full pt-[30vw]  md:py-[4vw] gap-[7vw] pb-[10vw] flex-col px-[3%] md:px-[7vw]  md:gap-[3vw]  flex">
        <div className="md:overflow-hidden  ">
          <h1
            style={{
              transition: "0.65s ease",
              transform:
                calWidth < 760
                  ? ""
                  : start_anime
                  ? "translate(0,0)"
                  : "translate(0%,100%)",
            }}
            className={`md:text-[14.7vw] text-[25vw] leading-[27vw]  md:leading-[20vw]   text-center   text-[#1E1E1E] ${eb_gramond_italic_font.className}`}
          >
            Erica Boothby
          </h1>
        </div>

        <div className="overflow-hidden md:mt-[-2vw]  md:w-[50%]  md:px-[4vw] md:text-start text-center">
          <p
            style={{
              transition: "0.65s ease",
              transform: start_anime ? "translate(0,0)" : "translate(0%,100%)",
            }}
            className={`${Helvetica_light.className} text-[4vw] leading-[4.5vw] md:text-[1.4vw] md:leading-[1.6vw]`}
          >
            Educator, Scholar, <br /> Professor & Speaker
          </p>
        </div>
        <div
          className="w-full gap-[7vw]   md:h-[250vh]  md:flex-row flex-col md:mt-[-10vh] flex items-start  relative "
          ref={ref}
        >
          <div className="w-full  h-full   hidden md:absolute md:top-0 md:left-0  md:flex items-end">
            <div className="w-full md:h-[100vh]  flex justify-center items-center ">
              <Image
                src={bg}
                style={{ opacity: bg_img_opacity }}
                alt="background"
                className="md:w-[45vw]   h-fit"
              />
            </div>
          </div>
          <div
            ref={image_ref}
            style={
              {
                // transform:
                //   calWidth < 760
                //     ? ""
                //     : yvalue >= 50
                //     ? `translateX(${-50}%) `
                //     : ` translateX(${yvalue}%)  `,
              }
            }
            // transition={{ ease: "easeOut", duration: 0 }}
            className={`md:sticky ${
              start_anime ? " md:left-[25%]" : " md:left-[10%]"
            }  md:top-0 z-[20]  md:w-[40%] md:h-[100vh] flex items-center`}
          >
            <div className="w-full md:h-[36vw]    overflow-hidden relative ">
              {/* {isloggedin && <Edit_text />} */}

              <Image
                ref={image_ref_one}
                src={active_user_data[0].dp_img_one}
                unoptimized
                width="0"
                height="0"
                style={{
                  // opacity: start_anime ? 1 : 0,
                  transition: "0.65s ease",
                  transform:
                    calWidth < 760
                      ? ""
                      : start_anime
                      ? ""
                      : "translateY(-50%)  translateX(-50%)  scale(1.6)",
                  filter: start_anime ? "" : "blur(4px)",
                }}
                alt="Erica Boothby"
                className="w-full md:absolute md:top-[50%] md:scale-[1.1]  md:translate-x-[-50%] md:left-[50%] md:translate-y-[-50%] h-fit z-[10]"
              />
              <Image
                ref={image_ref_two}
                src={active_user_data[0].dp_img_two}
                unoptimized
                width="0"
                height="0"
                // style={{ opacity: calWidth < 768 ? "" : opac_two_img }}
                alt="Erica Boothby"
                className="w-full md:absolute md:top-[50%]  md:block hidden md:translate-x-[-50%] md:left-[50%] md:translate-y-[-50%] h-fit "
              />

              {/* THIS IS TO EDIT THE TWO IMAGES */}
              {isloggedin && (
                <div className="absolute left-0 top-0 h-full w-[50%]">
                  <Edit_img
                    record={"dp_img_one"}
                    btn_text={"image 1"}
                    setbtn_text={setbtn_text}
                    setedit_img={setedit_img}
                    setrecord_Name={setrecord_Name}
                    text={active_user_data[0].dp_img_one}
                    // zzz={opac_one_img}
                  />{" "}
                </div>
              )}

              {isloggedin && (
                <div className="absolute right-0 bg-white border-red-600 border top-0 h-full w-[50%]">
                  <Edit_img
                    record={"dp_img_two"}
                    btn_text={"image 2"}
                    setbtn_text={setbtn_text}
                    setedit_img={setedit_img}
                    setrecord_Name={setrecord_Name}
                    text={active_user_data[0].dp_img_two}
                    // zzz={opac_two_img}
                  />
                </div>
              )}
            </div>
          </div>

          {/* <div className="  flex justify-end md:px-[10%]"> */}
          <div className="flex flex-col   md:w-[60%] md:px-[6%] z-[10] md:h-[100vh] justify-center   items-start md:gap-[2vw]">
            <p
              className={`${Helvetica_light.className} relative  md:text-[1.1vw] text-center md:text-start text-[3.5vw] text-[#707270] md:text-[black]`}
            >
              {isloggedin && (
                <Edit_text
                  record={"des_one"}
                  setedit_text={setedit_text}
                  setrecord_Name={setrecord_Name}
                  text={active_user_data[0].des_one}
                />
              )}
              {active_user_data[0].des_one || "LOADING ..."}
            </p>

            <Link
              style={{
                whiteSpace: "nowrap",
                transition: "0.9s ease",
                transform: start_anime ? "translate(0,0)" : "translate(0%,80%)",
              }}
              target="_blank"
              href={
                "https://static1.squarespace.com/static/53dd6293e4b0d1d6aa7a2e72/t/64d3dc81cfc33c11b43dbb2a/1691606146249/Erica+Boothby+CV.pdf"
              }
              className={` ${Helvetica_light.className} md:block hidden uppercase overflow-hidden  md:p-[0.5vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[#440C0C] backdrop-blur-2xl bg-opacity-[20%] `}
            >
              <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] flex justify-center items-center  md:py-[0.7vw] md:px-[1.5vw]">
                <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white">
                  View CV
                </p>
              </div>
            </Link>
            {/* </div> */}
          </div>
        </div>

        {/* the below content */}
        <p
          className={`text-[#707270] md:text-[1.3vw] md:mt-[-2vw] text-[3.5vw] md:px-[12vw] relative ${Helvetica_light.className} text-center`}
        >
          {" "}
          {isloggedin && (
            <Edit_text
              record={"des_two"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].des_two}
            />
          )}
          {active_user_data[0].des_two || "LOADING ..."}
        </p>

        <div className="flex justify-center w-full md:hidden   ">
          <Link
            style={{
              whiteSpace: "nowrap",
              transition: "0.9s ease",
              // transform: start_anime ? "translate(0,0)" : "translate(0%,80%)",
            }}
            target="_blank"
            href={
              "https://static1.squarespace.com/static/53dd6293e4b0d1d6aa7a2e72/t/64d3dc81cfc33c11b43dbb2a/1691606146249/Erica+Boothby+CV.pdf"
            }
            className={` ${Helvetica_light.className} uppercase overflow-hidden  md:p-[0.5vw] p-[2vw] rounded-[8vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[#440C0C] backdrop-blur-2xl bg-opacity-[20%] w-fit  `}
          >
            <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] rounded-[7vw] flex justify-center items-center py-[2.5vw] px-[8vw]  md:py-[0.7vw] md:px-[1.5vw]">
              <p className="inline-block md:text-[1vw]  text-[3.5vw] text-[white] group-hover:text-white">
                View CV
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default About_hero;
