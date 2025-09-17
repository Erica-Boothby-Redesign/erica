"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Helvetica_light,
  Helvetica_medium,
  spline_font,
} from "@/app/utils/fonts";
import { gsap } from "gsap";
import Link from "next/link";
import Edit_text from "../general-component/edit_text";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
import Modal_text_edit from "../general-component/modal_text_edit";

const AnimatedLines = ({ active_user_data }: any) => {
  const [value_1, setvalue_1] = useState(100);
  const [value_2, setvalue_2] = useState(100);
  const [value_3, setvalue_3] = useState(100);
  const [value_inner_4, setvalue_inner_4] = useState(200);
  const [start_frist_text, setstart_frist_text] = useState(false);
  const [start_second_text, setstart_second_text] = useState(false);

  const first_text_ref = useRef(null);
  const second_text_ref = useRef(null);
  const ref = useRef(null);
  const first_ref = useRef(null);
  const second_ref = useRef(null);
  const third_ref = useRef(null);
  const mobile_first_ref = useRef(null);
  const mobile_second_ref = useRef(null);
  const mobile_third_ref = useRef(null);

  //  THIS IS FOR THE RIGHT TEXT THAT TRANSLATES
  const right_first_text = useRef(null);
  const right_second_text = useRef(null);
  const right_three_text = useRef(null);

  //  THIS IS FOR THE MIDDLE TEXT THAT TRANSLATES
  const middle_first_text = useRef(null);

  //  THIS IS FOR THE LEFT TEXT THAT TRANSLATES
  const left_first_text = useRef(null);
  const left_second_text = useRef(null);

  // THIS IS FOR THE MOBILE UP AND DOWN
  const mobile_up_text = useRef(null);
  const mobile_down_text = useRef(null);

  const first_is_in_view = useInView(first_text_ref);
  const second_is_in_view = useInView(second_text_ref);

  useEffect(() => {
    first_is_in_view && setstart_frist_text(first_is_in_view);
    second_is_in_view && setstart_second_text(second_is_in_view);
  }, [first_is_in_view, second_is_in_view]);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref,
    offset: ["-30% -30%", "40% end"],
  });
  const { scrollYProgress: scrollYProgress_middle } = useScroll({
    target: ref,
    offset: ["2% 2%", "70% end"],
  });

  const { scrollYProgress: scrollYProgress_inner_middle } = useScroll({
    target: ref,
    offset: ["60% 60%", "90% end"],
  });
  const { scrollYProgress: scrollYProgress_end } = useScroll({
    target: ref,
    offset: ["60% 60%", "90% end"],
  });

  const bg_img_opac = useTransform(scrollYProgress1, [0, 1], [100, 0]);
  const middle_opac = useTransform(scrollYProgress_middle, [0, 1], [100, 0]);
  const inner_middle_opac = useTransform(
    scrollYProgress_inner_middle,
    [0, 1],
    [300, 0],
  );
  const end_opac = useTransform(scrollYProgress_end, [0, 1], [100, 0]);
  useMotionValueEvent(bg_img_opac, "change", (latest) => {
    setvalue_1(latest);
  });
  useMotionValueEvent(middle_opac, "change", (latest) => {
    setvalue_2(latest);
  });
  useMotionValueEvent(end_opac, "change", (latest) => {
    setvalue_3(latest);
  });
  useMotionValueEvent(inner_middle_opac, "change", (latest) => {
    setvalue_inner_4(latest);
  });

  // GSAP for applying translations and opacity
  // THIS IS  FOR THE DESKTOP  AND THAT OF MOBILE AS WELL MOBILE
  useEffect(() => {
    gsap.to(first_ref.current, {
      width: `${value_1}%`,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(second_ref.current, {
      height: `${value_2}%`,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(third_ref.current, {
      width: `${value_3}%`,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(mobile_first_ref.current, {
      height: `${value_1}%`,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(mobile_second_ref.current, {
      width: `${value_2}%`,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(mobile_third_ref.current, {
      height: `${value_3}%`,
      duration: 0.4, // Adjust duration as needed
    });

    gsap.to(right_first_text.current, {
      yPercent: value_3,
      opacity: (100 - value_3) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(right_second_text.current, {
      yPercent: value_3,
      opacity: (100 - value_3) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(right_three_text.current, {
      yPercent: value_inner_4,
      opacity: (100 - value_3) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(middle_first_text.current, {
      yPercent: value_2 * 2,
      opacity: (100 - value_2) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(left_first_text.current, {
      yPercent: value_1,
      opacity: (100 - value_1) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(left_second_text.current, {
      yPercent: value_1 * 3,
      opacity: (100 - value_1) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    //  THIS IS FOR THE MOBILE
    gsap.to(mobile_up_text.current, {
      yPercent: value_1 * 3,
      opacity: (100 - value_1) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    gsap.to(mobile_down_text.current, {
      yPercent: value_inner_4,
      opacity: (100 - value_3) / 100,
      duration: 0.4, // Adjust duration as needed
    });
    console.log(value_inner_4);
  }, [value_1, value_2, value_3, value_inner_4]);

  const [record_Name, setrecord_Name] = useState("");
  const [edit_text, setedit_text] = useState(false);

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

  return (
    <>
      {edit_text && (
        <Modal_text_edit
          edit_text={edit_text}
          record_Name={record_Name}
          setedit_text={setedit_text}
          table={"approach"}
        />
      )}
      <div className="relative mx-auto  w-fit ">
        {isloggedin && (
          <Edit_text
            record={"heading"}
            setedit_text={setedit_text}
            setrecord_Name={setrecord_Name}
            text={active_user_data[0].heading}
          />
        )}
        <h2
          className={`uppercase  md:text-[4vw] text-[7vw]  leading-[8.5vw] md:leading-[4.5vw] md:pt-0 pt-[10vw] md:px-0 px-[3%] text-center ${spline_font.className} font-medium text-[#5C3C43]`}
          dangerouslySetInnerHTML={{ __html: active_user_data[0].heading }}
        >
          {/* {active_user_data[0].heading} */}
        </h2>{" "}
      </div>
      <div
        ref={first_text_ref}
        className={` overflow-hidden w-full  md:mb-[-20vh] md:px-[10vw] ${Helvetica_medium.className} md:text-[1.1vw] text-[4vw] flex-col md:flex-row gap-[5vw] px-[3%] py-[8vw]  md:pb-0 md:pt-[4vw] text-[#000000] flex md:gap-[10%] `}
      >
        <div className="overflow-hidden  w-full relative">
          {isloggedin && (
            <Edit_text
              record={"caption_one"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].caption_one}
            />
          )}

          <p
            // className={`${start_frist_text ? "" : "translate-y-[100%]"}`}
            style={{ transition: "0.8s ease" }}
          >
            {active_user_data[0].caption_one}
          </p>
        </div>

        <div className="overflow-hidden w-full  relative">
          {isloggedin && (
            <Edit_text
              record={"caption_two"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].caption_two}
            />
          )}
          <p
            // className={`${start_frist_text ? "" : "translate-y-[100%]"}`}
            style={{ transition: "0.8s ease" }}
          >
            {active_user_data[0].caption_two}
          </p>
        </div>

        {/* DOWNLOAD CV */}
        <div
          className={` ${Helvetica_light.className} ${
            start_frist_text ? "" : "translate-y-[100%]"
          } uppercase overflow-hidden  md:p-[0.5vw] p-[2vw] rounded-[8vw] w-fit group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%] md:hidden  md:rounded-[2vw] bg-[black] backdrop-blur-2xl bg-opacity-[20%] `}
        >
          {" "}
          {isloggedin && (
            <Edit_text
              record={"cv"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].cv}
            />
          )}
          <Link
            style={{
              whiteSpace: "nowrap",
              transition: "0.8s ease",
              opacity: start_frist_text ? 1 : 0,
            }}
            target="_blank"
            href={active_user_data[0].cv}
          >
            <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] rounded-[7vw] flex justify-center items-center   py-[2.5vw] px-[8vw] md:py-[0.7vw] md:px-[1.5vw]">
              <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white text-[3.5vw] relative">
                View CV
              </p>
            </div>
          </Link>
        </div>
      </div>
      {/* <p
        className={`text-[4.5vw] mb-[7vw] mt-[4vw] md:hidden uppercase text-[#000000] text-center`}
      >
        Education
      </p>{" "} */}
      <div className="z-[10]  md:hidden flex flex-col items-center">
        <h3
          className={`text-[12vw] relative text-[#5C3C43] ${spline_font.className}  font-medium`}
        >
          {isloggedin && (
            <Edit_text
              record={"first_university"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].first_university}
            />
          )}
          {active_user_data[0].first_university}
        </h3>
        <p className={`text-[4vw] relative text-[#000000]`}>
          {isloggedin && (
            <Edit_text
              record={"first_school_type"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].first_school_type}
            />
          )}
          {active_user_data[0].first_school_type}
        </p>
      </div>
      <div
        ref={ref}
        className="w-full h-[300vh]  flex relative flex-col items-start "
      >
        <div className="w-full hidden   flex-col h-[100vh] md:flex justify-center items-center sticky top-0 left-0 ">
          {/* <p className={`md:text-[1vw] uppercase text-[#000000] text-center`}>
            Education
          </p> */}

          <div
            ref={left_first_text}
            className=" w-full relative md:mb-[3vw] md:px-[5vw] z-[10] flex justify-between items-center"
          >
            <div className="z-[10]">
              <h3
                className={`md:text-[4vw] relative text-[#5C3C43] ${spline_font.className}  font-medium`}
              >
                {isloggedin && (
                  <Edit_text
                    record={"first_university"}
                    setedit_text={setedit_text}
                    setrecord_Name={setrecord_Name}
                    text={active_user_data[0].first_university}
                  />
                )}
                {isloggedin && (
                  <Edit_text
                    record={"first_school_type"}
                    setedit_text={setedit_text}
                    setrecord_Name={setrecord_Name}
                    text={active_user_data[0].first_school_type}
                  />
                )}
                {active_user_data[0].first_university}
              </h3>
              <p className={`md:text-[1vw] text-[#000000] relative`}>
                {isloggedin && (
                  <Edit_text
                    record={"first_school_type"}
                    setedit_text={setedit_text}
                    setrecord_Name={setrecord_Name}
                    text={active_user_data[0].first_school_type}
                  />
                )}
                {active_user_data[0].first_school_type}
              </p>
            </div>
            {/* DOWNLOAD CV */}
            <div
              className={` ${Helvetica_light.className}  absolute top-[1vw] left-[50%] translate-x-[-50%] uppercase overflow-hidden  md:p-[0.5vw] p-[2vw] rounded-[8vw] w-fit group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[black] backdrop-blur-2xl bg-opacity-[20%] `}
              ref={right_second_text}
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {" "}
              {isloggedin && (
                <Edit_text
                  record={"cv"}
                  setedit_text={setedit_text}
                  setrecord_Name={setrecord_Name}
                  text={active_user_data[0].cv}
                />
              )}
              <Link href={active_user_data[0].cv} target="_blank">
                <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] rounded-[7vw] flex justify-center items-center   py-[2.5vw] px-[8vw] md:py-[0.7vw] md:px-[1.5vw]">
                  <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white text-[3.5vw] ">
                    View CV
                  </p>
                </div>
              </Link>
            </div>
            <div ref={right_first_text} className="z-[10]">
              <h3
                className={`md:text-[4vw] text-[#5C3C43] relative md:text-end ${spline_font.className}  font-medium`}
              >
                {isloggedin && (
                  <Edit_text
                    record={"second_university"}
                    setedit_text={setedit_text}
                    setrecord_Name={setrecord_Name}
                    text={active_user_data[0].second_university}
                  />
                )}
                {active_user_data[0].second_university}
              </h3>
              <p
                className={`md:text-[1vw] relative text-[#000000] md:text-end`}
              >
                {isloggedin && (
                  <Edit_text
                    record={"second_school_type"}
                    setedit_text={setedit_text}
                    setrecord_Name={setrecord_Name}
                    text={active_user_data[0].second_school_type}
                  />
                )}
                {active_user_data[0].second_school_type}
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1238 195"
            preserveAspectRatio="xMinYMin meet"
            fill="none"
            className="md:w-[90%] w-full h-auto md:rotate-0 rotate-[90deg] md:h-auto "
          >
            <path
              d="M0.294492 7.14087C-0.0969131 7.53051 -0.0983434 8.16367 0.291298 8.55508L6.64087 14.9334C7.03051 15.3248 7.66367 15.3262 8.05508 14.9366C8.44648 14.547 8.44791 13.9138 8.05827 13.5224L2.41421 7.85277L8.08383 2.2087C8.47523 1.81906 8.47666 1.1859 8.08702 0.794494C7.69738 0.403089 7.06422 0.401659 6.67281 0.791299L0.294492 7.14087ZM1237.7 8.56773C1238.09 8.18341 1238.1 7.55032 1237.72 7.15369L1231.46 0.690238C1231.07 0.293607 1230.44 0.28363 1230.04 0.667952C1229.64 1.05227 1229.63 1.68536 1230.02 2.08199L1235.59 7.82728L1229.84 13.3943C1229.44 13.7786 1229.43 14.4117 1229.82 14.8083C1230.2 15.205 1230.84 15.2149 1231.23 14.8306L1237.7 8.56773ZM624.883 60.6518L625.69 60.0624L624.883 60.6518ZM590.274 110.219L589.293 110.027L590.274 110.219ZM609.447 64.249L608.62 63.6868L609.447 64.249ZM588.039 138.846L587.04 138.901L588.039 138.846ZM589.883 112.217L590.865 112.409L589.883 112.217ZM589.544 166.245L590.543 166.19L589.544 166.245ZM640.098 184.727L640.826 185.413L640.098 184.727ZM648.491 165.601L647.492 165.547L648.491 165.601ZM640.436 184.369L639.708 183.683L640.436 184.369ZM650.127 135.831L651.126 135.886L650.127 135.831ZM1 7.84957C0.997741 8.84957 0.999676 8.84957 1.00354 8.84958C1.00741 8.84959 1.0132 8.8496 1.02092 8.84962C1.03635 8.84966 1.05948 8.84971 1.09023 8.84978C1.15174 8.84992 1.24377 8.85013 1.36585 8.85041C1.61001 8.85096 1.97439 8.8518 2.45521 8.85291C3.41687 8.85513 4.84434 8.85846 6.70761 8.86287C10.4341 8.87169 15.9038 8.88485 22.8764 8.90221C36.8215 8.93694 56.7783 8.98846 80.8245 9.05567C128.917 9.19008 193.368 9.38722 258.8 9.63812C389.692 10.14 524.441 10.8572 540.117 11.7156L540.227 9.71855C524.484 8.85646 389.647 8.13985 258.808 7.63814C193.374 7.38723 128.923 7.19009 80.8301 7.05568C56.7836 6.98847 36.8267 6.93694 22.8814 6.90222C15.9087 6.88486 10.4389 6.8717 6.71234 6.86287C4.84904 6.85846 3.42153 6.85514 2.45984 6.85292C1.97899 6.8518 1.6146 6.85097 1.37042 6.85041C1.24833 6.85013 1.15629 6.84992 1.09477 6.84978C1.06402 6.84971 1.04089 6.84966 1.02545 6.84963C1.01773 6.84961 1.01193 6.8496 1.00807 6.84959C1.0042 6.84958 1.00226 6.84957 1 7.84957ZM540.117 11.7156C547.799 12.1362 556.473 14.8434 565.207 18.7192C573.929 22.5898 582.649 27.5978 590.408 32.5637C598.165 37.528 604.945 42.4402 609.787 46.1119C612.207 47.9473 614.142 49.4718 615.471 50.5366C616.135 51.069 616.648 51.4864 616.994 51.7701C617.167 51.912 617.298 52.0205 617.386 52.0933C617.43 52.1297 617.462 52.1571 617.484 52.1753C617.495 52.1844 617.503 52.1912 617.509 52.1957C617.511 52.1979 617.513 52.1996 617.515 52.2006C617.515 52.2012 617.516 52.2015 617.516 52.2018C617.516 52.202 617.516 52.202 618.158 51.4353C618.8 50.6687 618.8 50.6684 618.8 50.668C618.799 50.6677 618.799 50.6672 618.798 50.6665C618.796 50.6652 618.794 50.6633 618.791 50.6608C618.785 50.6558 618.776 50.6485 618.765 50.6388C618.742 50.6196 618.707 50.591 618.662 50.5536C618.572 50.4786 618.438 50.3679 618.262 50.2238C617.91 49.9355 617.392 49.5133 616.721 48.976C615.381 47.9014 613.432 46.3657 610.996 44.5183C606.124 40.824 599.299 35.8793 591.486 30.8791C583.676 25.8804 574.863 20.8164 566.018 16.8911C557.184 12.9709 548.255 10.1582 540.227 9.71855L540.117 11.7156ZM649.129 135.776L647.492 165.547L649.489 165.656L651.126 135.886L649.129 135.776ZM639.708 183.683L639.37 184.041L640.826 185.413L641.164 185.055L639.708 183.683ZM590.543 166.19L589.037 138.791L587.04 138.901L588.546 166.3L590.543 166.19ZM618.158 51.4353C618.78 52.2188 618.78 52.2187 618.78 52.2186C618.78 52.2184 618.781 52.2181 618.781 52.2177C618.782 52.217 618.784 52.2157 618.786 52.214C618.79 52.2106 618.797 52.2055 618.805 52.1985C618.823 52.1846 618.85 52.1636 618.885 52.1357C618.956 52.0799 619.063 51.9965 619.203 51.887C619.485 51.6679 619.904 51.3443 620.45 50.928C621.542 50.0956 623.145 48.8927 625.18 47.4146C629.253 44.4581 635.056 40.402 641.978 36.0066C655.836 27.207 674.121 17.0833 691.947 11.674L691.366 9.76015C673.284 15.2472 654.82 25.4827 640.906 34.3182C633.942 38.7402 628.104 42.8206 624.005 45.7962C621.956 47.2842 620.341 48.4963 619.238 49.3373C618.686 49.7578 618.262 50.0855 617.975 50.3086C617.832 50.4201 617.723 50.5055 617.649 50.5632C617.613 50.5921 617.585 50.614 617.566 50.6289C617.557 50.6363 617.549 50.6419 617.545 50.6458C617.542 50.6477 617.54 50.6492 617.539 50.6502C617.538 50.6507 617.538 50.6512 617.538 50.6514C617.537 50.6517 617.537 50.6519 618.158 51.4353ZM691.947 11.674C694.082 11.0259 698.082 10.4251 703.792 9.88473C709.474 9.34707 716.77 8.87555 725.446 8.46425C742.796 7.64173 765.629 7.06171 792.029 6.67197C844.829 5.89252 911.867 5.87455 977.789 6.19714C1043.71 6.51971 1108.51 7.18279 1156.83 7.76523C1180.99 8.05645 1201.03 8.32751 1215.03 8.52576C1222.03 8.62488 1227.52 8.70581 1231.26 8.76195C1233.12 8.79002 1234.56 8.8119 1235.52 8.82675C1236 8.83418 1236.37 8.83985 1236.61 8.84367C1236.74 8.84558 1236.83 8.84702 1236.89 8.84799C1236.92 8.84847 1236.95 8.84884 1236.96 8.84908C1236.97 8.8492 1236.97 8.84929 1236.98 8.84936C1236.98 8.84942 1236.98 8.84945 1237 7.84957C1237.02 6.84969 1237.01 6.84966 1237.01 6.8496C1237.01 6.84954 1237 6.84945 1236.99 6.84933C1236.98 6.84908 1236.95 6.84872 1236.92 6.84824C1236.86 6.84727 1236.77 6.84582 1236.65 6.84391C1236.4 6.8401 1236.04 6.83442 1235.55 6.82699C1234.59 6.81213 1233.16 6.79025 1231.29 6.76217C1227.54 6.70603 1222.05 6.62509 1215.05 6.52596C1201.05 6.32769 1181.01 6.05661 1156.85 5.76538C1108.53 5.1829 1043.73 4.51977 977.798 4.19716C911.873 3.87456 844.819 3.89244 792 4.67218C765.591 5.06204 742.734 5.64245 725.351 6.46649C716.661 6.87848 709.33 7.35177 703.604 7.89362C697.907 8.43277 693.719 9.04619 691.366 9.76015L691.947 11.674ZM590.865 112.409L591.255 110.411L589.293 110.027L588.902 112.025L590.865 112.409ZM610.274 64.8112L618.985 51.9976L617.331 50.8731L608.62 63.6868L610.274 64.8112ZM617.351 52.0247L624.075 61.2412L625.69 60.0624L618.966 50.846L617.351 52.0247ZM624.075 61.2412C635.819 77.3387 643.889 95.8168 647.715 115.372L649.678 114.988C645.796 95.1456 637.607 76.3963 625.69 60.0624L624.075 61.2412ZM591.255 110.411C594.45 94.0828 600.92 78.5708 610.274 64.8112L608.62 63.6868C599.114 77.6697 592.539 93.4336 589.293 110.027L591.255 110.411ZM589.037 138.791C588.551 129.955 589.165 121.093 590.865 112.409L588.902 112.025C587.171 120.872 586.545 129.9 587.04 138.901L589.037 138.791ZM597.65 183.436C593.399 178.656 590.894 172.577 590.543 166.19L588.546 166.3C588.922 173.138 591.604 179.647 596.156 184.765L597.65 183.436ZM639.37 184.041C627.981 196.123 608.684 195.843 597.65 183.436L596.156 184.765C607.97 198.049 628.631 198.349 640.826 185.413L639.37 184.041ZM647.492 165.547C647.12 172.321 644.363 178.746 639.708 183.683L641.164 185.055C646.142 179.774 649.091 172.903 649.489 165.656L647.492 165.547ZM651.126 135.886C651.51 128.887 651.024 121.867 649.678 114.988L647.715 115.372C649.029 122.089 649.504 128.942 649.129 135.776L651.126 135.886Z"
              fill="#4F0A19"
            />

            {/* Use foreignObject to include a div inside the SVG */}
            <foreignObject x="0" y="0" width="100%" height="100%">
              <div
                className="h-full  flex relative "
                // style={{ width: `${100}%`, transition: "6s ease" }}
              >
                <p
                  ref={left_second_text}
                  className={`border-[#000000] md:px-[1vw] border md:rounded-[2vw] md:text-[1vw] absolute   left-[2.5vw] z-[10] bg-[#DFE4DF]`}
                >
                  {isloggedin && (
                    <Edit_text
                      record={"first_school_position"}
                      setedit_text={setedit_text}
                      setrecord_Name={setrecord_Name}
                      text={active_user_data[0].first_school_position}
                    />
                  )}
                  {active_user_data[0].first_school_position}
                </p>
                <p
                  ref={middle_first_text}
                  className={`border-[#000000] md:px-[1vw] border md:rounded-[2vw] md:text-[1vw] absolute bottom-[3vw] left-[50%] z-[10] translate-x-[-50%] bg-[#DFE4DF]`}
                >
                  {isloggedin && (
                    <Edit_text
                      record={"bit_about_erica"}
                      setedit_text={setedit_text}
                      setrecord_Name={setrecord_Name}
                      text={active_user_data[0].bit_about_erica}
                    />
                  )}
                  {active_user_data[0].bit_about_erica}
                </p>
                <p
                  ref={right_three_text}
                  className={`border-[#000000] md:px-[1vw] border md:rounded-[2vw] md:text-[1vw] absolute   right-[2.5vw] z-[10] bg-[#DFE4DF]`}
                >
                  {isloggedin && (
                    <Edit_text
                      record={"second_school_position"}
                      setedit_text={setedit_text}
                      setrecord_Name={setrecord_Name}
                      text={active_user_data[0].second_school_position}
                    />
                  )}
                  {active_user_data[0].second_school_position}
                </p>
                <div
                  className="w-[45%]  relative flex justify-end  overflow-hidden"
                  // style={{ width: `${width}%`, transition: "6s ease" }}
                >
                  <div
                    ref={first_ref}
                    className="bg-[#DFE4DF] w-full  h-full"
                    style={
                      {
                        // width: `${value_1}% `,
                        // transition: "6s ease",
                      }
                    }
                  ></div>
                </div>
                <div className="w-[15%]  ">
                  <div
                    ref={second_ref}
                    className=" w-full rounded-b-[9px]  h-full   bg-[#DFE4DF]"
                    style={
                      {
                        // height: `${value_2}% `,
                        // transition: "6s ease",
                      }
                    }
                  ></div>
                </div>
                <div className="w-[45%] relative flex justify-end  ">
                  <div
                    ref={third_ref}
                    className="bg-[#DFE4DF]  w-full h-full"
                    style={
                      {
                        // width: `${value_3}% `,
                        // transition: "6s ease",
                      }
                    }
                  ></div>
                </div>
              </div>
            </foreignObject>
          </svg>
          {/* {value_1} */}
        </div>

        {/* THIS IS FOR MOBILE */}
        <div className="w-full md:hidden  h-[100vh] flex justify-center items-center sticky top-0 left-0 ">
          <div className="h-full w-full  flex flex-col py-[20vh]  items-center justify-between absolute top-0 left-0">
            <p
              ref={mobile_up_text}
              className={`border-[#000000] relative z-[10] w-fit px-[3vw] border py-[1vw] rounded-[4vw] text-[4vw]  bg-[#DFE4DF]`}
            >
              {isloggedin && (
                <Edit_text
                  record={"first_school_position"}
                  setedit_text={setedit_text}
                  setrecord_Name={setrecord_Name}
                  text={active_user_data[0].first_school_position}
                />
              )}
              {active_user_data[0].first_school_position}
            </p>
            <p
              ref={mobile_down_text}
              className={`border-[#000000] z-[10] relative w-fit px-[3vw] border py-[1vw] rounded-[4vw] text-[4vw]  bg-[#DFE4DF]`}
            >
              {isloggedin && (
                <Edit_text
                  record={"second_school_position"}
                  setedit_text={setedit_text}
                  setrecord_Name={setrecord_Name}
                  text={active_user_data[0].second_school_position}
                />
              )}
              {active_user_data[0].second_school_position}{" "}
            </p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 79 651"
            preserveAspectRatio="xMinYMin meet"
            fill="none"
            className="w-auto h-[80vh] absolute top-[50%] left-[50%] translate-x-[-18%] translate-y-[-50%] "
          >
            <path
              d="M7.33055 650.706C7.72046 651.097 8.35362 651.098 8.74476 650.708L15.1187 644.354C15.5098 643.964 15.5108 643.331 15.1209 642.94C14.731 642.549 14.0978 642.548 13.7067 642.938L8.04098 648.586L2.393 642.92C2.00309 642.529 1.36993 642.528 0.97879 642.918C0.587654 643.308 0.586661 643.941 0.976572 644.332L7.33055 650.706ZM8.75353 0.300659C8.3673 -0.0941163 7.73418 -0.101074 7.3394 0.285156L0.906197 6.57916C0.511423 6.96539 0.504496 7.59851 0.890724 7.99329C1.27695 8.38806 1.91008 8.39496 2.30485 8.00873L8.02326 2.41412L13.6179 8.13251C14.0041 8.52728 14.6372 8.53424 15.032 8.14801C15.4268 7.76178 15.4337 7.12866 15.0475 6.73389L8.75353 0.300659ZM28.7596 320.863L28.0351 320.174L28.7596 320.863ZM44.8717 340.447L44.6005 341.41L44.8717 340.447ZM29.8702 331.762L29.1705 332.476L29.8702 331.762ZM45.7063 340.682L45.4351 341.645L45.7063 340.682ZM73.9881 316.42L73.1829 317.013L73.9881 316.42ZM62.2344 309.753L62.1555 310.75L62.2344 309.753ZM73.8247 316.198L74.6299 315.605L73.8247 316.198ZM55.2035 309.196L55.1246 310.193L55.2035 309.196ZM8.03876 650C9.03876 650.002 9.03876 650.001 9.03876 649.999C9.03877 649.996 9.03877 649.993 9.03878 649.989C9.03879 649.981 9.03881 649.969 9.03884 649.953C9.03889 649.921 9.03896 649.872 9.03906 649.808C9.03927 649.68 9.03957 649.489 9.03998 649.236C9.04079 648.731 9.042 647.982 9.04361 647.003C9.04682 645.047 9.05162 642.175 9.05795 638.514C9.07061 631.191 9.08939 620.712 9.11389 608.086C9.16288 582.834 9.23475 548.992 9.32621 514.635C9.50918 445.901 9.77062 375.154 10.0833 366.929L8.08476 366.853C7.77028 375.125 7.50909 445.933 7.32621 514.629C7.23475 548.987 7.16289 582.83 7.11389 608.082C7.08939 620.709 7.07061 631.188 7.05795 638.51C7.05162 642.171 7.04683 645.043 7.04361 647C7.042 647.979 7.04079 648.728 7.03998 649.233C7.03957 649.486 7.03927 649.677 7.03907 649.805C7.03897 649.869 7.03889 649.918 7.03884 649.95C7.03881 649.966 7.03879 649.978 7.03878 649.986C7.03877 649.99 7.03877 649.993 7.03877 649.995C7.03876 649.997 7.03876 649.998 8.03876 650ZM10.0833 366.929C10.3891 358.886 14.0277 348.799 17.6546 340.636C19.4597 336.573 21.246 333.022 22.581 330.486C23.2483 329.219 23.8023 328.206 24.1889 327.511C24.3822 327.164 24.5336 326.896 24.6363 326.715C24.6877 326.625 24.7269 326.557 24.7531 326.511C24.7662 326.489 24.776 326.472 24.7825 326.46C24.7857 326.455 24.7881 326.451 24.7896 326.448C24.7904 326.447 24.791 326.446 24.7913 326.445C24.7915 326.445 24.7916 326.445 24.7916 326.445C24.7917 326.444 24.7917 326.445 23.9272 325.942C23.0627 325.439 23.0625 325.44 23.0624 325.44C23.0622 325.44 23.062 325.44 23.0617 325.441C23.0612 325.442 23.0605 325.443 23.0595 325.445C23.0576 325.448 23.0549 325.453 23.0513 325.459C23.0441 325.471 23.0335 325.49 23.0197 325.514C22.992 325.562 22.9513 325.633 22.8984 325.726C22.7925 325.912 22.6379 326.185 22.4413 326.539C22.048 327.245 21.4865 328.272 20.8113 329.554C19.4612 332.119 17.6543 335.711 15.8269 339.824C12.1891 348.011 8.40615 358.399 8.08476 366.853L10.0833 366.929ZM55.1246 310.193L62.1555 310.75L62.3133 308.756L55.2824 308.199L55.1246 310.193ZM73.0195 316.791L73.1829 317.013L74.7933 315.827L74.6299 315.605L73.0195 316.791ZM62.5829 340.216L56.1914 340.722L56.3492 342.716L62.7408 342.21L62.5829 340.216ZM23.9272 325.942C24.8031 325.459 24.8031 325.46 24.8031 325.459C24.803 325.459 24.803 325.459 24.8028 325.459C24.8026 325.459 24.8022 325.458 24.8016 325.457C24.8004 325.455 24.7986 325.451 24.7961 325.447C24.7912 325.438 24.7837 325.424 24.7737 325.406C24.7537 325.369 24.7235 325.314 24.6839 325.24C24.6047 325.094 24.4873 324.875 24.3362 324.589C24.034 324.018 23.5969 323.179 23.0595 322.113C21.9845 319.98 20.5091 316.94 18.9102 313.313C15.7082 306.049 12.0281 296.473 10.0626 287.143L8.10551 287.556C10.1121 297.08 13.8535 306.8 17.0801 314.119C18.6954 317.784 20.1861 320.856 21.2735 323.013C21.8173 324.092 22.2605 324.943 22.5684 325.525C22.7223 325.816 22.8424 326.039 22.9243 326.191C22.9653 326.267 22.9967 326.325 23.018 326.364C23.0287 326.383 23.0368 326.398 23.0424 326.408C23.0452 326.413 23.0473 326.417 23.0488 326.42C23.0495 326.421 23.0501 326.422 23.0505 326.423C23.0507 326.423 23.0509 326.424 23.051 326.424C23.0511 326.424 23.0512 326.424 23.9272 325.942ZM10.0626 287.143C9.58843 284.893 9.1995 278.756 8.89815 269.599C8.5984 260.492 8.38699 248.505 8.24492 234.643C7.9608 206.921 7.95425 171.722 8.07184 137.108C8.18942 102.495 8.43113 68.4704 8.64345 43.0991C8.74961 30.4135 8.84841 19.8913 8.92068 12.5406C8.95681 8.86523 8.98631 5.98273 9.00678 4.0191C9.01701 3.03729 9.02498 2.28522 9.0304 1.77863C9.03311 1.52527 9.03518 1.33337 9.03657 1.20477C9.03726 1.14044 9.03779 1.09198 9.03814 1.05957C9.03832 1.0434 9.03845 1.03125 9.03854 1.02313C9.03858 1.01904 9.03862 1.01599 9.03864 1.01398C9.03866 1.01196 9.03867 1.01093 8.03873 1C7.03879 0.989014 7.03878 0.990051 7.03876 0.992126C7.03874 0.994141 7.0387 0.997192 7.03866 1.00128C7.03857 1.00946 7.03844 1.02161 7.03826 1.03784C7.03791 1.07025 7.03738 1.11877 7.03668 1.18311C7.03529 1.31183 7.03322 1.50385 7.03051 1.7572C7.0251 2.26404 7.01712 3.0163 7.00689 3.99829C6.98642 5.96222 6.95692 8.84515 6.92078 12.5209C6.8485 19.8725 6.74968 30.3956 6.64352 43.0823C6.43119 68.4556 6.18945 102.483 6.07185 137.101C5.95425 171.718 5.96077 206.928 6.24503 234.663C6.38715 248.531 6.59875 260.535 6.89923 269.665C7.19811 278.746 7.58662 285.093 8.10551 287.556L10.0626 287.143ZM45.9776 339.72L45.143 339.485L44.6005 341.41L45.4351 341.645L45.9776 339.72ZM30.5698 331.047L24.6268 325.227L23.2275 326.656L29.1705 332.476L30.5698 331.047ZM24.6516 326.631L29.484 321.553L28.0351 320.174L23.2027 325.253L24.6516 326.631ZM29.484 321.553C34.2708 316.522 40.324 312.874 47.0076 310.99L46.4651 309.065C39.4357 311.046 33.0695 314.883 28.0351 320.174L29.484 321.553ZM45.143 339.485C39.6549 337.938 34.6437 335.036 30.5698 331.047L29.1705 332.476C33.4839 336.7 38.7897 339.772 44.6005 341.41L45.143 339.485ZM56.1914 340.722C52.7543 340.995 49.2962 340.655 45.9776 339.72L45.4351 341.645C48.9812 342.644 52.6764 343.007 56.3492 342.716L56.1914 340.722ZM72.9355 334.648C70.4178 337.873 66.6618 339.893 62.5829 340.216L62.7408 342.21C67.3786 341.843 71.6494 339.546 74.5121 335.878L72.9355 334.648ZM73.1829 317.013C77.063 322.282 76.962 329.49 72.9355 334.648L74.5121 335.878C79.0903 330.014 79.2052 321.818 74.7933 315.827L73.1829 317.013ZM62.1555 310.75C66.4818 311.092 70.4461 313.297 73.0195 316.791L74.6299 315.605C71.7124 311.644 67.2181 309.144 62.3133 308.756L62.1555 310.75ZM55.2824 308.199C52.3152 307.964 49.3299 308.258 46.4651 309.065L47.0076 310.99C49.6449 310.247 52.3931 309.977 55.1246 310.193L55.2824 308.199Z"
              fill="#4F0A19"
            />

            {/* Use foreignObject to include a div inside the SVG */}
            <foreignObject x="0" y="0" width="100%" height="100%">
              <div
                className="h-full flex flex-col"
                // style={{ width: `${100}%`, transition: "6s ease" }}
              >
                <div
                  className="h-[45%] flex items-end  overflow-hidden"
                  // style={{ width: `${width}%`, transition: "6s ease" }}
                >
                  <div
                    ref={mobile_first_ref}
                    className="bg-[#DFE4DF]  w-full"
                    // style={{
                    //   height: `${value_1}% `,
                    //   // transition: "6s ease",
                    // }}
                  ></div>
                </div>
                <div className="h-[15%]  ">
                  <div
                    ref={mobile_second_ref}
                    className=" h-full   bg-[#DFE4DF]"
                    // style={{
                    //   width: `${value_2}% `,
                    //   // transition: "6s ease",
                    // }}
                  ></div>
                </div>
                <div className="h-[45%] flex items-end   ">
                  <div
                    ref={mobile_third_ref}
                    className="bg-[#DFE4DF]  w-full"
                    // style={{
                    //   height: `${value_3}% `,
                    //   // transition: "6s ease",
                    // }}
                  ></div>
                </div>
              </div>
            </foreignObject>
          </svg>
          {/* {value_2} */}
        </div>
      </div>{" "}
      <div className="z-[10]  md:hidden flex flex-col items-center">
        <h3
          className={`text-[12vw] relative text-[#5C3C43] ${spline_font.className}  font-medium`}
        >
          {isloggedin && (
            <Edit_text
              record={"second_university"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].second_university}
            />
          )}
          {active_user_data[0].second_university}
        </h3>
        <p className={`text-[4vw] text-[#000000] relative`}>
          {isloggedin && (
            <Edit_text
              record={"second_school_type"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].second_school_type}
            />
          )}
          {active_user_data[0].second_school_type}
        </p>
      </div>
      {/* A BIT ABOUT ERICA */}
      <div className="flex justify-center md:hidden mt-[15vw] mb-[2.5vw]">
        <p
          // ref={right_second_text}
          className={`border-[#000000] relative z-[10] w-fit px-[3vw] border py-[1vw] rounded-[4vw] text-[4vw]  bg-[#DFE4DF]`}
        >
          {isloggedin && (
            <Edit_text
              record={"bit_about_erica"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].bit_about_erica}
            />
          )}
          {active_user_data[0].bit_about_erica}
        </p>
      </div>
      <div
        ref={second_text_ref}
        className={`  w-full md:px-[10vw]  md:mt-[-20vh]  ${Helvetica_medium.className} md:text-[1.1vw] text-[4vw] flex-col md:flex-row gap-[5vw]  px-[3%] py-[8vw]  md:pb-0 md:pt-[2vw] text-[#000000] flex md:gap-[10%] `}
      >
        <div className="overflow-hidden relative w-full ">
          {isloggedin && (
            <Edit_text
              record={"caption_three"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].caption_three}
            />
          )}
          <p
            // className={`${start_second_text ? "" : "translate-y-[100%]"}`}
            style={{ transition: "0.8s ease" }}
          >
            {active_user_data[0].caption_three}
          </p>
        </div>

        <div className="overflow-hidden w-full relative">
          {isloggedin && (
            <Edit_text
              record={"caption_four"}
              setedit_text={setedit_text}
              setrecord_Name={setrecord_Name}
              text={active_user_data[0].caption_four}
            />
          )}
          <p
            // className={`${start_second_text ? "" : "translate-y-[100%]"}`}
            style={{ transition: "0.8s ease" }}
          >
            {active_user_data[0].caption_four}
          </p>
        </div>
      </div>
    </>
  );
};

export default AnimatedLines;
