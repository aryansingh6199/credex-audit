"use client"
import { useState, useEffect } from "react"
import { AuditInput, ToolName, UseCase } from "@/types"
import { useRouter } from "next/navigation"

const TOOLS = [
  { id: "cursor", label: "Cursor", plans: ["hobby", "pro", "business", "enterprise"] },
  { id: "github_copilot", label: "GitHub Copilot", plans: ["individual", "business", "enterprise"] },
  { id: "claude", label: "Claude", plans: ["free", "pro", "max", "team", "enterprise", "api"] },
  { id: "chatgpt", label: "ChatGPT", plans: ["plus", "team", "enterprise", "api"] },
  { id: "anthropic_api", label: "Anthropic API", plans: ["pay_as_you_go"] },
  { id: "openai_api", label: "OpenAI API", plans: ["pay_as_you_go"] },
  { id: "gemini", label: "Gemini", plans: ["free", "pro", "ultra", "api"] },
  { id: "windsurf", label: "Windsurf", plans: ["free", "pro", "teams"] },
  { id: "perplexity", label: "Perplexity", plans: ["free", "pro", "enterprise"] },
]

const USE_CASES = ["coding", "writing", "data", "research", "mixed"]

const EMPTY_FORM: AuditInput = {
  tools: [],
  teamSize: 1,
  useCase: "coding",
}

export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState<AuditInput>(EMPTY_FORM)
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("auditForm")
    if (saved) {
      const parsed = JSON.parse(saved)
      setForm(parsed)
      setSelectedTools(parsed.tools.map((t: any) => t.tool))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("auditForm", JSON.stringify(form))
  }, [form])

  function toggleTool(toolId: string) {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(t => t !== toolId))
      setForm(f => ({ ...f, tools: f.tools.filter(t => t.tool !== toolId) }))
    } else {
      setSelectedTools([...selectedTools, toolId])
      setForm(f => ({
        ...f,
        tools: [...f.tools, { tool: toolId as ToolName, plan: TOOLS.find(t => t.id === toolId)!.plans[0], seats: 1, monthlySpend: 0 }]
      }))
    }
  }

  function updateTool(toolId: string, field: string, value: string | number) {
    setForm(f => ({
      ...f,
      tools: f.tools.map(t => t.tool === toolId ? { ...t, [field]: value } : t)
    }))
  }

  async function handleSubmit() {
    if (form.tools.length === 0) {
      setError("Please select at least one tool.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      router.push(`/audit/${data.id}`)
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">AI Spend Auditor</h1>
          <p className="text-gray-400 text-lg">Find out where your team is overspending on AI tools in 60 seconds.</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Team Size</label>
            <input
              type="number"
              min={1}
              value={form.teamSize}
              onChange={e => setForm(f => ({ ...f, teamSize: parseInt(e.target.value) || 1 }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Use Case</label>
            <select
              value={form.useCase}
              onChange={e => setForm(f => ({ ...f, useCase: e.target.value as UseCase }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              {USE_CASES.map(u => (
                <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Select your AI tools</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {TOOLS.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedTools.includes(tool.id)
                      ? "bg-green-600 border-green-500 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {tool.label}
                </button>
              ))}
            </div>

            {selectedTools.map(toolId => {
              const tool = TOOLS.find(t => t.id === toolId)!
              const toolData = form.tools.find(t => t.tool === toolId)
              return (
                <div key={toolId} className="bg-gray-800 rounded-xl p-4 mb-3">
                  <h3 className="font-medium mb-3">{tool.label}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Plan</label>
                      <select
                        value={toolData?.plan}
                        onChange={e => updateTool(toolId, "plan", e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                      >
                        {tool.plans.map(p => (
                          <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Seats</label>
                      <input
                        type="number"
                        min={1}
                        value={toolData?.seats}
                        onChange={e => updateTool(toolId, "seats", parseInt(e.target.value) || 1)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Monthly Spend ($)</label>
                      <input
                        type="number"
                        min={0}
                        value={toolData?.monthlySpend}
                        onChange={e => updateTool(toolId, "monthlySpend", parseFloat(e.target.value) || 0)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all"
          >
            {loading ? "Analyzing your spend..." : "Run My Free Audit"}
          </button>
        </div>
      </div>
    </main>
  )
}