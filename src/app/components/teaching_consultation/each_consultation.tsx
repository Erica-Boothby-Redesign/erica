"use client";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bricolage_grotesk_bold,
  Bt_Beau_Regualr,
  Helvetica_light,
  spline_font,
} from "@/app/utils/fonts";
import example from "../../../../public/images/consultation/example.png";
import example2 from "../../../../public/images/consultation/example2.png";
import example3 from "../../../../public/images/consultation/example3.png";
import arrow from "../../../../public/images/consultation/arrow.png";
import Edit_each_consulation from "./edit_consulation";
import Delete_consultation from "./delete_consultation";
import Add_consultation from "./add_consultation";
import Modal_edit_consulation from "./modal_edit_add_consultation";
import { useColor } from "react-color-palette";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { supabase } from "@/app/utils/supabaseClient";
import Read_more from "./read_more_modal";
import Contact_form from "../general-component/contact_form";
import Order_consultation_modal from "./order_consultation_modal";
const Each_consultation = ({ product_data }: any) => {
  const sectionRef = useRef(null);

  const itemsRefs = useRef<any>([]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // offset: ["end start", "end 50%"],
  });
  const width = globalThis.innerWidth;
  useEffect(() => {
    setcalwidth(width);
  }, [width]);
  const handleResize = () => {
    setcalwidth(globalThis.innerWidth);
  };

  // useEffect(() => {
  //   gsap.to(image_ref.current, {
  //     xPercent: calWidth < 768 ? "" : yvalue >= 50 ? -50 : yvalue,
  //     duration: 0.5, // Adjust duration as needed
  //   });

  // }, [yvalue, opac_one_img, opac_two_img, calWidth, start_anime]);

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
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial call to set the width on component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const [data, setdata] = useState<any>(product_data ? product_data : []);

  const [calwidth, setcalwidth] = useState(0);
  const [yvalue, setyvalue] = useState(1);
  const [height, setheight] = useState(1);
  const [isloggedin, setisloggedin] = useState(false);
  const [delete_consulation, setdelete_consulation] = useState(false);
  const [consultation_title, setconsultation_title] = useState("");
  const [consultation_body, setconsultation_body] = useState("");
  const [consultation_institute, setconsultation_institute] = useState("");
  const [consultation_year, setconsultation_year] = useState("");
  const [consultation_image_link, setconsultation_image_link] = useState("");
  const [consulation_readmore_link, setconsulation_readmore_link] =
    useState("");
  const [consultation_bg_color, setconsultation_bg_color] = useColor("#000000");
  const [consultation_heading_text_color, setconsultation_heading_text_color] =
    useColor("#000000");
  const [add_consulation, setadd_consulation] = useState(false);

  // this is for using gsap
  useEffect(() => {
    itemsRefs.current.forEach((ref: any, index: any) => {
      gsap.to(ref, {
        yPercent:
          index + 1 - yvalue >= 0 && index + 1 - yvalue <= 1
            ? (index + 2 - yvalue) * 100 - 150 * (-index + yvalue)
            : index + 1 - yvalue <= 0
            ? -50
            : yvalue + 1 + index * 100,
        duration: 0.3, // Adjust duration as needed
      });
    });
  }, [yvalue]);

  // const data_array = [
  //   {
  //     bg: "#4CB163",
  //     institue: "Wharton University",
  //     year: "2023",
  //     heading: "NEGOTIATION COURSE",
  //     text: "#BFCFC5",
  //     img: example,
  //     link: "/",
  //     body: 'Erica teaches a course on Negotiations at The Wharton School at the University of Pennsylvania, for which she has received a Wharton Teaching Excellence award. Her course has received an average rating of 3.8/4.0 and consistently receives among the highest marks in "overall quality" across the entire Wharton School. Erica was named one of <a href="malkain.com"> Poets&Quants 50 Best Professors of 2023. </a>',
  //   },
  //   {
  //     bg: "#2F8F45",
  //     institue: "Wet Cement",
  //     heading: "Workshops",
  //     year: "2024",
  //     img: example2,
  //     link: "/",

  //     text: "#B2EECA",
  //     body: 'Erica works with <a href="malkain.com"> Wet Cement </a>, a purpose-driven company whose mission is to empower people, teams, and organizations to fearlessly achieve their potential, to co-design and <a href="malkain.com"> lead Wet Cements Win-Win Negotiations training </a>.  Wet Cement especially aims to empower women and other members of underrepresented groups at the negotiating table, so that they can more effectively advance their careers. ',
  //   },
  //   {
  //     bg: "#1A6E30",
  //     institue: "Behavioralize",
  //     heading: "BEHAVIORAL SCIENCE CONSULTING",
  //     year: "2023",
  //     img: example3,
  //     link: "/",

  //     text: "#8DCE9F",
  //     body: "Erica is a consultant with <a href='malkain.com'> Behavioralize </a> , a data-driven company that applies behavioral science to understand and influence customer and managerial decision making, helping companies drive growth by identifying and solving their key behavioral challenges",
  //   },
  // ];

  const [edit_ID, setedit_ID] = useState("");

  const y = useTransform(scrollYProgress, [0, 1], [1, data.length + 0.5]);
  const parent_height = useTransform(scrollYProgress, [0, 1], [1, 10]);

  useMotionValueEvent(y, "change", (latest) => {
    setyvalue(latest);
  });

  useMotionValueEvent(parent_height, "change", (latest) => {
    setheight(latest);
  });
  const [image_link, setimage_link] = useState("");
  const [image_bg_link, setimage_bg_link] = useState("");
  const edit_each_consulation_modal_param = (
    title: any,
    body: any,
    institue: any,
    year: any,
    read_more: any,
    normal_img: any,
    bg_color: any,
    text_color: any,
    id: any,
    bg_img: any,
  ) => {
    setconsultation_title(title);
    setconsultation_body(body);
    setconsultation_institute(institue);
    setconsultation_year(year);
    setconsulation_readmore_link(read_more);
    // setconsultation_image_link(normal_img);
    setconsultation_bg_color((prevstate) => ({
      ...prevstate,
      hex: bg_color.hex,
      rgb: bg_color.rgb,
      hsv: bg_color.hsv,
    }));
    setconsultation_heading_text_color((prevstate) => ({
      ...prevstate,
      hex: text_color.hex,
      rgb: text_color.rgb,
      hsv: text_color.hsv,
    }));
    setedit_ID(id);
    setimage_link(normal_img);
    setimage_bg_link(bg_img);
    // console.log(text_color, bg_color, image_link, normal_img);
    setadd_consulation(true);
  };

  const refresh_all_params = () => {
    setconsultation_title("");
    setconsultation_body("");
    setconsultation_institute("");
    setconsultation_year("");
    setconsultation_image_link("");
    setconsultation_bg_color((prevstate) => ({
      ...prevstate,
      hex: "#000000",
    }));
    setconsultation_heading_text_color((prevstate) => ({
      ...prevstate,
      hex: "#000000",
    }));
    setedit_ID("");
    setadd_consulation(true);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("consultation")
        .select("*")
        .order("order", { ascending: false });

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setdata(data);
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
      setdata((prevData: any) =>
        prevData.map((item: any) =>
          item.id === payload.new.id ? payload.new : item,
        ),
      );
    };

    const handleDeletes = (payload: any) => {
      console.log("Delete received!", payload);
      setdata((prevData: any) =>
        prevData.filter((item: any) => item.id !== payload.old.id),
      );
    };

    const subscription = supabase
      .channel("consultation_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "consultation" },
        handleInserts,
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "consultation" },
        handleUpdates,
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "consultation" },
        handleDeletes,
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // THIS IS FOR SPLITTING THE TEXT
  // THIS IS FOR SPLITTING THE TEXT
  // THIS IS FOR SPLITTING THE TEXT
  // THIS IS FOR SPLITTING THE TEXT

  const getCaption = (text: any, wordLimit: any) => {
    const words = text.split(" ").slice(0, wordLimit).join(" ");
    return words + (text.split(" ").length > wordLimit ? " . . . " : "");
  };

  // THIS FOR READMORE STATE
  const [read_more_body, setread_more_body] = useState("");
  const [read_more_title, setread_more_title] = useState("");
  const [open_read_more, setopen_read_more] = useState(false);
  const [open_contact_form, setopen_contact_form] = useState(false);
  const [open_order_consultation, setopen_order_consultation] = useState(false);

  return (
    <>
      {open_order_consultation && (
        <Order_consultation_modal
          setopen_order_consultation={setopen_order_consultation}
          data={data}
        />
      )}
      {/* buttons to add consultation */}
      {isloggedin && (
        <Add_consultation
          // refresh_all_params={refresh_all_params}
          setopen_order_consultation={setopen_order_consultation}
          setconsultation_title={setconsultation_title}
          setdelete_consulation={setdelete_consulation}
          refresh_all_params={refresh_all_params}
        />
      )}

      {/* buttons to delete consultation */}
      {delete_consulation && (
        <Delete_consultation
          setdelete_consulation={setdelete_consulation}
          title={consultation_title}
        />
      )}

      {/* edit contents */}
      {add_consulation && (
        <Modal_edit_consulation
          setadd_consulation={setadd_consulation}
          consultation_title={consultation_title}
          setconsultation_title={setconsultation_title}
          consultation_body={consultation_body}
          setconsultation_body={setconsultation_body}
          consultation_institute={consultation_institute}
          setconsultation_institute={setconsultation_institute}
          consultation_year={consultation_year}
          setconsultation_year={setconsultation_year}
          consultation_image_link={consultation_image_link}
          setconsultation_image_link={setconsultation_image_link}
          consulation_readmore_link={consulation_readmore_link}
          setconsulation_readmore_link={setconsulation_readmore_link}
          consultation_bg_color={consultation_bg_color}
          setconsultation_bg_color={setconsultation_bg_color}
          consultation_heading_text_color={consultation_heading_text_color}
          setconsultation_heading_text_color={
            setconsultation_heading_text_color
          }
          image_link={image_link}
          image_bg_link={image_bg_link}
          setimage_link={setimage_link}
          setimage_bg_link={setimage_bg_link}
          setedit_ID={setedit_ID}
          edit_ID={edit_ID}
        />
      )}
      {/* the wrapper */}
      <div
        className="w-full md:h-[150vw] flex  items-end  
         relative"
        style={{
          height:
            calwidth > 768
              ? `${data.length * 100}vh`
              : `${data.length * 100}vh`,
        }}
        ref={sectionRef}
      >
        <div className="flex  justify-center items-center   sticky bottom-0 h-[100vh]  w-full ">
          {/* the customized scroll bar ends */}
          {data.map((e: any, index: any) => {
            // Parse the JSON string to get the color object
            const bg_color_Object = JSON.parse(e.bg_color);
            const text_color_Object = JSON.parse(e.text_color);
            // Extract the hex value
            const bgColor = bg_color_Object.hex;
            const textColor = text_color_Object.hex;

            return (
              <div
                key={index}
                ref={(ref) => {
                  if (ref) {
                    itemsRefs.current[index] = ref;
                  }
                }}
                className={` absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%]  w-full md:gap-[4vw] flex flex-col md:justify-center justify-end  md:pb-0 pb-[15vw] items-center gap-[7vw] h-full  overflow-hidden   `}
                style={{
                  transition: "opacity 0.6s ease",
                  backgroundColor: bgColor,
                  // transform:
                  //   index + 1 - yvalue >= 0 && index + 1 - yvalue <= 1
                  //     ? `translateY(${
                  //         (index + 2 - yvalue) * 100 - 150 * (-index + yvalue)
                  //       }%) translateX(-50%)`
                  //     : index + 1 - yvalue <= 0
                  //     ? ``
                  //     : `translateY(${
                  //         yvalue + 1 + index * 100
                  //       }%) translateX(-50%)`,

                  transform: "translateX(-50%)",
                }}
              >
                {isloggedin && (
                  <Edit_each_consulation
                    edit_each_consulation_modal_param={
                      edit_each_consulation_modal_param
                    }
                    setdelete_consulation={setdelete_consulation}
                    setconsultation_title={setconsultation_title}
                    title={e.heading}
                    body={e.body}
                    bg={bg_color_Object}
                    text_color={text_color_Object}
                    img={e.img}
                    institue={e.institue}
                    year={e.year}
                    id={e.id}
                    read_more={e.link}
                    bg_img={e.bg_img}
                  />
                )}

                <div
                  className={`${
                    (index + 1) % 2 === 1
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  } flex md:px-[10vw] px-[5%]  flex-col  md:justify-between w-full md:items-center md:gap-0 gap-[7vw] `}
                >
                  {/* the left section */}
                  <div
                    className="flex  flex-col w-[60%]  md:w-[30%]  md:gap-[4vw]"
                    style={{ backgroundColor: e.bgColor }}
                  >
                    <img
                      src={e.img}
                      alt={e.heading}
                      className="w-full rounded-[5vw] h-fit md:rounded-[2vw]"
                    />
                  </div>

                  {/* now the writing  */}
                  <div className=" md:w-[60%]  gap-[3vw] flex flex-col md:gap-[1vw]">
                    <h2
                      className={` ${spline_font.className} uppercase font-semibold md:text-[4vw] md:leading-[4.4vw] text-white   text-[6vw] leading-[7vw]`}
                      // style={{ color: textColor }}
                    >
                      {e.heading}
                    </h2>
                    <p
                      className={` ${Helvetica_light.className}  text-[3.2vw]  py-[3vw]  md:py-[1vw] text-[white] md:text-[1vw] [&_a]:underline underline-offset-4`}
                      // dangerouslySetInnerHTML={{ __html: e.body }}
                      dangerouslySetInnerHTML={{
                        __html: getCaption(e.body, 60),
                      }}
                    ></p>

                    <div className=" md:flex-row gap-[5vw]  md:gap-[2vw] items-center flex ">
                      <button
                        onClick={() => {
                          setread_more_body(e.body);
                          setread_more_title(e.heading);
                          setopen_read_more(true);
                        }}
                        // href={e.div}
                        className={` ${Bt_Beau_Regualr.className} md:text-[1vw] md:w-[10vw] w-[40vw] h-[95%] flex justify-center items-center md:h-[2.8vw]  border-[white] border-[0.1vw] md:rounded-[3vw]   group relative overflow-hidden rounded-[3vw]`}
                      >
                        <p
                          style={{ transition: "0.5s ease" }}
                          className="group-hover:text-white z-[10] text-[3.5vw] md:text-[1.1vw] text-[white]"
                        >
                          {" "}
                          Read more{" "}
                        </p>

                        {/* <Image
                        src={arrow}
                        alt="arrow"
                        className="md:w-[1.7vw] z-[10] h-fit"
                      /> */}
                        <div
                          className="w-full h-full bg-[#440C0C] absolute left-0 top-[100%] group-hover:top-0 "
                          style={{ transition: "0.5s ease" }}
                        ></div>
                      </button>
                      {/* REACH OUT TO ME TEXT */}
                      <button
                        style={{
                          whiteSpace: "nowrap",
                          transition: "0.5s ease",
                        }}
                        onClick={() => {
                          setopen_contact_form(true);
                        }}
                        className={` ${Bricolage_grotesk_bold.className} uppercase overflow-hidden w-fit  md:p-[0.3vw]  p-[2vw] rounded-[8vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[white] backdrop-blur-2xl bg-opacity-[10%] `}
                      >
                        <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] rounded-[7vw]  flex justify-center items-center py-[2.5vw] px-[8vw] md:py-[0.6vw] md:px-[1.5vw]">
                          <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white">
                            Reach out to me
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* institue and location segment */}
                <div
                  className={` opacity-[70%] ${Bt_Beau_Regualr.className} w-full border-y border-[white]  md:py-[1.6vw] flex justify-center items-center md:gap-[4vw] text-white text-opacity-[100%] md:text-[1.1vw] text-[3.5vw]  md:px-[10vw] px-[5%] gap-[3vw] py-[3vw]`}
                >
                  <p className="" style={{ whiteSpace: "nowrap" }}>
                    {e.institue}
                  </p>
                  <div className="w-full relative h-[0.5vw] md:h-[0.1vw] bg-[white]  flex justify-end items-center">
                    <div className="md:w-[0.4vw] w-[1vw] h-[1vw] md:h-[0.4vw] rounded-[100%] bg-[white]   "></div>
                  </div>
                  {/* <p className="" style={{ whiteSpace: "nowrap" }}>
                    ({e.year})
                  </p> */}
                </div>
              </div>
            );
          })}

          {/* the customize scroll bar starts */}
          {/* <div className="absolute md:right-[3vw]  border-[#0e257756]  flex w-[1%] right-[1.5%]  top-[50%] translate-y-[-50%] md:w-[0.2vw] rounded-[3vw]  lg:h-[28vw] md:h-[40vw]   h-[140vw] z-[1000] bg-white overflow-hidden">
            <div
              className="fw-full bg-[black] z-[100]"
              style={{ height: `${height * 10}%` }}
            ></div>
          </div> */}
        </div>
      </div>

      {/* this is read more wrapper */}
      {open_read_more && (
        <Read_more
          body={read_more_body}
          title={read_more_title}
          setopen_read_more={setopen_read_more}
        />
      )}

      {/* reach out to use contact modal */}
      {open_contact_form && (
        <Contact_form setopen_contact_form={setopen_contact_form} />
      )}
    </>
  );
};

export default Each_consultation;
