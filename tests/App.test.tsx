// src/components/App.test.tsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import React from "react";

describe("App Component", () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
  });

  test("renders Header", () => {
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders Footer", () => {
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("shows a varied toolkit whose technologies all appear in the full stack", () => {
    const toolkit = within(screen.getByRole("complementary", { name: "What I work with" }));
    const footer = within(screen.getByRole("contentinfo"));
    const groups = toolkit.getAllByRole("definition");

    expect(groups).toHaveLength(4);
    expect(toolkit.getByText("Testing and delivery")).toBeInTheDocument();
    expect(toolkit.getByText(/React Native · iOS · Android/)).toBeInTheDocument();
    for (const group of groups) {
      for (const name of (group.textContent ?? "").split(" · ")) {
        expect(footer.getByText(name, { exact: true })).toBeInTheDocument();
      }
    }
  });

  test("shows projects and work history as separate, complete collections", () => {
    const projects = screen.getByRole("region", { name: "Selected work" });
    const experience = screen.getByRole("region", { name: "Experience" });

    expect(within(projects).getAllByRole("article")).toHaveLength(9);
    expect(within(experience).getAllByRole("article")).toHaveLength(5);
    expect(within(projects).getByRole("button", { name: "Movie Database" })).toBeInTheDocument();
    expect(within(experience).getByRole("button", { name: "Intern" })).toBeInTheDocument();
  });

  test.each([
    ["DLR Consulting Ltd.", "https://dlrconsulting.ca/"],
    ["True Depth Capital", "https://angelwiebe.github.io/true-depth-capital/"],
    ["Charmed Code", "https://angelwiebe.github.io/charmed-code/"],
  ])("links %s to its live website", async (name, url) => {
    const user = userEvent.setup();
    const projects = within(screen.getByRole("region", { name: "Selected work" }));
    await user.click(projects.getByRole("button", { name }));
    const dialog = within(screen.getByRole("dialog", { name }));
    expect(dialog.getByRole("link", { name: "Visit the project website" })).toHaveAttribute("href", url);
  });

  test("shows résumé client sections and complete bullets in the expanded work view", async () => {
    const user = userEvent.setup();
    const workHistory = within(screen.getByRole("region", { name: "Experience" }));
    const contractor = within(workHistory.getByText("Contractor", { exact: true }).closest("article")!);
    await user.click(contractor.getByRole("button"));
    const dialog = within(screen.getByRole("dialog", { name: "Full-Stack Developer (Independent Contractor)" }));

    expect(dialog.getByText("2734539 Alberta Ltd.")).toBeInTheDocument();
    expect(dialog.getByRole("heading", { name: /^Client: Topstep/ })).toBeInTheDocument();
    expect(dialog.getByRole("heading", { name: /^Client: Intuit \/ Mailchimp/ })).toBeInTheDocument();
    expect(dialog.getAllByRole("listitem")).toHaveLength(5);
    expect(dialog.getByText(/Technical Environment:/)).toBeInTheDocument();
  });

  test("opens the selected project's details and restores focus when dismissed", async () => {
    const user = userEvent.setup();
    const card = screen.getByRole("button", { name: "Virtual Resume" });

    await user.click(card);
    expect(
      screen.getByRole("dialog", { name: "Virtual Resume" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(card).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Google Map Example" }));
    expect(
      screen.getByRole("dialog", { name: "Google Map Example" }),
    ).toBeInTheDocument();
  });

  test("renders name in main content", () => {
    const nameElement = screen.getByTestId("description_name");
    expect(nameElement).toBeInTheDocument();
  });

  test("renders bio in main content", () => {
    const bioElement = screen.getByTestId("description_bio");
    expect(bioElement).toBeInTheDocument();
  });

  test("updates the document language when the language changes", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /^FR / }));
    expect(document.documentElement).toHaveAttribute("lang", "fr");
    await user.click(screen.getByRole("button", { name: /^EN / }));
    expect(document.documentElement).toHaveAttribute("lang", "en");
  });
});
