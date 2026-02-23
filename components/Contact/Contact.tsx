'use client'

import { useState, FormEvent } from 'react'
import styles from './Contact.module.css'

interface ContactProps {
  onSubmitSuccess: () => void
}

export default function Contact({ onSubmitSuccess }: ContactProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setIsSubmitting(true)

    try {
      await fetch('https://script.google.com/macros/s/AKfycbz3qBKN1XgHyXOGxGCB_oXicB7kRAth7KB2SbUMLvvCFMyxTbl-OX__Sbv3Bein3_5QlA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })

      // Reset form
      setName('')
      setEmail('')
      setMessage('')

      // Trigger toast
      onSubmitSuccess()
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="section-rule"></div>
        <p className="section-label">Contact</p>
        <div className={styles.contactInner}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formField}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-label="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                aria-label="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <p className={styles.privacyNote}>
              Your information is held in confidence and used solely to respond to your inquiry.
            </p>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
