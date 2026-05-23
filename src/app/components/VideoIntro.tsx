'use client'

import { useEffect, useRef, useState } from 'react'
import CinematicLayer from './CinematicLayer'
import styles from './VideoIntro.module.css'

interface VideoIntroProps {
  videoSrc: string
}

export default function VideoIntro({ videoSrc }: VideoIntroProps) {
  const heroRef        = useRef<HTMLElement>(null)
  const mainVideoRef   = useRef<HTMLVideoElement>(null)
  const ambientRef     = useRef<HTMLVideoElement>(null)
  const taglineRef     = useRef<HTMLParagraphElement>(null)
  const nameFirstRef   = useRef<HTMLSpanElement>(null)
  const nameLastRef    = useRef<HTMLSpanElement>(null)
  const roleRef        = useRef<HTMLParagraphElement>(null)
  const scrollIndRef   = useRef<HTMLDivElement>(null)

  const [muted,   setMuted]   = useState(true)
  const [playing, setPlaying] = useState(true)
  const [showBadge, setShowBadge] = useState(true)

  // Auto-hide sound badge
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(false), 4500)
    return () => clearTimeout(t)
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    let gsap: typeof import('gsap').gsap

    async function runAnimations() {
      const mod = await import('gsap')
      gsap = mod.gsap

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.5
      )
      .fromTo(nameFirstRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.15 },
        0.8
      )
      .fromTo(nameLastRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.15 },
        1.0
      )
      .fromTo(roleRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.95 },
        1.25
      )
      .fromTo(scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9 },
        1.9
      )
    }

    runAnimations()
  }, [])

  // Sync mute state
  useEffect(() => {
    if (mainVideoRef.current)  mainVideoRef.current.muted  = muted
  }, [muted])

  // Sync play state
  useEffect(() => {
    const main    = mainVideoRef.current
    const ambient = ambientRef.current
    if (!main || !ambient) return
    if (playing) {
      main.play().catch(() => {})
      ambient.play().catch(() => {})
    } else {
      main.pause()
      ambient.pause()
    }
  }, [playing])

  // Video fade-in on canplay
  useEffect(() => {
    const v = mainVideoRef.current
    if (!v) return
    const onCanPlay = async () => {
      const mod = await import('gsap')
      mod.gsap.to(v, { opacity: 1, duration: 1.6, ease: 'power2.inOut' })
    }
    v.addEventListener('canplay', onCanPlay)
    return () => v.removeEventListener('canplay', onCanPlay)
  }, [])

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Ambient blurred background layer */}
      <video
        ref={ambientRef}
        className={styles.ambientVideo}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Main foreground video */}
      <video
        ref={mainVideoRef}
        className={styles.mainVideo}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Three.js particle layer */}
      <CinematicLayer containerRef={heroRef as React.RefObject<HTMLElement>} />

      {/* Cinematic vignette */}
      <div className={styles.vignette} aria-hidden="true" />

      {/* Gradient overlays */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

      {/* Landing copy */}
      <div className={styles.content}>
        <p ref={taglineRef} className={styles.tagline}>
          — AI / ML DEVELOPER &amp; Creative Full Stack Engineer
        </p>

        <div className={styles.nameBlock} aria-label="Ansh Agarwal">
          <span ref={nameFirstRef} className={styles.nameFirst}>ANSH</span>
          <span ref={nameLastRef}  className={styles.nameLast}>AGARWAL</span>
        </div>

        <p ref={roleRef} className={styles.roleText}>
          Crafting{' '}
          <span className={styles.roleAccent}>cinematic digital experiences</span>
          <br />
          where code meets intelligence.
        </p>
      </div>

      {/* Controls — bottom right */}
      <div className={styles.controls}>
        {showBadge && (
          <span className={styles.soundBadge} aria-live="polite">
            ↑ tap for sound
          </span>
        )}

        <button
          className={styles.ctrlBtn}
          onClick={() => setMuted(m => !m)}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? '🔇' : '🔊'}
        </button>

        <button
          className={styles.ctrlBtn}
          onClick={() => setPlaying(p => !p)}
          aria-label={playing ? 'Pause video' : 'Play video'}
          title={playing ? 'Pause' : 'Play'}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      {/* Scroll indicator — bottom center */}
      <div
        ref={scrollIndRef}
        className={styles.scrollIndicator}
        onClick={scrollToWork}
        onKeyDown={e => e.key === 'Enter' && scrollToWork()}
        role="button"
        tabIndex={0}
        aria-label="Scroll to selected work"
      >
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine} aria-hidden="true" />
      </div>
    </section>
  )
}
