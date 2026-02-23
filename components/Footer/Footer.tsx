import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; 2025 Tasseomancy Studios</p>
        <p className={styles.tagline}>What you see depends on how you look.</p>
      </div>
    </footer>
  )
}
