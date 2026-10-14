// Runs after `next build` (see "build" in package.json).
//
// Next.js puts small inline scripts in every exported page. This script
// fingerprints each one (SHA-256) and writes a Content-Security-Policy into
// vercel.json that allows exactly those scripts, files from this site, and
// nothing from any other domain. Any copy change changes the fingerprints,
// so commit vercel.json together with content changes.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";

const outDir = new URL("../out/", import.meta.url);
const configFile = new URL("../vercel.json", import.meta.url);

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
const scriptHashes = new Set();
const styleHashes = new Set();

for (const file of await htmlFiles(outDir)) {
  const html = await readFile(file, "utf8");
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc\s*=/i.test(attrs)) continue; // External file: covered by 'self'.
    if (/\btype\s*=\s*["']?application\/(ld\+)?json/i.test(attrs)) continue; // Data, never executed.
    scriptHashes.add(sha256(body));
  }
  for (const [, body] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) styleHashes.add(sha256(body));
  // Inline style="" attributes would need 'unsafe-hashes'. Fail loudly instead of loosening the policy.
  const withoutScripts = html.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  if (/<[^>]+\sstyle\s*=/i.test(withoutScripts)) {
    throw new Error(`${file.pathname} has an inline style attribute; move it into CSS.`);
  }
}

const policy = [
  "default-src 'none'",
  ["script-src 'self'", ...scriptHashes].join(" "),
  ["style-src 'self'", ...styleHashes].join(" "),
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");

const config = {
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: policy },
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
};

const next = JSON.stringify(config, null, 2) + "\n";
let previous = "";
try {
  previous = await readFile(configFile, "utf8");
} catch {
  // First run.
}
await writeFile(configFile, next);
console.log(
  `CSP: ${scriptHashes.size} inline script hashes, ${styleHashes.size} inline style hashes. ` +
    (previous === next ? "vercel.json unchanged." : "vercel.json updated: commit it with your change."),
);
