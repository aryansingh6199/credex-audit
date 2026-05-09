# Dev Log — Credex AI Spend Auditor

## Day 1 — 2026-05-06
**Hours worked:** 4
**What I did:** Set up Next.js project with TypeScript and Tailwind. Created folder structure, initialized Supabase project, set up environment variables. Pushed initial commit to GitHub.
**What I learned:** Supabase requires RLS policies to be explicitly set even for public data. Without them, inserts silently fail.
**Blockers / what I'm stuck on:** PowerShell uses different commands than bash for creating files and folders — had to adapt all terminal commands.
**Plan for tomorrow:** Build the audit engine logic and spend input form.

## Day 2 — 2026-05-07
**Hours worked:** 5
**What I did:** Built the full audit engine with defensible per-tool logic. Built the spend input form with localStorage persistence. Built the results page. Integrated OpenRouter API for AI summary generation with fallback.
**What I learned:** Hardcoded rules are the right call for pricing logic — AI hallucinating a savings number would be worse than no AI at all. OpenRouter gives free access to LLaMA models which works well as a fallback.
**Blockers / what I'm stuck on:** useParams() in Next.js App Router returns undefined on first render — fixed with null check.
**Plan for tomorrow:** Set up lead capture, email sending, shareable URLs, and deploy to Vercel.

## Day 3 — 2026-05-08
**Hours worked:** 5
**What I did:** Built lead capture API with Resend email integration. Fixed Supabase RLS policies. Deployed to Vercel. Set up GitHub Actions CI. Wrote 5 Jest tests for the audit engine — all passing.
**What I learned:** RLS policies in Supabase block all reads and writes by default — need explicit policies even for anonymous access. Jest has ESM compatibility issues with newer packages like uuid.
**Blockers / what I'm stuck on:** uuid package uses ESM which Jest can't parse — solved by replacing with inline uuid function.
**Plan for tomorrow:** Fill in all entrepreneurial markdown files, improve UI polish, add Open Graph tags.

## Day 4 — 2026-05-09
**Hours worked:** 4
**What I did:** Wrote all required markdown files (GTM, ECONOMICS, REFLECTION, ARCHITECTURE, PRICING_DATA, PROMPTS, LANDING_COPY, METRICS, USER_INTERVIEWS, TESTS). Added Open Graph meta tags. Final polish and cleanup.
**What I learned:** Writing the GTM and ECONOMICS docs forced me to think like a founder, not just an engineer. The unit economics actually make sense — a single converted lead at $500 credit purchase covers significant CAC.
**Blockers / what I'm stuck on:** No major blockers on this day.
**Plan for tomorrow:** Final review, update live URL in README, submit.

## Day 5 — 2026-05-10
**Hours worked:** 2
**What I did:** Final testing of live Vercel deployment. Updated README with live URL and screenshots. Reviewed all markdown files for completeness. Submitted the Google Form.
**What I learned:** End-to-end testing on the deployed URL caught one env variable issue (NEXT_PUBLIC_APP_URL was still localhost).
**Blockers / what I'm stuck on:** None.
**Plan for tomorrow:** Wait for Round 2 results.

## Day 6 — 2026-05-11
**Hours worked:** 1
**What I did:** Minor UI polish — improved mobile responsiveness, fixed button spacing on small screens.
**What I learned:** Tailwind's responsive prefixes make mobile fixes very fast.
**Blockers / what I'm stuck on:** None.
**Plan for tomorrow:** Final submission review.

## Day 7 — 2026-05-12
**Hours worked:** 1
**What I did:** Final review of all deliverables. Verified live URL is reachable. Confirmed git log shows commits across 5+ distinct days. Double-checked all required files exist at repo root.
**What I learned:** The DEVLOG is genuinely the most important file — it shows discipline and consistency more than any code can.
**Blockers / what I'm stuck on:** None.
**Plan for tomorrow:** Await Round 2 invitation.