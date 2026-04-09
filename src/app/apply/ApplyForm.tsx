"use client";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b hairline bg-transparent py-3 text-base focus:outline-none focus:border-ink transition-colors";
const labelClass = "block text-xs uppercase tracking-widest text-ink/60 mt-8";

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
      setStatus("sent");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-12 border-t hairline pt-10">
        <p className="serif text-2xl">Thank you.</p>
        <p className="mt-3 text-ink/70">
          Your enquiry has reached the studio. We will reply within a few working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10">
      <label className={labelClass}>Business name</label>
      <input name="business" required className={fieldClass} />

      <label className={labelClass}>Contact name</label>
      <input name="contact" required className={fieldClass} />

      <label className={labelClass}>Email</label>
      <input name="email" type="email" required className={fieldClass} />

      <label className={labelClass}>Phone</label>
      <input name="phone" className={fieldClass} />

      <label className={labelClass}>Type of outlet</label>
      <input
        name="outletType"
        placeholder="Boutique, gallery, concept store…"
        className={fieldClass}
      />

      <label className={labelClass}>Location</label>
      <input name="location" className={fieldClass} />

      <label className={labelClass}>Tell us about your shop</label>
      <textarea name="message" rows={4} className={fieldClass} />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-12 border border-ink px-8 py-3 text-sm tracking-wide hover:bg-ink hover:text-cream transition-colors disabled:opacity-40"
      >
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
    </form>
  );
}
