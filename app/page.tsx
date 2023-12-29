import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Products from "../components/Products";
import { addOrder, addProduct, deleteProduct } from "./actions";
import Login from "@/components/Login";

export const runtime = "edge";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: products } = await supabase.from("products").select("*");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <Login />
      <Products
        products={products}
        deleteProduct={deleteProduct}
        addOrder={addOrder}
        user={user}
      />
      {user && (
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
      )}
    </>
  );
}
