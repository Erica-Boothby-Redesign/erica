"use client";

import { Bt_Beau_Regualr } from "@/app/utils/fonts";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ham from "../../../../public/images/general/ham.png";
import Image from "next/image";
import Mobile_nav from "./mobile_nav";
import Edit_nav from "./edit_nav";
import { supabase } from "@/app/utils/supabaseClient";
import Contact_form from "./contact_form";

const Nav = () => {
  const [show_media, setshow_media] = useState(false);
  const [open_edit, setopen_edit] = useState(false);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data, error }: any = await supabase
  //       .from("nav")
  //       .select("*")
  //       .order("created_at", { ascending: false });
  //     setshow_media(data[0].media);
  //     return data;
  //   };

  //   fetchProducts();
  // }, [open_edit]);
  const items = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Publications",
      link: "/publications",
    },
    {
      text: "RESEARCH",
      link: "/research",
    },
    {
      text: "teaching & consultation",
      link: "/consultation",
    },
    {
      text: "MEDIA",
      link: "/media",
    },
  ];
  const items_right = [
    {
      text: "about me",
      link: "/about",
    },
    {
      text: "contact ",
      // link: "/contact",
      btn: true,
    },
  ];

  const mobile_nav = [
    {
      text: "View CV",
      // link: "/",
      href: "https://static1.squarespace.com/static/53dd6293e4b0d1d6aa7a2e72/t/64d3dc81cfc33c11b43dbb2a/1691606146249/Erica+Boothby+CV.pdf",
      button: true,
    },
  ];

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Your code that uses the window object
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("contact");

  useEffect(() => {
    if (search) {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [search]);

  const scroll_to_contact = () => {
    if (search) {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`?contact=${true}`);
    }
  };

  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  // THIS IS FOR DETERMINING THE WIDTH OF THE SCREEN
  const width = globalThis.innerWidth;
  useEffect(() => {
    setcalwidth(width);
  }, [width]);
  const handleResize = () => {
    setcalwidth(globalThis.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial call to set the width on component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  const [calwidth, setcalwidth] = useState(0);
  const [open_menu, setopen_menu] = useState(false);
  // const [isloggedin, setisloggedin] = useState(false);

  // // CHECK IF LOGGED IN
  // // check if logged in
  // useEffect(() => {
  //   // Check initial session
  //   const checkInitialSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     if (session) {
  //       setisloggedin(true);
  //     }
  //   };

  //   checkInitialSession();
  // }, [router]);

  const [open_contact_form, setopen_contact_form] = useState(false);

  return (
    <>
      <nav
        className={`${Bt_Beau_Regualr.className} flex  justify-between md:w-[80vw] w-full md:px-0 px-[3%] top-[5vw] z-[120]  items-center md:top-[2vw] fixed left-[50%] translate-x-[-50%]  `}
      >
        {/* desktop left section */}
        <div className=" md:flex hidden  ">
          {items.map((e: any, index: any) => {
            return (
              <Link
                href={e.link}
                style={{ whiteSpace: "nowrap" }}
                key={index}
                scroll={true} // 👈 forces scroll to top on navigation
                className={` ${
                  e.link == pathname ? "bg-[black]" : "bg-[white]"
                } uppercase overflow-hidden  md:p-[0.5vw] group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[1.5vw]  backdrop-blur-2xl bg-opacity-[20%] `}
              >
                <div
                  className={`w-full  ${
                    e.link == pathname ? "bg-[#103210]" : "bg-white"
                  } h-full  group-hover:bg-[#103210] md:rounded-[1.3vw] flex justify-center items-center  md:py-[0.6vw] md:px-[1.5vw]`}
                >
                  <p
                    className={`inline-block  ${
                      e.link == pathname ? "text-white" : "text-[#103210]"
                    }  md:text-[0.8vw] text-[#103210] group-hover:text-white`}
                  >
                    {e.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="overflow-hidden">
          {" "}
          <button
            onClick={() => {
              setopen_menu(true);
            }}
            style={{
              whiteSpace: "nowrap",
              // opacity: open_menu && calwidth < 768 ? 0 : "",
              transition: "0.25s ease",

              transform: open_menu && calwidth < 768 ? "translateY(100%)" : "",
            }}
            className={`uppercase overflow-hidden md:hidden inline-block bg-[white]   md:p-[0.4vw] p-[1.3vw] group hover:[#103210] duration-[1s] md:rounded-[1.5vw] rounded-[8vw]  backdrop-blur-2xl bg-opacity-[20%] `}
          >
            <div
              className={` bg-white group-hover:bg-white md:rounded-[1.3vw] rounded-[7vw] flex justify-center items-center   md:h-auto md:w-auto w-[25vw]  h-[10vw]   md:py-[0.7vw] md:px-[1.5vw]`}
            >
              <p className=" md:text-[0.8vw] text-[#103210] group-hover:text-[#440C0C] flex items-center justify-center gap-[10%] text-[3vw]">
                <Image
                  src={ham}
                  alt="hamburger img"
                  className=" w-[40%]  h-fit"
                />
                Menu
              </p>
            </div>
          </button>
        </div>
        {/* this is mobile ham buger */}

        <div className=" flex overflow-hidden">
          {items_right.map((e: any, index: any) => {
            return (
              <>
                {e.link && (
                  <Link
                    href={e.link}
                    scroll={true} // 👈 forces scroll to top on navigation
                    style={{
                      whiteSpace: "nowrap",
                      transition: "0.25s ease",

                      transform:
                        open_menu && calwidth < 768 ? "translateY(100%)" : "",
                      // opacity: open_menu && calwidth < 768 ? 0 : "",
                    }}
                    key={index}
                    className={`uppercase  overflow-hidden  ${
                      e.link == pathname ? " bg-[#440C0C] " : " bg-[#440C0C] "
                    }   md:p-[0.4vw] p-[1.3vw] group hover:[#103210] duration-[1s] md:rounded-[1.5vw] rounded-[8vw]  backdrop-blur-2xl bg-opacity-[10%] ${
                      open_menu ? "" : ""
                    } `}
                  >
                    <div
                      className={`  ${
                        e.link == pathname ? "bg-[#103210]" : "bg-[#440C0C] "
                      } group-hover:bg-white md:rounded-[1.3vw] rounded-[7vw] flex justify-center items-center  md:h-auto md:w-auto w-[25vw]  h-[10vw]  md:py-[0.7vw] md:px-[1.5vw]`}
                    >
                      <p className="inline-block md:text-[0.8vw] text-[white] group-hover:text-[#440C0C] text-[3vw]">
                        {e.text}
                      </p>
                    </div>
                  </Link>
                )}
                {e.btn && (
                  <button
                    // href={e.link}

                    style={{
                      whiteSpace: "nowrap",
                      transition: "0.25s ease",

                      transform:
                        open_menu && calwidth < 768 ? "translateY(100%)" : "",
                      // opacity: open_menu && calwidth < 768 ? 0 : "",
                    }}
                    onClick={() => {
                      // scroll_to_contact();
                      setopen_contact_form(true);
                    }}
                    key={index}
                    className={`uppercase overflow-hidden  ${
                      e.link == pathname ? " bg-[#440C0C] " : " bg-[#440C0C] "
                    }   md:p-[0.4vw] cursor-pointer p-[1.3vw] group hover:[#103210] duration-[1s] md:rounded-[1.5vw] rounded-[8vw]  backdrop-blur-2xl bg-opacity-[10%] `}
                  >
                    <div
                      className={`  ${
                        e.link == pathname ? "bg-[#103210]" : "bg-[#440C0C] "
                      } group-hover:bg-white md:rounded-[1.3vw] rounded-[7vw] flex justify-center items-center  md:h-auto md:w-auto w-[25vw]  h-[10vw]  md:py-[0.7vw] md:px-[1.5vw]`}
                    >
                      <p className="inline-block md:text-[0.8vw] text-[white] group-hover:text-[#440C0C] text-[3vw]">
                        {e.text}
                      </p>
                    </div>
                  </button>
                )}
              </>
            );
          })}
        </div>
        {/* THIS IS FOR THE LOGGED IN SESSION */}

        {/* {isloggedin && (
          <div className="w-full Z-[100]  absolute top-0 left-0 h-full flex justify-end items-start md:px-[0.5vw] md:gap-[1.5vw] px-[5vw]  text-[3.5vw] gap-[5vw] md:text-[1vw] capitalize bg-black bg-opacity-[50%]  md:rounded-[1vw]">
            <button
              className=" md:w-[8vw] md:h-[3vw] h-[10vw] w-[30vw] rounded-[2vw] capitalize bg-white  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center "
              onClick={() => {
              
                setopen_edit(true);
              }}
            >
              edit
            </button>
          </div>
        )} */}
      </nav>
      {open_menu && (
        <Mobile_nav
          setopen_menu={setopen_menu}
          items={items}
          show_media={show_media}
          mobile_nav={mobile_nav}
        />
      )}
      {/* {open_edit && <Edit_nav setopen_edit={setopen_edit} />} */}
      {open_contact_form && (
        <Contact_form setopen_contact_form={setopen_contact_form} />
      )}
    </>
  );
};

export default Nav;
