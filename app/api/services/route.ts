import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await getSupabase()
    .from("services")
    .select("id, name, duration_minutes")
    .eq("active", true)
    .order("name");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ services: data });
}