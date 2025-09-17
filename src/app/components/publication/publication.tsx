"use client";

import {
  Bt_Beau_Regualr,
  Helvetica_bold,
  Helvetica_light,
  Helvetica_medium,
} from "@/app/utils/fonts";
import React, { useEffect, useRef, useState } from "react";
import Edit_each_publication from "./edit_each_publication";
import Add_publication from "./add_publication";
import Delete_publication from "./delete_publication";
import Link from "next/link";
import Modal_add_publication from "./modal_add_publication";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Publication = ({ product_data }: any) => {
  const [data, setdata] = useState<any[]>(product_data ? product_data : []);
  const [start_anime, setstart_anime] = useState(false);
  const [isloggedin, setisloggedin] = useState(false);

  const [add_publication, setadd_publication] = useState(false);
  const [edit_ID, setedit_ID] = useState("");
  const [image_link, setimage_link] = useState("");
  const [sub_title, setsub_title] = useState("");

  useEffect(() => {
    setstart_anime(true);

    // resetServerContext();
  }, []);

  const itemsRefs = useRef<any>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("comeup");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 },
    );

    itemsRefs.current.forEach((ref: any) => {
      observer.observe(ref);
    });

    return () => {
      itemsRefs.current.forEach((ref: any) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);
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

  // this is to implement tracking
  // Set up real-time subscription
  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("publication")
        .select("*")
        .order("order", { ascending: false });

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setdata(data);
      }
    };

    // fetchInitialData();

    // Real-time subscription
    const handleInserts = (payload: any) => {
      console.log("Insert received!", payload);
      fetchInitialData();
      // window.location.reload();
    };

    const handleUpdates = (payload: any) => {
      console.log("Update received!", payload);
      // setdata((prevData) =>
      //   prevData.map((item) =>
      //     item.id === payload.new.id ? payload.new : item,
      //   ),
      // );
      fetchInitialData();
      // window.location.reload();
    };

    const handleDeletes = (payload: any) => {
      console.log("Delete received!", payload);
      setdata((prevData) =>
        prevData.filter((item) => item.id !== payload.old.id),
      );
    };

    const subscription = supabase
      .channel("publication_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "publication" },
        handleInserts,
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "publication" },
        handleUpdates,
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "publication" },
        handleDeletes,
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const onDragEnd = (result: any) => {
    // if (!result.destination) return; // Item not moved
    // const updatedData = Array.from(data);
    // const [reorderedItem] = updatedData.splice(result.source.index, 1);
    // updatedData.splice(result.destination.index, 0, reorderedItem);
    // setdata(updatedData);
    // Call backend to persist order
    // saveOrderToDatabase(updatedData);
  };

  // const saveOrderToDatabase = async (updatedData: any[]) => {
  //   try {
  //     const updates = updatedData.map((item, index) => ({
  //       id: item.id,
  //       order: updatedData.length - index,
  //     }));

  //     // Log the updates for debugging
  //     updatedData.forEach((item, index) =>
  //       console.log("order:" + item.order, index, item.sub_title),
  //     );

  //     // Upsert each update individually and collect promises
  //     const updatePromises = updates.map((update) =>
  //       supabase.from("publication").upsert(update),
  //     );

  //     // Wait for all updates to complete
  //     const results = await Promise.all(updatePromises);

  //     // Check for any errors in the results
  //     const hasErrors = results.some(({ error }) => error);
  //     if (hasErrors) {
  //       console.error("Some updates failed:", results);
  //     } else {
  //       console.log("All updates completed successfully");
  //       // Reload the page after successful updates
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error saving order to database:", error);
  //   }
  // };

  // const updateOrder = async () => {
  //   // Save the updated order to the database
  //   await saveOrderToDatabase(data);
  // };
  return (
    <>
      {/* add publication */}
      {isloggedin && (
        <Add_publication
          setadd_publication={setadd_publication}
          setedit_ID={setedit_ID}
        />
      )}

      {/* modal to add publications */}
      {add_publication && (
        <Modal_add_publication
          setadd_publication={setadd_publication}
          edit_ID={edit_ID}
        />
      )}

      {/* logged out users screen */}

      <div className="w-full py-[10vw]  md:py-[5vw]  px-[3%]  md:px-[10%]">
        <div className=" w-full flex flex-col md:gap-[1.5vw] gap-[5vw]">
          {data.map((e: any, index: any) => {
            return (
              <>
                <div
                  ref={(ref) => {
                    if (ref) {
                      itemsRefs.current[index] = ref;
                    }
                  }}
                  key={index}
                  className={`w-full  initial px-[4%] py-[8%] rounded-[5vw] md:flex-row flex-col  flex md:justify-between md:rounded-[1vw] md:px-[3vw] relative md:py-[1.5vw] bg-[#FEFAFA] bg-opacity-[62%] md:gap-[1vw] gap-[4vw] md:items-center`}
                >
                  {isloggedin && (
                    <Edit_each_publication
                      setedit_ID={setedit_ID}
                      id={e.id}
                      setadd_publdcication={setadd_publication}
                    />
                  )}
                  <div className="flex flex-col gap-[2vw] md:w-[50%] md:gap-[0.5vw]">
                    <h2
                      //   ref={hero_ref}
                      className={`${Helvetica_bold.className} text-[5vw] leading-[6vw] md:text-[1.3vw] md:leading-[2vw] uppercase text-[#440C0C]`}
                    >
                      {e.title}
                    </h2>
                    {/* Display the text after the period in a span */}
                    <p className="text-[#440C0C] md:text-[1vw] text-[4vw] opacity-[50%]">
                      {e.sub_title}
                    </p>
                    <p
                      className={`${Helvetica_light.className} md:text-[1.1vw] md:leading-[1.5vw] text-[4vw] leading-[5vw] text-[#a46035]`}
                    >
                      {e.description &&
                        e.description
                          .split("Boothby, E. J")
                          .map((part: string, index: number) => (
                            <React.Fragment key={index}>
                              {part}
                              {index <
                                e.description.split("Boothby, E. J").length -
                                  1 && (
                                <strong
                                  className={`${Helvetica_bold.className} text-[#440c0ccb]`}
                                >
                                  Boothby, E. J
                                </strong>
                              )}
                            </React.Fragment>
                          ))}{" "}
                    </p>
                  </div>

                  <div
                    className={`${Bt_Beau_Regualr.className} md:text-[1vw] gap-[4vw] text-[3.5vw] flex capitalize md:gap-[1vw]  items-center`}
                  >
                    {e.data_link && (
                      <Link
                        target="_blank"
                        href={`${e.data_link}`}
                        className=" md:rounded-[1.7vw] border-[#440C0C] border-[0.1vw]  bg-[#FEF6F6] flex justify-center items-center md:py-[0.8vw] md:px-[2vw] px-[6vw] py-[3vw] text-[#440C0C]  hover:bg-[white] rounded-[7vw]"
                      >
                        DATA
                      </Link>
                    )}{" "}
                    {e.pdf_link && (
                      <Link
                        target="_blank"
                        href={`${e.pdf_link}`}
                        className=" md:rounded-[1.7vw] border-[#440C0C]   md:border-[0.1vw] bg-[#440C0C] flex justify-center items-center md:py-[0.8vw] md:px-[2vw]  px-[6vw] py-[3vw] text-white hover:bg-[#C1A391] hover:border-[#C1A391] rounded-[7vw]"
                      >
                        PDF
                      </Link>
                    )}{" "}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* logged in users screeen including drag and drop screens  .I set it to false for the main time cause the client requestied i take out the function and i didnt want to delete it totally  */}
      {false && (
        <div className="w-full py-[10vw]  md:py-[5vw]  px-[3%]  md:px-[10%]">
          <div className=" w-full flex flex-col md:gap-[1.5vw] gap-[5vw]">
            {start_anime && (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="publications">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      className="flex flex-col md:gap-[1.5vw] gap-[5vw]"
                      ref={provided.innerRef}
                    >
                      {data.map((e: any, index: any) => {
                        return (
                          <>
                            <Draggable
                              key={e.id.toString()}
                              // draggableId={index.toString()}
                              draggableId={e.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  key={index}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`w-full ${
                                    !isloggedin ? "comeup initial" : ""
                                  }  px-[4%] py-[8%] rounded-[5vw] md:flex-row flex-col  flex md:justify-between md:rounded-[1vw] md:px-[3vw] relative md:py-[1.5vw] bg-[#FEFAFA] bg-opacity-[62%] md:gap-[1vw] gap-[4vw] md:items-center`}
                                >
                                  {isloggedin && (
                                    <Edit_each_publication
                                      setedit_ID={setedit_ID}
                                      id={e.id}
                                      setadd_publdcication={setadd_publication}
                                    />
                                  )}

                                  {/* the first section */}
                                  <div className="flex flex-col gap-[2vw] md:w-[50%] md:gap-[0.5vw]">
                                    <h2
                                      //   ref={hero_ref}
                                      className={`${Helvetica_bold.className} text-[5vw] leading-[6vw] md:text-[1.3vw] md:leading-[2vw] uppercase text-[#440C0C]`}
                                    >
                                      {e.title}
                                    </h2>
                                    {/* Display the text after the period in a span */}
                                    <p className="text-[#440C0C] md:text-[1vw] text-[4vw] opacity-[50%]">
                                      {e.sub_title}
                                    </p>
                                    <p
                                      className={`${Helvetica_light.className} md:text-[1.1vw] md:leading-[1.5vw] text-[4vw] leading-[5vw] text-[#a46035]`}
                                    >
                                      {e.description &&
                                        e.description
                                          .split("Boothby, E. J")
                                          .map(
                                            (part: string, index: number) => (
                                              <React.Fragment key={index}>
                                                {part}
                                                {index <
                                                  e.description.split(
                                                    "Boothby, E. J",
                                                  ).length -
                                                    1 && (
                                                  <strong
                                                    className={`${Helvetica_bold.className} text-[#440c0ccb]`}
                                                  >
                                                    Boothby, E. J
                                                  </strong>
                                                )}
                                              </React.Fragment>
                                            ),
                                          )}{" "}
                                    </p>
                                  </div>

                                  <div
                                    className={`${Bt_Beau_Regualr.className} md:text-[1vw] gap-[4vw] text-[3.5vw] flex capitalize md:gap-[1vw]  items-center`}
                                  >
                                    {e.data_link && (
                                      <Link
                                        target="_blank"
                                        href={`${e.data_link}`}
                                        className=" md:rounded-[1.7vw] border-[#440C0C] border-[0.1vw]  bg-[#FEF6F6] flex justify-center items-center md:py-[0.8vw] md:px-[2vw] px-[6vw] py-[3vw] text-[#440C0C]  hover:bg-[white] rounded-[7vw]"
                                      >
                                        DATA
                                      </Link>
                                    )}{" "}
                                    {e.pdf_link && (
                                      <Link
                                        target="_blank"
                                        href={`${e.pdf_link}`}
                                        className=" md:rounded-[1.7vw] border-[#440C0C]   md:border-[0.1vw] bg-[#440C0C] flex justify-center items-center md:py-[0.8vw] md:px-[2vw]  px-[6vw] py-[3vw] text-white hover:bg-[#C1A391] hover:border-[#C1A391] rounded-[7vw]"
                                      >
                                        PDF
                                      </Link>
                                    )}{" "}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          </>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Publication;
