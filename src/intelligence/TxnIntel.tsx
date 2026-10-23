import { clamp, useScrub } from "../hooks"
import { StatusIcon } from "../components/icons"

const phases = ["Originated", "Structured", "Executing", "Settled"]
const log = ["Opportunity recorded", "Counterparty information received", "Terms structured", "Capital aligned", "Delivery event logged", "Payment event logged", "Settlement recorded"]
const docs = ["Commercial contract", "Counterparty verification", "Security documents", "Delivery documents", "Settlement confirmation"]
const miles = ["Origination", "Structure", "Deployment", "Delivery", "Settlement"]

export default function TxnIntel() {
  const [ref, p] = useScrub<HTMLDivElement>()
  const phase = Math.min(3, Math.floor(clamp(p) * 4))
  const n = Math.min(log.length, Math.floor(p * 7.99) + 1)
  const vol = [1, clamp(p * 1.7 - 0.35), clamp(p * 1.7 - 0.7)]
  const volLabels = ["Contracted", "In transit", "Delivered"]
  const volState = (v: number) => (v >= 0.99 ? "Recorded" : v > 0.02 ? "In progress" : "Pending")
  return (
    <section className="bg-warm-white text-near-black">
      <div ref={ref} className="tall:h-[170svh]">
        <div className="flex flex-col justify-center py-14 tall:sticky tall:top-0 tall:h-svh tall:py-0">
          <div className="wrap grid w-full items-center gap-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <div>
              <p className="eyebrow text-near-black/55">Transaction Intelligence</p>
              <h2 className="display-section mt-4 [font-size:clamp(1.9rem,4vw,3.5rem)]">Understand the transaction as it moves.</h2>
              <ol className="mt-6 hidden gap-5 lg:flex lg:flex-col">
                {phases.map((s, i) => (
                  <li key={s} className={`flex items-center gap-4 text-sm uppercase tracking-[0.12em] transition-opacity duration-500 ${i === phase ? "opacity-100" : "opacity-35"}`}>
                    <span className={`size-2 rounded-full ${i <= phase ? "bg-green" : "bg-near-black/30"}`} />
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-near-black/25 bg-white/50">
              <div className="flex items-center justify-between border-b border-near-black/25 px-4 py-3 md:px-6">
                <p className="eyebrow">Transaction record</p>
                <p className="eyebrow text-green">{phases[phase]}</p>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="border-b border-near-black/12 px-4 py-3 md:border-r md:px-6 md:py-5">
                  <p className="eyebrow text-near-black/50">Activity</p>
                  <ul className="mt-2 space-y-1 md:mt-3 md:space-y-1.5">
                    {log.slice(0, n).slice(-4).map((l) => (
                      <li key={l} className="flex items-center gap-2 text-[13px] md:text-sm">
                        <span className={`h-px w-3 ${l === "Capital aligned" ? "bg-orange" : "bg-green"}`} />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-b border-near-black/12 px-4 py-3 md:px-6 md:py-5">
                  <p className="eyebrow text-near-black/50">Delivery status</p>
                  <ul className="mt-2 space-y-2 md:mt-3 md:space-y-3">
                    {vol.map((v, i) => (
                      <li key={i}>
                        <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.1em]">
                          <p className="text-near-black/55">{volLabels[i]}</p>
                          <p className={v >= 0.99 ? "text-green" : "text-near-black/45"}>{volState(v)}</p>
                        </div>
                        <div className="mt-1 h-1.5 bg-near-black/10">
                          <div className="h-full bg-green" style={{ width: `${v * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-b border-near-black/12 px-4 py-3 md:border-b-0 md:border-r md:px-6 md:py-5">
                  <p className="eyebrow text-near-black/50">Documentation</p>
                  <ul className="mt-2 space-y-1 md:mt-3 md:space-y-1.5">
                    {docs.map((d, i) => {
                      const th = 0.12 + i * 0.18
                      const k = p > th + 0.12 ? "complete" : p > th ? "progress" : "pending"
                      return (
                        <li key={d} className="flex items-center gap-2 text-[13px] md:text-sm">
                          <StatusIcon kind={k} />
                          {d}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="px-4 py-3 md:px-6 md:py-5">
                  <p className="eyebrow text-near-black/50">Milestones</p>
                  <ol className="relative mt-1">
                    <span className="absolute bottom-[13px] left-[5px] top-[13px] w-px bg-near-black/20" />
                    <span className="absolute left-[5px] top-[13px] w-px bg-green" style={{ height: `calc((100% - 26px) * ${clamp(p)})` }} />
                    {miles.map((m, i) => (
                      <li key={m} className="relative flex items-center gap-3 py-[7px]">
                        <span className={`size-[11px] shrink-0 rounded-full border ${p >= i / 4 - 0.01 ? "border-green bg-green" : "border-near-black/30 bg-warm-white"}`} />
                        <span className="min-w-0 text-xs uppercase tracking-[0.08em] text-near-black/55">{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
