import Button from "../components/Button"
import Reveal from "../components/Reveal"
import { bookBriefing } from "../links"

export default function IntCta() {
  return (
    <section className="section-y bg-deep-green text-white">
      <div className="wrap">
        <Reveal>
          <h2 className="display-section max-w-[52rem]">From operational data to financing intelligence.</h2>
        </Reveal>
        <Reveal delay={150} className="mt-10 flex flex-wrap gap-3">
          <Button variant="light" onClick={bookBriefing}>Book a Briefing</Button>
          <Button variant="outline-dark" onClick={() => (window.location.hash = "#top")}>
            Explore Credence
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
