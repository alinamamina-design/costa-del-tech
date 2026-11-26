# Costa del Tech — site redesign

Static HTML/CSS/JS, no build step.

    python3 -m http.server 8794      → http://localhost:8794/

## Live files
- `index.html` — the page (inline CSS + small inline scripts; GSAP from CDN for the magnetic Apply button)
- `music-player.js` — "Play music" record sleeve (Web Audio track; set `TRACK_URL` for a real mp3)
- `tech-text.js` — hero wordmark effect (vanilla port of React Bits TechText)
- `assets/` — only files the page uses; photos are `.webp` (team 320px, event photos 640px)
- `video/trailer-web.mp4` (+ `trailer-poster.webp`; `.jpg` kept for og:image)

## Page blocks
Hero · Video (about + numbers + film credit) · Our events (+ Friends & partners logos) · Ambassadors & team · Join + newsletter + footer

## _archive/
- `variants/` — all option pages we chose from (may not render fully: paths point to files that moved)
- `iterations/` — earlier versions and backups of the page
- `masters/` — full-size originals (photos, unused MVP assets, the 155 MB trailer master, old hero video)

## To confirm with Natalia
December meetup date and programme · what "Talent" in the menu should open · real photos for BiznagaFest, Deep Dive, partner conferences · dark J On The Beach / official Les Roches logo
