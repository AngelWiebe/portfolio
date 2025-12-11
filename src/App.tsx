import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./App.scss";
import background from "./assets/background.jpeg";
import Experience from "./components/Experience";
import ExperienceModal from "./components/ExperienceModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: false,
    variableWidth: false,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1200,
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
            className="main-heading"
            variant="h1"
            component="h1"
            data-testid="description_name"
          >
            {t("header")}
          </Typography>
          <Typography
            className="main-subheading"
            variant="h2"
            component="h2"
            data-testid="subheader"
          >
            {t("subheader")}
          </Typography>
          <Typography
            className="bio"
            data-testid="description_bio"
            aria-live="polite"
          >
            {t("description.bio")}
          </Typography>
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
        </Stack>
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
