# User Interviews

## Interview 1 — Aman, CS Student, Side Projects
**Date:** 2026-05-10
**Duration:** 10 minutes

**Background:** Aman is a CS student who uses AI tools daily for coding and general
reasoning but deliberately avoids paying for any subscriptions. He has developed a
system of rotating between free tiers across multiple tools.

**Direct quotes:**
- "I just manage my tokens carefully so they never run out — why would I pay?"
- "I use GPT for thinking through problems, Gemini for anything with images, and
  Claude when I need actual code written."
- "Switching between them is annoying but it saves me a lot of money every month."

**Most surprising thing they said:**
He had a fully optimized free-tier strategy that most paying users don't even think
about. He wasn't cheap — he was deliberate. He knew exactly which tool was best for
which task and rotated accordingly.

**What it changed about your design:**
Added a "You are spending well" state to the audit results for users who are already
optimized. The tool should be honest — not manufacture fake savings for users who
don't need to change anything. Aman's approach also validated the use-case selector
in the form — different tools genuinely shine for different tasks.

---

## Interview 2 — Shubham, Data Analyst, Freelancer
**Date:** 2026-05-10
**Duration:** 12 minutes

**Background:** Shubham is a freelance data analyst who pays for both GitHub Copilot
and Claude Pro, spending around ₹300-500/month. He uses them heavily for data
analytics report generation and coding.

**Direct quotes:**
- "Both Copilot and Claude together are worth every rupee for what I do."
- "I tried GPT Pro and honestly it just wasn't as good for code and data work."
- "I don't really know if I'm overpaying — I just know it's working so I keep paying."

**Most surprising thing they said:**
He had never compared the actual per-feature value of Copilot vs Claude for his
specific use case. He was paying for both without knowing there was significant
overlap in their coding capabilities. The most surprising moment was when he said
"I don't really know if I'm overpaying" — he had just accepted the bill.

**What it changed about your design:**
This validated the core audit insight about tool overlap. Two tools with overlapping
capabilities for the same use case is a key savings signal the audit engine now flags.
It also reinforced that the target user isn't careless — they're just busy and haven't
had a reason to review their stack.

---

## Interview 3 — Abhinay, Software Engineer at Deloitte, Large Enterprise
**Date:** 2026-05-10
**Duration:** 15 minutes

**Background:** Abhinay is a software engineer at Deloitte using GitHub Copilot,
ChatGPT (GPT-4o), and Claude (3.5 Sonnet/Opus) professionally. He spends around
₹2,500/month and has mixed satisfaction with his current setup.

**Direct quotes:**
- "Cursor replaces GitHub Copilot as your IDE extension — it's the actual editor,
  not just a plugin."
- "Instead of copy-pasting code into a browser, Cursor brings Claude and GPT-4o
  directly into your project files."
- "I'm paying for three things that probably do the same job — I just haven't had
  time to consolidate."

**Most surprising thing they said:**
He already knew exactly what he should switch to — Cursor instead of Copilot — but
hadn't done it yet purely due to inertia. He had done the research, understood the
value, but the switching cost felt high even though it was just installing a new editor.
This was the clearest signal that the audit tool needs to not just identify savings but
reduce the friction of acting on them.

**What it changed about your design:**
Added specific "recommended action" text to each tool card — not just "you could
save $X" but "switch to Cursor Pro ($20/user) — brings Claude and GPT-4o into your
editor, replacing both Copilot and browser-based chat." The recommendation needs to
be specific enough that the user can act on it immediately without more research.