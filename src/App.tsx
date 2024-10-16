import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Typography, Stack } from "@mui/material";
import { useState } from "react";

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
  const { t } = useTranslation();
  const [selectedExperience, setSelectedExperience] =
    useState<experienceInterface | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    accessibility: true,
  };

  return (
    <div role="application">
      <header className="header" role="banner" aria-label="Main Header">
        <Header />
      </header>

      <main role="main">
        <Stack className="main-content" style={backgroundStyle}>
          <Typography
            aria-live="polite"
            className="hide-on-mobile neon-text"
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
        <section className="experience" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="visually-hidden">
            Experience
          </h2>
          <Slider
            {...settings}
            className="slider-wrapper"
            aria-label="Experience Slider"
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

      <footer className="footer" role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
