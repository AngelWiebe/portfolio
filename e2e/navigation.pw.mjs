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
  const main = page.getByRole("main");
  const readLayer = () => main.evaluate((element) => {
    const layer = getComputedStyle(element, "::before");
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

  await page.keyboard.press("End");
  await expect(page.getByRole("contentinfo")).toBeInViewport();
  await expect(main).toHaveCSS("clip-path", "inset(0px)");
  await expect(page.locator("html")).toHaveCSS("overscroll-behavior-y", "none");
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

test("aligns project cards with the title box and preserves inner padding", async ({ page }) => {
  await page.goto("/");
  const work = page.getByRole("region", { name: "Selected work" });
  const experience = page.getByRole("region", { name: "Experience" });
  const firstRole = experience.getByRole("article").first();
  const featured = work.getByRole("article").first();
  const other = work.locator(".other-projects").getByRole("article").first();

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });

    for (const section of [work, experience]) {
      const headingBox = section.locator(".section-heading");
      const { x: edge } = await section.boundingBox();
      expect((await headingBox.boundingBox()).x).toBeCloseTo(edge);
      const { x: textStart } = await section.getByRole("heading", { level: 2 }).boundingBox();
      expect(textStart - edge).toBeGreaterThanOrEqual(12);
    }

    const workHeadingBox = work.locator(".section-heading");
    const { x: workEdge } = await workHeadingBox.boundingBox();
    await expect(workHeadingBox).toHaveCSS("box-shadow", "none");
    expect((await featured.boundingBox()).x).toBeCloseTo(workEdge);
    expect((await other.boundingBox()).x).toBeCloseTo(workEdge);

    const experienceTitle = experience.getByRole("heading", { level: 2 });
    expect((await firstRole.boundingBox()).x).toBeCloseTo((await experience.boundingBox()).x);
    expect((await firstRole.getByTestId("timeline").boundingBox()).x)
      .toBeCloseTo((await experienceTitle.boundingBox()).x);
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

test("follows the system theme and remembers an override across language pages", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Dark mode" });
  const root = page.locator("html");

  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(root).toHaveCSS("background-color", "rgb(21, 16, 30)");

  await page.emulateMedia({ colorScheme: "light" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(root).toHaveCSS("background-color", "rgb(249, 247, 244)");
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("link", { name: "FR — French" }).click();
  const frenchToggle = page.getByRole("button", { name: "Mode sombre" });
  await expect(frenchToggle).toHaveAttribute("aria-pressed", "true");
  await expect(root).toHaveCSS("background-color", "rgb(21, 16, 30)");

  await page.getByRole("button", { name: "WildBalance", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCSS("background-color", "rgb(34, 26, 48)");
  await page.keyboard.press("Escape");

  await page.emulateMedia({ colorScheme: "dark" });
  await frenchToggle.click();
  await page.reload();
  await expect(frenchToggle).toHaveAttribute("aria-pressed", "false");
  await expect(root).toHaveCSS("background-color", "rgb(249, 247, 244)");
});

test("keeps the toolkit anchored when More about me expands", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const toolkit = page.getByRole("complementary", { name: "What I work with" });
  const about = page.locator(".hero-about");
  const toggle = about.getByText("More about me", { exact: true });
  const titleBox = page.locator(".hero-copy");
  const { y: top } = await toolkit.boundingBox();
  expect((await titleBox.boundingBox()).y).toBeCloseTo(top);
  await expect(titleBox).toHaveCSS("box-shadow", "none");

  await toggle.click();
  await expect(about.locator("p")).toBeVisible();
  expect((await toolkit.boundingBox()).y).toBeCloseTo(top);

  await toggle.click();
  await expect(about.locator("p")).toBeHidden();
  expect((await toolkit.boundingBox()).y).toBeCloseTo(top);
});
