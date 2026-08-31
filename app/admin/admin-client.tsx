"use client";

import { useEffect, useState, type FormEvent } from "react";

type Appointment = {
  id: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  duration_minutes: number;
  date: string;
  start_time: string;
  status: "pendente" | "confirmado" | "cancelado" | "concluido";
  created_at: string;
};

type Block = {
  id: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  reason: string | null;
};

type Agenda = {
  date: string;
  appointments: Appointment[];
  blocks: Block[];
};

type AgendaResult =
  | { unauthorized: true }
  | { unauthorized: false; error: string }
  | { unauthorized: false; appointments: Appointment[]; blocks: Block[] };

const STATUS_LABEL: Record<Appointment["status"], string> = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  cancelado: "Cancelado",
  concluido: "Concluído",
};

const STATUS_STYLE: Record<Appointment["status"], string> = {
  pendente: "border-accent/60 text-accent",
  confirmado: "border-emerald-500/50 text-emerald-400",
  cancelado: "border-red-500/50 text-red-400",
  concluido: "border-border-light text-foreground-subtle",
};

async function fetchAgenda(targetDate: string): Promise<AgendaResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const [apptRes, blockRes] = await Promise.all([
      fetch(`/api/admin/appointments?date=${targetDate}`, { signal: controller.signal }),
      fetch(`/api/admin/blocks?date=${targetDate}`, { signal: controller.signal }),
    ]);
    if (apptRes.status === 401 || blockRes.status === 401) {
      return { unauthorized: true };
    }
    if (!apptRes.ok || !blockRes.ok) {
      return { unauthorized: false, error: "Erro ao carregar a agenda." };
    }
    const apptData = await apptRes.json();
    const blockData = await blockRes.json();
    return {
      unauthorized: false,
      appointments: apptData.appointments,
      blocks: blockData.blocks,
    };
  } catch {
    return { unauthorized: false, error: "Erro de conexão ao carregar a agenda." };
  } finally {
    clearTimeout(timer);
  }
}

