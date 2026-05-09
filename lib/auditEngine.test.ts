import { runAudit } from "./auditEngine"

test("cursor business with 3 seats should recommend downgrade to pro", () => {
  const result = runAudit({
    tools: [{ tool: "cursor", plan: "business", seats: 3, monthlySpend: 120 }],
    teamSize: 3,
    useCase: "coding",
  })
  expect(result.recommendations[0].recommendedPlan).toBe("pro")
  expect(result.recommendations[0].monthlySavings).toBe(60)
})

test("claude team with 2 seats should recommend individual pro plans", () => {
  const result = runAudit({
    tools: [{ tool: "claude", plan: "team", seats: 2, monthlySpend: 60 }],
    teamSize: 2,
    useCase: "writing",
  })
  expect(result.recommendations[0].recommendedPlan).toBe("pro")
  expect(result.recommendations[0].monthlySavings).toBe(20)
})

test("github copilot individual for writing should stay optimal", () => {
  const result = runAudit({
    tools: [{ tool: "github_copilot", plan: "individual", seats: 1, monthlySpend: 10 }],
    teamSize: 1,
    useCase: "writing",
  })
  expect(result.recommendations[0].monthlySavings).toBe(0)
})

test("total monthly savings should sum all tool savings", () => {
  const result = runAudit({
    tools: [
      { tool: "cursor", plan: "business", seats: 2, monthlySpend: 80 },
      { tool: "claude", plan: "team", seats: 2, monthlySpend: 60 },
    ],
    teamSize: 2,
    useCase: "coding",
  })
  expect(result.totalMonthlySavings).toBe(result.recommendations.reduce((s, r) => s + r.monthlySavings, 0))
})

test("annual savings should be 12x monthly savings", () => {
  const result = runAudit({
    tools: [{ tool: "cursor", plan: "enterprise", seats: 5, monthlySpend: 500 }],
    teamSize: 5,
    useCase: "coding",
  })
  expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
})