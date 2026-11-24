import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import enPdf from "../assets/Resume2026.pdf";
import frPdf from "../assets/ResumeFR2026.pdf";

const Header = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;
  const header = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = header.current;
    if (!element) return;

    const root = document.documentElement;
    const updateScrollOffset = () => {
      root.style.setProperty("--site-header-height", `${element.getBoundingClientRect().height}px`);
    };

    updateScrollOffset();
    const observer = typeof ResizeObserver === "undefined"
      ? undefined
      : new ResizeObserver(updateScrollOffset);
    observer?.observe(element);

    return () => {
      observer?.disconnect();
      root.style.removeProperty("--site-header-height");
    };
  }, []);

  return (
    <header ref={header} className="site-header">
      <div className="header-inner page-width">
        <a href="#" className="wordmark">
          <span className="monogram" aria-hidden="true">AW</span>
          {t("description.name")}
        </a>

        <nav className="site-nav" aria-label={t("portfolio.navigation")}>
          <a href="#work">{t("portfolio.nav_work")}</a>
          <a href="#experience">{t("experience")}</a>
          <a href="#contact">{t("portfolio.contact")}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switcher" role="group" aria-label={t("aria.language_switcher")}>
            {(["en", "fr"] as const).map((code) => (
              <button
                key={code}
                type="button"
                aria-label={t(code === "en" ? "aria.switch_english" : "aria.switch_french")}
                aria-pressed={language === code}
                onClick={() => void i18n.changeLanguage(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="button button-outline resume-link" href={language === "fr" ? frPdf : enPdf} download="resume.pdf">
            <DownloadOutlinedIcon fontSize="inherit" />
            {t("download")}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
