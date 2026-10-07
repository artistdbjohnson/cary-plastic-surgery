import { chromium } from "playwright";
import fs from "fs";

const base = "http://127.0.0.1:3456";
const out = "docs/qa";
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

async function shot(page, name) {
  await page.screenshot({ path: `${out}/${name}.png` });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  console.log("shot", name, "overflow", overflow);
}

async function hashCheck(page, path, ids, width) {
  for (const id of ids) {
    await page.goto(`${base}${path}#${id}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(350);
    const metrics = await page.evaluate((hash) => {
      const nav = document.querySelector("header");
      const target = document.getElementById(hash);
      const heading = target?.querySelector("h1, h2, h3");
      const navBox = nav?.getBoundingClientRect();
      const headBox = (heading || target)?.getBoundingClientRect();
      return {
        navBottom: navBox ? navBox.bottom : null,
        headTop: headBox ? headBox.top : null,
        gap: navBox && headBox ? headBox.top - navBox.bottom : null,
      };
    }, id);
    console.log("hash", width, path, id, JSON.stringify(metrics));
    await shot(page, `${width}-${path.replace(/\//g, "_") || "home"}-${id}`);
  }
}

const seen = async (page) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("cps-open-seen", "1");
  });
};

// Home after open, 1440 and 390
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await seen(page);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await shot(page, "1440-home-top");
  await page.locator("nav[aria-label='Primary'] button").first().hover();
  await page.waitForTimeout(250);
  await shot(page, "1440-nav-dropdown");
  await hashCheck(page, "/", ["services", "consultation", "dr-hanna", "reviews", "arrival", "contact"], "1440");
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await seen(page);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await shot(page, "390-home-top");
  await page.locator("[data-menu-button]").click();
  await page.waitForTimeout(200);
  await shot(page, "390-menu-open");
  await page.locator("[data-menu-button]").click();
  await hashCheck(page, "/", ["services", "consultation", "dr-hanna", "reviews", "arrival", "contact"], "390");
  await page.close();
}

for (const width of [768, 1024, 1280]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await seen(page);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  await shot(page, `${width}-nav`);
  if (width >= 1024) {
    await page.locator("nav[aria-label='Primary'] button").nth(1).hover();
    await page.waitForTimeout(200);
    await shot(page, `${width}-nav-dropdown`);
  }
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => sessionStorage.removeItem("cps-open-seen"));
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-open-overlay]", { timeout: 8000 });
  await page.waitForTimeout(850);
  await shot(page, "1440-open-mid-draw");
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await seen(page);
  await page.addInitScript(() => localStorage.setItem("cps-theme", "dark"));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await shot(page, "1440-dark-home");
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await seen(page);
  await page.addInitScript(() => localStorage.setItem("cps-lang", "pt"));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await shot(page, "1440-pt-home");
  await page.close();
}

const proc = "/breast-plastic-surgery/breast-augmentation";
for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await seen(page);
  await page.goto(base + proc, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await shot(page, `${width}-procedure-top`);
  await hashCheck(page, proc, ["faqs"], String(width));
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await seen(page);
  await page.goto(base + "/request-appointment", { waitUntil: "networkidle" });
  await shot(page, "1440-request-appointment");
  await page.locator("input[name='name']").fill("Test");
  await page.locator("input[name='email']").fill("test@example.com");
  await page.locator("input[name='phone']").fill("9195550100");
  await page.locator("textarea[name='message']").fill("Hello");
  await page.locator("input[name='time']").first().check({ force: true });
  await page.locator("input[name='patient-type']").first().check({ force: true });
  await page.locator("input[name='about']").first().check({ force: true });
  await page.locator("input[name='insurance']").first().check({ force: true });
  await page.locator("form button[type='submit']").click();
  await page.waitForTimeout(200);
  await shot(page, "1440-request-appointment-note");
  await page.close();
}

await browser.close();
console.log("qa done");
