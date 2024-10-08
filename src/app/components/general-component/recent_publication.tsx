"use client";
import {
  Bt_Beau_Regualr,
  Helvetica_light,
  Helvetica_medium,
  dm_sans_font,
  spline_font,
} from "@/app/utils/fonts";
import Image from "next/image";
import img_black from "../../../../public/images/publication/black.png";
import img_white from "../../../../public/images/publication/white.png";
import Link from "next/link";
import example from "../../../../public/images/publication/example.webp";
import { useEffect, useRef, useState } from "react";
import Refer_edit from "../home/refer_edit";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

const Recent_publication = ({ product_data }: any) => {
  const items = [
    {
      title: "THEORY OF COLLECTIVE MIND. TRENDS IN COGNITIVE SCIENCES.",
      body: "Shteynberg, G., Hirsh, J. B., Wolf, W., Bargh, J. A., Boothby, E. J., Colman, A. M., Echterhoff, G., & Rossignac-Milon, M. 2023.",
      data_link: "malkain.com/data",
      pdf_link: "malkain.com/pdf",
    },
    {
      title: "THEORY OF COLLECTIVE MIND. TRENDS IN COGNITIVE SCIENCES.",
      body: "Shteynberg, G., Hirsh, J. B., Wolf, W., Bargh, J. A., Boothby, E. J., Colman, A. M., Echterhoff, G., & Rossignac-Milon, M. 2023.",
      data_link: "malkain.com/data",
      pdf_link: "malkain.com/pdf",
    },
    {
      title: "THEORY OF COLLECTIVE MIND. TRENDS IN COGNITIVE SCIENCES.",
      body: "Shteynberg, G., Hirsh, J. B., Wolf, W., Bargh, J. A., Boothby, E. J., Colman, A. M., Echterhoff, G., & Rossignac-Milon, M. 2023.",
      data_link: "malkain.com/data",
      pdf_link: "malkain.com/pdf",
    },
    {
      title: "THEORY OF COLLECTIVE MIND. TRENDS IN COGNITIVE SCIENCES.",
      body: "Shteynberg, G., Hirsh, J. B., Wolf, W., Bargh, J. A., Boothby, E. J., Colman, A. M., Echterhoff, G., & Rossignac-Milon, M. 2023.",
      data_link: "malkain.com/data",
      pdf_link: "malkain.com/pdf",
    },
    {
      title: "THEORY OF COLLECTIVE MIND. TRENDS IN COGNITIVE SCIENCES.",
      body: "Shteynberg, G., Hirsh, J. B., Wolf, W., Bargh, J. A., Boothby, E. J., Colman, A. M., Echterhoff, G., & Rossignac-Milon, M. 2023.",
      data_link: "malkain.com/data",
      pdf_link: "malkain.com/pdf",
    },
  ];

  const itemsRefs = useRef<any>([]);
  //  const itemsRefs = useRef<any>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [active, setactive] = useState<any>(0);
  const [data, setdata] = useState<any>(product_data ? product_data : []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("research_comeup");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 },
    );

    itemsRefs.current.forEach((ref: any) => {
      observer.observe(ref);
    });

    return () => {
      itemsRefs.current.forEach((ref: any) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (itemsRefs.current) {
      const newHeights = itemsRefs.current.map(
        (ref: any) => ref?.clientHeight || 0,
      );
      setHeights(newHeights);
    }
  }, [itemsRefs.current]);

  useEffect(() => {
    if (active == null) {
      setTimeout(() => {
        setactive(0);
      }, 3000);
    }
  }, [active]);

  // track when logged in
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
      <div className="w-full md:gap-[6vw] gap-[6vw] py-[15vw] flex px-[3.5%] md:px-[10vw] bg-[#D8DFD8] md:py-[5vw] flex-col">
        <h2
          className={`text-[#5C3C43] md:text-[5vw] md:text-start text-center text-[10vw] md:leading-[6vw] leading-[10.5vw]  uppercase ${spline_font.className} font-medium `}
        >
          <span className="md:inline-block hidden">Recent</span> Publications
        </h2>

        <div className="flex flex-col relative  gap-[5vw] md:gap-[2vw]">
          {isloggedin && <Refer_edit text={"publication"} />}

          {data.map((e: any, index: any) => {
            return (
              <div
                key={index}
                style={{
                  transition: "0.7s ease",
                  height: active == index ? "" : heights[index] || "auto",
                }}
                onClick={() => setactive(index)}
                // onMouseLeave={() => setactive(null)}
                className={`w-full cursor-cell  overflow-hidden  md:h-[37vw] h-[95vw]  relative ${
                  active == index
                    ? "md:border-none rounded-[2vw] md:rounded-none md:px-0 px-[5%]"
                    : ""
                } flex-col  flex justify-end    border-b-[#565956] border-b-[0.1vw] `}
              >
                <div
                  className={` md:w-[46.5%]  h-[95vw] w-full left-0 flex justify-center  items-center  ${
                    active == index ? "bottom-0" : "bottom-[100%]"
                  } absolute md:h-[37vw] overflow-hidden md:rounded-[1vw]`}
                  style={{
                    transition: "0.7s ease",
                  }}
                >
                  <div className="w-full h-full  relative">
                    {" "}
                    <Image
                      src={e.image_link}
                      unoptimized
                      width="0"
                      height="0"
                      alt={e.title}
                      className={` w-full absolute h-fit left-[50%] top-[50%] translate-x-[-50%] scale-[1.1] translate-y-[-50%] `}
                    />
                  </div>
                </div>

                <div
                  style={{
                    transition: "0.7s ease",
                  }}
                  className={`w-full ${
                    active == index ? "h-[100%]" : "h-[0%]"
                  } md:h-[0%] bg-gradient-to-t  from-[#000000] absolute bottom-0 left-0 `}
                ></div>
                {/* the mobile overlay  */}
                {/* first section which includes the s/n and also the title */}
                <div
                  className="w-full  research_initial pt-[6vw] pb-[3vw] md:flex-row flex-col  gap-[5vw]  md:gap-[10vw] md:py-[1.2vw] border-opacity-[50%] flex justify-between   "
                  ref={(ref) => {
                    if (ref) {
                      itemsRefs.current[index] = ref;
                    }
                  }}
                >
                  <div
                    style={{
                      transition: "0.5s ease",
                    }}
                    className={`flex md:gap-[2vw] h-full  md:h-fit  ${
                      active == index
                        ? "md:translate-x-[152%] md:translate-y-[-130%]"
                        : ""
                    } md:w-[35%] md:text-[1.2vw] text-[4.5vw] z-[20] md:leading-[1.8vw] leading-[5vw] items-center  ${
                      Helvetica_medium.className
                    }`}
                  >
                    <h2
                      style={{
                        transition: "0.7s ease",
                      }}
                      className={`  ${
                        active == index
                          ? "text-[white] md:text-opacity-[100%] text-opacity-[100%] md:text-[#000000]"
                          : "text-[#000000] "
                      } z-[20] uppercase`}
                    >
                      {e.title}
                    </h2>
                  </div>
                  {/* this includes body  and arrow  */}

                  {/* THIS INCLUDES THE BUTTONS AND THE BODY TEXT */}
                  <div className="w-full    flex-col-reverse md:gap-[1.5vw] md:items-start md:w-[60%] gap-[5vw]  flex md:flex-col">
                    <div
                      style={{ transition: "0.7s ease" }}
                      className={`${Bt_Beau_Regualr.className}  ${
                        active != index
                          ? "translate-x-[-100%] h-0 md:mt-0 mt-[-5vw]"
                          : ""
                      }  md:w-[30%]  md:text-[1vw] md:ml-[7%]  gap-[4vw] text-[3.5vw] flex capitalize overflow-hidden md:gap-[1vw] md:items-start  items-center`}
                    >
                      {" "}
                      {e.data_link && (
                        <Link
                          target="_blank"
                          href={`${e.data_link}`}
                          className=" md:rounded-[1.2vw] w-full border-[#440C0C] border-[0.1vw]  bg-[#FEF6F6] flex justify-center items-center md:py-[0.5vw] py-[3vw] text-[#440C0C]  hover:bg-[white] rounded-[7vw]"
                        >
                          DATA
                        </Link>
                      )}
                      <Link
                        target="_blank"
                        className=" md:rounded-[1.2vw] w-full border-[#440C0C]   md:border-[0.1vw] bg-[#440C0C] flex justify-center items-center md:py-[0.5vw]  py-[3vw] text-white hover:bg-[#C1A391] hover:border-[#C1A391] rounded-[7vw]"
                        href={`${e.pdf_link}`}
                      >
                        PDF
                      </Link>
                    </div>
                    <div className="flex md:gap-[3vw]  gap-[2vw] z-[20] md:w-full justify-between md:justify-end items-center ">
                      <p
                        style={{
                          transition: "0.7s ease",
                        }}
                        className={` ${
                          active == index
                            ? "text-[white] md:text-opacity-[100%] text-opacity-[100%] md:text-[black]"
                            : "text-[black]"
                        } md:w-[80%] w-[90%] z-[20] text-[3.5vw] md:leading-[1.5vw] leading-[4.15vw] md:text-[1.1vw]  ${
                          Helvetica_light.className
                        }`}
                      >
                        {e.description} {/* 434543 */}
                      </p>

                      <button
                        onClick={() => setactive(index)}
                        // href={e.pdf_link}
                        style={{ whiteSpace: "nowrap" }}
                        className={`flex justify-center group  bg-transparent  w-[10vw] h-[10vw] items-center  ${
                          active == index
                            ? "md:border-[black] border-[#ffffff7b]"
                            : "border-[black]"
                        }  overflow-hidden border-opacity-[50%]   border-[0.1vw] rounded-[100%]  md:w-[2.5vw] md:h-[2.5vw]  relative`}
                      >
                        <Image
                          src={img_black}
                          alt="arrow image"
                          style={{ transition: "0.5s ease" }}
                          className={` w-[60%]   ${
                            active == index ? "opacity-[0%]" : "opacity-[100%]"
                          } absolute absolute_center md:opacity-[100%] z-[10] h-fit`}
                        />
                        <Image
                          src={img_white}
                          alt="arrow image"
                          style={{ transition: "0.5s ease" }}
                          className={`w-[60%] absolute   ${
                            active == index
                              ? "opacity-[100%]  "
                              : "opacity-[0%]"
                          } block  group-hover:opacity-[100%]  opacity-[0%] absolute_center z-[10] h-fit`}
                        />

                        <div
                          className={`w-full h-full bg-[#440C0C] absolute left-0 top-[100%] group-hover:top-0  ${
                            active == index ? "top-0" : ""
                          }`}
                          style={{ transition: "0.5s ease" }}
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Recent_publication;
