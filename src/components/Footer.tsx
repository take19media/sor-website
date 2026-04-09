import Link from "next/link";

export default function Footer() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-ink/70">
        <div className="serif text-lg text-ink">Richard Bravo</div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8">
          <Link href="/how-it-works">How SOR works</Link>
          <Link href="/apply">Apply to stock</Link>
          {waNumber && (
            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          )}
        </div>
        <div>&copy; {new Date().getFullYear()} Richard Bravo</div>
      </div>
    </footer>
  );
}
