# ParentPack pilot site: design plan (Stop 1)

Status: proposal for review. Nothing is built yet.

## 1. The idea in one line

The sky at the 5am feed, just before sunrise. The page sits on a cool lilac field. Warmth appears only where light falls: the horizon in the hero, the edge of the Help Now panel, the three step markers, and the join keyword. That one rule keeps it far from the flat-cream-and-terracotta look. There are no photos, no illustrations, and no icons. The sky is the only image.

Preview of the sky's first and last frames, day and night (a plan mockup, not the build): `docs/design-plan-sky.jpg`.

## 2. Palette

### Tokens (v2, after the critique in section 8)

| Token | Day | Night | Used for |
| --- | --- | --- | --- |
| `--bg` | `#F4F2F8` | `#1B1923` | Page background |
| `--text` | `#2E2A3B` | `#ECE7F2` | All body text and **all** hero text |
| `--text-2` | `#5A536E` | `#ADA5BF` | Secondary lines, outside the hero only |
| `--surface` | `#EAE5F2` | `#262131` | Help Now panel only |
| `--rule` | `#D5CFE0` | `#3A3448` | Hairline dividers (decorative) |
| `--accent` | `#F0A97C` apricot | `#E3A46A` amber | Fills and highlights only, never text |
| `--button` | `#3D3350` plum | `#E3A46A` amber | Primary button fill |
| `--button-text` | `#FFFFFF` | `#1B1923` | Primary button label |
| `--focus` | `#3D3350` | `#E3A46A` | Focus ring, link underline |

Kept exactly from the brief: background, text, secondary, and apricot (day), plus background, text, and amber (night).
Changed: the night button is amber with dark text, not plum (see section 8, item 3).
Added: night secondary text, surface, rule, and focus.

### Contrast ratios

Computed with the WCAG 2.2 relative-luminance formula. In Stop 2 the script is committed as `scripts/contrast.mjs`. In Stop 3 it re-checks the real CSS.

| Pair | Day | Night | Needs |
| --- | --- | --- | --- |
| Body text on background | 12.51 | 14.28 | 4.5 |
| Secondary text on background | 6.52 | 7.37 | 4.5 |
| Text on Help Now panel | 11.25 | 12.85 | 4.5 |
| Secondary text on Help Now panel | 5.86 | 6.63 | 4.5 |
| Button label on button | 11.75 | 8.09 | 4.5 |
| Button shape against background (non-text) | 10.57 | 8.09 | 3 |
| Focus ring against background (non-text) | 10.57 | 8.09 | 3 |
| Focus ring against Help Now panel (non-text) | 9.50 | 7.28 | 3 |
| Step numerals and keyword on accent fill | 7.06 | 8.09 | 4.5 |
| Hero text, worst frame of the sunrise | 6.32 | 12.98 | 4.5 |
| Button shape against the sky, worst frame | 6.44 | 7.35 | 3 |

All pass. Each hero row checks every 5% step of the animation, from the first frame to the last. For reference, apricot against the day background is 1.77:1. That is why apricot is never text and never the focus ring.

## 3. Type

Family: **Atkinson Hyperlegible Next**, loaded with `next/font/google`.

- Confirmed in the font list that ships with Next.js 16.4.0, the current stable release.
- It is a variable font, weights 200–800. The Latin file is about 34 KB.
- License: SIL OFL 1.1.
- Downloaded once at build time and served from our own domain, so it makes zero requests to Google at runtime.
- No fallback to the original Atkinson Hyperlegible is needed.

| Role | 360px wide | 1440px wide | Weight | Line height | CSS size |
| --- | --- | --- | --- | --- | --- |
| Hero headline (H1) | 40px | 72px | 800 | 1.05, tracking −0.015em | `clamp(2.5rem, 1.833rem + 2.963vw, 4.5rem)` |
| Section heading (H2) | 28px | 36px | 700 | 1.2 | `clamp(1.75rem, 1.583rem + 0.741vw, 2.25rem)` |
| Hero subhead | 20px | 24px | 400 | 1.45 | `clamp(1.25rem, 1.167rem + 0.37vw, 1.5rem)` |
| Body | 18px | 20px | 400 | 1.65 | `clamp(1.125rem, 1.083rem + 0.185vw, 1.25rem)` |
| Small lines | 16px | 16px | 400 | 1.5 | `1rem`, the floor; nothing on the site is smaller |
| Buttons and Help Now links | 18px | 18px | 700 | 1.2 | `1.125rem` |
| Wordmark | 20px | 22px | 800 | 1 | `clamp(1.25rem, 1.208rem + 0.185vw, 1.375rem)` |

