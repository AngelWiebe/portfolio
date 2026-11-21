import { expect, test } from "@playwright/test";

for (const { title, asset, description } of [
  { title: "Virtual Resume", asset: "resume", description: "castle grounds" },
  { title: "Google Map Example", asset: "google", description: "red pins" },
  { title: "Godot Tutorial", asset: "godot", description: "score of 5" },
  { title: "G & R Logging", asset: "gnr", description: "contact forms" },
]) {
  test(`plays the ${title} preview and describes the demo`, async ({ page }) => {
    await page.goto("/");

    const carousel = page.getByRole("region", { name: "Experience" });
    const next = carousel.getByRole("button", { name: "Next experience cards" });
    const card = carousel.getByRole("button", { name: title, exact: true });

    for (let group = 0; group < 3 && !(await card.count()); group++) {
      const firstHeading = carousel.getByRole("heading", { level: 3 }).first();
      const previousTitle = await firstHeading.textContent();
      await next.click();
      await expect(firstHeading).not.toHaveText(previousTitle);
      await expect(carousel.locator(".slick-track")).toHaveCSS("transition-duration", "0s");
    }

    await card.click();
    const previewName = "Watch the project preview video";
    await page
      .getByRole("dialog", { name: title })
      .getByRole("button", { name: previewName })
      .click();

    const video = page.getByRole("dialog", { name: previewName }).getByTestId("video");
    await expect(video).toHaveAccessibleDescription(
      new RegExp(description, "i"),
    );
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      new RegExp(`/assets/${asset}-preview-[^/]+\\.mp4$`),
    );

    await video.evaluate((element) => element.play());
    await expect.poll(() => video.evaluate((element) => element.currentTime))
      .toBeGreaterThan(0.1);

    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(card).toBeFocused();
  });
}
