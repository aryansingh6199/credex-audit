import { AuditInput, AuditResult, ToolInput, ToolRecommendation } from "@/types"
import { v4 as uuidv4 } from "uuid"

const PRICING: Record<string, Record<string, number>> = {
  cursor: { hobby: 0, pro: 20, business: 40, enterprise: 100 },
  github_copilot: { individual: 10, business: 19, enterprise: 39 },
  claude: { free: 0, pro: 20, max: 100, team: 30, enterprise: 60, api: 0 },
  chatgpt: { plus: 20, team: 30, enterprise: 60, api: 0 },
  anthropic_api: { pay_as_you_go: 0 },
  openai_api: { pay_as_you_go: 0 },
  gemini: { free: 0, pro: 20, ultra: 30, api: 0 },
  windsurf: { free: 0, pro: 15, teams: 35 },
}

function auditTool(tool: ToolInput, teamSize: number, useCase: string): ToolRecommendation {
  let recommendedPlan = tool.plan
  let recommendedAction = "No change needed"
  let projectedSpend = tool.monthlySpend
  let reason = "Your current plan is well-matched to your usage."

  const seats = tool.seats || 1
  const spend = tool.monthlySpend

  if (tool.tool === "cursor") {
    if (tool.plan === "business" && seats <= 3) {
      recommendedPlan = "pro"
      projectedSpend = 20 * seats
      recommendedAction = "Downgrade to Pro"
      reason = `Business plan ($40/user) is designed for teams needing SSO and admin controls. With ${seats} users, Pro ($20/user) gives identical coding features at half the cost.`
    } else if (tool.plan === "enterprise" && seats <= 10) {
      recommendedPlan = "business"
      projectedSpend = 40 * seats
      recommendedAction = "Downgrade to Business"
      reason = `Enterprise pricing is for large orgs needing custom contracts. ${seats} seats qualifies for Business plan at $40/user with no loss of functionality.`
    } else {
      reason = "Cursor plan matches your team size and use case."
    }
  }

  if (tool.tool === "github_copilot") {
    if (tool.plan === "enterprise" && seats <= 10) {
      recommendedPlan = "business"
      projectedSpend = 19 * seats
      recommendedAction = "Downgrade to Business"
      reason = `Copilot Enterprise ($39/user) adds Docsets and PR summaries. For ${seats} users focused on ${useCase}, Business ($19/user) covers all core AI coding needs.`
    } else if (tool.plan === "business" && useCase === "writing") {
      recommendedPlan = "individual"
      projectedSpend = 10 * seats
      recommendedAction = "Downgrade to Individual"
      reason = `Copilot Business adds admin controls, but for a writing-focused team, Individual plan ($10/user) is sufficient.`
    } else {
      reason = "GitHub Copilot plan is appropriate for your team."
    }
  }

  if (tool.tool === "claude") {
    if (tool.plan === "team" && seats <= 2) {
      recommendedPlan = "pro"
      projectedSpend = 20 * seats
      recommendedAction = "Switch to individual Pro plans"
      reason = `Claude Team ($30/user) requires minimum 5 seats. With ${seats} users, two individual Pro plans ($20/user) saves money and has no seat minimum.`
    } else if (tool.plan === "enterprise" && seats <= 5) {
      recommendedPlan = "team"
      projectedSpend = 30 * seats
      recommendedAction = "Downgrade to Team"
      reason = `Claude Enterprise is priced for large orgs needing SSO and audit logs. ${seats} seats fits Team plan at $30/user with full collaboration features.`
    } else {
      reason = "Claude plan is well-matched to your team size."
    }
  }

  if (tool.tool === "chatgpt") {
    if (tool.plan === "team" && seats <= 2) {
      recommendedPlan = "plus"
      projectedSpend = 20 * seats
      recommendedAction = "Switch to individual Plus plans"
      reason = `ChatGPT Team ($30/user) adds shared workspaces. With only ${seats} users, individual Plus plans ($20/user) provide the same GPT-4 access at lower cost.`
    } else if (tool.plan === "enterprise" && seats <= 10) {
      recommendedPlan = "team"
      projectedSpend = 30 * seats
      recommendedAction = "Downgrade to Team"
      reason = `ChatGPT Enterprise pricing is negotiated for large deployments. ${seats} seats is well within Team plan range at $30/user.`
    } else {
      reason = "ChatGPT plan matches your team size."
    }
  }

  if (tool.tool === "gemini") {
    if (tool.plan === "ultra" && useCase === "coding") {
      recommendedPlan = "pro"
      projectedSpend = 20 * seats
      recommendedAction = "Downgrade to Pro"
      reason = `Gemini Ultra adds multimodal research features. For coding use cases, Gemini Pro ($20/user) provides equivalent code generation at $10/user less.`
    } else {
      reason = "Gemini plan is appropriate for your use case."
    }
  }

  if (tool.tool === "windsurf") {
    if (tool.plan === "teams" && seats <= 3) {
      recommendedPlan = "pro"
      projectedSpend = 15 * seats
      recommendedAction = "Downgrade to Pro"
      reason = `Windsurf Teams ($35/user) adds admin and analytics. With ${seats} users, individual Pro plans ($15/user) give full AI coding capability at lower cost.`
    } else {
      reason = "Windsurf plan is appropriate."
    }
  }

  const monthlySavings = Math.max(0, spend - projectedSpend)

  return {
    tool: tool.tool,
    currentPlan: tool.plan,
    currentSpend: spend,
    recommendedAction,
    recommendedPlan,
    projectedSpend,
    monthlySavings,
    reason,
  }
}

export function runAudit(input: AuditInput): Omit<AuditResult, "aiSummary"> {
  const recommendations = input.tools.map((t) =>
    auditTool(t, input.teamSize, input.useCase)
  )

  const totalMonthlySavings = recommendations.reduce(
    (sum, r) => sum + r.monthlySavings, 0
  )

  return {
    id: uuidv4(),
    input,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    createdAt: new Date().toISOString(),
  }
}