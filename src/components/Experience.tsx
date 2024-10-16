import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

import experienceInterface from "../types/experience";

interface ExperienceProps {
  experience: experienceInterface;
  onClick: () => void;
}

const Experience = ({ experience, onClick }: ExperienceProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Card
        tabIndex={0}
        role="article"
        aria-labelledby={`${experience.title}-header`}
        className={experience.type === "job" ? "blue" : "pink"}
        style={{ cursor: "pointer" }}
        onClick={onClick}
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
      </Card>
    </>
  );
};

export default Experience;
