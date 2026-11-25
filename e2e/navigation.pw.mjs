import { expect, test } from "@playwright/test";

test("keyboard users can skip the header and tab between projects", async ({ page, browserName }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeAttached();
  // macOS WebKit uses Option–Tab to include links with its default keyboard settings.
  const navigationKey = browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";
  await page.keyboard.press(navigationKey);
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  const work = page.getByRole("region", { name: "Selected work" });
  await work.getByRole("button", { name: "WildBalance" }).focus();
  await page.keyboard.press(navigationKey);
  await expect(work.getByRole("button", { name: "Charmed Code" })).toBeFocused();
});

test("keeps navigation and project dialogs usable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.getByRole("link", { name: "View my work" }).click();
  await expect(page).toHaveURL(/#work$/);
  const card = page.getByRole("button", { name: "Virtual Resume" });
  await card.click();
  await expect(page.getByRole("dialog", { name: "Virtual Resume" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(card).toBeFocused();
});

test("keeps the floral backdrop fixed while the content scrolls", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hero = page.getByRole("heading", { level: 1, name: "Angel Wiebe" });
  const readLayer = () => page.locator("body").evaluate((body) => {
    const layer = getComputedStyle(body, "::before");
    return { position: layer.position, inset: layer.inset, image: layer.backgroundImage };
  });

  const background = await readLayer();
  expect(background.position).toBe("fixed");
  expect(background.inset).toBe("0px");
  const url = background.image.match(/url\("?([^"]+?)"?\)/)?.[1];
  expect(url).toBeTruthy();
  expect((await request.get(url)).ok()).toBe(true);

  await page.getByRole("link", { name: "View my work" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect(hero).not.toBeInViewport();
  expect(await readLayer()).toEqual(background);
});

test("switches portfolio languages through keyboard-accessible links", async ({ page }) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  const english = header.getByRole("link", { name: "EN — English" });
  const french = header.getByRole("link", { name: "FR — French" });

  await expect(english).toHaveAttribute("aria-current", "page");
  await expect(french).toHaveAttribute("href", "/fr/");
  await french.focus();
  await expect(french).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/fr\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(header.getByRole("link", { name: "FR — Français" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("region", { name: "Expérience", exact: true })).toBeVisible();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await header.getByRole("link", { name: "EN — Anglais" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(english).toHaveAttribute("aria-current", "page");
});

test("keeps the header pinned and anchors visible when the French header wraps", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await page.getByRole("link", { name: /^FR / }).click();
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });

  const header = page.getByRole("banner");
  await expect(header).toHaveCSS("position", "sticky");
  const place = page.getByRole("region", { name: "Projets en vedette" });
  await page.getByRole("navigation").getByRole("link", { name: "Projets", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect.poll(async () => (await place.boundingBox()).y)
    .toBeGreaterThanOrEqual((await header.boundingBox()).height);
  await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().top)).toBe(0);
});

test("lets an oversized header scroll on short screens with enlarged text", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 568, height: 320 });
  await page.goto("/fr/");

  const header = page.getByRole("banner");
  await expect(header).toHaveCSS("position", "sticky");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await expect(header).toHaveCSS("position", "static");

  await header.getByRole("link", { name: "Projets", exact: true }).click();
  await expect(page).toHaveURL("/fr/#work");
  await expect(page.getByRole("heading", { name: "Projets en vedette" })).toBeInViewport();
  await expect(header).not.toBeInViewport();

  await page.setViewportSize({ width: 568, height: 1000 });
  await expect(header).toHaveCSS("position", "sticky");
});

test("aligns the Experience heading and first timeline row on desktop and mobile", async ({ page }) => {
  await page.goto("/");
  const experience = page.getByRole("region", { name: "Experience" });
  const heading = experience.getByRole("heading", { level: 2 });
  const firstRole = experience.getByRole("article").first();

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const { x } = await heading.boundingBox();
    expect((await firstRole.boundingBox()).x).toBeCloseTo(x);
    expect((await firstRole.getByTestId("timeline").boundingBox()).x).toBeCloseTo(x);
  }
});

test("restores the portfolio language when navigating browser history", async ({ page }) => {
  await page.goto("/fr/#experience");
  const header = page.getByRole("banner");
  const french = header.getByRole("link", { name: "FR — Français" });

  await expect(page.getByRole("region", { name: "Expérience", exact: true })).toBeVisible();
  await expect(french).toHaveAttribute("aria-current", "page");
  await header.getByRole("link", { name: "EN — Anglais" }).click();
  await expect(page.getByRole("region", { name: "Experience", exact: true })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL("/fr/#experience");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(french).toHaveAttribute("aria-current", "page");

  await page.goForward();
  await expect(page).toHaveURL("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(header.getByRole("link", { name: "EN — English" })).toHaveAttribute("aria-current", "page");
});
