import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendAuditEmail(
  email: string,
  monthlySavings: number,
  auditId: string
) {
  const isHighSavings = monthlySavings > 500

  await resend.emails.send({
    from: "Credex Audit <audit@credex.rocks>",
    to: email,
    subject: `Your AI Spend Audit — $${monthlySavings}/mo in potential savings`,
    html: `
      <h2>Your AI Spend Audit is ready</h2>
      <p>We found <strong>$${monthlySavings}/month</strong> in potential savings ($${monthlySavings * 12}/year).</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/audit/${auditId}">View your full audit report</a></p>
      ${isHighSavings ? `
      <hr/>
      <p><strong>You qualify for a Credex consultation.</strong> We source discounted AI credits from companies that overforecast — our team will reach out shortly to show you how to capture even more savings.</p>
      ` : ""}
      <p>— The Credex Team</p>
    `,
  })
}