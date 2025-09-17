"use client";

import {
  Bricolage_grotesk_bold,
  Helvetica_light,
  Helvetica_medium,
  Media_san_regular,
  spline_font,
} from "@/app/utils/fonts";
import Link from "next/link";
import twitter from "../../../../public/images/footer/twitter.png";
import Image from "next/image";
import arrow from "../../../../public/images/footer/arrow.png";
import goggle from "../../../../public/images/footer/goggle.png";
import linkden from "../../../../public/images/footer/linkden.png";

import { useRouter, useSearchParams } from "next/navigation";
import Contact_form from "./contact_form";
import { useState } from "react";
const Footer = ({ bg }: any) => {
  const socai_items = [
    {
      link: "https://www.linkedin.com/in/erica-boothby-96b4b47/",
      text: "Linked in",
      logo: linkden,
    },
    {
      link: "https://scholar.google.com/citations?user=cAv9ZxEAAAAJ&hl=en",
      text: "Google Scholar",
      logo: goggle,
    },
    {
      link: "https://x.com/ericaboothby?lang=en",
      text: "Twitter",
      logo: twitter,
    },
  ];

  const items = [
    {
      text: "About me ",
      link: "/",
    },
    {
      text: "Publications",
      link: "/publications",
    },
    {
      text: "RESEARCH",
      link: "/research",
    },
    {
      text: " consultation",
      link: "/consultation",
    },

    // {
    //   text: "MEDIA",
    //   link: "/media",
    // },
  ];
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("contact");
  const scroll_to_contact = () => {
    if (search) {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`?contact=${true}`);
    }
  };

  const [open_contact_form, setopen_contact_form] = useState(false);
  return (
    <>
      <div style={{ backgroundColor: bg ? bg : "" }} className="w-full">
        <div className="w-full  flex flex-col md:gap-[3vw] bg-[#283E29] md:px-[7vw] px-[4%] md:pt-[6vw] pt-[15vw] pb-[8vw] gap-[7vw] md:pb-[2.5vw] md:rounded-t-[4vw] rounded-t-[5vw] items-center">
          {/* footer name */}
          <div className="flex w-full  flex-col md:gap-[2.5vw] gap-[7vw] items-center ">
            {/* <div className="w-full flex justify-center">
              <h2
                className={`text-white text-[11.5vw] leading-[12.5vw] ${Media_san_regular.className} text-center md:text-[6vw] uppercase font-light md:leading-[5.5vw]`}
              >
                {" "}
                <span
                  className={`text-[#464646] inline-flex items-baseline md:text-[5vw] font-bold md:ml-[-1vw] md:gap-[2vw] md:leading-[5.2vw] ${Media_san_regular.className} `}
                >
                  ©
                </span>{" "}
                ERICA J. <br /> BOOTHBY
              </h2>
            </div> */}

            <div className="w-full  md:justify-between   md:flex-row flex-col md:gap-[5%] gap-[5vw] flex ">
              <div className="md:w-[80%] gap-[3vw]  md:gap-[1.2vw] flex flex-col  text-white ">
                <h3
                  className={` ${Bricolage_grotesk_bold.className} tracking-wider items-center flex md:text-[8vw]  text-[10vw] md:leading-[6vw] `}
                >
                  <span>GET IN T</span>
                  <button
                    onClick={() => {
                      setopen_contact_form(true);
                    }}
                    className=" overflow-hidden flex justify-center items-center  border-white w-[10vw] h-[10vw] md:h-[6vw] md:w-[6vw] border md:mx-[0.1vw] mx-[1vw] relative group cursor-pointer  rounded-[100%]"
                  >
                    <Image
                      src={arrow}
                      alt="arrow"
                      className="md:w-[50%] z-[10]  h-fit"
                    />
                    <div
                      className="w-full h-full bg-[#4F0A19] absolute left-0 top-[100%] group-hover:top-0 "
                      style={{ transition: "0.5s ease" }}
                    ></div>
                  </button>{" "}
                  <span> UCH</span>
                </h3>
                <p
                  className={`${spline_font.className} font-light text-white  md:w-[40%] text-[3.5vw] md:pr-0 pr-[10%] md:text-[1.2vw] `}
                >
                  If you{"'"}re interested in booking Erica for an event,
                  workshop, consulting, or collaborating as a social science
                  researcher, let{"'"}s talk.
                </p>

                {/* REACH OUT TO ME TEXT */}
                <button
                  style={{
                    whiteSpace: "nowrap",
                    transition: "0.5s ease",
                  }}
                  onClick={() => {
                    setopen_contact_form(true);
                  }}
                  className={` ${Bricolage_grotesk_bold.className} uppercase overflow-hidden w-fit  md:p-[0.5vw]  p-[2vw] rounded-[8vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[white] backdrop-blur-2xl bg-opacity-[10%] `}
                >
                  <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.7vw] rounded-[7vw]  flex justify-center items-center py-[2.5vw] px-[8vw] md:py-[0.8vw] md:px-[2vw]">
                    <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white">
                      Reach out to me
                    </p>
                  </div>
                </button>
              </div>
              <div className="  flex gap-[3vw] md:w-auto  flex-wrap  md:flex-col md:gap-[2vw] ">
                {items.map((e: any, index: any) => {
                  return (
                    <Link
                      key={index}
                      href={e.link}
                      className={`uppercase underline underline-offset-8 hover:text-[#ffffffbe] text-white md:text-[1.1vw] text-[3vw] ${Helvetica_medium.className}`}
                    >
                      {e.text}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* the footer socail links */}
            <div
              className={`w-full flex  md:flex-row gap-[5vw] flex-col justify-between md:gap-[4vw] md:items-center ${Helvetica_light.className} `}
            >
              <p
                className={`${spline_font.className}  text-white font-light md:text-[2.1vw] text-[5vw]`}
              >
                Follow my socials
              </p>
              <div className="flex md:flex-row w-full md:w-auto  flex-col md:gap-[5%] gap-[2vw]">
                {socai_items.map((e: any, index: any) => {
                  return (
                    <Link
                      href={e.link}
                      target="_blank"
                      key={index}
                      className={`border-[#A1AAA1] overflow-hidden border-opacity-[50%] md:w-[18vw] md:rounded-[1.2vw] w-full h-[15vw] rounded-[5vw] md:h-[4vw] border flex justify-center items-center md:text-[1vw] text-[4vw] text-white md:gap-[1vw] group gap-[3vw] relative`}
                    >
                      <p
                        className="z-[10] group-hover:text-black"
                        style={{ transition: "0.5s ease" }}
                      >
                        {e.text}
                      </p>
                      <Image
                        src={e.logo}
                        className="md:w-[2vw] w-[7vw] z-[10]"
                        alt={e.text}
                      />
                      <div
                        className="w-full h-full bg-[#D9D9D9] absolute left-0 top-[100%] group-hover:top-0 "
                        style={{ transition: "0.5s ease" }}
                      ></div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {/* fotter line */}
          <div className=" w-full bg-[#ffffff5c] flex justify-start  h-[0.05vw] "></div>

          {/* footer copyright */}
          <div
            className={` ${Helvetica_light.className}  md:flex-row flex-col  w-full flex justify-between items-center relative text-white opacity-[80%] md:px-[1vw] md:text-[1vw] text-[4vw] md:gap-0 gap-[2vw]`}
          >
            <p className="">©2024</p>
            {/* <a
              href="mailto:ericajboothby@gmail.com"
              className="md:absolute md:top-[50%] md:translate-x-[-50%] md:left-[50%] md:translate-y-[-50%]"
            >
              ericajboothby@gmail.com
            </a> */}
            <Link
              href="https://www.malkain.com/"
              target="_blank"
              className="underline underline-offset-4"
            >
              Design & Dev By Malkain
            </Link>
          </div>
        </div>
      </div>

      {open_contact_form && (
        <Contact_form setopen_contact_form={setopen_contact_form} />
      )}
    </>
  );
};

export default Footer;