- **Line length:** the column is at most 40rem (640px). That gives about 58–62 characters per line at 20px on desktop and about 36–40 on a 390px phone. Both stay under 70. Stop 3 measures it in the browser.
- **Phone numbers** never break across lines.
- **Headings** are sentence case: Who it's for, How it works, What it is not, Need help now?, Your privacy, Questions, Ready?

## 4. Layout and spacing

- **One centered column:** `width: min(100% − 2 × gutter, 40rem)`. The header, hero text, every section, and the footer share the same left edge. Text is left-aligned everywhere.
- **Gutters:** `max(1.25rem, env(safe-area-inset-left/right))`. This protects text from the curved edges of a landscape iPhone.
- **Safe areas:** the page uses `viewport-fit=cover`. The header's top padding is `max(1rem, env(safe-area-inset-top))` and the footer's bottom padding is `max(2rem, env(safe-area-inset-bottom))`.
- **Rhythm:** 4px base. Sections sit `clamp(4rem, 3.25rem + 3.33vw, 6rem)` apart. Paragraphs are spaced 1em apart.
- **Tap targets:**
  - Buttons: 56px tall.
  - Help Now links: 48px or more.
  - "How to join": padded to at least 44 × 44.
  - FAQ rows: 56px or more.
  - Theme options: at least 44 × 44.
- **Focus:** every interactive element gets a 3px ring in `--focus`, offset 3px, following the element's corner radius.
- **Motion:** nothing moves except the sky. "How to join" jumps instantly, with no smooth scrolling. FAQ answers open instantly.

## 5. Sections

- **Header:** wordmark on the left, "How to join" on the right, both sitting on the sky. Nothing else.
- **Hero:** see section 6.
- **Who it's for:** heading and one paragraph.
- **How it works:** these are the only numbered markers on the page. Each step has a 44px apricot disc with a plum numeral, aligned to the step's first line. No connecting line.
- **What it is not:** heading and paragraph, with the Help Now panel directly below.
- **Help Now:**
  - One panel: lilac surface, a 6px apricot edge on the left, no shadow, no gradient.
  - Heading: "Need help now?"
  - Six entries separated by hairlines. Each entry is a bold name plus one or two large text links ("Call 988", "Text 988").
  - The Postpartum Support International entry carries "Support and referrals, not a crisis line." in secondary text.
  - No numbers, no icons, and no box around each entry.
- **Your privacy:** heading and paragraph.
- **Questions:**
  - Five native `<details>` rows separated by hairlines. Each row is at least 56px tall, with a "+" that swaps to "−" when open.
  - The "really struggling" answer opens with the 988 and 1-833-852-6262 links.
- **Ready? (`id="join"`):** the line "Text PACK to +1-555-0100." with PACK on an apricot highlight. Then the same button again, and the adults-only note in secondary text.
- **Footer:**
  - A hairline, then the two required lines and the year.
  - Then the theme control: three options, "Auto", "Day", and "Night".
  - The control lives here because the header may hold only two things.
  - "Auto" follows the phone's setting.
  - A manual choice is saved in `localStorage` under `pp-theme`, the only thing the site stores.
  - A tiny script in the page head applies the saved choice before the first paint, so a mom in night mode never gets a white flash.
- **404:** the sky in its final frame, with no animation. "Page not found." and a link home.
- **Favicon:** a plum square with an apricot half-sun on a horizon line.
- **Social preview image:** 1200 × 630, the first-light sky with the wordmark and headline.

## 6. How the dawn hero works

1. **Two layers, both CSS gradients:**
   - The base layer is the pre-dawn sky. Day: `#B4AACB → #C3B7D3 → #D3C5D6`. Night: `#0F0D16 → #15121F → #1B1923`.
   - A `::before` overlay holds the first-light sky. Day: `#E4DEF0 → #ECE7F5 → #F2EEF7`. Night: `#1E1A2B → #241F31 → #2A2233`.
2. **The horizon band** lives only in a reserved strip at the bottom of the hero, `clamp(8rem, 22svh, 16rem)` tall, below all the text.
   - Day: apricot light rising from the bottom edge, strongest 28% from the left.
   - Night: rose-mauve with a faint amber point.
   - Text can never sit on it.
3. **On load,** the overlay fades from invisible to fully visible, once: a 0.3s delay, then 2.8s, slowing at the end.
   - Only opacity animates, which the browser handles on the graphics chip. Nothing shifts and the text is never repainted.
   - No JavaScript. It works with JavaScript turned off.
4. **Text never animates.** The headline paints immediately. It is the element Lighthouse times for "largest contentful paint," so this also protects the performance score.
5. **The hero's bottom edge is the horizon:** a crisp line where the sky meets the page. The hero is about 80% of the screen tall, so the next heading peeks above the fold as a cue to scroll.
6. **Reduced motion:** under `prefers-reduced-motion`, the overlay shows at full opacity with no animation, so the final frame appears immediately.
7. **Theme switch after load:** jumps straight to the other mode's final frame, with no replay.
8. **Contrast holds on every frame:** the worst day frame is 6.32:1 and the worst night frame is 12.98:1.

