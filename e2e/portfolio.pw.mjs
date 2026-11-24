import { open } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("downloads the built résumé for each language", async ({ page }) => {
  await page.goto("/");

  for (const { language, label, path } of [
    {
      language: "en",
      label: "Download Resume",
      path: /\/assets\/Resume\d+-[^/]+\.pdf$/,
    },
    {
      language: "fr",
      label: "Télécharger le CV",
      path: /\/assets\/ResumeFR\d+-[^/]+\.pdf$/,
    },
  ]) {
    if (language === "fr") {
      await page.getByRole("button", { name: /^FR / }).click();
    }

    await expect(page.locator("html")).toHaveAttribute("lang", language);
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("link", { name: label }).click(),
    ]);

    expect(new URL(download.url()).pathname).toMatch(path);
    const file = await open(await download.path());
    try {
      const signature = Buffer.alloc(5);
      await file.read(signature, 0, signature.length, 0);
      expect(signature.toString()).toBe("%PDF-");
    } finally {
      await file.close();
    }
  }
});

test("restores keyboard focus from the preview to the details and card", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("button", { name: "Virtual Resume", exact: true });

  await card.focus();
  await page.keyboard.press("Enter");
  const details = page.getByRole("dialog", { name: "Virtual Resume" });
  const previewButton = details.getByRole("button", {
    name: "Watch the project preview video",
  });
  await expect(details).toBeVisible();

  await previewButton.focus();
  await page.keyboard.press("Enter");
  const preview = page.getByRole("dialog", { name: "Watch the project preview video" });
  await expect(preview.getByTestId("video")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(preview).toHaveCount(0);
  await expect(previewButton).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(details).toHaveCount(0);
  await expect(card).toBeFocused();
});

test("keeps French content within a narrow viewport with doubled text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await page.getByRole("button", { name: /^FR / }).click();
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect.poll(() =>
    page.evaluate(() => document.documentElement.scrollWidth),
  ).toBe(320);

  const cards = page.getByRole("main").getByRole("article");
  await expect(cards).toHaveCount(14);
  await expect.poll(() =>
    cards.evaluateAll((entries) => entries.every((entry) => {
      const bottom = entry.getBoundingClientRect().bottom;
      return [...entry.querySelectorAll("p")].every(
        (paragraph) => paragraph.getBoundingClientRect().bottom <= bottom,
      );
    })),
  ).toBe(true);
});

test("shows the original French résumé extract in the mobile work dialog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /^FR / }).click();

  const contractor = page
    .getByRole("region", { name: "Expérience" })
    .getByRole("article")
    .filter({ hasText: "Contractuel" });
  await contractor.getByRole("button").click();

  const dialog = page.getByRole("dialog", { name: "Développeuse full stack (travailleuse autonome)" });
  await expect(dialog.getByRole("heading", { name: /^Client : Topstep/ })).toBeVisible();
  await expect(dialog.getByRole("listitem")).toHaveCount(5);
  await expect(dialog.getByText(/Environnement technique/)).toBeVisible();
  await dialog.getByRole("button", { name: "Fermer" }).click();
  await expect(contractor.getByRole("button")).toBeFocused();
});
