"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/how-it-works", label: "How SOR works" },
  { href: "/apply", label: "Apply to stock" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b hairline">
        <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="serif text-xl md:text-2xl tracking-wide">
            Richard Bravo
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-slate transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            aria-label="Open menu"
            className="md:hidden text-sm"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            backgroundColor: "#FAF8F5",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div className="h-16 px-5 flex items-center justify-between border-b hairline shrink-0">
            <span className="serif text-xl">Richard Bravo</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-sm">
              Close
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-5 py-10 serif text-3xl">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