## 7. Wireframes

### 390px (1 character ≈ 10px)

```
 ┌─────────────────────────────────────┐   sky begins
 │ ParentPack            How to join   │   header on the sky, 64px tall
 │                                     │
 │ Nobody should                       │   H1 40px, weight 800
 │ have to do this                     │
 │ alone.                              │
 │                                     │
 │ A free, private group chat for 6    │   subhead 20px
 │ to 8 moms whose babies arrived      │
 │ around the same time. Four weeks.   │
 │ Just reading is fine.               │
 │                                     │
 │ (         Text us to join         ) │   plum pill, full width, 56px tall
 │ Pilot group, San Diego area. Not    │   16px, same text color as above
 │ therapy or a crisis service.        │
 │                                     │
 │ ....................................│   horizon strip (no text here):
 │ :::::::::::::::.....................│   warm band rises from the
 │ ;;;;;;;;;;;;;;;;;::::::::...........│   bottom edge after load
 └─────────────────────────────────────┘   the horizon: a crisp edge
   Who it's for                            H2 28px, peeks above the fold
   You had a baby in the last few
   months, and you don't have mom
   friends nearby who get it. Maybe
   your friends went quiet. Maybe you
   moved. Maybe you just feel like
   you're doing this alone.

   How it works
   (1) Text us. We'll ask three quick      44px apricot discs, plum
       questions: your baby's birth        numerals; the only numbered
       month, your time zone, and          markers on the page
       whether you have local mom
       friends.
   (2) We place you in one private
       WhatsApp group with moms at
       your stage. No browsing. Nobody
       searches for you.
   (3) Talk when you want. Read when
       you don't. The same group, every
       day, for four weeks.

   What it is not
   ParentPack is peer connection, not
   medical care, therapy, or a crisis
   service. The group is moderated
   from 8am to 10pm Pacific. Outside
   those hours, nobody is watching the
   chat.

 ┃ Need help now?                          one panel: lilac surface,
 ┃                                         6px apricot edge, rows split
 ┃ Immediate danger                        by hairlines, links 48px+
 ┃ Call 911
 ┃ ─────────────────────────────────
 ┃ 988 Suicide and Crisis Lifeline
 ┃ Call 988        Text 988
 ┃ ─────────────────────────────────
 ┃ Crisis Text Line
 ┃ Text HOME to 741741
 ┃ ─────────────────────────────────
 ┃ National Maternal Mental Health
 ┃ Hotline
 ┃ Call 1-833-852-6262
 ┃ Text 1-833-852-6262
 ┃ ─────────────────────────────────
 ┃ Postpartum Support International
 ┃ HelpLine
 ┃ Support and referrals, not a            secondary text
 ┃ crisis line.
 ┃ Call 1-800-944-4773
 ┃ ─────────────────────────────────
 ┃ National Domestic Violence Hotline
 ┃ Call 1-800-799-7233
 ┃ Text START to 88788

   Your privacy
   This page collects nothing. No
   cookies, no tracking, no analytics.
   (rest of the privacy paragraph)

   Questions
   ─────────────────────────────────────
   Does it cost anything?             +    native <details>, rows 56px+
   ─────────────────────────────────────
   Can other moms find me?            +
   ─────────────────────────────────────
   What if I never post?              +
   ─────────────────────────────────────
   What if I'm really struggling      +
   right now?
   ─────────────────────────────────────
   What happens after four weeks?     +
   ─────────────────────────────────────

   Ready?                                  section id="join"
   Text [PACK] to +1-555-0100.             PACK on an apricot highlight
   (         Text us to join           )
   Adults only. We'll send a short
   consent message before adding you.

   ─────────────────────────────────────
   ParentPack. Nobody should have to
   do this alone.
   Peer connection, not medical care
   or a crisis service.
   © 2026
   Theme  ( Auto | Day | Night )           footer only, 44px+ options
```

