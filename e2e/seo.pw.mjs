import { expect, test } from "@playwright/test";

const canonical = "https://angelwiebe.ca/";

test.use({ javaScriptEnabled: false });

test("serves portfolio content and search metadata without JavaScript", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Angel Wiebe | Software Developer Portfolio");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /software developer in Okotoks/i);
  await expect(page.getByRole("heading", { level: 1, name: "Angel Wiebe" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Virtual Resume" })).toHaveAttribute(
    "href",
    "https://github.com/AngelWiebe/virtual-resume",
  );

  await expect(page.getByRole("link", { name: "True Depth Capital" })).toHaveAttribute(
    "href",
    "https://angelwiebe.github.io/true-depth-capital/",
  );
  await expect(page.getByRole("link", { name: "WildBalance" })).toHaveAttribute(
    "href",
    "https://github.com/AngelWiebe/wildbalance",
  );
  await expect(page.getByRole("link", { name: "Charmed Code" })).toHaveAttribute(
    "href",
    "https://angelwiebe.github.io/charmed-code/",
  );

  const profile = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(profile).toMatchObject({
    "@type": "ProfilePage",
    url: canonical,
    mainEntity: { "@type": "Person", name: "Angel Wiebe" },
  });
});

test("serves the favicon, sitemap, crawler directives, and social image", async ({ page, request }) => {
  await page.goto("/");
  for (const [path, type] of [
    ["/favicon-48.png", "image/png"],
    ["/favicon.svg", "image/svg+xml"],
  ]) {
    await expect(page.locator(`link[rel="icon"][type="${type}"]`)).toHaveAttribute("href", path);
    const icon = await request.get(path);
    expect(icon.ok()).toBe(true);
    expect(icon.headers()["content-type"]).toContain(type);
  }

  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(imageUrl).toBe(`${canonical}icon.jpg`);
  const image = await request.get(new URL(imageUrl).pathname);
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toContain("image/jpeg");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(`Sitemap: ${canonical}sitemap.xml`);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(`<loc>${canonical}</loc>`);
});
