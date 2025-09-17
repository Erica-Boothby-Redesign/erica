"use client";

import {
  Helvetica_light,
  Helvetica_medium,
  spline_font,
} from "@/app/utils/fonts";
import arrow from "../../../../public/images/contact/arrow.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal_text_edit from "./modal_text_edit";
import { supabase } from "@/app/utils/supabaseClient";
import Edit_text from "./edit_text";
import Contact_form from "./contact_form";

const Contact = ({ product_data }: any) => {
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
  const [active_user_data, setactive_user_data] = useState(product_data);

  const [edit_text, setedit_text] = useState(false);
  const [record_Name, setrecord_Name] = useState("");

  // for tracking
  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("contact")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setactive_user_data(data);
        console.log("this is from eididdkkkkkkkkkk");
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
      .channel("contact_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact" },
        handleInserts,
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "contact" },
        handleUpdates,
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "contact" },
        handleDeletes,
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const [email, setemail] = useState("");
  const [body, setbody] = useState("");

  const [open_contact_form, setopen_contact_form] = useState(false);
  return (
    <>
      {edit_text && (
        <Modal_text_edit
          edit_text={edit_text}
          record_Name={record_Name}
          setedit_text={setedit_text}
          table={"contact"}
        />
      )}
      <div
        id="contact"
        className="w-full  md:py-[6vw] flex md:flex-row flex-col px-[3%] py-[20vw]  justify-between items-start md:px-[14vw] gap-[10vw]"
      >
        {/* the left section */}
        <div className="flex flex-col gap-[4vw] md:w-[30vw]  md:gap-[2vw]">
          <h3
            className={`${spline_font.className} font-semibold md:text-[4.4vw] text-[#5C3C43] uppercase relative md:leading-[4.4vw] text-[12vw] leading-[13vw]`}
          >
            {isloggedin && (
              <Edit_text
                record={"title"}
                setedit_text={setedit_text}
                setrecord_Name={setrecord_Name}
                text={active_user_data[0].title}
              />
            )}
            {active_user_data[0].title || ""}
          </h3>
          <p
            className={`text-[#000000] relative md:pr-0 pr-[5%] ${Helvetica_light.className} md:text-[1.2vw] text-[5vw] md:leading-[1.5vw] leading-[6vw]`}
          >
            {isloggedin && (
              <Edit_text
                record={"caption"}
                setedit_text={setedit_text}
                setrecord_Name={setrecord_Name}
                text={active_user_data[0].caption}
              />
            )}
            {active_user_data[0].caption || ""}
          </p>
        </div>

        {/* the right section , and i mean the input section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setopen_contact_form(true);
          }}
          className={` ${Helvetica_light.className} relative md:w-[30vw]     flex flex-col md:gap-[2vw]  w-full gap-[10vw] `}
        >
          <div className="relative">
            {isloggedin && (
              <Edit_text
                record={"placeholder_email"}
                setedit_text={setedit_text}
                setrecord_Name={setrecord_Name}
                text={active_user_data[0].placeholder_email}
              />
            )}
            <input
              type="email"
              autoComplete="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email || ""}
              placeholder={active_user_data[0].placeholder_email || ""}
              className=" outline-none border-b-[0.2vw] border-opacity-[40%] border-[#000000] md:pb-[0.7vw] w-full h-[13vw] pb-[1vw] md:h-[4vw] bg-transparent md:pl-[0.5vw] pl-[1.7vw] focus:border-[#103210] focus:border-opacity-[100%] transition duration-[0.6s] md:pr-[5vw] placeholder:text-[#000000] md:text-[1.2vw] text-[4vw]"
            />
          </div>
          <div className="relative  w-full md:h-[8vw] h-[27vw] ">
            {isloggedin && (
              <Edit_text
                record={"placeholder_body"}
                setedit_text={setedit_text}
                setrecord_Name={setrecord_Name}
                text={active_user_data[0].placeholder_body}
              />
            )}
            <textarea
              // type="text"
              value={body || ""}
              onChange={(e) => {
                setbody(e.target.value);
              }}
              placeholder={active_user_data[0].placeholder_body || ""}
              className=" outline-none  border-b-[0.2vw] border-opacity-[40%] border-[#000000] md:pb-[0.7vw] w-full h-full bg-transparent md:pl-[0.5vw] pb-[2vw] pl-[1.7vw] focus:border-[#103210] focus:border-opacity-[100%] transition duration-[0.6s] md:pr-[5vw] pr-[17vw] placeholder:text-[#000000] md:text-[1.2vw] text-[4vw] resize-none"
            ></textarea>

            <button
              type="submit"
              className={`absolute top-[50%] translate-y-[-50%] right-[5%]`}
            >
              <Image
                src={arrow}
                alt="arrow"
                className="md:w-[3vw] w-[10vw] h-fit"
              />
            </button>
          </div>
        </form>
      </div>

      {open_contact_form && (
        <Contact_form
          prop_body={body}
          prop_email={email}
          setopen_contact_form={setopen_contact_form}
        />
      )}
    </>
  );
};

export default Contact;
