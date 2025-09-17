"use client";

import { Bt_Beau_Regualr } from "@/app/utils/fonts";
import { supabase } from "@/app/utils/supabaseClient";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EmailCaptureModal from "./EmailCaptureModal";

const Login = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loggedin, setloggedin] = useState<any>(false);

  const router = useRouter();
  useEffect(() => {
    // Check initial session
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        // setIsAuthenticated(true);
        setloggedin(true);
        // router.push("/"); // Redirect to home page if already logged in
      }
    };

    checkInitialSession();
    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setloggedin(true);
        // router.push("/"); // Redirect to home page on sign in
      } else if (event === "SIGNED_OUT") {
        setloggedin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    setlogout("Logging out");
    const { error } = await supabase.auth.signOut();
    console.log(error);
    console.log("logged out");
    setlogout("Log out");
  };
  const [view, setView] = useState<any>("sign_in");
  const [logout, setlogout] = useState<any>("Log out");
  const viewToMessageMap: any = {
    sign_in: { title: "Sign In" },
    sign_up: { title: "Sign Up" },
    forgotten_password: { title: "Forgot Password" },
    // Add other views and their corresponding titles here
  };

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState<
    | any
    | {
        image: string;
        header: string;
        body: string;
        button_text: string;
      }
  >(null);

  useEffect(() => {
    const fetchModalData = async () => {
      const { data, error } = await supabase
        .from("email_capture_modal")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error loading modal data:", error.message);
      } else {
        setModalData(data);
      }
    };

    fetchModalData();
  }, []);
  return (
    <>
      {modalData && show && (
        <EmailCaptureModal
          prop_image={modalData.image}
          prop_header={modalData.header}
          prop_body={modalData.body}
          prop_button_text={modalData.button_text}
          setopen_contact_form={setShow}
        />
      )}

      <div className="w-full flex  flex-col items-center  h-[100vh] justify-center">
        {!loggedin && (
          <>
            {" "}
            <h1 className="text-[3rem]">
              {/* {viewToMessageMap[view]?.title || "Authentication"} */}
              Authentication
            </h1>{" "}
            <div className="md:w-[50%] w-[90%]">
              <Auth
                supabaseClient={supabase}
                providers={[]}
                // theme="dark"
                // providers={["google", "facebook", "twitter"]}
                // controls whether to display only social providers
                // onlyThirdPartyProviders
                redirectTo="/"
                // comes with preconfigured themes, can add custom themes
                appearance={{ theme: ThemeSupa }}
                // controls how to display the social provider icons
                socialLayout="horizontal"
                // view={view}
                view="sign_in" // 👈 force sign in only
                showLinks={false} // 👈 hides "sign up" and "forgot password"

                // onViewChange={(newView:any) => setView(newView)}
                // showLinks={false}
              />
            </div>
          </>
        )}

        {loggedin && (
          <div className="flex items-center capitalize  flex-col gap-[2rem]">
            {" "}
            <button
              className="  bg-black px-10 py-3 w-full rounded-full text-white  "
              onClick={() => {
                handleLogout();
              }}
            >
              {logout}
            </button>
            <button
              className="  bg-black px-10 py-3 w-full rounded-full text-white  "
              onClick={() => {
                setShow(true);
              }}
            >
              Edit Modal
            </button>
            {/* now the link to return to webiste  */}
            <Link
              href={"/"}
              className="  bg-black px-10 py-3 rounded-full text-white  "
            >
              Return to webiste
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
