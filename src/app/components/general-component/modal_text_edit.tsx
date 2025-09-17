"use client";

import { supabase } from "@/app/utils/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import example2 from "../../../../public/images/consultation/example2.png";
import { v4 } from "uuid";
import Image_list from "../general-component/image";

const Modal_text_edit = ({
  setedit_text,
  edit_text,
  record_Name,
  table,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [text, settext] = useState(edit_text);

  const submit_form = async () => {
    // Validation check
    const updateData = { [record_Name]: text };
    if (!text) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    let result;
    console.log("its adding");
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
      setedit_text("");
      window.location.reload();
    }
  };

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0  bg-black bg-opacity-[80%] md:bg-opacity-[50%] overflow-x-hidden overflow-y-scroll z-[1000] flex justify-center  items-center">
        <div className="bg-white md:px-[5%] justify-center md:rounded-[1vw]  md:py-[3vw] py-[10vw] w-[95%] px-[3%] md:w-[50vw]  rounded-[5vw] flex md:gap-[1vw] capitalize flex-col gap-[6vw]">
          {" "}
          <p className="md:text-[2vw] text-[8vw] text-center">edit text here</p>
          {/* title and image section */}
          <div className="md:flex-row gap-[4vw] flex-col flex md:items-end justify-center md:gap-[1vw]"></div>
          <div className="flex flex-col md:gap-[0.3vw] gap-[2vw]">
            <label
              className="capitalize md:text-[1vw] text-[3.5vw]"
              htmlFor="description"
            >
              Type Text here
            </label>
            {record_Name == "heading" ||
              (record_Name == "occupation" && (
                <p className="text-sm text-[red]">
                  Include {"<br/>"} tag to enter a new line
                </p>
              ))}{" "}
            <textarea
              //   type="text"
              id="description"
              rows={4}
              //   rows={50}
              value={text || ""}
              onChange={(e) => {
                settext(e.target.value);
              }}
              className="border  md:rounded-[1vw] rounded-[1.5vw]  outline-none bg-[black] bg-opacity-[70%] placeholder:text-white md:h-[10vw] h-[100vw]  text-white resize-none p-[2%] md:text-[1vw] text-[3.5vw]"
              placeholder="input text  here .."
            />
          </div>
          {/* the links for viewing */}
          {error && (
            <p className="text-red-500 md:text-[1vw] text-[3.5vw]">{error}</p>
          )}
          <div className="w-full md:pt-[2vw] flex justify-center gap-[5%]  md:gap-[4vw] ">
            <button
              className=" md:px-[4vw] md:w-auto w-full py-[2.6vw]  md:py-[0.5vw] capitalize bg-white  rounded-[2.5vw] md:rounded-[0.5vw] hover:bg-opacity-[60%] md:text-[1vw] text-[3.5vw] backdrop-blur-2xl text-center border-red-500 border"
              onClick={() => {
                setedit_text("");
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

export default Modal_text_edit;
