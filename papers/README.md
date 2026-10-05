# Website paper entries

Each paper has a folder containing `metadata.txt`. Keep each field on one line:
`Title:`, `Abstract:`, and optional `Other Authors:`, `Link:`, `Website:`, `Code:`, and `Presentations:`
fields. Presentations appear below the title and coauthors, outside the collapsed
abstract. Include years and use `*` for coauthor presentations. The CV's events
are assigned to housing regulation except Economic History Association 2025 and
NYU Stern Finance Seminar 2024, which belong to mortgage segmentation, and NYU
Stern Finance Seminar 2025, which belongs to the Fed paper but is omitted from its
website entry at the user's request. Origins of American Zoning adds Urban
Economics Association 2026*, following the user's confirmed assignments.
The coauthor note appears only when the presentation list contains `*`.
An optional Website field adds an interactive map link beside the details control;
an accompanying Code field adds the code repository link.

The `papers` array in `../load_papers.js` controls ordering and section.
Use `research-list` for Working Papers and `works-in-progress-list` for Works in
Progress. Paper images are not displayed; existing image files are retained.

Paper titles link to the supplied Link field. The separate details control expands
the abstract when supplied. `fed-speaks` shows its unlinked title and a gray
"Draft coming soon" status, without an abstract.
Teaching and Selected Non-Academic Publications start collapsed and expand by
clicking their section headings. Entries without links need no placeholder.
Metadata requests bypass the browser cache so preview edits appear on refresh.

The section assignments and three newly added entries follow the CV in
`Dropbox/Latex/CV/dan_milo_cv.pdf`, cross-checked against its `main.tex` source.
The website's `dan_milo_cv.pdf` was updated at the user's request on 2026-10-05
from the CV prep agent's latest `Dropbox/Latex/CV/out_dir/main.pdf`.
The Fed paper is titled The Fed Attention Mechanism. Its abstract is omitted
at the user's request.

Preview through a local HTTP server so metadata requests work. Local edits do not
publish until pushed to the GitHub Pages deployment branch.

## Mortgage visual map

The mortgage paper has a separate `[ visual map ]` button beside details.
It reveals one looping GIF of the urban share of mortgage dollars, 1880–1889.
There are no playback controls, selectors, or visible methodology notes.
The GIF contains only the title, map, year, and fixed 0–100% legend.
The title, year, and legend use the same font size inside the GIF and scale together.

`../mortgage_map.js` loads `hist_mort/maps/urban-share.gif` on first opening.
Generate it with `Historic-Mortgages/Code/export_website_maps.py --output <maps-directory>`.
The exporter reads that project's validated `plotted_data.csv` and offline
county geometries. Lots proxy urban property; gray denotes unavailable or
invalid observations. Full methodology remains in the research project's
`Results/Figures/mortgage-animation/README.md`. No new analytics events are added.

## Analytics

The Plausible snippet in `../index.html` uses the provider's default behavior,
without custom preview filtering. The site-specific script handles pageviews.
Custom events contain action names and public paper slugs only.

Before publishing, add matching Custom event goals in Plausible's site settings:

- `CV Click`
- `Paper Click: fed-speaks`
- `Paper Click: ai-zoning`
- `Paper Click: hist_mort`
- `Abstract Open: ai-zoning`
- `Abstract Open: hist_mort`
- `Abstract Open: origins-of-zoning`
- `Abstract Open: causal-effects-of-zoning`
- `Map Click: ai-zoning`
- `Code Click: ai-zoning`

Abstract events fire on opening, not closing. The title-only Fed entry does
not send an open event. CV events measure link clicks, not completed downloads.
Custom events count toward the provider's usage allowance. This setup does not
require custom properties or change the existing live deployment.

After an authorized deployment, use Plausible's installation check and verify a
pageview and a goal event. Local mocked tests do not verify dashboard ingestion.
