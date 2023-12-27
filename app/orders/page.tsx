import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { finishOrder } from "../actions";
import Orders from "@/components/Orders";
import { QueryData } from "@supabase/supabase-js";
import { Tables } from "@/database.types";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: orders } = await supabase
    .from("orders")
    .select("*, products(*)")
    .is("finished_at", null)
    .returns<Array<Tables<"orders"> & { products: Tables<"products"> }>>();

  return (
    <>
      <Orders orders={orders} finishOrder={finishOrder} />
    </>
  );
}
