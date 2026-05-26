'use client'

import { useEffect, useRef } from 'react'
import styles from './CinematicLayer.module.css'

interface CinematicLayerProps {
  containerRef: React.RefObject<HTMLElement>
}

export default function CinematicLayer({ containerRef }: CinematicLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    let animFrameId: number
    let disposed = false

    const container = containerRef.current
    const canvas = canvasRef.current

    // Show canvas immediately — no waiting
    canvas.style.opacity = '0'

    async function init() {
      // Import Three.js — still async but we start fade-in as soon as it's ready
      const THREE = await import('three')
      if (disposed) return

      const W = container.clientWidth
      const H = container.clientHeight

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
      camera.position.z = 5

      // ── Particles ──────────────────────────────────────────────────────────
      // Reduce particle count on mobile for better performance
      const isMobile = window.innerWidth < 768
      const COUNT = isMobile ? 200 : 380
      const positions = new Float32Array(COUNT * 3)
      const colors    = new Float32Array(COUNT * 3)
      const offsets: number[] = []

      const palette = [
        [1.0, 0.55, 0.22],   // warm orange
        [1.0, 0.76, 0.45],   // amber
        [0.95, 0.92, 0.82],  // warm white
        [0.85, 0.64, 0.28],  // gold
        [0.68, 0.84, 1.0],   // cool blue accent
        [1.0, 0.42, 0.12],   // deep orange
      ]

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 14
        positions[i * 3 + 1] = (Math.random() - 0.5) * 9
        positions[i * 3 + 2] = (Math.random() - 0.5) * 7

        const col = palette[Math.floor(Math.random() * palette.length)]
        colors[i * 3]     = col[0]
        colors[i * 3 + 1] = col[1]
        colors[i * 3 + 2] = col[2]

        offsets.push(Math.random() * Math.PI * 2)
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

      const mat = new THREE.PointsMaterial({
        size: isMobile ? 0.055 : 0.065,  // smaller on mobile
        vertexColors: true,
        transparent: true,
        opacity: isMobile ? 0.65 : 0.75,  // slightly dimmer on mobile
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      })

      const particles = new THREE.Points(geo, mat)
      scene.add(particles)

      // ── Instant fade-in via CSS transition ────────────────────────────────
      // As soon as Three is ready, fade canvas in quickly (0.4 s)
      canvas.style.transition = 'opacity 0.4s ease'
      canvas.style.opacity    = '1'

      // ── Mouse parallax ────────────────────────────────────────────────────
      let mouseX = 0, mouseY = 0
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        mouseX = ((e.clientX - rect.left) / W - 0.5) * 2
        mouseY = -((e.clientY - rect.top)  / H - 0.5) * 2
      }
      container.addEventListener('mousemove', onMouseMove)

      let frame = 0
      const posArr = geo.attributes.position.array as Float32Array

      function animate() {
        if (disposed) return
        animFrameId = requestAnimationFrame(animate)

        frame += 0.005

        for (let i = 0; i < COUNT; i++) {
          posArr[i * 3 + 1] += Math.sin(frame + offsets[i]) * 0.0007
          posArr[i * 3]     += Math.cos(frame * 0.65 + offsets[i]) * 0.0004
        }
        geo.attributes.position.needsUpdate = true

        camera.position.x += (mouseX * 0.35 - camera.position.x) * 0.022
        camera.position.y += (mouseY * 0.22 - camera.position.y) * 0.022
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }
      animate()

      // ── Resize ─────────────────────────────────────────────────────────────
      const onResize = () => {
        const nW = container.clientWidth
        const nH = container.clientHeight
        camera.aspect = nW / nH
        camera.updateProjectionMatrix()
        renderer.setSize(nW, nH)
      }
      window.addEventListener('resize', onResize)

      return () => {
        container.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }

    init()

    return () => {
      disposed = true
      cancelAnimationFrame(animFrameId)
    }
  }, [containerRef])

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
      style={{ opacity: 0 }}   // start invisible — JS sets to 1 immediately after load
    />
  )
}
