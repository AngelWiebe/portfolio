import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import googlePreview from "./assets/previews/google-preview.mp4";
import godotPreview from "./assets/previews/godot-preview.mp4";
import gnrPreview from "./assets/previews/gnr-preview.mp4";
import resumePreview from "./assets/previews/resume-preview.mp4";
import charmedStill from "./assets/project-stills/charmed-code.jpg";
import wildBalanceStill from "./assets/project-stills/wildbalance.jpg";

const projectLinks = {
  wildBalance: { git_link: "https://github.com/AngelWiebe/wildbalance" },
  trueDepth: {
    git_link: "https://github.com/AngelWiebe/true-depth-capital",
    site: "https://angelwiebe.github.io/true-depth-capital/",
  },
  charmedCode: {
    git_link: "https://github.com/AngelWiebe/charmed-code",
    site: "https://angelwiebe.github.io/charmed-code/",
  },
  dlr: {
    git_link: "https://github.com/AngelWiebe/dlr-consulting",
    site: "https://dlrconsulting.ca/",
  },
};

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
          portfolio: {
            navigation: "Main navigation",
            skip: "Skip to main content",
            nav_work: "Work",
            role: "Full-stack software developer",
            intro: "I build web and mobile applications, from accessible React interfaces to the APIs and databases behind them.",
            view_work: "View my work",
            get_in_touch: "Get in touch",
            about: "More about me",
            toolkit: "What I work with",
            frontend: "Front end",
            backend: "Back end",
            mobile: "Mobile",
            delivery: "Testing and delivery",
            selected_work: "Selected work",
            work_intro: "Projects in web development and games.",
            more_projects: "More projects",
            open_project: "View project",
            experience_intro: "Full-stack, mobile, and technical leadership roles.",
            contact: "Contact",
            contact_heading: "Let’s talk.",
            email_me: "Email me",
            stack: "Tech stack",
          },
          description: {
            name: "Angel Wiebe",
            address: "Okotoks, Alberta",
            bio: "I am Angel Wiebe, a dedicated software developer with over 9 years of experience, specializing in front-end technologies while continuously expanding my skills in back-end development. I hold a diploma in Software & Database Development from Robertson Career College, where I graduated with academic excellence. My tech stack includes JavaScript, React, TypeScript, React Native, Node.js, Angular, PHP, Laravel, MongoDB, MySQL, Git, Docker, and Azure DevOps, among others. I am passionate about creating innovative solutions and delivering high-quality code, eager to contribute my expertise to exciting projects.",
          },
          aria: {
            github_link: "View project source on GitHub",
            linkedin_link: "Visit my LinkedIn profile",
            email_link: "Send me an email",
            preview_video: "Watch the project preview video",
            website_link: "Visit the project website",
            download_resume: "Download Resume",
            language_switcher: "Language switcher",
            switch_english: "EN — English",
            switch_french: "FR — French",
          },
          experience: "Experience",
          video_description: "Video description:",
          close_project: "Close",
          back_to_project: "Back to project",
          download: "Download Resume",
          timeline: "Timeline: ",
          work_type: "Work Type: ",
          company: "Company: ",
          location: "Location: ",
          technical_environment: "Technical Environment: ",
          tech_stack: "Tech Stack: ",
          unsupported: "Your browser does not support the video tag.",
          cards: [
            {
              type: "project",
              title: "WildBalance",
              featured_image: wildBalanceStill,
              timeline: "2026",
              tech_stack: "Godot, GDScript, Go, WebSockets (Gorilla)",
              details:
                "A 3D forest stewardship game in Godot with a Go simulation over WebSockets. Manage deer, wolves, and meadow health through four seasons.",
              ...projectLinks.wildBalance,
            },
            {
              type: "project",
              title: "True Depth Capital",
              timeline: "2026",
              tech_stack: "HTML, CSS, JavaScript, Vite, Formspree, Vitest, GitHub Pages",
              details:
                "A site for Canadian vehicle sourcing that lets licensed U.S. dealers submit wholesale inquiries.",
              ...projectLinks.trueDepth,
            },
            {
              type: "project",
              title: "Charmed Code",
              featured_image: charmedStill,
              timeline: "2026",
              tech_stack: "React, JavaScript, CSS, Vite, GSAP, Formspree, Playwright, GitHub Pages",
              details:
                "A marketing site for an Alberta web design and development studio, with featured work and a project inquiry form.",
              ...projectLinks.charmedCode,
            },
            {
              type: "project",
              title: "DLR Consulting Ltd.",
              timeline: "2026",
              tech_stack: "React, TypeScript, CSS, Vite, i18next, Lucide, GitHub Pages",
              details:
                "A bilingual site for a negotiation and representation practice, covering services, professional coverage, payment terms, and contact information.",
              ...projectLinks.dlr,
            },
            {
              type: "job",
              company: "Contractor",
              resume: {
                title: "Full-Stack Developer (Independent Contractor)",
                company: "2734539 Alberta Ltd.",
                location: "Remote, Alberta",
                timeline: "April 2024 – Present",
                technicalEnvironment: "React Native, Expo, React, TypeScript, Node.js, Express, GraphQL, SignalR, REST APIs, React Query, PHP, Docker, Git, Cursor",
                sections: [
                  {
                    heading: "Client: Topstep | Full-Stack / React Native Developer | Remote",
                    bullets: [
                      "Improved real-time chart responsiveness by separating streaming market data from server state, managing timeframe changes and overlays, and limiting unnecessary React Native updates.",
                      "Developed an event-driven alerting service for price thresholds, trade executions and position changes, including end-to-end price alert creation.",
                      "Built and integrated Node.js/TypeScript backend endpoints and mobile workflows using GraphQL and SignalR for trading data and application functionality."
                    ],
                    intro: "Developed mobile trading features for an upcoming React Native (Expo) application and Node.js/TypeScript backend."
                  },
                  {
                    heading: "Client: Intuit / Mailchimp | Full-Stack Developer | Remote",
                    bullets: [
                      "Integrated a Zendesk support widget into the Mailchimp Shopify homepage and plan-selection experience using React, TypeScript and PHP, accounting for feature flags and multiple initialization contexts.",
                      "Used Cursor for codebase analysis, scaffolding, refactoring, debugging, testing and security reviews while retaining ownership of implementation decisions."
                    ]
                  }
                ]
              },
              title: "Full Stack Developer",
              location: "Okotoks, Alberta",
              timeline: "April 2024 - Present",
              work_type: "Remote",
              details:
                "Delivered solutions across projects, focusing on backend development with Golang, Node.js, and SQL. Integrated RESTful APIs and microservices for high performance and scalability. Gained advanced proficiency in Golang, enhancing application efficiency. Utilized Git, Docker, and CI/CD pipelines for streamlined deployment.",
            },
            {
              type: "project",
              title: "Virtual Resume",
              summary: "An interactive résumé built in Godot. Explore a 3D castle to discover my work history and skills.",
              timeline: "2024",
              tech_stack: "Godot, GDScript",
              details:
                "This game, developed in Godot, serves as a creative way to showcase my resume. The walls of the castle display my professional experience, skills, and achievements, turning a simple resume into an immersive and interactive experience. I used GDScript to design smooth gameplay mechanics and dynamic visuals, emphasizing my skills in game development while creatively presenting my career journey.",
              preview: resumePreview,
              preview_description:
                "The opening screen explains how to move, jump, attack, and control the camera. The player explores the castle grounds in third person, passing trees, stone walls, and career information displayed on the walls. The objective is to defeat ghosts and collect 14 golden skills. The counter advances from 0 to 1, and the clip returns to the controls screen.",
              git_link: "https://github.com/AngelWiebe/virtual-resume",
            },
            {
              type: "project",
              title: "Google Map Example",
              summary: "A searchable therapist directory with map pins, location filters, and results that update together.",
              timeline: "2024",
              tech_stack: "React, TypeScript, Vite, Material UI, Google Maps APIs, Papa Parse, Jest",
              details:
                "This site, developed with React and TypeScript, features a clean, modern interface designed for smooth user interactions. A Google search bar integrates with their API for real-time data fetching, and the mobile-first layout adapts seamlessly across devices.",
              preview: googlePreview,
              preview_description:
                "A therapist directory shows search and filters on the left, a Google map with red pins in the center, and therapist cards on the right. Typing in the search box moves the map and updates the list. Selecting filters narrows the pins around Calgary and changes which cards appear.",
              git_link: "https://github.com/AngelWiebe/google-map-example",
            },
            {
              type: "job",
              company: "Emids Technologies ",
              resume: {
                title: "Senior Developer",
                company: "Emids Technologies",
                location: "Gatineau, Quebec",
                timeline: "April 2022 – March 2024",
                technicalEnvironment: "React, TypeScript, Node.js, MongoDB, SCSS, Git, Azure DevOps, Docker",
                sections: [
                  {
                    bullets: [
                      "Led client-facing project meetings, coordinated delivery and mentored junior developers.",
                      "Developed healthcare-focused software using React, TypeScript, Node.js and MongoDB.",
                      "Collaborated using Azure DevOps, Git, Docker and team development workflows."
                    ]
                  }
                ]
              },
              title: "Senior Software Developer",
              location: "Gatineau, Quebec",
              timeline: "April 2022 - March 2024",
              work_type: "Remote",
              details:
                "Led project teams, managing tasks, and client interactions for successful project delivery. Developed deployment pipelines and utilized technologies including a custom language (Honey), NodeJS, React, and TypeScript. Implemented development tools such as Git, Azure DevOps, and Docker",
            },
            {
              type: "project",

              title: "Godot Tutorial",
              timeline: "2019",
              tech_stack: "Godot, GDScript",
              details:
                "This project, developed in Godot, serves as a showcase of my game development skills. It highlights my ability to create a 2D game with smooth animations, responsive character controls, and dynamic mechanics. Using GDScript, I implemented complex interactions, collision detection, and level design, focusing on clean and efficient code.",
              preview: godotPreview,
              preview_description:
                "The game opens on a teal screen titled Dodge the Creeps! After Start and a Get Ready message, a pale character moves to dodge dark enemies with red centers entering from the edges. The score rises as the character survives. The round ends with Game Over and a score of 5.",
              git_link: "https://github.com/AngelWiebe/godot-tutorial",
            },
            {
              type: "job",
              company: "Tactica Interactive",
              resume: {
                title: "Full-Stack Developer",
                company: "Tactica Interactive",
                location: "Winnipeg, Manitoba",
                timeline: "October 2020 – March 2022",
                technicalEnvironment: "React Native, Ruby, SCSS, Git, Android Studio, Xcode, iOS, Android",
                sections: [
                  {
                    bullets: [
                      "Built accessible React Native applications for iOS and Android and supported app-store deployment."
                    ]
                  }
                ]
              },
              title: "Full Stack Developer",
              location: "Winnipeg, Manitoba",
              timeline: "October 2020 - March 2022",
              work_type: "Remote",
              details:
                "Spearheaded front-end development for custom app development on iOS and Android platforms using React Native and was responsible for deployments to both app stores. Contributed to back-end development with Ruby and utilized tools like Git, Android Studio, and Xcode",
            },
            {
              type: "project",
              title: "Internal Billing System",
              resume: { sections: [{ bullets: ["Built an internal invoicing application that replaced manual billing work and saved managers several hours each per month."] }] },
              timeline: "2018",
              tech_stack: "React, Laravel",
              details:
                "I developed a billing application for my department that integrates data from a third-party API and internal systems to generate monthly client invoices. The app includes an admin interface with statistics and past invoice histories, accessible on a client-by-client basis. This project was built independently to enhance my skills in React and Laravel.",
            },
            {
              type: "project",
              title: "G & R Logging",
              timeline: "2016",
              tech_stack: "HTML, CSS, JavaScript, jQuery, Bootstrap, Modernizr, Slideout, GitHub Pages",
              details:
                "I created this website during the first year of my career as a Christmas gift for my father's company. It was an opportunity to sharpen my CSS skills, focusing on responsive design and user interface elements while delivering a meaningful project for my family.",
              preview: gnrPreview,
              preview_description:
                "The G & R Logging homepage has a birch forest background, a section menu on the left, and a slideshow of logging equipment and trucks. The demo moves down to the testimonials and contact forms, then uses the browser’s responsive preview to show how the site fits on a narrow mobile screen.",
              git_link: "https://github.com/AngelWiebe/gnr-logging",
              site: "https://AngelWiebe.github.io/gnr-logging/",
            },
            {
              type: "job",
              company: "Bold Commerce",
              resume: {
                title: "Full-Stack Developer",
                company: "Bold Commerce",
                location: "Winnipeg, Manitoba",
                timeline: "February 2016 – October 2020",
                technicalEnvironment: "React, Angular, PHP, Laravel, JavaScript, SQL, Liquid, Shopify, Git, Docker",
                sections: [
                  {
                    bullets: [
                      "Developed full-stack e-commerce features and integrations using React, PHP, Laravel, JavaScript and SQL.",
                      "Integrated Staples with a third-party fulfillment provider, supporting the flow of order and fulfillment information between systems.",
                      "Implemented CSS customizations for Staples' Shopify checkout experience, working within a checkout implementation owned by a separate payments team.",
                      "Built an internal invoicing application that replaced manual billing work and saved managers several hours each per month.",
                      "Collaborated directly with clients on selected projects and contributed to application and database development."
                    ]
                  }
                ]
              },
              title: "Full Stack Developer",
              location: "Winnipeg, Manitoba",
              timeline: "February 2016 - October 2020",
              work_type: "Hybrid",
              details:
                "Managed full-stack web app development and database management, specializing in E-Commerce platforms. Employed back-end technologies including SQL (including SQL programming) and PHP (Laravel), along with front-end technologies such as HTML5/CSS3, JavaScript, and React. Utilized Liquid templating language for Shopify platforms and development tools like Git and Docker",
            },
            {
              type: "project",
              title: "Movie Database",
              timeline: "2015",
              tech_stack: "C#, ASP.NET, ADO.NET, SQL Server",
              details:
                "Developed a media database project during my studies to enhance my skills in ASP.NET and C# through practical, hands-on experience outside the classroom. The project features a full CRUD user interface, allowing for comprehensive management of media entries.",
              git_link: "https://github.com/AngelWiebe/movie-db",
            },
            {
              type: "job",
              company: "Varian Medical Systems",
              resume: {
                title: "Software Testing Intern",
                company: "Varian Medical Systems",
                location: "Winnipeg, Manitoba",
                timeline: "January 2016 – February 2016",
                sections: [
                  {
                    bullets: [
                      "Trained in software testing in a medical technology environment."
                    ]
                  }
                ]
              },
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
          portfolio: {
            navigation: "Navigation principale",
            skip: "Aller au contenu principal",
            nav_work: "Projets",
            role: "Développeuse full-stack",
            intro: "Je développe des applications web et mobiles, des interfaces React accessibles aux API et aux bases de données qui les alimentent.",
            view_work: "Voir mes projets",
            get_in_touch: "Me contacter",
            about: "En savoir plus sur moi",
            toolkit: "Mes outils",
            frontend: "Front-end",
            backend: "Back-end",
            mobile: "Mobile",
            delivery: "Tests et déploiement",
            selected_work: "Projets en vedette",
            work_intro: "Projets de développement web et de jeux.",
            more_projects: "Autres projets",
            open_project: "Voir le projet",
            experience_intro: "Développement full-stack et mobile, et leadership technique.",
            contact: "Contact",
            contact_heading: "Parlons ensemble.",
            email_me: "M’écrire",
            stack: "Technologies",
          },
          description: {
            name: "Angel Wiebe",
            address: "Okotoks, Alberta",
            bio: "Je suis Angel Wiebe, une développeuse de logiciels dévouée avec plus de 9 ans d'expérience, spécialisé dans les technologies front-end tout en continuant à développer mes compétences en back-end. Je possède un diplôme en développement de logiciels et de bases de données de Robertson Career College, où j'ai obtenue mon diplôme avec excellence académique. Mon ensemble de compétences techniques comprend JavaScript, React, TypeScript, React Native, Node.js, Angular, PHP, Laravel, MongoDB, MySQL, Git, Docker et Azure DevOps, parmi d'autres. Je suis passionnée par la création de solutions innovantes et la livraison d'un code de haute qualité, désireuse de contribuer mon expertise à des projets passionnants.",
          },
          aria: {
            github_link: "Voir le code source du projet sur GitHub",
            linkedin_link: "Visitez mon profil LinkedIn",
            email_link: "Envoyez-moi un email",
            preview_video: "Regardez la vidéo de prévisualisation du projet",
            website_link: "Visitez le site Web du projet",
            download_resume: "Télécharger le CV",
            language_switcher: "Sélecteur de langue",
            switch_english: "EN — Anglais",
            switch_french: "FR — Français",
          },
          experience: "Expérience",
          video_description: "Description de la vidéo :",
          close_project: "Fermer",
          back_to_project: "Retour au projet",
          download: "Télécharger le CV",
          timeline: "Chronologie: ",
          work_type: "Type de travail: ",
          company: "Entreprise: ",
          location: "Location: ",
          technical_environment: "Environnement technique : ",
          tech_stack: "Pile Technologique: ",
          unsupported:
            "Votre navigateur ne prend pas en charge la balise vidéo.",
          cards: [
            {
              type: "project",
              title: "WildBalance",
              featured_image: wildBalanceStill,
              timeline: "2026",
              tech_stack: "Godot, GDScript, Go, WebSockets (Gorilla)",
              details:
                "Un jeu de gestion forestière en 3D créé avec Godot, qui communique par WebSocket avec une simulation en Go. Gérez les cerfs, les loups et la santé des prairies au fil des quatre saisons.",
              ...projectLinks.wildBalance,
            },
            {
              type: "project",
              title: "True Depth Capital",
              timeline: "2026",
              tech_stack: "HTML, CSS, JavaScript, Vite, Formspree, Vitest, GitHub Pages",
              details:
                "Site d’approvisionnement en véhicules canadiens qui permet aux concessionnaires américains agréés de soumettre des demandes d’achat en gros.",
              ...projectLinks.trueDepth,
            },
            {
              type: "project",
              title: "Charmed Code",
              featured_image: charmedStill,
              timeline: "2026",
              tech_stack: "React, JavaScript, CSS, Vite, GSAP, Formspree, Playwright, GitHub Pages",
              details:
                "Site vitrine d’un studio albertain de conception et de développement web, avec des projets en vedette et un formulaire de demande.",
              ...projectLinks.charmedCode,
            },
            {
              type: "project",
              title: "DLR Consulting Ltd.",
              timeline: "2026",
              tech_stack: "React, TypeScript, CSS, Vite, i18next, Lucide, GitHub Pages",
              details:
                "Site bilingue d’un cabinet de négociation et de représentation qui présente ses services, sa couverture professionnelle, ses modalités de paiement et ses coordonnées.",
              ...projectLinks.dlr,
            },
            {
              type: "job",
              company: "Contractuel",
              resume: {
                title: "Développeuse full stack (travailleuse autonome)",
                company: "2734539 Alberta Ltd.",
                location: "Télétravail, Alberta",
                timeline: "Avril 2024 – aujourd’hui",
                technicalEnvironment: "React Native, Expo, React, TypeScript, Node.js, Express, GraphQL, SignalR, REST APIs, React Query, PHP, Docker, Git, Cursor",
                sections: [
                  {
                    heading: "Client : Topstep | Développeuse full stack / React Native | Télétravail",
                    bullets: [
                      "Amélioration de la réactivité des graphiques en temps réel en séparant les flux de données de marché de l’état du serveur, en gérant les changements de périodes et les superpositions, et en limitant les mises à jour React Native inutiles.",
                      "Développement d’un service d’alertes événementielles pour les seuils de prix, les exécutions d’ordres et les changements de positions, y compris la création complète d’alertes de prix.",
                      "Création et intégration de points de terminaison back-end Node.js/TypeScript et de parcours mobiles utilisant GraphQL et SignalR pour les données de négociation et les fonctionnalités de l’application."
                    ],
                    intro: "Développement de fonctionnalités de négociation mobile pour une application React Native (Expo) à venir et son système back-end Node.js/TypeScript."
                  },
                  {
                    heading: "Client : Intuit / Mailchimp | Développeuse full stack | Télétravail",
                    bullets: [
                      "Intégration d’un module d’assistance Zendesk à la page d’accueil Shopify de Mailchimp et au parcours de sélection des forfaits avec React, TypeScript et PHP, en tenant compte des indicateurs de fonctionnalités et des différents contextes d’initialisation.",
                      "Utilisation de Cursor pour l’analyse du code, la génération de structures, la refactorisation, le débogage, les tests et les vérifications de sécurité, tout en conservant la responsabilité des décisions techniques."
                    ]
                  }
                ]
              },
              title: "Développeur Full Stack",
              location: "Okotoks, Alberta",
              timeline: "Avril 2024 - Présent",
              work_type: "À distance",
              details:
                "A livré des solutions à travers des projets, se concentrant sur le développement back-end avec Golang, Node.js et SQL. Intégration d'API RESTful et de microservices pour des performances et une évolutivité élevées. A acquis une maîtrise avancée de Golang, améliorant l'efficacité des applications. Utilisation de Git, Docker, et des pipelines CI/CD pour un déploiement rationalisé.",
            },
            {
              type: "project",
              title: "CV Virtuel",
              summary: "Un CV interactif réalisé avec Godot. Explorez un château en 3D pour découvrir mon parcours et mes compétences.",
              timeline: "2024",
              tech_stack: "Godot, GDScript",
              details:
                "Ce jeu, développé dans Godot, offre un moyen créatif de présenter mon CV. Les murs du château affichent mon expérience professionnelle, mes compétences et mes réalisations, transformant un simple CV en une expérience immersive et interactive. J'ai utilisé GDScript pour concevoir des mécaniques de jeu fluides, des transitions de niveau sans faille et des visuels dynamiques, mettant en avant mes compétences en développement tout en présentant de manière créative mon parcours professionnel.",
              preview: resumePreview,
              preview_description:
                "L’écran d’accueil explique comment se déplacer, sauter, attaquer et orienter la caméra. Le personnage explore les alentours du château à la troisième personne, entre les arbres et les murs de pierre qui présentent le parcours professionnel. Le but est de vaincre les fantômes et de réunir 14 compétences dorées. Le compteur passe de 0 à 1, puis la vidéo revient à l’écran des commandes.",
              git_link: "https://github.com/AngelWiebe/virtual-resume",
            },
            {
              type: "project",
              title: "Exemple de Google Map",
              summary: "Un répertoire de thérapeutes avec des repères sur la carte, des filtres géographiques et des résultats synchronisés.",
              timeline: "2024",
              tech_stack: "React, TypeScript, Vite, Material UI, Google Maps APIs, Papa Parse, Jest",
              details:
                "Ce site, développé avec React et TypeScript, présente une interface moderne et épurée, conçue pour des interactions utilisateur fluides. Une barre de recherche Google est intégrée à leur API pour la récupération de données en temps réel, et la mise en page mobile-first s'adapte parfaitement aux différents appareils.",
              preview: googlePreview,
              preview_description:
                "Un répertoire de thérapeutes affiche la recherche et les filtres à gauche, une carte Google avec des repères rouges au centre et les fiches des thérapeutes à droite. La saisie dans le champ de recherche déplace la carte et actualise la liste. Les filtres réduisent le nombre de repères autour de Calgary et modifient les fiches affichées.",
              git_link: "https://github.com/AngelWiebe/google-map-example",
            },
            {
              type: "job",
              company: "Emids Technologies",
              resume: {
                title: "Développeuse senior",
                company: "Emids Technologies",
                location: "Gatineau, Québec",
                timeline: "Avril 2022 – mars 2024",
                technicalEnvironment: "React, TypeScript, Node.js, MongoDB, SCSS, Git, Azure DevOps, Docker",
                sections: [
                  {
                    bullets: [
                      "Animation de réunions de projet avec les clients, coordination des livraisons et mentorat de développeurs juniors.",
                      "Développement de logiciels dans le domaine de la santé avec React, TypeScript, Node.js et MongoDB.",
                      "Collaboration au moyen d’Azure DevOps, Git, Docker et de processus de développement en équipe."
                    ]
                  }
                ]
              },
              title: "Développeur Senior en Logiciel",
              location: "Gatineau, Québec",
              timeline: "Avril 2022 - Mars 2024",
              work_type: "À distance",
              details:
                "A dirigé des équipes de projet, gérant les tâches et les interactions avec les clients pour une livraison réussie des projets. A développé des pipelines de déploiement et utilisé des technologies incluant un langage personnalisé (Honey), NodeJS, React, et TypeScript. A mis en œuvre des outils de développement comme Git, Azure DevOps, et Docker",
            },
            {
              type: "project",
              title: "Tutoriel Godot",
              timeline: "2019",
              tech_stack: "Godot, GDScript",
              details:
                "Ce projet, développé avec Godot, sert de vitrine pour mes compétences en développement de jeux. Il met en avant ma capacité à créer un jeu 2D avec des animations fluides, des contrôles de personnage réactifs et des mécaniques dynamiques. En utilisant GDScript, j'ai implémenté des interactions complexes, la détection de collisions et la conception de niveaux, en mettant l'accent sur un code propre et efficace.",
              preview: godotPreview,
              preview_description:
                "Le jeu s’ouvre sur un écran bleu-vert intitulé Dodge the Creeps! Après le bouton Start et le message de préparation, un personnage clair se déplace pour éviter des ennemis sombres au centre rouge qui surgissent des bords. Le score augmente tant que le personnage survit. La partie se termine sur Game Over avec un score de 5.",
              git_link: "https://github.com/AngelWiebe/godot-tutorial",
            },
            {
              type: "job",
              company: "Tactica Interactive",
              resume: {
                title: "Développeuse full stack",
                company: "Tactica Interactive",
                location: "Winnipeg, Manitoba",
                timeline: "Octobre 2020 – mars 2022",
                technicalEnvironment: "React Native, Ruby, SCSS, Git, Android Studio, Xcode, iOS, Android",
                sections: [
                  {
                    bullets: [
                      "Création d’applications React Native accessibles pour iOS et Android et participation à leur déploiement dans les boutiques d’applications."
                    ]
                  }
                ]
              },
              title: "Développeur Full Stack",
              location: "Winnipeg, Manitoba",
              timeline: "Octobre 2020 - Mars 2022",
              work_type: "À distance",
              details:
                "A dirigé le développement front-end pour le développement d'applications personnalisées sur les plateformes iOS et Android en utilisant React Native et a été responsable des déploiements sur les deux magasins d'applications. A contribué au développement back-end avec Ruby et a utilisé des outils comme Git, Android Studio, et Xcode",
            },
            {
              type: "project",
              title: "Système de facturation",
              resume: { sections: [{ bullets: ["Création d’une application interne de facturation remplaçant un processus manuel et permettant à chaque gestionnaire d’économiser plusieurs heures par mois."] }] },
              timeline: "2018",
              tech_stack: "React, Laravel",
              details:
                "J'ai développé une application de facturation pour mon département qui intègre des données provenant d'une API tierce et de systèmes internes pour générer des factures mensuelles pour les clients. L'application comprend une interface administrateur avec des statistiques et des historiques de factures passées, accessibles client par client. Ce projet a été réalisé de manière autonome pour améliorer mes compétences en React et Laravel.",
            },
            {
              type: "project",
              title: "G & R Logging",
              timeline: "2016",
              tech_stack: "HTML, CSS, JavaScript, jQuery, Bootstrap, Modernizr, Slideout, GitHub Pages",
              details:
                "J'ai créé ce site web pendant la première année de ma carrière comme cadeau de Noël pour l'entreprise de mon père. C'était une occasion de perfectionner mes compétences en CSS, en me concentrant sur la conception réactive et les éléments de l'interface utilisateur tout en réalisant un projet significatif pour ma famille.",
              preview: gnrPreview,
              preview_description:
                "La page d’accueil de G & R Logging présente un fond de forêt de bouleaux, un menu à gauche et un diaporama de camions et de machines forestières. La vidéo montre ensuite les témoignages et les formulaires de contact, puis utilise le mode adaptatif du navigateur pour montrer le site sur un écran mobile étroit.",
              git_link: "https://github.com/AngelWiebe/gnr-logging",
              site: "https://AngelWiebe.github.io/gnr-logging/",
            },
            {
              type: "job",
              company: "Bold Commerce",
              resume: {
                title: "Développeuse full stack",
                company: "Bold Commerce",
                location: "Winnipeg, Manitoba",
                timeline: "Février 2016 – octobre 2020",
                technicalEnvironment: "React, Angular, PHP, Laravel, JavaScript, SQL, Liquid, Shopify, Git, Docker",
                sections: [
                  {
                    bullets: [
                      "Développement de fonctionnalités et d’intégrations de commerce électronique full stack avec React, PHP, Laravel, JavaScript et SQL.",
                      "Intégration de Staples à un fournisseur externe de traitement des commandes, assurant l’échange des données de commandes et d’expédition entre les systèmes.",
                      "Personnalisation CSS du parcours de paiement Shopify de Staples, en collaboration avec une équipe distincte responsable de l’implémentation des paiements.",
                      "Création d’une application interne de facturation remplaçant un processus manuel et permettant à chaque gestionnaire d’économiser plusieurs heures par mois.",
                      "Collaboration directe avec les clients sur certains projets et contribution au développement d’applications et de bases de données."
                    ]
                  }
                ]
              },
              title: "Développeur Full Stack",
              location: "Winnipeg, Manitoba",
              timeline: "Février 2016 - Octobre 2020",
              work_type: "Hybride",
              details:
                "A géré le développement complet d'applications web et la gestion de bases de données, en se spécialisant dans les plateformes de commerce électronique. A utilisé des technologies back-end incluant SQL (y compris la programmation SQL) et PHP (Laravel), ainsi que des technologies front-end telles que HTML5/CSS3, JavaScript, et React. A utilisé le langage de template Liquid pour les plateformes Shopify et des outils de développement comme Git et Docker",
            },
            {
              type: "project",
              title: "Base de Données de Films",
              timeline: "2015",
              tech_stack: "C#, ASP.NET, ADO.NET, SQL Server",
              details:
                "Développé un projet de base de données média pendant mes études pour améliorer mes compétences en ASP.NET et C# grâce à une expérience pratique en dehors de la classe. Le projet comprend une interface utilisateur complète CRUD, permettant une gestion complète des entrées médias.",
              git_link: "https://github.com/AngelWiebe/movie-db",
            },
            {
              type: "job",
              company: "Varian Medical Systems",
              resume: {
                title: "Stagiaire en tests logiciels",
                company: "Varian Medical Systems",
                location: "Winnipeg, Manitoba",
                timeline: "Janvier 2016 – février 2016",
                sections: [
                  {
                    bullets: [
                      "Formation en tests logiciels dans un environnement de technologies médicales."
                    ]
                  }
                ]
              },
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
