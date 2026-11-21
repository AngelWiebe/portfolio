import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExperienceModal from "../src/components/ExperienceModal";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import React from "react";

describe("ExperienceModal Component", () => {
  const mockExperience = {
    title: "Test Title",
    company: "Test Company",
    location: "Test Location",
    timeline: "Jan 2020 - Present",
    work_type: "Full-time",
    details: "Test details about the experience.",
    tech_stack: "React, TypeScript",
    git_link: "https://github.com/test",
    preview: "https://example.com/video.mp4",
    preview_description: "The demo opens with a search field and a map.",
    site: "https://example.com",
    type: "job",
  };

  const handleDetailsClose = vi.fn();

  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <ExperienceModal
          experience={mockExperience}
          detailsOpen={true}
          handleDetailsClose={handleDetailsClose}
        />
      </I18nextProvider>
    );
  });

  test("renders experience title", () => {
    expect(
      screen.getByRole("dialog", { name: mockExperience.title }),
    ).toBeInTheDocument();
    const titleElement = screen.getByRole("heading", {
      name: mockExperience.title,
    });
    expect(titleElement).toBeInTheDocument();
  });

  test("renders company name", () => {
    const companyElement = screen.getByText(/Test Company/i);
    expect(companyElement).toBeInTheDocument();
  });

  test("renders location", () => {
    const locationElement = screen.getByText(/Test Location/i);
    expect(locationElement).toBeInTheDocument();
  });

  test("renders work type", () => {
    const workTypeElement = screen.getByText(/Full-time/i);
    expect(workTypeElement).toBeInTheDocument();
  });

  test("opens video modal when preview icon is clicked", () => {
    const previewButton = screen.getByTestId(/preview_video/i);
    fireEvent.click(previewButton);

    const videoElement = screen.getByTestId("video");
    expect(videoElement).toHaveAccessibleDescription(
      expect.stringContaining(mockExperience.preview_description),
    );
    expect(
      screen.getByRole("dialog", { name: i18n.t("aria.preview_video") }),
    ).toContainElement(videoElement);
  });

  test("returns focus to details on Escape and closes details on the next Escape", async () => {
    const user = userEvent.setup();
    const previewButton = screen.getByTestId("preview_video");
    await user.click(previewButton);

    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("video")).not.toBeInTheDocument();
    expect(previewButton).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(handleDetailsClose).toHaveBeenCalledTimes(1);
  });
});
