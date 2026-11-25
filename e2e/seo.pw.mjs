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

test("serves reciprocal language alternates and a crawlable French page", async ({ page, request }) => {
  for (const [language, path] of [["en", "/"], ["fr", "/fr/"]]) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new URL(path, canonical).href);

    for (const [alternate, alternatePath] of [["en", "/"], ["fr", "/fr/"], ["x-default", "/"]]) {
      await expect(page.locator(`head link[rel="alternate"][hreflang="${alternate}"]`))
        .toHaveAttribute("href", new URL(alternatePath, canonical).href);
    }
  }

  await expect(page).toHaveTitle("Angel Wiebe | Portfolio de développeuse full stack");
  await expect(page.getByRole("heading", { name: "Expérience", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Français" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(`<loc>${canonical}fr/</loc>`);
});

test("keeps localized search and social metadata consistent with each page", async ({ page }) => {
  const languages = [
    { path: "/", language: "en", locale: "en_CA", alternate: "fr_CA", description: /Okotoks, Alberta/ },
    { path: "/fr/", language: "fr", locale: "fr_CA", alternate: "en_CA", description: /Okotoks, en Alberta/ },
  ];

  const descriptions = [];
  for (const { path, language, locale, alternate, description } of languages) {
    const response = await page.goto(path);
    expect(response.status()).toBe(200);

    const url = new URL(path, canonical).href;
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", url);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", await page.title());
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", locale);
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute("content", alternate);

    const searchDescription = page.locator('meta[name="description"]');
    await expect(searchDescription).toHaveAttribute("content", description);
    descriptions.push(await searchDescription.getAttribute("content"));

    const profile = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    expect(profile).toMatchObject({
      "@type": "ProfilePage",
      url,
      inLanguage: language,
      mainEntity: { "@id": `${canonical}#angel-wiebe`, url: canonical },
    });
  }
  expect(descriptions[0]).not.toBe(descriptions[1]);
});