### 1440px (1 character ≈ 14.4px; the 640px column starts 400px from the left)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           ParentPack                                   How to join               │
│                                                                                                  │
│                           Nobody should                                                          │
│                           have to do this                     H1 72px, weight 800                │
│                           alone.                                                                 │
│                                                                                                  │
│                           A free, private group chat for 6 to 8                                  │
│                           moms whose babies arrived around the        subhead 24px               │
│                           same time. Four weeks. Just reading is                                 │
│                           fine.                                                                  │
│                                                                                                  │
│                           (   Text us to join   )                     pill sized to its label    │
│                           Pilot group, San Diego area. Not therapy                               │
│                           or a crisis service.                                                   │
│                                                                                                  │
│ .................................................................................................│
│ ::::::::::::::::::::::::::::::::::::::::.........................................................│
│ ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::::::::::::::::::::::::::::..................................│
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
                           Who it's for
                           You had a baby in the last few months, and      body 20px, about
                           you don't have mom friends nearby who get it.   58 to 62 characters
                           Maybe your friends went quiet. Maybe you        per line
                           moved. Maybe you just feel like you're doing
                           this alone.

                           How it works
                           (1) Text us. We'll ask three quick questions:
                               your baby's birth month, your time zone,
                               and whether you have local mom friends.
                           (2) We place you in one private WhatsApp group
                               with moms at your stage. No browsing.
                               Nobody searches for you.
                           (3) Talk when you want. Read when you don't.
                               The same group, every day, for four weeks.

                           What it is not
                           ParentPack is peer connection, not medical
                           care, therapy, or a crisis service. ...

                         ┃ Need help now?
                         ┃ Immediate danger
                         ┃ Call 911
                         ┃ ──────────────────────────────────────────────
                         ┃ 988 Suicide and Crisis Lifeline
                         ┃ Call 988        Text 988
                         ┃ ──────────────────────────────────────────────
                         ┃ (remaining four entries, same pattern)

                           Your privacy, Questions, Ready?, and the footer
                           follow in the same column.
```

## 8. Critique against the avoid list, and what changed

v1 means my first-pass decisions, before I checked them against the section 5 avoid list and ran the contrast math. Items 1–4 were found by measurement or by rendering; the rest by checking the list.

| # | v1 | Problem | v2 |
| --- | --- | --- | --- |
| 1 | Secondary text (`#5A536E`) for the small line under the hero button | 3.30:1 on the first sunrise frame (needs 4.5) | All hero text uses `--text`. Worst frame: 6.32:1 |
| 2 | Apricot focus ring | 1.77:1 against the page (needs 3) | Plum ring by day (10.57), amber at night (8.09) |
| 3 | Plum button in both modes, as the brief implies | At night, plum on `#1B1923` is 1.48:1, so the button nearly disappears | Night button is an amber "lamp" with dark text (8.09). **This departs from the brief; your call.** |
| 4 | First light drawn as a soft round glow behind the content | Rendered, it read as the blurry orb generic AI sites use; at night, a brown smudge | A horizon band rising from the bottom edge, in its own strip below the text. Compared three versions in renders; this one reads as a real sunrise |
| 5 | Help Now as six stacked rounded boxes | "No rows of identical rounded boxes" | One panel, hairline rows, text links |
| 6 | Help Now entries numbered 1–6, as the brief lists them | Numbered markers are allowed only for the three steps | Unnumbered |
| 7 | Small all-caps labels above headings ("HOW IT WORKS") | Eyebrow labels | Plain sentence-case headings |
| 8 | Hero small line as "Pilot group · San Diego area · Not therapy" | Middle-dot meta string | The brief's own sentence, with a comma and a period |
| 9 | "Text us to join →" | Arrow on a button | Plain label |
| 10 | Theme toggle in the header | The header holds only the wordmark and one link | Moved to the footer |
| 11 | Smooth scroll to the join section; hero text fading in | Motion beyond the sky; the fade would also delay the headline | Instant jump; text paints immediately |
| 12 | The three steps joined by a vertical connecting line | Stock "stepper" pattern | Discs only, no line |
| 13 | Help Now panel tinted warm cream with an apricot edge | That is cream plus terracotta in miniature | Cool lilac surface; warmth only as the edge of light |
| 14 | A soft gradient on the buttons for a glow | Gradients only in the hero | Flat fills |

## 9. Build notes that affect the design (for Stop 2)

- **Security policy (CSP):** Next.js puts small inline scripts into every exported page. My plan:
  - A build step fingerprints each inline script (a SHA-256 hash) and writes those hashes into the Content-Security-Policy in `vercel.json`.
  - Stop 3 proves the page runs under that policy with zero violations.
  - Catch: any copy change changes the fingerprints. `npm run build` regenerates them, so commit `vercel.json` together with any content change.
- **Text message link:** `sms:+15550100?&body=PACK`. Android reads the `?` part and iPhone reads the `&body=` part, so one link serves both. The link is built from `PILOT_PHONE` and `JOIN_KEYWORD` in `content/site.ts`.
  - A headless browser here can't open a Messages app, so the real tap test on each kind of phone stays "not tested" until you do it.
  - The placeholder `+1-555-0100` has no area code. The real number will need one. The link builder strips formatting, so any style of number works.
