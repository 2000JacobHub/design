"use client";

import type { VisualKind } from "@/lib/cosmicTokens";

type FeatureCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  onAction?: () => void;
  variant: "jupiter" | "black-hole";
};

export function FeatureCard({ eyebrow, title, body, action, onAction, variant }: FeatureCardProps) {
  return (
    <article className={`feature-card ${variant}`}>
      <div className="feature-copy">
        <div className="feature-eyebrow">{eyebrow}</div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      {variant === "jupiter" ? <JupiterScene /> : <BlackHoleScene />}
      <button
        aria-label={`${action} ${title}`}
        className="feature-action"
        onClick={onAction}
        type="button"
      >
        {action} <span>→</span>
      </button>
    </article>
  );
}

export function DistanceCard() {
  return (
    <article className="feature-card distance-card">
      <div className="sparkle-mark" />
      <DistanceScene />
      <div className="distance-copy">
        <div className="feature-eyebrow">Distance</div>
        <strong>778.3 M km</strong>
        <span>Jupiter · Earth</span>
      </div>
    </article>
  );
}

function JupiterScene() {
  return (
    <div className="jupiter-scene" aria-hidden="true">
      <span className="orbit-ring orbit-ring-one" />
      <span className="orbit-ring orbit-ring-two" />
      <span className="jupiter-planet">
        <span />
      </span>
      <span className="jupiter-shadow" />
    </div>
  );
}

function BlackHoleScene() {
  return (
    <div className="blackhole-scene" aria-hidden="true">
      <span className="accretion accretion-wide" />
      <span className="accretion accretion-hot" />
      <span className="event-horizon" />
      <span className="light-streak light-streak-one" />
      <span className="light-streak light-streak-two" />
    </div>
  );
}

function DistanceScene() {
  return (
    <div className="distance-scene" aria-hidden="true">
      <span className="distance-star" />
      <span className="distance-orbit distance-orbit-one" />
      <span className="distance-orbit distance-orbit-two" />
      <span className="distance-orbit distance-orbit-three" />
    </div>
  );
}

export function VisualTile({ kind, title }: { kind: VisualKind; title: string }) {
  return (
    <figure className="visual-tile">
      <div className={`visual-canvas visual-${kind}`}>
        {kind === "black-hole" && <BlackHoleScene />}
        {kind === "gravity-ring" && <GravityRing />}
        {kind === "light-glow" && <LightGlow />}
        {kind === "nebula-dust" && <NebulaDust />}
        {kind === "glass-surface" && <GlassSurface />}
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}

function GravityRing() {
  return (
    <div className="gravity-ring-scene" aria-hidden="true">
      <span className="ring-beam ring-beam-one" />
      <span className="ring-beam ring-beam-two" />
      <span className="ring-core" />
    </div>
  );
}

function LightGlow() {
  return (
    <div className="light-glow-scene" aria-hidden="true">
      <span className="crescent" />
      <span className="light-haze" />
    </div>
  );
}

function NebulaDust() {
  return (
    <div className="nebula-scene" aria-hidden="true">
      <span className="nebula-cloud" />
      <span className="nebula-spark nebula-spark-one" />
      <span className="nebula-spark nebula-spark-two" />
    </div>
  );
}

function GlassSurface() {
  return (
    <div className="glass-scene" aria-hidden="true">
      <span className="glass-sheen" />
      <span className="glass-edge" />
    </div>
  );
}

export function IconStrip() {
  const icons = ["home", "orbit", "sparkle", "signal", "folder", "heart", "user"];

  return (
    <div className="icon-strip">
      {icons.map((icon) => (
        <Icon key={icon} name={icon} />
      ))}
    </div>
  );
}

function Icon({ name }: { name: string }) {
  return (
    <svg className="cosmic-icon" viewBox="0 0 32 32" aria-hidden="true">
      {name === "home" && (
        <>
          <path d="M5 15.5 16 6l11 9.5" />
          <path d="M8.5 14.5V27h15V14.5" />
          <path d="M13.5 27v-7h5v7" />
        </>
      )}
      {name === "orbit" && (
        <>
          <circle cx="16" cy="16" r="6.8" />
          <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(-35 16 16)" />
          <circle className="icon-fill-dot" cx="25.2" cy="8.4" r="1.7" />
        </>
      )}
      {name === "sparkle" && (
        <>
          <path d="M16 3.5c1.8 7 4.6 9.8 11.5 12.5C20.6 18.6 17.8 21.5 16 28.5 14.2 21.5 11.4 18.6 4.5 16 11.4 13.3 14.2 10.5 16 3.5Z" />
        </>
      )}
      {name === "signal" && (
        <>
          <path d="M12.2 21a7 7 0 0 1 0-10" />
          <path d="M8.2 25a12.8 12.8 0 0 1 0-18" />
          <path d="M19.8 11a7 7 0 0 1 0 10" />
          <path d="M23.8 7a12.8 12.8 0 0 1 0 18" />
          <circle className="icon-fill-dot" cx="16" cy="16" r="1.8" />
        </>
      )}
      {name === "folder" && (
        <>
          <path d="M4.5 9.5h9l3 3h11v14h-23z" />
          <path d="M4.5 12.5h23" />
        </>
      )}
      {name === "heart" && (
        <path d="M16 27S5.5 20.7 5.5 12.6c0-3.5 2.5-6.1 5.8-6.1 2.1 0 3.7 1.1 4.7 2.9 1-1.8 2.6-2.9 4.7-2.9 3.3 0 5.8 2.6 5.8 6.1C26.5 20.7 16 27 16 27Z" />
      )}
      {name === "user" && (
        <>
          <circle cx="16" cy="10.2" r="4.2" />
          <path d="M7.5 27c.8-5.1 4-8 8.5-8s7.7 2.9 8.5 8z" />
        </>
      )}
    </svg>
  );
}
