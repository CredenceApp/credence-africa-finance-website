import Button from "../components/Button"
import Reveal from "../components/Reveal"

export default function Perspective() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-warm-white px-5 py-24 text-near-black md:px-12 md:py-36 lg:pl-[max(2rem,calc((100vw-1280px)/2))] lg:pr-20">
        <Reveal>
          <p className="eyebrow text-green">For merchants</p>
          <p className="mt-6 max-w-md font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.03em]">
            Structured operational records around trade execution.
          </p>
          <Button variant="primary" className="mt-9" onClick={() => (window.location.hash = "#/merchants")}>
            Credence for Merchants
          </Button>
        </Reveal>
      </div>
      <div className="bg-midnight px-5 py-24 text-white md:px-12 md:py-36 lg:pl-20 lg:pr-[max(2rem,calc((100vw-1280px)/2))]">
        <Reveal delay={100}>
          <p className="eyebrow text-white/60">For capital partners</p>
          <p className="mt-6 max-w-md font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.03em]">
            Structured intelligence for assessment, monitoring and portfolio visibility.
          </p>
          <Button variant="light" className="mt-9" onClick={() => (window.location.hash = "#/financiers")}>
            Credence for Financiers
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
