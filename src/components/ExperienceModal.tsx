import {
  Typography,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useId, useState, type MouseEvent } from "react";

import PreviewPlayer from "./PreviewPlayer";
import type ExperienceEntry from "../types/experience";
import GitHubIcon from "@mui/icons-material/GitHub";
import PreviewIcon from "@mui/icons-material/Preview";
import LinkIcon from "@mui/icons-material/Link";

interface ExperienceModalProps {
  detailsOpen: boolean;
  experience: ExperienceEntry | null;
  handleDetailsClose: () => void;
}

const ExperienceModal = ({
  experience,
  detailsOpen,
  handleDetailsClose,
}: ExperienceModalProps) => {
  const { t } = useTranslation();
  const [videoOpen, setVideoOpen] = useState(false);
  const detailsTitleId = useId();
  const videoDescriptionId = useId();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!experience) return null;

  const { resume } = experience;
  const company = resume?.company ?? experience.company;
  const location = resume?.location ?? experience.location;
  const techStack = resume?.technicalEnvironment ?? experience.tech_stack;

  const handleVideoOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.focus({ preventScroll: true });
    setVideoOpen(true);
  };

  const handleVideoClose = () => {
    setVideoOpen(false);
  };

  return (
    <>
      <Dialog
        open={detailsOpen}
        onClose={handleDetailsClose}
        maxWidth="md"
        fullWidth
        className="modal"
        aria-labelledby={detailsTitleId}
        transitionDuration={reduceMotion ? 0 : undefined}
      >
        <DialogContent
          tabIndex={resume ? 0 : undefined}
          role={resume ? "region" : undefined}
          aria-labelledby={resume ? detailsTitleId : undefined}
        >
          <Typography component="h2" variant="h6" id={detailsTitleId}>
            {resume?.title ?? experience.title}
          </Typography>
          {company && (
            <Typography variant="body1">
              <Box component="span" fontWeight="bold">
                {t("company")}
              </Box>
              {company}
            </Typography>
          )}
          {location && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t("location")}
              </Box>
              {location}
            </Typography>
          )}
          <Typography>
            <Box component="span" fontWeight="bold">
              {t("timeline")}
            </Box>
            {resume?.timeline ?? experience.timeline}
          </Typography>

          {!resume && experience.work_type && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t("work_type")}
              </Box>
              {experience.work_type}
            </Typography>
          )}

          {resume ? (
            <div className="resume-extract">
              {resume.sections.map(({ heading, intro, bullets }) => (
                <div key={heading ?? bullets[0]}>
                  {heading && <Typography component="h3" variant="subtitle1">{heading}</Typography>}
                  {intro && <Typography>{intro}</Typography>}
                  <ul>
                    {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="body1">{experience.details}</Typography>
          )}

          {techStack && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t(resume?.technicalEnvironment ? "technical_environment" : "tech_stack")}
              </Box>
              {techStack}
            </Typography>
          )}

          {experience.git_link && (
            <IconButton
              component="a"
              href={experience.git_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("aria.github_link")}
              color="primary"
            >
              <GitHubIcon />
            </IconButton>
          )}

          {experience.preview && (
            <IconButton
              component="button"
              onClick={handleVideoOpen}
              aria-label={t("aria.preview_video")}
              color="primary"
              data-testid="preview_video"
            >
              <PreviewIcon />
            </IconButton>
          )}

          {experience.site && (
            <IconButton
              component="a"
              href={experience.site}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("aria.website_link")}
              color="primary"
            >
              <LinkIcon />
            </IconButton>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>{t("close_project")}</Button>
        </DialogActions>
      </Dialog>

      {videoOpen && experience.preview && (
        <Dialog
          open
          onClose={handleVideoClose}
          maxWidth="md"
          fullWidth
          className="modal"
          slotProps={{ paper: { "aria-label": t("aria.preview_video") } }}
          transitionDuration={reduceMotion ? 0 : undefined}
        >
          <DialogContent>
            <PreviewPlayer
              src={experience.preview}
              descriptionId={experience.preview_description ? videoDescriptionId : undefined}
            />
            {experience.preview_description && (
              <Typography id={videoDescriptionId}>
                <strong>{t("video_description")}</strong>{" "}
                {experience.preview_description}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleVideoClose}>{t("back_to_project")}</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ExperienceModal;
