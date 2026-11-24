import { expect, test } from "@playwright/test";

for (const { title, asset, description } of [
  { title: "Virtual Resume", asset: "resume", description: "castle grounds" },
  { title: "Google Map Example", asset: "google", description: "red pins" },
  { title: "Godot Tutorial", asset: "godot", description: "score of 5" },
  { title: "G & R Logging", asset: "gnr", description: "contact forms" },
]) {
  test(`plays the ${title} preview and describes the demo`, async ({ page }) => {
    await page.goto("/");

    const work = page.getByRole("region", { name: "Selected work" });
    const card = work.getByRole("button", { name: title, exact: true });

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
