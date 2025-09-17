import Contact from "../components/general-component/contact";
import Contact_wrappeer from "../components/general-component/contact_wrapper";
import Footer from "../components/general-component/footer";
import Nav from "../components/general-component/nav";
import Publication_hero from "../components/publication/hero";
import Publication from "../components/publication/publication";
import Each_consultation from "../components/teaching_consultation/each_consultation";
import Teaching_hero from "../components/teaching_consultation/hero";
import { supabase } from "../utils/supabaseClient";

export const revalidate = 2;
const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("consultation")
    .select("*")
    .order("order", { ascending: false });

  // if (error) throw notFound();
  // console.log(data);
  return data;
};
const fetchpage_data = async () => {
  const { data, error } = await supabase
    .from("consultation_page")
    .select("*")
    .order("order", { ascending: true });
  // console.log(data);
  return data;
};

export async function generateMetadata() {
  const product_data = await fetchpage_data();
  // console.log(params.slug);

  if (!product_data) {
    return;
  }

  // excerpt;
  return {
    title: product_data[0].heading,
    // description: product_data[0].caption,
    openGraph: {
      type: "website",
    },
  };
}
export default async function Home() {
  const product_data = await fetchProducts();
  const page_data = await fetchpage_data();

  return (
    <>
      <>
        <Nav />
        <Teaching_hero page_data={page_data || [{}]} />
        <Each_consultation product_data={product_data || [{}]} />
        <Contact_wrappeer />
        <Footer />
      </>
    </>
  );
}
