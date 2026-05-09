import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { sendAuditEmail } from "@/lib/resend"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, companyName, role, auditId } = body

    if (!email || !auditId) {
      return NextResponse.json({ error: "Email and auditId required" }, { status: 400 })
    }

    const { data: audit } = await supabase
      .from("audits")
      .select("total_monthly_savings")
      .eq("id", auditId)
      .single()

    await supabase.from("leads").insert({
      audit_id: auditId,
      email,
      company_name: companyName || null,
      role: role || null,
    })

    if (audit) {
      await sendAuditEmail(email, audit.total_monthly_savings, auditId)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
  }
}