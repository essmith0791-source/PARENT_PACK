// Runs after `next build` (see "build" in package.json).
//
// Two Content-Security-Policies apply to every page, and a browser enforces both:
//
// 1. vercel.json (fixed): blocks every other domain for scripts, styles,
//    images, fonts, and connections. It allows inline scripts in general.
// 2. A <meta> tag this script writes into each exported page: allows only the
//    exact inline scripts that page shipped with, by SHA-256 fingerprint.
//
// Because the fingerprints are written by the same build that produced the
// scripts, they always match, whether the build runs here or on Vercel.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";

const outDir = new URL("../out/", import.meta.url);

async function htmlFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) files.push(...(await htmlFiles(url)));
    else if (entry.name.endsWith(".html")) files.push(url);
  }
  return files;
}

const sha256 = (text) => `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;
const META_PATTERN = /<meta http-equiv="Content-Security-Policy"[^>]*>/;

// The header policy must be in place: the meta tag narrows it, it doesn't replace it.
const vercel = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
const header = vercel.headers?.flatMap((rule) => rule.headers).find((h) => h.key === "Content-Security-Policy");
if (!header?.value.includes("default-src 'self'")) throw new Error("vercel.json is missing its Content-Security-Policy.");

let pages = 0;
let totalScripts = 0;
for (const file of await htmlFiles(outDir)) {
  let html = (await readFile(file, "utf8")).replace(META_PATTERN, "");
  const scripts = new Set();
  const styles = new Set();
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc\s*=/i.test(attrs)) continue; // A file from this site: covered by 'self'.
    if (/\btype\s*=\s*["']?application\/(ld\+)?json/i.test(attrs)) continue; // Data, never executed.
    scripts.add(sha256(body));
  }
  for (const [, body] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) styles.add(sha256(body));
  // Inline style="" attributes would need 'unsafe-hashes'. Fail loudly instead of loosening the policy.
  if (/<[^>]+\sstyle\s*=/i.test(html.replace(/<script\b[\s\S]*?<\/script>/gi, ""))) {
    throw new Error(`${file.pathname} has an inline style attribute; move it into CSS.`);
  }

  const policy = [
    ["script-src 'self'", ...scripts].join(" "),
    ["style-src 'self'", ...styles].join(" "),
  ].join("; ");
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
  // Right after the charset tag, so it governs every script that follows.
  const charset = html.match(/<meta charSet="utf-8"\/>/i);
  if (!charset) throw new Error(`${file.pathname}: no charset tag to anchor the CSP meta tag.`);
  html = html.replace(charset[0], charset[0] + meta);
  await writeFile(file, html);
  pages++;
  totalScripts += scripts.size;
}
console.log(`CSP: fingerprinted ${totalScripts} inline scripts across ${pages} pages.`);
