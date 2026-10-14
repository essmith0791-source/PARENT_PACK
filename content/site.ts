// Every word and editable value on the site lives in this file.
// Change a value here and every place that uses it updates, including links.

// ── Pilot values. Replace the placeholders before launch. ──────────────────
export const PILOT_PHONE = "+1-555-0100"; // Reserved fictional number. The real one needs an area code.
export const JOIN_KEYWORD = "PACK";
export const MODERATION_HOURS = "8am to 10pm Pacific";
export const PILOT_AREA = "San Diego area";

export const SITE_NAME = "ParentPack";

// ── Help Now lines. Numbers exactly as given in SITE_SPEC.md section 4.6. ──
export type Action = {
  kind: "call" | "text";
  number: string; // Shown exactly as written here.
  body?: string; // Pre-filled text message, e.g. HOME.
};

export type HelpLine = {
  id: string;
  name: string;
  note?: string;
  actions: Action[];
};

export const HELP_LINES: HelpLine[] = [
  {
    id: "emergency",
    name: "Immediate danger",
    actions: [{ kind: "call", number: "911" }],
  },
  {
    id: "988",
    name: "988 Suicide and Crisis Lifeline",
    actions: [
      { kind: "call", number: "988" },
      { kind: "text", number: "988" },
    ],
  },
  {
    id: "crisis-text-line",
    name: "Crisis Text Line",
    actions: [{ kind: "text", number: "741741", body: "HOME" }],
  },
  {
    id: "maternal-hotline",
    name: "National Maternal Mental Health Hotline",
    actions: [
      { kind: "call", number: "1-833-852-6262" },
      { kind: "text", number: "1-833-852-6262" },
    ],
  },
  {
    id: "psi",
    name: "Postpartum Support International HelpLine",
    note: "Support and referrals, not a crisis line.",
    actions: [{ kind: "call", number: "1-800-944-4773" }],
  },
  {
    id: "domestic-violence",
    name: "National Domestic Violence Hotline",
    actions: [
      { kind: "call", number: "1-800-799-7233" },
      { kind: "text", number: "88788", body: "START" },
    ],
  },
];

// Link labels are built from the same values as the links, so they can't drift apart.
export function actionLabel({ kind, number, body }: Action): string {
  if (kind === "call") return `Call ${number}`;
  return body ? `Text ${body} to ${number}` : `Text ${number}`;
}

// ── Page copy, in page order. ──────────────────────────────────────────────
export const COPY = {
  meta: {
    title: `${SITE_NAME}: Nobody should have to do this alone.`,
    description:
      "A free, private group chat for 6 to 8 moms whose babies arrived around the same time. Four weeks. Just reading is fine.",
    imageAlt: `${SITE_NAME}. Nobody should have to do this alone.`,
  },
  header: {
    joinLink: "How to join",
  },
  hero: {
    headline: "Nobody should have to do this alone.",
    subhead:
      "A free, private group chat for 6 to 8 moms whose babies arrived around the same time. Four weeks. Just reading is fine.",
    button: "Text us to join",
    note: `Pilot group, ${PILOT_AREA}. Not therapy or a crisis service.`,
  },
  whoFor: {
    heading: "Who it’s for",
    body: "You had a baby in the last few months, and you don’t have mom friends nearby who get it. Maybe your friends went quiet. Maybe you moved. Maybe you just feel like you’re doing this alone.",
  },
  howItWorks: {
    heading: "How it works",
    steps: [
      "Text us. We’ll ask three quick questions: your baby’s birth month, your time zone, and whether you have local mom friends.",
      "We place you in one private WhatsApp group with moms at your stage. No browsing. Nobody searches for you.",
      "Talk when you want. Read when you don’t. The same group, every day, for four weeks.",
    ],
  },
  whatItIsNot: {
    heading: "What it is not",
    body: `ParentPack is peer connection, not medical care, therapy, or a crisis service. The group is moderated from ${MODERATION_HOURS}. Outside those hours, nobody is watching the chat.`,
  },
  helpNow: {
    heading: "Need help now?",
  },
  privacy: {
    heading: "Your privacy",
    body: "This page collects nothing. No cookies, no tracking, no analytics. If you join, we’ll only ask for your first name and the three answers above. We never ask for your address, your baby’s name, or health information. You can leave the group and ask us to delete your answers anytime.",
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "Does it cost anything?",
        answer: "No. It’s free, and connection will always be free.",
      },
      {
        question: "Can other moms find me?",
        answer:
          "No. There’s no directory or search. You’re placed in one small group, and only that group sees you.",
      },
      {
        question: "What if I never post?",
        answer: "That’s fine. Plenty of moms just read at first.",
      },
      {
        question: "What if I’m really struggling right now?",
        helpLines: ["988", "maternal-hotline"], // Shown first, before the answer.
        answer: "ParentPack is a group of moms, not care. Please reach out to one of these now.",
      },
      {
        question: "What happens after four weeks?",
        answer: "We’ll ask what worked. If the group wants to keep going, it can.",
      },
    ] as { question: string; answer: string; helpLines?: string[] }[],
  },
  join: {
    heading: "Ready?",
    lineStart: "Text",
    lineMiddle: "to",
    lineEnd: ".",
    note: "Adults only. We’ll send a short consent message before adding you.",
  },
  footer: {
    tagline: `${SITE_NAME}. Nobody should have to do this alone.`,
    disclaimer: "Peer connection, not medical care or a crisis service.",
    copyright: "©",
  },
  theme: {
    legend: "Theme",
    auto: "Auto",
    day: "Day",
    night: "Night",
  },
  notFound: {
    title: "Page not found",
    heading: "Page not found.",
    link: "Go to the ParentPack home page",
  },
};
