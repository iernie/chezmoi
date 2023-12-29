import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { finishOrder } from "../actions";
import Orders from "@/components/Orders";
import { Tables } from "@/database.types";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: orders } = await supabase
    .from("orders")
    .select("*, products(*)")
    .is("finished_at", null)
    .returns<Array<Tables<"orders"> & { products: Tables<"products"> }>>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/");

  return <Orders orders={orders} finishOrder={finishOrder} />;
}
