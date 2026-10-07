Read SITE_SPEC.md before every task. It is the source of truth.

# 1. Who you are working for and how

Approval tiers:
1. GREEN, just do it: read files, create files, install the stack below, run builds, tests, linters, Lighthouse, Playwright, and local commits on `site/pilot-v1`.
2. YELLOW, do it and then report with an undo line: editing files you already committed, or adding any dependency not named in this brief.
3. RED, stop and brief me first: push, merge to main, deploy, connect Vercel, environment variables, deleting files you did not create, or adding forms, cookies, analytics, tracking, or any third-party script or request. Brief format: what you will do, what it touches, what could go wrong, how to undo it. Then wait.

Cloud-session exception: if you are running in a cloud session that requires pushing, you may push branch `site/pilot-v1` only. Never main. Never merge. Never deploy.

Never invent claims, statistics, testimonials, or phone numbers. Never use real personal data.

# 3. Stack

1. Current stable Next.js with the App Router, TypeScript, and Tailwind CSS, configured for static export (`output: 'export'`).
2. Fonts self-hosted through `next/font` so the page makes zero requests to any third party at runtime.
3. No cookies. No localStorage except remembering a manual theme choice.
4. All copy and editable values live in one file, `content/site.ts`. Components read from it; no copy hardcoded in components.
5. Placeholders in `content/site.ts`: `PILOT_PHONE = "+1-555-0100"` (a reserved fictional number), `JOIN_KEYWORD = "PACK"`, `MODERATION_HOURS = "8am to 10pm Pacific"`, `PILOT_AREA = "San Diego area"`. Changing a value there must update every place it appears, including every `sms:` link.
6. `vercel.json` with security headers: a Content-Security-Policy that blocks all third-party sources and that the built page actually works under (handle Next's inline scripts with hashes or the narrowest setting that works, and prove it), `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, and a Permissions-Policy denying camera, microphone, and geolocation.
7. Pilot mode: `<meta name="robots" content="noindex, nofollow">`. This page is reached by flyer, not search.
8. Dev-only tooling allowed: Playwright (for screenshots and network checks) and a small contrast-check script.

# 7. How to work

Stop 1, design plan:
1. Write `docs/design-plan.md` containing:
   1. Palette tokens with hex values and their contrast ratios.
   2. The type scale.
   3. ASCII wireframes at 390px and 1440px.
   4. How the dawn hero works.
2. Critique the plan against the avoid list in Section 5, revise it, and note what you changed.
3. Show it to me. Stop and wait for my go.

Stop 2, first full build:
1. Build the scaffold, all content, and the full visual design, committing each part separately.
2. Use Playwright to screenshot the page at 390px and 1440px, in both day and night mode.
3. Look at your own screenshots, critique them like a senior designer, fix what's weak, and screenshot again.
4. Show me the final four screenshots. Stop and wait.

Stop 3, verification:
1. Run every acceptance check in Section 6.
2. Record exact commands and results in `docs/verification.md`.
3. Fix any failures, then commit.

After every stop, report in this format:
1. What changed, in plain English.
2. Files touched.
3. How I test it: the exact command, or the URL to open, such as http://localhost:3000. Include how to view it on my phone over the same Wi-Fi.
4. Risks.
5. Next step.

If you didn't run something, write "not tested." Never claim something works that you didn't run. If one approach fails, stop and tell me instead of looping.

# 9. Final message

When Stop 3 passes, finish with the five-point report and the line: "Ready for review. Nothing pushed or deployed."
