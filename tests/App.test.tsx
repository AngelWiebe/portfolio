// src/components/App.test.tsx
import { render, screen } from "@testing-library/react";
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

  test("renders Experience Slider", () => {
    const experienceElement = screen.getByRole("region", {
      name: /experience/i,
    });
    expect(experienceElement).toBeInTheDocument();
  });

  test("disables offscreen slides while keeping visible slides interactive", () => {
    const carousel = screen.getByRole("region", { name: /experience/i });
    const hidden = carousel.querySelectorAll('.slick-slide[aria-hidden="true"]');
    const visible = carousel.querySelectorAll('.slick-slide[aria-hidden="false"]');

    expect(hidden.length).toBeGreaterThan(0);
    expect(visible.length).toBeGreaterThan(0);
    hidden.forEach((slide) => expect(slide).toHaveAttribute("inert"));
    visible.forEach((slide) => expect(slide).not.toHaveAttribute("inert"));
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
