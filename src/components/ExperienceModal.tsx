import {
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

import experienceInterface from "../types/experience";
import GitHubIcon from "@mui/icons-material/GitHub";
import PreviewIcon from "@mui/icons-material/Preview";
import LinkIcon from "@mui/icons-material/Link";

interface ExperienceModalProps {
  detailsOpen: boolean;
  experience: experienceInterface;
  handleDetailsClose: () => void;
}

const ExperienceModal = ({
  experience,
  detailsOpen,
  handleDetailsClose,
}: ExperienceModalProps) => {
  const { t } = useTranslation();
  const [videoOpen, setVideoOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleVideoOpen = () => {
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
        className={`modal ${experience.type === "job" ? "blue" : "pink"}`}
        ref={dialogRef}
        aria-labelledby={`${experience.title}-details`}
        aria-modal="true"
      >
        <DialogContent className="modal">
          <Typography variant="h6" id={`${experience.title}-details`}>
            {experience.title}
          </Typography>
          {experience.company && (
            <Typography variant="body1">
              <Box component="span" fontWeight="bold">
                {t("company")}
              </Box>
              {experience.company}
            </Typography>
          )}
          {experience.location && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t("location")}
              </Box>
              {experience.location}
            </Typography>
          )}
          <Typography>
            <Box component="span" fontWeight="bold">
              {t("timeline")}
            </Box>
            {experience.timeline}
          </Typography>

          {experience.work_type && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t("work_type")}
              </Box>
              {experience.work_type}
            </Typography>
          )}

          <Typography variant="body1">{experience.details}</Typography>

          {experience.tech_stack && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t("tech_stack")}
              </Box>
              {experience.tech_stack}
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
      </Dialog>

      <Dialog
        open={videoOpen}
        onClose={handleVideoClose}
        maxWidth="md"
        fullWidth
        className="modal"
        aria-labelledby="video-dialog-title"
        aria-describedby="video-description"
      >
        <DialogContent className="modal">
          <video width="100%" height="500" controls>
            <source src={experience.preview || undefined} type="video/mp4" />
            {t("unsupported")}
          </video>
          {/* TODO: <Typography variant="caption" id="video-description">
            {t("video_description")}
          </Typography> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceModal;
