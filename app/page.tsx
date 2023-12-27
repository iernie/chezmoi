import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Products from "../components/Products";
import { addOrder, addProduct, deleteProduct } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: products } = await supabase.from("products").select("*");

  return (
    <>
      <Products
        products={products}
        deleteProduct={deleteProduct}
        addOrder={addOrder}
      />
      <form action={addProduct}>
        <label>
          Name
          <input name="name" />
        </label>
        <label>
          Description
          <input name="description" />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
