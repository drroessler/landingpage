/** HTML → A4-PDF über Headless-Chromium.
 *
 *  Auf Vercel liefert @sparticuz/chromium die Binärdatei, lokal wird ein
 *  installiertes Chrome/Chromium verwendet. Der Aufrufer bekommt einen Buffer.
 */

import puppeteer, { type Browser } from "puppeteer-core";
import { footerTemplate, headerTemplate } from "./document";

/** Kandidaten für eine lokale Chrome-Installation (nur Entwicklung).
 *  Playwright-Caches sind mit aufgeführt, weil der One-Pager-Build im selben
 *  Repo Playwright verwendet — dann ist meist schon ein Chromium da. */
function localChromeCandidates(home: string): string[] {
  return [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    `${home}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`,
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter((p): p is string => Boolean(p));
}

function isServerless(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

export async function launch(): Promise<Browser> {
  if (isServerless()) {
    const chromium = (await import("@sparticuz/chromium")).default;
    // Die Schriften des Dokuments stecken als @font-face im HTML selbst
    // (api/_lib/fonts.ts) — im Lambda gibt es keine Systemschriften.
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1240, height: 1754 },
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const fs = await import("node:fs");
  const os = await import("node:os");
  const candidates = localChromeCandidates(os.homedir());
  // Playwright legt seine Browser unter wechselnden Versionsnummern ab; wenn der
  // fest notierte Pfad nicht passt, wird der Cache einmal durchsucht.
  const cacheRoot = `${os.homedir()}/Library/Caches/ms-playwright`;
  try {
    for (const dir of fs.readdirSync(cacheRoot)) {
      if (!dir.startsWith("chromium")) continue;
      for (const sub of fs.readdirSync(`${cacheRoot}/${dir}`)) {
        candidates.push(
          `${cacheRoot}/${dir}/${sub}/chrome-headless-shell`,
          `${cacheRoot}/${dir}/${sub}/Chromium.app/Contents/MacOS/Chromium`,
        );
      }
    }
  } catch {
    /* kein Playwright-Cache vorhanden */
  }
  const executablePath = candidates.find((p) => {
    try {
      return fs.existsSync(p);
    } catch {
      return false;
    }
  });
  if (!executablePath) {
    throw new Error(
      "Kein lokales Chrome gefunden. Pfad über die Umgebungsvariable CHROME_PATH setzen.",
    );
  }
  return puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
}

export async function renderPdf(html: string, reference: string): Promise<Buffer> {
  const browser = await launch();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load", timeout: 30_000 });
    // Erst drucken, wenn die Webfonts wirklich da sind — sonst wechselt die
    // Schrift mitten im Rendern und die Umbrüche stimmen nicht.
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate(),
      footerTemplate: footerTemplate(reference),
      margin: { top: "18mm", right: "16mm", bottom: "14mm", left: "16mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

/** Dateiname des Anhangs. */
export function pdfFilename(reference: string): string {
  return `NarraTec-Reifecheck-${reference}.pdf`;
}

/** Nur für die Messwerkzeuge unter scripts/ — erzwingt den lokalen Browser. */
export async function launchLocal(): Promise<Browser> {
  return launch();
}
