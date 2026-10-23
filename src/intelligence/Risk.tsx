import { clamp, useScrub } from "../hooks"

const lanes = [
  { t: "Exceptions", ev: { at: 0.3, status: "Flagged", text: "Documentation exception surfaced for review" } },
  { t: "Payment activity", ev: { at: 0.55, status: "Recorded", text: "Payment recorded against agreed terms" } },
  { t: "Delivery milestones", ev: { at: 0.42, status: "Updated", text: "Delivery milestone updated" } },
  { t: "Risk information", ev: { at: 0.78, status: "Changed", text: "Risk information updated for review" } },
]

export default function Risk() {
  const [ref, p] = useScrub<HTMLDivElement>()
  const cur = clamp((p - 0.08) / 0.8)
  const seen = lanes.filter((l) => l.ev.at <= cur).sort((a, b) => a.ev.at - b.ev.at)
  return (
    <>
    <section className="bg-midnight text-white">
      <div ref={ref} className="tall:h-[170svh]">
        <div className="flex flex-col justify-center py-14 tall:sticky tall:top-0 tall:h-svh tall:py-0">
          <div className="wrap w-full">
            <p className="eyebrow text-white/55">Risk Intelligence</p>
            <h2 className="display-section mt-4 max-w-[44rem] [font-size:clamp(1.9rem,4vw,3.5rem)]">Surface changes as execution unfolds.</h2>
            <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-white/65 md:text-[17px]">
              Credence helps surface documentation exceptions, payment activity, delivery milestones and changing risk information as transactions progress.
            </p>
            <div className="relative mt-8 md:mt-12">
              <div className="space-y-5 md:space-y-7">
                {lanes.map((l) => {
                  const fired = l.ev.at <= cur
                  return (
                    <div key={l.t} className="grid items-center gap-2 md:grid-cols-[11rem_1fr] md:gap-6">
                      <p className="eyebrow text-white/65">{l.t}</p>
                      <div className="relative h-5">
                        <span className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
                        {Array.from({ length: 28 }).map((_, i) => (
                          <span key={i} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-white/35" style={{ left: `${(i / 27) * 100}%` }} />
                        ))}
                        <span
                          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange transition-all duration-500"
                          style={{ left: `${l.ev.at * 100}%`, opacity: fired ? 1 : 0, boxShadow: fired ? "0 0 0 6px rgba(240,137,33,0.18)" : "none" }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="relative mt-3 md:ml-[calc(11rem+1.5rem)]">
                <div className="relative h-px bg-white/10">
                  <span className="absolute -top-1 h-2.5 w-px bg-white" style={{ left: `${cur * 100}%` }} />
                </div>
                <p className="eyebrow mt-3 text-xs text-white/40">Monitoring signals</p>
              </div>
            </div>
            <ul className="mt-6 min-h-[8.5rem] border-t border-white/20 md:mt-8">
              {seen.length === 0 && <li className="py-3 text-sm text-white/40">No signals surfaced yet.</li>}
              {seen.map((l) => (
                <li key={l.t} className="flex items-center gap-4 border-b border-white/12 py-3" style={{ animation: "rise .6s cubic-bezier(0.65,0,0.35,1) both" }}>
                  <span className="size-2 rounded-full bg-orange" />
                  <span className="eyebrow hidden w-44 shrink-0 text-xs text-white/55 sm:block">{l.t}</span>
                  <span className="min-w-0 flex-1 text-sm text-white/85">{l.ev.text}</span>
                  <span className="eyebrow shrink-0 text-xs text-orange">{l.ev.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-midnight pb-20 text-white md:pb-28">
      <div className="wrap grid gap-8 border-t border-white/20 pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:pt-16">
        <div>
          <p className="eyebrow text-white/55">Risk scoring</p>
          <h3 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.1] tracking-[-0.03em]">
            AI-assisted risk intelligence.
            <span className="block text-white/60">Human oversight where it matters.</span>
          </h3>
        </div>
        <div className="max-w-xl self-end">
          <p className="text-[15px] leading-relaxed text-white/65 md:text-base">
            Credence uses AI-powered and automated risk-scoring tools as part of risk assessment and trade intelligence. These tools support assessment and monitoring. They do not automatically determine funding decisions, and they are not an assurance of any financing outcome.
          </p>
          <p className="eyebrow mt-8 text-white/45">Credence may assess</p>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
            {["Counterparty risk", "Operational risk", "Financial risk", "Documentation risk", "Location information", "Trade-performance information", "Payment behaviour", "Repayment history", "Transaction execution signals"].map((r) => (
              <li key={r} className="flex items-baseline gap-3 border-t border-white/12 py-2 text-sm text-white/75">
                <span className="h-px w-3 shrink-0 bg-green" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </>
  )
}
