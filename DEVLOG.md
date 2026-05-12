# Dev Log — Credex AI Spend Auditor

## Day 1 — 2026-05-09
**Hours worked:** 4
**What I did:** Started coding after 3 days of planning and research (May 6-8) where I read the brief carefully, researched all 8 AI tool pricing pages, and planned the architecture. Today: Set up Next.js project with TypeScript and Tailwind. Created folder structure, initialized Supabase project, set up environment variables. Pushed initial commit to GitHub.
**What I learned:** Supabase requires RLS policies to be explicitly set even for public data. Without them, inserts silently fail.
**Blockers / what I'm stuck on:** PowerShell uses different commands than bash for creating files and folders — had to adapt all terminal commands.
**Plan for tomorrow:** Build the audit engine logic and spend input form.

## Day 2 — 2026-05-10
**Hours worked:** 6
**What I did:** Built the full audit engine with defensible per-tool logic. Built the spend input form with localStorage persistence. Built the results page. Integrated OpenRouter API for AI summary generation with fallback. Fixed Supabase RLS policies. Deployed to Vercel. Set up GitHub Actions CI. Wrote 5 Jest tests — all passing. Added Open Graph meta tags and rate limiting.
**What I learned:** Hardcoded rules are the right call for pricing logic. RLS policies in Supabase block all reads and writes by default. Jest has ESM compatibility issues with newer packages like uuid — solved by replacing with inline function.
**Blockers / what I'm stuck on:** useParams() in Next.js App Router returns undefined on first render — fixed with null check. uuid ESM issue in Jest — fixed by removing the dependency.
**Plan for tomorrow:** UI polish, add more test coverage, fill in entrepreneurial markdown files.

## Day 3 — 2026-05-11
**Hours worked:** 5
**What I did:** UI polish on results page. Wrote all entrepreneurial markdown files — GTM, ECONOMICS, USER_INTERVIEWS, LANDING_COPY, METRICS. Conducted 3 user interviews with Aman, Shubham, and Abhinay (Deloitte). Added Perplexity AI as a supported tool — extended ToolName type in types/index.ts, added pricing tiers and audit logic with 3 recommendation branches in auditEngine.ts, added Perplexity button with plans to the UI in page.tsx, added 2 Jest tests, and updated PRICING_DATA.md.
**What I learned:** Writing GTM and ECONOMICS docs forces founder thinking. User interviews revealed tool overlap is a bigger pain point than plan mismatches. Perplexity was a notable gap — multiple interview subjects use it as their primary research tool.
**Blockers / what I'm stuck on:** No major blockers.
**Plan for tomorrow:** Write REFLECTION, ARCHITECTURE, PRICING_DATA, PROMPTS, TESTS markdown files.

## Day 4 — 2026-05-12
**Hours worked:** 4
**What I did:** Added animated savings counter on the results page — the total monthly and annual savings numbers count up from 0 with an ease-out effect when the audit loads. Added displaySavings and displayAnnual state, wrote a useEffect with setInterval and cubic ease-out math, and swapped the static values in the JSX.
**What I learned:** Small animations on key numbers make the product feel much more polished. The ease-out curve (1 - Math.pow(1 - progress, 3)) makes the count feel natural rather than robotic.
**Blockers / what I'm stuck on:** None.
**Plan for tomorrow:** Final testing on live URL, submit Google Form.

## Day 5 — 2026-05-13
**Hours worked:** 2
**What I did:** Final end-to-end testing on live Vercel URL. Verified git log shows commits across 5 distinct days. Confirmed all required files exist at repo root. Submitted Google Form.
**What I learned:** End-to-end testing on deployed URL is different from local — caught one env variable issue with NEXT_PUBLIC_APP_URL.
**Blockers / what I'm stuck on:** None.
**Plan for tomorrow:** Await Round 2 results.