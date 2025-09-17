import { notFound } from "next/navigation";
import Contact from "../components/general-component/contact";
import Footer from "../components/general-component/footer";
import Nav from "../components/general-component/nav";
import Publication_hero from "../components/publication/hero";
import Publication from "../components/publication/publication";
import { supabase } from "../utils/supabaseClient";
import Contact_wrappeer from "../components/general-component/contact_wrapper";
export const revalidate = 2;
const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("publication")
    .select("*")
    .order("order", { ascending: false })
    .order("id", { ascending: true }); // Secondary sort key

  // console.log(data);
  // if (error) throw notFound();
  // console.log(data);
  return data;
};

export default async function Home() {
  const product_data = await fetchProducts();
  return (
    <>
      <>
        <Nav />
        <Publication_hero />
        <Publication product_data={product_data} />
        <Contact_wrappeer />
        <Footer />
      </>
    </>
  );
}
