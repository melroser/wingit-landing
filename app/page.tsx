"use client";

import React from "react";

/**
 * WingIt Landing — Loom-ish desktop hero + sticky nav + dropdowns
 * - Brand: Devs.Miami + Wingit logos
 * - Apps + Resources dropdowns (with placeholders)
 * - Solutions is NOT a dropdown; it scrolls to a section further down
 * - Solutions section has a mini-nav that scrolls to each MP4/GIF
 * - Hero demo video supports SOUND (no autoplay)
 */

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}
const MenuIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

function MobileDisclosure({
  label,
  items,
  open,
  onToggle,
}: {
  label: string;
  items: Array<{ title: string; href: string; desc?: string }>;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-zinc-900"
      >
        <span>{label}</span>
        <ChevronDown className={cx("h-4 w-4 text-zinc-500 transition", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="border-t border-zinc-200 p-2">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              className="block rounded-xl px-3 py-2.5 hover:bg-zinc-50"
            >
              <div className="text-sm font-semibold text-zinc-900">{it.title}</div>
              {it.desc ? <div className="mt-0.5 text-xs text-zinc-600">{it.desc}</div> : null}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const ChevronDown = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M7 10l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M5 12h12m-5-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Button({
  children,
  href,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    // key change: rounded-xl on mobile, rounded-full on sm+
    "inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-indigo-200 whitespace-nowrap";
  const styles =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
      : "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-sm";
  return (
    <a href={href} className={cx(base, styles, className)}>
      {children}
    </a>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ title: string; href: string; desc?: string }>;
}) {
  return (
    <div className="relative group">
      <a
        href="#"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70"
        onClick={(e) => e.preventDefault()}
      >
        {label}
        <ChevronDown className="h-4 w-4 text-zinc-500 group-hover:text-zinc-700" />
      </a>

      {/* dropdown */}
      <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
        <div className="w-[360px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
          <div className="p-2">
            {items.map((it) => (
              <a
                key={it.title}
                href={it.href}
                className="block rounded-xl px-3 py-2.5 hover:bg-zinc-50"
              >
                <div className="text-sm font-semibold text-zinc-900">
                  {it.title}
                </div>
                {it.desc ? (
                  <div className="mt-0.5 text-xs text-zinc-600">{it.desc}</div>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
  id,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div id={id} className="mx-auto max-w-3xl text-center scroll-mt-28">
      <div className="text-xs font-semibold tracking-wider text-zinc-500">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-pretty text-zinc-600">{desc}</p>
    </div>
  );
}

function SolutionRow({
  id,
  title,
  desc,
  mediaSrc,
  align = "left",
}: {
  id: string;
  title: string;
  desc: string;
  mediaSrc: string; // .mp4 preferred; .gif ok too
  align?: "left" | "right";
}) {
  const isMp4 = mediaSrc.toLowerCase().endsWith(".mp4") || mediaSrc.toLowerCase().endsWith(".webm");

  return (
    <div
      id={id}
      className={cx(
        "scroll-mt-28 grid items-center gap-8 md:grid-cols-2",
        align === "right" && "md:[&>*:first-child]:order-2"
      )}
    >
      <div>
        <div className="text-xs font-semibold tracking-wider text-indigo-600">
          SOLUTION
        </div>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
          {title}
        </h3>
        <p className="mt-3 text-zinc-600">{desc}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="https://app.wingit.dev" variant="ghost">
            Open app <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#contact" variant="ghost">
            Contact
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-indigo-200/60 via-pink-200/40 to-emerald-200/40 blur-2xl" />
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3">
            <div className="text-xs font-semibold text-zinc-700">{title}</div>
            <div className="text-xs text-zinc-500">{mediaSrc}</div>
          </div>

          {isMp4 ? (
            <video
              className="aspect-video w-full bg-white object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              {/* Browsers like explicit type; fine if you only serve mp4 */}
              <source
                src={mediaSrc}
                type={mediaSrc.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"}
              />
            </video>
          ) : (
            <img
              src={mediaSrc}
              alt={`${title} demo`}
              className="aspect-video w-full bg-white object-cover"
            />
          )}
        </div>

        <div className="mt-3 text-center text-xs text-zinc-500">
          These loops are muted on purpose (so they can autoplay).
        </div>
      </div>
    </div>
  );
}

export default function Page() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [appsOpen, setAppsOpen] = React.useState(false);
    const [resourcesOpen, setResourcesOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // You provided these exact URLs (even though mode params look reversed—using your values verbatim)
  const LINKS = {
    wingit: "https://wingit.dev",
    app: "https://app.wingit.dev",
    signIn: "https://app.wingit.dev/auth?mode=register",
    signUp: "https://app.wingit.dev/auth?mode=login",
  };

  // Dropdown content (placeholders included)
  const apps = [
    {
      title: "Wingit",
      href: LINKS.wingit,
      desc: "Presentations for Procrastinators",
    },
    { title: "GetTheBag", href: "#", desc: "Placeholder link (coming soon)." },
    { title: "Moreannon", href: "#", desc: "Placeholder link (coming soon)." },
  ];

  const resources = [
    { title: "What Do?", href: "#whatdo", desc: "Placeholder section." },
    { title: "Quickstart Guide", href: "#quickstart", desc: "Placeholder section." },
    { title: "How It Works", href: "#how", desc: "Placeholder section." },
    { title: "Roadmap", href: "#roadmap", desc: "Placeholder section." },
    { title: "Help Center", href: "#help", desc: "Placeholder section." },
    { title: "Testimonials", href: "#testimonials", desc: "Placeholder section." },
    { title: "Devs.Miami Blog", href: "#blog", desc: "Placeholder section." },
  ];

  // Solutions anchors + files (swap these to your real app captures)
  const solutionsNav: Array<{ label: string; href: string }> = [
    { label: "Presentations", href: "#solutions-presentations" },
    { label: "Meetings", href: "#solutions-meetings" },
    { label: "Lessons", href: "#solutions-lessons" },
    { label: "Podcasts", href: "#solutions-podcasts" },
    { label: "Video Calls", href: "#solutions-video-calls" },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Brand left */}
          <div className="flex items-center gap-4">
            <a href="https://devs.miami" className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                <img
                  src="/brand/devs-miami.jpeg"
                  alt="Devs.Miami"
                  className="h-full w-full object-contain p-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden h-8 w-8 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm sm:block">
                  <img
                    src="/brand/wingit.png"
                    alt="Wingit"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-semibold text-zinc-500">devs.miami</div>
                  <div className="text-sm font-semibold tracking-tight text-zinc-900">Wingit</div>
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              <NavDropdown label="Apps" items={apps} />
              <a
                href="#solutions"
                className="rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70"
              >
                Solutions
              </a>
              <NavDropdown label="Resources" items={resources} />
              <a
                href="#pricing"
                className="rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70"
              >
                Pricing
              </a>
            </nav>
          </div>

          {/* Right actions (desktop) */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={LINKS.signIn}
              className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950"
            >
              Sign In
            </a>
            <Button href={LINKS.signUp}>Try Wingit Free</Button>
            <Button href="#contact" variant="ghost">
              Contact
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile overlay */}
        {mobileOpen ? (
          <div className="md:hidden">
            <div
              className="fixed inset-0 z-50 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed right-0 top-0 z-50 h-full w-[92%] max-w-sm border-l border-zinc-200 bg-white p-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-900">Wingit</div>
                <button
                  type="button"
                  className="rounded-xl border border-zinc-200 bg-white p-2"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid gap-3">
                <MobileDisclosure
                  label="Apps"
                  items={apps}
                  open={appsOpen}
                  onToggle={() => setAppsOpen((v) => !v)}
                />

                <a
                  href="#solutions"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Solutions
                </a>

                <MobileDisclosure
                  label="Resources"
                  items={resources}
                  open={resourcesOpen}
                  onToggle={() => setResourcesOpen((v) => !v)}
                />

                <a
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Pricing
                </a>

                <div className="mt-2 grid gap-2">
                  <Button href={LINKS.signUp} className="w-full">
                    Try Wingit Free
                  </Button>
                  <Button href={LINKS.signIn} variant="ghost" className="w-full">
                    Sign In
                  </Button>
                  <Button href="#contact" variant="ghost" className="w-full">
                    Contact
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-xs text-zinc-500">
                Tip: mobile menus need click/tap — hover dropdowns don’t work on phones.
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* HERO (first view: big text + subheading; video comes after scroll) */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm">
              app.wingit.dev
            </span>
            <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm">
              demos + placeholders (for now)
            </span>
          </div>

          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            Presentations for Procrastinators
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-lg text-zinc-600 sm:text-xl">
            Generates the slides while you do the talking.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={LINKS.signUp}>
              Try Wingit Free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#hero-demo" variant="ghost">
              Watch demo
            </Button>
          </div>

          {/* placeholder strip */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-zinc-200 bg-white/70 px-4 py-4 shadow-sm">
            <div className="text-center text-xs font-semibold text-zinc-500">
              About to put these people out of business
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-zinc-500">
              <span>PowerPoint</span>
              <span>Google Slides</span>
              <span>Apple Keynote</span>
              <span>Notion</span>
              <span>Slack</span>
              <span>Figma</span>
            </div>
          </div>
        </div>
      </section>

      {/* HERO DEMO VIDEO (with sound) */}
      <section id="hero-demo" className="mx-auto max-w-6xl px-4 pb-24">
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-indigo-200/60 via-pink-200/40 to-emerald-200/40 blur-2xl" />
          <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-[0_30px_120px_-60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-2.5">
              <div className="text-xs font-semibold text-zinc-700">Wingit</div>
              <div className="text-xs text-zinc-500">Demo (43s)</div>
            </div>

            {/* SOUND works because no autoplay and not muted */}
            <video
              className="aspect-video w-full bg-white"
              controls
              playsInline
              preload="metadata"
              poster="/demo-poster.png"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>

            <div className="grid gap-3 p-4 sm:grid-cols-3">
              {[
                ["Generate", "Outline → deck in minutes."],
                ["Edit", "Rewrite without layout hell."],
                ["Share", "Link + export when ready."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="text-xs font-semibold text-zinc-500">{t}</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-zinc-500">
            I mean. It will probably be better than nothing... <code className="rounded bg-white/70 px-1 py-0.5">probably</code>.
          </div>
        </div>
      </section>

      {/* SOLUTIONS (down the page; nav scrolls to each media) */}
      <section id="solutions" className="mx-auto max-w-6xl px-4 pb-24">
        <SectionHeading
          eyebrow="SOLUTIONS"
          title="Scroll Down Below For Examples"
          desc="Click To Jump"
        />

        {/* mini-nav that scrolls to each solution */}
        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-2">
          {solutionsNav.map((x) => (
            <a
              key={x.href}
              href={x.href}
              className="rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-white hover:text-zinc-950 shadow-sm"
            >
              {x.label}
            </a>
          ))}
        </div>

        <div className="mt-12 grid gap-16">
          <SolutionRow
            id="solutions-presentations"
            title="Presentations"
            desc="Outline → clean deck. Iterate slide-by-slide without breaking typography."
            mediaSrc="/gifs/presentations.mp4"
          />
          <SolutionRow
            id="solutions-meetings"
            title="Meetings"
            desc="Turn meeting notes into a shareable deck that actually gets read."
            mediaSrc="/gifs/meetings.mp4"
            align="right"
          />
          <SolutionRow
            id="solutions-lessons"
            title="Lessons"
            desc="Teach with structure, pacing, and clarity—fast."
            mediaSrc="/gifs/lessons.mp4"
          />
          <SolutionRow
            id="solutions-podcasts"
            title="Podcasts"
            desc="Episode outline → a visual companion deck for guests and socials."
            mediaSrc="/gifs/podcasts.mp4"
            align="right"
          />
          <SolutionRow
            id="solutions-video-calls"
            title="Video Calls"
            desc="Recaps + follow-up decks that keep everyone aligned."
            mediaSrc="/gifs/video-calls.mp4"
          />
        </div>
      </section>

      {/* PLACEHOLDER SECTIONS so links aren’t dead */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-10 shadow-sm scroll-mt-28">
          <h3 className="text-xl font-semibold text-zinc-950">Pricing</h3>
          <p className="mt-2 text-zinc-600">Placeholder. Add tiers when ready.</p>
        </div>
      </section>

      <section id="whatdo" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm scroll-mt-28">
          <h3 className="text-lg font-semibold text-zinc-950">What Do?</h3>
          <p className="mt-2 text-zinc-600">Placeholder. Your 30-second explanation goes here.</p>
        </div>
      </section>

      <section id="quickstart" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm scroll-mt-28">
          <h3 className="text-lg font-semibold text-zinc-950">Quickstart Guide</h3>
          <p className="mt-2 text-zinc-600">Placeholder. Steps + screenshots.</p>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm scroll-mt-28">
          <h3 className="text-lg font-semibold text-zinc-950">How It Works</h3>
          <p className="mt-2 text-zinc-600">Placeholder. Explain the workflow + magic.</p>
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm scroll-mt-28">
          <h3 className="text-lg font-semibold text-zinc-950">Roadmap</h3>
          <p className="mt-2 text-zinc-600">Placeholder. What you’re shipping next.</p>
        </div>
      </section>

      <section id="help" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm scroll-mt-28">
          <h3 className="text-lg font-semibold text-zinc-950">Help Center</h3>
          <p className="mt-2 text-zinc-600">Placeholder. FAQs + troubleshooting.</p>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm scroll-mt-28">
          <h3 className="text-lg font-semibold text-zinc-950">Testimonials</h3>
          <p className="mt-2 text-zinc-600">Placeholder. Add real quotes ASAP.</p>
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm scroll-mt-28">
          <h3 className="text-lg font-semibold text-zinc-950">Devs.Miami Blog</h3>
          <p className="mt-2 text-zinc-600">Placeholder. Link your posts here.</p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-10 shadow-sm scroll-mt-28">
          <h3 className="text-xl font-semibold text-zinc-950">Contact</h3>
          <p className="mt-2 text-zinc-600">
            Placeholder. Hook this up to email, a form, or Calendly.
          </p>
          <div className="mt-5 flex flex-wrap justify-start gap-3">
            <Button href="mailto:rob@devs.miami?subject=Wingit%20demo" variant="primary">
              Email us
            </Button>
            <Button href={LINKS.app} variant="ghost">
              Open app
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-xs text-zinc-500 sm:flex-row">
          <div>© {new Date().getFullYear()} devs.miami</div>
          <div className="flex flex-wrap items-center gap-4">
            <a className="hover:text-zinc-900" href="#">
              Privacy (placeholder)
            </a>
            <a className="hover:text-zinc-900" href="#">
              Terms (placeholder)
            </a>
            <a className="hover:text-zinc-900" href={LINKS.signIn}>
              Sign In
            </a>
            <a className="hover:text-zinc-900" href={LINKS.signUp}>
              Sign Up
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
