import { NextRequest, NextResponse } from "next/server"
import { runAudit } from "@/lib/auditEngine"
import { supabase } from "@/lib/supabase"
import { AuditInput } from "@/types"
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 10

  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }
  if (entry.count >= maxRequests) return true
  entry.count++
  return false
}

async function generateSummary(input: AuditInput, monthlySavings: number): Promise<string> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          {
            role: "user",
            content: `You are an AI spend analyst. Write a 100-word personalized summary for a team audit.
Team size: ${input.teamSize}
Use case: ${input.useCase}
Tools used: ${input.tools.map(t => t.tool).join(", ")}
Total monthly savings identified: $${monthlySavings}

Write a concise, specific, friendly summary of their spending situation and top recommendation. No bullet points. Plain paragraph only.`
          }
        ]
      })
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content || fallbackSummary(input, monthlySavings)
  } catch {
    return fallbackSummary(input, monthlySavings)
  }
}

function fallbackSummary(input: AuditInput, monthlySavings: number): string {
  if (monthlySavings === 0) {
    return `Your team of ${input.teamSize} is spending efficiently on AI tools for ${input.useCase}. Based on our analysis, your current plans are well-matched to your team size and use case. You're already optimizing well — keep reviewing your usage quarterly as pricing and alternatives evolve.`
  }
  return `Your team of ${input.teamSize} focused on ${input.useCase} has an opportunity to save $${monthlySavings}/month ($${monthlySavings * 12}/year) on AI tools. Our audit identified mismatches between your current plans and your actual team size and usage patterns. Rightsizing your subscriptions could free up significant budget without any loss in productivity.`
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }
    const input: AuditInput = await req.json()
    const audit = runAudit(input)
    const aiSummary = await generateSummary(input, audit.totalMonthlySavings)

    const fullAudit = { ...audit, aiSummary }

    await supabase.from("audits").insert({
      id: fullAudit.id,
      input: fullAudit.input,
      recommendations: fullAudit.recommendations,
      total_monthly_savings: fullAudit.totalMonthlySavings,
      total_annual_savings: fullAudit.totalAnnualSavings,
      ai_summary: fullAudit.aiSummary,
      created_at: fullAudit.createdAt,
    })

    return NextResponse.json(fullAudit)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Audit failed" }, { status: 500 })
  }
}