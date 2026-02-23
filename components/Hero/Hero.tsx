import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div>
        <h1 className={styles.title}>The Future of Media</h1>
        <p className={styles.supporting}>A new studio shaping how cinema gets made</p>
        <div className={styles.ctas}>
          <a href="#contact" className="btn-primary">Inquire</a>
        </div>
      </div>
    </section>
  )
}
