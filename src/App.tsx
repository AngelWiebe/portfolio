import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Typography, Stack, useMediaQuery } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import "./App.scss";
import background from "./assets/background.jpg";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ExperienceModal from "./components/ExperienceModal";
import experienceInterface from "./types/experience";

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
};

function App() {
  const { t, i18n } = useTranslation();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const language = i18n.resolvedLanguage;

  useEffect(() => {
    document.documentElement.lang = language ?? "en";
  }, [language]);
  const [selectedExperience, setSelectedExperience] =
    useState<experienceInterface | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const experienceSection = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = experienceSection.current;
    if (!section) return;

    // Slick marks offscreen slides aria-hidden without disabling their controls.
    const syncSlideInteractivity = () => {
      section.querySelectorAll(".slick-slide[aria-hidden]").forEach((slide) => {
        slide.toggleAttribute("inert", slide.getAttribute("aria-hidden") === "true");
      });
    };

    syncSlideInteractivity();
    const observer = new MutationObserver(syncSlideInteractivity);
    observer.observe(section, {
      attributeFilter: ["aria-hidden"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const experienceList = t("cards", { returnObjects: true });
  const experienceArray = Array.isArray(experienceList) ? experienceList : [];

  const handleOpenDetails = (experience: experienceInterface) => {
    setSelectedExperience(experience);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedExperience(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: reduceMotion ? 0 : 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    accessibility: true,
    prevArrow: <button type="button" aria-label={t("aria.previous_projects")} />,
    nextArrow: <button type="button" aria-label={t("aria.next_projects")} />,
  };

  return (
    <div>
      <header className="header">
        <Header />
      </header>

      <main>
        <Stack className="main-content" style={backgroundStyle}>
          <Typography
            aria-live="polite"
            className="neon-text"
            component="h1"
            variant="h3"
            data-testid="description_name"
          >
            {t("description.name")}
          </Typography>
          <Typography
            className="bio"
            data-testid="description_bio"
            aria-live="polite"
          >
            {t("description.bio")}
          </Typography>
        </Stack>
        <section
          ref={experienceSection}
          className="experience"
          aria-labelledby="experience-heading"
        >
          <h2 id="experience-heading" className="visually-hidden">
            {t("experience")}
          </h2>
          <Slider
            {...settings}
            className="slider-wrapper"
            data-testid="experience_slider"
          >
            {experienceArray.map((experience, index) => (
              <Experience
                key={index}
                experience={experience}
                onClick={() => handleOpenDetails(experience)}
              />
            ))}
          </Slider>
        </section>
      </main>

      <ExperienceModal
        experience={selectedExperience}
        detailsOpen={detailsOpen}
        handleDetailsClose={handleDetailsClose}
      />

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
