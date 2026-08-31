import { z } from "zod";
import type { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isAdminRequest, ADMIN_COOKIE } from "@/lib/admin";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function unauthorized() {
  return Response.json({ error: "Não autorizado" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return unauthorized();
  }
  const date = request.nextUrl.searchParams.get("date") ?? undefined;
  if (date && !DATE_RE.test(date)) {
    return Response.json({ error: "Data inválida" }, { status: 400 });
  }

  let query = getSupabase().from("appointments").select("*").order("start_time");
  if (date) query = query.eq("date", date);

  const { data, error } = await query;
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ appointments: data });
}

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pendente", "confirmado", "cancelado", "concluido"]),
});

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return unauthorized();
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Dados inválidos" }, { status: 400 });
  }
  const { id, status } = parsed.data;

  const { data, error } = await getSupabase()
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select("id, customer_name, date, start_time, status")
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return Response.json({ error: "Agendamento não encontrado" }, { status: 404 });
  }
  return Response.json({ appointment: data });
}