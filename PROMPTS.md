# Prompts

## AI Summary Prompt

Used in `app/api/audit/route.ts` via OpenRouter API.

### The Prompt
You are an AI spend analyst. Write a 100-word personalized summary for a team audit.
Team size: {teamSize}
Use case: {useCase}
Tools used: {tools}
Total monthly savings identified: ${monthlySavings}
Write a concise, specific, friendly summary of their spending situation and top
recommendation. No bullet points. Plain paragraph only.

### Why I wrote it this way

- **Specific inputs over generic** — passing exact team size, use case, and tools means the output is personalized, not generic filler text.
- **"No bullet points. Plain paragraph only"** — without this constraint, LLMs default to bullet lists which break the UI layout.
- **100-word limit** — keeps the summary scannable. Longer outputs lost user attention in testing.
- **"Friendly" tone instruction** — without it, the model defaults to formal/corporate language that feels cold for a free tool.

### What I tried that didn't work

- **Asking for markdown formatting** — the model added headers and bold text which broke the plain text display.
- **Not specifying length** — first attempt returned 300+ word essays that overwhelmed the results page.
- **Asking for "actionable recommendations"** — the model started repeating the per-tool breakdown already shown on the page, creating redundancy.

### Fallback

If the OpenRouter API fails (timeout, rate limit, or error), the app falls back to a templated summary:

- If savings > $0: "Your team of {n} focused on {useCase} has an opportunity to save ${amount}/month..."
- If savings = $0: "Your team of {n} is spending efficiently on AI tools for {useCase}..."

The fallback covers the spec requirement to handle API failures gracefully.