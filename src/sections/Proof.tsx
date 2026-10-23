import Reveal from "../components/Reveal"
import { partners } from "./Trust"

const slots = [
  { tag: "Verified metrics", head: "[APPROVED METRIC]", note: "Awaiting approved data" },
  { tag: "Case study", head: "[APPROVED TRANSACTION CASE STUDY]", note: "Awaiting approved case study" },
  { tag: "Testimonial", head: "[APPROVED CAPITAL PARTNER TESTIMONIAL]", note: "Awaiting approved testimonial" },
]

export function EvidenceModule({ force = false }: { force?: boolean }) {
  if (!force) return null
  return (
    <Reveal delay={120} className="mt-20 md:mt-32">
          <div className="border border-dashed border-near-black/25 bg-stone/60">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-near-black/25 px-6 py-4 md:px-10">
              <p className="eyebrow text-near-black/70">Reserved module · Verified evidence</p>
              <p className="text-xs text-near-black/50">Design placeholder. Replace with approved content only.</p>
            </div>
            <div className="grid divide-near-black/15 md:grid-cols-3 md:divide-x">
              {slots.map((s) => (
                <div key={s.tag} className="flex min-h-64 flex-col justify-between border-b border-near-black/15 p-6 last:border-b-0 md:border-b-0 md:p-10">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-near-black/55">{s.tag}</p>
                  <h3 className="my-10 font-display text-xl leading-tight tracking-tight text-near-black/60 md:text-2xl">{s.head}</h3>
                  <p className="text-xs text-near-black/55">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
  )
}

export default function Proof() {
  return (
    <section id="about" className="section-y bg-warm-white">
      <div className="wrap">
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.045em] lg:col-span-8">
            Built for serious trade.
          </h2>
          <div className="lg:col-span-4 lg:self-end">
            <p className="eyebrow text-near-black/50">Capital and trade partners</p>
            <p className="mt-4 text-sm leading-relaxed text-near-black/75">{partners.join("  ·  ")}</p>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
