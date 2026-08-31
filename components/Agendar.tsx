"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

const WHATSAPP_NUMBER = "556993303027";

type Service = {
  id: string;
  name: string;
  duration_minutes: number;
};

type Appointment = {
  id: string;
  date: string;
  start_time: string;
  service_name: string;
  customer_name: string;
};

function monthKey(offset: number): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatDayChip(dateStr: string): string {
  const label = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
  }).format(new Date(`${dateStr}T12:00:00Z`));
  return label.replace(".", "");
}

function formatDateLong(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date(`${dateStr}T12:00:00Z`));
}

export default function Agendar() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [servicesError, setServicesError] = useState(false);

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [monthOffset, setMonthOffset] = useState(0);
  const [daysState, setDaysState] = useState<{ key: string; days: string[] } | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booked, setBooked] = useState<Appointment | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { services: Service[] }) => setServices(data.services))
      .catch(() => setServicesError(true));
  }, []);

  const month = useMemo(() => monthKey(monthOffset), [monthOffset]);
  const daysKey = selectedService ? `${selectedService.id}:${month}` : null;
  const loadingDays = !daysKey || daysState === null || daysState.key !== daysKey;
  const days = daysKey && daysState?.key === daysKey ? daysState.days : [];

  useEffect(() => {
    if (!selectedService || !daysKey) return;
    let cancelled = false;
    fetch(`/api/availability?serviceId=${selectedService.id}&month=${month}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { days: string[] }) => {
        if (!cancelled) setDaysState({ key: daysKey, days: data.days });
      })
      .catch(() => {
        if (!cancelled) setDaysState({ key: daysKey, days: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [selectedService, month, daysKey]);

  const loadSlots = useCallback(
    (date: string) => {
      if (!selectedService) return;
      setLoadingSlots(true);
      setSlots([]);
      fetch(`/api/availability?serviceId=${selectedService.id}&date=${date}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data: { slots: string[] }) => setSlots(data.slots))
        .catch(() => setSlots([]))
        .finally(() => setLoadingSlots(false));
    },
    [selectedService]
  );

  function pickService(service: Service) {
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedSlot(null);
    setStep(2);
  }

  function pickDate(date: string) {
    setSelectedDate(date);
    setSelectedSlot(null);
    loadSlots(date);
    setStep(3);
  }

  function pickSlot(slot: string) {
    setSelectedSlot(slot);
    setStep(4);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          serviceId: selectedService.id,
          date: selectedDate,
          startTime: selectedSlot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Não foi possível agendar. Tente novamente.");
        return;
      }
      setBooked(data.appointment);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setBooked(null);
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setName("");
    setPhone("");
    setError(null);
  }

  const whatsappMessage = booked
    ? `Olá! Agendei ${booked.service_name} na Barbearia do Torres para ${formatDateLong(
        booked.date
      )} às ${booked.start_time}. Meu nome é ${booked.customer_name}.`
    : "";

  return (
    <section
      id="agendar"
      className="scroll-mt-24 border-t border-border bg-surface/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Agendamento
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Reserve seu horário
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-foreground-muted">
            Escolha o serviço, o dia e o horário. Atendemos em Pôrto Velho/RO,
            de terça a sábado, das 9h às 20h.
          </p>
        </div>

        <div className="mt-12">
          {booked ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-accent/60 bg-surface p-8 text-center shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                Horário reservado!
              </h3>
              <p className="mt-3 leading-7 text-foreground-muted">
                <span className="font-medium text-foreground">{booked.service_name}</span>
                <br />
                {formatDateLong(booked.date)} às {booked.start_time}
                <br />
                Sua reserva está <span className="text-accent">aguardando confirmação</span>.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
                >
                  Confirmar pelo WhatsApp
                </a>
                <button
                  onClick={reset}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border-light px-8 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                >
                  Agendar outro horário
                </button>
              </div>
            </div>
          ) : servicesError ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-8 text-center">
              <h3 className="font-display text-2xl font-medium text-foreground">
                Agendamento temporariamente indisponível
              </h3>
              <p className="mt-3 leading-7 text-foreground-muted">
                Você pode chamar a gente no WhatsApp para reservar seu horário.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Olá, quero agendar um horário na Barbearia do Torres."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
              >
                Chamar no WhatsApp
              </a>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] sm:p-8">
              <StepsBar step={step} />

              {step === 1 && (
                <div className="mt-8">
                  <h3 className="font-display text-xl font-medium text-foreground">
                    Escolha o serviço
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {(services ?? []).map((service) => (
                      <button
                        key={service.id}
                        onClick={() => pickService(service)}
                        className={`group rounded-2xl border p-6 text-left transition-colors ${
                          selectedService?.id === service.id
                            ? "border-accent bg-surface-elevated"
                            : "border-border bg-surface-elevated hover:border-border-light"
                        }`}
                      >
                        <h4 className="font-display text-lg font-medium text-foreground">
                          {service.name}
                        </h4>
                        <p className="mt-2 text-sm text-foreground-muted">
                          {service.duration_minutes} min
                        </p>
                      </button>
                    ))}
                  </div>
                  {!services && !servicesError && (
                    <p className="mt-6 text-sm text-foreground-subtle">Carregando serviços…</p>
                  )}
                </div>
              )}

              {step === 2 && selectedService && (
                <div className="mt-8">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-medium text-foreground">
                      Escolha o dia
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
                        disabled={monthOffset === 0}
                        className="rounded-full border border-border-light px-3 py-1.5 text-foreground-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => setMonthOffset((o) => o + 1)}
                        className="rounded-full border border-border-light px-3 py-1.5 text-foreground-muted transition-colors hover:text-foreground"
                      >
                        Próximo mês
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-foreground-subtle">
                    {selectedService.name} · {serviceDurationLabel(selectedService.duration_minutes)}
                  </p>
                  {loadingDays ? (
                    <p className="mt-8 text-sm text-foreground-subtle">Carregando dias…</p>
                  ) : days.length === 0 ? (
                    <p className="mt-8 text-sm text-foreground-muted">
                      Sem horários disponíveis neste período.
                    </p>
                  ) : (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {days.map((day) => (
                        <button
                          key={day}
                          onClick={() => pickDate(day)}
                          className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                            selectedDate === day
                              ? "border-accent bg-accent text-background"
                              : "border-border-light text-foreground-muted hover:border-accent/60 hover:text-foreground"
                          }`}
                        >
                          {formatDayChip(day)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step === 3 && selectedDate && (
                <div className="mt-8">
                  <h3 className="font-display text-xl font-medium text-foreground">
                    Escolha o horário
                  </h3>
                  <p className="mt-1 text-sm text-foreground-subtle">
                    {formatDateLong(selectedDate)} · {selectedService?.name}
                  </p>
                  {loadingSlots ? (
                    <p className="mt-8 text-sm text-foreground-subtle">Carregando horários…</p>
                  ) : slots.length === 0 ? (
                    <p className="mt-8 text-sm text-foreground-muted">
                      Sem horários livres nesse dia. Escolha outro dia.
                    </p>
                  ) : (
                    <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => pickSlot(slot)}
                          className={`rounded-full border py-2.5 text-sm font-medium transition-colors ${
                            selectedSlot === slot
                              ? "border-accent bg-accent text-background"
                              : "border-border-light text-foreground-muted hover:border-accent/60 hover:text-foreground"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setStep(2)}
                    className="mt-6 text-sm text-foreground-subtle transition-colors hover:text-foreground"
                  >
                    ← Voltar para os dias
                  </button>
                </div>
              )}

              {step === 4 && (
                <form onSubmit={submit} className="mt-8">
                  <h3 className="font-display text-xl font-medium text-foreground">
                    Seus dados
                  </h3>
                  <p className="mt-1 text-sm text-foreground-subtle">
                    {selectedService?.name} · {formatDateLong(selectedDate ?? "")} às{" "}
                    {selectedSlot}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-foreground-muted">Nome</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={2}
                        autoComplete="name"
                        placeholder="Seu nome"
                        className="mt-2 h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-foreground-muted">WhatsApp</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        minLength={8}
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="(69) 99999-9999"
                        className="mt-2 h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none"
                      />
                    </label>
                  </div>
                  {error && (
                    <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </p>
                  )}
                  <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Agendando…" : "Confirmar agendamento"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-border-light px-8 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      Voltar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function serviceDurationLabel(minutes: number): string {
  return `${minutes} min de atendimento`;
}

function StepsBar({ step }: { step: number }) {
  const labels = ["Serviço", "Dia", "Horário", "Confirmação"];
  return (
    <ol className="flex items-center gap-2">
      {labels.map((label, i) => {
        const current = step === i + 1;
        const done = step > i + 1;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                done
                  ? "bg-accent text-background"
                  : current
                    ? "border border-accent text-accent"
                    : "border border-border text-foreground-subtle"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={`text-xs transition-colors ${
                current ? "text-foreground" : "text-foreground-subtle"
              }`}
            >
              {label}
            </span>
            {i < labels.length - 1 && <span className="mx-1 h-px w-4 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}
