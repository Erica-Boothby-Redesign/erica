"use client";
import {
  Bt_Beau_Regualr,
  Helvetica_bold,
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
import React, { useEffect, useRef, useState } from "react";
import Refer_edit from "../home/refer_edit";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

const Recent_publication = ({ product_data }: any) => {
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
  // src={e.image_link}
  //
  return (
    <>
      <div className="w-full md:gap-[6vw] gap-[6vw] py-[15vw] flex px-[3.5%] md:px-[10vw] bg-[#D8DFD8] md:py-[5vw] flex-col">
        <h2
          className={`text-[#5C3C43] md:text-[5vw] md:text-start text-center text-[10vw] md:leading-[6vw] leading-[10.5vw]  uppercase ${spline_font.className} font-medium `}
        >
          <span className="md:inline-block hidden">Recent</span> Publications
        </h2>

        <div className="flex flex-col relative  gap-[7vw] md:gap-[2.5vw]">
          {isloggedin && <Refer_edit text={"publications"} />}

          {data.map((e: any, index: any) => {
            return (
              <div
                key={index}
                style={{
                  transition: "0.7s ease",
                  height: active == index ? "" : heights[index] || "auto",
                }}
                onClick={() => setactive(index)}
                className={`  flex bg-[#CBD4CB] md:rounded-[1.5vw] overflow-hidden drop-shadow-xl md:flex-row flex-col shadow-xl rounded-[5vw] `}
              >
                <div className="w-full overflow-hidden md:h-auto h-[50vw]  relative ">
                  <Image
                    src={e.image_link}
                    alt={e.title}
                    width={500}
                    height={600}
                    // fill
                    className="w-full h-full absolute top-0 left-0 object-cover"
                  />
                </div>
                <div className="w-full gap-[2vw] md:gap-[0.8vw] md:px-[8%] px-[4%] py-[4vw] flex flex-col md:py-[2.5vw]">
                  <h2
                    //   ref={hero_ref}
                    className={`${Helvetica_medium.className} text-[4.5vw] leading-[5.5vw] md:text-[1.2vw] md:leading-[1.8vw] uppercase text-[#000000]`}
                  >
                    {e.title}
                  </h2>{" "}
                  <p className="text-[#000000] md:text-[1vw] text-[4vw] opacity-[50%]">
                    {e.sub_title}{" "}
                  </p>
                  <p
                    className={`${Helvetica_light.className} md:text-[1.1vw] md:leading-[1.5vw] text-[4vw] leading-[5vw] text-[#000000]`}
                  >
                    {e.description
                      .split("Boothby, E. J")
                      .map((part: string, index: number) => (
                        <React.Fragment key={index}>
                          {part}
                          {index <
                            e.description.split("Boothby, E. J").length - 1 && (
                            <strong
                              className={`${Helvetica_bold.className} text-[#103210]`}
                            >
                              Boothby, E. J
                            </strong>
                          )}
                        </React.Fragment>
                      ))}{" "}
                  </p>
                  <div className="flex gap-[5vw] md:gap-[1vw] mt-[2vw] md:mt-0">
                    <Link
                      style={{
                        whiteSpace: "nowrap",
                        transition: "0.9s ease",
                      }}
                      target="_blank"
                      href={`${e.pdf_link}`}
                      className={` ${
                        Helvetica_light.className
                      } md:flex w-full md:mx-0 ${
                        e.data_link ? "" : "mx-[5vw]"
                      }  md:w-fit uppercase overflow-hidden  md:p-[0.5vw]  p-[2vw] rounded-[8vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[#440C0C] backdrop-blur-2xl bg-opacity-[20%] `}
                    >
                      <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] flex rounded-[7vw] justify-center items-center  py-[2.5vw] px-[8vw]  md:py-[0.7vw] md:px-[3vw]">
                        <p className="inline-block md:text-[1vw] text-[3.5vw] text-[white] group-hover:text-white">
                          PDF
                        </p>
                      </div>
                    </Link>
                    {e.data_link && (
                      <Link
                        style={{
                          whiteSpace: "nowrap",
                          transition: "0.9s ease",
                        }}
                        target="_blank"
                        href={`${e.pdf_link}`}
                        className={` ${Helvetica_light.className} md:flex md:w-fit uppercase overflow-hidden w-full p-[2vw] rounded-[8vw] md:p-[0.5vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[#440C0C] backdrop-blur-2xl bg-opacity-[20%] `}
                      >
                        <div className="w-full h-full bg-[#FEF6F6] group-hover:bg-[#103210] md:rounded-[1.7vw] flex justify-center  rounded-[7vw] items-center py-[2.5vw] px-[8vw] md:py-[0.7vw] md:px-[3vw]">
                          <p className="inline-block md:text-[1vw]  text-[3.5vw] text-[#440C0C] group-hover:text-white">
                            DATA
                          </p>
                        </div>
                      </Link>
                    )}
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
