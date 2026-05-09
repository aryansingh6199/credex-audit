# Reflection

## 1. The Hardest Bug I Hit This Week

The hardest bug was the `audit.recommendations.map` TypeError on the results page.
The error was consistent but the cause wasn't obvious — the page was crashing before
the data loaded, which meant I couldn't even see what the API was returning.

My debugging process:
- First hypothesis: the API route was returning wrong data. I checked the terminal
  logs — POST /api/audit was returning 200, so the audit was being created.
- Second hypothesis: the GET route was failing. Terminal confirmed — GET
  /api/audit/[id] was returning 404. So the audit wasn't being saved to Supabase.
- Third hypothesis: Supabase insert was silently failing. I checked the Supabase
  dashboard — the audits table was empty despite successful POST responses.
- Root cause: Supabase RLS (Row Level Security) was enabled but no policies were
  configured. Every insert was being silently rejected. The API returned 200 because
  the insert error wasn't being caught and thrown — it was just being ignored.
- Fix: Added explicit RLS policies allowing all operations, then added proper error
  handling to the insert so future failures would be visible.

The second part of the bug was `useParams()` returning undefined. The fix was
reading params as `const params = useParams(); const id = params?.id as string`
and adding a null check before fetching.

## 2. A Decision I Reversed Mid-Week

I initially put the audit page code into `app/page.tsx` by mistake — pasting the
wrong component into the wrong file. This caused the home page to render the audit
results UI instead of the input form, which was deeply confusing to debug because
the URL showed `localhost:3000` but the content was wrong.

I reversed this immediately once I checked the first 5 lines of `app/page.tsx` and
saw it was importing `useParams` — a clear sign it was the wrong component. The fix
was selecting all, deleting, and pasting the correct home page code.

The broader lesson: always check which file is active in the editor before pasting.
VS Code tabs look similar and it's easy to paste into the wrong one, especially when
working fast.

## 3. What I Would Build in Week 2

**Priority 1 — PDF export of the full report.** The shareable URL is good but a PDF
is more portable for sharing in Slack, email, or a board meeting. Users who find
$2000+/month in savings will want to show this to their CFO — a PDF makes that easy.

**Priority 2 — Benchmark mode.** "Your AI spend per developer is $X — companies
your size average $Y." This requires aggregating anonymized data from audits, which
we'll have by week 2. This is the feature that makes the tool sticky and shareable —
people love knowing where they stand relative to peers.

**Priority 3 — Embeddable widget.** A script tag a blogger or newsletter writer
could drop into their content. "Audit your AI spend in 60 seconds" as an embedded
tool drives distribution without requiring users to navigate to a separate site.

**Priority 4 — Referral codes.** Share the tool, both parties get a perk (extended
report retention, priority Credex consultation). This creates a viral loop tied
directly to Credex's lead generation goal.

## 4. How I Used AI Tools

**Tools used:** Claude (primary), for architecture decisions, code generation, and
debugging hypotheses.

**What I used Claude for:**
- Generating the initial file and folder structure
- Writing the audit engine logic (which I then reviewed and adjusted for accuracy)
- Debugging the Supabase RLS issue — Claude suggested checking RLS policies
  when I described the "POST 200 but GET 404" symptom
- Writing the markdown documentation files

**What I didn't trust AI with:**
- The pricing data — I verified every number against official vendor pricing pages
  myself. AI pricing knowledge has a cutoff and vendor prices change frequently.
- The user interview content — these had to be real conversations, not generated text.
- The final audit logic reasoning — I reviewed every rule to make sure a finance
  person would agree with the logic, not just that it compiled.

**One time the AI was wrong and I caught it:**
Claude suggested using `uuid` package for generating audit IDs in the test
environment. This caused a Jest ESM compatibility error because the uuid package
uses ES modules which Jest can't parse by default. Claude's suggested fix (mapping
uuid to a CJS path) also failed because that path didn't exist in the installed version.
I caught this by reading the actual error output carefully and solved it by replacing
the uuid import with an inline uuid generation function — no external dependency needed.

## 5. Self-Rating

**Discipline: 7/10**
Started strong on Day 1 with setup and commits. Had some late nights debugging
the Supabase RLS issue which cost time, but maintained consistent daily progress
across all 7 days.

**Code quality: 7/10**
TypeScript types are well-defined, audit engine logic is clean and readable, API
routes handle errors. Would improve by adding more specific error types and
extracting the OpenRouter call into a more testable function.

**Design sense: 6/10**
The dark UI is clean and functional but not remarkable. The results page hierarchy
is good — big savings number first, then breakdown, then CTA. Would improve with
better data visualization (a simple bar chart showing spend vs optimized spend per
tool would make the audit more scannable).

**Problem-solving: 8/10**
Debugged the Supabase RLS issue systematically — formed hypotheses, checked each
one, found root cause. Solved the Jest/uuid ESM issue by eliminating the dependency
rather than fighting the toolchain. Generally preferred simple solutions over complex ones.

**Entrepreneurial thinking: 7/10**
Understood the lead-gen mechanic from the start — show value before asking for
email, surface Credex only for high-savings users, make results shareable. The GTM
and economics docs reflect genuine founder thinking, not template-fill. Would improve
by actually running the GTM plan and reporting real traction numbers.