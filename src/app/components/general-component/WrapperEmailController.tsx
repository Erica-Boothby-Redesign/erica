"use client";

import { useEffect, useState } from "react";
import EmailCaptureModal from "./EmailCaptureModal";
import { supabase } from "@/app/utils/supabaseClient";
import { usePathname } from "next/navigation";

const MODAL_DELAY_FIRST = 10000; // 10s
const MODAL_DELAY_CLOSED = 50000; // 50s

export default function WrapperEmailCaptureModal() {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState<null | {
    image: string;
    header: string;
    body: string;
    button_text: string;
  }>(null);

  const pathname = usePathname();

  // ✅ Fetch modal data once & cache
  useEffect(() => {
    const cached = localStorage.getItem("emailModalData");
    if (cached) {
      setModalData(JSON.parse(cached));
      return;
    }

    const fetchModalData = async () => {
      const { data, error } = await supabase
        .from("email_capture_modal")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setModalData(data);
        localStorage.setItem("emailModalData", JSON.stringify(data)); // cache
      } else {
        console.error("Error loading modal data:", error?.message);
      }
    };

    fetchModalData();
  }, []);

  // ✅ Handle modal timing only once (not per route)
  useEffect(() => {
    if (pathname === "/login") return;

    const modalStatus = localStorage.getItem("emailModalStatus");
    if (modalStatus === "submitted") return;

    const delay =
      modalStatus === "closed" ? MODAL_DELAY_CLOSED : MODAL_DELAY_FIRST;

    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []); // could remove [pathname] if you don’t want it to restart on route change

  if (!show || !modalData) return null;

  return (
    <EmailCaptureModal
      prop_image={modalData.image}
      prop_header={modalData.header}
      prop_body={modalData.body}
      prop_button_text={modalData.button_text}
      setopen_contact_form={setShow}
    />
  );
}
