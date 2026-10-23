import Reveal from "../components/Reveal"
import { Head } from "./parts"

const items = [
  ["Short duration exposure", "Transactions are typically structured around defined trade cycles with clear execution timelines, defined exit strategies and shorter capital deployment periods."],
  ["Asset backed structures", "Transaction files may specify the underlying security supporting the transaction, including commodities, Export Notes, receivables, contractual cash flows and other transaction-specific security arrangements."],
  ["Real economy trade", "Capital supports tangible commercial activity including commodity trade, supply chains, export contracts, procurement and working-capital requirements."],
  ["Active management", "Credence coordinates the transaction lifecycle from origination and structuring through monitoring and settlement."],
]

export default function Memo() {
  return (
    <section className="section-y bg-warm-white text-near-black">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Head eyebrow="Capital partners" title="Why capital partners work with Credence." className="lg:sticky lg:top-32 lg:self-start" />
        <div className="border-t border-near-black">
          {items.map(([t, d], i) => (
            <Reveal key={t} delay={i * 60}>
              <div className="grid gap-3 border-b border-near-black/15 py-9 md:grid-cols-[3rem_1fr] md:gap-6 md:py-12">
                <span className="eyebrow pt-1 text-near-black/45">0{i + 1}</span>
                <div>
                  <h3 className="eyebrow text-near-black">{t}</h3>
                  <p className="mt-4 font-display text-xl leading-snug tracking-[-0.02em] md:text-2xl">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <p className="pt-6 text-xs text-near-black/50">Exits and transaction outcomes are not guaranteed.</p>
        </div>
      </div>
    </section>
  )
}
