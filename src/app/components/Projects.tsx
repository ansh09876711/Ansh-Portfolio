'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'
import styles from './Projects.module.css'

interface ProjectData {
  number: string
  category: string
  name: string
  description: string
  liveUrl: string
  liveWebsiteUrl?: string
  col1Image1: string
  col1Image2: string
  col2Image: string
  buttonLabel: string
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Academic · Security',
    name: 'TRINETRA',
    description: 'A safe-route navigation system for women and vulnerable groups, using real-time crime data and ML to suggest the safest path.',
    liveUrl: 'https://github.com/ansh09876711/Trinetra---Safe-Route-Navigation-for-Women-and-Vulnerable-Groups',
    liveWebsiteUrl: 'https://trinetra-3286d.web.app/',
    col1Image1: '/trinetra.png',
    col1Image2: '/trinetra.png',
    col2Image: '/trinetra.png',
    buttonLabel: 'View Code',
  },
  {
    number: '02',
    category: 'Academic · Portal',
    name: 'College Portal',
    description: 'A centralized resource hub for college students — notes, schedules, and announcements all in one clean, accessible web app.',
    liveUrl: 'https://github.com/ansh09876711/College-Resource-Website',
    col1Image1: '/college-portal.png',
    col1Image2: '/college-portal.png',
    col2Image: '/college-portal.png',
    buttonLabel: 'View Code',
  },
  {
    number: '03',
    category: 'Academic · Animation',
    name: 'University Site',
    description: 'A modern animated university landing page built with smooth scroll effects, responsive layout, and a polished visual identity.',
    liveUrl: 'https://github.com/ansh09876711/University-Website',
    col1Image1: '/University.png',
    col1Image2: '/University.png',
    col2Image: '/University.png',
    buttonLabel: 'View Code',
  },
  {
    number: '04',
    category: 'Personal · Security',
    name: 'CyberShield Pro',
    description: 'A hands-on cybersecurity lab covering encryption, network scanning, and vulnerability analysis — built for learning and experimentation.',
    liveUrl: 'https://github.com/ansh09876711/cyber-security-lab',
    col1Image1: '/cybersecurity.png',
    col1Image2: '/cybersecurity.png',
    col2Image: '/cybersecurity.png',
    buttonLabel: 'View Code',
  },
  {
    number: '05',
    category: 'Web · Search Engine',
    name: 'AETHER SEARCH ENGINE',
    description: 'A modern AI-powered search engine with fast web results, clean UI, and intelligent query handling for an enhanced searching experience.',
    liveUrl: 'https://github.com/ansh09876711/aether-search-engine',
    liveWebsiteUrl: 'https://aether-search-engine-1.onrender.com/',
    col1Image1: 'https://i.ibb.co/jkZCwz5b/Screenshot-2026-05-26-192817.png',
    col1Image2: 'https://i.ibb.co/jkZCwz5b/Screenshot-2026-05-26-192817.png',
    col2Image: 'https://i.ibb.co/jkZCwz5b/Screenshot-2026-05-26-192817.png',
    buttonLabel: 'View Code',
  },
]

interface ProjectCardProps {
  project: ProjectData
  index: number
  total: number
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })

  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  const isSingleImage =
    project.col1Image1 === project.col1Image2 && project.col1Image1 === project.col2Image

  const handleImageError = () => {
    console.error(`Failed to load image for project: ${project.name}`)
    setImageError(true)
  }

  // SSR / pre-mount fallback
  if (!isMounted) {
    return (
      <div
        ref={cardRef}
        className={styles.cardWrapper}
        style={{ top: `${96 + index * 28}px` }}
      >
        <article className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.cardMeta}>
              <span className={styles.cardNumber}>{project.number}</span>
              <div className={styles.cardInfo}>
                <span className={styles.cardCategory}>{project.category}</span>
                <h3 className={styles.cardName}>{project.name}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={styles.cardWrapper}
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article style={{ scale }} className={styles.card}>
        {/* ── Top row: number + meta + button ── */}
        <div className={styles.cardTop}>
          <div className={styles.cardMeta}>
            <span className={styles.cardNumber}>{project.number}</span>
            <div className={styles.cardInfo}>
              <span className={styles.cardCategory}>{project.category}</span>
              <h3 className={styles.cardName}>{project.name}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
            </div>
          </div>
          <div className={styles.cardButtonWrap}>
            <LiveProjectButton href={project.liveUrl} label={project.buttonLabel} />
            {project.liveWebsiteUrl && (
              <LiveProjectButton href={project.liveWebsiteUrl} label="Live Site" />
            )}
          </div>
        </div>

        {/* ── Image grid or single image ── */}
        {isSingleImage ? (
          <div className={styles.singleImageContainer}>
            {imageError ? (
              <div className={styles.imagePlaceholder}>
                <span>📷</span>
                <p>{project.name}</p>
              </div>
            ) : (
              <Image
                src={project.col1Image1}
                alt={`${project.name} preview`}
                className={styles.singleImg}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                style={{ objectFit: 'cover' }}
                onError={handleImageError}
              />
            )}
          </div>
        ) : (
          <div className={styles.imageGrid}>
            {/* Left col – 2 stacked images */}
            <div className={styles.imageColLeft}>
              <div className={styles.imageSmall}>
                {imageError ? (
                  <div className={styles.imagePlaceholder}>
                    <span>📷</span>
                  </div>
                ) : (
                  <Image
                    src={project.col1Image1}
                    alt={`${project.name} preview 1`}
                    className={styles.img}
                    fill
                    sizes="(max-width: 768px) 40vw, 320px"
                    style={{ objectFit: 'cover' }}
                    onError={handleImageError}
                  />
                )}
              </div>
              <div className={styles.imageLarge}>
                {imageError ? (
                  <div className={styles.imagePlaceholder}>
                    <span>📷</span>
                  </div>
                ) : (
                  <Image
                    src={project.col1Image2}
                    alt={`${project.name} preview 2`}
                    className={styles.img}
                    fill
                    sizes="(max-width: 768px) 40vw, 320px"
                    style={{ objectFit: 'cover' }}
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>

            {/* Right col – 1 tall image */}
            <div className={styles.imageColRight}>
              {imageError ? (
                <div className={styles.imagePlaceholder}>
                  <span>📷</span>
                </div>
              ) : (
                <Image
                  src={project.col2Image}
                  alt={`${project.name} preview 3`}
                  className={styles.img}
                  fill
                  sizes="(max-width: 768px) 60vw, 480px"
                  style={{ objectFit: 'cover' }}
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
        )}
      </motion.article>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <FadeIn y={40}>
        <h2 className={styles.heading}>Projects</h2>
      </FadeIn>

      <div className={styles.cardList}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  )
}
