import { supabase } from "../../utils/supabaseClient";
import Reviews from "../home/reviews";
export const revalidate = 10;
const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("review")
    .select("*")
    .order("order", { ascending: true });
  // .limit(3);

  // if (error) throw notFound();
  // console.log(data);
  return data;
};

export default async function Review_wrapper() {
  const product_data = await fetchProducts();

  return (
    <>
      <>
        <Reviews product_data={product_data || []} />
      </>
    </>
  );
}
