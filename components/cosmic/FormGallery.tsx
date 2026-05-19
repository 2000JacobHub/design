"use client";

import { useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

type FormState = {
  channel: string;
  codename: string;
  date: string;
  frequency: number;
  message: string;
  mode: "scan" | "track" | "dock";
  orbit: string;
  priority: "low" | "medium" | "high";
  query: string;
  relay: boolean;
  stabilized: boolean;
};

const initialForm: FormState = {
  channel: "Europa Relay",
  codename: "Aster-72",
  date: "2026-05-18",
  frequency: 72,
  message: "Align the outer ring before signal capture.",
  mode: "track",
  orbit: "jupiter",
  priority: "medium",
  query: "black hole",
  relay: true,
  stabilized: false,
};

const kicker = "text-xs tracking-[0.16em] text-soft-white/46 uppercase";
const fieldInput =
  "h-10 w-full px-3 rounded-[10px] bg-soft-white/4 border border-soft-white/10 text-soft-white/92 text-base " +
  "placeholder:text-soft-white/30 transition-colors hover:border-soft-white/22 focus:outline-none focus:border-stardust-gold/55 focus:bg-soft-white/8 " +
  "[color-scheme:dark]";

export default function FormGallery() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next: string[] = [];
    if (form.codename.trim().length < 4) next.push("Codename");
    if (!form.date) next.push("Launch Date");
    if (form.frequency < 20) next.push("Frequency");
    return next;
  }, [form]);

  const setField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((c) => ({ ...c, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section aria-label="Cosmic form components" className="flex flex-col gap-6 pt-4">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="cosmic-pill self-start">Form Components</span>
          <h1 className="m-0 leading-none flex flex-col gap-1 text-soft-white/92 font-light">
            <span className="text-5xl">Mission</span>
            <span className="text-5xl">Console</span>
          </h1>
        </div>
        <div className="cosmic-card flex flex-col gap-1 p-4 min-w-[208px]">
          <span className={kicker}>Validation</span>
          <strong className="text-3xl font-light text-soft-white/92">
            {errors.length === 0 ? "Ready" : `${errors.length} Pending`}
          </strong>
          <p className="m-0 text-sm text-soft-white/52">
            {submitted && errors.length === 0 ? "Transmission staged" : form.channel}
          </p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-3 gap-4"
        style={{ gridAutoRows: "220px" }}
      >
          <FormPanel title="Identity" className="row-span-2">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Codename">
                <input
                  aria-invalid={form.codename.trim().length < 4}
                  className={fieldInput}
                  onChange={(e) => setField("codename", e.currentTarget.value)}
                  type="text"
                  value={form.codename}
                />
              </Field>
              <Field label="Search Target">
                <input
                  className={fieldInput}
                  onChange={(e) => setField("query", e.currentTarget.value)}
                  type="search"
                  value={form.query}
                />
              </Field>
              <Field label="Orbit">
                <select
                  className={`${fieldInput} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22 fill=%22%23f5d28a%22><path d=%22M6 8 0 0h12z%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:10px_8px] pr-9`}
                  onChange={(e) => setField("orbit", e.currentTarget.value)}
                  value={form.orbit}
                >
                  <option value="jupiter">Jupiter</option>
                  <option value="saturn">Saturn</option>
                  <option value="neptune">Neptune</option>
                </select>
              </Field>
              <Field label="Launch Date">
                <input
                  className={fieldInput}
                  onChange={(e) => setField("date", e.currentTarget.value)}
                  type="date"
                  value={form.date}
                />
              </Field>
            </div>
          </FormPanel>

          <FormPanel title="Mode">
            <div
              role="radiogroup"
              aria-label="Mission mode"
              className="grid grid-cols-3 gap-1 p-1 bg-cosmic-black/64 border border-soft-white/10 rounded-[10px]"
            >
              {(["scan", "track", "dock"] as const).map((mode) => (
                <button
                  key={mode}
                  aria-checked={form.mode === mode}
                  onClick={() => setField("mode", mode)}
                  role="radio"
                  type="button"
                  className={[
                    "h-9 rounded-[8px] text-sm uppercase tracking-[0.14em] transition-colors",
                    form.mode === mode
                      ? "bg-stardust-gold/16 text-soft-white shadow-[inset_0_0_0_1px_rgb(245_210_138/0.36)]"
                      : "text-soft-white/64 hover:bg-soft-white/4 hover:text-soft-white/92",
                  ].join(" ")}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {(["low", "medium", "high"] as const).map((priority) => (
                <label key={priority} className="flex items-center gap-3 cursor-pointer">
                  <input
                    checked={form.priority === priority}
                    name="priority"
                    onChange={() => setField("priority", priority)}
                    type="radio"
                    className="appearance-none w-4 h-4 rounded-full border border-soft-white/30 grid place-items-center checked:border-stardust-gold checked:before:content-[''] checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-stardust-gold checked:before:shadow-[0_0_8px_rgb(245_210_138/0.6)]"
                  />
                  <span className="text-base uppercase tracking-[0.08em] text-soft-white/72">{priority}</span>
                </label>
              ))}
            </div>
          </FormPanel>

          <FormPanel title="Message" className="row-span-2">
            <Field label="Transmission">
              <textarea
                onChange={(e) => setField("message", e.currentTarget.value)}
                rows={8}
                value={form.message}
                className={`${fieldInput} h-auto py-3 resize-none`}
              />
            </Field>
          </FormPanel>

          <FormPanel title="Switches">
            <div className="flex flex-col gap-3">
              <SwitchRow
                checked={form.relay}
                label="Relay"
                onChange={(v) => setField("relay", v)}
              />
              <SwitchRow
                checked={form.stabilized}
                label="Stabilized"
                onChange={(v) => setField("stabilized", v)}
              />
            </div>
            <label
              className="mt-4 flex items-center gap-3"
              style={{ "--value": `${form.frequency}%` } as CSSProperties}
            >
              <span className="text-xs uppercase tracking-[0.14em] text-soft-white/56 min-w-[78px]">Frequency</span>
              <span className="relative flex-1 h-3 flex items-center">
                <span className="absolute inset-x-0 h-[3px] rounded-full bg-soft-white/12" />
                <span
                  className="absolute left-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#f5f6f8,#f5d28a)]"
                  style={{ width: "var(--value)" }}
                />
                <input
                  aria-label="Frequency"
                  className="relative w-full h-3 opacity-0 cursor-pointer"
                  max="100"
                  min="0"
                  onChange={(e) => setField("frequency", Number(e.currentTarget.value))}
                  type="range"
                  value={form.frequency}
                />
                <span
                  aria-hidden
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 w-3 h-3 rounded-full bg-stardust-gold shadow-[0_0_10px_rgb(245_210_138/0.5)] pointer-events-none"
                  style={{ left: "var(--value)" }}
                />
              </span>
              <b className="text-sm tabular-nums text-soft-white/82 min-w-[40px] text-right">{form.frequency}%</b>
            </label>
          </FormPanel>

          <FormPanel title="Stepper">
            <div className="flex items-center gap-3">
              <StepperButton
                ariaLabel="Decrease frequency"
                onClick={() => setField("frequency", Math.max(0, form.frequency - 5))}
              >
                −
              </StepperButton>
              <strong className="flex-1 text-center text-4xl font-light text-soft-white/92 border border-soft-white/10 rounded-[10px] py-2 tabular-nums bg-cosmic-black/40">
                {form.frequency}
              </strong>
              <StepperButton
                ariaLabel="Increase frequency"
                onClick={() => setField("frequency", Math.min(100, form.frequency + 5))}
              >
                +
              </StepperButton>
            </div>
            <label className="mt-4 flex items-center gap-3 cursor-pointer">
              <input
                checked={form.relay && form.stabilized}
                onChange={(e) => {
                  setField("relay", e.currentTarget.checked);
                  setField("stabilized", e.currentTarget.checked);
                }}
                type="checkbox"
                className="appearance-none w-4 h-4 rounded-[5px] border border-soft-white/30 grid place-items-center checked:border-stardust-gold checked:bg-stardust-gold/12 checked:before:content-['✓'] checked:before:text-stardust-gold checked:before:text-2xs checked:before:leading-none"
              />
              <span className="text-sm uppercase tracking-[0.1em] text-soft-white/72">Pair Locks</span>
            </label>
          </FormPanel>

          <FormPanel title="Upload">
            <label className="block cursor-pointer">
              <input
                multiple
                onChange={(e) => setFiles(Array.from(e.currentTarget.files ?? []).map((f) => f.name))}
                type="file"
                className="sr-only"
              />
              <span
                className={[
                  "flex flex-col items-center justify-center gap-2",
                  "h-[120px] rounded-[12px] border border-dashed border-soft-white/22",
                  "bg-cosmic-black/48 text-center transition-colors",
                  "hover:border-stardust-gold/45 hover:bg-stardust-gold/4",
                ].join(" ")}
              >
                <span className="text-xs uppercase tracking-[0.14em] text-soft-white/56">Telemetry Packet</span>
                <strong className="text-2xl font-light text-soft-white/92">
                  {files.length ? `${files.length} file${files.length > 1 ? "s" : ""}` : "Idle"}
                </strong>
              </span>
            </label>
            <p className="mt-3 mb-0 text-xs text-soft-white/52">
              {files[0] ?? "No packet selected"}
            </p>
          </FormPanel>

          <FormPanel title="Summary">
            <div className="flex flex-col gap-2 text-sm">
              <SummaryRow label="Channel" value={form.channel} />
              <SummaryRow label="Mode" value={form.mode} />
              <SummaryRow label="Priority" value={form.priority} />
            </div>
            <button
              type="submit"
              className={[
                "mt-auto h-11 rounded-[10px] text-base tracking-[0.2em] uppercase",
                "bg-[linear-gradient(180deg,#f8dba0_0%,#e7b66e_100%)] text-cosmic-black",
                "border border-stardust-gold/72 shadow-[0_0_22px_rgb(245_210_138/0.42)]",
                "hover:shadow-[0_0_28px_rgb(245_210_138/0.6)] transition-shadow",
                "focus-visible:outline focus-visible:outline-stardust-gold/72 focus-visible:outline-offset-4",
              ].join(" ")}
            >
              Stage Signal
            </button>
          </FormPanel>
      </form>
    </section>
  );
}

function FormPanel({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <section className={`cosmic-panel p-5 flex flex-col gap-4 min-h-0 ${className}`}>
      <div className={kicker}>{title}</div>
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.12em] text-soft-white/56">{label}</span>
      {children}
    </label>
  );
}

function SwitchRow({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        checked={checked}
        onChange={(e) => onChange(e.currentTarget.checked)}
        type="checkbox"
        className="sr-only peer"
      />
      <span
        aria-hidden
        className={[
          "relative w-[44px] h-[24px] rounded-full transition-colors",
          "border border-soft-white/18",
          checked
            ? "bg-[linear-gradient(90deg,rgb(245_210_138/0.55),rgb(245_210_138/0.18))]"
            : "bg-soft-white/6",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full transition-all",
            checked
              ? "left-[24px] bg-stardust-gold shadow-[0_0_10px_rgb(245_210_138/0.6)]"
              : "left-1 bg-soft-white/72",
          ].join(" ")}
        />
      </span>
      <b className="text-sm uppercase tracking-[0.1em] text-soft-white/82 font-medium">{label}</b>
    </label>
  );
}

function StepperButton({
  ariaLabel,
  children,
  onClick,
}: {
  ariaLabel: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      className={[
        "w-10 h-10 rounded-full border border-soft-white/18 text-soft-white/82 text-xl",
        "bg-soft-white/4 hover:bg-stardust-gold/14 hover:border-stardust-gold/45 hover:text-stardust-gold transition-colors",
        "focus-visible:outline focus-visible:outline-stardust-gold/72 focus-visible:outline-offset-4",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex justify-between gap-3">
      <span className="text-soft-white/56 uppercase tracking-[0.12em]">{label}</span>
      <strong className="text-soft-white/92 uppercase tracking-[0.06em] truncate text-right">{value}</strong>
    </span>
  );
}
