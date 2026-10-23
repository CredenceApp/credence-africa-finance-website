import Reveal from "../components/Reveal"
import { partners } from "../sections/Trust"
import { Head } from "./parts"

export default function FinTrust() {
  return (
    <section className="section-y bg-stone text-near-black">
      <div className="wrap">
        <Head eyebrow="Trust and evidence" title="Part of a wider trade and capital ecosystem." />
        <Reveal delay={150}>
          <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-near-black/20 pt-8 font-display text-xl tracking-[-0.02em] text-near-black/60 md:text-2xl">
            {partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
