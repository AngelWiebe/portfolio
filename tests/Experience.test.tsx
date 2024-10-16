import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import Experience from "../src/components/Experience";
import experienceInterface from "../src/types/experience";
import React from "react";

const mockExperience: experienceInterface = {
  title: "Software Engineer",
  company: "Tech Corp",
  timeline: "January 2020 - Present",
  details: "Developing applications and improving systems for efficiency.",
  tech_stack: "React, Node.js, MongoDB",
  type: "job",
  location: "",
  work_type: "",
  preview: null,
  git_link: "",
  site: null,
};

describe("Experience Component", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Experience experience={mockExperience} onClick={mockOnClick} />
      </I18nextProvider>
    );
  });

  test("renders Experience card with title", () => {
    const titleElement = screen.getByText(mockExperience.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders company name", () => {
    const companyElement = screen.getByTestId("company");
    expect(companyElement).toBeInTheDocument();
    expect(companyElement).toHaveTextContent(mockExperience.company);
  });

  test("renders timeline", () => {
    const timelineElement = screen.getByTestId("timeline");
    expect(timelineElement).toBeInTheDocument();
    expect(timelineElement).toHaveTextContent(mockExperience.timeline);
  });

  test("renders details", () => {
    const detailsElement = screen.getByText(/developing applications/i);
    expect(detailsElement).toBeInTheDocument();
  });

  test("renders tech stack", () => {
    const techStackElement = screen.getByTestId("tech_stack");
    expect(techStackElement).toBeInTheDocument();
    expect(techStackElement).toHaveTextContent(mockExperience.tech_stack);
  });

  test("calls onClick function when card is clicked", () => {
    const cardElement = screen.getByRole("article");
    fireEvent.click(cardElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
