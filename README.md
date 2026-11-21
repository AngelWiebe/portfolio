# Angel Wiebe’s portfolio

A bilingual software development portfolio built with React, TypeScript, Vite, and Material UI. It includes work experience, projects, silent video demos, and downloadable résumés in English and French. The configured site address is [angelwiebe.ca](https://angelwiebe.ca).

## Local development

Use Node.js 20 or later and npm. From the repository root, install the locked dependencies and start the development server.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

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

GitHub Actions runs lint, unit tests, the production build, and Chromium smoke tests on source pushes and pull requests. The smoke tests verify both résumé downloads, keyboard focus restoration, and French text reflow at 320 px with doubled text.

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

## Accessibility

The language switcher updates the document language and exposes the selected language to assistive technology. Keyboard users can navigate the carousel and open visible experience cards with Enter or Space. The dialogs have visible Close and Back to project buttons. These buttons and Escape restore focus to the control that opened the active dialog. The carousel and dialogs honor the system’s reduced-motion setting, and each silent preview has a text description in both languages.

The latest local checks covered Chrome keyboard navigation, axe scans of the English desktop and French mobile views and both dialog types, and text enlarged to 200% at a 320 px viewport. Screen-reader testing, other browsers, and PDF reading order remain unverified.

## Deploy to GitHub Pages

The deployment uses the `gh-pages` branch and the custom domain in [`CNAME`](CNAME). With push access to the repository, run:

```sh
npm run deploy
```

The `predeploy` script builds the site, copies `CNAME` into `dist/`, and creates `dist/.nojekyll`. The deploy script then publishes `dist/` to GitHub Pages.
