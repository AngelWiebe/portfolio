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

    expect(within(projects).getAllByRole("article")).toHaveLength(10);
    expect(within(experience).getAllByRole("article")).toHaveLength(5);
    expect(within(projects).getByRole("button", { name: "Movie Database" })).toBeInTheDocument();
    expect(within(experience).getByRole("button", { name: "Intern" })).toBeInTheDocument();
  });

  test("features WildBalance and Charmed Code first, with project screenshots", () => {
    const work = within(screen.getByRole("region", { name: "Selected work" }));
    const cards = work.getAllByRole("article");

    expect(cards.slice(0, 2).map((card) => card.querySelector("h3")?.textContent))
      .toEqual(["WildBalance", "Charmed Code"]);
    expect(cards.slice(0, 2).every((card) => card.querySelector("img")?.hasAttribute("src"))).toBe(true);
    expect(work.getByRole("button", { name: "Virtual Resume" })).toBeInTheDocument();
    expect(work.getByRole("button", { name: "Google Map Example" })).toBeInTheDocument();
  });

  test("links WildBalance to its source repository", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "WildBalance" }));
    const dialog = within(screen.getByRole("dialog", { name: "WildBalance" }));
    expect(dialog.getByRole("link", { name: "View project source on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/AngelWiebe/wildbalance",
    );
  });

  test.each([
    ["DLR Consulting Ltd.", "https://dlrconsulting.ca/", "https://github.com/AngelWiebe/dlr-consulting"],
    ["True Depth Capital", "https://angelwiebe.github.io/true-depth-capital/", "https://github.com/AngelWiebe/true-depth-capital"],
    ["Charmed Code", "https://angelwiebe.github.io/charmed-code/", "https://github.com/AngelWiebe/charmed-code"],
  ])("links %s to its live website and source", async (name, url, source) => {
    const user = userEvent.setup();
    const projects = within(screen.getByRole("region", { name: "Selected work" }));
    await user.click(projects.getByRole("button", { name }));
    const dialog = within(screen.getByRole("dialog", { name }));
    expect(dialog.getByRole("link", { name: "Visit the project website" })).toHaveAttribute("href", url);
    expect(dialog.getByRole("link", { name: "View project source on GitHub" })).toHaveAttribute("href", source);
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

  test("keeps the full technical environment visible on work-history cards", () => {
    const history = within(screen.getByRole("region", { name: "Experience" }));
    const contractor = within(history.getByText("Contractor", { exact: true }).closest("article")!);
    const stack = contractor.getByTestId("tech_stack");
    expect(stack).toHaveTextContent("Expo");
    expect(stack).toHaveTextContent("GraphQL");
    expect(stack).toHaveTextContent("Cursor");
  });

  test("shows the project stack with the billing system’s résumé extract", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Internal Billing System" }));
    const dialog = within(screen.getByRole("dialog", { name: "Internal Billing System" }));
    expect(dialog.getByText("React, Laravel")).toBeInTheDocument();
    expect(dialog.getByRole("listitem")).toHaveTextContent(/replaced manual billing work/);
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
