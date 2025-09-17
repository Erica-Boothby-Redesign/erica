"use client";

import Image from "next/image";
import exit from "../../../../public/images/contact/exit.png";
import success from "../../../../public/images/contact/success.gif";
import { useEffect, useState } from "react";
import {
  Bricolage_grotesk_bold,
  Helvetica_bold,
  Helvetica_light,
  Helvetica_medium,
} from "@/app/utils/fonts";
const Success_contact_form = ({ setopen_contact_form, step, setstep }: any) => {
  const hide = () => {
    setstep(2);
    false;
    setTimeout(() => {
      setopen_contact_form(false);
    }, 400);
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ transition: "0.8s ease", opacity: step == 1 ? 1 : 0 }}
        className=" border2 mx-auto md:w-[32vw] md:py-[3%] md:px-[2%] px-[4%] py-[10%] absolute top-[10%] left-[50%] translate-x-[-50%]  w-[96%]  bg-white gap-[10vw] md:gap-[2vw] flex flex-col rounded-[7vw] md:rounded-[2vw] overflow-hidden"
      >
        <Image
          src={exit}
          onClick={() => {
            hide();
          }}
          style={{ transition: "0.9s ease", opacity: step == 1 ? 1 : 0 }}
          alt="exit"
          className="md:w-[3vw] w-[10vw] cursor-pointer h-fit absolute md:top-[2.2vw] top-[6vw] right-[4%]"
        />

        <div
          className={` ${Helvetica_medium.className} w-full flex flex-col items-center md:gap-[1.2vw] gap-[7vw] md:text-[1.1vw]`}
        >
          <div className="md:h-[15vw] md:w-[15vw] flex justify-center items-center md:mt-[2vw] mt-[10vw] overflow-hidden h-[50vw] w-[50vw] rounded-[100%] bg-[#EBF3EC]">
            <Image
              src={success}
              alt="success"
              className="md:w-[30vw]  h-fit w-[70vw]"
            />
          </div>
          <h3
            className={`md:text-[1.5vw] text-[6vw] text-center uppercase ${Helvetica_bold.className}`}
          >
            Successfully sent
          </h3>
          <p className="px-[5%] text-center md:text-[1.1vw] opacity-[70%]">
            Form has been sent successfully, a response would be sent through
            mail, thank you!
          </p>
          <button
            style={{
              whiteSpace: "nowrap",
              transition: "0.5s ease",
            }}
            onClick={() => {
              hide();
            }}
            className={` ${Bricolage_grotesk_bold.className} uppercase overflow-hidden w-fit  md:p-[0.5vw]  p-[2vw] rounded-[8vw] group hover:[#103210]   hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[black] backdrop-blur-2xl bg-opacity-[10%] `}
          >
            <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.5vw] rounded-[7vw]  flex justify-center items-center py-[2.5vw] px-[15vw] md:py-[0.8vw] md:px-[4vw]">
              <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white">
                DONE
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Success_contact_form;
