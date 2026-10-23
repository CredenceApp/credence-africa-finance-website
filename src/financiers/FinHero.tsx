import type { CSSProperties } from "react"
import Button from "../components/Button"
import FinField from "./FinField"
import { bookBriefing, getStarted } from "../links"

const rise = (d: number) => ({ animation: `rise .9s cubic-bezier(0.65,0,0.35,1) ${d}s both` })

export default function FinHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-midnight text-white" style={{ "--col": "calc((100vw - 705 * max(100vw / 1440, 100svh / 900)) - ((100vw - min(100vw, 1280px)) / 2 + clamp(1.25rem, 4vw, 2.5rem)) - 2rem)" } as CSSProperties}>
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_right,transparent,black_70%)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 70% at 85% 50%, rgba(23,59,53,0.9), transparent)" }} />
      <div className="absolute inset-0 opacity-35 xl:opacity-100">
        <FinField />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-midnight via-midnight/75 to-transparent xl:w-3/5" />
      <div className="wrap relative pt-32 pb-44">
        <div className="max-w-[44rem] xl:max-w-[min(44rem,var(--col))]">
          <p className="eyebrow text-orange" style={rise(0)}>
            For capital partners
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,5.4vw,4.75rem)] xl:text-[clamp(2.5rem,4.2vw,4.25rem)] leading-[1.02] tracking-[-0.04em]" style={rise(0.1)}>
            Real economy trade.
            <br />
            Structured for capital decisions.
          </h1>
          <p className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/65 md:text-[17px]" style={rise(0.2)}>
            Credence originates, structures and manages asset backed trade finance opportunities across agriculture, energy and minerals, from verification through settlement.
          </p>
          <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-white" style={rise(0.25)}>
            Review structured transactions and decide where to participate.
          </p>
          <div className="mt-10 flex flex-wrap gap-3" style={rise(0.3)}>
            <Button variant="light" onClick={bookBriefing}>Book a Briefing</Button>
            <Button
              variant="outline-dark"
              onClick={() => document.getElementById("fin-process")?.scrollIntoView({ behavior: "smooth" })}
            >
              See How It Works
            </Button>
            <Button variant="text" className="text-white underline decoration-white/40 underline-offset-4" onClick={() => getStarted("financier")}>
              Create Financier Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
