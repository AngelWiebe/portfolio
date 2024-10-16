import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const skillsList = t("description.skill", { returnObjects: true });
  const skillsArray = Array.isArray(skillsList) ? skillsList : [];

  return (
    <Stack alignItems="center" flexDirection="row" spacing={2}>
      <Typography component="span">{t("tech_stack")}</Typography>
      <ul className="skill-list">
        {skillsArray.map((skill, index) => (
          <li className="skill-item" key={index}>
            {skill}
          </li>
        ))}
      </ul>
    </Stack>
  );
};

export default Footer;
