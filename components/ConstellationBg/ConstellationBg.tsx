'use client'

import { useEffect } from 'react'
import styles from './ConstellationBg.module.css'

export default function ConstellationBg() {
  useEffect(() => {
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!motionOk) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      const orbs = document.querySelectorAll(`.${styles.orb}`)
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.5
        ;(orb as HTMLElement).style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.constellationBg} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orb1}`}></div>
      <div className={`${styles.orb} ${styles.orb2}`}></div>
      <div className={`${styles.orb} ${styles.orb3}`}></div>
      <svg width="100%" height="100%" className={styles.constellationSvg}>
        <line x1="10%" y1="15%" x2="25%" y2="30%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="25%" y1="30%" x2="40%" y2="22%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="40%" y1="22%" x2="55%" y2="35%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="70%" y1="10%" x2="80%" y2="25%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="80%" y1="25%" x2="90%" y2="18%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="15%" y1="65%" x2="30%" y2="75%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="30%" y1="75%" x2="45%" y2="68%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="60%" y1="70%" x2="75%" y2="80%" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="75%" y1="80%" x2="88%" y2="72%" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="10%" cy="15%" r="2" fill="currentColor" opacity="0.3"/>
        <circle cx="25%" cy="30%" r="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="40%" cy="22%" r="2" fill="currentColor" opacity="0.25"/>
        <circle cx="55%" cy="35%" r="1.5" fill="currentColor" opacity="0.35"/>
        <circle cx="70%" cy="10%" r="2" fill="currentColor" opacity="0.3"/>
        <circle cx="80%" cy="25%" r="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="90%" cy="18%" r="2" fill="currentColor" opacity="0.2"/>
        <circle cx="15%" cy="65%" r="1.5" fill="currentColor" opacity="0.35"/>
        <circle cx="30%" cy="75%" r="2" fill="currentColor" opacity="0.25"/>
        <circle cx="45%" cy="68%" r="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="60%" cy="70%" r="2" fill="currentColor" opacity="0.3"/>
        <circle cx="75%" cy="80%" r="1.5" fill="currentColor" opacity="0.35"/>
        <circle cx="88%" cy="72%" r="2" fill="currentColor" opacity="0.25"/>
        <circle cx="50%" cy="50%" r="1" fill="currentColor" opacity="0.15"/>
        <circle cx="35%" cy="45%" r="1" fill="currentColor" opacity="0.12"/>
        <circle cx="65%" cy="55%" r="1" fill="currentColor" opacity="0.1"/>
      </svg>
    </div>
  )
}
