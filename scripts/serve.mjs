// Serve the built site (out/) the way Vercel will: same files, same security
// headers from vercel.json, real 404 page. No dependencies.
//
//   npm run build && npm start               → http://localhost:4173
//   npm start -- --host 0.0.0.0              → also reachable from a phone on the same Wi-Fi
//   npm start -- --port 5000
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const host = arg("host", "127.0.0.1");
const port = Number(arg("port", process.env.PORT || 4173));

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Headers from vercel.json, matched the way Vercel matches "source" patterns.
async function loadHeaders() {
  try {
    const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
    return (config.headers || []).map((rule) => ({
      pattern: new RegExp(`^${rule.source}$`),
      headers: rule.headers,
    }));
  } catch {
    return [];
  }
}

async function findFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, "");
  const candidates = [clean, join(clean, "index.html"), `${clean}.html`];
  for (const candidate of candidates) {
    const file = join(root, candidate);
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep) && file !== root) continue;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

const rules = await loadHeaders();

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  for (const rule of rules) {
    if (rule.pattern.test(pathname)) for (const { key, value } of rule.headers) res.setHeader(key, value);
  }
  const file = await findFile(pathname);
  const status = file ? 200 : 404;
  const target = file || join(root, "404.html");
  try {
    const body = await readFile(target);
    res.writeHead(status, { "Content-Type": types[extname(target)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500).end("Run `npm run build` first.");
  }
}).listen(port, host, () => {
  console.log(`Serving out/ at http://${host === "0.0.0.0" ? "localhost" : host}:${port} (${rules.length ? "with" : "without"} vercel.json headers)`);
});
