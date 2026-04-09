import ApplyForm from "./ApplyForm";

export const metadata = { title: "Apply to stock — Richard Bravo" };

export default function ApplyPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <div className="mx-auto max-w-2xl px-5 md:px-8 pt-12 md:pt-20">
      <h1 className="serif text-4xl md:text-5xl">Apply to stock</h1>
      <p className="mt-6 text-ink/70 max-w-prose">
        We work with a small number of independent boutiques and galleries. Tell us a little about
        your shop and we will be in touch.
      </p>

      <ApplyForm />

      {waNumber && (
        <p className="mt-12 text-sm text-ink/60 border-t hairline pt-8">
          Prefer to talk directly?{" "}
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hi, I'm interested in stocking Richard Bravo jewellery")}`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 decoration-slate"
          >
            Message us on WhatsApp
          </a>
          .
        </p>
      )}
    </div>
  );
}
