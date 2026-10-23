import { useState } from "react"
import { Head } from "./parts"
import Button from "../components/Button"
import { goto, contactHref } from "../links"

type N = { t: string; cap?: string }
const items: { name: string; d: string; nodes: N[] }[] = [
  {
    name: "Purchase Order Finance",
    d: "Supports the execution of a purchase order between a buyer and a supplier.",
    nodes: [{ t: "Buyer" }, { t: "Purchase order" }, { t: "Merchant" }, { t: "Supplier", cap: "Aligned capital" }, { t: "Execution requirement" }],
  },
  {
    name: "Export Finance",
    d: "Supports an export trade from the merchant through shipment to settlement.",
    nodes: [{ t: "Merchant", cap: "Aligned capital" }, { t: "Export trade" }, { t: "Shipment" }, { t: "Buyer" }, { t: "Settlement" }],
  },
  {
    name: "Supply Chain Finance",
    d: "Supports working capital between a supplier and a buyer around the payment cycle.",
    nodes: [{ t: "Supplier" }, { t: "Working capital need", cap: "Aligned capital" }, { t: "Buyer" }, { t: "Payment cycle" }],
  },
]

export default function Instruments() {
  const [i, setI] = useState(0)
  const cur = items[i]
  return (
    <section className="section-y bg-stone text-near-black">
      <div className="wrap">
        <Head eyebrow="Financing instruments" title="Structures built around the trade." />
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div role="tablist" className="border-t border-near-black">
            {items.map((x, k) => (
              <button
                key={x.name}
                role="tab"
                aria-selected={k === i}
                onClick={() => setI(k)}
                className={`block w-full border-b border-near-black/20 py-6 text-left transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
              >
                <span className="eyebrow text-near-black/55">0{k + 1}</span>
                <span className="mt-2 block font-display text-2xl tracking-[-0.02em] md:text-3xl">{x.name}</span>
                <span className={`grid transition-all duration-500 ${k === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="overflow-hidden pt-2 text-[15px] leading-relaxed text-near-black/65">{x.d}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="bg-warm-white px-6 py-8 md:px-10 md:py-12">
            <div className="flex items-center justify-between border-b border-near-black/20 pb-4">
              <p className="eyebrow">{cur.name}</p>
            </div>
            <ol key={i} className="mt-10 flex flex-col md:flex-row md:items-start">
              {cur.nodes.map((n, k) => (
                <li key={n.t} className="flex flex-1 flex-col md:flex-row md:items-start" style={{ animation: `rise .7s cubic-bezier(0.65,0,0.35,1) ${k * 0.1}s both` }}>
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                    <span className={`size-3 shrink-0 border ${n.cap ? "border-orange" : "border-near-black"} ${k === 0 ? "bg-near-black" : "bg-warm-white"}`} />
                    <div className="md:mt-4">
                      <p className="font-display text-lg leading-tight tracking-[-0.02em]">{n.t}</p>
                      {n.cap && <p className="eyebrow mt-2 text-xs text-near-black before:mr-1.5 before:inline-block before:size-1.5 before:rounded-full before:bg-orange">{n.cap}</p>}
                    </div>
                  </div>
                  {k < cur.nodes.length - 1 && (
                    <span className="ml-[5px] h-8 w-px bg-near-black/30 md:ml-3 md:mt-[5px] md:h-px md:flex-1" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-near-black/55">Availability for any transaction is subject to qualification. Funding is not guaranteed.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-near-black/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl tracking-[-0.02em] md:text-2xl">Instrument not listed?</p>
          <Button variant="outline" onClick={() => goto(contactHref("merchant"))}>Talk to Sales</Button>
        </div>
      </div>
    </section>
  )
}
