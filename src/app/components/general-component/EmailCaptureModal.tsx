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
import face from "@/../public/images/emailmarketing/face.webp";
import Success_contact_form from "./success_contact_form";
import axios from "axios";
import { supabase } from "@/app/utils/supabaseClient";
import EmailCaptureEditModal from "./EditEmailCaptureModal";
const EmailCaptureModal = ({
  setopen_contact_form,
  prop_email,
  prop_body,
  prop_image,
  prop_header,
  prop_button_text,
}: any) => {
  const [start_anime, setstart_anime] = useState(false);
  const [movement, setmovement] = useState(false);
  const [email, setemail] = useState(prop_email ? prop_email : "");
  const [name, setname] = useState("");
  const [tel, settel] = useState("");
  const [body, setbody] = useState(prop_body ? prop_body : "");
  const [isloggedin, setisloggedin] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  console.log(prop_image, "this is me ");
  useEffect(() => {
    // Save current overflow
    const originalOverflow = document.body.style.overflow;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Cleanup function: restore on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // check if logged in
  useEffect(() => {
    // Check initial session
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setisloggedin(true);
        console.log("this is what happens ");
      }
    };

    checkInitialSession();
  }, []);

  useEffect(() => {
    setstart_anime(true);
  }, []);

  const hide = () => {
    localStorage.setItem("emailModalStatus", "closed");

    setstart_anime(false);
    setTimeout(() => {
      setopen_contact_form(false);
    }, 400);
  };

  const [step, setstep] = useState(0);
  const [err, seterr] = useState("");
  const [disabled, setdisabled] = useState(false);
  const [sendbtn, setsendbtn] = useState(
    prop_button_text ? prop_button_text : "Submit"
  );

  const handle_submit = async (e: any) => {
    e.preventDefault();
    if (!email) {
      seterr("Please enter your email.");
      return;
    }

    seterr("");
    setsendbtn("Just a sec");
    setdisabled(true);

    try {
      const res = await axios.post(
        "https://api.convertkit.com/v3/forms/" +
          // process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID +
          "8014073" +
          "/subscribe",
        {
          // api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
          api_key: "llMFNtMPTflWuXCuciA6gw",
          email,
          first_name: name, // optional
          send_welcome_email: true, // ← This helps show them in dashboard
        }
      );

      if (res.data.subscription) {
        setsendbtn("Submitted");
        seterr(
          "Success! Please check your email to confirm your subscription."
        );
        localStorage.setItem("emailModalStatus", "submitted");

        // setstep(1);
        // console.log(res);
        setTimeout(() => {
          hide();
        }, 3000);
      } else {
        seterr("Failed to subscribe. Try again.");
        setdisabled(false);
        setsendbtn(prop_button_text ? prop_button_text : "Submit");
      }
    } catch (error) {
      console.error(error);
      seterr("Something went wrong. Try again.");
      setdisabled(false);
      setsendbtn("Submit");
    }
  };

  useEffect(() => {
    seterr("");
  }, [name, email, tel, body]);
  const handleEditSave = () => {
    // Optional: trigger toast or effect here
    setshowEdit(false); // close the modal
  };

  const handleEditClose = () => {
    setshowEdit(false);
  };

  return (
    <>
      <div
        style={{
          transition: "0.5s ease",
        }}
        className={` ${
          start_anime ? "bg-opacity-[69%] backdrop-blur-xl" : "bg-opacity-[0%]"
        } bg-black   h-[100vh] gap-[2rem]   justify-center flex items-center  w-full fixed top-0 left-0 z-[3000] `}
      >
        <div className="w-[3rem]   bg-[#F3F3F3] rounded-full absolute cursor-pointer h-fit  left-[50%] translate-x-[-50%] top-[1rem]">
          <Image
            src={exit}
            onClick={() => {
              hide();
            }}
            //   style={{ transition: "0.9s ease", opacity: start_anime ? 1 : 0 }}
            alt="exit"
          />
        </div>
        {step === 0 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ transition: "0.9s ease", opacity: start_anime ? 1 : 0 }}
            className="  mx-auto  md:w-[30rem] md:max-w-[70%] pt-[0.3rem] md:px-[0.3rem] px-[1%] py-[1rem] z-[10] w-[95%] relative bg-white gap-[1rem] flex flex-col  rounded-[2rem] "
          >
            <div className="w-full  aspect-[1/0.5] md:rounded-[1.5rem] rounded-[2rem] overflow-hidden ">
              <img
                src={
                  prop_image ? prop_image : "images/emailmarketing/face.webp"
                }
                alt="face"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" md:px-[1rem] px-[0.5rem] flex flex-col gap-[1rem]">
              <p
                className={`${Helvetica_bold.className} md:px-[0.7rem] text-xl text-center`}
              >
                {prop_header ? prop_header : "Get in touch"}
              </p>

              <p
                className={`text-sm  text-center ${Helvetica_light.className} `}
              >
                {prop_body
                  ? prop_body
                  : `   If you{"'"}re interested in booking Erica for an event,
                workshop, consulting, or collaborating as a social science
                researcher, let
                {"'"}s talk.`}
              </p>

              <form
                onSubmit={handle_submit}
                className={` ${Helvetica_light.className}  w-full flex flex-col items-center gap-[1rem] `}
              >
                <input
                  type="text"
                  className="bg-[#F0F0F0] focus:border border-none outline-none md:px-[4%] placeholder:text-[#000000] rounded-[1rem] h-[3.5rem]  px-[5%] w-full"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  value={email || ""}
                  autoComplete="email"
                  placeholder="Enter email"
                />

                {err && (
                  <p className="text-red-500 text-sm w-full text-start">
                    {err}
                  </p>
                )}
                <button
                  disabled={disabled}
                  style={{
                    whiteSpace: "nowrap",
                    transition: "0.5s ease",
                  }}
                  type="submit"
                  className={` ${Bricolage_grotesk_bold.className} uppercase overflow-hidden w-full  p-[0.45rem] rounded-full group hover:[#103210]   hover:bg-opacity-[20%]   bg-[black] backdrop-blur-2xl bg-opacity-[10%] `}
                >
                  <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] rounded-full  flex justify-center items-center py-[0.8rem] px-[4rem]">
                    <p className="inline-block  text-[white] group-hover:text-white">
                      {sendbtn}
                    </p>
                  </div>
                </button>

                {isloggedin && (
                  <button
                    style={{
                      whiteSpace: "nowrap",
                      transition: "0.5s ease",
                    }}
                    type="button"
                    onClick={() => {
                      setshowEdit(true);
                    }}
                    className={` ${Bricolage_grotesk_bold.className} uppercase overflow-hidden w-full  p-[0.45rem] rounded-full group hover:[#103210]   hover:bg-opacity-[20%]   bg-[black] backdrop-blur-2xl bg-opacity-[10%] `}
                  >
                    <div className="w-full h-full bg-[#440C0C] group-hover:bg-[#103210] rounded-full  flex justify-center items-center py-[0.8rem] px-[4rem]">
                      <p className="inline-block  text-[white] group-hover:text-white">
                        edit{" "}
                      </p>
                    </div>
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
        {/* <Success_contact_form
          step={step}
          setopen_contact_form={setopen_contact_form}
          setstep={setstep}
        /> */}
      </div>
      {isloggedin && showEdit && (
        <EmailCaptureEditModal
          onSave={handleEditSave}
          onClose={handleEditClose}
        />
      )}
    </>
  );
};

export default EmailCaptureModal;
