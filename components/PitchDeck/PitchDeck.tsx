'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import s from './PitchDeck.module.css'

const TOTAL_SLIDES = 23

export default function PitchDeck() {
  const [current, setCurrent] = useState(0)
  const presentationRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (direction: 'next' | 'prev') => {
      setCurrent((c) => {
        if (direction === 'next' && c < TOTAL_SLIDES - 1) return c + 1
        if (direction === 'prev' && c > 0) return c - 1
        return c
      })
    },
    []
  )

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goTo('next')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo('prev')
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [goTo])

  // Touch/swipe
  useEffect(() => {
    let startX = 0
    function onStart(e: TouchEvent) {
      startX = e.changedTouches[0].screenX
    }
    function onEnd(e: TouchEvent) {
      const diff = startX - e.changedTouches[0].screenX
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? 'next' : 'prev')
      }
    }
    document.addEventListener('touchstart', onStart)
    document.addEventListener('touchend', onEnd)
    return () => {
      document.removeEventListener('touchstart', onStart)
      document.removeEventListener('touchend', onEnd)
    }
  }, [goTo])

  // Auto-scale slide content
  useEffect(() => {
    function scale() {
      if (!presentationRef.current) return
      const slides = presentationRef.current.querySelectorAll(`.${s.slide}`)
      slides.forEach((slide) => {
        const content = slide.querySelector(`.${s.slideContent}`) as HTMLElement
        if (!content) return
        content.style.transform = 'none'
        const slideH = (slide as HTMLElement).clientHeight
        const contentH = content.scrollHeight
        if (contentH > slideH) {
          const sc = (slideH / contentH) * 0.97
          content.style.transform = `scale(${sc})`
          content.style.transformOrigin = 'top center'
        }
      })
    }
    document.fonts.ready.then(scale)
    window.addEventListener('resize', scale)
    return () => window.removeEventListener('resize', scale)
  }, [])

  function slideClass(index: number) {
    const classes = [s.slide]
    if (index === current) classes.push(s.slideActive)
    else if (index < current) classes.push(s.slidePrev)
    return classes.join(' ')
  }

  const progress = ((current + 1) / TOTAL_SLIDES) * 100

  return (
    <div className={s.presentation} ref={presentationRef}>
      <div className={s.progressBar} style={{ width: `${progress}%` }} />
      <div className={s.logo}>TASSEOMANCY</div>

      {/* Slide 1: Title */}
      <div className={`${slideClass(0)} ${s.titleSlide}`}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h3 className={s.h3} style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>A Partnership Proposal</h3>
          <h1 className={`${s.h1} ${s.accent}`}>Tasseomancy &times; Bartimaeus</h1>
          <p className={s.subtitle}>Bringing Bartimaeus to the Screen &mdash; The Right Way</p>
        </div>
      </div>

      {/* Slide 2: The Opportunity */}
      <div className={slideClass(1)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE OPPORTUNITY</h3>
          <h2 className={s.h2}>A World Waiting for the Screen</h2>
          <div className={s.statsGrid}>
            <div className={s.statCard}>
              <div className={s.statNumber}>6M+</div>
              <div className={s.statLabel}>Copies Sold Worldwide</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statNumber}>36</div>
              <div className={s.statLabel}>Languages Published</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statNumber}>20+</div>
              <div className={s.statLabel}>Years of Devoted Fandom</div>
            </div>
          </div>
          <p className={s.quote} style={{ textAlign: 'center', borderLeft: 'none', paddingLeft: 0, maxWidth: '100%' }}>
            A five-thousand-year-old djinni, an alternate magical London, and one of the most beloved fantasy series ever written &mdash; still without a screen adaptation.
          </p>
        </div>
      </div>

      {/* Slide 3: The History */}
      <div className={slideClass(2)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE HISTORY</h3>
          <h2 className={s.h2}>Two Decades of False Starts</h2>
          <div className={s.timeline}>
            <div className={s.timelineItem}>
              <div className={`${s.timelineDot} ${s.timelineDotFaded}`} />
              <div className={`${s.timelineYear} ${s.timelineYearFaded}`}>2002</div>
              <div className={s.timelineDesc}>Miramax acquires film rights as their &ldquo;next Lord of the Rings&rdquo;</div>
              <span className={`${s.timelineStatus} ${s.timelineStatusFailed}`}>Rights Lapsed</span>
            </div>
            <div className={s.timelineItem}>
              <div className={`${s.timelineDot} ${s.timelineDotFaded}`} />
              <div className={`${s.timelineYear} ${s.timelineYearFaded}`}>2005</div>
              <div className={s.timelineDesc}>Anthony Minghella attached to direct &mdash; Weinstein exit derails project</div>
              <span className={`${s.timelineStatus} ${s.timelineStatusFailed}`}>Collapsed</span>
            </div>
            <div className={s.timelineItem}>
              <div className={`${s.timelineDot} ${s.timelineDotFaded}`} />
              <div className={`${s.timelineYear} ${s.timelineYearFaded}`}>2019</div>
              <div className={s.timelineDesc}>Start Media options film &amp; TV rights &mdash; no visible progress since</div>
              <span className={`${s.timelineStatus} ${s.timelineStatusStalled}`}>Stalled</span>
            </div>
            <div className={s.timelineItem}>
              <div className={s.timelineDot} />
              <div className={s.timelineYear}>Now</div>
              <div className={s.timelineDesc}>Tasseomancy Studios &mdash; a new model built for exactly this moment</div>
              <span className={`${s.timelineStatus} ${s.timelineStatusNow}`}>Ready</span>
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', maxWidth: '100%', width: '100%', alignSelf: 'center', textDecoration: 'underline', textUnderlineOffset: '6px' }}>
            It&apos;s time for us to really make this happen.
          </p>
        </div>
      </div>

      {/* Slide 4: The Problem */}
      <div className={slideClass(3)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>WHY HOLLYWOOD KEEPS FAILING</h3>
          <h2 className={s.h2}>The Wrong Model for This Story</h2>
          <div className={s.statsGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className={s.statCard}>
              <div className={s.statNumber}>$65M+</div>
              <div className={s.statLabel}>Average Feature Film Budget</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statNumber}>5+ yrs</div>
              <div className={s.statLabel}>Average Development Time</div>
            </div>
          </div>
          <p className={s.quote} style={{ textAlign: 'center', borderLeft: 'none', paddingLeft: 0, maxWidth: '100%' }}>
            Bartimaeus demands shape-shifting djinn, an alternate magical London, ancient civilizations, and epic magical battles. Hollywood says &ldquo;too expensive.&rdquo; We say &ldquo;not anymore.&rdquo;
          </p>
        </div>
      </div>

      {/* Slide 5: Commitment */}
      <div className={slideClass(4)}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h1 className={s.h1} style={{ textAlign: 'center', maxWidth: 900 }}>
            With already committed capital, we are 100% positive that this movie will be fully produced within 2 years
          </h1>
        </div>
      </div>

      {/* Slide 6: The Shift */}
      <div className={slideClass(5)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE SHIFT IS HERE</h3>
          <h2 className={s.h2} style={{ textDecoration: 'underline', textUnderlineOffset: '6px' }}>AI Changes Everything</h2>
          <p className={s.p} style={{ marginBottom: '1rem', maxWidth: '100%' }}>
            What would have cost $50M+ to make for Bartimaeus, we can make for <span style={{ textDecoration: 'underline', textDecorationColor: 'var(--accent)', textUnderlineOffset: '4px' }}>$500k</span>
          </p>
          <div className={s.cardGrid}>
            <div className={s.card}>
              <div className={s.cardTitle}>Photorealistic Djinn</div>
              <div className={s.cardDesc}>Shape-shifting entities rendered in cinematic quality &mdash; Bartimaeus in all his forms, from Egyptian boy to serpent to roc</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Alternate London</div>
              <div className={s.cardDesc}>A magician-ruled London, Parliament of sorcerers, enchanted architecture &mdash; built entirely in AI</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Unlimited Scale</div>
              <div className={s.cardDesc}>Ancient Alexandria, Solomon&apos;s Jerusalem, the Other Place &mdash; no location budget limits</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>1/100th the Cost</div>
              <div className={s.cardDesc}>Feature-quality production for 500K instead of the tens of millions a VFX-heavy fantasy traditionally demands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 7: Who We Are */}
      <div className={slideClass(6)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>WHO WE ARE</h3>
          <h2 className={s.h2}>Tasseomancy Studios</h2>
          <p className={s.subtitle} style={{ fontSize: '1.25rem' }}>Full-service AI film production that puts creators first.</p>
          <ul className={s.featureList}>
            <li><strong>Partner directly with authors and IP holders</strong> &mdash; not through layers of studio bureaucracy</li>
            <li><strong>Attach A-list talent as creative leads</strong> &mdash; Use the budget that would have gone to VFX to attract the best director, writer, and lead actor possible</li>
            <li className={s.highlight}><strong>Execute production using AI</strong> &mdash; at 1/100th the cost of traditional filmmaking</li>
            <li className={s.highlight}><strong>Deliver feature-quality films cost effectively so creators enjoy more upside</strong> &mdash; we can deliver a much higher backend upside since we have lower cost structure</li>
          </ul>
        </div>
      </div>

      {/* Slide 8: Why Are We Unique */}
      <div className={slideClass(7)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>WHY ARE WE UNIQUE?</h3>
          <h2 className={s.h2}>Built for This Moment</h2>
          <div className={s.foundersRow}>
            <div className={s.founderCol}>
              <Image className={s.founderPhoto} src="/_m/h/Brian Headshot.jpeg" alt="Brian Zitin" width={160} height={160} />
              <div className={s.founderName}>Brian Zitin</div>
              <div className={s.founderTitle}>Co-Founder</div>
            </div>
            <div className={s.founderCol}>
              <Image className={s.founderPhoto} src="/_m/h/will headshot.jpeg" alt="Will Denslow" width={160} height={160} />
              <div className={s.founderName}>Will Denslow</div>
              <div className={s.founderTitle}>Co-Founder</div>
            </div>
          </div>
          <ul className={s.founderBullets} style={{ marginTop: '1.25rem', maxWidth: 800, alignSelf: 'center' }}>
            <li>Co-built a multi-hundred-million dollar technology company from the ground up</li>
            <li>Deep operational expertise at the frontier of AI technology</li>
            <li>Proven track record scaling technology-driven businesses</li>
            <li>Have raised $100M+ in equity and debt through successful institutional partnerships</li>
          </ul>
          <p className={s.tagline} style={{ textAlign: 'center', maxWidth: '100%', marginTop: '1rem', fontSize: '1.2rem' }}>
            We&apos;ve built and scaled a tech company at the frontier of AI. We know how to execute &mdash; and we know how to get it funded.
          </p>
        </div>
      </div>

      {/* Slide 9: The Vision */}
      <div className={slideClass(8)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE VISION</h3>
          <h2 className={s.h2}>Bartimaeus on Screen</h2>
          <p className={s.p} style={{ marginBottom: '1.5rem' }}>A four-film franchise &mdash; three core trilogy films plus a standalone prequel.</p>
          <div className={s.cardGrid}>
            <div className={s.card}>
              <div className={s.cardTitle}>Film 1: The Amulet of Samarkand</div>
              <div className={s.cardDesc}>Young Nathaniel summons a 5,000-year-old djinni for revenge &mdash; and stumbles into a conspiracy that could topple the government. Dark fantasy / political thriller.</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Film 2: The Golem&apos;s Eye</div>
              <div className={s.cardDesc}>Nathaniel climbs the ranks while a clay golem terrorizes London and the Resistance grows. Introduces Kitty Jones. Action / mystery.</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Film 3: Ptolemy&apos;s Gate</div>
              <div className={s.cardDesc}>The trilogy&apos;s epic conclusion &mdash; a demonic conspiracy, ancient secrets, and a sacrifice that redefines the relationship between humans and spirits.</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Prequel: The Ring of Solomon</div>
              <div className={s.cardDesc}>Bartimaeus in ancient Jerusalem, serving King Solomon. A standalone adventure ripe for expansion. Adventure / mythology.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 10: AI Question */}
      <div className={slideClass(9)}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h1 className={s.h1} style={{ textAlign: 'center', maxWidth: 900 }}>
            How can we utilize AI to make this movie amazing and profitable?
          </h1>
        </div>
      </div>

      {/* Slide 11: AI Realism */}
      <div className={slideClass(10)}>
        <div className={s.slideContent} style={{ height: '100%', maxHeight: 'calc(100vh - 110px)' }}>
          <h2 className={s.h2} style={{ textAlign: 'center', maxWidth: 800, alignSelf: 'center' }}>
            AI Creation Is Nearly Indistinguishable<br />from Real Human Creation
          </h2>
          <div className={s.characterShowcase}>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/b/bartimaeus_as_ptolemy_portrait.png" alt="Bartimaeus" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>Bartimaeus</div>
                <div className={s.charRole}>5,000-year-old Djinni</div>
              </div>
            </div>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/b/nathaniel_portrait.png" alt="Young Nathaniel" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>Nathaniel</div>
                <div className={s.charRole}>The Boy Who Summoned a Djinni</div>
              </div>
            </div>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/b/john-mandrake_portrait.png" alt="John Mandrake" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>John Mandrake</div>
                <div className={s.charRole}>Magician &amp; Politician</div>
              </div>
            </div>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/b/kitty-jones_portrait.png" alt="Kitty Jones" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>Kitty Jones</div>
                <div className={s.charRole}>Leader of the Resistance</div>
              </div>
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '1.25rem', textDecoration: 'underline', textUnderlineOffset: '6px', maxWidth: '100%' }}>
            Every image on this slide was generated entirely by AI.
          </p>
        </div>
      </div>

      {/* Slide 12: Visual Potential */}
      <div className={slideClass(11)}>
        <div className={s.slideContent} style={{ height: '100%', maxHeight: 'calc(100vh - 110px)' }}>
          <h3 className={s.h3}>VISUAL POTENTIAL</h3>
          <h2 className={s.h2}>A World Built for AI</h2>
          <div className={s.visualGallery}>
            {/* Row 1 */}
            <div className={`${s.galleryItem} ${s.spanWide}`} data-label="Westminster — Sorcerous Power">
              <img src="/_m/b/westminster-sorcerous-power_establishing-shot.png" alt="Westminster Sorcerous Power" />
            </div>
            <div className={s.galleryItem} data-label="Seven Planes of London">
              <img src="/_m/b/seven-plane-london-street_establishing-shot.png" alt="Seven Plane London Street" />
            </div>
            <div className={s.galleryItem} data-label="Glass Palace — Magician's Estate">
              <img src="/_m/b/glass-palace-magician-estate_mood-shot.png" alt="Glass Palace Magician Estate" />
            </div>
            <div className={s.galleryItem} data-label="Search Spheres Over Westminster">
              <img src="/_m/b/search-spheres-over-westminster_establishing-shot.png" alt="Search Spheres Over Westminster" />
            </div>
            {/* Row 2 */}
            <div className={s.galleryItem} data-label="The Other Place">
              <img src="/_m/b/the-other-place-first-glimpse_establishing-shot.png" alt="The Other Place — First Glimpse" />
            </div>
            <div className={s.galleryItem} data-label="Whitehall — Magicians' Quarter">
              <img src="/_m/b/whitehall-magicians-quarter_mood-shot.png" alt="Whitehall Magicians Quarter" />
            </div>
            <div className={`${s.galleryItem} ${s.spanWide}`} data-label="Ptolemy's Alexandria — Great Library">
              <img src="/_m/b/ptolemy-alexandria-great-library_establishing-shot.png" alt="Ptolemy Alexandria Great Library" />
            </div>
            <div className={s.galleryItem} data-label="Solomon's Jerusalem">
              <img src="/_m/b/solomon-jerusalem_establishing-shot.png" alt="Solomon&apos;s Jerusalem" />
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '1.35rem' }}>
            Magical London. Ancient Alexandria. Solomon&apos;s Jerusalem. The Other Place. All built in AI.
          </p>
        </div>
      </div>

      {/* Slide 13: AI Showcase Reel */}
      <div className={slideClass(12)}>
        <div className={s.slideContent} style={{ alignItems: 'center' }}>
          <h3 className={s.h3}>AI IN ACTION</h3>
          <h2 className={s.h2}>What AI Production Looks Like Today</h2>
          <video className={s.videoEmbed} autoPlay muted loop playsInline>
            <source src="/_m/v/ssstwitter.com_1772379510620.mp4" type="video/mp4" />
          </video>
          <p className={s.tagline} style={{ textAlign: 'center' }}>
            This is where AI filmmaking is now. Imagine where it will be when we start production.
          </p>
        </div>
      </div>

      {/* Slide 14: AI Showcase Reel 2 */}
      <div className={slideClass(13)}>
        <div className={s.slideContent} style={{ alignItems: 'center' }}>
          <h3 className={s.h3}>AI IN ACTION</h3>
          <h2 className={s.h2}>The Possibilities Are Limitless</h2>
          <video className={s.videoEmbed} autoPlay muted loop playsInline>
            <source src="/_m/v/ssstwitter.com_1772379734232.mp4" type="video/mp4" />
          </video>
          <p className={s.tagline} style={{ textAlign: 'center' }}>
            Cinematic quality. Zero physical production. This is the future &mdash; and it&apos;s ready now.
          </p>
        </div>
      </div>

      {/* Slide 15: AI Showcase Reel 3 */}
      <div className={slideClass(14)}>
        <div className={s.slideContent} style={{ alignItems: 'center' }}>
          <h3 className={s.h3}>AI IN ACTION</h3>
          <h2 className={s.h2}>Every World Within Reach</h2>
          <video className={s.videoEmbed} autoPlay muted loop playsInline>
            <source src="/_m/v/ssstwitter.com_1772379382417.mp4" type="video/mp4" />
          </video>
          <p className={s.tagline} style={{ textAlign: 'center' }}>
            Ancient Alexandria. Magical London. The Other Place. No set too ambitious, no world too complex.
          </p>
        </div>
      </div>

      {/* Slide 16: Production Pipeline */}
      <div className={slideClass(15)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>HOW IT WORKS</h3>
          <h2 className={s.h2}>Our Production Pipeline</h2>
          <div className={s.pipeline}>
            <div className={s.pipelineStep}>
              <div className={s.pipelineStepNumber}>1</div>
              <div className={s.pipelineStepTitle}>Partner</div>
              <div className={s.pipelineStepDesc}>Collaborate with you on creative vision</div>
            </div>
            <div className={s.pipelineArrow}>&rarr;</div>
            <div className={s.pipelineStep}>
              <div className={s.pipelineStepNumber}>2</div>
              <div className={s.pipelineStepTitle}>Attach</div>
              <div className={s.pipelineStepDesc}>Bring in A-list writers, directors, actors</div>
            </div>
            <div className={s.pipelineArrow}>&rarr;</div>
            <div className={s.pipelineStep}>
              <div className={s.pipelineStepNumber}>3</div>
              <div className={s.pipelineStepTitle}>Produce</div>
              <div className={s.pipelineStepDesc}>AI handles all production</div>
            </div>
            <div className={s.pipelineArrow}>&rarr;</div>
            <div className={s.pipelineStep}>
              <div className={s.pipelineStepNumber}>4</div>
              <div className={s.pipelineStepTitle}>Distribute</div>
              <div className={s.pipelineStepDesc}>Streaming, theatrical, D2C</div>
            </div>
          </div>
          <div className={s.cardGrid}>
            <div className={s.card}>
              <div className={s.cardTitle}>Script-to-Scene</div>
              <div className={s.cardDesc}>AI generates cinematic scenes directly from screenplay &mdash; faithful to your world-building</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>AI Cinematography</div>
              <div className={s.cardDesc}>Perfect lighting, framing, and camera movement for every scene</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Digital Performance</div>
              <div className={s.cardDesc}>Emotionally authentic AI performances guided by A-list talent direction</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Full Post-Production</div>
              <div className={s.cardDesc}>VFX, sound design, and score &mdash; all integrated in the AI pipeline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 17: A-List Talent */}
      <div className={slideClass(16)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>WHY A-LIST TALENT?</h3>
          <h2 className={s.h2}>The Best of Both Worlds</h2>
          <div className={s.twoCol} style={{ gap: '2.5rem', alignItems: 'start' }}>
            <div>
              <ul className={s.featureList}>
                <li><strong>Credibility</strong> &mdash; Known names attract audiences, press, and distribution deals</li>
                <li><strong>Creative Excellence</strong> &mdash; Top talent as creative directors, not labor</li>
                <li><strong>Efficient Engagement</strong> &mdash; Days of direction, not months on set</li>
                <li><strong>New Revenue Stream</strong> &mdash; Talent participates without grueling schedules</li>
              </ul>
              <p className={s.quote}>Directors direct. Writers write. AI executes.</p>
            </div>
            <div className={s.targetBox}>
              <h3 className={s.targetHeading}>Who We Are Targeting</h3>
              <div className={s.targetRole}>
                <div className={s.targetRoleName}>Bartimaeus (Voice)</div>
                <div className={s.targetRoleActors}>Actors like: Benedict Cumberbatch, Tom Hiddleston</div>
              </div>
              <div className={s.targetRole}>
                <div className={s.targetRoleName}>Nathaniel</div>
                <div className={s.targetRoleActors}>Top-tier up-and-coming British theatre talent</div>
              </div>
              <div className={s.targetRole} style={{ marginBottom: 0 }}>
                <div className={s.targetRoleName}>Simon Lovelace</div>
                <div className={s.targetRoleActors}>Actors like: Harry Melling, Tom Blyth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 18: Deal Structure — Option & Purchase */}
      <div className={slideClass(17)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE DEAL &mdash; OPTION &amp; PURCHASE</h3>
          <h2 className={s.h2}>Economic Terms</h2>
          <div className={s.twoCol}>
            <div>
              <h3 className={s.h3} style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Option (Book 1 / Movie #1)</h3>
              <table className={`${s.comparisonTable} ${s.compactTable}`}>
                <tbody>
                  <tr>
                    <td className={s.mutedCell} style={{ width: '45%' }}>Structure</td>
                    <td style={{ fontSize: '1rem' }}>Exclusive option for Book 1 + exclusive sequel purchase rights for Books 2&ndash;4</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Initial Term</td>
                    <td style={{ fontSize: '1rem' }}><strong>18 months</strong></td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Paid Extension</td>
                    <td style={{ fontSize: '1rem' }}><strong>12 months</strong> (30-month total cap)</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Option Fee (signing)</td>
                    <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>$150K</strong> (creditable against purchase price)</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Extension Fee</td>
                    <td style={{ fontSize: '1rem' }}><strong>$80K</strong> (non-creditable)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className={s.h3} style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Purchase Price (Movie #1)</h3>
              <table className={`${s.comparisonTable} ${s.compactTable}`}>
                <tbody>
                  <tr>
                    <td className={s.mutedCell} style={{ width: '35%' }}>Base Price</td>
                    <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>$1.25M</strong></td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Lien Payback</td>
                    <td style={{ fontSize: '1rem' }}><strong>$2.2M</strong></td>
                  </tr>
                  <tr className={s.highlightRow}>
                    <td style={{ fontSize: '1rem' }}><strong>Total Price</strong></td>
                    <td style={{ fontSize: '1rem' }}><strong>$3.45M</strong></td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Upside</td>
                    <td style={{ fontSize: '1rem' }}><strong>10% of Net Profit</strong></td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Less</td>
                    <td style={{ fontSize: '1rem' }}>Credited initial option fee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 19: Deal Structure — Sequels */}
      <div className={slideClass(18)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE DEAL &mdash; SEQUELS</h3>
          <h2 className={s.h2}>Franchise Economics</h2>
          <table className={s.comparisonTable} style={{ marginTop: '1.5rem' }}>
            <thead>
              <tr>
                <th></th>
                <th>Price</th>
                <th>Participation</th>
                <th>Exercise Window</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: '1rem' }}>
                  <strong>Movie #2</strong><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>The Golem&apos;s Eye</span>
                </td>
                <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>50&ndash;60%</strong> of Movie #1 price</td>
                <td style={{ fontSize: '1rem' }}><strong>10% of Net Profit</strong></td>
                <td style={{ fontSize: '0.9rem' }}>24 mo. after Movie #1 release</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1rem' }}>
                  <strong>Movie #3</strong><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ptolemy&apos;s Gate</span>
                </td>
                <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>60&ndash;70%</strong> of Movie #1 price</td>
                <td style={{ fontSize: '1rem' }}><strong>10% of Net Profit</strong></td>
                <td style={{ fontSize: '0.9rem' }}>18 mo. after Movie #2 exercise</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1rem' }}>
                  <strong>Movie #4</strong><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>The Ring of Solomon</span>
                </td>
                <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>60&ndash;70%</strong> of Movie #1 price</td>
                <td style={{ fontSize: '1rem' }}><strong>10% of Net Profit</strong></td>
                <td style={{ fontSize: '0.9rem' }}>18 mo. after Movie #3 exercise</td>
              </tr>
            </tbody>
          </table>
          <p className={s.p} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            If window is missed, sequel rights revert / become non-exclusive.
          </p>
        </div>
      </div>

      {/* Slide 20: Backend & Bonuses */}
      <div className={slideClass(19)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>More About THE DEAL &mdash; BACKEND &amp; BONUSES</h3>
          <h2 className={s.h2}>Author Participation</h2>
          <div className={s.twoCol}>
            <div>
              <h3 className={s.h3} style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Net Proceeds &amp; Audit</h3>
              <div className={s.statCard} style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div className={s.statNumber} style={{ fontSize: '2.25rem' }}>10%</div>
                <div className={s.statLabel} style={{ fontSize: '1rem' }}>of 100% of Net Proceeds &mdash; paid pari passu with producer</div>
              </div>
              <ul className={s.arrowList}>
                <li>&rarr; Defined no less favorably than producer&apos;s definition</li>
                <li>&rarr; Standard audit rights on reasonable notice</li>
              </ul>
            </div>
            <div>
              <h3 className={s.h3} style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Bonuses</h3>
              <table className={`${s.comparisonTable} ${s.compactTable}`}>
                <tbody>
                  <tr>
                    <td className={s.mutedCell} style={{ width: '45%' }}>Production Start Bonus</td>
                    <td style={{ fontSize: '1rem' }}>
                      <strong className={s.highlight}>$100K</strong><br />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>per film, on first day of principal photography</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 className={s.h3} style={{ fontSize: '1.1rem', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Credit &amp; Consultation</h3>
              <ul className={s.arrowList}>
                <li>&rarr; On-screen: <strong>&ldquo;Based on the novels by Jonathan Stroud&rdquo;</strong></li>
                <li>&rarr; Good-faith consultation on outline/drafts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 21: Movie Budget */}
      <div className={slideClass(20)}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h3 className={s.h3}>THE BUDGET</h3>
          <h2 className={s.h2}>We&apos;re Ready to Deploy Capital</h2>
          <div className={s.statsGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '2rem', maxWidth: 800 }}>
            <div className={s.statCard} style={{ padding: '2rem' }}>
              <div className={s.statNumber}>$10M+</div>
              <div className={s.statLabel} style={{ fontSize: '1.05rem', marginTop: '0.75rem' }}>
                Committed to top-tier talent<br />Director, writers, and actors
              </div>
            </div>
            <div className={s.statCard} style={{ padding: '2rem' }}>
              <div className={s.statNumber}>$5M</div>
              <div className={s.statLabel} style={{ fontSize: '1.05rem', marginTop: '0.75rem' }}>
                Committed to AI production costs,<br />legal, compliance, and other
              </div>
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', maxWidth: '100%', marginTop: '2rem', fontSize: '1.3rem', textDecoration: 'underline', textUnderlineOffset: '6px' }}>
            We already have the investors, and we can attract top-tier talent using similar backend upside economics.
          </p>
        </div>
      </div>

      {/* Slide 22: Sample Author Outcome */}
      <div className={slideClass(21)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>WHAT THIS MEANS FOR YOU</h3>
          <h2 className={s.h2}>Sample Author Outcome &mdash; Book 1 Only</h2>
          <div className={s.twoCol} style={{ gap: '2rem', alignItems: 'start', marginTop: '1rem' }}>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem' }}>
              <h3 className={s.h3} style={{ marginBottom: '1rem' }}>Scenario 1: Streaming Sale</h3>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Net Profit: $50M</div>
              <table className={`${s.comparisonTable} ${s.compactTable}`}>
                <tbody>
                  <tr>
                    <td className={s.mutedCell} style={{ fontSize: '0.95rem' }}>Purchase Price</td>
                    <td className={s.rightCell}>$1,250,000</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell} style={{ fontSize: '0.95rem' }}>Production Bonus</td>
                    <td className={s.rightCell}>$100,000</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell} style={{ fontSize: '0.95rem' }}>10% of Net Profit</td>
                    <td className={s.rightCell}>$5,000,000</td>
                  </tr>
                </tbody>
              </table>
              <div className={s.statCard} style={{ marginTop: '1rem', padding: '1.25rem' }}>
                <div className={s.statNumber} style={{ fontSize: '2rem' }}>$6.35M</div>
                <div className={s.statLabel}>Total Author Payout</div>
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem' }}>
              <h3 className={s.h3} style={{ marginBottom: '1rem' }}>Scenario 2: Theatrical Release</h3>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Net Profit: $100M</div>
              <table className={`${s.comparisonTable} ${s.compactTable}`}>
                <tbody>
                  <tr>
                    <td className={s.mutedCell} style={{ fontSize: '0.95rem' }}>Purchase Price</td>
                    <td className={s.rightCell}>$1,250,000</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell} style={{ fontSize: '0.95rem' }}>Production Bonus</td>
                    <td className={s.rightCell}>$100,000</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell} style={{ fontSize: '0.95rem' }}>10% of Net Profit</td>
                    <td className={s.rightCell}>$10,000,000</td>
                  </tr>
                </tbody>
              </table>
              <div className={s.statCard} style={{ marginTop: '1rem', padding: '1.25rem' }}>
                <div className={s.statNumber} style={{ fontSize: '2rem' }}>$11.35M</div>
                <div className={s.statLabel}>Total Author Payout</div>
              </div>
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', maxWidth: '100%', marginTop: '1rem', fontSize: '1.15rem' }}>
            This is just Book 1. With three sequels and a prequel, the total upside across the full series is significantly greater.
          </p>
        </div>
      </div>

      {/* Slide 23: Closing */}
      <div className={`${slideClass(22)} ${s.titleSlide}`}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h2 className={s.h2} style={{ fontSize: '2rem', marginBottom: '2rem' }}>Let&apos;s Bring Bartimaeus to Life</h2>
          <h1 className={`${s.h1} ${s.accent}`}>Tasseomancy Studios</h1>
          <div style={{ marginTop: '3rem', color: 'var(--text-muted)' }}>
            <p className={s.p} style={{ margin: '0.5rem 0' }}>brian@tasseomancy.xyz</p>
            <p className={s.p} style={{ margin: '0.5rem 0' }}>610-999-3323</p>
            <p className={s.p} style={{ margin: '0.5rem 0' }}>tasseomancy.xyz</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={s.nav}>
        <button
          className={s.navBtn}
          onClick={() => goTo('prev')}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          &larr;
        </button>
        <span className={s.slideCounter}>
          {current + 1} / {TOTAL_SLIDES}
        </span>
        <button
          className={s.navBtn}
          onClick={() => goTo('next')}
          disabled={current === TOTAL_SLIDES - 1}
          aria-label="Next slide"
        >
          &rarr;
        </button>
      </nav>
    </div>
  )
}
