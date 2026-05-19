export const cosmicColors = {
  cosmicBlack: "#050507",
  deepSpace: "#0E0E14",
  softWhite: "#F5F6F8",
  stardustGold: "#F5D28A",
  nightPurple: "#1A1C2A",
  duskBlue: "#0F1B2A",
  nebulaTeal: "#0E1F22",
};

export const palette = [
  { name: "Cosmic Black", hex: cosmicColors.cosmicBlack, className: "swatch-black" },
  { name: "Deep Space", hex: cosmicColors.deepSpace, className: "swatch-space" },
  { name: "Soft White", hex: cosmicColors.softWhite, className: "swatch-white" },
  { name: "Stardust Gold", hex: cosmicColors.stardustGold, className: "swatch-gold" },
  { name: "Night Purple", hex: cosmicColors.nightPurple, className: "swatch-purple" },
  { name: "Dusk Blue", hex: cosmicColors.duskBlue, className: "swatch-blue" },
  { name: "Nebula Teal", hex: cosmicColors.nebulaTeal, className: "swatch-teal" },
];

export const typographyRows = [
  ["H1", "Cosmic Light", "32 / Medium"],
  ["H2", "Explore More", "24 / Medium"],
  ["Body", "Celestial Text", "14 / Regular"],
  ["Caption", "Orbit Info", "12 / Regular"],
];

export const tags = ["Black Hole", "Jupiter", "Orbit"];

export const visualTiles = [
  { title: "Black Hole", kind: "black-hole" },
  { title: "Gravity Ring", kind: "gravity-ring" },
  { title: "Light Glow", kind: "light-glow" },
  { title: "Nebula Dust", kind: "nebula-dust" },
  { title: "Glass Surface", kind: "glass-surface" },
] as const;

export type VisualKind = (typeof visualTiles)[number]["kind"];
