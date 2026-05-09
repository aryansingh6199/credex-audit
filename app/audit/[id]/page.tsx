"use client"
import { useEffect, useState } from "react"
import { AuditResult } from "@/types"
import { useParams } from "next/navigation"

export default function AuditPage() {
  const { id } = useParams()
  const [audit, setAudit] = useState<AuditResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/audit/${id}`)
      .then(r => r.json())
      .then(data => {
        setAudit(data)
        setLoading(false)
      })
  }, [id])

  async function handleLeadSubmit() {
    if (!email) return
    setSubmitting(true)
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, companyName: company, role, auditId: id }),
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-gray-400">Loading your audit...</p>
    </div>
  )

  if (!audit) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-gray-400">Audit not found.</p>
    </div>
  )

  const isHighSavings = audit.totalMonthlySavings > 500
  const isOptimal = audit.totalMonthlySavings < 100

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Your AI Spend Audit</h1>
          <p className="text-gray-400">Here is where your money is going and where you can save.</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 mb-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Monthly Savings</p>
          <p className="text-5xl font-bold text-green-400">${audit.totalMonthlySavings}</p>
          <p className="text-gray-400 mt-1">${audit.totalAnnualSavings} saved per year</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-gray-300 mb-2 text-sm uppercase tracking-wide">AI Summary</h2>
          <p className="text-gray-200 leading-relaxed">{audit.aiSummary}</p>
        </div>

        {isHighSavings && (
          <div className="bg-green-900 border border-green-700 rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-green-300 text-lg mb-2">You qualify for a Credex consultation</h2>
            <p className="text-green-200 text-sm">With over $500/month in identified savings, Credex can help you capture even more through discounted AI credits.</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {audit.recommendations.map((rec, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold capitalize">{rec.tool.replace("_", " ")}</h3>
                  <p className="text-sm text-gray-400">Current: {rec.currentPlan} plan · ${rec.currentSpend}/mo</p>
                </div>
                <div className="text-right">
                  {rec.monthlySavings > 0 ? (
                    <span className="text-green-400 font-bold">-${rec.monthlySavings}/mo</span>
                  ) : (
                    <span className="text-gray-400 text-sm">Optimal</span>
                  )}
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-sm font-medium text-white mb-1">{rec.recommendedAction}</p>
                <p className="text-sm text-gray-400">{rec.reason}</p>
              </div>
            </div>
          ))}
        </div>

        {isOptimal && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center">
            <h2 className="font-bold text-white text-lg mb-1">You are spending well</h2>
            <p className="text-gray-400 text-sm">Your current AI stack is well-optimized.</p>
          </div>
        )}

        {!submitted ? (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            {!showLeadForm ? (
              <div className="text-center">
                <h2 className="font-bold text-white text-lg mb-2">Save and Email Your Report</h2>
                <p className="text-gray-400 text-sm mb-4">Get a copy of this audit sent to your inbox.</p>
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                >
                  Send My Report
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="font-bold text-white text-lg mb-3">Send My Report</h2>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Company name (optional)"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Your role (optional)"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
                <button
                  onClick={handleLeadSubmit}
                  disabled={submitting}
                  className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-all"
                >
                  {submitting ? "Sending..." : "Send Report"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center">
            <p className="text-green-400 font-semibold">Report sent to {email}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-all text-sm"
          >
            Copy Shareable Link
          </button>
          
            <a
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-all text-sm text-center"
          >
            Run Another Audit
          </a>
        </div>

      </div>
    </main>
  )
}