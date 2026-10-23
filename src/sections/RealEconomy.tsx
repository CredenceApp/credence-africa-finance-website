import Photo from "../components/Photo"
import Reveal from "../components/Reveal"
import { img } from "../images"

type Sector = {
  n: string
  title: string
  text: string
  tags: string[]
}

const agri: Sector = {
  n: "01",
  title: "Agriculture & Commodities",
  text: "Commodity purchases, aggregation, supply and export transactions built around identified buyers, suppliers and defined trade requirements.",
  tags: ["Purchases", "Aggregation", "Supply", "Export"],
}
const energy: Sector = {
  n: "02",
  title: "Energy",
  text: "Refined products and energy supply chain transactions with defined parties, volumes, pricing and delivery requirements.",
  tags: ["Parties", "Volumes", "Pricing", "Delivery"],
}
const minerals: Sector = {
  n: "03",
  title: "Solid Minerals",
  text: "Supply and offtake transactions across selected mineral markets supported by counterparty and transaction verification.",
  tags: ["Supply", "Offtake", "Verification"],
}
const border: Sector = {
  n: "04",
  title: "Cross Border Trade",
  text: "Transactions connecting suppliers, buyers and capital partners across African markets with structured execution and settlement.",
  tags: ["Suppliers", "Buyers", "Capital partners", "Settlement"],
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 border-t border-white/25 pt-3 text-xs uppercase tracking-[0.14em] text-white/70">
      {tags.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function Title({ s, big }: { s: Sector; big?: boolean }) {
  return (
    <>
      <p className="text-xs tabular-nums tracking-[0.14em] text-white/60">{s.n}</p>
      <h3
        className={`mt-3 font-display leading-[0.98] tracking-[-0.035em] ${big ? "text-[clamp(2.5rem,6.2vw,6rem)]" : "text-[clamp(2rem,3.6vw,3.5rem)]"}`}
      >
        {s.title}
      </h3>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">{s.text}</p>
    </>
  )
}

export default function RealEconomy() {
  return (
    <section id="sectors" className="bg-near-black text-white">
      <div className="wrap section-y grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-9">
          <p className="eyebrow text-white/50">Where we operate</p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.045em]">
            Capital behind real economic activity.
          </h2>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-base leading-relaxed text-white/60">
            Credence originates and structures transactions across selected real economy trade sectors.
          </p>
        </Reveal>
      </div>

      <Photo
        src={img("agriculture", 2400, 1400)}
        alt="Combine harvester working through a field of maize"
        className="h-[88svh] min-h-[32rem]"
        position="50% 60%"
      >
        <div className="wrap absolute inset-x-0 bottom-0 grid gap-8 pb-10 md:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Title s={agri} big />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Tags tags={agri.tags} />
          </div>
        </div>
      </Photo>

      <div className="mt-3 grid items-start gap-3 px-3 md:px-4 lg:grid-cols-12 lg:gap-4">
        <Photo
          src={img("energy", 1800, 1400)}
          alt="Refinery storage tanks and pipework under a golden sky"
          className="h-[72svh] min-h-[28rem] lg:col-span-8 lg:h-[82svh]"
        >
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <Title s={energy} />
            <div className="mt-6 max-w-md">
              <Tags tags={energy.tags} />
            </div>
          </div>
        </Photo>
        <Photo
          src={img("minerals", 1200, 1400)}
          alt="Excavators working an open mining area"
          className="h-[60svh] min-h-[26rem] lg:col-span-4 lg:mt-48 lg:h-[56svh]"
          position="40% 50%"
        >
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <Title s={minerals} />
            <div className="mt-6">
              <Tags tags={minerals.tags} />
            </div>
          </div>
        </Photo>
      </div>

      <Photo
        src={img("border", 2400, 1200)}
        alt="Cargo ship loaded with containers at a port"
        className="mt-3 mb-24 h-[72svh] min-h-[28rem] md:mb-40"
        shade="from-near-black/85 via-near-black/30 to-near-black/20"
      >
        <div className="wrap absolute inset-x-0 bottom-0 grid gap-8 pb-10 md:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <Tags tags={border.tags} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Title s={border} />
          </div>
        </div>
      </Photo>
    </section>
  )
}
