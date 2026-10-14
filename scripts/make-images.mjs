// Regenerates the favicon (.ico), the iPhone home-screen icon, and the social
// preview image from app/icon.svg and the copy in content/site.ts.
// Run after `npm run build`, because it borrows the self-hosted font from out/.
//
//   npm run build && npm run images
import { readFile, readdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { COPY, SITE_NAME } from "../content/site.ts";

const app = new URL("../app/", import.meta.url);

// The Latin font file Next.js self-hosted for the page (the @font-face whose range starts at U+00).
async function latinFontBase64() {
  const cssDir = new URL("../out/_next/static/chunks/", import.meta.url);
  for (const name of await readdir(cssDir)) {
    if (!name.endsWith(".css")) continue;
    const css = await readFile(new URL(name, cssDir), "utf8");
    for (const rule of css.match(/@font-face\{[^}]*\}/g) || []) {
      if (!rule.includes("unicode-range:U+??")) continue;
      const file = rule.match(/url\(\.\.\/media\/([^)]+)\)/)[1];
      return (await readFile(new URL(`../out/_next/static/media/${file}`, import.meta.url))).toString("base64");
    }
  }
  throw new Error("Latin font not found in out/. Run `npm run build` first.");
}

// A .ico file is a small header followed by a PNG.
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

const iconSvg = await readFile(new URL("icon.svg", app), "utf8");
// iOS rounds the corners itself, so the home-screen icon is a full square.
const appleSvg = iconSvg.replace(' rx="14"', "");
const font = await latinFontBase64();

// Day tokens from app/globals.css: the sky's final frame with the horizon band.
const ogHtml = `<!doctype html><html><head><style>
@font-face { font-family: Atkinson; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 200 800; }
body { margin: 0; }
.og { position: relative; width: 1200px; height: 630px; overflow: hidden; color: #2E2A3B; font-family: Atkinson;
  background:
    radial-gradient(70% 100% at 28% 100%, rgb(240 169 124 / 0.65) 0%, rgb(240 169 124 / 0) 75%) bottom / 100% 200px no-repeat,
    linear-gradient(0deg, rgb(243 196 165 / 0.75) 0%, rgb(243 196 165 / 0) 100%) bottom / 100% 200px no-repeat,
    linear-gradient(180deg, #E4DEF0 0%, #ECE7F5 55%, #F2EEF7 100%); }
.wordmark { position: absolute; left: 96px; top: 76px; font-size: 36px; font-weight: 800; letter-spacing: -0.01em; }
h1 { position: absolute; left: 96px; top: 156px; margin: 0; max-width: 900px; font-size: 88px; font-weight: 800; line-height: 1.04; letter-spacing: -0.015em; }
</style></head><body><div class="og"><div class="wordmark">${SITE_NAME}</div><h1>${COPY.hero.headline}</h1></div></body></html>`;

const browser = await chromium.launch();
async function render(html, width, height, transparent = false) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png", omitBackground: transparent });
  await page.close();
  return png;
}
const svgPage = (svg, size) =>
  `<!doctype html><html><body style="margin:0">${svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`;

await writeFile(new URL("favicon.ico", app), pngToIco(await render(svgPage(iconSvg, 32), 32, 32, true), 32));
await writeFile(new URL("apple-icon.png", app), await render(svgPage(appleSvg, 180), 180, 180));
await writeFile(new URL("opengraph-image.png", app), await render(ogHtml, 1200, 630));
await writeFile(new URL("opengraph-image.alt.txt", app), COPY.meta.imageAlt);
await browser.close();
console.log("Wrote app/favicon.ico, app/apple-icon.png, app/opengraph-image.png, app/opengraph-image.alt.txt");
