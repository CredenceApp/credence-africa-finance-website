import { clamp, useScrub } from "../hooks"
import { Head } from "./parts"

const pieces = ["Commercial structure", "Counterparties", "Documentation", "Capital requirement", "Payment path", "Execution plan"]

export default function Incomplete() {
  const [ref, p] = useScrub<HTMLDivElement>()
  const fill = (i: number) => clamp((p - 0.12 - i * 0.11) / 0.12)
  const done = pieces.filter((_, i) => fill(i) >= 1).length
  return (
    <section className="bg-warm-white text-near-black">
      <div ref={ref} className="tall:h-[190svh]">
        <div className="flex flex-col justify-center py-14 tall:sticky tall:top-0 tall:h-svh tall:pb-6 tall:pt-20">
          <div className="wrap">
            <Head
              eyebrow="Beyond capital"
              title="A strong trade opportunity needs more than capital."
              copy="It needs the right structure, counterparties, documentation, controls and execution plan."
              className="[&_h2]:text-[clamp(1.9rem,4vw,3.5rem)]"
            />
            <div className="mt-8 max-w-[52rem] border border-near-black/25 bg-white/50 md:mt-8">
              <div className="flex items-center justify-between border-b border-near-black/25 px-5 py-3.5">
                <p className="eyebrow">Trade opportunity</p>
                <p className={`eyebrow ${done === 6 ? "text-green" : "text-near-black/50"}`}>
                  {done === 6 ? "Structured by Credence" : "Incomplete"}
                </p>
              </div>
              <ul>
                {pieces.map((t, i) => {
                  const f = fill(i)
                  return (
                    <li key={t} className="relative flex items-center justify-between overflow-hidden border-b border-near-black/10 px-5 py-3 last:border-b-0 md:py-3">
                      <span className="eyebrow text-near-black/45">0{i + 1}</span>
                      <span className="ml-5 flex-1 font-display text-base tracking-[-0.01em] md:text-xl" style={{ opacity: 0.35 + f * 0.65 }}>
                        {t}
                      </span>
                      <span className="relative h-5 w-24 md:w-40">
                        <span className="absolute inset-0 border border-dashed border-near-black/35" style={{ opacity: 1 - f }} />
                        <span
                          className={`absolute inset-y-0 left-0 ${i === 3 ? "bg-orange" : "bg-green"}`}
                          style={{ width: `${f * 100}%` }}
                        />
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
