import Reveal from "../components/Reveal"

export const partners = [
  "BAS FINANCE",
  "MULBERRY TRUSTEE",
  "SPRINGTYDE",
  "MPL FINANCE & INVESTMENT",
  "NIRSAL",
  "MART TRADING",
  "DEALCRAFT",
  "NICERT",
]

export default function Trust() {
  return (
    <section className="bg-warm-white py-32 md:py-48">
      <div className="wrap">
        <Reveal>
          <div className="flex items-center gap-5">
            <span className="h-px w-12 bg-near-black/25" aria-hidden />
            <p className="eyebrow text-near-black/55">Companies in the Credence ecosystem</p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ul className="mt-16 max-w-[68rem] font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.35] tracking-[-0.03em] md:mt-24">
            {partners.map((p, i) => (
              <li key={p} className="block md:inline">
                <span className="text-near-black/35 transition-colors duration-500 hover:text-near-black">{p}</span>
                {i < partners.length - 1 && (
                  <span className="mx-[0.55em] hidden h-[0.7em] md:inline-block w-px translate-y-[0.08em] bg-near-black/20 align-baseline" aria-hidden />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
