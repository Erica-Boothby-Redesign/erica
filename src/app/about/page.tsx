import About_hero from "../components/about/hero";
import Consulation_advert from "../components/general-component/consultation_ad";
import Contact_wrappeer from "../components/general-component/contact_wrapper";
import Footer from "../components/general-component/footer";
import Nav from "../components/general-component/nav";
import Recent_publication from "../components/general-component/recent_publication";
import { supabase } from "../utils/supabaseClient";

export const revalidate = 2;

// Fetch all required data in parallel
const fetchData = async () => {
  const [publicationsRes, userProfileRes] = await Promise.all([
    supabase
      .from("publication")
      .select("*")
      .order("order", { ascending: false })
      .order("id", { ascending: true }) // Secondary sort key
      .limit(4),

    supabase
      .from("about")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (publicationsRes.error || userProfileRes.error) {
    console.error(
      "Error fetching data:",
      publicationsRes.error || userProfileRes.error
    );
  }

  return {
    product_data: publicationsRes.data || [],
    user_data: userProfileRes.data || [{}], // Ensure user_data is never null
  };
};

export default async function Media() {
  const { product_data, user_data } = await fetchData();

  return (
    <>
      <Nav />
      <About_hero user_data={user_data} />
      <Recent_publication product_data={product_data} />
      <Consulation_advert user_data={user_data} />
      <Contact_wrappeer />
      <Footer />
    </>
  );
}
