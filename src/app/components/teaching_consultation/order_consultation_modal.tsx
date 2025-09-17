"use client";

import { spline_font } from "@/app/utils/fonts";
import { supabase } from "@/app/utils/supabaseClient";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const Order_consultation_modal = ({
  setopen_order_consultation,
  data,
}: any) => {
  const [updated_data, setupdated_data] = useState(data);
  const [updating_text, setupdating_text] = useState("Update");
  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Item not moved

    const updatedData = Array.from(updated_data);
    const [reorderedItem] = updatedData.splice(result.source.index, 1);
    updatedData.splice(result.destination.index, 0, reorderedItem);

    setupdated_data(updatedData);

    // Call backend to persist order
    // saveOrderToDatabase(updatedData);
  };

  const saveOrderToDatabase = async (updatedData: any[]) => {
    try {
      const updates = updatedData.map((item, index) => ({
        id: item.id,
        order: updatedData.length - index,
      }));

      // Log the updates for debugging
      updatedData.forEach((item, index) =>
        console.log("order:" + item.order, index, item.sub_title),
      );
      setupdating_text("Updating");
      // Upsert each update individually and collect promises
      const updatePromises = updates.map((update) =>
        supabase.from("consultation").upsert(update),
      );

      // Wait for all updates to complete
      const results = await Promise.all(updatePromises);

      // Check for any errors in the results
      const hasErrors = results.some(({ error }) => error);
      if (hasErrors) {
        console.error("Some updates failed:", results);
        setupdating_text("Try again");
      } else {
        console.log("All updates completed successfully");
        setupdating_text("Updated");

        // Reload the page after successful updates
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving order to database:", error);
    }
  };
  const updateOrder = async () => {
    // Save the updated order to the database
    await saveOrderToDatabase(updated_data);
  };
  return (
    <>
      <div className="fixed z-[100000] flex-col flex justify-center items-center top-0 left-0 h-full w-full bg-black bg-opacity-80">
        <div className="bg-white md:w-[50%] w-[90%] flex flex-col items-center h-[80%]">
          <div className="bg-white w-full rounded-[2rem]  h-[85%] flex flex-col">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="consultation">
                {(provided) => (
                  <div
                    className=" flex py-[2rem] flex-col px-[5%] h-full   gap-[1.2rem] overflow-y-scroll "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {updated_data.map((e: any, index: any) => {
                      return (
                        <Draggable
                          key={e.id.toString()}
                          // draggableId={index.toString()}
                          draggableId={e.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className=" bg-gray-400 text-center text-white flex flex-col py-[3rem] gap-[2rem] rounded-[2rem]"
                              key={index}
                            >
                              <h2
                                className={` ${spline_font.className} font-bold uppercase `}
                              >
                                {e.heading}
                              </h2>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>{" "}
          <div className=" h-[15%] items-center justify-center bg-white w-[90%] flex gap-[5%] px-[5%]">
            <button
              onClick={() => {
                setopen_order_consultation(false);
              }}
              className="py-[0.5rem] h-fit border px-[2rem] w-full border-red-600  "
            >
              Cancel{" "}
            </button>
            <button
              onClick={updateOrder}
              className="py-[0.5rem] h-fit px-[2rem] w-full bg-red-600 text-white"
            >
              {updating_text}{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order_consultation_modal;
