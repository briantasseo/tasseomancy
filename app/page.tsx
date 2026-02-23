'use client'

import { useState, useEffect } from 'react'
import ConstellationBg from '@/components/ConstellationBg'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Toast from '@/components/Toast'

export default function Home() {
  const [showToast, setShowToast] = useState(false)

  const toggleTheme = () => {
    document.documentElement.classList.toggle('night-mode')
  }

  const handleFormSubmit = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <>
      <ConstellationBg />
      <Nav onLogoClick={toggleTheme} />
      <Hero />
      <Contact onSubmitSuccess={handleFormSubmit} />
      <Footer />
      <Toast message="Message received. We'll be in touch." show={showToast} />
    </>
  )
}
