"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/dev/theme", label: "Theme" },
  { href: "/dev/charts", label: "Charts" },
  { href: "/dev/forms", label: "Forms" },
  { href: "/", label: "Dashboard" },
];

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden dashboard-bg">
      <BackgroundOrbs />

      <header className="relative z-2 max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4 px-8 py-6">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <BrandMark />
          <div className="flex flex-col gap-0.5">
            <span className="text-2xl font-light text-soft-white/92 group-hover:text-soft-white">
              Design System
            </span>
          </div>
        </Link>
        <nav aria-label="主导航" className="flex items-center gap-1.5">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} active={isActive(pathname, item.href)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="relative z-2 max-w-[1400px] mx-auto px-8 pb-16 flex flex-col gap-10">
        {children}
      </div>
    </main>
  );
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, children, active = false }: { href: string; children: ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "h-8 px-4 inline-flex items-center justify-center rounded-full text-sm no-underline border transition-colors",
        active
          ? "border-stardust-gold/45 bg-stardust-gold/12 text-soft-white shadow-gold-recess"
          : "border-soft-white/14 text-soft-white/64 bg-cosmic-black/52 hover:text-soft-white/92 hover:border-soft-white/28",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function BrandMark() {
  return (
    <div className="relative w-10 h-10 shrink-0" aria-hidden>
      <span className="absolute inset-0 rounded-full border border-stardust-gold/45" />
      <span className="absolute inset-[7px] rounded-full bg-stardust-gold/24 shadow-gold-soft" />
      <span className="absolute inset-[14px] rounded-full bg-stardust-gold shadow-gold-pulse" />
    </div>
  );
}

function BackgroundOrbs() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <span className="absolute top-[-260px] left-[-120px] w-[520px] h-[520px] rounded-full bg-stardust-gold/6 blur-[120px]" />
      <span className="absolute bottom-[-220px] right-[-160px] w-[640px] h-[640px] rounded-full bg-accent-teal/6 blur-[140px]" />
    </div>
  );
}
