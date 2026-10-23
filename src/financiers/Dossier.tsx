import Reveal from "../components/Reveal"
import ProductShot, { ShotNote } from "../components/ProductShot"
import { Head } from "./parts"

const items = [
  ["Counterparty information", "Buyer and supplier identity, standing and verified background."],
  ["Commercial documentation", "Contracts, orders and supporting documents for the underlying trade."],
  ["Commercial terms and economics", "The commercial terms of the transaction and how value moves through it."],
  ["Tenor", "The defined trade cycle and the timeline for capital deployment."],
  ["Payment conditions", "Agreed terms governing how and when payment is made."],
  ["Underlying security", "Commodities, Export Notes, receivables or contractual cash flows."],
  ["Execution requirements", "Conditions and milestones that must be met as the trade is carried out."],
  ["Risk information", "Structured considerations for the capital partner's own review."],
  ["Monitoring requirements", "What is tracked, and against which agreed conditions, through settlement."],
]

export default function Dossier() {
  return (
    <section className="section-y bg-stone text-near-black">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Head eyebrow="Institutional assessment" title="What a capital partner receives." />
        <Reveal delay={100}>
          <ol className="border-t border-near-black">
            {items.map(([t, d], i) => (
              <li key={t} className="grid gap-1 border-b border-near-black/15 py-4 sm:grid-cols-[2.5rem_1fr_1.3fr] sm:gap-5">
                <span className="eyebrow pt-1 text-near-black/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg tracking-[-0.02em]">{t}</h3>
                <p className="text-[15px] leading-relaxed text-near-black/65">{d}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
      <div className="wrap mt-16 md:mt-24">
        <ProductShot
          desktop={["04-financier-transaction-review@2x.png", 3200, 1600]}
          mobile={["04M-financier-review@3x.png", 1290, 1980]}
          alt="Financier transaction review showing the structured transaction record, documents and assessment summary."
          className="mx-auto max-w-md md:max-w-none lg:ml-[12%] lg:w-[88%]"
        />
        <ShotNote className="mt-3 lg:ml-[12%]" />
      </div>
    </section>
  )
}
