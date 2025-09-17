"use client";
import Link from "next/link";
import example from "../../../../public/images/media/example.webp";
import Image from "next/image";
import { Helvetica_light, spline_font } from "@/app/utils/fonts";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Refer_edit from "../home/refer_edit";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

const Recent_media = ({ product_data }: any) => {
  const items = [
    {
      img: example,
      caption:
        "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
      link: "/",
    },
    {
      img: example,
      link: "/",
      caption:
        "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening ",
    },
    {
      img: example,
      link: "/",
      caption:
        "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
    },
  ];

  const ref = useRef(null);
  const [start_anime, setstart_anime] = useState(false);
  const isinview = useInView(ref);

  useEffect(() => {
    if (isinview) {
      setstart_anime(isinview);
    }
  }, [isinview]);

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
      <div
        ref={ref}
        className="w-full md:px-[10vw] bg-[#D8DFD8]  md:gap-[2.3vw] flex md:py-[7vw]  flex-col overflow-hidden gap-[10vw] py-[15vw]"
      >
        <h1
          className={`text-[#5C3C43] uppercase md:text-[4vw] ${spline_font.className} font-medium md:text-start text-center  md:leading-[5.3vw] text-[10vw] leading-[11.5vw]`}
        >
          Recent Media
        </h1>

        <div className="w-full relative  overflow-hidden">
          {isloggedin && <Refer_edit text={"media"} />}

          <div
            className=" flex md:flex-nowrap
        overflow-x-auto overflow-y-hidden md:overflow-x-visible
        snap-x snap-mandatory md:snap-none
        scrollbar-hide  md:scrollbar-default
        md:justify-center
        gap-[5%] md:gap-[1.5vw]
        px-[5%] pb-[10vw] md:pb-0 md:px-0"
          >
            {product_data.map((internal: any, index: any) => (
              <Link
                href={internal.link || "/"}
                key={index}
                style={{ transition: `${(index + 1) / 2}s ease` }}
                className={`
             flex-none md:flex-auto
              w-[80vw] md:w-[33.6vw]
              ${start_anime ? "research_comeup" : "research_initial"}
              flex flex-col
              rounded-[5vw] md:rounded-[1.5vw]
              p-[1.5vw] md:p-[0.3vw]
             
              snap-center
              group
              bg-white
            `}
              >
                <div className="overflow-hidden  w-full md:h-[19vw] h-[58vw] rounded-[4vw] md:rounded-[1.5vw]">
                  <Image
                    src={internal.img}
                    alt={internal.caption}
                    width={500}
                    height={600}
                    // fill
                    className="w-full h-full object-cover group-hover:scale-[1.1]"
                  />
                </div>

                <div className="overflow-hidden">
                  <div
                    className={` md:p-[1.5vw] p-[3vw] flex flex-col md:gap-[1vw] gap-[3vw]  ${spline_font.className}  font-medium md:text-[1.2vw] text-[4vw] md:leading-[1.4vw] leading-[5vw]`}
                  >
                    {internal.caption.includes("|") ? (
                      <>
                        <p
                          style={{ fontWeight: "bold" }}
                          className="text-[#103210] capitalize md:text-[1.3vw] text-[5vw] "
                        >
                          {internal.caption.split("|")[1]}
                        </p>

                        {internal.caption.split("|")[0]}
                      </>
                    ) : (
                      <p className=""> {internal.caption}</p>
                    )}{" "}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* the see all btn */}
        <div
          className="w-full md:mt-0
         mt-[-7vw] flex justify-center"
        >
          <Link
            style={{
              whiteSpace: "nowrap",
              transition: "0.9s ease",
              // transform: start_anime ? "translate(0,0)" : "translate(0%,80%)",
            }}
            href={"/media"}
            className={` ${Helvetica_light.className} uppercase overflow-hidden  md:p-[0.5vw] p-[2vw] rounded-[8vw] w-fit group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[black] backdrop-blur-2xl bg-opacity-[20%] `}
          >
            <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] rounded-[7vw] flex justify-center items-center   py-[2.5vw] px-[8vw] md:py-[0.7vw] md:px-[1.5vw]">
              <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white text-[3.5vw]">
                see all
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Recent_media;
