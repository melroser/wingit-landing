"use client";

import React from "react";
import posthog from "posthog-js";

// --- Icons ---
const MenuIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

const ChevronDown = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ArrowRight = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h12m-5-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const CheckIcon = (p: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ZapIcon = (p: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const VoiceIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// --- The Custom W-Plane Logo ---
const WingItLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5"
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 2L2 8.5L11.5 11.5L14.5 21L22 2Z" />
    <path d="M2 8.5 L11.5 11.5 L14.5 21" /> 
    <path d="M11.5 11.5 L22 2" />
  </svg>
);

// Reusable "Hero Style" Heading for every section
const SectionHero = ({ textTop, textBottom }: { textTop: string; textBottom: string }) => (
  <div className="mx-auto max-w-5xl text-center px-4 mb-20">
    <h2 className="text-balance text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
      {textTop} <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        {textBottom}
      </span>
    </h2>
  </div>
);

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// --- Components ---

function Button({ children, href, variant = "primary", className, onClick }: { children: React.ReactNode; href: string; variant?: "primary" | "ghost" | "dark"; className?: string; onClick?: () => void; }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-indigo-200 whitespace-nowrap active:scale-95";
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200",
    ghost: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-sm",
    dark: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/20"
  };
  return (
    <a href={href} className={cx(base, styles[variant], className)} onClick={onClick}>
      {children}
    </a>
  );
}

