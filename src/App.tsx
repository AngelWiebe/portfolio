import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./App.scss";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ExperienceModal from "./components/ExperienceModal";
import experienceInterface from "./types/experience";

function App() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;
  const [selectedExperience, setSelectedExperience] =
    useState<experienceInterface | null>(null);

  useEffect(() => {
    document.documentElement.lang = language ?? "en";
  }, [language]);

  const entries = t("cards", { returnObjects: true });
  const experiences: experienceInterface[] = Array.isArray(entries) ? entries : [];
  const projects = experiences.filter((entry) => entry.type === "project");
  const featured = projects.filter((project) => project.featured_image);
  const otherProjects = projects.filter((project) => !project.featured_image);
  const roles = experiences.filter((entry) => entry.type === "job");
  const renderEntry = (entry: experienceInterface) => (
    <Experience
      key={`${entry.title}-${entry.timeline}`}
      experience={entry}
      onClick={() => setSelectedExperience(entry)}
    />
  );

  return (
    <>
      <a className="skip-link" href="#main">{t("portfolio.skip")}</a>
      <header className="site-header">
        <Header />
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero page-width" aria-labelledby="intro-heading">
          <div className="hero-copy">
            <p className="eyebrow hero-location">
              <LocationOnOutlinedIcon fontSize="inherit" />
              {t("description.address")}
            </p>
            <h1 id="intro-heading" data-testid="description_name">
              {t("description.name")}
            </h1>
            <h2 className="hero-role">{t("portfolio.role")}</h2>
            <p className="hero-summary" data-testid="description_bio">
              {t("portfolio.intro")}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                {t("portfolio.view_work")}
                <ArrowDownwardIcon fontSize="inherit" />
              </a>
              <a className="button button-quiet" href="#contact">
                {t("portfolio.get_in_touch")}
              </a>
            </div>
            <details className="hero-about">
              <summary>{t("portfolio.about")}</summary>
              <p>{t("description.bio")}</p>
            </details>
          </div>

          <aside className="focus-panel" aria-labelledby="focus-heading">
            <h2 id="focus-heading" className="eyebrow">{t("portfolio.toolkit")}</h2>
            <dl>
              <div><dt>{t("portfolio.frontend")}</dt><dd>React · TypeScript</dd></div>
              <div><dt>{t("portfolio.backend")}</dt><dd>Go · Node.js · SQL</dd></div>
              <div><dt>{t("portfolio.mobile")}</dt><dd>React Native</dd></div>
            </dl>
          </aside>
        </section>

        <section id="work" className="work-section page-width" aria-labelledby="work-heading">
          <div className="section-heading">
            <h2 id="work-heading">{t("portfolio.selected_work")}</h2>
            <p>{t("portfolio.work_intro")}</p>
          </div>
          <div className="featured-grid">{featured.map(renderEntry)}</div>
          <h3 className="more-heading">{t("portfolio.more_projects")}</h3>
          <div className="other-projects">{otherProjects.map(renderEntry)}</div>
        </section>

        <section id="experience" className="experience-section page-width" aria-labelledby="experience-heading">
          <div className="section-heading">
            <h2 id="experience-heading">{t("experience")}</h2>
            <p>{t("portfolio.experience_intro")}</p>
          </div>
          <div className="role-list">{roles.map(renderEntry)}</div>
        </section>
      </main>

      <ExperienceModal
        experience={selectedExperience}
        detailsOpen={selectedExperience !== null}
        handleDetailsClose={() => setSelectedExperience(null)}
      />

      <footer id="contact" className="site-footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
