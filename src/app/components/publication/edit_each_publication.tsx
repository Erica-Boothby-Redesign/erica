"use client";

import { supabase } from "@/app/utils/supabaseClient";

const Edit_each_publication = ({
  id,
  setedit_ID,
  setadd_publdcication,
}: any) => {
  const deletePublicationById = async (id: number) => {
    try {
      // Perform the delete operation
      const { error } = await supabase
        .from("publication")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      // Optionally: Update the UI state after deletion
      // setProductData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting publication:", error);
    }
  };

  // Example of using the delete function in the component
  const handleDeleteClick = (id: number) => {
    // Confirm delete action
    if (
      window.confirm(
        "Are you sure you want to delete this publication? Note : This can't be undone",
      )
    ) {
      deletePublicationById(id);
    }
  };

  return (
    <>
      <div className="w-full  absolute top-0 left-0 h-full flex justify-end items-start md:p-[0.5vw] md:gap-[1.5vw] p-[5vw] text-[3.5vw] gap-[5vw] md:text-[1vw] capitalize bg-black bg-opacity-[50%] rounded-[5vw] md:rounded-[1vw]">
        <button
          className=" md:w-[8vw] md:h-[3vw] h-[10vw] w-[30vw] rounded-[2vw] capitalize bg-white  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center "
          onClick={() => {
            setedit_ID(id);
            setadd_publdcication(true);
          }}
        >
          edit
        </button>
        <button
          className=" md:w-[8vw] md:h-[3vw] h-[10vw] w-[30vw] rounded-[2vw] capitalize bg-white  md:rounded-[0.5vw] hover:bg-opacity-[60%] backdrop-blur-2xl text-center "
          onClick={() => {
            handleDeleteClick(id);
          }}
        >
          delete
        </button>
      </div>
    </>
  );
};

export default Edit_each_publication;
