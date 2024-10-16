// src/components/App.test.tsx
import { render, screen } from "@testing-library/react";
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

  test("renders name in main content", () => {
    const nameElement = screen.getByTestId("description_name");
    expect(nameElement).toBeInTheDocument();
  });

  test("renders bio in main content", () => {
    const bioElement = screen.getByTestId("description_bio");
    expect(bioElement).toBeInTheDocument();
  });
});
