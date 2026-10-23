import Button from "../components/Button"
import Photo from "../components/Photo"
import Reveal from "../components/Reveal"
import { img } from "../images"

const review = [
  ["Counterparty information", "Verified"],
  ["Documentation", "Verified"],
  ["Payment controls", "Set"],
  ["Transaction monitoring", "Active"],
]

const padL = "lg:pl-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))]"
const padR = "lg:pr-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))]"

function Schematic() {
  return (
    <svg viewBox="0 0 600 440" className="absolute inset-0 size-full" fill="none" aria-hidden>
      <path d="M0 220 H300" stroke="#f08921" strokeWidth="1.5" />
      <path d="M300 60 V380" stroke="rgba(255,255,255,0.3)" />
      {review.map(([k, v], i) => {
        const y = 90 + i * 76
        return (
          <g key={k}>
            <path d={`M300 ${y} H330`} stroke="rgba(255,255,255,0.3)" />
            <circle cx="300" cy={y} r="3" fill="#0b0e0d" stroke="rgba(255,255,255,0.8)" />
            <text x="342" y={y - 2} fill="#fff" fontSize="14" className="font-sans">
              {k}
            </text>
            <text x="342" y={y + 16} fill="rgba(255,255,255,0.5)" fontSize="11" letterSpacing="1.4" className="font-sans uppercase">
              {v}
            </text>
          </g>
        )
      })}
      <circle cx="300" cy="220" r="5" fill="#f08921" />
      <path d="M300 380 H560" stroke="#f08921" strokeWidth="1.5" />
      <circle cx="560" cy="380" r="4" fill="#f08921" />
      <text x="556" y="364" textAnchor="end" fill="#f08921" fontSize="11" letterSpacing="1.6" className="font-sans uppercase">
        Capital
      </text>
      <text x="556" y="408" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="13" className="font-sans">
        [Capital requirement]
      </text>
    </svg>
  )
}

export default function TwoSides() {
  return (
    <section id="solutions" className="bg-warm-white pt-[clamp(5rem,11vw,10rem)]">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-green">Built for both sides of trade</p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.045em]">
            Trade needs structure.
            <br />
            <span className="text-near-black/40">Capital needs clarity.</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-16 grid md:mt-28 lg:grid-cols-2">
        <div className="flex flex-col">
          <Photo
            src={img("merchant", 1600, 1200)}
            alt="Trader at a fruit stand in a market"
            className="h-[26rem] md:h-[34rem]"
            shade="from-deep-green/70 via-green/25 to-green/20"
          >
            <svg className="absolute inset-0 size-full" fill="none" aria-hidden>
              <path d="M24 56 V24 H56" stroke="rgba(255,255,255,0.7)" />
            </svg>
            <ul className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-white/85 md:bottom-8 md:left-8 md:right-8">
              {["Opportunity", "Verified", "Structured"].map((t, i) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-1.5 bg-white" style={{ opacity: 0.4 + i * 0.3 }} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Photo>
          <div className={`flex-1 px-5 py-12 md:px-10 md:py-16 ${padL} lg:pr-16`}>
            <Reveal>
              <p className="eyebrow text-green">For Merchants</p>
              <h3 className="mt-5 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-none tracking-[-0.04em]">Bring the trade.</h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-near-black/70">
                Credence helps qualifying merchants structure transactions, strengthen documentation, access aligned capital and coordinate execution through settlement.
              </p>
              <Button variant="primary" className="mt-9" onClick={() => (window.location.hash = "#/merchants")}>
                Explore Credence for Merchants
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col bg-near-black text-white">
          <div className="hairline-grid relative h-[26rem] md:h-[34rem]">
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(23,59,53,0.55),transparent)]" />
            <Schematic />
          </div>
          <div className={`flex-1 px-5 py-12 md:px-10 md:py-16 lg:pl-16 ${padR}`}>
            <Reveal delay={120}>
              <p className="eyebrow text-orange">For Capital Partners</p>
              <h3 className="mt-5 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-none tracking-[-0.04em]">
                Deploy with greater visibility.
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
                Access structured real economy transactions supported by counterparty information, documentation, controls and ongoing transaction monitoring.
              </p>
              <Button variant="accent" className="mt-9" onClick={() => (window.location.hash = "#/financiers")}>
                Explore Credence for Financiers
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 top-[17rem] hidden h-px w-1/2 bg-gradient-to-r from-white/10 to-white/80 lg:block" aria-hidden />
        <div className="absolute left-1/2 top-[17rem] z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/30 bg-near-black px-4 py-2 text-xs uppercase tracking-[0.18em] text-white lg:flex">
          <span className="size-1.5 rounded-full bg-orange" aria-hidden />
          Credence
        </div>
      </div>
    </section>
  )
}
