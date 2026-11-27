# Angel Wiebe’s portfolio

A bilingual software development portfolio built with React, TypeScript, Vite, and Material UI. It includes work experience, projects, silent video demos, and downloadable résumés in English and French. The site is available in [English](https://angelwiebe.ca/) and [French](https://angelwiebe.ca/fr/).

## Local development

Use Node.js 20 or later and npm. From the repository root, install the locked dependencies and start the development server.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Use `/` for English and `/fr/` for French.

| Command | Purpose |
| --- | --- |
| `npm run lint` | Run ESLint. |
| `npm test -- --run` | Run Vitest once. Run `npm test` for watch mode. |
| `npm run test:coverage` | Run Vitest and generate a coverage report in `coverage/`. |
| `npm run test:smoke` | Run Chromium smoke tests against the built site. |
| `npm run build` | Type-check the project and build the static site into `dist/`. |
| `npm run preview` | Serve the contents of `dist/` locally after building. |

Use the production preview to check résumé downloads and video playback before publishing.

## Test coverage

Run `npm run test:coverage` and open `coverage/index.html` for the per-file report. GitHub Actions uploads the same report as the `vitest-coverage` artifact on successful coverage runs. It measures the Vitest suite. Playwright runs separately.

## Browser smoke tests

GitHub Actions runs lint, unit tests, the production build, and Chromium smoke tests on source pushes and pull requests. The smoke tests cover résumé downloads, all four video previews, dialog focus restoration, language switching and browser history, and localized search metadata without JavaScript. They also check that the floral background stays fixed, section links remain visible below the sticky header, and enlarged text remains usable on short screens.

To run them locally:

```sh
npx playwright install --no-shell chromium
npm run build
npm run test:smoke
```

## Update portfolio content

- Edit [`src/i18n.js`](src/i18n.js) to update the bio, skills, work history, or projects. Keep the English and French entries in sync.
- Store project videos in [`src/assets/previews/`](src/assets/previews/), import them in `src/i18n.js`, and include a description of what happens on screen in both languages via `preview_description`.
- Store résumé PDFs in [`src/assets/`](src/assets/) and update the English and French imports in [`Header.tsx`](src/components/Header.tsx) if the filenames change. The download follows the selected language.

## Search and language pages

Vite builds separate English and French pages from [`index.html`](index.html) and [`fr/index.html`](fr/index.html). Each has its own title, description, canonical URL, and social preview metadata. Both pages provide reciprocal language links for search engines and include a project and experience overview in the initial HTML. The [sitemap](public/sitemap.xml) lists both canonical URLs and is advertised in [`robots.txt`](public/robots.txt).

When changing featured projects or the professional summary, update the static overviews in both HTML files alongside the translations in `src/i18n.js`.

## Accessibility

The language switcher links to separate pages, works without JavaScript, and identifies the current language to assistive technology. Each page declares its document language in HTML. Keyboard users can skip to the main content and open project and work-history cards with Enter or Space. The dialogs have visible Close and Back to project buttons. These buttons and Escape restore focus to the control that opened the active dialog. Anchor navigation and dialogs honor the system’s reduced-motion setting, and each silent preview has a text description in both languages.

The header stays pinned when there is room for content below it. On short viewports with enlarged text, it scrolls with the page so the navigation remains reachable.

Local testing on macOS has covered Chromium, Firefox, and WebKit, with iPhone and Pixel landscape emulation at 200% text size. Automated axe scans found no violations in the English and French desktop and mobile views or the open project dialogs. Text contrast over the floral background still requires manual review. Screen-reader behavior, PDF reading order, and native device behavior remain unverified.

## Deploy to GitHub Pages

The deployment uses the `gh-pages` branch and the custom domain in [`CNAME`](CNAME). With push access to the repository, run:

```sh
npm run deploy
```

The `predeploy` script builds the site, copies `CNAME` into `dist/`, and creates `dist/.nojekyll`. The deploy script then publishes `dist/` to GitHub Pages.
