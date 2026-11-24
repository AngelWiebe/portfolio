import { expect, test } from "@playwright/test";

test("keyboard users can skip the header and tab between projects", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeAttached();
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  const work = page.getByRole("region", { name: "Selected work" });
  await work.getByRole("button", { name: "WildBalance" }).focus();
  await page.keyboard.press("Tab");
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

test("keeps the header pinned and anchors visible when the French header wraps", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await page.getByRole("button", { name: /^FR / }).click();
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
