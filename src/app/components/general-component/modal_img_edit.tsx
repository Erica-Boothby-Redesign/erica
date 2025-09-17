"use client";

import { supabase } from "@/app/utils/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import example2 from "../../../../public/images/consultation/example2.png";
import { v4 } from "uuid";
import Image_list from "../general-component/image";

const Modal_img_edit = ({
  setedit_img,
  edit_img,
  record_Name,
  btn_text,
  table,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [text, settext] = useState(edit_img);

  const submit_form = async () => {
    // Validation check
    const updateData = { [record_Name]: image_link };
    if (!text) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    let result;
    console.log("its adding", updateData);
    // Add new publication
    // console.log(edit_text, record_Name);
    const { data, error } = await supabase
      .from(table)
      .update(updateData)
      .eq("id", "1"); // Replace 'your_record_id' with the actual ID of the record you want to update

    // const { data, error } = result;
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setedit_img("");
      window.location.reload();
    }
  };

  const [open_img, setopen_img] = useState(false);
  const [image_link, setimage_link] = useState(edit_img);

  return (
    <>
      {open_img && (
        <Image_list setopen_img={setopen_img} setimage_link={setimage_link} />
      )}

      <div className="w-full h-full fixed top-0 left-0  bg-black bg-opacity-[80%] md:bg-opacity-[50%] overflow-x-hidden overflow-y-scroll z-[1000] flex justify-center  items-center">
        <div className="bg-white md:px-[5%] justify-center md:rounded-[1vw]  md:py-[3vw] py-[10vw] w-[95%] px-[3%] md:w-[50vw]  rounded-[5vw] flex md:gap-[1vw] capitalize flex-col gap-[6vw]">
          <p className="md:text-[2vw] text-[8vw] text-center">
            {" "}
            edit image here {btn_text && btn_text}
          </p>
          {/* title and image section */}
          <div className="md:flex-row gap-[4vw] flex-col flex md:items-end justify-center md:gap-[1vw]">
            <div className="flex w-full  md:gap-[1vw] gap-[5%] ">
              <button
                style={{ whiteSpace: "nowrap" }}
                className="  md:h-[3vw]  h-[13vw] w-full md:text-[0.9vw] md:px-[1.3vw] bg-[#103210] text-white md:rounded-[0.5vw] hover:bg-white hover:text-black  rounded-[2vw] hover:border-black border-[#103210] border"
                onClick={() => {
                  setopen_img(true);
                }}
              >
                {image_link ? "Replace" : "Choose"} media Image
              </button>
              {image_link && (
                <div className="md:h-[5vw]   h-[13vw] w-full md:rounded-[0.5vw] rounded-[2vw] relative overflow-hidden">
                  <Image
                    src={image_link}
                    unoptimized
                    width="0"
                    height="0"
                    alt="image link"
                    className="w-full  absolute  absolute_center h-fit"
                  />
                </div>
              )}
            </div>
          </div>
          {/* the links for viewing */}
          {error && (
            <p className="text-red-500 md:text-[1vw] text-[3.5vw]">{error}</p>
          )}
          <div className="w-full md:pt-[2vw] flex justify-center gap-[5%]  md:gap-[4vw] ">
            <button
              className=" md:px-[4vw] md:w-auto w-full py-[2.6vw]  md:py-[0.5vw] capitalize bg-white  rounded-[2.5vw] md:rounded-[0.5vw] hover:bg-opacity-[60%] md:text-[1vw] text-[3.5vw] backdrop-blur-2xl text-center border-red-500 border"
              onClick={() => {
                setedit_img(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={submit_form}
              disabled={loading}
              type="submit"
              className=" md:px-[4vw] md:w-auto w-full py-[2.6vw]  md:py-[0.5vw] capitalize text-white  rounded-[2.5vw] md:rounded-[0.5vw] hover:bg-opacity-[60%] md:text-[1vw] backdrop-blur-2xl text-center bg-red-500 border"
            >
              {loading ? "Uploading..." : "Confirm Upload"}{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal_img_edit;
