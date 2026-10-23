import Button from "../components/Button"
import Reveal from "../components/Reveal"
import { getStarted, goto, contactHref } from "../links"

export default function MerCta() {
  return (
    <section className="section-y bg-deep-green text-white">
      <div className="wrap">
        <Reveal>
          <h2 className="display-section max-w-[52rem]">
            Your Trade.
            <br />
            An Asset.
            <br />
            A Reason to Finance.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-7 max-w-[34rem] text-base leading-relaxed text-white/75 md:text-[17px]">
            Start with your transaction opportunity and let Credence help organise the structure, information and execution path.
          </p>
        </Reveal>
        <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
          <Button variant="light" onClick={() => getStarted("merchant")}>Get Started</Button>
          <Button variant="outline-dark" onClick={() => goto(contactHref("merchant"))}>
            Talk to Sales
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
