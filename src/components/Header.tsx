import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Button, IconButton, Stack, useTheme } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const downloadPdf = () => {
    const link = document.createElement("a");
    const enPdf = "./src/assets/Resume2025.pdf";
    const frPdf = "./src/assets/ResumeFR2025.pdf";

    const pdfToDownload = i18n.language === "fr" ? frPdf : enPdf;
    link.href = pdfToDownload;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Stack
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      spacing={2}
      sx={{
        padding: { xs: 2, sm: 3 },
        width: "100%",
        maxWidth: "100%",
        [theme.breakpoints.up("sm")]: {
          flexDirection: "row",
        },
      }}
    >
      <address className="location">
        <Trans i18nKey="description.address" />
      </address>

      <Stack
        className="social-icons"
        direction="row"
        spacing={1}
        sx={{
          marginBottom: { xs: 2, sm: 0 },
          justifyContent: "center",
        }}
      >
        <IconButton
          component="a"
          href="https://github.com/AngelWiebe?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("aria.github_link")}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/angel-wiebe-a07112113/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("aria.linkedin_link")}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component="a"
          href={`mailto:angel.wiebe.91@gmail.com`}
          aria-label={t("aria.email_link")}
        >
          <EmailIcon />
        </IconButton>
      </Stack>

      <Button
        className="download-resume"
        onClick={downloadPdf}
        variant="text"
        aria-label={t("aria.download_resume")}
        sx={{
          fontSize: { xs: "14px", sm: "16px" },
          padding: { xs: "8px 16px", sm: "12px 24px" },
          width: { xs: "80%", sm: "auto" },
          alignSelf: { xs: "center", sm: "initial" },
        }}
      >
        {t("download")}
      </Button>

      <Stack
        direction="row"
        spacing={1}
        className="language-switcher"
        sx={{
          marginTop: { xs: 2, sm: 0 },
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
        aria-label={t("aria.language_switcher")}
      >
        <Button
          onClick={() => changeLanguageHandler("en")}
          aria-label="Switch to English"
          variant="text"
          sx={{
            fontSize: { xs: "12px", sm: "14px" },
            minWidth: { xs: "48px", sm: "64px" },
          }}
        >
          EN
        </Button>
        <Button
          onClick={() => changeLanguageHandler("fr")}
          aria-label="Switch to French"
          variant="text"
          sx={{
            fontSize: { xs: "12px", sm: "14px" },
            minWidth: { xs: "48px", sm: "64px" },
          }}
        >
          FR
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
