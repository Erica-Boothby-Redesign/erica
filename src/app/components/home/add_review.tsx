"use client";

import { useState } from "react";
// import Modal_add_publication from "./modal_add_publication";
import { supabase } from "@/app/utils/supabaseClient";

const Add_review = ({ setopen_edit, setedit_ID, updateOrder }: any) => {
  const deleteAllreviewpost = async () => {
    try {
      // Make sure to confirm the action with the user before proceeding
      if (window.confirm("Are you sure you want to delete all review post?")) {
        // Perform the delete operation
        const { data, error } = await supabase
          .from("review")
          .delete()
          .neq("id", 0); // Assuming 'id' is a non-nullable primary key

        if (error) {
          throw new Error(error.message);
        }

        console.log("All review post have been deleted.");
        // Optionally, reload the page or update the UI
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting review post:", error);
    }
  };

  return (
    <>
      <div className="w-full py-[5vw] gap-[5%] px-[3%] md:py-[2vw] md:px-[10vw] flex md:gap-[2vw] md:justify-end  z-[90]  top-0 md:text-[1vw] text-[3.5vw]">
        <button
          className=" md:px-[3vw] py-[3%] md:w-auto w-full md:py-[1vw] capitalize bg-white rounded-[0.5rem]  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center "
          onClick={() => {
            setedit_ID(null);
            setopen_edit(true);
          }}
        >
          Add new review
        </button>
        <button
          className=" md:px-[3vw] py-[3%] md:w-auto w-full md:py-[1vw] capitalize bg-white rounded-[0.5rem]  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center "
          onClick={() => {
            updateOrder();
          }}
        >
          Update Order
        </button>
        <button
          className=" md:px-[3vw] py-[3%] md:w-auto w-full md:py-[1vw] capitalize bg-white rounded-[0.5rem]  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center "
          onClick={() => {
            deleteAllreviewpost();
          }}
        >
          delete all review
        </button>
      </div>
    </>
  );
};

export default Add_review;
