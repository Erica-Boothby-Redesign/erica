"use client";
import Image from "next/image";
import example3 from "../../../../public/images/consultation/example3.png";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import Link from "next/link";
const tus = require("tus-js-client");
// import {tus} from 'tus-js-client'
const generateRandomFileName = (originalName: any) => {
  const extension = originalName.split(".").pop();
  const randomName =
    Math.random().toString(36).substring(2, 15) + "." + extension;
  return randomName;
};
const projectId = "jcyitaxnxoxtrnnmilnb"; // Replace with your project ID

const uploadFile = async (
  bucketName: any,
  fileName: any,
  file: any,
  setUploadProgress: any,
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("User is not authenticated");
  }

  const randomFileName = generateRandomFileName(fileName);
  return new Promise((resolve, reject) => {
    var upload = new tus.Upload(file, {
      endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${session.access_token}`,
        "x-upsert": "true", // optionally set upsert to true to overwrite existing files
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
      metadata: {
        bucketName: bucketName,
        objectName: randomFileName,
        contentType: file.type,
        cacheControl: 3600,
      },
      chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
      onError: function (error: any) {
        console.log("Failed because: " + error);
        reject(error);
      },
      onProgress: function (bytesUploaded: any, bytesTotal: any) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setUploadProgress(parseFloat(percentage));
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: function () {
        console.log("Download %s from %s", upload.file.name, upload.url);
        resolve(randomFileName);
      },
    });

    // Check if there are any previous uploads to continue.
    return upload.findPreviousUploads().then(function (previousUploads: any) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  });
};

const Image_list = ({ setopen_img, setimage_link }: any) => {
  const [active, setactive] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [img_array, setimg_array] = useState<any>([]);
  const [active_img, setactive_img] = useState<any>([]);
  const [alt_text, setalt_text] = useState("");
  const [delete_text, setdelete_text] = useState("Delete image");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
      } else {
        alert("Please select an image file");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    try {
      const fileUrl = await uploadFile(
        "images",
        selectedImage.name,
        selectedImage,
        setUploadProgress,
      );
      console.log("File uploaded to: ", fileUrl);

      const file_url = `https://${projectId}.supabase.co/storage/v1/object/public/images/${fileUrl}`;

      // Save file URL and auth in the image table
      const { data, error } = await supabase
        .from("image")
        .insert([
          { file_url: file_url, file_name: fileUrl, alt_text: alt_text },
        ]); // Adjust the fields as needed

      if (error) {
        console.error("Error saving to database:", error);
      } else {
        console.log("File info saved to database:", data);
        setUploadProgress("");
        setSelectedImage(null);
        setalt_text("");
        setactive(null);
        // window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error }: any = await supabase
        .from("image")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setimg_array(data);
      }
    };

    fetchInitialData();

    // Real-time subscription
    const handleInserts = (payload: any) => {
      console.log("Insert received!", payload);
      setimg_array((prevData: any) => [payload.new, ...prevData]);
      fetchInitialData();
    };

    const handleUpdates = (payload: any) => {
      console.log("Update received!", payload);
      setimg_array((prevData: any) =>
        prevData.map((item: any) =>
          item.id === payload.new.id ? payload.new : item,
        ),
      );
      setactive(null);
    };

    const handleDeletes = (payload: any) => {
      console.log("Delete received!", payload);
      setimg_array((prevData: any) =>
        prevData.filter((item: any) => item.id !== payload.old.id),
      );
      setactive_img([]);
      setdelete_text("Delete text");
      setactive(null);
    };

    const subscription = supabase
      .channel("image_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "image" },
        handleInserts,
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "image" },
        handleUpdates,
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "image" },
        handleDeletes,
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const deleteImage = async (
    imageId: any,
    fileName: any,
    bucketName = "images",
  ) => {
    setdelete_text("Deleting image...");
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("User is not authenticated");
    }

    try {
      // Delete the image from the storage bucket
      const { error: storageError } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);

      if (storageError) {
        throw new Error(`Error deleting from storage: ${storageError.message}`);
      }

      // Delete the record from the image table
      const { error: tableError } = await supabase
        .from("image")
        .delete()
        .eq("id", imageId);

      if (tableError) {
        throw new Error(`Error deleting from table: ${tableError.message}`);
      }

      // Remove the deleted image from the local state
      setimg_array((prevData: any) =>
        prevData.filter((item: any) => item.id !== imageId),
      );

      console.log("Image successfully deleted from storage and table");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const formatText = (text: any) => {
    const words = text.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text;
  };

  // copy text
  const [copy_text, setcopy_text] = useState(" copy link");

  useEffect(() => {
    setTimeout(() => {
      setcopy_text(" copy link");
    }, 3000);
  }, [copy_text]);
  return (
    <>
      <div className="w-full  h-full flex justify-center items-center z-[10000] fixed top-0 left-0 bg-black bg-opacity-[70%]">
        <div className="md:w-[70%] w-[95%] md:flex-row flex-col h-[90vh] flex md:h-[39vw]  bg-white rounded-[4vw] md:rounded-none overflow-hidden ">
          {/* this is for uploading */}
          <div className="w-full h-[60%] md:h-full flex flex-col  ">
            {/* this is the first section to upload  */}
            <div className="w-full bg-[#acaaaab6] capitalize  justify-end md:pb-[1vw] pb-[5vw] md:h-full h-[60%] flex flex-col gap-[3vw]  md:px-[10%] md:gap-[1vw] md:text-[1vw] px-[5%] text-[3.5vw]">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                className="w-full  md:h-[2.5vw] h-[8vw] bg-[green] text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image
              </button>
              {selectedImage && (
                <div className="flex flex-col gap-[5%] md:gap-[1vw]">
                  <div className="  w-full md:gap-[5%] flex justify-center">
                    <div className="w-[50%] h-[20vw] relative md:h-[7vw] overflow-hidden border border-gray-300">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="selected"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {uploadProgress && (
                      <div className="w-[50%]    flex    h-full">
                        <div
                          className="h-full bg-[green] relative overflow-hidden flex justify-center items-center"
                          style={{
                            transition: "0.8s ease",
                            width: `${uploadProgress}%`,
                          }}
                        >
                          <p className="md:text-[0.8vw] text-white absolute absolute_center">
                            {" "}
                            Uploading {uploadProgress}%
                          </p>
                        </div>
                      </div>
                    )}{" "}
                  </div>{" "}
                  <input
                    type="text"
                    onChange={(e) => {
                      setalt_text(e.target.value);
                    }}
                    value={alt_text || ""}
                    placeholder="Enter image description here ( optional )"
                    className="w-full outline-none px-[3%] py-[2%] "
                  />
                </div>
              )}{" "}
              {/* {uploadProgress && <p>Upload Progress: {uploadProgress}</p>} */}
              <button
                className="w-full md:h-[2.5vw] h-[8vw] bg-[#440C0C] text-white"
                //   onClick={handleUpload}
                onClick={handleUpload}
                disabled={!selectedImage}
              >
                Upload Image
              </button>
            </div>

            {/* this is the second option to select */}
            <div className="w-full md:h-full h-[40%] px-[5%] gap-[5vw] md:gap-[2vw] bg-[#acaaaa86]  justify-center flex flex-col md:px-[3vw] text-[3.5vw] md:text-[1vw]">
              <div className="w-full gap-[3vw] flex flex-col md:gap-[1vw]">
                <p className=" ">
                  {" "}
                  {!active_img.length
                    ? "Select an image by clicking on image"
                    : "   Selected image"}{" "}
                </p>
                {active_img.map((e: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-[5vw] md:gap-[2vw] items-end"
                    >
                      <div className="md:w-[7vw]  border w-[20vw] h-[20vw]  md:h-[7vw] overflow-hidden ">
                        <img src={e.file_url} alt="example" className="" />
                      </div>
                      <div className="flex w-[60%] flex-col md:gap-[1vw]">
                        {e.alt_text && (
                          <p>
                            {" "}
                            <strong>description</strong> :{" "}
                            {formatText(e.alt_text)}
                          </p>
                        )}{" "}
                        <div className="flex  gap-[3vw]  md:gap-[1vw]">
                          <p
                            className="underline cursor-pointer underline-offset-4"
                            onClick={() => {
                              navigator.clipboard.writeText(e.file_url);
                              setcopy_text("copied");
                            }}
                          >
                            {copy_text}
                          </p>
                          <button
                            className="text-[red] underline underline-offset-4"
                            onClick={() => {
                              deleteImage(e.id, e.file_name);
                            }}
                          >
                            {delete_text}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex md:gap-[3vw] gap-[5%] capitalize">
                <button
                  className="w-full md:h-[3vw] h-[10vw] border-[#440C0C]  border"
                  onClick={() => {
                    setopen_img(false);
                  }}
                >
                  Close
                </button>
                <button
                  className="w-full md:h-[3vw] h-[10vw] bg-[#440C0C] text-white"
                  onClick={() => {
                    setimage_link(active_img[0].file_url);
                    setopen_img(false);
                  }}
                >
                  confirm select
                </button>
              </div>
            </div>
          </div>
          {/* this is for imeagesl */}
          <div className="w-full overflow-y-scroll  bg-[whitesmoke] md:h-full h-[40%] flex justify-center  ">
            {img_array.length ? (
              <>
                {" "}
                <div className="w-full gap-[5vw] p-[5%] md:gap-[2vw]  md:p-[3vw]  h-fit  flex flex-wrap items-center">
                  {img_array.map((e: any, index: any) => {
                    return (
                      <div
                        onClick={() => {
                          setactive(index);
                          setactive_img([img_array[index]]);
                          //   console.log();
                        }}
                        className={`md:h-[7vw] h-[25vw] w-[25vw] rounded-[5vw]  bg-[lightgrey] border md:rounded-[1vw] overflow-hidden cursor-pointer ${
                          index == active
                            ? "border-[#440C0C] border-[1.5vw] md:border-[0.4vw]"
                            : ""
                        } md:w-[7vw] relative transition duration-[0.5s]`}
                        key={index}
                      >
                        <img
                          src={e.file_url}
                          alt="images"
                          className="absolute w-full h-full object-cover absolute_center"
                        />
                      </div>
                    );
                  })}
                </div>{" "}
              </>
            ) : (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <p className="md:text-[1.2vw] text-[4vw]">LOADING ...</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Image_list;
