import { z } from "zod";
import type { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";
import {
  computeAvailableDays,
  computeFreeSlots,
  isOpenDay,
  todayInTimezone,
  type AppointmentRow,
  type AvailabilityBlockRow,
} from "@/lib/availability";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MONTH_RE = /^\d{4}-\d{2}$/;

const paramsSchema = z
  .object({
    serviceId: z.string().uuid(),
    date: z.string().regex(DATE_RE).optional(),
    month: z.string().regex(MONTH_RE).optional(),
  })
  .refine((v) => (v.date ? true : Boolean(v.month)), {
    message: "Informe date ou month",
  })
  .refine((v) => !(v.date && v.month), {
    message: "Informe apenas date ou month",
  });

function isRealDate(dateStr: string): boolean {
  if (!DATE_RE.test(dateStr)) return false;
  const date = new Date(`${dateStr}T12:00:00Z`);
  return !Number.isNaN(date.getTime());
}

export async function GET(request: NextRequest) {
  const parsed = paramsSchema.safeParse({
    serviceId: request.nextUrl.searchParams.get("serviceId"),
    date: request.nextUrl.searchParams.get("date") ?? undefined,
    month: request.nextUrl.searchParams.get("month") ?? undefined,
  });
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { serviceId, date, month } = parsed.data;

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

  try {
    if (date) {
      if (!isRealDate(date)) {
        return Response.json({ error: "Data inválida" }, { status: 400 });
      }
      if (date < todayInTimezone()) {
        return Response.json({ error: "Data no passado" }, { status: 400 });
      }
      if (!isOpenDay(date)) {
        return Response.json({ slots: [] });
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
      if (appointments.error) {
        return Response.json({ error: appointments.error.message }, { status: 500 });
      }
      if (blocks.error) {
        return Response.json({ error: blocks.error.message }, { status: 500 });
      }

      const slots = computeFreeSlots(
        service.duration_minutes,
        appointments.data as AppointmentRow[],
        blocks.data as AvailabilityBlockRow[]
      );
      return Response.json({ slots });
    }

    if (!month) {
      return Response.json({ error: "Informe date ou month" }, { status: 400 });
    }
    const firstDay = `${month}-01`;
    const lastDay = new Date(`${firstDay}T00:00:00Z`);
    lastDay.setUTCMonth(lastDay.getUTCMonth() + 1);
    lastDay.setUTCDate(0);
    const lastDayStr = lastDay.toISOString().slice(0, 10);

    const [appointments, blocks] = await Promise.all([
      getSupabase()
        .from("appointments")
        .select("date, start_time, duration_minutes, status")
        .gte("date", firstDay)
        .lte("date", lastDayStr),
      getSupabase()
        .from("availability_blocks")
        .select("date, start_time, end_time")
        .gte("date", firstDay)
        .lte("date", lastDayStr),
    ]);
    if (appointments.error) {
      return Response.json({ error: appointments.error.message }, { status: 500 });
    }
    if (blocks.error) {
      return Response.json({ error: blocks.error.message }, { status: 500 });
    }

    const appointmentsByDate = new Map<string, AppointmentRow[]>();
    for (const row of appointments.data as AppointmentRow[]) {
      const list = appointmentsByDate.get(row.date) ?? [];
      list.push(row);
      appointmentsByDate.set(row.date, list);
    }
    const blocksByDate = new Map<string, AvailabilityBlockRow[]>();
    for (const row of blocks.data as AvailabilityBlockRow[]) {
      const list = blocksByDate.get(row.date) ?? [];
      list.push(row);
      blocksByDate.set(row.date, list);
    }

    const days = computeAvailableDays(
      month,
      service.duration_minutes,
      appointmentsByDate,
      blocksByDate
    );
    return Response.json({ days });
  } catch (err) {
    console.error("availability error", err);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}