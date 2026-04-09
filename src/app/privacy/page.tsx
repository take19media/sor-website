import Link from "next/link";

export const metadata = {
  title: "Privacy & cookies — Richard Bravo",
  description: "How Richard Bravo handles your data, cookies used on this site, and your rights under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 md:px-8 pt-12 md:pt-20 pb-20">
      <h1 className="serif text-4xl md:text-5xl">Privacy &amp; cookies</h1>
      <p className="mt-4 text-sm text-ink/50 uppercase tracking-widest">Placeholder policy — review before launch</p>

      <div className="mt-10 space-y-8 text-ink/85 leading-relaxed">
        <section>
          <p>
            Richard Bravo (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the data controller for personal
            information collected through this website. This page explains what we collect, why,
            and how to exercise your rights under the UK General Data Protection Regulation (UK
            GDPR) and the Data Protection Act 2018.
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl">What data we collect</h2>
          <p className="mt-3">
            We only collect information you choose to give us through the stockist application
            form: business name, contact name, email address, phone number, outlet type, location,
            and anything you write in the free-text field. We do not collect financial information,
            identity documents, or sensitive personal data through this site.
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl">How we use your data</h2>
          <p className="mt-3">
            Information submitted through the application form is used solely to respond to your
            enquiry about stocking Richard Bravo jewellery on a sale or return basis. We do not use
            it for marketing and we do not share it with third parties other than our email
            delivery provider (Resend) for the purpose of transmitting the enquiry to us.
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl">Cookies</h2>
          <p className="mt-3">
            This site uses a small number of cookies and similar technologies:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2">
            <li>
              <strong>Consent preference</strong> — a single value stored in your browser&rsquo;s
              local storage to remember that you have dismissed the cookie banner. No personal data.
            </li>
            <li>
              <strong>Hosting and performance</strong> — our host (Vercel) may set cookies strictly
              necessary for the secure delivery of pages.
            </li>
            <li>
              <strong>Content delivery</strong> — image and content requests to Sanity and Vercel
              CDNs may be logged for the purpose of delivering the site to you.
            </li>
          </ul>
          <p className="mt-3">
            We do not use advertising, tracking, or analytics cookies. You can clear site data at
            any time through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl">How long we keep your data</h2>
          <p className="mt-3">
            Enquiries received through the application form are retained for as long as necessary
            to respond to and, where relevant, maintain an ongoing stockist relationship. We will
            delete enquiries that do not lead to a relationship within a reasonable period.
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl">Your rights</h2>
          <p className="mt-3">
            Under UK GDPR you have the right to access the personal data we hold about you, to
            request correction of inaccurate data, to object to processing, and to request
            <strong> erasure</strong> (&ldquo;the right to be forgotten&rdquo;). To exercise any of
            these rights, contact us at the email below and we will respond within one month.
          </p>
          <p className="mt-3">
            If you are unhappy with how we have handled your data you have the right to complain to
            the Information Commissioner&rsquo;s Office at{" "}
            <a
              className="underline underline-offset-4 decoration-slate"
              href="https://ico.org.uk"
              target="_blank"
              rel="noreferrer"
            >
              ico.org.uk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl">Contact</h2>
          <p className="mt-3">
            For any privacy question or to exercise your rights, please email{" "}
            <a
              className="underline underline-offset-4 decoration-slate"
              href="mailto:richardbravouk2@gmail.com"
            >
              richardbravouk2@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="border-t hairline pt-6 text-sm text-ink/60">
          <p>
            This policy was last updated on the date of the most recent site deployment. Return to
            the <Link href="/" className="underline underline-offset-4 decoration-slate">homepage</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
