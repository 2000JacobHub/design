"use client";

import { useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { CosmicFrame } from "./CosmicFrame";

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

export default function FormGallery() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next: string[] = [];

    if (form.codename.trim().length < 4) {
      next.push("Codename");
    }

    if (!form.date) {
      next.push("Launch Date");
    }

    if (form.frequency < 20) {
      next.push("Frequency");
    }

    return next;
  }, [form]);

  const setField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <CosmicFrame activePage="forms" ariaLabel="Cosmic form components">
      <section className="gallery-page form-page">
        <header className="gallery-header">
          <div>
            <div className="system-pill">Form Components</div>
            <h1 className="gallery-title">
              <span>Mission</span>
              <span>Console</span>
            </h1>
          </div>
          <div className="form-status-card">
            <span className="section-kicker">Validation</span>
            <strong>{errors.length === 0 ? "Ready" : `${errors.length} Pending`}</strong>
            <p>{submitted && errors.length === 0 ? "Transmission staged" : form.channel}</p>
          </div>
        </header>

        <form className="form-grid-gallery" onSubmit={handleSubmit}>
          <section className="gallery-card form-panel form-panel-primary">
            <div className="section-kicker">Identity</div>
            <div className="field-grid">
              <label className="cosmic-field">
                <span>Codename</span>
                <input
                  aria-invalid={form.codename.trim().length < 4}
                  onChange={(event) => setField("codename", event.currentTarget.value)}
                  type="text"
                  value={form.codename}
                />
              </label>
              <label className="cosmic-field">
                <span>Search Target</span>
                <input
                  onChange={(event) => setField("query", event.currentTarget.value)}
                  type="search"
                  value={form.query}
                />
              </label>
              <label className="cosmic-field">
                <span>Orbit</span>
                <select
                  onChange={(event) => setField("orbit", event.currentTarget.value)}
                  value={form.orbit}
                >
                  <option value="jupiter">Jupiter</option>
                  <option value="saturn">Saturn</option>
                  <option value="neptune">Neptune</option>
                </select>
              </label>
              <label className="cosmic-field">
                <span>Launch Date</span>
                <input
                  onChange={(event) => setField("date", event.currentTarget.value)}
                  type="date"
                  value={form.date}
                />
              </label>
            </div>
          </section>

          <section className="gallery-card form-panel">
            <div className="section-kicker">Mode</div>
            <div className="segmented-control" role="radiogroup" aria-label="Mission mode">
              {(["scan", "track", "dock"] as const).map((mode) => (
                <button
                  aria-checked={form.mode === mode}
                  className={form.mode === mode ? "segment-active" : ""}
                  key={mode}
                  onClick={() => setField("mode", mode)}
                  role="radio"
                  type="button"
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="radio-stack">
              {(["low", "medium", "high"] as const).map((priority) => (
                <label className="choice-row" key={priority}>
                  <input
                    checked={form.priority === priority}
                    name="priority"
                    onChange={() => setField("priority", priority)}
                    type="radio"
                  />
                  <span>{priority}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="gallery-card form-panel">
            <div className="section-kicker">Switches</div>
            <div className="switch-stack">
              <label className="form-switch">
                <input
                  checked={form.relay}
                  onChange={(event) => setField("relay", event.currentTarget.checked)}
                  type="checkbox"
                />
                <span />
                <b>Relay</b>
              </label>
              <label className="form-switch">
                <input
                  checked={form.stabilized}
                  onChange={(event) => setField("stabilized", event.currentTarget.checked)}
                  type="checkbox"
                />
                <span />
                <b>Stabilized</b>
              </label>
            </div>
            <label
              className="gallery-range form-frequency"
              style={{ "--value": `${form.frequency}%` } as CSSProperties}
            >
              <span>Frequency</span>
              <input
                aria-label="Frequency"
                max="100"
                min="0"
                onChange={(event) => setField("frequency", Number(event.currentTarget.value))}
                type="range"
                value={form.frequency}
              />
              <b>{form.frequency}%</b>
            </label>
          </section>

          <section className="gallery-card form-panel form-panel-message">
            <div className="section-kicker">Message</div>
            <label className="cosmic-field cosmic-textarea">
              <span>Transmission</span>
              <textarea
                onChange={(event) => setField("message", event.currentTarget.value)}
                rows={5}
                value={form.message}
              />
            </label>
          </section>

          <section className="gallery-card form-panel">
            <div className="section-kicker">Stepper</div>
            <div className="stepper-control">
              <button
                aria-label="Decrease frequency"
                onClick={() => setField("frequency", Math.max(0, form.frequency - 5))}
                type="button"
              >
                -
              </button>
              <strong>{form.frequency}</strong>
              <button
                aria-label="Increase frequency"
                onClick={() => setField("frequency", Math.min(100, form.frequency + 5))}
                type="button"
              >
                +
              </button>
            </div>
            <label className="choice-row checkbox-row">
              <input
                checked={form.relay && form.stabilized}
                onChange={(event) => {
                  setField("relay", event.currentTarget.checked);
                  setField("stabilized", event.currentTarget.checked);
                }}
                type="checkbox"
              />
              <span>Pair Locks</span>
            </label>
          </section>

          <section className="gallery-card form-panel form-panel-upload">
            <div className="section-kicker">Upload</div>
            <label className="drop-zone">
              <input
                multiple
                onChange={(event) => {
                  setFiles(Array.from(event.currentTarget.files ?? []).map((file) => file.name));
                }}
                type="file"
              />
              <span>Telemetry Packet</span>
              <strong>{files.length ? `${files.length} file${files.length > 1 ? "s" : ""}` : "Idle"}</strong>
            </label>
            <p>{files[0] ?? "No packet selected"}</p>
          </section>

          <section className="gallery-card form-panel form-panel-summary">
            <div className="section-kicker">Summary</div>
            <div className="summary-list">
              <span>
                Channel <strong>{form.channel}</strong>
              </span>
              <span>
                Mode <strong>{form.mode}</strong>
              </span>
              <span>
                Priority <strong>{form.priority}</strong>
              </span>
            </div>
            <button className="cosmic-submit" type="submit">
              Stage Signal
            </button>
          </section>
        </form>
      </section>
    </CosmicFrame>
  );
}