function NavDropdown({ label, items }: { label: string; items: Array<{ title: string; href: string; desc?: string }> }) {
  return (
    <div className="relative group">
      <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70">
        {label}
        <ChevronDown className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute left-0 top-full hidden pt-2 group-hover:block z-50">
        <div className="w-[280px] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              className="block rounded-xl px-4 py-3 hover:bg-zinc-50 transition"
              onClick={() => {
                posthog.capture('nav_dropdown_item_clicked', { dropdown: label, item: it.title });
              }}
            >
              <div className="text-sm font-bold text-zinc-900">{it.title}</div>
              {it.desc && <div className="text-xs text-zinc-500 mt-0.5">{it.desc}</div>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile Disclosure Component
function MobileDisclosure({ label, items, isOpen, onToggle }: { label: string; items: Array<{ title: string; href: string }>; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-3 text-left text-lg font-semibold text-zinc-900">
        {label}
        <ChevronDown className={cx("h-5 w-5 text-zinc-400 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="pb-3 pl-4 space-y-3">
          {items.map((it) => (
            <a 
              key={it.title} 
              href={it.href} 
              className="block text-base text-zinc-600 hover:text-indigo-600"
              onClick={() => {
                posthog.capture('mobile_nav_item_clicked', { category: label, item: it.title });
              }}
            >
              {it.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function SolutionRow({ id, title, desc, mediaSrc, align = "left" }: { id: string; title: string; desc: string; mediaSrc: string; align?: "left" | "right" }) {
  const isMp4 = mediaSrc.toLowerCase().endsWith(".mp4");
  return (
    <div id={id} className={cx("min-h-screen scroll-mt-16 flex items-center justify-center py-12")}>
        <div className={cx("grid items-center gap-12 md:grid-cols-2", align === "right" && "md:[&>*:first-child]:order-2")}>
            <div>
                <div className="text-xs font-bold tracking-wider text-indigo-600 uppercase mb-2">Use Case</div>
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">{title}</h3>
                <p className="mt-6 text-lg text-zinc-600 leading-relaxed">{desc}</p>
                <div className="mt-8">
                <Button href="https://app.wingit.dev" variant="ghost" onClick={() => posthog.capture('solution_cta_clicked', { solution: title })}>
                    See Example <ArrowRight className="h-4 w-4" />
                </Button>
                </div>
            </div>

            <div className="relative group w-full">
                <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-100 via-purple-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl transform transition duration-500 group-hover:scale-[1.01]">
                <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/50 px-4 py-3">
                    <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    </div>
                    <div className="text-xs font-medium text-zinc-400 ml-2">{title}</div>
                </div>
                {isMp4 ? (
                    <video 
                        className="aspect-video w-full bg-zinc-100 object-cover" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        onPlay={() => posthog.capture('solution_video_played', { solution: title })}
                    >
                    <source src={mediaSrc} type="video/mp4" />
                    </video>
                ) : (
                    <img src={mediaSrc} alt={title} className="aspect-video w-full bg-zinc-100 object-cover" />
                )}
                </div>
            </div>
        </div>
    </div>
  );
}

// --- Main Page ---

export default function Page() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // Mobile accordion states
  const [appsOpen, setAppsOpen] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);

  const LINKS = {
    signIn: "https://app.wingit.dev/auth?mode=login",
    signUp: "https://app.wingit.dev/auth?mode=register",
  };

  const apps = [
    { title: "Wingit", href: "https://wingit.dev", desc: "AI Generated Slides" },
    { title: "GetTheBag", href: "#", desc: "Jira for jobseekers" },
    { title: "Moreannon", href: "#", desc: "MCP Tool for AI Consensus" },
  ];

  const solutions = [
    { title: "Presentations", href: "#solutions-presentations", desc: "Generate + refine decks in minutes." },
    { title: "Meetings", href: "#solutions-meetings", desc: "Turn notes into shareable decks." },
    { title: "Lessons", href: "#solutions-lessons", desc: "Teach with clean, structured slides." },
    { title: "Podcasts", href: "#solutions-podcasts", desc: "Episode outline → visuals." },
    { title: "Video Calls", href: "#solutions-video-calls", desc: "Recaps + follow-up decks." },
  ];

  const resources = [
    { title: "What Do?", href: "#whatdo", desc: "The elevator pitch." },
    { title: "Quickstart Guide", href: "#quickstart", desc: "Get up and running." },
    { title: "How It Works", href: "#how", desc: "Under the hood." },
    { title: "Roadmap", href: "#roadmap", desc: "What's next." },
  ];

  return (
    <main className="min-h-screen text-zinc-950 bg-loom font-sans selection:bg-indigo-100">

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            {/* Brand + Logo */}
            <div className="flex items-center gap-8">
                <a href="/" className="flex items-center gap-2.5 group" onClick={() => posthog.capture('nav_logo_clicked')}>
                    <div className="relative flex h-9 w-9 items-center justify-center">
                       <WingItLogo className="h-7 w-7 text-black transition-transform duration-300 group-hover:-rotate-12 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="leading-none">
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Devs.Miami</div>
                        <div className="text-lg font-bold tracking-tight text-zinc-900">Wingit</div>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    <NavDropdown label="Apps" items={apps} />
                    <NavDropdown label="Solutions" items={solutions} />
                    <NavDropdown label="Resources" items={resources} />
                    <a 
                        href="#pricing" 
                        className="px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 rounded-full transition"
                        onClick={() => posthog.capture('nav_link_clicked', { link: 'Pricing' })}
                    >
                        Pricing
                    </a>
                </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                <a 
                  href={LINKS.signIn} 
                  className="hidden md:block text-sm font-semibold text-zinc-600 hover:text-zinc-900 px-3 py-2"
                  onClick={() => posthog.capture('cta_sign_in_clicked', { location: 'nav_desktop' })}
                >
                  Log in
                </a>
                <Button 
                  href={LINKS.signUp}
                  onClick={() => posthog.capture('cta_try_wingit_free_clicked', { location: 'nav_desktop' })}
                >
                  Try Wingit
                </Button>
                
                {/* Mobile hamburger */}
                <button
                    type="button"
                    className="md:hidden p-2 text-zinc-600"
                    onClick={() => {
                        setMobileOpen(true);
                        posthog.capture('mobile_menu_opened');
                    }}
                >
                    <MenuIcon className="h-6 w-6" />
                </button>
            </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-xl">Menu</span>
                    <button onClick={() => setMobileOpen(false)} className="p-2"><XIcon className="h-6 w-6" /></button>
                </div>
                
                <div className="flex flex-col gap-2">
                    <MobileDisclosure 
                        label="Apps" 
                        items={apps} 
                        isOpen={appsOpen} 
                        onToggle={() => setAppsOpen(!appsOpen)} 
                    />
                    <MobileDisclosure 
                        label="Solutions" 
                        items={solutions} 
                        isOpen={solutionsOpen} 
                        onToggle={() => setSolutionsOpen(!solutionsOpen)} 
                    />
                    <MobileDisclosure 
                        label="Resources" 
                        items={resources} 
                        isOpen={resourcesOpen} 
                        onToggle={() => setResourcesOpen(!resourcesOpen)} 
                    />
                    <a 
                        href="#pricing" 
                        onClick={() => {
                            setMobileOpen(false);
                            posthog.capture('mobile_nav_link_clicked', { link: 'Pricing' });
                        }} 
                        className="py-3 text-lg font-semibold text-zinc-900 border-b border-zinc-100"
                    >
                        Pricing
                    </a>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <Button 
                        href={LINKS.signUp} 
                        className="w-full justify-center text-lg py-3"
                        onClick={() => posthog.capture('cta_try_wingit_free_clicked', { location: 'mobile_menu' })}
                    >
                        Try Wingit Free
                    </Button>
                    <a 
                        href={LINKS.signIn} 
                        className="w-full text-center py-3 text-lg font-semibold text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded-full"
                        onClick={() => posthog.capture('cta_sign_in_clicked', { location: 'mobile_menu' })}
                    >
                        Log In
                    </a>
                </div>
            </div>
          </div>
        )}
      </header>
 {/* HERO SECTION (Keep exactly as is) */}
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 text-center">
        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl">
          AI-generated slides<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            while you do the talking.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-zinc-600 sm:text-xl leading-relaxed">
          Talk → transcribe → visualize. WingIt turns your live speaking into clean, shareable slides in real time.
        </p>


        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button 
            href={LINKS.signUp} 
            variant="dark" 
            className="h-12 px-8 text-base"
            onClick={() => posthog.capture('cta_try_wingit_free_clicked', { location: 'hero' })}
          >
            Start Presenting <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            href="#hero-demo" 
            variant="ghost" 
            className="h-12 px-8 text-base"
            onClick={() => posthog.capture('cta_watch_demo_clicked', { location: 'hero' })}
          >
            Watch demo
          </Button>
        </div>

        {/* Hero Video Slab */}
        <div className="mt-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl" />
            <div className="relative rounded-[2rem] border border-zinc-200 bg-white p-2 shadow-2xl">
                <div className="overflow-hidden rounded-[1.7rem] bg-zinc-900 aspect-video relative">
                    <video 
                        id="hero-demo"
                        className="h-full w-full object-cover" 
                        controls 
                        poster="/demo-poster.png"
                        src="/demo.mp4" 
                        onPlay={() => posthog.capture('hero_demo_video_played', { video_src: '/demo.mp4' })}
                    />
                </div>
            </div>
        </div>

      </section>
      {/* SOLUTIONS SECTION */}
      <section id="solutions" className="mx-auto max-w-6xl px-4 border-t border-zinc-200/50 py-24">
        
        {/* NEW: Hero-Style Section Header */}
        <SectionHero 
            textTop="Imagine generating" 
            textBottom="Presentations Realtime." 
        />

        <div className="flex flex-col">
          <SolutionRow
            id="solutions-presentations"
            title="Presentations"
            desc="Turn your stream of consciousness into a structured deck. Iterate slide-by-slide without ever touching a layout tool. Perfect for unplanned updates or last-minute pitches."
            mediaSrc="/gifs/presentations.mp4"
          />
          <SolutionRow
            id="solutions-meetings"
            title="Meetings"
            desc="Stop sending Notion docs nobody reads. Turn your meeting notes into a shareable deck that visualizes your key points instantly. Keep the team aligned with zero prep."
            mediaSrc="/gifs/meetings.mp4"
            align="right"
          />
          {/* ... (rest of solutions keep exactly as is) ... */}
          <SolutionRow
            id="solutions-lessons"
            title="Educational Lessons"
            desc="Teach complex topics with pacing and clarity. WingIt generates diagrams and bullet points as you explain concepts, helping students follow your train of thought visually."
            mediaSrc="/gifs/lessons.mp4"
          />
          <SolutionRow
            id="solutions-podcasts"
            title="Podcasts & Audio"
            desc="Give your audio content a visual dimension. Turn an episode outline into a companion deck for YouTube or social snippets. Engage visual learners without hiring an editor."
            mediaSrc="/gifs/podcasts.mp4"
            align="right"
          />
          <SolutionRow
            id="solutions-video-calls"
            title="Video Calls"
            desc="Don't just send a recording link. Send a WingIt deck that summarizes the call visually. Perfect for client follow-ups, internal recaps, and async standups."
            mediaSrc="/gifs/video-calls.mp4"
          />
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section className="border-t border-zinc-200/50 py-24">
        
        {/* NEW: Hero-Style Section Header */}
        <SectionHero 
            textTop="Everything you need to" 
            textBottom="Get Started." 
        />

        <div className="mx-auto max-w-4xl px-4 grid gap-24">
            {/* ... (Keep existing resources cards exactly as is) ... */}
            <div id="whatdo" className="scroll-mt-32">
                <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">The Concept</span>
                    <h3 className="mt-2 text-3xl font-bold text-zinc-900">What is WingIt?</h3>
                    <div className="mt-6 space-y-4 text-lg text-zinc-600 leading-relaxed">
                        <p>We've all been there: you have a great idea, but the thought of opening PowerPoint kills your momentum. <strong>WingIt solves the "Blank Page Problem."</strong></p>
                        <p>It allows you to create presentations at the speed of speech. You simply talk, and our AI listens, understands your structure, and generates slides in real-time.</p>
                    </div>
                </div>
            </div>

            <div id="quickstart" className="scroll-mt-32">
                <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Getting Started</span>
                    <h3 className="mt-2 text-3xl font-bold text-zinc-900">Quickstart Guide</h3>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {/* ... (content same as before) ... */}
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-900">1</div>
                            <h4 className="font-bold text-zinc-900">Log In & Mic Check</h4>
                            <p className="text-sm text-zinc-600">Create a free account. Grant browser microphone permissions when prompted.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-900">2</div>
                            <h4 className="font-bold text-zinc-900">Just Start Talking</h4>
                            <p className="text-sm text-zinc-600">Press record. WingIt will detect topic shifts and create new slides automatically.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-900">3</div>
                            <h4 className="font-bold text-zinc-900">Export & Share</h4>
                            <p className="text-sm text-zinc-600">Stop recording. Edit if needed, then share the public link or export to PDF.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="how" className="scroll-mt-32">
                <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Under the Hood</span>
                    <h3 className="mt-2 text-3xl font-bold text-zinc-900">How It Works</h3>
                    <div className="mt-6 space-y-4 text-lg text-zinc-600 leading-relaxed">
                        <p>WingIt uses a multi-stage AI pipeline to ensure low latency and high accuracy.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Audio Processing:</strong> Deepgram Nova-2 for ultra-fast transcription.</li>
                            <li><strong>Context Awareness:</strong> Our LLM layer detects "slide boundaries" based on topic shifts.</li>
                            <li><strong>Visual Synthesis:</strong> We generate React components on the fly to render your slides.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="roadmap" className="scroll-mt-32">
                <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Looking Ahead</span>
                    <h3 className="mt-2 text-3xl font-bold text-zinc-900">Roadmap</h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {/* ... (content same as before) ... */}
                        <div className="rounded-xl bg-zinc-50 p-4">
                            <div className="font-bold text-zinc-900">Q3 2026: Theming Engine</div>
                            <p className="text-sm text-zinc-600 mt-1">Custom fonts, colors, and branding support.</p>
                        </div>
                        <div className="rounded-xl bg-zinc-50 p-4">
                            <div className="font-bold text-zinc-900">Q4 2026: Collaborative Editing</div>
                            <p className="text-sm text-zinc-600 mt-1">Multi-player mode for teams.</p>
                        </div>
                        <div className="rounded-xl bg-zinc-50 p-4">
                            <div className="font-bold text-zinc-900">Data Integrations</div>
                            <p className="text-sm text-zinc-600 mt-1">Pull live data from Notion/Linear.</p>
                        </div>
                        <div className="rounded-xl bg-zinc-50 p-4">
                            <div className="font-bold text-zinc-900">Speaker Notes</div>
                            <p className="text-sm text-zinc-600 mt-1">AI-generated speaker cues.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-4 scroll-mt-16">
        <div className="mx-auto max-w-6xl">
            
            {/* NEW: Hero-Style Section Header */}
            <SectionHero 
                textTop="Unlock access to" 
                textBottom="Premium AI Voices." 
            />

            {/* Features Grid (Keep exactly as is) */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
                {/* ... (Features content) ... */}
                <div className="p-6 bg-zinc-50/80 backdrop-blur-sm rounded-2xl border border-zinc-100">
                    <div className="text-3xl mb-3">🤖</div>
                    <h4 className="font-bold text-zinc-900">Premium AI Voices</h4>
                    <p className="text-sm text-zinc-600 mt-2">Natural-sounding speech from Deepgram Aura and ElevenLabs.</p>
                </div>
                <div className="p-6 bg-zinc-50/80 backdrop-blur-sm rounded-2xl border border-zinc-100">
                    <div className="text-3xl mb-3">⚡</div>
                    <h4 className="font-bold text-zinc-900">Faster Processing</h4>
                    <p className="text-sm text-zinc-600 mt-2">Real-time audio generation with less than 2-second latency.</p>
                </div>
                <div className="p-6 bg-zinc-50/80 backdrop-blur-sm rounded-2xl border border-zinc-100">
                    <div className="text-3xl mb-3">🎛️</div>
                    <h4 className="font-bold text-zinc-900">Multiple Options</h4>
                    <p className="text-sm text-zinc-600 mt-2">Choose from different AI providers and voice styles.</p>
                </div>
                <div className="p-6 bg-zinc-50/80 backdrop-blur-sm rounded-2xl border border-zinc-100">
                    <div className="text-3xl mb-3">📊</div>
                    <h4 className="font-bold text-zinc-900">Quota Management</h4>
                    <p className="text-sm text-zinc-600 mt-2">Track your usage and get generous monthly allowances.</p>
                </div>
            </div>

            {/* Pricing Cards (Keep exactly as is) */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                
                {/* Free Tier */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-zinc-100 rounded-lg"><span className="text-2xl">🔊</span></div>
                        <div>
                            <h3 className="font-bold text-zinc-900">Browser Voice</h3>
                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Free Forever</div>
                        </div>
                    </div>
                    <p className="text-zinc-600 mb-6 min-h-[48px]">Uses your device's built-in synthesis engine. Zero latency.</p>
                    <div className="text-3xl font-bold text-zinc-900 mb-1">Free</div>
                    <div className="text-sm text-zinc-500 mb-8">Unlimited usage</div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><CheckIcon className="h-4 w-4 text-green-500" /> robotic sound</li>
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><CheckIcon className="h-4 w-4 text-green-500" /> Instant generation</li>
                    </ul>
                    <Button 
                        href={LINKS.signUp} 
                        variant="ghost" 
                        className="w-full justify-center"
                        onClick={() => posthog.capture('pricing_cta_clicked', { plan: 'Free' })}
                    >
                        Start Free
                    </Button>
                </div>

                {/* Deepgram Tier */}
                <div className="relative rounded-3xl border-2 border-indigo-600 bg-white p-8 shadow-xl transform md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Fast & Natural
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg"><span className="text-2xl">⚡</span></div>
                        <div>
                            <h3 className="font-bold text-zinc-900">Deepgram Aura</h3>
                            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Premium Fast</div>
                        </div>
                    </div>
                    <p className="text-zinc-600 mb-6 min-h-[48px]">High-quality, incredibly fast AI synthesis. The best balance of speed and cost.</p>
                    <div className="text-3xl font-bold text-zinc-900 mb-1">$0.015</div>
                    <div className="text-sm text-zinc-500 mb-8">per 1K characters</div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><CheckIcon className="h-4 w-4 text-indigo-600" /> &lt; 2s Latency</li>
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><CheckIcon className="h-4 w-4 text-indigo-600" /> Natural intonation</li>
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><CheckIcon className="h-4 w-4 text-indigo-600" /> Pay only for what you use</li>
                    </ul>
                    <Button 
                        href={LINKS.signUp} 
                        className="w-full justify-center bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => posthog.capture('pricing_cta_clicked', { plan: 'Deepgram' })}
                    >
                        Get Deepgram
                    </Button>
                </div>

                {/* ElevenLabs Tier */}
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg"><span className="text-2xl">🤖</span></div>
                        <div>
                            <h3 className="font-bold text-zinc-900">ElevenLabs</h3>
                            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Ultra Premium</div>
                        </div>
                    </div>
                    <p className="text-zinc-600 mb-6 min-h-[48px]">The industry standard for human-like speech. Unmatched quality.</p>
                    <div className="text-3xl font-bold text-zinc-900 mb-1">$0.030</div>
                    <div className="text-sm text-zinc-500 mb-8">per 1K characters</div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><VoiceIcon className="h-4 w-4 text-purple-600" /> Studio quality</li>
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><VoiceIcon className="h-4 w-4 text-purple-600" /> Rich emotion</li>
                        <li className="flex items-center gap-2 text-sm text-zinc-700"><VoiceIcon className="h-4 w-4 text-purple-600" /> Premium voices</li>
                    </ul>
                    <Button 
                        href={LINKS.signUp} 
                        variant="ghost" 
                        className="w-full justify-center"
                        onClick={() => posthog.capture('pricing_cta_clicked', { plan: 'ElevenLabs' })}
                    >
                        Get ElevenLabs
                    </Button>
                </div>

            </div>
            
            <div className="mt-12 text-center">
                <p className="text-sm text-zinc-500">
                    Free to start. No credit card required for Browser Voice. 
                    <a href={LINKS.signIn} className="ml-1 text-indigo-600 hover:underline" onClick={() => posthog.capture('cta_sign_in_clicked', { location: 'pricing_footer' })}>
                        Already have an account? Sign In
                    </a>
                </p>
            </div>
        </div>
      </section>

      {/* FOOTER (Keep exactly as is) */}
      <footer className="border-t border-zinc-200/50">
        <div className="mx-auto max-w-6xl px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
                <WingItLogo className="h-6 w-6 text-zinc-400" />
                <span className="text-xs text-zinc-400">© {new Date().getFullYear()} Devs Miami LLC</span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-500">
                <a href="#privacy" className="hover:text-zinc-900" onClick={() => posthog.capture('footer_link_clicked', { link: 'Privacy' })}>Privacy</a>
                <a href="#terms" className="hover:text-zinc-900" onClick={() => posthog.capture('footer_link_clicked', { link: 'Terms' })}>Terms</a>
                <a 
                    href={LINKS.signIn} 
                    className="hover:text-zinc-900"
                    onClick={() => posthog.capture('cta_sign_in_clicked', { location: 'footer_link' })}
                >
                    Sign In
                </a>
            </div>
        </div>
      </footer>

    </main>
  );
}
