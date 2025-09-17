"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import Image_list from "./image";

export default function EmailCaptureEditModal({ onSave, onClose }: any) {
  const [image, setImage] = useState("");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [buttonText, setButtonText] = useState("");

  const [recordId, setRecordId] = useState<string | null>(null); // for update
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 🔍 Fetch latest modal content on load
  useEffect(() => {
    const fetchModalData = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("email_capture_modal")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching modal data:", error.message);
        setError("Failed to load modal content.");
      } else if (data) {
        setImage(data.image || "");
        setHeader(data.header || "");
        setBody(data.body || "");
        setButtonText(data.button_text || "");
        setRecordId(data.id); // Save the ID for update
      }

      setLoading(false);
    };

    fetchModalData();
  }, []);

  const handleSubmit = async () => {
    setSaving(true);
    setError("");

    if (!recordId) {
      setError("No record found to update.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("email_capture_modal")
      .update({
        image: image_link,
        header,
        body,
        button_text: buttonText,
      })
      .eq("id", recordId);

    if (error) {
      console.error("Update error:", error.message);
      setError("Failed to save. Please try again.");
      setSaving(false);
    } else {
      onSave?.(); // Notify parent
      window.location.reload(); // Refresh on success
    }
  };

  const [open_img, setopen_img] = useState(false);
  const [image_link, setimage_link] = useState(image ? image : "");

  return (
    <div className="fixed top-0 left-0 z-[4000] w-full h-[100vh] bg-black/80 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Edit Email Modal Content</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading modal data...</p>
        ) : (
          <>
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {open_img && (
              <Image_list
                setopen_img={setopen_img}
                setimage_link={setimage_link}
              />
            )}

            <div
              onClick={() => {
                setopen_img(true);
              }}
              className="flex flex-col gap-2"
            >
              <button className="bg-black w-fit text-white px-4 py-2 rounded">
                Edit image
              </button>
              <label>Image URL</label>
              {image_link && <img className="w-[50%] h-fit" src={image_link} />}
              {/* <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border p-2 rounded"
              /> */}
            </div>

            <div className="flex flex-col gap-2">
              <label>Header Text</label>
              <input
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Body Text</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border p-2 rounded min-h-[100px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Button Text</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={onClose}
                disabled={saving}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className={`px-4 py-2 rounded text-white ${
                  saving
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
