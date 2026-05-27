'use client'

import { useState, useEffect } from 'react'
import VideoIntro from './components/VideoIntro'
import Projects from './components/Projects'
import Magnet from './components/Magnet'
import styles from './page.module.css'

const skillGroups = [
  {
    label: 'Languages',
    skills: ['Python', 'JavaScript', 'C', 'C++', 'Java', 'HTML/CSS'],
  },
  {
    label: 'Frameworks & Libraries',
    skills: ['Node.js', 'Express', 'Flask', 'React', 'FastAPI', 'AJAX'],
  },
  {
    label: 'DevOps & Cloud',
    skills: ['Docker', 'CI/CD', 'Git', 'Linux', 'AWS', 'GCP'],
  },
  {
    label: 'Database & Security',
    skills: ['PostgreSQL', 'SQL', 'Firebase', 'Cybersecurity', 'Cryptography'],
  },
  {
    label: 'AI / ML',
    skills: ['ML Basics', 'Generative AI', 'RAG Systems', 'LLM APIs'],
  },
]

const experienceList = [
  {
    title: 'Engineering Student',
    company: 'Sushila Devi Bansal College of Technology (SDBCT)',
    date: 'Aug 2023 - Present',
    description: 'Pursuing BTech CSE while building skills in Linux, Docker, Git, CI/CD pipelines, cloud fundamentals, and DevOps workflows.',
  },
]

const educationList = [
  {
    degree: 'Bachelor of Technology in Computer Science Engineering',
    institution: 'Sushila Devi Bansal College of Technology (SDBCT)',
    year: 'Sep 2023 - Jun 2027',
    grade: 'BTech Computer Science',
  },
  {
    degree: '12th (SSC) PCM',
    institution: 'Maharaja Yeswant Roa Holkar (Indore)',
    year: 'Jun 2021 - Nov 2022',
    grade: '68%',
  },
  {
    degree: '10th (HSC)',
    institution: 'Chameli Devi Public School (Indore)',
    year: 'Jun 2019 - Mar 2020',
    grade: '62%',
  },
]

