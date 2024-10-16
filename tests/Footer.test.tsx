import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import React from "react";

describe("Footer Component", () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Footer />
      </I18nextProvider>
    );
  });

  test("renders tech stack text", () => {
    const techStackElement = screen.getByText(/tech stack/i);
    expect(techStackElement).toBeInTheDocument();
  });

  test("renders skills list", () => {
    const skillsList = screen.getByRole("list");
    expect(skillsList).toBeInTheDocument();
  });

  test("renders individual skill items", () => {
    const skillItems = screen.getAllByRole("listitem");
    expect(skillItems.length).toBeGreaterThan(0);
  });
});
