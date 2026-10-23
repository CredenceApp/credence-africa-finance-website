import Button from "../components/Button"
import Reveal from "../components/Reveal"
import { bookBriefing, getStarted } from "../links"

export default function FinCta() {
  return (
    <section className="section-y bg-deep-green text-white">
      <div className="wrap">
        <Reveal>
          <h2 className="display-section max-w-[52rem]">
            Extend your origination.
            <br />
            Expand your deployment capacity.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-7 max-w-[32rem] text-base leading-relaxed text-white/70 md:text-[17px]">
            Review structured real economy trade opportunities through Credence.
          </p>
        </Reveal>
        <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
          <Button variant="light" onClick={bookBriefing}>Book a Briefing</Button>
          <Button variant="outline-dark" onClick={() => (window.location.hash = "#/contact")}>
            Contact Credence
          </Button>
          <Button variant="accent" onClick={() => getStarted("financier")}>Create Financier Account</Button>
        </Reveal>
      </div>
    </section>
  )
}
