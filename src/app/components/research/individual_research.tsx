"use client";
import back from "../../../../public/images/research/back.png";

import {
  Bt_Beau_Regualr,
  Helvetica_light,
  Helvetica_medium,
  spline_font,
} from "@/app/utils/fonts";
import { supabase } from "@/app/utils/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Refer_edit from "../home/refer_edit";

const Individual_research = ({ product_data }: any) => {
  const [up_slugs, setup_Slugs] = useState<any>([]);
  const [down_slugs, setdown_Slugs] = useState<any>([]);

  useEffect(() => {
    // console.log(product_data[0].id);
    const fetchSlugs = async () => {
      const { data, error } = await supabase
        .from("research_blog")
        .select("slug")
        .order("created_at", { ascending: false })
        .gt("id", product_data[0].id);

      if (error) {
        console.error("Error fetching slugs:", error.message);
        throw new Error(error.message);
      }

      setup_Slugs(data);
    };

    fetchSlugs();
  }, [product_data]);

  useEffect(() => {
    // console.log(product_data[0].id);
    const fetchSlugs = async () => {
      const { data, error } = await supabase
        .from("research_blog")
        .select("slug")
        .order("created_at", { ascending: false })
        .lt("id", product_data[0].id);

      if (error) {
        console.error("Error fetching slugs:", error.message);
        throw new Error(error.message);
      }
      //   console.log(data);
      setdown_Slugs(data);
    };

    fetchSlugs();
  }, [product_data]);

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

  return (
    <>
      <div className=" md:pt-[10vw]  relative  pt-[25vw] p-4  bg-white ">
        {isloggedin && <Refer_edit text={"research"} />}

        <div className="pb-[4rem]  md:container mx-auto  w-full md:px-[3%] ">
          <button
            onClick={() => {
              router.back();
            }}
            className={`${Helvetica_light.className} flex items-center gap-[0.5rem] py-[0.5rem] hover:bg-[white] hover:border-black border px-[1rem] rounded-[1rem] capitalize bg-[#EDEDED] `}
          >
            <Image src={back} alt="back" className="w-[0.8rem] h-fit" />
            back
          </button>
        </div>
        <div className="w-full md:px-[3%] md:container md:flex-row flex-col mx-auto  bg-white flex md:justify-between md:gap-[10%] gap-[2rem]">
          <h1
            className={`${spline_font.className} text-4xl  w-full md:text-5xl lg:text-6xl font-bold`}
          >
            {product_data[0].title}
          </h1>

          <p
            className={`${Helvetica_medium.className} w-full text-[1rem] md:text-xl  `}
          >
            {product_data[0].caption}
          </p>
        </div>

        <div className="w-full relative md:w-[100rem] md:max-w-full  mx-auto  lg:h-[35rem] mt-[1.5rem] md:mt-[2rem] overflow-hidden md:h-[30rem] h-[19rem] ">
          <Image
            src={product_data[0].image}
            unoptimized
            height="0"
            width="0"
            className="w-full h-fit absolute absolute_center"
            alt={product_data[0].title}
          />
        </div>
        <div
          className={` ${Helvetica_light.className} md:container flex flex-col  mx-auto  pt-6 md:p-6 lg:p-12 bg-transparent text-dark-blue dark:text-white 
            [&_p]:text-[1rem]  [&_p]:text-[black] [&_p_md]:text-xl  [&_p]:leading-relaxed [&_p]:mb-4 
            [&_h1]:text-3xl [&_h1]:w-full [&_h1_md]:text-4xl [&_h1_lg]:text-5xl [&_h1]:font-bold [&_h1]:mb-4 
            [&_h2]:text-2xl [&_h2]:w-full [&_h2_md]:text-3xl [&_h2_lg]:text-4xl [&_h2]:font-bold [&_h2]:mb-4 
            [&_h3]:text-xl [&_h3]:w-full [&_h3_md]:text-2xl [&_h3_lg]:text-3xl [&_h3]:font-bold [&_h3]:mb-4 
            [&_h4]:text-lg [&_h4]:w-full [&_h4_md]:text-xl [&_h4_lg]:text-2xl [&_h4]:font-bold [&_h4]:mb-4 
            [&_h5]:text-base [&_h5]:w-full [&_h5_md]:text-lg [&_h5_lg]:text-xl [&_h5]:font-bold [&_h5]:mb-4 
            [&_h6]:text-sm [&_h6]:w-full [&_h6_md]:text-base [&_h6_lg]:text-lg [&_h6]:font-bold [&_h6]:mb-4 
            [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-5
            [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-5
            [&_li]:mb-6
            [&_table]:w-full [&_table]:border-collapse [&_table]:border 
            [&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-gray-200 [&_th]:text-left 
            [&_td]:border [&_td]:px-4 [&_td]:py-2
            [&_img]:inline [&_img]:m-2
            [&_a]:underline [&_a]:underline-offset-[5px] [&_a]:text-[#440C0C]
            `}
          dangerouslySetInnerHTML={{ __html: product_data[0].text }}
        ></div>

        <div
          className={`w-full  py-[3rem] flex gap-[10%] justify-center ${Bt_Beau_Regualr.className}`}
        >
          <button
            className="md:px-[2.5rem] md:py-[1rem]    rounded-[2rem] md:w-auto md:h-auto w-full py-[1.5rem] hover:bg-[#440C0C] hover:text-white border border-[#000000] "
            disabled={down_slugs.length >= 1 ? false : true}
            onClick={() => {
              router.push(`/research/${down_slugs[0].slug}`);
              //   console.log("still playing down", down_slugs);
            }}
          >
            {down_slugs.length >= 1 ? "" : "NO"} PREV POST{" "}
          </button>
          <button
            className="md:px-[2.5rem] md:py-[1rem]  rounded-[2rem] md:w-auto md:h-auto w-full hover:bg-[#440C0C] hover:text-white py-[1.5rem] border border-[#000000] "
            disabled={up_slugs.length >= 1 ? false : true}
            onClick={() => {
              //   router.push("/");
              router.push(`/research/${up_slugs[up_slugs.length - 1].slug}`);
              //   console.log("still playing out", up_slugs);
            }}
          >
            {up_slugs.length >= 1 ? "" : "NO"} NEXT POST{" "}
          </button>
        </div>
      </div>{" "}
    </>
  );
};

export default Individual_research;
// ${CabinetGrotesk_medium.className}
