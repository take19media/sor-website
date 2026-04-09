"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "rb-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage unavailable — do not show */
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t hairline bg-cream/95 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="text-sm text-ink/80 flex-1 max-w-prose">
          This site uses cookies to improve your experience. By continuing to browse you agree to
          our use of cookies.
        </p>
        <div className="flex gap-3 md:gap-4 md:shrink-0">
          <Link
            href="/privacy"
            className="text-sm px-5 py-2 border border-rule hover:border-slate transition-colors"
          >
            Learn more
          </Link>
          <button
            type="button"
            onClick={accept}
            className="text-sm px-5 py-2 border border-ink bg-ink text-cream hover:bg-slate hover:border-slate transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
