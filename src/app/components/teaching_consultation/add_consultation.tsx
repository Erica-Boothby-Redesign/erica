"use client";

import { supabase } from "@/app/utils/supabaseClient";
import { useState } from "react";

const Add_consultation = ({
  setconsultation_title,
  setdelete_consulation,
  refresh_all_params,
  setopen_order_consultation,
}: any) => {
  const [add_publication, setadd_publication] = useState(false);
  const deleteAllconsultation = async () => {
    try {
      // Make sure to confirm the action with the user before proceeding
      if (
        window.confirm(
          "Are you sure you want to delete all consultation?. Note : This can't be undone",
        )
      ) {
        // Perform the delete operation
        const { data, error } = await supabase
          .from("consultation")
          .delete()
          .neq("id", 0); // Assuming 'id' is a non-nullable primary key

        if (error) {
          throw new Error(error.message);
        }

        console.log("All publications have been deleted.");
        // Optionally, reload the page or update the UI
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting publications:", error);
    }
  };

  return (
    <>
      <div className="w-full py-[5vw] gap-[5%] px-[3%]   md:py-[2vw] md:px-[10vw] flex md:gap-[2vw] md:text-[1vw] text-[3.5vw]">
        <button
          className=" md:px-[3vw] py-[3%] md:w-auto w-full md:py-[1vw] capitalize bg-white rounded-[0.5rem]  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center"
          onClick={refresh_all_params}
        >
          Add new Consultation
        </button>
        <button
          className=" md:px-[3vw] py-[3%] md:w-auto w-full md:py-[1vw] capitalize bg-white rounded-[0.5rem]  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center"
          onClick={() => {
            setconsultation_title("");
            deleteAllconsultation();
            // setdelete_consulation(true);
          }}
        >
          delete all Consultations
        </button>
        <button
          className=" md:px-[3vw] py-[3%] md:w-auto w-full md:py-[1vw] capitalize bg-white rounded-[0.5rem]  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center"
          onClick={() => {
            // setdelete_consulation(true);
            setopen_order_consultation(true);
          }}
        >
          Order Consultations here
        </button>
      </div>
    </>
  );
};

export default Add_consultation;
