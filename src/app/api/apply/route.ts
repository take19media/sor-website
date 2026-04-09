import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Record<string, string>;
    const { business, contact, email } = data;
    if (!business || !contact || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.RESEND_TO_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL || "applications@richardbravo.example";

    if (!apiKey || !to) {
      console.warn("[apply] Resend not configured; logging submission only.", data);
      return NextResponse.json({ ok: true, logged: true });
    }

    const resend = new Resend(apiKey);
    const rows = Object.entries(data)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;text-transform:uppercase;font-size:11px;letter-spacing:1px;">${k}</td><td style="padding:4px 0;">${String(v).replace(/</g, "&lt;")}</td></tr>`)
      .join("");

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `SOR application — ${business}`,
      html: `<div style="font-family:Inter,system-ui,sans-serif;color:#1A1A1A;"><h2 style="font-family:Georgia,serif;font-weight:500;">New SOR application</h2><table>${rows}</table></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[apply] error", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
