export type UseCase = "coding" | "writing" | "data" | "research" | "mixed"

export type ToolName =
  | "cursor"
  | "github_copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf"
  | "perplexity"
  

export interface ToolInput {
  tool: ToolName
  plan: string
  seats: number
  monthlySpend: number
}

export interface AuditInput {
  tools: ToolInput[]
  teamSize: number
  useCase: UseCase
}

export interface ToolRecommendation {
  tool: ToolName
  currentPlan: string
  currentSpend: number
  recommendedAction: string
  recommendedPlan: string
  projectedSpend: number
  monthlySavings: number
  reason: string
}

export interface AuditResult {
  id: string
  input: AuditInput
  recommendations: ToolRecommendation[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  aiSummary: string
  createdAt: string
}

export interface LeadCapture {
  email: string
  companyName?: string
  role?: string
  teamSize?: number
  auditId: string
}