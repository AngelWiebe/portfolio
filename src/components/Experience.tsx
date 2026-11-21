import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useId } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

import experienceInterface from "../types/experience";

interface ExperienceProps {
  experience: experienceInterface;
  onClick: () => void;
}

const Experience = ({ experience, onClick }: ExperienceProps) => {
  const { t } = useTranslation();
  const titleId = useId();

  return (
    <Card
      role="article"
      aria-labelledby={titleId}
      className={experience.type === "job" ? "blue" : "pink"}
    >
      <CardHeader
        title={
          <Typography
            component="h3"
            variant="h6"
            className="title"
            id={titleId}
          >
            {experience.title}
          </Typography>
        }
        action={<ExpandMoreIcon />}
      />
      <CardContent>
        {experience.company && (
          <Typography data-testid="company">
            <Box component="span" fontWeight="bold">
              {t("company")}
            </Box>
            {experience.company}
          </Typography>
        )}

        <Typography data-testid="timeline">
          <Box component="span" fontWeight="bold">
            {t("timeline")}
          </Box>
          {experience.timeline}
        </Typography>

        <Typography>{experience.details.substring(0, 50)}...</Typography>

        {experience.tech_stack && (
          <Typography data-testid="tech_stack">
            <Box component="span" fontWeight="bold">
              {t("tech_stack")}
            </Box>
            {experience.tech_stack}
          </Typography>
        )}
      </CardContent>
      <CardActionArea aria-labelledby={titleId} onClick={onClick} />
    </Card>
  );
};

export default Experience;
