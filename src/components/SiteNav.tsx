"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mark } from "./Mark";
import { Button } from "./ui/Button";

const links = [
  { href: "/#product", label: "Product" },
  { href: "/#why", label: "Why Shipfront" },
  { href: "/#network", label: "Network" },
  { href: "/#developers", label: "Developers" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/#resources", label: "Resources" },
];

export function SiteNav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 md:px-6">
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-[16px] px-4 py-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stuck
            ? "border border-[var(--border-subtle)] bg-[rgba(7,9,13,0.78)] shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="Shipfront home">
          <Mark />
          <span className="text-[13px] font-semibold tracking-[0.18em]">SHIPFRONT</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-3 text-[13px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/signin/" className="inline-flex min-h-11 items-center px-3 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            Sign in
          </Link>
          <Button href="/access/">Request access</Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[12px] border border-[var(--border-subtle)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="block h-px w-4 bg-[var(--text-primary)]" />
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="mx-auto mt-2 max-w-[1440px] rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center px-3 text-[14px]"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/signin/" className="inline-flex min-h-11 items-center px-3 text-[14px]" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <div className="p-2">
              <Button href="/access/" className="w-full">Request access</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
