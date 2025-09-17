import Contact from "../components/general-component/contact";
import Contact_wrappeer from "../components/general-component/contact_wrapper";
import Footer from "../components/general-component/footer";
import Nav from "../components/general-component/nav";
import Categories from "../components/media/categories";
import Media_hero from "../components/media/hero";
import { supabase } from "../utils/supabaseClient";
export const revalidate = 2;
const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("order", { ascending: true });

  // if (error) throw notFound();
  // console.log(data);
  return data;
};
const fetchpage_data = async () => {
  const { data, error } = await supabase
    .from("media_page")
    .select("*")
    .order("created_at", { ascending: false });
  // console.log(data);
  return data;
};

export async function generateMetadata() {
  const product_data = await fetchpage_data();
  if (!product_data) {
    return;
  }
  return {
    title: product_data[0].heading,
    // description: product_data[0].caption,
    openGraph: {
      type: "website",
    },
  };
}
export default async function Meida() {
  const product_data = await fetchProducts();
  const page_data = await fetchpage_data();

  return (
    <>
      <>
        <Nav />
        <Media_hero page_data={page_data || [{}]} />
        <Categories product_data={product_data || [{}]} />
        <Contact_wrappeer />
        <Footer />
      </>
    </>
  );
}
