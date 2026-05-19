"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

export const BOARD_SIZE = 1242;

function useBoardScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const inset = 28;
      setScale(
        Math.min(
          (window.innerWidth - inset) / BOARD_SIZE,
          (window.innerHeight - inset) / BOARD_SIZE,
          1,
        ),
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

type CosmicFrameProps = {
  activePage?: "home" | "charts" | "forms";
  ariaLabel: string;
  children: ReactNode;
};

export function CosmicFrame({ activePage = "home", ariaLabel, children }: CosmicFrameProps) {
  const scale = useBoardScale();

  return (
    <main className="cosmic-root">
      <div
        className="cosmic-stage"
        style={{ width: BOARD_SIZE * scale, height: BOARD_SIZE * scale }}
      >
        <section
          aria-label={ariaLabel}
          className="cosmic-board"
          style={{ transform: `scale(${scale})` }}
        >
          {children}
          <CosmicNav activePage={activePage} />
        </section>
      </div>
    </main>
  );
}

function CosmicNav({ activePage }: { activePage: "home" | "charts" | "forms" }) {
  const items = [
    { href: "/", label: "System", page: "home" },
    { href: "/charts", label: "Charts", page: "charts" },
    { href: "/forms", label: "Forms", page: "forms" },
  ] as const;

  return (
    <nav aria-label="Cosmic component pages" className="cosmic-nav">
      {items.map((item) => (
        <Link
          aria-current={activePage === item.page ? "page" : undefined}
          className={`cosmic-nav-link ${activePage === item.page ? "cosmic-nav-link-active" : ""}`}
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
