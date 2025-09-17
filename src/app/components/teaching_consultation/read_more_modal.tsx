"use client";

import {
  Bt_Beau_Regualr,
  Bt_Beau_medium,
  Helvetica_light,
  Media_san_regular,
} from "@/app/utils/fonts";
import { useEffect, useState } from "react";

const Read_more = ({ body, title, setopen_read_more }: any) => {
  const [start_anime, setstart_anime] = useState(false);
  const [start_text, setstart_text] = useState(false);
  useEffect(() => {
    setstart_anime(true);

    //    setTimeout(() => {
    //      setstart_text(true);
    //    }, 0);
  }, []);
  return (
    <>
      <div
        onClick={() => {
          setopen_read_more(false);
        }}
        className={`w-full h-full fixed  z-[100] top-0 left-0 bg-black bg-opacity-[70%] md:items-center flex justify-center`}
      >
        <div
          style={{ transition: "0.5s ease" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={` ${
            start_anime ? "" : "translate-y-[100vh]"
          } md:w-[50%] md:h-auto h-full w-full rounded-none  md:rounded-[1.2vw] py-[5vw] md:py-[2.5vw] md:gap-[1vw] gap-[5vw]  bg-white  flex flex-col`}
        >
          <div
            className={`w-full  md:pt-0 pt-[20vw] items-center px-[5%] flex justify-between`}
          >
            <h3
              className={` md:w-[50%] text-[6vw] w-[60%]  ${Media_san_regular.className} md:text-[1.3vw] md:leading-[1.4vw]`}
            >
              {title}
            </h3>
            <button
              onClick={() => {
                setopen_read_more(false);
              }}
              className={`md:text-[1.1vw] border-[0.3vw] rounded-[2vw] md:border-[0.1vw] md:py-[0.3vw] md:px-[1.2vw] px-[3vw] py-[1.3vw] border-black relative group overflow-hidden md:rounded-[0.4vw] flex justify-center items-center`}
            >
              <p
                style={{ transition: "0.5s ease" }}
                className="group-hover:text-[white] md:text-[1.1vw] text-[4vw] z-[13] text-[black]"
              >
                {" "}
                Close{" "}
              </p>

              <div
                className="w-full z-[5]  h-full bg-[#440C0C] absolute left-0 top-[100%] group-hover:top-0 "
                style={{ transition: "0.5s ease" }}
              ></div>
            </button>
          </div>
          <hr className="bg-[#D9D9D9] h-[0.15vw]" />
          <div className="md:overflow-hidden overflow-auto">
            <p
              dangerouslySetInnerHTML={{ __html: body }}
              className={` ${Helvetica_light.className} [&_a]:underline underline-offset-4 md:text-[1vw] px-[5%] text-[3.6vw] [&_a]:font-medium [&_a]:text-[#440C0C]`}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Read_more;
