import { expect, test } from "@playwright/test";

test("keyboard users can skip the header and tab between projects", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  const work = page.getByRole("region", { name: "Selected work" });
  await work.getByRole("button", { name: "True Depth Capital" }).focus();
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
