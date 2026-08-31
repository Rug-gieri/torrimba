export const TIMEZONE = "America/Porto_Velho";

// Dias de funcionamento: terça a sábado (getDay(): 0=Dom ... 6=Sáb)
export const OPEN_DAYS = [2, 3, 4, 5, 6];
export const OPEN_START = "09:00";
export const OPEN_END = "20:00";
export const SLOT_STEP_MIN = 30;

export type AppointmentRow = {
  date: string;
  start_time: string;
  duration_minutes: number;
  status: string;
};

export type AvailabilityBlockRow = {
  date: string;
  start_time: string | null;
  end_time: string | null;
};

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function todayInTimezone(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function isOpenDay(dateStr: string): boolean {
  const day = new Date(`${dateStr}T12:00:00Z`).getUTCDay();
  return OPEN_DAYS.includes(day);
}

function overlaps(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

function buildSlotCandidates(): string[] {
  const start = timeToMinutes(OPEN_START);
  const lastStart = timeToMinutes(OPEN_END) - SLOT_STEP_MIN;
  const slots: string[] = [];
  for (let t = start; t <= lastStart; t += SLOT_STEP_MIN) {
    slots.push(minutesToTime(t));
  }
  return slots;
}

function isBlocked(
  slotStart: number,
  slotEnd: number,
  blocks: AvailabilityBlockRow[]
): boolean {
  return blocks.some((block) => {
    if (block.start_time === null && block.end_time === null) return true; // dia inteiro
    const blockStart = block.start_time ? timeToMinutes(block.start_time) : timeToMinutes(OPEN_START);
    const blockEnd = block.end_time ? timeToMinutes(block.end_time) : timeToMinutes(OPEN_END);
    return overlaps(slotStart, slotEnd, blockStart, blockEnd);
  });
}

function isTaken(
  slotStart: number,
  slotEnd: number,
  appointments: AppointmentRow[]
): boolean {
  return appointments.some((appointment) => {
    const appStart = timeToMinutes(appointment.start_time);
    const appEnd = appStart + appointment.duration_minutes;
    return overlaps(slotStart, slotEnd, appStart, appEnd);
  });
}

export function computeFreeSlots(
  durationMinutes: number,
  appointments: AppointmentRow[],
  blocks: AvailabilityBlockRow[]
): string[] {
  const active = appointments.filter((a) => a.status !== "cancelado");
  return buildSlotCandidates().filter((slot) => {
    const slotStart = timeToMinutes(slot);
    const slotEnd = slotStart + durationMinutes;
    if (slotEnd > timeToMinutes(OPEN_END)) return false;
    if (isBlocked(slotStart, slotEnd, blocks)) return false;
    if (isTaken(slotStart, slotEnd, active)) return false;
    return true;
  });
}

export function computeAvailableDays(
  monthStr: string,
  durationMinutes: number,
  appointmentsByDate: Map<string, AppointmentRow[]>,
  blocksByDate: Map<string, AvailabilityBlockRow[]>
): string[] {
  const [year, month] = monthStr.split("-").map(Number);
  const today = todayInTimezone();
  const days: string[] = [];
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const lastDay = new Date(Date.UTC(year, month, 0));

  for (let d = firstDay.getUTCDate(); d <= lastDay.getUTCDate(); d++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (dateStr < today) continue;
    if (!isOpenDay(dateStr)) continue;
    const slots = computeFreeSlots(
      durationMinutes,
      appointmentsByDate.get(dateStr) ?? [],
      blocksByDate.get(dateStr) ?? []
    );
    if (slots.length > 0) days.push(dateStr);
  }
  return days;
}