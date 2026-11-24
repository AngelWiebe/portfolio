import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useTranslation } from "react-i18next";
import { techStack } from "../toolkit";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer-inner page-width">
      <div className="footer-contact">
        <h2>{t("portfolio.contact_heading")}</h2>
        <a className="footer-email" href="mailto:angel.wiebe.91@gmail.com">{t("portfolio.email_me")} <ArrowOutwardIcon fontSize="inherit" /></a>
        <div className="footer-links">
          <a href="https://github.com/AngelWiebe">GitHub <ArrowOutwardIcon fontSize="inherit" /></a>
          <a href="https://www.linkedin.com/in/angel-wiebe-a07112113/">LinkedIn <ArrowOutwardIcon fontSize="inherit" /></a>
        </div>
      </div>
      <div className="footer-skills">
        <h2>{t("portfolio.stack")}</h2>
        <ul>
          {techStack.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
