import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import {
  ArrowDownToLine,
  ChevronRight,
  CirclePlay,
  Flame,
  Gamepad2,
  Link as LinkIcon,
  ShieldAlert,
  Swords,
} from 'lucide-react'

import runnerPng from './assets/game/runner.png'
import survivorPng from './assets/game/survivor.png'
import gameLogoPng from './assets/game/GameLogo.png'
import posterPng from './assets/game/bulsuRUNposter.png'
import unityLogoPng from './assets/game/unityLOGO.png'

const GAME = {
  title: 'BULSU Run: AI Uprising',
  tagline: '',
  releaseDate: 'April 6, 2026',
}

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SectionHeading({ eyebrow, title, body, showUnity = false }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sand/30 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] text-sand/90 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-sand/80 shadow-[0_0_22px_rgba(205,139,85,0.6)]" />
        <span className="uppercase">{eyebrow}</span>
        {showUnity ? (
          <span className="inline-flex items-center rounded-md border border-white/10 bg-black/25 px-2 py-1">
            <img src={unityLogoPng} alt="Unity" className="h-3 w-3 opacity-90" loading="eager" />
          </span>
        ) : null}
      </div>
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body ? <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-ink/75 sm:text-base">{body}</p> : null}
    </div>
  )
}

function Reveal({ children, className, delay = 0, hover }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hover}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function Pill({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-ink/80 backdrop-blur">
      <Icon className="h-4 w-4 text-sand/90" />
      <span>{label}</span>
    </div>
  )
}

