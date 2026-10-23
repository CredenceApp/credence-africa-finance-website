import Photo from "../components/Photo"
import Reveal from "../components/Reveal"
import { img } from "../images"
import { Head } from "./parts"

const s = [
  { k: "agriculture", t: "Agriculture & Commodities", d: "Commodity purchases, aggregation, supply and export transactions built around identified buyers, suppliers and defined trade requirements." },
  { k: "energy", t: "Energy", d: "Refined products and energy supply chain transactions with defined parties, volumes, pricing and delivery requirements." },
  { k: "minerals", t: "Solid Minerals", d: "Supply and offtake transactions across selected mineral markets supported by counterparty and transaction verification." },
] as const

export default function MerSectors() {
  return (
    <section className="section-y bg-near-black text-white">
      <div className="wrap">
        <Head eyebrow="Real economy sectors" title="Trade that moves physical goods." dark />
        <div className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-3">
          {s.map((x, i) => (
            <Reveal key={x.k} delay={i * 100}>
              <Photo src={img(x.k, 1000, 1400)} alt={x.t} className="flex aspect-[4/5] items-end lg:aspect-[3/4]" shade="from-near-black/95 via-near-black/35 to-near-black/5">
                <div className="p-6 md:p-8">
                  <span className="eyebrow text-white/60">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-[-0.02em] md:text-3xl">{x.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/75">{x.d}</p>
                </div>
              </Photo>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid gap-3 border-t border-white/20 pt-6 md:grid-cols-[14rem_1fr] md:gap-10">
          <p className="eyebrow text-white/60">Cross Border Trade</p>
          <p className="max-w-2xl text-[15px] leading-relaxed text-white/70">Transactions may also operate across cross-border trade corridors connecting suppliers, buyers and capital partners across African markets.</p>
        </div>
      </div>
    </section>
  )
}
