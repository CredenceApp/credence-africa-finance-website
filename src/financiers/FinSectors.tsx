import Photo from "../components/Photo"
import Reveal from "../components/Reveal"
import { img } from "../images"
import { Head } from "./parts"

const s = [
  { k: "agriculture", n: "01", t: "Agriculture & Commodities", d: "Purchase, aggregation and export trade with identified counterparties.", cls: "lg:col-span-7 aspect-[4/3] lg:aspect-[16/11]" },
  { k: "energy", n: "02", t: "Energy", d: "Refined products and supply chain trade with defined delivery terms.", cls: "lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-full lg:mt-24" },
  { k: "minerals", n: "03", t: "Solid Minerals", d: "Mineral trade structured around contracts and documented supply.", cls: "lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-full" },
  { k: "border", n: "04", t: "Cross Border Trade", d: "Export and import transactions across African trade corridors.", cls: "lg:col-span-7 aspect-[4/3] lg:aspect-[16/11] lg:mt-24" },
] as const

export default function FinSectors() {
  return (
    <section className="section-y bg-near-black text-white">
      <div className="wrap">
        <Head eyebrow="Origination environments" title="Where transactions originate." dark />
        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-12 lg:gap-8">
          {s.map((x) => (
            <Reveal key={x.k} className={x.cls.includes("lg:col-span-7") ? "lg:col-span-7" : "lg:col-span-5"}>
              <div className={x.cls.includes("mt-24") ? "lg:mt-24" : ""}>
                <Photo src={img(x.k, 1400, 1000)} alt={`${x.t} origination environment`} className="aspect-[4/3] w-full" />
                <div className="mt-5 flex gap-5 border-t border-white/20 pt-4">
                  <span className="eyebrow text-white/45">{x.n}</span>
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.02em]">{x.t}</h3>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/60">{x.d}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