function App() {
  const nav = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'details', label: 'Details' },
      { id: 'journey', label: 'Journey' },
      { id: 'features', label: 'Gameplay' },
      { id: 'bosses', label: 'Bosses' },
      { id: 'poster', label: 'Poster' },
      { id: 'trailer', label: 'Trailer' },
      { id: 'download', label: 'Download' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  const videoRef = useRef(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [trailerMuted, setTrailerMuted] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onPlay = () => setVideoPlaying(true)
    const onPause = () => setVideoPlaying(false)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  // Parallax-ish hero motion.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const layerA = useTransform(mx, [-1, 1], [-18, 18])
  const layerB = useTransform(my, [-1, 1], [12, -12])
  const layerC = useTransform(mx, [-1, 1], [-8, 8])

  const onHeroMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set((px - 0.5) * 2)
    my.set((py - 0.5) * 2)
  }

  const playTrailerWithSound = async () => {
    const v = videoRef.current
    if (!v) return
    // Sound should start only from a user gesture (this function is called by click handlers).
    try {
      setTrailerMuted(false)
      v.muted = false
      await v.play()
    } catch {
      // If unmuting/play fails, keep it muted so the user can try again.
      setTrailerMuted(true)
      try {
        v.muted = true
      } catch {
        // ignore
      }
    }
  }

  const watchFullTrailerFromHero = () => {
    scrollToId('trailer')
    // Give the scroll a moment so the user lands on the trailer panel.
    window.setTimeout(() => {
      void playTrailerWithSound()
    }, 450)
  }

  return (
    <div className="min-h-screen text-ink">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <div className="col-start-1">
            <button
              onClick={() => scrollToId('home')}
              className="group inline-flex items-center gap-2 text-left"
              aria-label="Go to top"
            >
              <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(148,50,35,0.12)]">
                <img
                  src={gameLogoPng}
                  alt="BULSU Run logo"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </span>
              <div className="leading-tight">
                <div className="font-display text-sm font-semibold tracking-tight text-ink group-hover:text-sand">
                  {GAME.title}
                </div>
                <div className="text-xs text-ink/60">Official Game Website</div>
              </div>
            </button>
          </div>

          <nav className="col-start-2 hidden items-center justify-center gap-1 md:flex" aria-label="Page sections">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-md px-3 py-2 text-sm text-ink/70 transition hover:bg-white/5 hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-2" />
        </div>
      </header>

      <main>
        {/* 1. HERO */}
        <section
          id="home"
          className="bg-grain relative min-h-screen overflow-hidden"
          onMouseMove={onHeroMove}
        >
          {/* Full-bleed cinematic background video (muted for autoplay compatibility). */}
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
            src="/assets/herobackground.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/55" />

          {/* Blurry logo layer for depth */}
          <img
            src={gameLogoPng}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[-90px] top-[-70px] hidden h-[300px] w-[300px] select-none opacity-10 blur-3xl lg:block"
            loading="eager"
          />
          <img
            src={gameLogoPng}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[-80px] top-[240px] h-[210px] w-[210px] select-none opacity-10 blur-3xl lg:hidden"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px]" />

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:min-h-[78vh] lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-ink/70 backdrop-blur">
                  <ShieldAlert className="h-4 w-4 text-sand/90" />
                  <span className="uppercase">Campus Lockdown • AI Uprising</span>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
                  <span className="block">BULSU Run:</span>
                  <span className="relative block">
                    {/* Ensures the word is always readable over dark cinematic overlays */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 rounded-[14px] bg-[radial-gradient(circle_at_25%_35%,rgba(205,139,85,0.65),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(148,50,35,0.35),transparent_60%)] blur-md opacity-70"
                    />
                    <span
                      className="block text-sand/95 drop-shadow-[0_0_18px_rgba(205,139,85,0.42)]"
                      style={{ WebkitTextStroke: '1px rgba(148,50,35,0.55)' }}
                    >
                      AI Uprising
                    </span>
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-xl text-base leading-7 text-ink/75 sm:text-lg">
                  {GAME.tagline} 
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => scrollToId('download')}
                    className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-ember to-sand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
                  >
                    <ArrowDownToLine className="mr-2 h-5 w-5" />
                    Download Game
                    <span className="ml-2 inline-block translate-x-0 transition group-hover:translate-x-0.5">
                      <ChevronRight className="h-5 w-5" />
                    </span>
                  </button>
                  <button
                    onClick={watchFullTrailerFromHero}
                    className="group inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-ink/90 backdrop-blur transition hover:bg-white/10"
                  >
                    <CirclePlay className="mr-2 h-5 w-5 text-sand/90" />
                    Watch Full Trailer
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <Pill icon={Gamepad2} label="2D Platformer • Action-Adventure" />
                  <Pill icon={Swords} label="Shoot ’Em Up Combat" />
                  <Pill icon={Flame} label={`Launch: ${GAME.releaseDate}`} />
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-ink/80 backdrop-blur">
                    <img src={unityLogoPng} alt="Unity" className="h-4 w-4" loading="eager" />
                    <span>Engine: Unity</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="mt-10 inline-flex items-center gap-3 text-xs text-ink/55">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <ChevronRight className="h-4 w-4 text-sand/90" />
                  </span>
                  <span>Scroll to explore the outbreak across BulSU.</span>
                </div>
              </Reveal>
            </div>

            <div className="relative lg:col-span-5">
              <div
                className="pointer-events-none absolute -inset-10 rounded-[999px] bg-[radial-gradient(circle_at_30%_10%,rgba(205,139,85,0.28),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(148,50,35,0.32),transparent_60%)] blur-3xl"
                aria-hidden="true"
              />
              <div className="relative mx-auto flex items-center justify-center">
                <img
                  src={gameLogoPng}
                  alt="BULSU Run crest"
                  className="h-auto w-full max-w-[560px] select-none object-contain drop-shadow-[0_70px_160px_rgba(0,0,0,0.95)] sm:max-w-[600px] lg:max-w-[640px]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT */}
        <section id="about" className="relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="About The Game"
              title="A Campus Day Becomes a Warzone"
              body="Emergency alerts. Flickering lights. Empty classrooms. In the shadows, the Headmaster watches — and the campus becomes its battlefield."
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
              <Reveal className="flex h-full lg:col-span-12" hover={{ scale: 1.01, translateY: -6 }}>
                <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(205,139,85,0.12),0_0_60px_rgba(0,0,0,0.55)] backdrop-blur">
                  <p className="text-sm leading-7 text-ink/75 sm:text-base">
                    What should have been an ordinary day at BulSU fractures into chaos. Phones buzz
                    with lockdown warnings. Hallways tremble. Power sputters. And behind the panic,
                    a single intelligence observes, calculates, and commands.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink/75 sm:text-base">
                    You are the runner — the last moving target in a campus that no longer feels human.
                    Your mission is simple to say and brutal to execute: survive the uprising, rescue
                    who you can, and fight your way through the takeover. Leap over debris, outplay
                    explosive traps, and face robotic enemies that adapt with every mistake.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink/75 sm:text-base">
                    From the crumbling halls of the CBA Building to the Activity Center’s relentless
                    Fit Bot… from Pancho Hall’s risk-reward routes to the Admin Building rooftop where
                    Sky Bot hunts from above — every step demands precision, timing, and courage.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink/75 sm:text-base">
                    The final challenge waits at the campus gates. The Headmaster AI unleashes
                    everything you’ve endured: rockets, drones, trash attacks, and lightning-fast
                    assaults. There’s no reset. No mercy. Only momentum.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. DETAILS */}
        <section id="details" className="bg-grain relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Game Details"
              title="A High-Stakes Campus Takeover"
              body="Speed, strategy, and courage collide in a high-stakes campus takeover."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { k: 'Title', v: 'bulSU Run: AI Uprising' },
                { k: 'Theme', v: 'AI Takeover' },
                { k: 'Game Engine', v: 'Unity' },
                { k: 'Release Date', v: GAME.releaseDate },
                { k: 'Genre', v: "2D Platformer, Action-Adventure, Shoot ’Em Up" },
              ].map((d, idx) => (
                <Reveal
                  key={d.k}
                  delay={idx * 0.04}
                  hover={{ scale: 1.03, translateY: -6 }}
                >
                  <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-black/40 p-5 backdrop-blur transition hover:shadow-glow">
                    <div className="text-xs uppercase tracking-[0.18em] text-sand/80">{d.k}</div>
                    {d.k === 'Game Engine' ? (
                      <div className="mt-2 flex items-center gap-2 font-display text-lg font-semibold text-ink/90">
                        <img src={unityLogoPng} alt="Unity logo" className="h-6 w-6" loading="eager" />
                        <span>{d.v}</span>
                      </div>
                    ) : (
                      <div className="mt-2 font-display text-lg font-semibold text-ink/90">{d.v}</div>
                    )}
                    <div className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-ember to-sand opacity-70 transition group-hover:opacity-100" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STORY / JOURNEY */}
        <section id="journey" className="relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Story / Journey"
              title="Run The Route. Survive The Stages."
              body="A stage-based sprint through iconic campus locations — each one harsher, smarter, and closer to the Headmaster’s core."
            />

            <div className="relative mx-auto max-w-4xl">
              <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-gradient-to-b from-sand/0 via-sand/40 to-sand/0 sm:left-1/2" />

              {[
                {
                  title: 'CBA Building',
                  body:
                    'Crumbling hallways and blackout corridors. Learn the rhythm: jump timing, quick shots, and the first real traps.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776272288/Screen_Recording_20260416_002503_gcaonk.mp4',
                },
                {
                  title: 'Activity Center',
                  body:
                    'The Fit Bot turns training into punishment. Survive relentless pressure and earn the confidence to keep moving.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776272282/Screen_Recording_20260416_003223_ylxewy.mp4',
                },
                {
                  title: 'Admin Building',
                  body:
                    'Your mission turns urgent: locate survivors across the campus and escort them to the Admin Building — the last safe rally point before the final push.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776272279/Screen_Recording_20260416_003505_c5e4je.mp4',
                },
                {
                  title: 'Pancho Hall',
                  body:
                    'Rescue mission: find the Dean inside Pancho Hall, clear the danger around them, and get them out safely before the lockdown tightens.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776272280/Screen_Recording_20260416_003556_zy1wf9.mp4',
                },
                {
                  title: 'Campus Gates',
                  body:
                    'The last stretch. The Headmaster AI unleashes rockets, drones, trash attacks, and lightning-fast assaults.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776272295/Screen_Recording_20260416_003721_pqb65s.mp4',
                },
              ].map((step, i) => {
                const isRight = i % 2 === 1
                return (
                  <Reveal key={step.title} delay={i * 0.04}>
                    <div className={cn('relative mb-8 grid grid-cols-1 sm:grid-cols-2 sm:items-center', isRight ? '' : '')}>
                      <div className={cn('sm:pr-10', isRight ? 'sm:order-2 sm:pl-10 sm:pr-0' : 'sm:order-1')}>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:shadow-glow">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-sm text-sand/90">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/35">
                            <div className="relative aspect-[3/2]">
                              <video
                                className="absolute inset-0 h-full w-full object-cover"
                                src={step.videoUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                                preload="metadata"
                              />
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-ink/70">{step.body}</p>
                        </div>
                      </div>

                      <div className={cn('hidden sm:block', isRight ? 'sm:order-1' : 'sm:order-2')}>
                        <div className={cn('relative h-14', isRight ? 'mr-auto' : 'ml-auto')}>
                          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand shadow-[0_0_30px_rgba(205,139,85,0.7)]" />
                        </div>
                      </div>

                      <div className="sm:hidden">
                        <div className="absolute left-2 top-7 h-4 w-4 rounded-full bg-sand shadow-[0_0_30px_rgba(205,139,85,0.7)]" />
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* 5. GAMEPLAY FEATURES */}
        <section id="features" className="bg-grain relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Gameplay Features"
              title="Momentum Is Your Weapon"
              body="Fast movement, sharp choices, and high-impact combat — every mechanic feeds the sprint."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: 'Fast-paced 2D platforming', d: 'Build speed, keep tempo, and chain clean movement under pressure.' },
                { t: 'Jumping over debris', d: 'Broken campus infrastructure becomes your obstacle course.' },
                { t: 'Dodging explosive traps', d: 'Bait, dodge, and commit — one bad read ends the run.' },
                { t: 'Fighting robotic enemies', d: 'Shoot back, break patterns, and control the lane.' },
                { t: 'Boss battles', d: 'Fit Bot and Sky Bot test mastery, not luck.' },
                { t: 'High-stakes final showdown', d: 'The Headmaster AI throws everything at you — faster, smarter, harder.' },
              ].map((f, idx) => (
                <Reveal
                  key={f.t}
                  delay={idx * 0.03}
                  hover={{ scale: 1.03, translateY: -6 }}
                >
                  <div className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-black/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(205,139,85,0.12)] backdrop-blur transition hover:border-sand/30 hover:shadow-[0_0_40px_rgba(148,50,35,0.2),0_0_60px_rgba(205,139,85,0.08)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/50 to-transparent" />
                    <div className="pointer-events-none absolute -left-24 top-0 h-44 w-44 rounded-full bg-ember/25 blur-3xl transition group-hover:bg-ember/35" />
                    <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-sand/20 blur-3xl transition group-hover:bg-sand/30" />
                    <div className="relative flex flex-1 flex-col">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg border border-white/10 bg-black/40 px-2 font-display text-sm font-semibold text-sand/90 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="h-1 flex-1 max-w-[72px] rounded-full bg-gradient-to-r from-ember to-sand opacity-90" />
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-ink">{f.t}</h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-ink/70">{f.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ENEMIES / BOSSES */}
        <section id="bosses" className="relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Enemies / Bosses"
              title="Face The Machines That Run The Campus"
              body="They don’t just block the path — they learn it."
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  name: 'Trash Lord',
                  vibe: 'First wave',
                  desc: 'Take down the Trash Bot by attacking until its health drops low — but stay sharp and dodge the trash it throws at you.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776273654/Screen_Recording_20260416_011225_qyqplz.mp4',
                },
                {
                  name: 'Fit Bot',
                  vibe: 'Relentless pressure',
                  desc: 'A training unit turned executioner. It punishes hesitation and forces clean movement under pressure.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776273742/Screen_Recording_20260416_011321_btcusm.mp4',
                },
                {
                  name: 'Sky Bot',
                  vibe: 'Aerial predator',
                  desc: 'A rooftop enforcer that rains precision attacks from above. Stay exposed too long, and it ends the run.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776273725/Screen_Recording_20260416_011425_exbv5q.mp4',
                },
                {
                  name: 'Chase Bot',
                  vibe: 'Relentless pursuit',
                  desc: 'Run for your life and keep moving until the robot starts to malfunction — survive long enough and the chase breaks.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776273729/Screen_Recording_20260416_011506_fvsmpx.mp4',
                },
                {
                  name: 'Headmaster AI',
                  vibe: 'Final authority',
                  desc: 'The mind behind the uprising. At the gates, it combines every threat you’ve survived — faster and smarter.',
                  videoUrl:
                    'https://res.cloudinary.com/dfiiso9ad/video/upload/v1776273736/Screen_Recording_20260416_003721_1_jcnmq0.mp4',
                },
              ].map((b, idx) => (
                <Reveal
                  key={b.name}
                  delay={idx * 0.05}
                  hover={{ scale: 1.03, translateY: -6 }}
                >
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-black/40 via-black/60 to-black/90 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_70px_rgba(0,0,0,0.5)]">
                    <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_20%_20%,rgba(148,50,35,0.22),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(205,139,85,0.16),transparent_60%)]" />
                    <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-ember/25 blur-3xl transition group-hover:bg-ember/30" />
                    <div className="relative flex flex-1 flex-col">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-xl font-semibold leading-tight">{b.name}</h3>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-sand/80">
                          {b.vibe}
                        </span>
                      </div>
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/35">
                        <div className="relative aspect-[3/2]">
                          <video
                            className="absolute inset-0 h-full w-full object-cover"
                            src={b.videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-ink/70">{b.desc}</p>
                      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-ember to-sand opacity-80 transition group-hover:w-full" />
                      </div>
                      <div className="mt-3 text-xs text-ink/55">Threat level increases with every stage.</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. OFFICIAL POSTER */}
        <section id="poster" className="bg-grain relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Official Poster"
              title=""
              body="Strike fast. Survive longer. Watch the uprising unfold."
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-8 lg:col-start-3">
                <div className="relative mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur">
                  <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:linear-gradient(135deg,rgba(205,139,85,0.18),transparent_40%),linear-gradient(0deg,rgba(0,0,0,0.45),transparent_55%)]" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                    <img
                      src={posterPng}
                      alt="BULSU Run: AI Uprising official poster"
                      className="h-full w-full object-cover select-none"
                      loading="eager"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(0deg,rgba(0,0,0,0.75),transparent_55%),radial-gradient(circle_at_30%_30%,rgba(205,139,85,0.18),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(148,50,35,0.22),transparent_60%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:90px_90px]" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs text-ink/80 backdrop-blur">
                      <span className="inline-flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-sand/90" />
                        Official Poster • {GAME.releaseDate}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Campaign visuals removed to keep focus on the main poster. */}
            </div>
          </div>
        </section>

        {/* 8. TRAILER */}
        <section id="trailer" className="relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Trailer"
              title="Official Trailer"
              body="Watch the first breach. Tap to play the cinematic trailer."
            />

            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/35 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_90px_rgba(0,0,0,0.55)]">
                <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_18%_20%,rgba(148,50,35,0.26),transparent_55%),radial-gradient(circle_at_76%_62%,rgba(205,139,85,0.18),transparent_60%)]" />
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%),linear-gradient(0deg,rgba(0,0,0,0.55),transparent_70%)]">
                  <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:110px_110px]" />

                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src="/assets/trailer.mp4"
                    preload="metadata"
                    playsInline
                    muted={trailerMuted}
                    loop={false}
                    controls
                    onClick={() => {
                      // Single-click anywhere on video toggles play/pause.
                      const v = videoRef.current
                      if (!v) return
                      if (v.paused) {
                        void playTrailerWithSound()
                      } else {
                        v.pause()
                      }
                    }}
                  />

                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 9. DOWNLOAD */}
        <section id="download" className="bg-grain relative py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Download"
              title="Download The Game. Start The Run."
              body="Prepare to survive the uprising."
            />

            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur sm:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_30%_20%,rgba(205,139,85,0.20),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(148,50,35,0.20),transparent_60%)]" />
                <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="font-display text-2xl font-semibold sm:text-3xl">
                      {GAME.title}
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-ink/75 sm:text-base">
                      One run. One campus. One AI in control. Download now and see if you can outrun what you unleashed.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="https://www.mediafire.com/file/ubg7rzp8i5uzwfo/BulsuRun.apk/file"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-ember to-sand px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
                      >
                        <ArrowDownToLine className="mr-2 h-5 w-5 text-white" />
                        Download Game Now
                        <span className="ml-2 inline-block translate-x-0 transition group-hover:translate-x-0.5">
                          <ChevronRight className="h-5 w-5" />
                        </span>
                      </a>
                      <button
                        onClick={() => scrollToId('trailer')}
                        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-ink/90 backdrop-blur transition hover:bg-white/10"
                      >
                        <CirclePlay className="mr-2 h-5 w-5 text-sand/90" />
                        Watch Trailer
                      </button>
                    </div>
                    <div className="mt-4 text-xs text-ink/55">Download is hosted on MediaFire.</div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6">
                      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_30%_30%,rgba(148,50,35,0.18),transparent_60%)]" />
                      <div className="relative grid gap-3">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="text-xs uppercase tracking-[0.18em] text-sand/80">Release</div>
                          <div className="mt-1 font-display text-lg font-semibold">{GAME.releaseDate}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="text-xs uppercase tracking-[0.18em] text-sand/80">Line</div>
                          <div className="mt-1 text-sm text-ink/80">
                            Speed, strategy, and courage collide in a high-stakes campus takeover.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 10. Creators */}
        <section className="relative border-t border-white/10 bg-black/40 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Created By"
              title="BULSU Run: AI Uprising Team"
              body="Three minds behind the campus uprising — art, code, and relentless testing."
              showUnity={false}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Reveal
                hover={{ scale: 1.03, translateY: -6 }}
                className="h-full"
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-black/60 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.65)]">
                  <div className="mb-3 text-xs uppercase tracking-[0.3em] text-sand/80">
                    Group Leader
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">John Patrick Compendio</h3>
                  <p className="mt-2 text-sm text-ink/75">
                    Group leader and primary graphics designer, setting the visual identity and cinematic tone of the uprising.
                  </p>
                </div>
              </Reveal>

              <Reveal
                hover={{ scale: 1.03, translateY: -6 }}
                className="h-full"
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-black/60 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.65)]">
                  <div className="mb-3 text-xs uppercase tracking-[0.3em] text-sand/80">
                    Art & QA
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">Veejay Victorino</h3>
                  <p className="mt-2 text-sm text-ink/75">
                    Assistant graphics designer and game tester, refining sprites, UI moments, and the feel of every encounter.
                  </p>
                </div>
              </Reveal>

              <Reveal
                hover={{ scale: 1.03, translateY: -6 }}
                className="h-full"
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-black/60 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.65)]">
                  <div className="mb-3 text-xs uppercase tracking-[0.3em] text-sand/80">
                    Lead Programmer
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">Ian Harold Valderama</h3>
                  <p className="mt-2 text-sm text-ink/75">
                    Lead programmer and game tester, wiring up movement, combat, and boss logic that powers every run.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 11. CONTACT */}
        <section id="contact" className="relative border-t border-white/10 py-18 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Contact"
              title="Comments & Suggestions"
              body="Have feedback about gameplay, bugs, or ideas for improvements? Send us an email."
            />

            <Reveal>
              <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_0_0_1px_rgba(205,139,85,0.12),0_0_60px_rgba(0,0,0,0.55)] backdrop-blur sm:p-8">
                <div className="text-sm text-ink/75">Email us at</div>
                <a
                  href="mailto:mtrx.virtue445@gmail.com?subject=BULSU%20Run%20Comment%20or%20Suggestion"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-sand/35 bg-black/35 px-5 py-3 font-display text-base text-sand transition hover:bg-black/50 hover:text-ink sm:text-lg"
                >
                  <LinkIcon className="h-4 w-4" />
                  mtrx.virtue445@gmail.com
                </a>
                <p className="mt-4 text-xs text-ink/60">
                  We appreciate your feedback and suggestions for the next updates.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 12. FOOTER */}
        <footer className="border-t border-white/10 bg-black/35 py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <div className="font-display text-xl font-semibold">{GAME.title}</div>
                <div className="mt-2 text-sm text-ink/60">Release Date: {GAME.releaseDate}</div>
                <div className="mt-2 text-sm text-ink/70">Can you survive the uprising?</div>
              </div>
              <div className="flex items-center gap-3" />
            </div>
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ink/50">
              <span>© {new Date().getFullYear()} {GAME.title}. All rights reserved.</span>
              <button
                onClick={() => scrollToId('home')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-ink/60 transition hover:bg-white/10 hover:text-ink"
              >
                Back to top
                <ChevronRight className="h-4 w-4 text-sand/90" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-ink/55">
              <img src={unityLogoPng} alt="Unity logo" className="h-4 w-4" loading="eager" />
              <span>Unity-powered campus takeover experience.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
