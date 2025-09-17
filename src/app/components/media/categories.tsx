"use client";

import { spline_font } from "@/app/utils/fonts";
import { useEffect, useRef, useState } from "react";
import example from "../../../../public/images/media/example.webp";
import Image from "next/image";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Edit_each_category from "./edit_each_catgory";
import Modal_edit_category from "./modal_edit_category";
import Add_media from "./add_media";
import { supabase } from "@/app/utils/supabaseClient";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// import { useRouter } from "next/router";

const Categories = ({ product_data }: any) => {
  const [groupedItems, setGroupedItems] = useState<any>([]);
  const [copy_data, setcopy_data] = useState<any>(product_data);
  const categories = ["News Article", "podcast", "video", "Media Outlet"];
  const groupByCategory = (items: any, categories: any) => {
    return categories.map((category: any) => ({
      title: category,
      body: items.filter((item: any) => item.type == category),
    }));
  };

  useEffect(() => {
    const grouped = groupByCategory(product_data, categories);
    setGroupedItems(grouped);

    console.log(grouped);
  }, []);
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("id");

  const handleClick = (id: any) => {
    router.push(`media/?id=${id}`);
  };

  useEffect(() => {
    console.log(search);
    setactive(search);
  }, [search]);

  useEffect(() => {
    // const { scrollTo } = router.;

    if (search) {
      const element = document.getElementById(search);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [search]);

  const [active, setactive] = useState<any>("");
  const items = [
    {
      title: "podcast",
      body: [
        {
          img: example,
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
          link: "/",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
      ],
    },
    {
      title: "NEWS ARTICLE",
      body: [
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
      ],
    },
    {
      title: "MEDIA OUTLET",
      body: [
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
        {
          img: example,
          link: "/",
          caption:
            "Professor Erica Boothbys graduate seminar on the Ethica Implications of AI was both thought-provoking and enlightening",
        },
      ],
    },
  ];

  //   for tracking the major categories
  const itemsRefs = useRef<any>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemsRefs.current.findIndex(
            (ref: any) => ref === entry.target,
          );
          if (entry.isIntersecting && index !== -1) {
            // console.log("Item is in view, Index:", index);
            setactive(index);
            // Perform any action you need here when item comes into view
          }
        });
      },
      { threshold: 0.1 },
    );

    itemsRefs.current.forEach((ref: any) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemsRefs.current.forEach((ref: any) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  //   for tracking minor categories
  const subItemsRefs = useRef<any[]>([]);

  useEffect(() => {
    subItemsRefs.current.forEach((subItemRefs) => {
      subItemRefs.forEach((ref: any) => {
        if (ref) {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              ref.classList.add("media_comeup");
              observer.unobserve(ref);
            }
          }, {});

          observer.observe(ref);
        }
      });
    });
  }, [subItemsRefs]);

  // THE CMS LOGIC STARTS FROM HERE
  const [open_edit, setopen_edit] = useState(false);
  const [isloggedin, setisloggedin] = useState(false);
  const [edit_ID, setedit_ID] = useState<any>(1);

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

  // const onDragEnd = (result: any) => {
  //   // console.log(copy_data);

  //   if (!result.destination) return; // Item not moved

  //   const { source, destination, draggableId } = result;
  //   const updatedData = Array.from(copy_data);

  //   // Get the index of the item
  //   const source_id = groupedItems[source.droppableId].body[source.index].id;
  //   const itemIndex = updatedData.findIndex(
  //     (element: any) => element.id == source_id,
  //   );
  //   // Get the index of the item
  //   const destination_id =
  //     groupedItems[destination.droppableId].body[destination.index].id;

  //   const destination_Index = updatedData.findIndex(
  //     (element: any) => element.id == destination_id,
  //   );

  //   // Use the index to get the item
  //   // const item = updatedData[itemIndex];

  //   // console.log(item); // Logs the found item
  //   console.log("the first item", itemIndex); // Logs the index of the found item
  //   console.log("the destination item", destination_Index); // Logs the index of the found item

  //   const [reorderedItem] = updatedData.splice(itemIndex, 1);
  //   console.log(reorderedItem);
  //   updatedData.splice(destination_Index, 0, reorderedItem);

  //   const grouped = groupByCategory(updatedData, categories);
  //   setGroupedItems(grouped);
  //   // console.log(grouped);
  //   // setGroupedItems(updatedData);

  //   // Call backend to persist order
  //   // saveOrderToDatabase(updatedData);
  // };
  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Exit if there's no destination

    const { source, destination } = result;
    const updatedData = [...copy_data]; // Shallow copy of the data for immutability

    // Find the source and destination indices
    const sourceItemId = groupedItems[source.droppableId].body[source.index].id;
    const destinationItemId =
      groupedItems[destination.droppableId].body[destination.index]?.id;

    const sourceIndex = updatedData.findIndex(
      (item: any) => item.id === sourceItemId,
    );

    // If moving within the same droppable, destination ID may not be found
    const destinationIndex =
      destinationItemId !== undefined
        ? updatedData.findIndex((item: any) => item.id === destinationItemId)
        : updatedData.length; // Default to end of list if destination is last item

    if (sourceIndex === -1 || destinationIndex === -1) {
      console.error("Invalid source or destination index");
      return;
    }

    // Reorder the array
    const [movedItem] = updatedData.splice(sourceIndex, 1);
    updatedData.splice(destinationIndex, 0, movedItem);

    // Regroup the items by category
    const regroupedItems = groupByCategory(updatedData, categories);
    setGroupedItems(regroupedItems);
    setcopy_data(updatedData);
    console.log("Updated grouping:", regroupedItems);

    // Optional: Persist the updated order to the backend
    // saveOrderToDatabase(updatedData);
  };

  const saveOrderToDatabase = async (updatedData: any[]) => {
    try {
      // Prepare updates with item id and order
      const updates = updatedData.map((item, index) => ({
        id: item.id,
        order: index,
      }));

      console.log("Updates to be saved:", updates);

      // Perform a bulk upsert instead of individual calls (if supported by the backend)
      const { data, error } = await supabase.from("media").upsert(updates);

      if (error) {
        console.error("Error saving updates:", error);
      } else {
        console.log("All updates saved successfully:", data);

        // Optionally reload the page after a delay
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving order to database:", error);
    }
  };

  const updateOrder = async () => {
    // Save the updated order to the database
    await saveOrderToDatabase(copy_data);
  };
  return (
    <>
      {/* add media */}
      {open_edit && (
        <Modal_edit_category
          edit_ID={edit_ID}
          categories={categories}
          setopen_edit={setopen_edit}
        />
      )}
      {/* <div className="h-[30vw]"></div> */}
      <div className="w-full md:gap-0 gap-[15vw]  md:pb-[10vw] md:mt-[-5vw] md:flex-row flex-col   relative flex  ">
        <div className="md:absolute  z-[101]   w-full">
          {isloggedin && (
            <Add_media
              setedit_ID={setedit_ID}
              updateOrder={updateOrder}
              setopen_edit={setopen_edit}
            />
          )}
        </div>
        <div className=" md:h-[100vh] md:w-[30vw] flex items-center md:justify-start justify-between md:px-0 px-[3%] sticky  md:bg-transparent bg-[#DFE4DF] bg-opacity-[10%] backdrop-blur-2xl md:backdrop-blur-none z-[100]  overflow-x-auto top-0 pt-[25vw] md:flex md:flex-col left-0 md:pt-[8vw] md:pb-0 pb-[5vw] ">
          {/* this is for the mobile editing */}
          <div className="w-auto flex  md:w-fit md:gap-[2vw] gap-[2vw] md:flex-col  ">
            {groupedItems.map((e: any, index: any) => {
              return (
                <Link
                  href={`media/?id=${e.title}`}
                  key={index}
                  // onClick={() => {
                  //   console.log("title", e.title);
                  // }}
                  style={{ transition: "0.8s ease" }}
                  className={` ${
                    active == e.title
                      ? "scale-[1.05]"
                      : "md:opacity-[40%] opacity-[60%] hover:opacity-[100%]"
                  } ${
                    spline_font.className
                  } bg-[black] font-semibold uppercase overflow-hidden  md:w-[13vw] w-[29vw] h-[10vw] rounded-[3vw] p-[1.1vw] md:h-[4.9vw] md:p-[0.6vw]  group hover:[#103210]  hover:bg-[black] hover:bg-opacity-[20%]  md:rounded-[1.8vw]  backdrop-blur-2xl bg-opacity-[20%] `}
                >
                  <div
                    className={`w-full   h-full bg-white  group-hover:bg-[#103210] md:rounded-[1.3vw] flex justify-center items-center rounded-[2.3vw]  md:py-[0.6vw] md:px-[1.5vw]`}
                  >
                    <p
                      className={`inline-block  md:text-[1.1vw] text-[3vw] text-[#103210]  group-hover:text-white`}
                    >
                      {e.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* this is for logged out users */}
        {/* this is for logged out users */}
        {/* this is for logged out users */}
        {/* this is for logged out users */}
        {/* this is for logged out users */}
        {!isloggedin && (
          <div className="md:w-[69vw] md:px-0 gap-[15vw] px-[3%] flex flex-col md:gap-[3vw] justify-center ">
            {groupedItems.map((e: any, index: any) => {
              return (
                <>
                  {e.body.length > 0 && (
                    <div
                      key={index}
                      id={e.title}
                      ref={(ref) => {
                        if (ref) {
                          itemsRefs.current[index] = ref;
                        }
                      }}
                      className=" md:gap-[0vw] gap-[5vw]  md:w-[100%] flex flex-col"
                    >
                      <h2
                        className={`uppercase text-[#4F0A19] md:text-start text-center font-semibold ${spline_font.className} text-[10vw] leading-[11vw] md:text-[4vw]`}
                      >
                        {e.title}
                      </h2>

                      <div className=" flex  flex-wrap gap-[5vw] md:gap-[1.7vw]">
                        {e.body.map((internal: any, internal_index: any) => {
                          return (
                            <>
                              <div
                                key={internal_index}
                                className="md:w-[30.6vw] relative  rounded-[5vw] p-[2vw] w-full md:rounded-[1.5vw] md:gap-0 gap-[3vw] flex flex-col md:p-[0.5vw] group md:mt-[0.4vw] bg-white"
                              >
                                {" "}
                                {isloggedin && (
                                  <Edit_each_category
                                    setopen_edit={setopen_edit}
                                    id={internal.id}
                                    setedit_ID={setedit_ID}
                                  />
                                )}
                                <Link
                                  href={internal.link}
                                  target="_blank"
                                  key={internal_index}
                                  className={``}
                                >
                                  <div className="overflow-hidden border  w-full md:h-[22.5vw] h-[50vw] rounded-[4vw] md:rounded-[1vw]">
                                    <Image
                                      src={internal.img}
                                      alt={internal.caption}
                                      width={500}
                                      height={600}
                                      style={{
                                        transition: "0.8s ease",
                                      }}
                                      className="w-full h-full  object-cover group-hover:scale-[1.1]"
                                    />
                                  </div>

                                  <div className="overflow-hidden">
                                    <div
                                      className={` md:p-[1.5vw] p-[3vw] flex flex-col md:gap-[1vw] gap-[3vw]  ${spline_font.className}  font-medium md:text-[1.2vw] text-[4vw] md:leading-[1.4vw] leading-[5vw]`}
                                    >
                                      {internal.caption.includes("|") ? (
                                        <>
                                          <p
                                            style={{
                                              fontWeight: "bold",
                                            }}
                                            className="text-[#103210] capitalize md:text-[1.3vw] text-[5vw] "
                                          >
                                            {internal.caption.split("|")[1]}
                                          </p>

                                          {internal.caption.split("|")[0]}
                                        </>
                                      ) : (
                                        <p className=""> {internal.caption}</p>
                                      )}{" "}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        )}

        {/* this is for logged in users */}
        {/* this is for logged in users */}
        {/* this is for logged in users */}
        {/* this is for logged in users */}
        {/* this is for logged in users */}
        {isloggedin && (
          <div className="md:w-[69vw] md:px-0 gap-[15vw] px-[3%] flex flex-col md:gap-[3vw] justify-center ">
            {groupedItems.map((e: any, index: any) => {
              return (
                <>
                  {e.body.length > 0 && (
                    <div
                      key={index}
                      id={e.title}
                      ref={(ref) => {
                        if (ref) {
                          itemsRefs.current[index] = ref;
                        }
                      }}
                      className=" md:gap-[0vw] gap-[5vw]  md:w-[100%] flex flex-col"
                    >
                      <h2
                        className={`uppercase text-[#4F0A19] md:text-start text-center font-semibold ${spline_font.className} text-[10vw] leading-[11vw] md:text-[4vw]`}
                      >
                        {e.title}
                      </h2>
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={index.toString()}>
                          {(provided) => (
                            <div
                              // {...provided.droppableProps}
                              {...provided.droppableProps}
                              ref={provided.innerRef} // Attach ref to the container
                              className=" flex  px-[5%] flex-wrap gap-[5vw] md:gap-[1.7vw]"
                            >
                              {e.body.map(
                                (internal: any, internal_index: any) => {
                                  return (
                                    <>
                                      <Draggable
                                        key={internal.id.toString()}
                                        // draggableId={index.toString()}
                                        draggableId={internal.id.toString()}
                                        index={internal_index}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="md:w-full relative  rounded-[5vw] p-[2vw] w-full md:rounded-[1.5vw] md:gap-0 gap-[3vw] flex flex-col md:p-[0.5vw] group md:mt-[0.4vw] bg-white"
                                          >
                                            {" "}
                                            {isloggedin && (
                                              <Edit_each_category
                                                setopen_edit={setopen_edit}
                                                id={internal.id}
                                                setedit_ID={setedit_ID}
                                              />
                                            )}
                                            <Link
                                              href={internal.link}
                                              target="_blank"
                                              key={internal_index}
                                              className={``}
                                            >
                                              <div className="overflow-hidden border  w-full md:h-[5vw] h-[15vw] rounded-[4vw] md:rounded-[1vw]">
                                                <Image
                                                  src={internal.img}
                                                  alt={internal.caption}
                                                  unoptimized
                                                  width="0"
                                                  height="0"
                                                  style={{
                                                    transition: "0.8s ease",
                                                  }}
                                                  className="w-full h-full  object-cover "
                                                />
                                              </div>

                                              <div className="overflow-hidden">
                                                <div
                                                  className={` md:p-[1.5vw] p-[3vw] flex flex-col md:gap-[1vw] gap-[3vw]  ${spline_font.className}  font-medium md:text-[1.2vw] text-[4vw] md:leading-[1.4vw] leading-[5vw]`}
                                                >
                                                  {internal.caption.includes(
                                                    "|",
                                                  ) ? (
                                                    <>
                                                      <p
                                                        style={{
                                                          fontWeight: "bold",
                                                        }}
                                                        className="text-[#103210] capitalize md:text-[1.3vw] text-[5vw] "
                                                      >
                                                        {
                                                          internal.caption.split(
                                                            "|",
                                                          )[1]
                                                        }
                                                      </p>

                                                      {
                                                        internal.caption.split(
                                                          "|",
                                                        )[0]
                                                      }
                                                    </>
                                                  ) : (
                                                    <p className="">
                                                      {" "}
                                                      {internal.caption}
                                                    </p>
                                                  )}{" "}
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                        )}
                                      </Draggable>
                                    </>
                                  );
                                },
                              )}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
