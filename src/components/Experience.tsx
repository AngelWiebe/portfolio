import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useId } from "react";
import { useTranslation } from "react-i18next";

import type ExperienceEntry from "../types/experience";

interface ExperienceProps {
  experience: ExperienceEntry;
  onClick: () => void;
}

const Experience = ({ experience, onClick }: ExperienceProps) => {
  const { t } = useTranslation();
  const titleId = useId();
  const techStack = experience.resume?.technicalEnvironment ?? experience.tech_stack;
  const isJob = experience.type === "job";
  const isFeatured = Boolean(experience.featured_image);
  const Heading = !isJob && !isFeatured ? "h4" : "h3";

  return (
    <article
      aria-labelledby={titleId}
      className={isJob ? "role" : isFeatured ? "project project-featured" : "project project-compact"}
    >
      {experience.featured_image && (
        <img className="project-image" src={experience.featured_image} alt="" width="1280" height="720" />
      )}
      <div className="entry-content">
        <p className="entry-date" data-testid="timeline">{experience.timeline}</p>
        <Heading id={titleId}>{experience.title}</Heading>
        {experience.company && <p className="entry-company" data-testid="company">{experience.company}</p>}
        <p className="entry-summary">{experience.summary ?? experience.details.split(". ")[0].replace(/\.?$/, ".")}</p>
        {techStack && (
          <p className="entry-stack" data-testid="tech_stack">
            {techStack.split(", ").join(" · ")}
          </p>
        )}
        <span className="entry-action" aria-hidden="true">
          {isFeatured && t("portfolio.open_project")}
          <ArrowOutwardIcon fontSize="inherit" />
        </span>
      </div>
      <button
        className="entry-button"
        type="button"
        aria-labelledby={titleId}
        onClick={(event) => {
          event.currentTarget.focus({ preventScroll: true });
          onClick();
        }}
      />
    </article>
  );
};

export default Experience;
