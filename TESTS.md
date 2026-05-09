# Tests

## Test File: `lib/auditEngine.test.ts`

Run with: `npm test`

### Test 1: Cursor business plan downgrade
**What it covers:** When a user has Cursor Business plan with 3 or fewer seats,
the audit engine should recommend downgrading to Pro and calculate correct savings.
**Expected:** recommendedPlan = "pro", monthlySavings = 60 (3 seats × $20 savings)

### Test 2: Claude team plan downgrade
**What it covers:** When a user has Claude Team plan with 2 seats, the engine
should recommend switching to individual Pro plans since Team requires minimum
5 seats and costs more.
**Expected:** recommendedPlan = "pro", monthlySavings = 20

### Test 3: GitHub Copilot individual optimal
**What it covers:** When a user is on the correct plan for their use case and team
size, the engine should return zero savings and not recommend any change.
**Expected:** monthlySavings = 0

### Test 4: Total savings calculation
**What it covers:** The totalMonthlySavings field should correctly sum all
individual tool savings across the entire audit.
**Expected:** totalMonthlySavings equals sum of all recommendation monthlySavings

### Test 5: Annual savings calculation
**What it covers:** totalAnnualSavings should always be exactly 12x the monthly
savings figure.
**Expected:** totalAnnualSavings = totalMonthlySavings × 12

## How to Run

```bash
npm test
```

Expected output:
PASS  lib/auditEngine.test.ts
✓ cursor business with 3 seats should recommend downgrade to pro
✓ claude team with 2 seats should recommend individual pro plans
✓ github copilot individual for writing should stay optimal
✓ total monthly savings should sum all tool savings
✓ annual savings should be 12x monthly savings
Tests: 5 passed, 5 total

## CI

Tests run automatically on every push to main via GitHub Actions.
See `.github/workflows/ci.yml`.