const certifications = [
  { name: 'Generative AI Studio', issuer: 'Google Cloud' },
  { name: 'Cybersecurity Internship', issuer: 'Skill Ladders (IIT Kharagpur)' },
  { name: 'Data Analytics Job Simulation', issuer: 'Deloitte' },
  { name: 'Data Visualisation: Empowering Business with Effective Insights', issuer: 'Forage' },
  { name: 'SQL (Advanced), Problem Solving, CSS', issuer: 'HackerRank' },
  { name: 'C++, Data Structures & Software Engineering', issuer: 'Saylor Academy' },
  { name: 'Software Engineering Job Simulation', issuer: 'JPMorgan Chase & Co.' },
]

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)

    // Config FormSubmit behavior
    formData.append('_subject', 'New Portfolio Message from ' + formData.get('name'))
    formData.append('_captcha', 'false')
    formData.append('_template', 'table')

    try {
      const response = await fetch('https://formsubmit.co/ajax/ANSH230133@CST.SDBC.AC.IN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      })

      if (response.ok) {
        setStatus('success')
        e.currentTarget.reset()
        // Auto-reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        // Auto-reset error message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      setStatus('error')
      // Auto-reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <main>
      <nav className={`${styles.pageNav} ${menuOpen ? styles.navActive : ''} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#about" className={styles.navLogo} onClick={() => setMenuOpen(false)}>ANSH<span>.</span></a>
        
        <button
          className={`${styles.menuToggle} ${menuOpen ? styles.toggleActive : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <div className={`${styles.navLinks} ${menuOpen ? styles.linksOpen : ''}`}>
          <div className={styles.mobileMenuHeader}>
            <span className={styles.mobileMenuTitle}>Navigation</span>
            <div className={styles.mobileMenuLine} />
          </div>

          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          <a href="#certifications" onClick={() => setMenuOpen(false)}>Certs</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* Modern dark blurred overlay for mobile drawer */}
      {menuOpen && (
        <div
          className={styles.navOverlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <VideoIntro videoSrc="/hero.mp4" />

      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <p className={styles.aboutEyebrow}>About Me</p>
          <h2 className={styles.aboutHeading}>I’m an aspiring AI/ML Engineer and CSE student.</h2>
          <p className={styles.aboutText}>
            I am a Computer Science Engineering student with a strong interest in automation, cloud computing, and modern software deployment practices.
            I am currently building a solid foundation in Linux, Git, Docker, CI/CD pipelines, and cloud fundamentals through practical projects.
          </p>
          <div className={styles.aboutActions}>
            <Magnet strength={3.5} padding={40}>
              <a className={styles.aboutLink} href="/Ansh%20Agarwal%20%E2%80%94%20Resume.pdf" download="Ansh_Agarwal_Resume.pdf">
                Download Resume
              </a>
            </Magnet>
            <Magnet strength={3.5} padding={40}>
              <a className={styles.contactLink} href="#contact">
                Contact Me
              </a>
            </Magnet>
          </div>
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Skills</p>
          <h2 className={styles.sectionHeading}>Technical skills I use every day.</h2>
          <p className={styles.sectionSub}>
            A strong foundation across frontend, backend, database, and developer tooling.
          </p>

          <div className={styles.skillGrid}>
            {skillGroups.map(group => (
              <div key={group.label} className={styles.skillCard}>
                <h3>{group.label}</h3>
                <div className={styles.skillList}>
                  {group.skills.map(skill => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Projects />

      <section id="experience" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Experience</p>
          <h2 className={styles.sectionHeading}>Projects, hackathons, and developer contributions.</h2>

          <div className={styles.experienceGrid}>
            {experienceList.map(item => (
              <div key={item.title} className={styles.experienceCard}>
                <h3>{item.title}</h3>
                <p className={styles.experienceMeta}>{item.company} · {item.date}</p>
                <p className={styles.experienceDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Education</p>
          <h2 className={styles.sectionHeading}>Academic background and current studies.</h2>

          <div className={styles.educationGrid}>
            {educationList.map(item => (
              <div key={item.degree} className={styles.educationCard}>
                <h3>{item.degree}</h3>
                <p className={styles.educationMeta}>{item.institution}</p>
                <p className={styles.educationMeta}>{item.year} · {item.grade}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Certifications</p>
          <h2 className={styles.sectionHeading}>Courses and certifications that back my work.</h2>

          <ul className={styles.certList}>
            {certifications.map(cert => (
              <li key={cert.name} className={styles.certItem}>
                <strong>{cert.name}</strong>
                <span>{cert.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className={styles.contactSection}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Contact</p>
          <h2 className={styles.sectionHeading}>Let’s build something together.</h2>
          <p className={styles.sectionSub}>
            Reach out for collaborations, internships, or project opportunities.
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span>Email</span>
                <a href="mailto:ANSH230133@CST.SDBC.AC.IN">ANSH230133@CST.SDBC.AC.IN</a>
              </div>
              <div className={styles.contactItem}>
                <span>Phone</span>
                <a href="tel:+918965021021">+91 89650 21021</a>
              </div>
              <div className={styles.contactItem}>
                <span>GitHub</span>
                <a href="https://github.com/ansh09876711" target="_blank" rel="noreferrer">github.com/ansh09876711</a>
              </div>
              <div className={styles.contactItem}>
                <span>LinkedIn</span>
                <a href="https://www.linkedin.com/in/ansh-agarwal-19051a278" target="_blank" rel="noreferrer">linkedin.com/in/ansh-agarwal-19051a278</a>
              </div>
            </div>

            <form
              className={styles.contactForm}
              onSubmit={handleSubmit}
            >
              <label>
                Your name
                <input type="text" name="name" className={styles.formInput} placeholder="Your name" required />
              </label>
              <label>
                Your email
                <input type="email" name="email" className={styles.formInput} placeholder="you@example.com" required />
              </label>
              <label>
                Message
                <textarea name="message" className={styles.formTextarea} placeholder="Tell me about your project" rows={5} required />
              </label>
              <button
                type="submit"
                className={styles.formButton}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className={styles.submitSuccess}>
                  ✓ Message sent successfully! Ansh will contact you soon.
                </p>
              )}
              {status === 'error' && (
                <p className={styles.submitError}>
                  ✕ Failed to send. Please try again or email directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <a href="#about" className={styles.footerLogo}>ANSH<span>.</span></a>
            <p className={styles.footerTagline}>
              Aspiring AI/ML Engineer &amp; CSE Student crafting intelligent systems, machine learning solutions, and web experiences.
            </p>
          </div>
          <div className={styles.footerSocials}>
            <a className={styles.footerSocialLink} href="https://github.com/ansh09876711" target="_blank" rel="noreferrer">GitHub</a>
            <a className={styles.footerSocialLink} href="https://www.linkedin.com/in/ansh-agarwal-19051a278" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className={styles.footerSocialLink} href="mailto:ANSH230133@CST.SDBC.AC.IN">Email</a>
            <a className={styles.footerSocialLink} href="/Ansh%20Agarwal%20%E2%80%94%20Resume.pdf" download="Ansh_Agarwal_Resume.pdf">Resume</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>© 2026 Ansh Agarwal — All rights reserved</span>
          <div className={styles.protectedBadge}>
            <span className={styles.protectedDot} />
            <span>Active Protection Guard</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
