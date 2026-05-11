# dmilo75.github.io

Personal academic website for Dan Milo (Finance PhD student, NYU Stern), deployed via GitHub Pages from `main`.

## Structure

- `index.html` — single-page site with Home / Research / Teaching / CV sections
- `styles.css` — all styling
- `script.js` — nav/scroll behavior
- `load_papers.js` — fetches `papers/<slug>/metadata.txt` at runtime and renders the Research section
- `papers/<slug>/` — one folder per paper, each containing `metadata.txt` (Title / Link / Abstract / Other Authors) and `image.png`
- `images/photo_me.jpeg` — profile photo
- `dan_milo_cv.pdf` — CV linked from the nav

## Adding a paper

1. Create `papers/<slug>/` with `metadata.txt` (keys: `Title:`, `Link:`, `Abstract:`, `Other Authors:`) and `image.png`
2. Add `<slug>` to the `paperFolders` array in `load_papers.js`

## Conventions

- Plain HTML/CSS/JS, no build step, no framework
- Test changes by opening `index.html` locally (papers load via `fetch`, so use a local server like `python -m http.server` rather than `file://`)
- Commit directly to `main` — GitHub Pages auto-deploys
