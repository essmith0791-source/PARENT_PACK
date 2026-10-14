// Full-page screenshots of the built site at 390px and 1440px, day and night.
// Waits for the sky to finish brightening, so each shot shows the final frame.
//
//   npm run build && npm run screenshots              → docs/screenshots/
//   npm run screenshots -- --out <folder>
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const outDir = arg("out", "docs/screenshots");
const port = 4199;

const shots = [
  { name: "390-day", width: 390, height: 844, scale: 2, scheme: "light" },
  { name: "390-night", width: 390, height: 844, scale: 2, scheme: "dark" },
  { name: "1440-day", width: 1440, height: 900, scale: 1, scheme: "light" },
  { name: "1440-night", width: 1440, height: 900, scale: 1, scheme: "dark" },
];

const server = spawn(process.execPath, ["scripts/serve.mjs", "--port", String(port)], { stdio: ["ignore", "pipe", "inherit"] });
await new Promise((resolve) => server.stdout.once("data", resolve));

try {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
      deviceScaleFactor: shot.scale,
      colorScheme: shot.scheme,
    });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${port}/`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(3400); // 0.3s delay + 2.8s sunrise, plus margin.
    const path = `${outDir}/${shot.name}.jpg`;
    await page.screenshot({ path, fullPage: true, type: "jpeg", quality: 88 });
    console.log(`Saved ${path}`);
    await context.close();
  }
  await browser.close();
} finally {
  server.kill();
}
