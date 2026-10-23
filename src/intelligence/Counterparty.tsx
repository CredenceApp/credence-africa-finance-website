import { useState } from "react"
import Reveal from "../components/Reveal"
import { Check } from "../components/icons"

type Party = { id: string; name: string; role: "Buyer" | "Supplier"; tx: number[] }
const parties: Party[] = [
  { id: "bA", name: "Food processor", role: "Buyer", tx: [0, 1] },
  { id: "bB", name: "Commodity trader", role: "Buyer", tx: [2] },
  { id: "sA", name: "Farm cooperative", role: "Supplier", tx: [0, 2] },
  { id: "sB", name: "Aggregator", role: "Supplier", tx: [1, 2] },
]
const pos: Record<string, [number, number]> = { bA: [90, 140], bB: [90, 360], sA: [910, 140], sB: [910, 360] }
const txPos: [number, number][] = [[500, 110], [500, 250], [500, 390]]
const verified = ["Identity", "Commercial documentation", "Trade history record"]

export default function Counterparty() {
  const [sel, setSel] = useState("bA")
  const cur = parties.find((x) => x.id === sel)!
  return (
    <section className="section-y bg-near-black text-white">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-white/55">Counterparty Intelligence</p>
          <h2 className="display-section mt-5 max-w-[44rem]">See the parties behind the trade.</h2>
          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-white/65 md:text-[17px]">
            Buyers, suppliers and verified information, connected to the transactions they take part in.
          </p>
        </Reveal>

        <div className="mt-14 hidden md:block">
          <svg viewBox="0 0 1000 500" className="w-full" fill="none" role="group" aria-label="Network of buyers and suppliers connected through transactions. Select a party to see its linked transactions.">
            {parties.flatMap((pt) =>
              pt.tx.map((t) => {
                const [x, y] = pos[pt.id]
                const [tx, ty] = txPos[t]
                const on = pt.id === sel
                const x2 = pt.role === "Buyer" ? x + 14 : x - 14
                const mid = (x2 + tx) / 2
                return <path key={pt.id + t} d={`M${x2} ${y} C${mid} ${y}, ${mid} ${ty}, ${tx} ${ty}`} stroke={on ? "#fff" : "#4f8a7e"} strokeWidth={on ? 1.8 : 1} opacity={on ? 1 : 0.4} style={{ transition: "all .5s" }} />
              }),
            )}
            {txPos.map(([x, y], i) => (
              <g key={i}>
                <rect x={x - 68} y={y - 20} width="136" height="40" stroke="rgba(255,255,255,0.5)" fill="#0b0e0d" />
                <text x={x} y={y + 4} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" letterSpacing="1.4" className="font-sans uppercase">
                  Transaction {i + 1}
                </text>
              </g>
            ))}
            {parties.map((pt) => {
              const [x, y] = pos[pt.id]
              const on = pt.id === sel
              return (
                <g key={pt.id} onClick={() => setSel(pt.id)} className="cursor-pointer">
                  <rect x={x - 14} y={y - 14} width="28" height="28" stroke={on ? "#fff" : "rgba(255,255,255,0.5)"} fill={on ? "#173b35" : "#0b0e0d"} style={{ transition: "all .4s" }} />
                  <text x={x} y={y - 28} textAnchor="middle" fill={on ? "#fff" : "rgba(255,255,255,0.6)"} fontSize="12" letterSpacing="1.4" className="font-sans uppercase">
                    {pt.name}
                  </text>
                  <text x={x} y={y + 32} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" letterSpacing="1.4" className="font-sans uppercase">
                    {pt.role}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2 md:hidden">
          {parties.map((pt) => (
            <button key={pt.id} onClick={() => setSel(pt.id)} className={`border px-4 py-3 text-left text-sm transition-colors ${pt.id === sel ? "border-white bg-deep-green/40" : "border-white/20 text-white/60"}`}>
              {pt.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-[0.6fr_1fr_1fr] md:gap-12">
          <div>
            <p className="eyebrow text-white/45">{cur.role}</p>
            <p className="mt-2 font-display text-2xl tracking-[-0.02em]">{cur.name}</p>
            <p className="mt-1 text-sm text-white/50">Linked to {cur.tx.length} {cur.tx.length === 1 ? "transaction" : "transactions"}</p>
          </div>
          <div>
            <p className="eyebrow text-white/45">Verified information</p>
            <ul className="mt-3 space-y-2">
              {verified.map((v) => (
                <li key={v} className="flex items-center gap-3 text-[15px] text-white/80">
                  <span className="text-green"><Check /></span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-white/45">Linked transactions</p>
            <ul className="mt-3 space-y-2">
              {cur.tx.map((t) => {
                const others = parties.filter((x) => x.id !== cur.id && x.tx.includes(t)).map((x) => x.name)
                return (
                  <li key={t} className="text-[15px] text-white/80">
                    Transaction {t + 1}
                    <span className="block text-sm text-white/50">with {others.join(", ")}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
