import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import {
  computeFreeSlots,
  isOpenDay,
  todayInTimezone,
  type AppointmentRow,
  type AvailabilityBlockRow,
} from "@/lib/availability";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const bodySchema = z.object({
  customerName: z.string().trim().min(2, "Informe seu nome").max(80),
  customerPhone: z
    .string()
    .trim()
    .min(8, "Informe um telefone válido")
    .max(20)
    .regex(/^\+?[\d\s()-]+$/, "Telefone inválido"),
  serviceId: z.string().uuid(),
  date: z.string().regex(DATE_RE, "Data inválida"),
  startTime: z.string().regex(TIME_RE, "Horário inválido"),
});

function isRealDate(dateStr: string): boolean {
  const date = new Date(`${dateStr}T12:00:00Z`);
  return !Number.isNaN(date.getTime());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return Response.json({ error: first.message }, { status: 400 });
  }
  const { customerName, customerPhone, serviceId, date, startTime } = parsed.data;

  if (!isRealDate(date) || date < todayInTimezone()) {
    return Response.json({ error: "Data inválida ou no passado" }, { status: 400 });
  }
  if (!isOpenDay(date)) {
    return Response.json({ error: "A barbearia não abre nesse dia" }, { status: 400 });
  }

  const { data: service, error: serviceError } = await getSupabase()
    .from("services")
    .select("id, name, duration_minutes")
    .eq("id", serviceId)
    .eq("active", true)
    .maybeSingle();
  if (serviceError) {
    return Response.json({ error: serviceError.message }, { status: 500 });
  }
  if (!service) {
    return Response.json({ error: "Serviço não encontrado" }, { status: 404 });
  }

  const [appointments, blocks] = await Promise.all([
    getSupabase()
      .from("appointments")
      .select("date, start_time, duration_minutes, status")
      .eq("date", date),
    getSupabase()
      .from("availability_blocks")
      .select("date, start_time, end_time")
      .eq("date", date),
  ]);
  if (appointments.error || blocks.error) {
    return Response.json({ error: "Erro ao consultar agenda" }, { status: 500 });
  }

  const slots = computeFreeSlots(
    service.duration_minutes,
    appointments.data as AppointmentRow[],
    blocks.data as AvailabilityBlockRow[]
  );
  if (!slots.includes(startTime)) {
    return Response.json(
      { error: "Esse horário acabou de ser preenchido. Escolha outro." },
      { status: 409 }
    );
  }

  const { data: created, error: insertError } = await getSupabase()
    .from("appointments")
    .insert({
      customer_name: customerName,
      customer_phone: customerPhone,
      service_id: service.id,
      service_name: service.name,
      duration_minutes: service.duration_minutes,
      date,
      start_time: startTime,
      status: "pendente",
    })
    .select("id, date, start_time, service_name, customer_name")
    .maybeSingle();

  if (insertError) {
    if (insertError.code === "23505") {
      return Response.json(
        { error: "Esse horário acabou de ser preenchido. Escolha outro." },
        { status: 409 }
      );
    }
    return Response.json({ error: insertError.message }, { status: 500 });
  }

  return Response.json({ appointment: created }, { status: 201 });
}