import { z } from "zod";
import type { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isAdminRequest, ADMIN_COOKIE } from "@/lib/admin";
import { isOpenDay, timeToMinutes } from "@/lib/availability";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

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

  let query = getSupabase().from("availability_blocks").select("*").order("date");
  if (date) query = query.eq("date", date);

  const { data, error } = await query;
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ blocks: data });
}

const createSchema = z
  .object({
    date: z.string().regex(DATE_RE, "Data inválida"),
    startTime: z.string().regex(TIME_RE).optional(),
    endTime: z.string().regex(TIME_RE).optional(),
    reason: z.string().trim().max(120).optional(),
  })
  .refine((v) => !(v.startTime && v.endTime) || timeToMinutes(v.endTime) > timeToMinutes(v.startTime), {
    message: "Fim do bloqueio deve ser depois do início",
  });

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return unauthorized();
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { date, startTime, endTime, reason } = parsed.data;
  if (!isOpenDay(date)) {
    return Response.json({ error: "Esse dia não é de funcionamento" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("availability_blocks")
    .insert({
      date,
      start_time: startTime ?? null,
      end_time: endTime ?? null,
      reason: reason ?? null,
    })
    .select("id, date, start_time, end_time, reason")
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ block: data }, { status: 201 });
}

const deleteSchema = z.object({
  id: z.string().uuid(),
});

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return unauthorized();
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }
  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Dados inválidos" }, { status: 400 });
  }
  const { data, error } = await getSupabase()
    .from("availability_blocks")
    .delete()
    .eq("id", parsed.data.id)
    .select("id")
    .maybeSingle();
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return Response.json({ error: "Bloqueio não encontrado" }, { status: 404 });
  }
  return Response.json({ ok: true });
}