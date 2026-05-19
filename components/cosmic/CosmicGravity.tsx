"use client";

import { useState } from "react";
import { palette, typographyRows, visualTiles } from "@/lib/cosmicTokens";
import { ButtonGroup, type CosmicAction, SliderDisplay, TagRow, ToggleGroup } from "./Controls";
import { CosmicFrame } from "./CosmicFrame";
import { DistanceCard, FeatureCard, IconStrip, VisualTile } from "./CosmicCards";
import { EnergyGauge, NoisePanel, SignalChart } from "./DataDisplays";

function Wordmark() {
  return (
    <h1 className="wordmark" aria-label="Cosmic Gravity">
      <span>
        {"COSMIC".split("").map((letter, index) => (
          <b key={`cosmic-${letter}-${index}`}>{letter}</b>
        ))}
      </span>
      <span>
        {"GRAVITY".split("").map((letter, index) => (
          <b key={`gravity-${letter}-${index}`}>{letter}</b>
        ))}
      </span>
    </h1>
  );
}

export default function CosmicGravity() {
  const [activeAction, setActiveAction] = useState<CosmicAction>("explore");
  const [intensity, setIntensity] = useState(72);
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [selectedTag, setSelectedTag] = useState("Black Hole");
  const energyValue = Math.min(99, intensity + (glowEnabled ? 15 : 5));

  const handleActionChange = (action: CosmicAction) => {
    setActiveAction(action);

    if (action === "explore") {
      setIntensity((current) => Math.max(current, 72));
      setGlowEnabled(true);
    }

    if (action === "cancel") {
      setIntensity(0);
      setGravityEnabled(false);
      setGlowEnabled(false);
    }

    if (action === "more") {
      setIntensity(100);
      setGravityEnabled(true);
      setGlowEnabled(true);
    }
  };

  return (
    <CosmicFrame activePage="home" ariaLabel="Cosmic Gravity design system">
          <aside className="left-panel">
            <div className="system-pill">Design System</div>
            <Wordmark />
            <p className="intro-copy">A Design Language Inspired by the Universe.</p>

            <section className="palette-block">
              <div className="section-kicker">Color</div>
              <div className="palette-list">
                {palette.map((color) => (
                  <div className="palette-item" key={color.hex}>
                    <span className={`color-swatch ${color.className}`} />
                    <span>
                      <strong>{color.name}</strong>
                      <small>{color.hex}</small>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="gradient-block">
              <div className="section-kicker">Gradient</div>
              <div className="gradient-token" />
            </section>

            <section className="type-block">
              <div className="section-kicker">Typography</div>
              <div className="type-sample">
                <span className="type-aa">Aa</span>
                <span className="type-copy">
                  <strong>Space Grotesk</strong>
                  <small>A geometric sans-serif with a futuristic feel</small>
                </span>
              </div>
              <div className="type-table">
                {typographyRows.map(([level, name, size]) => (
                  <div className="type-row" key={level}>
                    <span>{level}</span>
                    <span>{name}</span>
                    <span>{size}</span>
                  </div>
                ))}
              </div>
              <p className="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="alphabet">0123456789 . , ! ?</p>
            </section>
          </aside>

          <section className="right-panel">
            <div className="section-kicker page-title">UI Components</div>
            <div className="controls-area">
              <ButtonGroup activeAction={activeAction} onActionChange={handleActionChange} />
              <SliderDisplay value={intensity} onValueChange={setIntensity} />
              <ToggleGroup
                glowEnabled={glowEnabled}
                gravityEnabled={gravityEnabled}
                onGlowChange={setGlowEnabled}
                onGravityChange={setGravityEnabled}
              />
              <TagRow selectedTag={selectedTag} onTagChange={setSelectedTag} />
            </div>

            <div className="section-kicker cards-title">Cards</div>
            <div className="cards-grid">
              <FeatureCard
                action="View"
                eyebrow="Orbit Archive"
                body="The giant planet that shapes its own system."
                onAction={() => {
                  setSelectedTag("Jupiter");
                  handleActionChange("explore");
                }}
                title="Jupiter"
                variant="jupiter"
              />
              <FeatureCard
                action="Discover"
                eyebrow="Cosmic Event"
                body="Light bends. Time follows."
                onAction={() => {
                  setSelectedTag("Black Hole");
                  handleActionChange("more");
                }}
                title="Black Hole"
                variant="black-hole"
              />
              <DistanceCard />
            </div>

            <div className="section-kicker data-title">Data Display</div>
            <div className="data-grid">
              <EnergyGauge value={energyValue} />
              <SignalChart
                gravityEnabled={gravityEnabled}
                selectedTag={selectedTag}
                strength={intensity}
              />
              <NoisePanel />
            </div>

            <div className="section-kicker icon-title">Icon</div>
            <IconStrip />
          </section>

          <section className="visual-elements">
            <div className="section-kicker">Visual Elements</div>
            <div className="visual-grid">
              {visualTiles.map((tile) => (
                <VisualTile key={tile.kind} kind={tile.kind} title={tile.title} />
              ))}
            </div>
          </section>
    </CosmicFrame>
  );
}
