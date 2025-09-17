import Contact_wrappeer from "./components/general-component/contact_wrapper";
import Footer from "./components/general-component/footer";
import Nav from "./components/general-component/nav";
import Recent_media_wrapper from "./components/general-component/recent_media_wrapper";
import Recent_publication from "./components/general-component/recent_publication";
import Review_wrapper from "./components/general-component/review_wrapper";
import AnimatedLines from "./components/home/approach";
import Hero_home from "./components/home/hero";
import Home_research from "./components/home/research";
import { supabase } from "./utils/supabaseClient";

export const revalidate = 1;

// Fetch all required data in parallel
const fetchData = async () => {
  const [publicationRes, researchRes, approachRes] = await Promise.all([
    supabase
      .from("publication")
      .select("*")
      .order("order", { ascending: false })
      .order("id", { ascending: true }) // Secondary sort key
      .limit(4),

    supabase
      .from("research_blog")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("approach")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (publicationRes.error || researchRes.error || approachRes.error) {
    console.error(
      "Error fetching data:",
      publicationRes.error || researchRes.error || approachRes.error
    );
  }

  return {
    product_data: publicationRes.data || [],
    research_items: researchRes.data || [],
    approach_items: approachRes.data || [],
  };
};

export default async function Home() {
  const { product_data, research_items, approach_items } = await fetchData();

  return (
    <div className="bg-[#DFE4DF]">
      <Nav />
      <Hero_home />
      <div className="md:pb-[6vw] md:mt-[8vw] mt-[15vw] ">
        <AnimatedLines active_user_data={approach_items} />
      </div>
      <Home_research research_items={research_items} />
      <Recent_publication product_data={product_data} />
      <Recent_media_wrapper />
      <Review_wrapper />
      <Contact_wrappeer />
      <Footer />
    </div>
  );
}
