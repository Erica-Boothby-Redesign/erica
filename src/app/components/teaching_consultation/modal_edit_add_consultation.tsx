"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Image_list from "../general-component/image";
import { supabase } from "@/app/utils/supabaseClient";
const Modal_edit_consulation = ({
  setadd_consulation,
  consultation_title,
  setconsultation_title,
  consultation_body,
  setconsultation_body,
  consultation_institute,
  setconsultation_institute,
  consultation_year,
  setconsultation_year,
  consultation_image_link,
  setconsultation_image_link,
  setconsulation_readmore_link,
  consulation_readmore_link,
  consultation_bg_color,
  setconsultation_bg_color,
  consultation_heading_text_color,
  setconsultation_heading_text_color,
  image_link,
  image_bg_link,
  setimage_link,
  edit_ID,
  setedit_ID,
  setimage_bg_link,
}: any) => {
  // title, background color, heading color , body, image
  // const [bg_color, setbg_color] = useColor("#000000");
  // const [textc_color, settextc_color] = useColor("#000000");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // console.log(consultation_bg_color);
  const [open_img, setopen_img] = useState(false);
  const [open_bg_img, setopen_bg_img] = useState(false);
  // this is to calculate for the width

  const [calWidth, setCalWidth] = useState(0);
  const width = globalThis.innerWidth;
  const handleResize = () => {
    setCalWidth(globalThis.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial call to set the width on component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  useEffect(() => {
    handleResize();
  }, [width]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // this is for upating the database
  const submit_form = async () => {
    // Validation check
    if (
      !consultation_title ||
      !consultation_body ||
      !consulation_readmore_link ||
      !consultation_institute ||
      !consultation_year ||
      !image_link ||
      !image_bg_link ||
      !consultation_bg_color ||
      !consultation_heading_text_color
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    // Parse the stringified JSON in the hex property, then extract the hex value
    // const heading_text_color = JSON.parse(
    //   consultation_heading_text_color.hex,
    // ).hex;
    // const bg_color = JSON.parse(consultation_bg_color.hex).hex;
    let result;
    if (edit_ID) {
      // Update existing publication
      result = await supabase
        .from("consultation")
        .update({
          img: image_link,
          link: consulation_readmore_link,
          text_color: consultation_heading_text_color,
          bg_color: consultation_bg_color,
          bg_img: image_bg_link,
          institue: consultation_institute,
          year: consultation_year,
          heading: consultation_title,
          body: consultation_body,
        })
        .eq("id", edit_ID);

      console.log(edit_ID);
    } else {
      console.log("its adding");
      const { data, error }: any = await supabase
        .from("consultation")
        .select("*");

      // Add new publication
      result = await supabase.from("consultation").insert([
        {
          img: image_link,
          link: consulation_readmore_link,
          text_color: consultation_heading_text_color,
          bg_color: consultation_bg_color,
          bg_img: image_bg_link,
          institue: consultation_institute,
          year: consultation_year,
          heading: consultation_title,
          body: consultation_body,
          order: data?.length + 1,
        },
      ]);
    }

    const { data, error } = result;
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setadd_consulation(false);
      // Optionally reset the form fields if adding a new publication

      setconsultation_title("");
      setconsultation_body("");
      setconsultation_institute("");
      setconsultation_year("");
      setconsultation_image_link("");
      setconsultation_bg_color((prevstate: any) => ({
        ...prevstate,
        hex: "#000000",
      }));
      setconsultation_heading_text_color((prevstate: any) => ({
        ...prevstate,
        hex: "#000000",
      }));
      setedit_ID("");
    }
  };

  return (
    <>
      {open_img && (
        <Image_list setopen_img={setopen_img} setimage_link={setimage_link} />
      )}
      {open_bg_img && (
        <Image_list
          setopen_img={setopen_bg_img}
          setimage_link={setimage_bg_link}
        />
      )}
      <div className="w-full   h-full flex py-[5vw]  justify-center items-start md:py-[5vw] overflow-x-hidden z-[1000] fixed top-0 left-0 bg-black bg-opacity-[60%] overflow-y-scroll md:px-[3%]">
        <div
          className="md:w-auto w-full gap-[5vw] py-[7vw]   bg-white md:p-[2vw] justify-between flex flex-col md:h-auto md:gap-[1vw] md:rounded-[2vw]
        "
        >
          <p className="md:text-[2vw] capitalize text-[7vw] text-center">
            {" "}
            {consultation_title ? "edit" : "Add new"} consultation here
          </p>{" "}
          <div className=" flex gap-[10vw]   justify-center md:flex-row flex-col   md:w-fit md:gap-[3vw]">
            {/* the color section */}
            <div className="flex w-full    md:w-fit  md:text-[1vw] text-[3.5vw]   capitalize md:gap-[2vw]">
              <div className="flex flex-col gap-[3vw] md:gap-[1vw] text-center">
                <p className="">select backgroundColor here</p>
                <ColorPicker
                  hideInput={["rgb", "hsv"]}
                  height={calWidth < 768 ? 100 : 200}
                  color={consultation_bg_color}
                  onChange={setconsultation_bg_color}
                />
              </div>
              <div className="flex flex-col gap-[3vw] md:gap-[1vw] text-center">
                <p className="">select title color here </p>
                <ColorPicker
                  hideInput={["rgb", "hsv"]}
                  color={consultation_heading_text_color}
                  height={calWidth < 768 ? 100 : 200}
                  onChange={setconsultation_heading_text_color}
                />
              </div>
            </div>

            {/* the text section */}
            <div className=" flex md:w-[50%] gap-[5vw] w-full md:px-0 px-[3%]  flex-col md:gap-[1.5vw]">
              <div className="   gap-[4vw] flex-col flex md:items-end justify-center md:gap-[1vw]">
                <div className="flex w-full flex-col md:gap-[0.3vw] gap-[2vw]">
                  <label
                    htmlFor="title"
                    className="capitalize md:text-[1vw] text-[3.5vw]"
                  >
                    consulation title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={consultation_title || ""}
                    onChange={(e) => {
                      setconsultation_title(e.target.value);
                    }}
                    className="border rounded-[1vw] outline-none bg-[black] bg-opacity-[70%] placeholder:text-white placeholder:text-opacity-[50%] capitalize text-white md:h-[3vw] h-[8vw] px-[3%]  md:text-[1vw] text-[3.5vw]"
                    placeholder="Eg : NEGOTIATION COURSE , WORKSHOPS . . ."
                  />
                </div>

                {/* these are for the buttons */}
                <div className="w-full flex md:flex-row flex-col gap-[3vw]  ">
                  <div className="flex w-full md:h-[3vw]  h-[10vw]  ">
                    <button
                      style={{ whiteSpace: "nowrap" }}
                      className="  h-full w-full md:text-[0.7vw] md:px-[1.3vw] bg-[#103210] text-white md:rounded-[0.5vw] hover:bg-white hover:text-black text-[3.5vw]  rounded-[2vw] hover:border-black border-[#103210] border"
                      onClick={() => {
                        setopen_img(true);
                      }}
                    >
                      {image_link ? "Replace" : "Choose"} institue image
                    </button>
                    {/* {} */}
                    {image_link && (
                      <div className="h-full w-full md:rounded-[0.5vw] rounded-[2vw] relative overflow-hidden">
                        <img
                          src={image_link}
                          alt="image link"
                          className="w-full  absolute  absolute_center h-fit"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex border2 w-full md:h-[3vw]  h-[10vw]  ">
                    <button
                      style={{ whiteSpace: "nowrap" }}
                      className="  h-full w-full md:text-[0.7vw] md:px-[1.3vw] bg-[#103210] text-white md:rounded-[0.5vw] hover:bg-white hover:text-black text-[3.5vw]  rounded-[2vw] hover:border-black border-[#103210] border"
                      onClick={() => {
                        setopen_bg_img(true);
                      }}
                    >
                      {image_bg_link ? "Replace" : "Choose"} bg Image
                    </button>
                    {image_bg_link && (
                      <div className="h-full w-full md:rounded-[0.5vw] rounded-[2vw] relative overflow-hidden">
                        <img
                          src={image_bg_link}
                          alt="image link"
                          className="w-full  absolute  absolute_center h-fit"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:mt-0 mt-[5vw] md:gap-[0.3vw] gap-[2vw]">
                <label
                  htmlFor="description"
                  className="capitalize md:text-[1vw] text-[3.5vw]"
                >
                  Consultation Description
                  <br />
                  <button
                    onClick={handleOpenModal}
                    className="ml-2 text-blue-500 underline"
                  >
                    Click here for instructions
                  </button>
                </label>

                <textarea
                  //   type="text"
                  id="description"
                  rows={5}
                  //   rows={50}
                  value={consultation_body || ""}
                  onChange={(e) => {
                    setconsultation_body(e.target.value);
                  }}
                  className="border resize-none rounded-[1vw] outline-none bg-[black] bg-opacity-[70%] placeholder:text-white placeholder:text-opacity-[50%]  p-[3%] capitalize text-white  md:p-[2%] md:text-[1vw] text-[3.5vw]"
                  placeholder="Eg : Erica is a consultant with <a href='Link_To_Behavioralize'> Behavioralize </a> , a data-driven company that applies behavioral science to understand and influence customer and managerial decision making, helping companies drive growth by identifying and solving their key behavioral challenges .."
                />
              </div>

              {/*  the read more link, the institute and the year */}
              <div className="  w-full flex md:flex-nowrap flex-wrap md:gap-[2vw] gap-[2%]  justify-between">
                {/* the institure link */}
                <div className="flex flex-col md:gap-[0.3vw] gap-[2vw] md:w-full w-[48%]">
                  <label
                    htmlFor="institute"
                    className="capitalize md:text-[1vw] text-[3.5vw]"
                  >
                    Institute
                  </label>
                  <input
                    type="text"
                    value={consultation_institute || ""}
                    id="institute"
                    onChange={(e) => {
                      setconsultation_institute(e.target.value);
                    }}
                    className="border rounded-[0.5vw]  w-full outline-none bg-[black] bg-opacity-[70%] placeholder:text-white placeholder:text-opacity-[50%] capitalize text-white md:h-[3vw] h-[8vw] px-[3%] md:text-[1vw] text-[3.5vw]"
                    placeholder="Eg : Wharton University, Wet Cement  .."
                  />
                </div>
                {/* the year  */}
                <div className="flex flex-col md:gap-[0.3vw] gap-[2vw] md:w-full w-[48%]">
                  <label
                    htmlFor="year"
                    className="capitalize md:text-[1vw] text-[3.5vw]"
                  >
                    year
                  </label>
                  <input
                    type="text"
                    id="year"
                    onChange={(e) => {
                      setconsultation_year(e.target.value);
                    }}
                    value={consultation_year || ""}
                    className="border rounded-[0.5vw] outline-none  w-full bg-[black] bg-opacity-[70%] placeholder:text-white placeholder:text-opacity-[50%] capitalize text-white md:h-[3vw] h-[8vw] px-[3%] md:text-[1vw] text-[3.5vw]"
                    placeholder="Eg : 2023, 2024.."
                  />
                </div>
                {/* the readmore link */}
                <div className="flex flex-col md:gap-[0.3vw] gap-[2vw] md:w-full w-[100%] md:mt-0 mt-[4vw]">
                  <label
                    htmlFor="year"
                    className="capitalize md:text-[1vw] text-[3.5vw]"
                  >
                    Read more link
                  </label>
                  <input
                    type="text"
                    id="year"
                    onChange={(e) => {
                      setconsulation_readmore_link(e.target.value);
                    }}
                    value={consulation_readmore_link || ""}
                    className="border rounded-[0.5vw] outline-none bg-[black] bg-opacity-[70%] placeholder:text-white placeholder:text-opacity-[50%] normal-case text-white md:h-[3vw] h-[8vw] px-[3%] md:text-[1vw] text-[3.5vw]"
                    placeholder="Eg : https://www.eric.com/consulation "
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-500 md:text-[1vw] text-[3.5vw]">
                  {error}
                </p>
              )}
            </div>
          </div>
          {/* the buttons for call to action */}
          <div className="w-full md:pt-[2vw] md:px-0 gap-[5%] px-[3%] flex justify-center  md:gap-[4vw] ">
            <button
              className=" md:px-[4vw] md:w-auto w-full md:h-auto h-[10vw] md:py-[0.5vw]capitalize bg-white  md:rounded-[0.5vw] hover:bg-opacity-[60%] md:text-[1vw] text-[3.5vw] backdrop-blur-2xl text-center border-red-500 border"
              onClick={() => {
                // setadd_publdcication(false);
                setadd_consulation(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" md:px-[4vw] md:py-[0.5vw] md:w-auto w-full md:h-auto h-[10vw] capitalize text-white  md:rounded-[0.5vw] hover:bg-opacity-[60%] md:text-[1vw] text-[3.5vw] backdrop-blur-2xl text-center bg-red-500 border"
              onClick={submit_form}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Consultation"}{" "}
            </button>
          </div>
        </div>
      </div>

      {/* more instructions modal */}
      {isModalOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 flex items-center justify-center z-[2000] bg-gray-900 bg-opacity-50  top-0 left-0"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white p-6 text-[3.5vw] rounded-md shadow-md w-11/12 md:w-1/2"
          >
            <h2 className=" font-bold mb-4 md:text-[1.2vw]">
              How to Add Links
            </h2>
            <p className="text-red-500 md:text-[1vw] text-[3.5vw]">Note:</p>
            <p className="md:text-[0.9vw]">
              Please use the following HTML tag to add hyperlinks within your
              description.
            </p>
            <p className="md:text-[0.9vw] normal-case mt-2">
              Example:
              <br />
              {'<a href="LINK_TO_WET_CEMENT">Wet Cement</a>'}
              <br />
              In this example, {'"Wet Cement"'} will appear as a clickable link
              that redirects to the specified URL.
            </p>
            <p className=" normal-case md:text-[0.9vw] mt-2">
              To add your own link, replace {'"ADD_LINK_HERE"'} with the desired
              URL and {'"ADD_TEXT_HERE"'} with the text you want to display.
              <br />
              <span className="font-bold">
                {'<a href="ADD_LINK_HERE"> ADD_TEXT_HERE </a>'}
              </span>
            </p>
            <button
              onClick={handleCloseModal}
              className="md:mt-[1vw] mt-[5vw] md:px-[2.3vw] py-[2vw] px-[7vw] md:py-[0.7vw] bg-red-500 text-white md:rounded-[1vw]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal_edit_consulation;
