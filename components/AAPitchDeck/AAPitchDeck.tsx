'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import s from './AAPitchDeck.module.css'

const TOTAL_SLIDES = 22

export default function AAPitchDeck() {
  const [current, setCurrent] = useState(0)
  const presentationRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(0)

  const goTo = useCallback(
    (direction: 'next' | 'prev') => {
      let next = currentRef.current
      if (direction === 'next' && next < TOTAL_SLIDES - 1) next = next + 1
      else if (direction === 'prev' && next > 0) next = next - 1
      currentRef.current = next
      setCurrent(next)
      // Pause all videos and reset play buttons when navigating
      if (presentationRef.current) {
        presentationRef.current.querySelectorAll(`.${s.videoWrap}`).forEach((wrap) => {
          const v = wrap.querySelector('video') as HTMLVideoElement
          if (v) v.pause()
          wrap.classList.remove(s.videoPlaying)
        })
      }
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
          <h1 className={`${s.h1} ${s.accent}`}>Tasseomancy &times; Farseer Trilogy</h1>
          <p className={s.subtitle}>Bringing the Realm of the Elderlings to the Screen &mdash; The Right Way</p>
        </div>
      </div>

      {/* Slide 2: The Opportunity */}
      <div className={slideClass(1)}>
        <div className={s.slideContent} style={{ alignItems: 'center', textAlign: 'center' }}>
          <h3 className={s.h3}>THE OPPORTUNITY</h3>
          <h2 className={s.h2}>A World Waiting for the Screen</h2>
          <div className={s.statsGrid}>
            <div className={s.statCard}>
              <div className={s.statNumber}>10M+</div>
              <div className={s.statLabel}>Copies Sold Worldwide</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statNumber}>22+</div>
              <div className={s.statLabel}>Languages Published</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statNumber}>30+</div>
              <div className={s.statLabel}>Years of Devoted Fandom</div>
            </div>
          </div>
          <p className={s.quote} style={{ textAlign: 'center', borderLeft: 'none', paddingLeft: 0, maxWidth: '100%' }}>
            A royal bastard, forbidden magic, and one of fantasy&apos;s most beloved trilogies &mdash; 3 novels, 850k+ Goodreads ratings, and no film/TV adaptation yet.
          </p>
        </div>
      </div>

      {/* Slide 3: The Problem */}
      <div className={slideClass(2)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>Big Hollywood Studio:</h3>
          <h2 className={s.h2}>The Wrong Model for This Story</h2>
          <div className={s.statsGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className={s.statCard}>
              <div className={s.statNumber}>$65M+</div>
              <div className={s.statLabel}>Average Feature Film Budget</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statNumber}>2.5-5+ yrs</div>
              <div className={s.statLabel}>Average Development Time</div>
            </div>
          </div>
          <p className={s.quote} style={{ textAlign: 'center', borderLeft: 'none', paddingLeft: 0, maxWidth: '100%' }}>
            The Farseer Trilogy demands Buckkeep Castle, telepathic Skill-magic, the terror of the Forged Ones, stone dragons, and Fitz&apos;s forbidden Wit&mdash;a bond-magic audiences can feel. Hollywood says &ldquo;too expensive.&rdquo; We say &ldquo;not anymore.&rdquo;
          </p>
        </div>
      </div>

      {/* Slide 4: Commitment */}
      <div className={slideClass(3)}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h1 className={s.h1} style={{ textAlign: 'center', maxWidth: 900 }}>
            With capital ready to go, we are 100% positive that this movie will be fully produced
          </h1>
        </div>
      </div>

      {/* Slide 5: The Shift */}
      <div className={slideClass(4)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE SHIFT IS HERE</h3>
          <h2 className={s.h2} style={{ textDecoration: 'underline', textUnderlineOffset: '6px' }}>AI Changes Everything</h2>
          <p className={s.p} style={{ marginBottom: '1rem', maxWidth: '100%' }}>
            The effects and locations which would have cost $50M+ to make for Assassin&apos;s Apprentice, we can make for <span style={{ textDecoration: 'underline', textDecorationColor: 'var(--accent)', textUnderlineOffset: '4px' }}>$500k</span>
          </p>
          <div className={s.cardGrid}>
            <div className={s.card}>
              <div className={s.cardTitle}>The Wit &amp; the Skill</div>
              <div className={s.cardDesc}>Visualize telepathic bonds, Skill-currents, and the Wit&apos;s animal connection &mdash; interior magic made cinematic through AI</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>The Six Duchies</div>
              <div className={s.cardDesc}>Buckkeep Castle, the Mountain Kingdom, the coastal duchies, the Red Ship raids &mdash; vast world-building realized without location budgets</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Stone Dragons &amp; the Skill</div>
              <div className={s.cardDesc}>Ancient stone dragons, the Skill-river, Forging rituals, wolf-bonded Wit magic &mdash; impossible VFX made routine at a fraction of the cost</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>1/100th the Cost</div>
              <div className={s.cardDesc}>Feature-quality production for 500K instead of the tens of millions a VFX-heavy fantasy traditionally demands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 6: Who We Are */}
      <div className={slideClass(5)}>
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

      {/* Slide 7: Why Are We Unique */}
      <div className={slideClass(6)}>
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
            We&apos;ve built and scaled a tech company at the frontier of AI. We know how to execute &mdash; and have the capital relationships to do it.
          </p>
        </div>
      </div>

      {/* Slide 8: The Vision */}
      <div className={slideClass(7)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>THE VISION</h3>
          <h2 className={s.h2}>The Farseer Trilogy on Screen</h2>
          <p className={s.p} style={{ marginBottom: '1.5rem' }}>Starting with the trilogy that launched it all &mdash; three films that introduce the world and prove the franchise.</p>
          <div className={s.cardGrid}>
            <div className={s.card}>
              <div className={s.cardTitle}>Film 1: Assassin&apos;s Apprentice</div>
              <div className={s.cardDesc}>A royal bastard raised in secret, trained as an assassin, bonded to a wolf &mdash; while a conspiracy of Red Ship Raiders threatens the Six Duchies. Coming-of-age / political thriller.</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Film 2: Royal Assassin</div>
              <div className={s.cardDesc}>Fitz returns to Buckkeep as the kingdom fractures. Prince Regal schemes for the throne while the Red Ships turn coastal villagers into mindless Forged ones. Betrayal / siege.</div>
            </div>
            <div className={s.card} style={{ gridColumn: '1 / -1', maxWidth: '50%', justifySelf: 'center' }}>
              <div className={s.cardTitle}>Film 3: Assassin&apos;s Quest</div>
              <div className={s.cardDesc}>Left for dead, Fitz embarks on an epic journey to find King Verity and the legendary stone dragons. A quest across the wilderness to save everything he loves.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 9: AI Question */}
      <div className={slideClass(8)}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h1 className={s.h1} style={{ textAlign: 'center', maxWidth: 900 }}>
            How can we utilize AI to make this movie amazing and profitable?
          </h1>
        </div>
      </div>

      {/* Slide 10: AI Realism — Character Showcase */}
      <div className={slideClass(9)}>
        <div className={s.slideContent} style={{ height: '100%', maxHeight: 'calc(100vh - 110px)' }}>
          <h2 className={s.h2} style={{ textAlign: 'center', maxWidth: 800, alignSelf: 'center' }}>
            AI Creation Is Nearly Indistinguishable<br />from Real Human Creation
          </h2>
          <div className={s.characterShowcase}>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/aa/young-fitz_portrait_v2.png" alt="Young Fitz" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>Young Fitz</div>
                <div className={s.charRole}>The Royal Bastard</div>
              </div>
            </div>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/aa/chade-fallstar_portrait_v2.png" alt="Chade Fallstar" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>Chade Fallstar</div>
                <div className={s.charRole}>The Royal Spymaster</div>
              </div>
            </div>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/aa/prince-verity_portrait_v2.png" alt="Prince Verity" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>Prince Verity</div>
                <div className={s.charRole}>The Skill-User Prince</div>
              </div>
            </div>
            <div className={s.characterCard}>
              <div className={s.charImgWrap}>
                <img src="/_m/aa/the-fool_portrait_v2.png" alt="The Fool" />
              </div>
              <div className={s.charInfo}>
                <div className={s.charName}>The Fool</div>
                <div className={s.charRole}>The King&apos;s Jester</div>
              </div>
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '1.25rem', textDecoration: 'underline', textUnderlineOffset: '6px', maxWidth: '100%' }}>
            Every image on this slide was generated entirely by AI.
          </p>
          <p className={s.p} style={{ textAlign: 'center', maxWidth: '100%', fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            *We still plan to utilize real human talent for lead roles
          </p>
        </div>
      </div>

      {/* Slide 11: Visual Potential — Image Gallery */}
      <div className={slideClass(10)}>
        <div className={s.slideContent} style={{ height: '100%', maxHeight: 'calc(100vh - 110px)' }}>
          <h3 className={s.h3}>VISUAL POTENTIAL</h3>
          <h2 className={s.h2}>A World Built for AI</h2>
          <div className={s.visualGallery}>
            <div className={`${s.galleryItem} ${s.spanWide}`} data-label="Buckkeep from the Sea">
              <img src="/_m/aa/buckkeep-from-the-sea_establishing-shot.png" alt="Buckkeep from the Sea" />
            </div>
            <div className={s.galleryItem} data-label="The Forging at Forge">
              <img src="/_m/aa/the-forging-at-forge_establishing-shot.png" alt="The Forging at Forge" />
            </div>
            <div className={s.galleryItem} data-label="Chade's Laboratory">
              <img src="/_m/aa/chades-secret-laboratory_mood-shot.png" alt="Chade's Secret Laboratory" />
            </div>
            <div className={s.galleryItem} data-label="The Mountain Kingdom">
              <img src="/_m/aa/mountain-kingdom-jhaampe_establishing-shot.png" alt="The Mountain Kingdom - Jhaampe" />
            </div>
            <div className={s.galleryItem} data-label="Verity Skilling">
              <img src="/_m/aa/verity-skilling-blue-energy_mood-shot.png" alt="Verity Skilling - Blue Energy" />
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '1.35rem' }}>
            Buckkeep Castle. The Six Duchies. Chade&apos;s Laboratory. The Forged Ones. All built in AI.
          </p>
        </div>
      </div>

      {/* Slide 12: AI Showcase Reel */}
      <div className={slideClass(11)}>
        <div className={s.slideContent} style={{ alignItems: 'center' }}>
          <h3 className={s.h3}>AI IN ACTION</h3>
          <h2 className={s.h2}>What AI Production Looks Like Today</h2>
          <div className={s.videoWrap} onClick={(e) => { const v = (e.currentTarget.querySelector('video') as HTMLVideoElement); v.play().catch(() => {}); e.currentTarget.classList.add(s.videoPlaying); }}>
            <video className={s.videoEmbed} muted loop playsInline preload="metadata" data-slide-video src="/_m/aa/ssstwitter.com_1772379510620.mp4" />
            <div className={s.playBtn}>&#9654;</div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center' }}>
            We can make this high quality of cinema with AI right now
          </p>
        </div>
      </div>

      {/* Slide 13: AI Showcase Reel 2 */}
      <div className={slideClass(12)}>
        <div className={s.slideContent} style={{ alignItems: 'center' }}>
          <h3 className={s.h3}>AI IN ACTION</h3>
          <h2 className={s.h2}>The Possibilities Are Limitless</h2>
          <div className={s.videoWrap} onClick={(e) => { const v = (e.currentTarget.querySelector('video') as HTMLVideoElement); v.play().catch(() => {}); e.currentTarget.classList.add(s.videoPlaying); }}>
            <video className={s.videoEmbed} muted loop playsInline preload="metadata" data-slide-video src="/_m/aa/ssstwitter.com_1772379734232.mp4" />
            <div className={s.playBtn}>&#9654;</div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center' }}>
            Cinematic quality. Zero physical production. This is the future &mdash; and it&apos;s ready now.
          </p>
        </div>
      </div>

      {/* Slide 14: AI Showcase Reel 3 */}
      <div className={slideClass(13)}>
        <div className={s.slideContent} style={{ alignItems: 'center' }}>
          <h3 className={s.h3}>AI IN ACTION</h3>
          <h2 className={s.h2}>Every World Within Reach</h2>
          <div className={s.videoWrap} onClick={(e) => { const v = (e.currentTarget.querySelector('video') as HTMLVideoElement); v.play().catch(() => {}); e.currentTarget.classList.add(s.videoPlaying); }}>
            <video className={s.videoEmbed} muted loop playsInline preload="metadata" data-slide-video src="/_m/aa/ssstwitter.com_1772379382417.mp4" />
            <div className={s.playBtn}>&#9654;</div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center' }}>
            Buckkeep Castle. The Mountain Kingdom. The Red Ship coast. No set too ambitious, no world too complex.
          </p>
        </div>
      </div>

      {/* Slide 15: Production Pipeline */}
      <div className={slideClass(14)}>
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
              <div className={s.pipelineStepDesc}>We produce the movie with the help of AI</div>
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
              <div className={s.cardDesc}>We use real acting from the lead actors and can use digital actors for the rest</div>
            </div>
            <div className={s.card}>
              <div className={s.cardTitle}>Full Post-Production</div>
              <div className={s.cardDesc}>VFX, sound design, and score &mdash; all integrated in the AI pipeline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 16: A-List Talent */}
      <div className={slideClass(15)}>
        <div className={s.slideContent}>
          <h3 className={s.h3}>WHY A-LIST TALENT?</h3>
          <h2 className={s.h2}>With Our Model, Our Budget Can Go to A+ Talent</h2>
          <ul className={s.featureList}>
            <li><strong>Credibility</strong> &mdash; Known names attract audiences, press, and distribution deals</li>
            <li><strong>Creative Excellence</strong> &mdash; Top talent as creative directors, not labor</li>
            <li><strong>Efficient Engagement</strong> &mdash; Days of direction, not months on set</li>
            <li><strong>New Revenue Stream</strong> &mdash; Talent participates without grueling schedules</li>
          </ul>
          <p className={s.quote}>Directors direct. Writers write. Actors act. AI executes.</p>
        </div>
      </div>

      {/* Slide 17: Deal Structure — Option & Purchase */}
      <div className={slideClass(16)}>
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
                    <td style={{ fontSize: '1rem' }}>Exclusive option for all rights for the Farseer Trilogy other than Reserved Rights</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Initial Term</td>
                    <td style={{ fontSize: '1rem' }}><strong>18 months</strong></td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Paid Extension</td>
                    <td style={{ fontSize: '1rem' }}><strong>18 months</strong> (36-month total cap)</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Option Fee (signing)</td>
                    <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>$150K</strong> (creditable against purchase price)</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Extension Fee</td>
                    <td style={{ fontSize: '1rem' }}><strong>$80K</strong> (non-creditable)</td>
                  </tr>
                  <tr>
                    <td className={s.mutedCell}>Reserved Rights</td>
                    <td style={{ fontSize: '1rem' }}>Publishing Rights, Future Literary Works, Live Stage Rights, Underlying Copyright</td>
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

      {/* Slide 18: Deal Structure — Sequels */}
      <div className={slideClass(17)}>
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
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Royal Assassin</span>
                </td>
                <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>$1M</strong></td>
                <td style={{ fontSize: '1rem' }}><strong>10% of Net Profit</strong></td>
                <td style={{ fontSize: '0.9rem' }}>24 mo. after Movie #1 release</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1rem' }}>
                  <strong>Movie #3</strong><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Assassin&apos;s Quest</span>
                </td>
                <td style={{ fontSize: '1rem' }}><strong className={s.highlight}>$1M</strong></td>
                <td style={{ fontSize: '1rem' }}><strong>10% of Net Profit</strong></td>
                <td style={{ fontSize: '0.9rem' }}>18 mo. after Movie #2 exercise</td>
              </tr>
            </tbody>
          </table>
          <p className={s.p} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            If window is missed, sequel rights revert / become non-exclusive.
          </p>
        </div>
      </div>

      {/* Slide 19: Backend & Bonuses */}
      <div className={slideClass(18)}>
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
                <li>&rarr; Defined no less favorably than producer&apos;s definition, no Hollywood tricks</li>
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
                <li>&rarr; On-screen: <strong>&ldquo;Based on the novels by Robin Hobb&rdquo;</strong></li>
                <li>&rarr; Good-faith consultation on outline/drafts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 20: Movie Budget */}
      <div className={slideClass(19)}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h3 className={s.h3}>THE BUDGET</h3>
          <h2 className={s.h2}>We&apos;re Ready to Deploy Capital</h2>
          <div className={s.statsGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '2rem', maxWidth: 800 }}>
            <div className={s.statCard} style={{ padding: '2rem' }}>
              <div className={s.statNumber}>$10M+</div>
              <div className={s.statLabel} style={{ fontSize: '1.05rem', marginTop: '0.75rem' }}>
                For top-tier talent<br />Director, writers, and actors
              </div>
            </div>
            <div className={s.statCard} style={{ padding: '2rem' }}>
              <div className={s.statNumber}>$5M+</div>
              <div className={s.statLabel} style={{ fontSize: '1.05rem', marginTop: '0.75rem' }}>
                For AI production costs,<br />legal, compliance, and other
              </div>
            </div>
          </div>
          <p className={s.tagline} style={{ textAlign: 'center', maxWidth: '100%', marginTop: '2rem', fontSize: '1.3rem', textDecoration: 'underline', textUnderlineOffset: '6px' }}>
            We already have the investors, and we can attract top-tier talent using similar backend upside economics.
          </p>
        </div>
      </div>

      {/* Slide 21: Sample Author Outcome */}
      <div className={slideClass(20)}>
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
          <div style={{ textAlign: 'center', maxWidth: 800, alignSelf: 'center', marginTop: '1.25rem' }}>
            <p className={s.tagline} style={{ maxWidth: '100%', marginTop: 0, fontSize: '1.15rem' }}>
              This is just Book 1. With three novels in the trilogy, the total upside is significantly greater.
            </p>
            <p className={s.p} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', fontStyle: 'italic', maxWidth: '100%' }}>
              Our net profit definition is your net profit definition. If you don&apos;t make money, we don&apos;t make money.
            </p>
          </div>
        </div>
      </div>

      {/* Slide 22: Closing */}
      <div className={`${slideClass(21)} ${s.titleSlide}`}>
        <div className={s.slideContent} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h2 className={s.h2} style={{ fontSize: '2rem', marginBottom: '2rem' }}>Let&apos;s Bring the Farseer Trilogy to Life</h2>
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
