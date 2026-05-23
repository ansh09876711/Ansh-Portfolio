import VideoIntro from './components/VideoIntro'
import styles from './page.module.css'

const projects = [
  {
    title: 'Trinetra — Safe Route Navigation',
    description: 'Women safety platform with real-time alerts, live location tracking, and AI-assisted route guidance.',
    image: '/project-trinetra.svg',
    href: 'https://github.com/ansh09876711/Trinetra---Safe-Route-Navigation-for-Women-and-Vulnerable-Groups',
  },
  {
    title: 'College Resource Website',
    description: 'A modern study portal for students with uploads, downloads, and responsive learning resources.',
    image: '/project-college.svg',
    href: 'https://github.com/ansh09876711/College-Resource-Website',
  },
  {
    title: 'University Website',
    description: 'Animated university landing page built with HTML, CSS, JavaScript and Three.js motion.',
    image: '/project-university.svg',
    href: 'https://github.com/ansh09876711/University-Website',
  },
  {
    title: 'Login Page',
    description: 'Clean and modern authentication UI with polished form interactions and layout.',
    image: '/project-login.svg',
    href: 'https://github.com/ansh09876711/Login_page',
  },
  {
    title: 'Cyber Security Lab',
    description: 'Python Flask cybersecurity toolkit for password analysis, encryption, and secure utilities.',
    image: '/project-cyber.svg',
    href: 'https://github.com/ansh09876711/cyber-security-lab',
  },
]

export default function Home() {
  return (
    <main>
      <VideoIntro videoSrc="/hero.mp4" />

      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <p className={styles.aboutEyebrow}>About Me</p>
          <h2 className={styles.aboutHeading}>I build intelligent cinematic products.</h2>
          <p className={styles.aboutText}>
            I’m Ansh Agarwal, an AI/ML developer and full-stack engineer who crafts immersive web experiences with code, design, and data-driven storytelling.
            My work is focused on polished digital products, interactive motion, and practical innovation.
          </p>
          <div className={styles.aboutActions}>
            <a
              className={styles.aboutLink}
              href="https://github.com/ansh09876711"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
            <a
              className={styles.contactLink}
              href="https://github.com/ansh09876711#contact"
              target="_blank"
              rel="noreferrer"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      <section id="work" className={styles.workSection}>
        <div className={styles.workInner}>
          <p className={styles.workEyebrow}>Selected Work</p>
          <h2 className={styles.workHeading}>
            Projects that<br />
            <span className={styles.workHeadingOutline}>push limits.</span>
          </h2>
          <p className={styles.workSub}>
            A curated collection of cinematic digital experiences — built with precision,
            purpose, and a relentless eye for detail.
          </p>

          <div className={styles.workGrid}>
            {projects.map(project => (
              <article key={project.title} className={styles.projectCard}>
                <img
                  className={styles.projectImage}
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className={styles.projectMeta}>
                  <p className={styles.projectLabel}>GitHub Product</p>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  <a
                    className={styles.projectLink}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
