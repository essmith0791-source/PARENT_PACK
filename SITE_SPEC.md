# 2. What this website is

ParentPack is a free, private group for postpartum moms who feel like they are doing this alone. We are running a four-week pilot: one WhatsApp group of 6 to 8 moms whose babies were born around the same time. This website is a single static page that a doula's flyer or QR code sends a mom to. It explains the pilot and tells her how to join by text message.

It is not the app. There are no accounts, forms, databases, waitlists, or user data of any kind.

Build: the home page `/`, a simple 404 page, a favicon, a social preview image, automatic night mode, accessibility, performance, and security headers.

Do not build: forms, email capture, waitlists, logins, app screens, extra pages, a blog, analytics, chat widgets, cookie banners, maps, testimonials, partner logos, or any feature not listed here.

# 4. Page content

Use this copy. You may tighten wording for clarity. Never add claims.

1. Header: wordmark "ParentPack". One text link, "How to join", jumping to the join section. Nothing else.

2. Hero.
   Headline: "Nobody should have to do this alone."
   Subhead: "A free, private group chat for 6 to 8 moms whose babies arrived around the same time. Four weeks. Just reading is fine."
   Primary button: "Text us to join". This is an `sms:` link to PILOT_PHONE with the body JOIN_KEYWORD. Use a format that works on both iPhone and Android, and test both formats.
   Small line under the button: "Pilot group, [PILOT_AREA]. Not therapy or a crisis service."

3. Who it's for, one short paragraph with no list: "You had a baby in the last few months, and you don't have mom friends nearby who get it. Maybe your friends went quiet. Maybe you moved. Maybe you just feel like you're doing this alone."

4. How the pilot works. This is a real sequence, so use three numbered steps:
   1. "Text us. We'll ask three quick questions: your baby's birth month, your time zone, and whether you have local mom friends."
   2. "We place you in one private WhatsApp group with moms at your stage. No browsing. Nobody searches for you."
   3. "Talk when you want. Read when you don't. The same group, every day, for four weeks."

5. What it is not: "ParentPack is peer connection, not medical care, therapy, or a crisis service. The group is moderated from [MODERATION_HOURS]. Outside those hours, nobody is watching the chat." Put the Help Now block directly below.

6. Help Now block. Use these numbers exactly. Every entry is a `tel:` or `sms:` link with a large tap target:
   1. Immediate danger: call 911.
   2. 988 Suicide and Crisis Lifeline: call or text 988.
   3. Crisis Text Line: text HOME to 741741.
   4. National Maternal Mental Health Hotline: call or text 1-833-852-6262.
   5. Postpartum Support International HelpLine: 1-800-944-4773. Label it: "Support and referrals, not a crisis line."
   6. National Domestic Violence Hotline: call 1-800-799-7233, or text START to 88788.

7. Privacy, in plain words: "This page collects nothing. No cookies, no tracking, no analytics. If you join, we'll only ask for your first name and the three answers above. We never ask for your address, your baby's name, or health information. You can leave the group and ask us to delete your answers anytime."

8. FAQ, using native `<details>` elements:
   1. "Does it cost anything?" Answer: "No. It's free, and connection will always be free."
   2. "Can other moms find me?" Answer: "No. There's no directory or search. You're placed in one small group, and only that group sees you."
   3. "What if I never post?" Answer: "That's fine. Plenty of moms just read at first."
   4. "What if I'm really struggling right now?" The answer starts with the 988 and 1-833-852-6262 links, then: "ParentPack is a group of moms, not care. Please reach out to one of these now."
   5. "What happens after four weeks?" Answer: "We'll ask what worked. If the group wants to keep going, it can."

9. Join section, with `id="join"`: "Ready? Text [JOIN_KEYWORD] to [PILOT_PHONE]." Repeat the "Text us to join" button. Note: "Adults only. We'll send a short consent message before adding you."

10. Footer: "ParentPack. Nobody should have to do this alone." Add one line: "Peer connection, not medical care or a crisis service." Then the copyright year. No legal links yet.

Never write: "safe", "verified", "we monitor", "24/7", "helps with postpartum depression", statistics, testimonials, or promises about how fast someone gets placed.

# 5. Design direction

The concept is warm dawn, done on purpose: the sky at the 5am feed, just before sunrise. It must not look like a generic AI website. Specifically avoid the common flat-cream background with a terracotta accent.

1. Palette. Treat these as starting tokens; verify contrast and adjust:
   1. Day background: lilac-tinted morning white, about #F4F2F8.
   2. Text: deep plum-slate, about #2E2A3B.
   3. Secondary text: about #5A536E.
   4. Accent: apricot, about #F0A97C. Use it only for fills and highlights, never for body text.
   5. Primary button: plum, about #3D3350, with light text.
   6. Night mode: background about #1B1923, text about #ECE7F2, accent low-glare amber about #E3A46A.
2. Typography: one family chosen for tired eyes, Atkinson Hyperlegible Next. If `next/font` can't load it, use Atkinson Hyperlegible and tell me. Use a large, heavy hero headline. Body text is 18px on mobile and never below 16px. Keep line length under 70 characters, with generous line-height.
3. One memorable element: the hero background is a soft sky that brightens once, from pre-dawn to first light, when the page loads. Nothing else on the page animates. Under `prefers-reduced-motion`, show the final state immediately.
4. Layout:
   1. A single centered reading column with left-aligned text and generous vertical rhythm.
   2. No card grids and no rows of identical rounded boxes.
   3. No gradients anywhere except the hero.
   4. No all-caps eyebrow labels and no middle-dot meta strings.
   5. No arrows appended to buttons.
   6. No numbered markers except the real three-step sequence.
5. Night mode follows `prefers-color-scheme` automatically. Add a small, accessible manual toggle.
6. Tap targets are at least 44 by 44px. Focus outlines are visible and styled to match. Spacing must account for mobile safe areas.

# 6. Acceptance criteria (the finish line)

1. No horizontal scroll at 320, 390, 768, and 1440px widths.
2. Every tap target is at least 44 by 44px, and every interactive element shows a visible keyboard focus.
3. Contrast meets WCAG 2.2 AA in both modes. Check every text and background pair with your contrast script and record the ratios.
4. Lighthouse on a production build, mobile: accessibility 100 (or explain each deduction), best practices at least 95, performance at least 95. The SEO score will note the intentional noindex.
5. Zero requests to third-party domains, verified with a Playwright network log.
6. Zero cookies set. No console errors or warnings.
7. Every crisis number matches Section 4 exactly, and every `tel:` and `sms:` link is checked.
8. `npm run build` succeeds, and the export folder contains only static files.
9. Changing PILOT_PHONE in `content/site.ts` updates every link. Demonstrate this.

# 8. Product boundaries this page must respect

ParentPack places moms into small groups. Moms never browse, search, or swipe other moms. The page must never imply browsing, matching profiles, maps, presence, an AI assistant, screening scores, monitoring, or paid connection.
