import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Typography, Stack } from "@mui/material";

import "./App.scss";
import background from "./assets/background.jpg";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
};

function App() {
  const { t } = useTranslation();

  const experienceList = t("cards", { returnObjects: true });
  const experienceArray = Array.isArray(experienceList) ? experienceList : [];

  // const skillsList = t("description.skill", { returnObjects: true });
  // const skillsArray = Array.isArray(skillsList) ? skillsList : [];

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
          >
            {t("description.name")}
          </Typography>
          <Typography className="bio" aria-live="polite">
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
          >
            {experienceArray.map((experience, index) => (
              <Experience experience={experience} key={index} />
            ))}
          </Slider>
        </section>
      </main>

      <footer className="footer" role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
