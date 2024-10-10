import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

import experienceInterface from "../types/experience";
import ExperienceModal from "./ExperienceModal";

interface ExperienceProps {
  experience: experienceInterface;
}

const Experience = ({ experience }: ExperienceProps) => {
  const { t } = useTranslation();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  useEffect(() => {
    if (detailsOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [detailsOpen]);

  return (
    <>
      <Card
        tabIndex={0}
        role="article"
        aria-labelledby={`${experience.title}-header`}
        className={experience.type === "job" ? "blue" : "pink"}
        onClick={handleDetailsOpen}
        style={{ cursor: "pointer" }}
      >
        <CardHeader
          title={
            <Typography
              variant="h6"
              className="title"
              id={`${experience.title}-header`}
            >
              {experience.title}
            </Typography>
          }
          action={<ExpandMoreIcon />}
        />
        <CardContent>
          {experience.company && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t("company")}
              </Box>
              {experience.company}
            </Typography>
          )}

          <Typography>
            <Box component="span" fontWeight="bold">
              {t("timeline")}
            </Box>
            {experience.timeline}
          </Typography>

          <Typography>{experience.details.substring(0, 50)}...</Typography>

          {experience.tech_stack && (
            <Typography>
              <Box component="span" fontWeight="bold">
                {t("tech_stack")}
              </Box>
              {experience.tech_stack}
            </Typography>
          )}
        </CardContent>
      </Card>

      <ExperienceModal
        experience={experience}
        detailsOpen={detailsOpen}
        handleDetailsClose={handleDetailsClose}
      />
    </>
  );
};

export default Experience;
