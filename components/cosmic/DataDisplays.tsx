"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

function clamp(value: number, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

type EnergyGaugeProps = {
  value: number;
};

export function EnergyGauge({ value }: EnergyGaugeProps) {
  const safeValue = clamp(Math.round(value));
  const radius = 53;
  const circumference = 2 * Math.PI * radius;
  const dash = (safeValue / 100) * circumference;

  return (
    <article className="data-card gauge-card">
      <div className="section-kicker">Energy</div>
      <div className="gauge-wrap">
        <svg className="gauge-svg" viewBox="0 0 140 140" aria-hidden="true">
          <defs>
            <linearGradient id="energyGradient" x1="20" y1="18" x2="122" y2="122">
              <stop offset="0" stopColor="rgba(245,246,248,.95)" />
              <stop offset=".55" stopColor="#F5D28A" />
              <stop offset="1" stopColor="rgba(245,210,138,.25)" />
            </linearGradient>
            <filter id="energyGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle className="gauge-bg" cx="70" cy="70" r={radius} />
          <circle
            className="gauge-meter"
            cx="70"
            cy="70"
            filter="url(#energyGlow)"
            r={radius}
            strokeDasharray={`${dash} ${circumference - dash}`}
          />
        </svg>
        <div className="gauge-value">{safeValue}%</div>
      </div>
    </article>
  );
}

function signalY(x: number, strength: number, phase: number, gravityEnabled: boolean) {
  const amplitude = 12 + strength * 0.08 + (gravityEnabled ? 4 : -2);
  const wave = Math.sin(x / 16 + phase) * amplitude;
  const modulation = Math.cos(x / 35 + phase * 0.5) * 6;

  return clamp(64 - wave + modulation, 32, 91);
}

function buildSignalPath(strength: number, phase: number, gravityEnabled: boolean) {
  const points = Array.from({ length: 13 }, (_, index) => {
    const x = 10 + index * 24;
    const y = signalY(x, strength, phase, gravityEnabled);
    return { x, y };
  });

  return points
    .map((point, index) => {
      if (index === 0) {
        return `M${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      }

      const previous = points[index - 1];
      const midX = (previous.x + point.x) / 2;
      return `Q${midX.toFixed(1)} ${previous.y.toFixed(1)} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    })
    .join(" ");
}

type SignalChartProps = {
  strength: number;
  gravityEnabled: boolean;
  selectedTag: string;
};

export function SignalChart({ strength, gravityEnabled, selectedTag }: SignalChartProps) {
  const safeStrength = clamp(strength);
  const phase = selectedTag === "Jupiter" ? 0.35 : selectedTag === "Orbit" ? 0.74 : 0;
  const markerX = 20 + safeStrength * 2.25;
  const markerY = signalY(markerX, safeStrength, phase, gravityEnabled);
  const decibels = (16.68 + safeStrength * 0.36).toFixed(1);
  const path = useMemo(
    () => buildSignalPath(safeStrength, phase, gravityEnabled),
    [gravityEnabled, phase, safeStrength],
  );

  return (
    <article className="data-card signal-card">
      <div className="section-kicker">Signal Strength</div>
      <div className="signal-frame">
        <svg viewBox="0 0 300 118" className="signal-svg" aria-hidden="true">
          <defs>
            <linearGradient id="signalStroke" x1="0" y1="0" x2="300" y2="0">
              <stop offset="0" stopColor="#F5F6F8" stopOpacity=".88" />
              <stop offset=".45" stopColor="#A5A8C9" stopOpacity=".78" />
              <stop offset=".72" stopColor="#F5D28A" stopOpacity=".78" />
              <stop offset="1" stopColor="#F5F6F8" stopOpacity=".32" />
            </linearGradient>
            <filter id="signalGlow" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line className="chart-baseline" x1="10" y1="95" x2="290" y2="95" />
          <line className="chart-marker-line" x1={markerX} y1="18" x2={markerX} y2="95" />
          <path className="signal-path" d={path} filter="url(#signalGlow)" />
          <circle className="signal-dot" cx={markerX} cy={markerY} r="4.5" />
        </svg>
        <span
          className="signal-tooltip"
          style={{ left: `${Math.max(92, Math.min(196, markerX * 0.86 - 18))}px` }}
        >
          {decibels} dB
        </span>
        <div className="signal-times">
          <span>00:00</span>
          <span>24:00</span>
        </div>
      </div>
    </article>
  );
}

const TOTAL_NOISE_SECONDS = 528;

export function NoisePanel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(92);
  const progress = Math.round((position / TOTAL_NOISE_SECONDS) * 100);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setPosition((current) => (current >= TOTAL_NOISE_SECONDS ? 0 : current + 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <article className="data-card noise-card">
      <div className="section-kicker">Cosmic Noise</div>
      <div className="noise-controls">
        <button
          aria-label={isPlaying ? "Pause cosmic noise" : "Play cosmic noise"}
          className={`pause-button ${isPlaying ? "pause-button-playing" : "pause-button-paused"}`}
          onClick={() => setIsPlaying((current) => !current)}
          type="button"
        >
          {isPlaying ? (
            <>
              <span />
              <span />
            </>
          ) : (
            <span className="play-triangle" />
          )}
        </button>
        <label
          className="noise-meter"
          style={{ "--value": `${progress}%` } as CSSProperties}
        >
          <span className="noise-progress" />
          <span className="noise-thumb" />
          <input
            aria-label="Cosmic noise progress"
            className="noise-input"
            max={TOTAL_NOISE_SECONDS}
            min="0"
            onChange={(event) => setPosition(Number(event.currentTarget.value))}
            type="range"
            value={position}
          />
        </label>
      </div>
      <div className="noise-time">
        <span>{formatTime(position)}</span>
        <span>{formatTime(TOTAL_NOISE_SECONDS)}</span>
      </div>
    </article>
  );
}
