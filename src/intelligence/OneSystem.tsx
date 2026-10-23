import { useState } from "react"
import { useInView, EASE } from "../hooks"

const layers = ["Transaction Intelligence", "Counterparty Intelligence", "Risk Intelligence", "Portfolio Intelligence"]

const feeds: Record<string, string[]> = {
  "Transaction Intelligence": ["Trade documentation", "Commodity / goods information", "Quantity and pricing", "Tenor", "Transaction economics", "Execution milestones", "Delivery events"],
  "Counterparty Intelligence": ["Counterparty information", "KYC/KYB and verification data", "Payment behaviour", "Repayment history"],
  "Risk Intelligence": ["Collateral / guarantee / insurance information", "Exceptions", "Operational signals", "Payment behaviour", "Repayment history"],
  "Portfolio Intelligence": ["Transaction economics", "Tenor", "Repayment history", "Execution milestones", "Exceptions"],
}

export default function OneSystem() {
  const [open, setOpen] = useState(layers[0])
  const [ref, seen] = useInView<HTMLDivElement>(0.25)
  const draw = (d: number, dur = 1.2) => ({ strokeDasharray: 1, strokeDashoffset: seen ? 0 : 1, transition: `stroke-dashoffset ${dur}s ${EASE} ${d}s` })
  return (
    <section className="section-y bg-near-black text-white">
      <div className="wrap">
        <p className="eyebrow text-white/55">One intelligence system</p>
        <h2 className="display-section mt-5 max-w-[52rem]">Not four products. One intelligence layer around trade activity.</h2>
        <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-white/65 md:text-[17px]">
          Transaction, Counterparty, Risk and Portfolio Intelligence all emerge from the same operational transaction data.
        </p>

        <div ref={ref} className="mt-16 hidden md:block">
          <svg viewBox="0 0 1000 440" className="w-full" fill="none" role="img" aria-label="One operational transaction record branching into Transaction, Counterparty, Risk and Portfolio Intelligence.">
            <text x="0" y="30" fill="rgba(255,255,255,0.6)" fontSize="12" letterSpacing="1.6" className="font-sans uppercase">
              Operational transaction data
            </text>
            <path d="M60 60 V400" stroke="#4f8a7e" strokeWidth="2" pathLength={1} style={draw(0.1, 1)} />
            {Array.from({ length: 24 }).map((_, i) => (
              <path key={i} d={`M${46 + (i % 3) * 8} ${70 + i * 14} h${10 + (i % 4) * 4}`} stroke="rgba(255,255,255,0.45)" style={{ opacity: seen ? 1 : 0, transition: `opacity .6s ${i * 0.03}s` }} />
            ))}
            {layers.map((t, k) => {
              const y = 90 + k * 90
              return (
                <g key={t}>
                  <path d={`M62 ${y + 30} C 240 ${y + 30}, 260 ${y}, 420 ${y}`} stroke="#4f8a7e" strokeWidth="1.5" pathLength={1} style={draw(0.9 + k * 0.2)} />
                  <path d={`M420 ${y} H520`} stroke="#fff" pathLength={1} style={draw(1.6 + k * 0.2, 0.6)} />
                  <g style={{ opacity: seen ? 1 : 0, transition: `opacity .8s ${EASE} ${2 + k * 0.2}s` }}>
                    <circle cx="420" cy={y} r="4" fill="#fff" />
                    <text x="540" y={y + 5} fill="#fff" fontSize="18" className="font-display" letterSpacing="-0.3">
                      {t}
                    </text>
                  </g>
                </g>
              )
            })}
            <path d="M880 70 V350" stroke="rgba(255,255,255,0.4)" pathLength={1} style={draw(2.8, 1)} />
            <text x="900" y="215" fill="rgba(255,255,255,0.65)" fontSize="11" letterSpacing="1.5" className="font-sans uppercase" style={{ opacity: seen ? 1 : 0, transition: `opacity .8s ${EASE} 3.4s` }}>
              One layer
            </text>
          </svg>
        </div>

        <ol className="mt-12 border-l border-green pl-6 md:hidden">
          <li className="eyebrow pb-6 text-white/60">Operational transaction data</li>
          {layers.map((t) => (
            <li key={t} className="relative border-t border-white/15 py-5 font-display text-xl tracking-[-0.02em]">
              <span className="absolute -left-[28px] top-1/2 size-2 -translate-y-1/2 rounded-full bg-white" />
              {t}
            </li>
          ))}
        </ol>

        <div className="mt-14 border-t border-white/20 md:mt-20">
          <p className="eyebrow pt-6 text-white/55">What feeds each layer</p>
          <div role="tablist" className="mt-4 flex flex-wrap gap-x-8 gap-y-1">
            {layers.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={open === t}
                onClick={() => setOpen(t)}
                className={`min-h-11 border-b py-2 text-sm transition-colors ${open === t ? "border-white text-white" : "border-transparent text-white/50 hover:text-white/80"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <ul key={open} className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" style={{ animation: "rise .6s cubic-bezier(0.65,0,0.35,1) both" }}>
            {feeds[open].map((f) => (
              <li key={f} className="flex items-center gap-3 border-b border-white/12 py-3 text-[15px] text-white/80">
                <span className="h-px w-4 shrink-0 bg-green" />
                <span className="flex-1">{f}</span>
                {layers.filter((l) => l !== open && feeds[l].includes(f)).length > 0 && (
                  <span className="shrink-0 text-xs uppercase tracking-[0.08em] text-white/40">
                    Also {layers.filter((l) => l !== open && feeds[l].includes(f)).map((l) => l.replace(" Intelligence", "")).join(" · ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
