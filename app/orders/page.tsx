import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { finishOrder } from "../actions";
import Orders from "@/components/Orders";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: orders } = await supabase
    .from("orders")
    .select("*, products(*)")
    .is("finished_at", null);

  return (
    <>
      <Orders orders={orders} finishOrder={finishOrder} />
    </>
  );
}
