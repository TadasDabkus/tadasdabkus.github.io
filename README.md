# Tadas Dabkus — Creative Portfolio

## Files
- `index.html` — page structure and copy
- `style.css` — responsive experimental visual style
- `script.js` — mobile navigation, scroll reveals and project detail dialogs
- `hero3d.js` — interactive Three.js object in the hero section

## Before publishing
1. Replace the placeholder project artwork in the portfolio with your actual images/screenshots.
2. Verify the project descriptions and tools are accurate; edit them to match your contribution.
3. Replace `hello@tadari.studio` with the email address you want recruiters to use.
4. Update the page title and meta description if needed.
5. Test on desktop and mobile.

The visual artwork in the first version is made with CSS shapes and is intended as a temporary layout placeholder, not as a claim that these are final project screenshots.

## Publish with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a public repository named exactly `YOUR-USERNAME.github.io`.
3. Upload `index.html`, `style.css`, and `script.js` to the repository root.
4. Open the repository's Settings → Pages.
5. Choose Deploy from a branch, select `main` and `/ (root)`, then Save.
6. Wait a few minutes and visit `https://YOUR-USERNAME.github.io`.

No custom domain is required. GitHub Pages provides the free GitHub subdomain and HTTPS.

## Interactive 3D hero
The hero uses Three.js from jsDelivr CDN. Visitors can drag with a mouse or touch to rotate the abstract object. An internet connection is required to load Three.js. The scene uses lightweight procedural geometry rather than an external model file.


## Troubleshooting
The interactive hero uses a single Three.js ES module and custom pointer controls (no OrbitControls dependency). It requires WebGL and an internet connection to load Three.js from jsDelivr. If it does not appear, check the browser console for a CDN or WebGL error.


## Geometric 3D hero
The interactive hero is a faceted geometric sculpture with fine wireframe cages and restrained lime/orange accents. Drag with mouse or touch to rotate it. Three.js is loaded from jsDelivr, so an internet connection is required.


Mobile touch fix: pointer capture is now applied to the actual canvas, with touch-action disabled on the canvas/container so dragging the 3D object works on touch screens. The artwork is also given slightly more prominence on desktop.


Mobile Chrome follow-up: the canvas now handles both Pointer Events and explicit Touch Events with passive:false and preventDefault(), and the module URL has a cache-busting version query. Replace the updated index.html, style.css and hero3d.js on GitHub.


## iPhone decorative punctuation fix
The hero star and lime terminal dot are now wrapped in an isolated inline-flex container with explicit Safari text-fill colors and spacing. This is intended to prevent iOS Safari glyph/color overlap while preserving the existing design.


## Safari icon compatibility
Decorative icon glyphs (starbursts, arrows, target and command symbol) are now inline SVG vectors instead of Unicode characters. This avoids iOS Safari font fallback and emoji/text-presentation differences while preserving the existing colors and layout.

The lime punctuation block at the end of the hero heading and the remaining text-link arrow are also SVG now, so the visible decorative symbols no longer depend on iOS font glyph rendering.

The hero starburst is now built from overlapping square-ended SVG bars rather than a sharp-pointed star polygon, giving it a bolder, squarer appearance closer to the original design.


## Branded loading screen
A short branded loading overlay shows the TADAS DABKUS wordmark, a lime progress bar and a percentage. It waits for the page load and the Three.js canvas when possible, but always dismisses after a short safety timeout so slow connections or unsupported WebGL do not trap visitors.


Loader fix: added the missing loader HTML directly after `<body>` and made initialization wait for DOMContentLoaded. The loader should now be visible on first paint and disappear after page/3D readiness or a safety timeout.
