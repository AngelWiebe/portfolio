import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./App.scss";
import toolkitImage from "./assets/toolkit-circuit.jpg";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ExperienceModal from "./components/ExperienceModal";
import type ExperienceEntry from "./types/experience";
import { toolkit } from "./toolkit";

function App() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceEntry | null>(null);

  useEffect(() => {
    document.documentElement.lang = language ?? "en";
  }, [language]);

  const entries = t("cards", { returnObjects: true });
  const experiences: ExperienceEntry[] = Array.isArray(entries) ? entries : [];
  const projects = experiences.filter((entry) => entry.type === "project");
  const featured = projects.filter((project) => project.featured_image);
  const otherProjects = projects.filter((project) => !project.featured_image);
  const roles = experiences.filter((entry) => entry.type === "job");
  const renderEntry = (entry: ExperienceEntry) => (
    <Experience
      key={`${entry.title}-${entry.timeline}`}
      experience={entry}
      onClick={() => setSelectedExperience(entry)}
    />
  );

  return (
    <>
      <a className="skip-link" href="#main">{t("portfolio.skip")}</a>
      <Header />

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
            <img className="focus-illustration" src={toolkitImage} alt="" width="1080" height="360" />
            <h2 id="focus-heading" className="eyebrow">{t("portfolio.toolkit")}</h2>
            <dl>
              {Object.entries(toolkit).map(([category, technologies]) => (
                <div key={category}>
                  <dt>{t(`portfolio.${category}`)}</dt>
                  <dd>{technologies.join(" · ")}</dd>
                </div>
              ))}
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
