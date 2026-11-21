import { expect, test } from "@playwright/test";

test("skips offscreen cards when tabbing, including after a keyboard slide change", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const carousel = page.getByRole("region", { name: "Experience" });
  const previous = carousel.getByRole("button", { name: "Previous experience cards" });
  const next = carousel.getByRole("button", { name: "Next experience cards" });
  const cards = carousel.getByRole("article");

  await expect(cards).toHaveCount(1);
  const firstCard = cards.getByRole("button");
  const firstTitle = await cards.getByRole("heading").textContent();
  await previous.focus();
  await page.keyboard.press("Tab");
  await expect(firstCard).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(next).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(cards.getByRole("heading")).not.toHaveText(firstTitle);
  await expect(carousel.locator('.slick-slide[aria-hidden="true"]:not([inert])')).toHaveCount(0);
  await expect(carousel.locator('.slick-slide[aria-hidden="false"][inert]')).toHaveCount(0);
  await page.keyboard.press("Shift+Tab");
  await expect(cards.getByRole("button")).toBeFocused();
});

test("honors reduced motion while keeping the carousel usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("header address")).toHaveCSS("animation-name", "none");
  const carousel = page.getByRole("region", { name: "Experience" });
  const firstHeading = carousel.getByRole("heading", { level: 3 }).first();
  const previousTitle = await firstHeading.textContent();
  await carousel.getByRole("button", { name: "Next experience cards" }).click();
  await expect(firstHeading).not.toHaveText(previousTitle);
  await expect(carousel.locator(".slick-track")).toHaveCSS("transition-duration", "0s");
});
