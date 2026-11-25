import { expect, test } from "@playwright/test";

test.use({ hasTouch: true, viewport: { width: 390, height: 844 } });

test("returns from a preview and closes the project using French touch controls", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^FR / }).tap();

  const work = page.getByRole("region", { name: "Projets en vedette" });
  const card = work.getByRole("button", { name: "CV Virtuel", exact: true });
  await card.tap();

  const details = page.getByRole("dialog", { name: "CV Virtuel" });
  const previewName = "Regardez la vidéo de prévisualisation du projet";
  const previewButton = details.getByRole("button", { name: previewName });
  await previewButton.tap();
  await page
    .getByRole("dialog", { name: previewName })
    .getByRole("button", { name: "Retour au projet" })
    .tap();

  await expect(details).toBeVisible();
  await expect(previewButton).toBeFocused();

  await details.getByRole("button", { name: "Fermer" }).tap();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
});
