import Contact_wrappeer from "../components/general-component/contact_wrapper";
import Footer from "../components/general-component/footer";
import Nav from "../components/general-component/nav";
import Each_research from "../components/research/each_research";
import Research_hero from "../components/research/hero";
import { supabase } from "../utils/supabaseClient";

export const revalidate = 2;

// Fetch all required data in parallel
const fetchData = async () => {
  const [researchDataRes, pageDataRes] = await Promise.all([
    supabase
      .from("research_blog")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("research_page")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (researchDataRes.error || pageDataRes.error) {
    console.error(
      "Error fetching data:",
      researchDataRes.error || pageDataRes.error
    );
  }

  return {
    product_data: researchDataRes.data || [],
    page_data: pageDataRes.data || [{}], // Ensure page_data is never null
  };
};

// Generate metadata dynamically
export async function generateMetadata() {
  const { page_data } = await fetchData();

  if (!page_data || !page_data[0]) {
    return;
  }

  return {
    title: page_data[0].hero,
    description: page_data[0].sub_hero,
    openGraph: {
      type: "website",
    },
  };
}

// Page Component
export default async function Home() {
  const { product_data, page_data } = await fetchData();

  return (
    <>
      <Nav />
      <div className="bg-[#DFE4DF]">
        <Research_hero page_data={page_data} />
        <Each_research product_data={product_data} />
        <Contact_wrappeer />
        <Footer />
      </div>
    </>
  );
}
