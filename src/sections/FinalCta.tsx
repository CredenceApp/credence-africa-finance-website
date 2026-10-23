import Button from "../components/Button"
import Reveal from "../components/Reveal"
import { getStarted, bookBriefing } from "../links"

export default function FinalCta() {
  return (
    <section id="contact" className="section-y bg-deep-green text-white">
      <div className="wrap">
        <Reveal>
          <h2 className="max-w-[12ch] font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.94] tracking-[-0.045em]">Ready to move trade forward?</h2>
        </Reveal>

        <div className="mt-16 grid border-t border-white/15 md:mt-24 md:grid-cols-2">
          <Reveal className="border-b border-white/15 py-10 md:border-b-0 md:py-12 md:pr-12">
            <p className="display-sub">Have a trade opportunity?</p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70">
              Bring the opportunity. Credence helps structure the path to execution.
            </p>
            <Button variant="light" className="mt-8" onClick={() => getStarted()}>
              Get Started
            </Button>
          </Reveal>
          <Reveal delay={120} className="py-10 md:border-l md:border-white/15 md:py-12 md:pl-12">
            <p className="display-sub">Looking to deploy capital?</p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70">
              Review structured real economy trade opportunities through Credence.
            </p>
            <Button variant="accent" className="mt-8" onClick={bookBriefing}>
              Book a Briefing
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
