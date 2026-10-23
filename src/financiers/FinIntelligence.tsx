import { clamp, useScrub } from "../hooks"
import { Head } from "./parts"

const layers = [
  ["Transaction Intelligence", "Activity, volumes, documentation, milestones"],
  ["Counterparty Intelligence", "Buyers, suppliers, verified information, performance"],
  ["Risk Intelligence", "Exceptions, payment behaviour, execution signals, risk changes"],
  ["Portfolio Intelligence", "Exposure, performance, transaction lifecycle, reporting"],
]

export default function FinIntelligence() {
  const [ref, p] = useScrub<HTMLDivElement>()
  const eng = clamp((p - 0.1) / 0.3)
  const lit = (k: number) => clamp((p - 0.35 - k * 0.12) / 0.12)
  return (
    <section className="bg-midnight text-white">
      <div className="wrap pt-28 md:pt-40">
        <Head
          eyebrow="Intelligence for capital"
          title="See more than the transaction."
          copy="Operational and transaction data are transformed into structured intelligence that supports assessment, risk monitoring and portfolio visibility."
          dark
        />
      </div>
      <div ref={ref} className="tall:h-[170svh]">
        <div className="flex flex-col justify-center py-14 tall:sticky tall:top-0 tall:h-svh tall:py-0">
          <div className="wrap grid w-full items-center gap-6 lg:grid-cols-[0.9fr_0.7fr_1.4fr] lg:gap-10">
            <div className="hidden lg:block">
              <p className="eyebrow mb-4 text-white/45">Portfolio</p>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-12 border px-1.5 pt-1.5 transition-colors duration-700 ${i === 5 ? (eng > 0.5 ? "border-orange" : "border-white/30") : "border-white/15"}`}
                  >
                    <div className="h-px w-3/4 bg-white/30" />
                    <div className="mt-1.5 h-px w-1/2 bg-white/15" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex min-h-[7rem] items-center justify-center border border-green/60 bg-deep-green/30 px-4 py-6 lg:min-h-[16rem]">
              <div className="text-center">
                <p className="eyebrow text-white">Transaction engine</p>
                <div className="mx-auto mt-4 h-px bg-green" style={{ width: `${20 + eng * 80}%` }} />
                <p className="eyebrow mt-3 text-xs text-white/50">Structured record</p>
              </div>
            </div>
            <ul>
              {layers.map(([t, d], k) => (
                <li key={t} className="border-t border-white/15 py-3.5 lg:py-5" style={{ opacity: 0.25 + lit(k) * 0.75 }}>
                  <div className="flex items-center gap-4">
                    <span className="h-px bg-green transition-all" style={{ width: `${12 + lit(k) * 28}px` }} />
                    <h3 className="font-display text-lg tracking-[-0.02em] lg:text-2xl">{t}</h3>
                  </div>
                  <p className="mt-1.5 pl-[52px] text-sm text-white/55">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
