# Metrics

## North Star Metric

**Audits completed per week.**

Why: An audit completion means a user got real value from the tool — they filled in
their stack, saw their savings, and received a personalized report. It's the moment
value is delivered. Everything else (email captures, consultation bookings, credit
purchases) flows downstream from this number.

DAU would be wrong — this is a tool people use once a quarter, not daily. Revenue
would be wrong at this stage — we need to prove the top of funnel works before
optimizing conversion. Audit completions is the one number that tells us if the
product is working.

## 3 Input Metrics That Drive the North Star

**1. Landing page to audit start rate (target: >50%)**
If fewer than half of visitors start the form, the headline and value proposition
aren't landing. This is the first thing to fix if the North Star is low.

**2. Audit start to completion rate (target: >60%)**
If users start the form but don't submit, the form is too long or confusing. Monitors
whether the UX is working. A drop here means simplifying the input flow.

**3. Shareable URL click-through rate (target: >15% of audits shared)**
The viral loop depends on users sharing their audit results. If this is low, the
results page isn't compelling enough to share — either the savings aren't surprising
enough or the UI isn't screenshot-worthy.

## What We'd Instrument First

1. **Audit completions** — fire an event every time POST /api/audit succeeds
2. **Form abandonment by step** — track which tool input causes users to drop off
3. **Email capture rate** — what % of audit completions convert to email submissions
4. **Shareable link copies** — track clicks on "Copy Shareable Link" button
5. **Consultation bookings** — track how many high-savings users book a Credex call

Implementation: Posthog (free tier, self-hostable) or Plausible for privacy-friendly
analytics. Both work with a single script tag in Next.js layout.

## Pivot Trigger

**If audit completion rate drops below 100/week after 4 weeks of active distribution,
reconsider the core value proposition.**

Specifically:
- If landing → start rate is below 30%: the headline isn't working, test new angles
- If start → complete rate is below 40%: the form is too long, cut it to 3 fields
- If email capture rate is below 15%: the results aren't compelling, improve the
  savings calculation logic or UI
- If zero consultation bookings after 50 high-savings audits: the Credex CTA isn't
  converting, rewrite the value proposition for the consultation offer

The tool is a lead-gen asset for Credex. If it's not generating qualified leads after
reasonable distribution effort, the format needs to change — not just the copy.