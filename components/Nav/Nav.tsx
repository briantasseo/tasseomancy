'use client'

import styles from './Nav.module.css'

interface NavProps {
  onLogoClick: () => void
}

export default function Nav({ onLogoClick }: NavProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onLogoClick()
    }
  }

  return (
    <nav className={styles.nav}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <div
          className={styles.logo}
          role="button"
          tabIndex={0}
          aria-label="Tasseomancy Studios — click to toggle theme"
          onClick={onLogoClick}
          onKeyDown={handleKeyDown}
        >
          Tasseomancy Studios
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
