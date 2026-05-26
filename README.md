# Ansh Portfolio

A premium cinematic portfolio built with Next.js, Three.js, and GSAP — featuring a full-screen video hero, interactive 3D particles, sticky project cards, and a glassmorphism design system.

**Live:** [ansh-portfolio.vercel.app](https://ansh-portfolio-ansh09876711.vercel.app) &nbsp;|&nbsp; **GitHub:** [@ansh09876711](https://github.com/ansh09876711)

---

## Features

- **Cinematic Video Hero** — Full-screen video background with GSAP entrance animations
- **Three.js Particle System** — Interactive 3D particles with mouse parallax
- **Sticky Project Cards** — Stacking scroll effect with Framer Motion scale transforms
- **Glassmorphism UI** — Backdrop blur, gradient borders, and layered depth throughout
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Contact Form** — Integrated with FormSubmit, no backend needed
- **Security Guard** — Optional content protection (watermark, right-click block, DevTools blur)
- **Magnetic Buttons** — Custom magnet hover effect on CTAs

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| 3D / Particles | Three.js |
| Animations | GSAP, Framer Motion |
| Styling | CSS Modules |
| Deployment | Vercel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/app/
├── components/
│   ├── VideoIntro.tsx          # Hero section with video + GSAP
│   ├── CinematicLayer.tsx      # Three.js particle system
│   ├── Projects.tsx            # Sticky stacking project cards
│   ├── SecurityGuard.tsx       # Content protection
│   ├── Magnet.tsx              # Magnetic button effect
│   ├── FadeIn.tsx              # Scroll fade animations
│   └── LiveProjectButton.tsx   # Project link buttons
├── page.tsx                    # Main page (About, Skills, Experience, Contact)
├── layout.tsx                  # Root layout + fonts
└── globals.css                 # Global styles + scrollbar

public/
├── hero.mp4                    # Hero background video
├── trinetra.png
├── college-portal.png
├── University.png
├── Login-page.png
├── cybersecurity.png
└── aether.png
```

---

## Customization

**Personal info** → `src/app/page.tsx` (skills, experience, education, certifications, contact)

**Hero name & role** → `src/app/components/VideoIntro.tsx`

**Projects** → `src/app/components/Projects.tsx` — edit the `PROJECTS` array

**Particle colors** → `src/app/components/CinematicLayer.tsx` — edit the `palette` array

**Hero video** → replace `public/hero.mp4` (recommended: 1920×1080 MP4)

**Security** → `src/app/components/SecurityGuard.tsx` — set `ENABLE_SECURITY = true` before deploying

---

## Deployment

Deployed on **Vercel** — push to GitHub and import the repo at [vercel.com](https://vercel.com).

```bash
git add .
git commit -m "your message"
git push
```

Vercel auto-deploys on every push to `main`.

---

## License

**Strictly proprietary.** All rights reserved by Ansh Agarwal.

You may review the code for educational purposes or hiring evaluations. Cloning, copying, modifying, or redeploying any part of this project for personal or commercial use is strictly prohibited. See [LICENSE](LICENSE) for details.

---

## Author

**Ansh Agarwal** — CSE Student, SDBCT Indore

- Email: [ANSH230133@CST.SDBC.AC.IN](mailto:ANSH230133@CST.SDBC.AC.IN)
- GitHub: [@ansh09876711](https://github.com/ansh09876711)
- LinkedIn: [ansh-agarwal-19051a278](https://www.linkedin.com/in/ansh-agarwal-19051a278)

---

© 2026 Ansh Agarwal — All Rights Reserved
