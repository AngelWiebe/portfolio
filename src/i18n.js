import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    default: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          description: {
            name: "Angel Wiebe",
            address: "Okotoks, Alberta",
            skill: [
              "React",
              "React Native",
              "Typescript",
              "Javascript",
              "SCSS",
              "NodeJS",
              "PHP",
              "Laravel",
              "MySQL",
              "MongoDB",
              "Jest",
              "Webpack",
              "Babel",
              "Git",
              "Docker",
              "Azure DevOps",
            ],
            bio: "I am Angel Wiebe, a dedicated software developer with over 8 years of experience, specializing in front-end technologies while continuously expanding my skills in back-end development. I hold a diploma in Software & Database Development from Robertson Career College, where I graduated with academic excellence. My tech stack includes JavaScript, React, TypeScript, React Native, Node.js, Angular, PHP, Laravel, MongoDB, MySQL, Git, Docker, and Azure DevOps, among others. I am passionate about creating innovative solutions and delivering high-quality code, eager to contribute my expertise to exciting projects.",
          },
          aria: {
            github_link: "Visit my GitHub profile",
            linkedin_link: "Visit my LinkedIn profile",
            email_link: "Send me an email",
            preview_video: "Watch the project preview video",
            website_link: "Visit the project website",
            download_resume: "Download Resume",
            language_switcher: "Sélecteur de langue",
          },
          download: "Download Resume",
          timeline: "Timeline: ",
          work_type: "Work Type: ",
          company: "Company: ",
          location: "Location: ",
          tech_stack: "Tech Stack: ",
          unsupported: "Your browser does not support the video tag.",
          cards: [
            {
              type: "job",
              company: "Contractor",
              title: "Full Stack Developer",
              location: "Okotoks, Alberta",
              timeline: "April 2024 - Present",
              work_type: "Remote",
              details:
                "Delivered solutions across projects, focusing on backend development with Golang, Node.js, and SQL. Integrated RESTful APIs and microservices for high performance and scalability. Gained advanced proficiency in Golang, enhancing application efficiency. Utilized Git, Docker, and CI/CD pipelines for streamlined deployment.",
              tech_stack:
                "Javascript, React Native, React, Typescript, HTML5/SCSS, MySQL, Golang, Node.JS, Git, Docker, Visual Studio",
            },
            {
              type: "project",
              title: "Virtual Resume",
              timeline: "2024",
              tech_stack: "GD Script",
              details:
                "This game, developed in Godot, serves as a creative way to showcase my resume. The walls of the castle display my professional experience, skills, and achievements, turning a simple resume into an immersive and interactive experience. I used GDScript to design smooth gameplay mechanics and dynamic visuals, emphasizing my skills in game development while creatively presenting my career journey.",
              preview: "./src/assets/previews/resume-preview.mp4",
              git_link: "https://github.com/AngelWiebe/virtual-resume",
            },
            {
              type: "project",
              title: "Google Map Example",
              timeline: "2024",
              tech_stack: "React, Typescript",
              details:
                "This site, developed with React and TypeScript, features a clean, modern interface designed for smooth user interactions. A Google search bar integrates with their API for real-time data fetching, and the mobile-first layout adapts seamlessly across devices.",
              preview: "./src/assets/previews/google-preview.mp4",
              git_link: "https://github.com/AngelWiebe/google-map-example",
            },
            {
              type: "job",
              company: "Emids Technologies ",
              title: "Senior Software Developer",
              location: "Gatineau, Quebec",
              timeline: "April 2022 - March 2024",
              work_type: "Remote",
              details:
                "Led project teams, managing tasks, and client interactions for successful project delivery. Developed deployment pipelines and utilized technologies including a custom language (Honey), NodeJS, React, and TypeScript. Implemented development tools such as Git, Azure DevOps, and Docker",
              tech_stack:
                "Javascript, React, Typescript, HTML5/SCSS, MongoDB, Honey, Git, Docker, Azure Dev Ops, Visual Studio",
            },
            {
              type: "project",

              title: "Godot Tutorial",
              timeline: "2019",
              tech_stack: "GD Script",
              details:
                "This project, developed in Godot, serves as a showcase of my game development skills. It highlights my ability to create a 2D game with smooth animations, responsive character controls, and dynamic mechanics. Using GDScript, I implemented complex interactions, collision detection, and level design, focusing on clean and efficient code.",
              preview: "./src/assets/previews/godot-preview.mp4",
              git_link: "https://github.com/AngelWiebe/godot-tutorial",
            },
            {
              type: "job",
              company: "Tactica Interactive",
              title: "Full Stack Developer",
              location: "Winnipeg, Manitoba",
              timeline: "October 2020 - March 2022",
              work_type: "Remote",
              details:
                "Spearheaded front-end development for custom app development on iOS and Android platforms using React Native and was responsible for deployments to both app stores. Contributed to back-end development with Ruby and utilized tools like Git, Android Studio, and Xcode",
              tech_stack:
                "Javascript, React Native, React, Accessibility, HTML5/SCSS, MySQL, Ruby, Git, Docker, Android Studio, XCode",
            },
            {
              type: "project",
              title: "Internal Billing System",
              timeline: "2018",
              tech_stack: "React, Laravel",
              details:
                "I developed a billing application for my department that integrates data from a third-party API and internal systems to generate monthly client invoices. The app includes an admin interface with statistics and past invoice histories, accessible on a client-by-client basis. This project was built independently to enhance my skills in React and Laravel.",
            },
            {
              type: "project",
              title: "G & R Logging",
              timeline: "2016",
              tech_stack: "Javascript, HTML, CSS",
              details:
                "I created this website during the first year of my career as a Christmas gift for my father's company. It was an opportunity to sharpen my CSS skills, focusing on responsive design and user interface elements while delivering a meaningful project for my family.",
              preview: "./src/assets/previews/gnr-preview.mp4",
              git_link: "https://github.com/AngelWiebe/gnr-logging",
              site: "https://AngelWiebe.github.io/gnr-logging/",
            },
            {
              type: "job",
              company: "Bold Commerce",
              title: "Full Stack Developer",
              location: "Winnipeg, Manitoba",
              timeline: "February 2016 - October 2020",
              work_type: "Hybrid",
              details:
                "Managed full-stack web app development and database management, specializing in E-Commerce platforms. Employed back-end technologies including SQL (including SQL programming) and PHP (Laravel), along with front-end technologies such as HTML5/CSS3, JavaScript, and React. Utilized Liquid templating language for Shopify platforms and development tools like Git and Docker",
              tech_stack:
                "Liquid, Javascript, JQuery, React, HTML5/CSS3, Angular, MySQL, PHP, Laravel, Git, Docker, Azure Dev Ops, PHP Storm",
            },
            {
              type: "project",
              title: "Movie Database",
              timeline: "2015",
              tech_stack: "C#, ASP.Net",
              details:
                "Developed a media database project during my studies to enhance my skills in ASP.NET and C# through practical, hands-on experience outside the classroom. The project features a full CRUD user interface, allowing for comprehensive management of media entries.",
              git_link: "https://github.com/AngelWiebe/movie-db",
            },
            {
              type: "job",
              company: "Varian Medical Systems",
              title: "Intern",
              location: "Winnipeg, Manitoba",
              timeline: "January 2016 - February 2016",
              work_type: "In Office",
              details:
                "Received training in software testing within a high-pressure medical environment",
            },
          ],
        },
      },
      fr: {
        translation: {
          description: {
            name: "Angel Wiebe",
            address: "Okotoks, Alberta",
            skill: [
              "React",
              "React Native",
              "Typescript",
              "Javascript",
              "SCSS",
              "NodeJS",
              "PHP",
              "Laravel",
              "MySQL",
              "MongoDB",
              "Jest",
              "Webpack",
              "Babel",
              "Git",
              "Docker",
              "Azure DevOps",
            ],
            bio: "Je suis Angel Wiebe, une développeuse de logiciels dévouée avec plus de 8 ans d'expérience, spécialisé dans les technologies front-end tout en continuant à développer mes compétences en back-end. Je possède un diplôme en développement de logiciels et de bases de données de Robertson Career College, où j'ai obtenue mon diplôme avec excellence académique. Mon ensemble de compétences techniques comprend JavaScript, React, TypeScript, React Native, Node.js, Angular, PHP, Laravel, MongoDB, MySQL, Git, Docker et Azure DevOps, parmi d'autres. Je suis passionnée par la création de solutions innovantes et la livraison d'un code de haute qualité, désireuse de contribuer mon expertise à des projets passionnants.",
          },
          aria: {
            github_link: "Visitez mon profil GitHub",
            linkedin_link: "Visitez mon profil LinkedIn",
            email_link: "Envoyez-moi un email",
            preview_video: "Regardez la vidéo de prévisualisation du projet",
            website_link: "Visitez le site Web du projet",
            download_resume: "Télécharger le CV",
            language_switcher: "Language Switcher",
          },
          download: "Télécharger le CV",
          timeline: "Chronologie: ",
          work_type: "Type de travail: ",
          company: "Entreprise: ",
          location: "Location: ",
          tech_stack: "Pile Technologique: ",
          unsupported:
            "Votre navigateur ne prend pas en charge la balise vidéo.",
          cards: [
            {
              type: "job",
              company: "Contractuel",
              title: "Développeur Full Stack",
              location: "Okotoks, Alberta",
              timeline: "Avril 2024 - Présent",
              work_type: "À distance",
              details:
                "A livré des solutions à travers des projets, se concentrant sur le développement back-end avec Golang, Node.js et SQL. Intégration d'API RESTful et de microservices pour des performances et une évolutivité élevées. A acquis une maîtrise avancée de Golang, améliorant l'efficacité des applications. Utilisation de Git, Docker, et des pipelines CI/CD pour un déploiement rationalisé.",
              tech_stack:
                "Javascript, React Native, React, Typescript, HTML5/SCSS, MySQL, Golang, Node.JS, Git, Docker, Visual Studio",
            },
            {
              type: "project",
              title: "CV Virtuel",
              timeline: "2024",
              tech_stack: "GD Script",
              details:
                "Ce jeu, développé dans Godot, offre un moyen créatif de présenter mon CV. Les murs du château affichent mon expérience professionnelle, mes compétences et mes réalisations, transformant un simple CV en une expérience immersive et interactive. J'ai utilisé GDScript pour concevoir des mécaniques de jeu fluides, des transitions de niveau sans faille et des visuels dynamiques, mettant en avant mes compétences en développement tout en présentant de manière créative mon parcours professionnel.",
              preview: "./src/assets/previews/resume-preview.mp4",
              git_link: "https://github.com/AngelWiebe/virtual-resume",
            },
            {
              type: "project",
              title: "Exemple de Google Map",
              timeline: "2024",
              tech_stack: "React, Typescript",
              details:
                "Ce site, développé avec React et TypeScript, présente une interface moderne et épurée, conçue pour des interactions utilisateur fluides. Une barre de recherche Google est intégrée à leur API pour la récupération de données en temps réel, et la mise en page mobile-first s'adapte parfaitement aux différents appareils.",
              preview: "./src/assets/previews/google-preview.mp4",
              git_link: "https://github.com/AngelWiebe/google-map-example",
            },
            {
              type: "job",
              company: "Emids Technologies",
              title: "Développeur Senior en Logiciel",
              location: "Gatineau, Québec",
              timeline: "Avril 2022 - Mars 2024",
              work_type: "À distance",
              details:
                "A dirigé des équipes de projet, gérant les tâches et les interactions avec les clients pour une livraison réussie des projets. A développé des pipelines de déploiement et utilisé des technologies incluant un langage personnalisé (Honey), NodeJS, React, et TypeScript. A mis en œuvre des outils de développement comme Git, Azure DevOps, et Docker",
              tech_stack:
                "Javascript, React, Typescript, HTML5/SCSS, MongoDB, Honey, Git, Docker, Azure Dev Ops, Visual Studio",
            },
            {
              type: "project",
              title: "Tutoriel Godot",
              timeline: "2019",
              tech_stack: "GD Script",
              details:
                "Ce projet, développé avec Godot, sert de vitrine pour mes compétences en développement de jeux. Il met en avant ma capacité à créer un jeu 2D avec des animations fluides, des contrôles de personnage réactifs et des mécaniques dynamiques. En utilisant GDScript, j'ai implémenté des interactions complexes, la détection de collisions et la conception de niveaux, en mettant l'accent sur un code propre et efficace.",
              preview: "./src/assets/previews/godot-preview.mp4",
              git_link: "https://github.com/AngelWiebe/godot-tutorial",
            },
            {
              type: "job",
              company: "Tactica Interactive",
              title: "Développeur Full Stack",
              location: "Winnipeg, Manitoba",
              timeline: "Octobre 2020 - Mars 2022",
              work_type: "À distance",
              details:
                "A dirigé le développement front-end pour le développement d'applications personnalisées sur les plateformes iOS et Android en utilisant React Native et a été responsable des déploiements sur les deux magasins d'applications. A contribué au développement back-end avec Ruby et a utilisé des outils comme Git, Android Studio, et Xcode",
              tech_stack:
                "Javascript, React Native, React, HTML5/SCSS, Accessibilité, MySQL, Ruby, Git, Docker, Android Studio, XCode",
            },
            {
              type: "project",
              title: "Système de facturation",
              timeline: "2018",
              tech_stack: "React, Laravel",
              details:
                "J'ai développé une application de facturation pour mon département qui intègre des données provenant d'une API tierce et de systèmes internes pour générer des factures mensuelles pour les clients. L'application comprend une interface administrateur avec des statistiques et des historiques de factures passées, accessibles client par client. Ce projet a été réalisé de manière autonome pour améliorer mes compétences en React et Laravel.",
            },
            {
              type: "project",
              title: "G & R Logging",
              timeline: "2016",
              tech_stack: "HTML, CSS, Javascript",
              details:
                "J'ai créé ce site web pendant la première année de ma carrière comme cadeau de Noël pour l'entreprise de mon père. C'était une occasion de perfectionner mes compétences en CSS, en me concentrant sur la conception réactive et les éléments de l'interface utilisateur tout en réalisant un projet significatif pour ma famille.",
              preview: "./src/assets/previews/gnr-preview.mp4",
              git_link: "https://github.com/AngelWiebe/gnr-logging",
              site: "https://AngelWiebe.github.io/gnr-logging/",
            },
            {
              type: "job",
              company: "Bold Commerce",
              title: "Développeur Full Stack",
              location: "Winnipeg, Manitoba",
              timeline: "Février 2016 - Octobre 2020",
              work_type: "Hybride",
              details:
                "A géré le développement complet d'applications web et la gestion de bases de données, en se spécialisant dans les plateformes de commerce électronique. A utilisé des technologies back-end incluant SQL (y compris la programmation SQL) et PHP (Laravel), ainsi que des technologies front-end telles que HTML5/CSS3, JavaScript, et React. A utilisé le langage de template Liquid pour les plateformes Shopify et des outils de développement comme Git et Docker",
              tech_stack:
                "Liquid, Javascript, JQuery, React, HTML5/CSS3, Angular, MySQL, PHP, Laravel, Git, Docker, Azure Dev Ops, PHP Storm",
            },
            {
              type: "project",
              title: "Base de Données de Films",
              timeline: "2015",
              tech_stack: "C#, ASP.Net",
              details:
                "Développé un projet de base de données média pendant mes études pour améliorer mes compétences en ASP.NET et C# grâce à une expérience pratique en dehors de la classe. Le projet comprend une interface utilisateur complète CRUD, permettant une gestion complète des entrées médias.",
              git_link: "https://github.com/AngelWiebe/movie-db",
            },
            {
              type: "job",
              company: "Varian Medical Systems",
              title: "Stagiaire",
              location: "Winnipeg, Manitoba",
              timeline: "Janvier 2016 - Février 2016",
              work_type: "Au bureau",
              details:
                "A reçu une formation en test de logiciels dans un environnement médical sous haute pression",
            },
          ],
        },
      },
    },
  });

export default i18n;
