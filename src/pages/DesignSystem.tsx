import { EvidenceModule } from "../sections/Proof"
import Nav from "../components/Nav"
import Button from "../components/Button"
import Logo from "../components/Logo"

const palette = [
  ["Green", "#2E5F57", "bg-green", "text-white"],
  ["Orange", "#F08921", "bg-orange", "text-near-black"],
  ["Deep Green", "#173B35", "bg-deep-green", "text-white"],
  ["Midnight", "#0E2420", "bg-midnight", "text-white"],
  ["Near Black", "#0B0E0D", "bg-near-black", "text-white"],
  ["Charcoal", "#151918", "bg-charcoal", "text-white"],
  ["Warm White", "#F7F7F3", "bg-warm-white border border-line", "text-near-black"],
  ["Soft Stone", "#ECEDE8", "bg-stone", "text-near-black"],
]

export default function DesignSystem() {
  return (
    <div>
      <Nav />
      <header className="bg-near-black pt-36 pb-16 text-white md:pt-44 md:pb-20">
        <div className="wrap">
          <p className="eyebrow text-white/50">Internal documentation</p>
          <h1 className="display-section mt-5">00 — DESIGN SYSTEM</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            Structured Capital. Foundation tokens and components for the Credence marketing site. Not part of the public site.
          </p>
        </div>
      </header>

      <section className="section-y bg-warm-white">
        <div className="wrap grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-green">Tokens</p>
            <h2 className="display-sub mt-5">Colour, type and controls</h2>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-media border border-line bg-line sm:grid-cols-4">
              {palette.map(([name, hex, bg, fg]) => (
                <div key={name} className={`${bg} ${fg} flex aspect-[4/3] flex-col justify-end p-4`}>
                  <span className="text-sm">{name}</span>
                  <span className="text-xs opacity-60">{hex}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-10 border-b border-line py-12 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-muted">Display — Space Grotesk</p>
                <p className="display-sub mt-4">Verified, structured, financeable.</p>
              </div>
              <div>
                <p className="eyebrow text-muted">Body — Lexend Deca</p>
                <p className="mt-4 text-base leading-relaxed text-near-black/80">
                  Short supporting paragraphs. Clear hierarchy, restrained weight, generous space.
                </p>
              </div>
            </div>

            <div className="border-b border-line py-12">
              <p className="eyebrow mb-6 text-muted">Logo</p>
              <div className="flex flex-wrap gap-6">
                <div className="rounded-ui bg-near-black p-6">
                  <Logo />
                </div>
                <div className="rounded-ui border border-line p-6">
                  <Logo tone="light" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-12">
              <Button>Get Started</Button>
              <Button variant="outline">Learn more</Button>
              <Button variant="text">Sign in</Button>
              <Button variant="accent">For Financiers</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-warm-white pb-20 text-near-black">
        <div className="wrap">
          <p className="eyebrow mb-6 text-muted">Internal · Typography comparison (undecided)</p>
          <div className="grid gap-px bg-line md:grid-cols-2">
            {[
              ["Option A", "Current pairing: Space Grotesk display, Lexend Deca body", "var(--font-display)"],
              ["Option B", "Lexend Deca for both display and body", "var(--font-sans)"],
            ].map(([k, d, f]) => (
              <div key={k} className="bg-warm-white p-8 md:pr-10">
                <p className="eyebrow">{k}</p>
                <p className="mt-2 text-sm text-muted">{d}</p>
                <p className="mt-8 text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.03em]" style={{ fontFamily: f }}>
                  Trade that is real deserves finance that is structured.
                </p>
                <p className="mt-6 text-base leading-relaxed text-near-black/70" style={{ fontFamily: "var(--font-sans)" }}>
                  Credence reviews the opportunity, the trade structure and the information available, and completes relevant checks as required.
                </p>
              </div>
            ))}
          </div>

          <p className="eyebrow mb-6 mt-16 text-muted">Internal · Optional partner entries (text only, no logos supplied)</p>
          <ul className="border-t border-near-black">
            {["DEALCRAFT", "NICERT"].map((n) => (
              <li key={n} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4">
                <span className="font-display text-lg">{n}</span>
                <span className="eyebrow text-muted">Text only · Approved working list</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="wrap pb-20">
        <EvidenceModule force />
      </div>
    </div>
  )
}
