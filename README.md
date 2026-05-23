# Cinematic Portfolio

A premium cinematic portfolio hero built with Next.js, Three.js, and GSAP.

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Publish to GitHub

Initialize a repository and push your project to GitHub:

```bash
git init
git add .
git commit -m "Initial cinematic portfolio"
git remote add origin git@github.com:ansh09876711/cinematic-portfolio.git
git push -u origin main
```

If your GitHub repo uses `master`, replace `main` with `master`.

## Structure

```
src/app/
├── components/
│   ├── VideoIntro.tsx          # Main hero section
│   ├── VideoIntro.module.css   # Hero styles
│   ├── CinematicLayer.tsx      # Three.js particle system
│   └── CinematicLayer.module.css
├── page.tsx                    # Root page
├── page.module.css
├── layout.tsx
└── globals.css

public/
└── hero.mp4                    # Your cinematic video (already placed here)
```

## Customisation

**Name / copy** — edit `VideoIntro.tsx`, find the `nameFirst`/`nameLast` spans and `roleText` paragraph.

**Particle colours** — edit the `palette` array in `CinematicLayer.tsx`.

**Timing** — adjust the GSAP timeline delays in `VideoIntro.tsx` `runAnimations()`.

**Fonts** — swap the Google Fonts import in `layout.tsx` and update the CSS module font-family declarations.
