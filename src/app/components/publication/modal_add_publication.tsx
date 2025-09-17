"use client";

import { supabase } from "@/app/utils/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import example2 from "../../../../public/images/consultation/example2.png";
import { v4 } from "uuid";
import Image_list from "../general-component/image";

const Modal_add_publication = ({ setadd_publication, edit_ID }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [publication_title, setpublication_title] = useState("");
  const [publication_body, setpublication_body] = useState("");
  const [publication_data_link, setpublication_data_link] = useState("");
  const [publication_pdf_link, setpublication_pdf_link] = useState(" ");
  const [image_link, setimage_link] = useState("");
  const [sub_title, setsub_title] = useState("");
  const [order, setorder] = useState("");
  const [data_array, setdata_array] = useState<any>([]);

  // useeffect for fetching data

  const fetch_data = async () => {
    const { data, error }: any = await supabase.from("publication").select("*");
    setdata_array(data);
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      if (edit_ID) {
        // Set loading states for the form fields
        setpublication_title("loading...");
        setsub_title("loading...");
        setpublication_body("loading...");
        setpublication_data_link("loading...");
        setpublication_pdf_link("loading...");
        setimage_link("");
        setorder("loading...");
        fetch_data();
        try {
          const { data, error } = await supabase
            .from("publication")
            .select("*")
            .eq("id", edit_ID)
            .single(); // Fetch a single record

          if (error) {
            console.error("Error fetching initial data:", error);
            setError("Failed to fetch data. Please try again.");
          } else if (data) {
            // Update state with fetched data
            setpublication_title(data.title || "");
            setsub_title(data.sub_title || "");
            setpublication_body(data.description || "");
            setpublication_data_link(data.data_link || "");
            setpublication_pdf_link(data.pdf_link || "");
            setimage_link(data.image_link || "");
            setorder(data.order || "");
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        // Reset form fields if no edit_ID is provided
        setpublication_title("");
        setsub_title("");
        setpublication_body("");
        setpublication_data_link("");
        setpublication_pdf_link("");
        setimage_link("");
        setError("");
        setorder("");
        fetch_data();
      }
    };

    fetchInitialData();
  }, [edit_ID]);

  const submit_form = async () => {
    // Validation check
    if (
      !publication_title ||
      !publication_body ||
      !image_link ||
      !sub_title ||
      !order
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    let result;
    if (edit_ID) {
      // Update existing publication
      result = await supabase
        .from("publication")
        .update({
          title: publication_title,
          description: publication_body,
          data_link: publication_data_link,
          pdf_link: publication_pdf_link,
          image_link: image_link,
          sub_title: sub_title,
          order: order,
        })
        .eq("id", edit_ID);

      console.log(edit_ID);
    } else {
      console.log("its adding");
      // Add new publication

      result = await supabase.from("publication").insert([
        {
          title: publication_title,
          description: publication_body,
          data_link: publication_data_link,
          pdf_link: publication_pdf_link,
          image_link: image_link,
          sub_title: sub_title,
          order: order,
        },
      ]);
    }

    const { data, error } = result;
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setadd_publication(false);
      // Optionally reset the form fields if adding a new publication

      setpublication_title("");
      setpublication_body("");
      setpublication_data_link("");
      setpublication_pdf_link("");
      setimage_link("");
    }
  };

  const [open_img, setopen_img] = useState(false);
  return (
    <>
      {open_img && (
        <Image_list setopen_img={setopen_img} setimage_link={setimage_link} />
      )}

      <div className="w-full h-full  overflow-y-scroll fixed  top-0 left-0 bg-black bg-opacity-[80%] md:bg-opacity-[50%] z-[1000] ">
        <div className="w-full  py-[4rem]   flex justify-center  ">
          <div className="bg-white md:px-[5%] justify-center  md:rounded-[1vw] py-[2rem] w-[95%] px-[3%] md:w-[50vw]  rounded-[2vw] flex md:gap-[1vw] capitalize flex-col gap-[6vw]">
            <p className="md:text-[2vw] text-[8vw] text-center">
              {" "}
              {edit_ID ? "edit" : "Add new"} publication here
            </p>
            {/* title and image section */}
            <div className="md:flex-row gap-[4vw] flex-col flex md:items-end justify-center md:gap-[1vw]">
              <div className="flex flex-col w-full md:gap-[0.3vw] gap-[2vw]">
                <label
                  className="capitalize md:text-[1vw]  text-[3.5vw]"
                  htmlFor="title"
                >
                  Publication title
                </label>
                <input
                  type="text"
                  id="title"
                  value={publication_title || ""}
                  onChange={(e) => {
                    setpublication_title(e.target.value);
                  }}
                  className="border md:rounded-[1vw] outline-none bg-[black] bg-opacity-[70%] h-[10vw] rounded-[1.5vw]  placeholder:text-white capitalize text-white md:h-[3vw] px-[3%] md:text-[1vw] text-[3.5vw]"
                  placeholder="type in publication title here .."
                />
              </div>{" "}
              <div className="flex w-full md:h-[3vw]  h-[13vw] md:gap-[1vw] gap-[5%] ">
                <button
                  style={{ whiteSpace: "nowrap" }}
                  className="  h-full w-full md:text-[0.7vw] md:px-[1.3vw] bg-[#103210] text-white md:rounded-[0.5vw] hover:bg-white hover:text-black  rounded-[2vw] hover:border-black border-[#103210] border"
                  onClick={() => {
                    setopen_img(true);
                  }}
                >
                  {image_link ? "Replace" : "Choose"} BG Image
                </button>
                {image_link && (
                  <div className="h-full w-full md:rounded-[0.5vw] rounded-[2vw] relative overflow-hidden">
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

            <div className="w-full md:items-stretch md:flex-row flex-col  flex gap-[5%] ">
              <div className="flex w-full flex-col md:gap-[0.3vw] gap-[2vw]">
                <label
                  className="capitalize md:text-[1vw] text-[3.5vw]"
                  htmlFor="description"
                >
                  Publication sub-title
                </label>
                <input
                  id="description"
                  type="text"
                  value={sub_title || ""}
                  onChange={(e) => {
                    setsub_title(e.target.value);
                  }}
                  className="border md:rounded-[1vw] outline-none bg-[black] bg-opacity-[70%] h-[10vw] rounded-[1.5vw]  placeholder:text-white capitalize text-white md:h-[3vw] px-[3%] md:text-[1vw] text-[3.5vw]"
                  placeholder="input publication description here .."
                />
              </div>
              <div className="flex w-full  flex-col md:gap-[0.3vw] gap-[2vw]">
                <label
                  className="capitalize md:text-[1vw] text-[3.5vw]"
                  htmlFor="order"
                >
                  Order{" "}
                  {data_array.length &&
                    `(1-${
                      edit_ID ? data_array.length : data_array.length + 1
                    }, with ${
                      edit_ID ? data_array.length : data_array.length + 1
                    } highest)`}
                </label>
                <input
                  id="order"
                  type="number"
                  value={order || ""}
                  onChange={(e) => {
                    setorder(e.target.value);
                  }}
                  className="border   md:rounded-[1vw] h-full rounded-[1.5vw]  outline-none bg-[black] bg-opacity-[70%] placeholder:text-white capitalize text-white resize-none p-[2%] md:text-[1vw] text-[3.5vw]"
                  placeholder="input order here"
                />
              </div>
            </div>
            <div className="flex flex-col md:gap-[0.3vw] gap-[2vw]">
              <label
                className="capitalize md:text-[1vw] text-[3.5vw]"
                htmlFor="description"
              >
                Publication description
              </label>
              <textarea
                //   type="text"
                id="description"
                rows={4}
                //   rows={50}
                value={publication_body || ""}
                onChange={(e) => {
                  setpublication_body(e.target.value);
                }}
                className="border  md:rounded-[1vw] rounded-[1.5vw]  outline-none bg-[black] bg-opacity-[70%] placeholder:text-white capitalize text-white resize-none p-[2%] md:text-[1vw] text-[3.5vw]"
                placeholder="input publication description here .."
              />
            </div>

            {/* the links for viewing */}
            <div className="w-full flex md:gap-[2vw]  justify-between">
              {/* the data link */}
              <div className="flex flex-col md:gap-[0.3vw] gap-[2vw] w-full">
                <label
                  className="capitalize md:text-[1vw] text-[3.5vw]"
                  htmlFor="data_link"
                >
                  view data link
                </label>
                <input
                  type="text"
                  value={publication_data_link || ""}
                  id="data_link"
                  onChange={(e) => {
                    setpublication_data_link(e.target.value);
                  }}
                  className="border md:rounded-[0.5vw] outline-none bg-[black] bg-opacity-[70%] placeholder:text-white capitalize text-white md:h-[3vw] w-full h-[10vw] rounded-[1.5vw] px-[3%] md:text-[1vw] text-[3.5vw]"
                  placeholder="input your data link here .."
                />
              </div>
              {/* the download link */}
              <div className="flex flex-col md:gap-[0.3vw] gap-[2vw] w-full">
                <label
                  className="capitalize md:text-[1vw] text-[3.5vw]"
                  htmlFor="pdf_link"
                >
                  view pdf link
                </label>
                <input
                  type="text"
                  id="pdf_link"
                  onChange={(e) => {
                    setpublication_pdf_link(e.target.value);
                  }}
                  value={publication_pdf_link || ""}
                  className="border md:rounded-[0.5vw] outline-none bg-[black] bg-opacity-[70%] placeholder:text-white capitalize text-white md:h-[3vw] w-full h-[10vw] rounded-[1.5vw] px-[3%] md:text-[1vw] text-[3.5vw]"
                  placeholder="input your pdf download link here .."
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 md:text-[1vw] text-[3.5vw]">{error}</p>
            )}
            <div className="w-full md:pt-[2vw] flex justify-center gap-[5%]  md:gap-[4vw] ">
              <button
                className=" md:px-[4vw] md:w-auto w-full py-[2.6vw]  md:py-[0.5vw] capitalize bg-white  rounded-[2.5vw] md:rounded-[0.5vw] hover:bg-opacity-[60%] md:text-[1vw] text-[3.5vw] backdrop-blur-2xl text-center border-red-500 border"
                onClick={() => {
                  setadd_publication(false);
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
      </div>
    </>
  );
};

export default Modal_add_publication;
