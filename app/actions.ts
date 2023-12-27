import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addProduct = async (formData: FormData) => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await supabase.from("products").insert([{ name, description }]);

  return revalidatePath("/");
};

export const addOrder = async (formData: FormData) => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const name = formData.get("name") as string;
  const product = formData.get("product") as string;

  await supabase.from("orders").insert([{ customer: name, product: +product }]);

  return revalidatePath("/");
};

export const deleteProduct = async (id: number) => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.from("products").delete().eq("id", id);

  return revalidatePath("/");
};

export const finishOrder = async (id: number) => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase
    .from("orders")
    .update({ finished_at: new Date().toISOString() })
    .eq("id", id);

  return revalidatePath("/");
};
