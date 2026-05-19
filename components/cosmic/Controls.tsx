import type { CSSProperties } from "react";
import { tags } from "@/lib/cosmicTokens";

export type CosmicAction = "explore" | "cancel" | "more";

type ButtonGroupProps = {
  activeAction: CosmicAction;
  onActionChange: (action: CosmicAction) => void;
};

export function ButtonGroup({ activeAction, onActionChange }: ButtonGroupProps) {
  const buttons: Array<{
    action: CosmicAction;
    label: string;
    className: string;
  }> = [
    { action: "explore", label: "Explore", className: "cosmic-button-primary" },
    { action: "cancel", label: "Cancel", className: "cosmic-button-secondary" },
    { action: "more", label: "More", className: "cosmic-button-ghost" },
  ];

  return (
    <div className="button-group">
      <div className="section-kicker">Button</div>
      <div className="button-row">
        {buttons.map((button) => (
          <button
            aria-pressed={activeAction === button.action}
            className={`cosmic-button ${button.className} ${
              activeAction === button.action ? "cosmic-button-active" : ""
            }`}
            key={button.action}
            onClick={() => onActionChange(button.action)}
            type="button"
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className="button-label-row">
        <span>Primary</span>
        <span>Secondary</span>
        <span>Ghost</span>
      </div>
    </div>
  );
}

type ToggleGroupProps = {
  gravityEnabled: boolean;
  glowEnabled: boolean;
  onGravityChange: (enabled: boolean) => void;
  onGlowChange: (enabled: boolean) => void;
};

export function ToggleGroup({
  gravityEnabled,
  glowEnabled,
  onGravityChange,
  onGlowChange,
}: ToggleGroupProps) {
  const toggles = [
    {
      checked: gravityEnabled,
      label: "Gravity field",
      onChange: onGravityChange,
    },
    {
      checked: glowEnabled,
      label: "Light glow",
      onChange: onGlowChange,
    },
  ];

  return (
    <div className="toggle-group">
      <div className="section-kicker">Toggle</div>
      <div className="toggle-row">
        {toggles.map((toggle) => (
          <button
            aria-checked={toggle.checked}
            aria-label={toggle.label}
            className={`toggle-switch ${toggle.checked ? "toggle-switch-on" : ""}`}
            key={toggle.label}
            onClick={() => toggle.onChange(!toggle.checked)}
            role="switch"
            type="button"
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}

type TagRowProps = {
  selectedTag: string;
  onTagChange: (tag: string) => void;
};

export function TagRow({ selectedTag, onTagChange }: TagRowProps) {
  return (
    <div className="tag-group">
      <div className="section-kicker">Tags</div>
      <div className="tag-row">
        {tags.map((tag) => (
          <button
            aria-pressed={selectedTag === tag}
            className={`tag-pill ${selectedTag === tag ? "tag-pill-active" : ""}`}
            key={tag}
            onClick={() => onTagChange(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

type SliderDisplayProps = {
  value: number;
  onValueChange: (value: number) => void;
};

export function SliderDisplay({ value, onValueChange }: SliderDisplayProps) {
  return (
    <div className="slider-display">
      <div className="section-kicker">Slider</div>
      <div className="slider-track-wrap">
        <label className="slider-track" style={{ "--value": `${value}%` } as CSSProperties}>
          <span className="slider-progress" />
          <span className="slider-thumb" />
          <input
            aria-label="Cosmic intensity"
            className="slider-input"
            max="100"
            min="0"
            onChange={(event) => onValueChange(Number(event.currentTarget.value))}
            type="range"
            value={value}
          />
        </label>
        <span className="slider-value">{value}%</span>
      </div>
    </div>
  );
}
