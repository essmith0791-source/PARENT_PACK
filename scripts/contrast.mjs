// WCAG 2.2 contrast check for every text/background pair, in day and night,
// read straight from the tokens in app/globals.css.
//
//   npm run contrast        → prints a table; exits with an error if any pair fails
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

function tokens(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`No "${selector}" block in globals.css`);
  const body = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]));
}

const day = tokens(":root");
const night = tokens(':root[data-theme="night"]');
const nightAuto = tokens(':root:not([data-theme="day"])');

// The night tokens appear twice (dark-mode phones, and a manual Night choice). They must match.
const drift = Object.keys({ ...night, ...nightAuto }).filter((k) => night[k] !== nightAuto[k]);
if (drift.length) {
  console.error(`Night blocks differ in globals.css: ${drift.join(", ")}`);
  process.exit(1);
}

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const linear = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)); // Browsers blend opacity in sRGB.
const hex = (c) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();

// [what it is, foreground token, background token, minimum ratio]
const pairs = [
  ["Body text on page", "text", "bg", 4.5],
  ["Secondary text on page", "text-2", "bg", 4.5],
  ["Text on Help Now panel", "text", "surface", 4.5],
  ["Secondary text on Help Now panel", "text-2", "surface", 4.5],
  ["Button label on button", "on-button", "button", 4.5],
  ["Step numerals and PACK on accent fill", "on-accent", "accent", 4.5],
  ["Button edge against page (non-text)", "button-edge", "bg", 3],
  ["Focus ring against page (non-text)", "focus", "bg", 3],
  ["Focus ring against Help Now panel (non-text)", "focus", "surface", 3],
];

// Hero: every frame of the sunrise (overlay opacity 0 to 1 in 5% steps), at several heights
// down the sky. Text never sits on the horizon band, so the band is not part of this check.
function skyAt(t, pos) {
  const stop = (top, mid, bottom, midAt) =>
    pos <= midAt ? mix(rgb(top), rgb(mid), pos / midAt) : mix(rgb(mid), rgb(bottom), (pos - midAt) / (1 - midAt));
  const pre = stop(t["sky-pre-top"], t["sky-pre-mid"], t["sky-pre-bottom"], 0.5);
  const first = stop(t["sky-first-top"], t["sky-first-mid"], t["sky-first-bottom"], 0.55);
  return (opacity) => mix(pre, first, opacity);
}
function worstOverSky(t, fgToken) {
  let worst = { r: Infinity };
  for (const pos of [0, 0.25, 0.5, 0.75]) {
    const sky = skyAt(t, pos);
    for (let step = 0; step <= 20; step++) {
      const bg = sky(step / 20);
      const r = ratio(rgb(t[fgToken]), bg);
      if (r < worst.r) worst = { r, bg: hex(bg), frame: step * 5, pos: pos * 100 };
    }
  }
  return worst;
}
const skyPairs = [
  ["Hero text over the sky, worst frame", "text", 4.5],
  ["Button edge against the sky, worst frame (non-text)", "button-edge", 3],
  ["Focus ring against the sky, worst frame (non-text)", "focus", 3],
];

const rows = [];
let failed = 0;
for (const [mode, t] of [["Day", day], ["Night", night]]) {
  for (const [label, fg, bg, min] of pairs) {
    const r = ratio(rgb(t[fg]), rgb(t[bg]));
    if (r < min) failed++;
    rows.push([mode, label, `${t[fg]} on ${t[bg]}`, r.toFixed(2), min, r >= min ? "pass" : "FAIL"]);
  }
  for (const [label, fg, min] of skyPairs) {
    const w = worstOverSky(t, fg);
    if (w.r < min) failed++;
    rows.push([mode, label, `${t[fg]} on ${w.bg} (frame ${w.frame}%, ${w.pos}% down)`, w.r.toFixed(2), min, w.r >= min ? "pass" : "FAIL"]);
  }
}

console.log("| Mode | Pair | Colors | Ratio | Needs | Result |");
console.log("| --- | --- | --- | --- | --- | --- |");
for (const row of rows) console.log(`| ${row.join(" | ")} |`);
console.log(`\n${rows.length} pairs checked, ${failed} failed. Night token blocks match.`);
process.exit(failed ? 1 : 0);