export default function AdminClient() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [blockAllDay, setBlockAllDay] = useState(true);
  const [blockStart, setBlockStart] = useState("09:00");
  const [blockEnd, setBlockEnd] = useState("20:00");
  const [blockReason, setBlockReason] = useState("");

  const loading = agenda === null || agenda.date !== date;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchAgenda(date);
      if (cancelled) return;
      if (result.unauthorized) {
        setAuthed(false);
        return;
      }
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setError(null);
      setAgenda({ date, appointments: result.appointments, blocks: result.blocks });
    })();
    return () => {
      cancelled = true;
    };
  }, [date, reloadKey]);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });
    if (res.ok) {
      setAuthed(true);
      setMessage("Bem-vindo!");
      await refresh();
    } else {
      setError("Senha incorreta.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  async function setStatus(id: string, status: Appointment["status"]) {
    setError(null);
    const res = await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setError("Não foi possível atualizar.");
      return;
    }
    refresh();
  }

  async function createBlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        startTime: blockAllDay ? undefined : blockStart,
        endTime: blockAllDay ? undefined : blockEnd,
        reason: blockReason || undefined,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Não foi possível bloquear.");
      return;
    }
    setBlockReason("");
    refresh();
  }

  async function deleteBlock(id: string) {
    setError(null);
    const res = await fetch("/api/admin/blocks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      setError("Não foi possível remover o bloqueio.");
      return;
    }
    refresh();
  }

  async function refresh() {
    const result = await fetchAgenda(date);
    if (result.unauthorized) {
      setAuthed(false);
      return;
    }
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setAgenda({ date, appointments: result.appointments, blocks: result.blocks });
  }

  if (authed === null) {
    if (error) {
      return (
        <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-24 text-center">
          <p className="text-sm text-foreground-muted">{error}</p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Tentar novamente
          </button>
        </main>
      );
    }
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm text-foreground-subtle">Carregando…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-24">
        <h1 className="font-display text-3xl font-medium text-foreground">Painel</h1>
        <p className="mt-2 text-sm text-foreground-muted">Acesso restrito.</p>
        <form onSubmit={login} className="mt-8">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            autoComplete="current-password"
            required
            className="h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none"
          />
          {error && (
            <p className="mt-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Painel da barbearia</h1>
          <p className="mt-1 text-sm text-foreground-muted">Agenda, confirmações e bloqueios.</p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-border-light px-5 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
        >
          Sair
        </button>
      </div>

      <label className="mt-8 block max-w-xs">
        <span className="text-sm text-foreground-muted">Dia</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground focus:border-accent focus:outline-none"
        />
      </label>

      {message && (
        <p className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <section className="mt-8">
        <h2 className="font-display text-xl font-medium text-foreground">
          Agendamentos {loading && <span className="text-sm font-normal text-foreground-subtle">· carregando…</span>}
        </h2>
        {!loading && agenda?.appointments.length === 0 ? (
          <p className="mt-4 text-sm text-foreground-muted">Nenhum agendamento neste dia.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {(agenda?.appointments ?? []).map((appointment) => (
              <li
                key={appointment.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{appointment.start_time}</span>
                    <span
                      className={`rounded-full border px-3 py-0.5 text-xs font-medium ${STATUS_STYLE[appointment.status]}`}
                    >
                      {STATUS_LABEL[appointment.status]}
                    </span>
                  </div>
                  <p className="mt-2 text-foreground">{appointment.customer_name}</p>
                  <p className="text-sm text-foreground-muted">
                    {appointment.service_name} · {appointment.customer_phone}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  {appointment.status === "pendente" && (
                    <>
                      <button
                        onClick={() => setStatus(appointment.id, "confirmado")}
                        className="rounded-full bg-accent px-4 py-2 font-medium text-background transition-colors hover:bg-accent-hover"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setStatus(appointment.id, "cancelado")}
                        className="rounded-full border border-border-light px-4 py-2 text-foreground-muted transition-colors hover:border-red-500/60 hover:text-red-400"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {appointment.status === "confirmado" && (
                    <>
                      <button
                        onClick={() => setStatus(appointment.id, "concluido")}
                        className="rounded-full bg-accent px-4 py-2 font-medium text-background transition-colors hover:bg-accent-hover"
                      >
                        Concluir
                      </button>
                      <button
                        onClick={() => setStatus(appointment.id, "cancelado")}
                        className="rounded-full border border-border-light px-4 py-2 text-foreground-muted transition-colors hover:border-red-500/60 hover:text-red-400"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {(appointment.status === "cancelado" || appointment.status === "concluido") && (
                    <button
                      onClick={() => setStatus(appointment.id, "pendente")}
                      className="rounded-full border border-border-light px-4 py-2 text-foreground-muted transition-colors hover:text-foreground"
                    >
                      Reativar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-medium text-foreground">Bloqueios do dia</h2>
        {!loading && agenda?.blocks.length === 0 ? (
          <p className="mt-4 text-sm text-foreground-muted">Nenhum bloqueio neste dia.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {(agenda?.blocks ?? []).map((block) => (
              <li
                key={block.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {block.start_time && block.end_time
                      ? `${block.start_time} – ${block.end_time}`
                      : "Dia inteiro"}
                  </p>
                  {block.reason && <p className="text-sm text-foreground-muted">{block.reason}</p>}
                </div>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="rounded-full border border-border-light px-4 py-2 text-sm text-foreground-muted transition-colors hover:border-red-500/60 hover:text-red-400"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={createBlock} className="mt-6 rounded-2xl border border-border bg-surface p-6">
          <label className="flex items-center gap-3 text-sm text-foreground-muted">
            <input
              type="checkbox"
              checked={blockAllDay}
              onChange={(e) => setBlockAllDay(e.target.checked)}
              className="h-4 w-4 accent-[#C6A66B]"
            />
            Bloquear o dia inteiro (folga)
          </label>
          {!blockAllDay && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-foreground-muted">De</span>
                <input
                  type="time"
                  value={blockStart}
                  onChange={(e) => setBlockStart(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-foreground-muted">Até</span>
                <input
                  type="time"
                  value={blockEnd}
                  onChange={(e) => setBlockEnd(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground focus:border-accent focus:outline-none"
                />
              </label>
            </div>
          )}
          <label className="mt-4 block">
            <span className="text-sm text-foreground-muted">Motivo (opcional)</span>
            <input
              type="text"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Ex.: viagem, compromisso"
              className="mt-2 h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Bloquear
          </button>
        </form>
      </section>
    </main>
  );
}