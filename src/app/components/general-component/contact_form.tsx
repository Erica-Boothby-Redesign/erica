"use client";

import Image from "next/image";
import exit from "../../../../public/images/contact/exit.png";
import { useEffect, useState } from "react";
import {
  Bricolage_grotesk_bold,
  Helvetica_bold,
  Helvetica_light,
  Helvetica_medium,
} from "@/app/utils/fonts";
import Success_contact_form from "./success_contact_form";
import axios from "axios";
const Contact_form = ({ setopen_contact_form, prop_email, prop_body }: any) => {
  const [start_anime, setstart_anime] = useState(false);
  const [movement, setmovement] = useState(false);
  const [email, setemail] = useState(prop_email ? prop_email : "");
  const [name, setname] = useState("");
  const [tel, settel] = useState("");
  const [body, setbody] = useState(prop_body ? prop_body : "");

  useEffect(() => {
    setstart_anime(true);
  }, []);

  const hide = () => {
    setstart_anime(false);
    setTimeout(() => {
      setopen_contact_form(false);
    }, 400);
  };

  const [step, setstep] = useState(0);
  const [err, seterr] = useState("");
  const [disabled, setdisabled] = useState(false);
  const [sendbtn, setsendbtn] = useState("Submit");

  const handle_submit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !tel || !body) {
      seterr("Complete your information below");

      return;
    } else {
      seterr("");
      setsendbtn("Sending...");
      setdisabled(!disabled);
      let data = JSON.stringify({
        name: name,
        phone: tel,
        email: email,
        body: body,
      });

      await axios
        .post("/api/contact", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.emailSent == true) {
            // console.log(response.data.emailSent);
            setsendbtn("Submit");
            setstep(1);
          } else {
            seterr("Something went wrong. Please try again or reload the page");
            console.log("something went wrong");
            setdisabled(!disabled);
          }
        })
        .catch((err) => {
          console.log(err);
          seterr(
            "Something went wrong. Please try again or reload the page and try again"
          );
          setdisabled(!disabled);
        });
    }
  };

  useEffect(() => {
    seterr("");
  }, [name, email, tel, body]);

  return (
    <>
      <div
        style={{
          transition: "0.5s ease",
        }}
        className={` ${
          start_anime ? "bg-opacity-[69%] backdrop-blur-xl" : "bg-opacity-[0%]"
        } bg-black overflow-y-scroll  h-[100vh] gap-[2rem] py-[10vw] md:py-[3vw]  items-center  w-full fixed top-0 left-0 z-[3000] `}
      >
        {step === 0 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ transition: "0.9s ease", opacity: start_anime ? 1 : 0 }}
            className=" border2 mx-auto md:w-[32vw] md:py-[3%] md:px-[2%] px-[4%] py-[10%] z-[10] w-[96%] relative bg-white gap-[10vw] md:gap-[2vw] flex flex-col rounded-[7vw] md:rounded-[2vw] overflow-hidden"
          >
            <Image
              src={exit}
              onClick={() => {
                hide();
              }}
              style={{ transition: "0.9s ease", opacity: start_anime ? 1 : 0 }}
              alt="exit"
              className="md:w-[3vw] w-[10vw] cursor-pointer h-fit absolute md:top-[2.2vw] top-[6vw] right-[4%]"
            />
            <p
              className={`${Helvetica_bold.className} md:text-[1.2vw]  text-center`}
            >
              Get in touch with me
            </p>

            <form
              onSubmit={handle_submit}
              className={` ${Helvetica_medium.className} w-full flex flex-col items-center md:gap-[1.2vw] gap-[7vw] md:text-[1.1vw]`}
            >
              <input
                type="text"
                className="bg-[#EBF3EC] focus:border border-none outline-none md:px-[4%] placeholder:text-[#000000] md:rounded-[1vw] md:h-[3.4vw] h-[15vw] rounded-[3vw] px-[5%] w-full"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name || ""}
                autoComplete="name"
                placeholder="Your name"
              />
              <input
                type="text"
                className="bg-[#EBF3EC] focus:border border-none outline-none md:px-[4%] placeholder:text-[#000000] md:rounded-[1vw] md:h-[3.4vw] h-[15vw] rounded-[3vw] px-[5%] w-full"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                value={email || ""}
                autoComplete="email"
                placeholder="Your email"
              />
              <input
                type="tel"
                className="bg-[#EBF3EC] focus:border border-none outline-none md:px-[4%] placeholder:text-[#000000] md:rounded-[1vw] md:h-[3.4vw] h-[15vw] rounded-[3vw] px-[5%] w-full"
                onChange={(e) => {
                  settel(e.target.value);
                }}
                value={tel || ""}
                autoComplete="tel"
                placeholder="Your number"
              />
              <textarea
                rows={5}
                value={body || ""}
                onChange={(e) => {
                  setbody(e.target.value);
                }}
                className="resize-none bg-[#EBF3EC] focus:border border-none outline-none md:p-[4%] md:rounded-[1vw] w-full placeholder:text-[#000000]  rounded-[3vw] p-[5%]"
                placeholder=" Text"
              ></textarea>
              <p className="text-red-500 md:text-[1vw] text-[3.5vw] w-full text-start">
                {err}
              </p>
              <button
                disabled={disabled}
                style={{
                  whiteSpace: "nowrap",
                  transition: "0.5s ease",
                }}
                type="submit"
                className={` ${Bricolage_grotesk_bold.className} uppercase overflow-hidden w-fit  md:p-[0.5vw]  p-[2vw] rounded-[8vw] group hover:[#103210]   hover:bg-opacity-[20%]  md:rounded-[2vw] bg-[black] backdrop-blur-2xl bg-opacity-[10%] `}
              >
                <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] md:rounded-[1.5vw] rounded-[7vw]  flex justify-center items-center py-[2.5vw] px-[15vw] md:py-[0.8vw] md:px-[4vw]">
                  <p className="inline-block md:text-[1vw] text-[white] group-hover:text-white">
                    {sendbtn}
                  </p>
                </div>
              </button>
            </form>
          </div>
        )}
        <Success_contact_form
          step={step}
          setopen_contact_form={setopen_contact_form}
          setstep={setstep}
        />
      </div>
    </>
  );
};

export default Contact_form;
