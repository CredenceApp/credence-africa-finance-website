import type { CSSProperties } from "react"
import { EASE } from "../hooks"

const inputs = ["Documents", "Counterparties", "Trade activity", "Volumes", "Milestones", "Payments", "Delivery events", "Execution signals"]
const rise = (d: number) => ({ animation: `rise .9s ${EASE} ${d}s both` })
const draw = (dur: number, delay: number) => ({ strokeDasharray: 1, strokeDashoffset: 1, animation: `draw ${dur}s ${EASE} ${delay}s forwards` })
const fade = (d: number) => ({ opacity: 0, animation: `fade .9s ${EASE} ${d}s forwards` })
const G = "#4f8a7e"

const laneY = (i: number) => 200 + i * 62
const recY = (i: number) => 306 + i * 36
const tickX = (i: number, k: number) => 800 + ((i * 41 + k * 67) % 190) + k * 2

function Field() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 size-full" fill="none" role="img" aria-label="Documents, counterparties, trade activity, volumes, milestones, payments, delivery events and execution signals converge into one structured transaction record.">
      {inputs.map((t, i) => {
        const y = laneY(i)
        return (
          <g key={t}>
            <text x="770" y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="10" letterSpacing="1.4" className="font-sans uppercase" style={fade(0.3 + i * 0.1)}>
              {t}
            </text>
            <path d={`M780 ${y} H1010`} stroke="rgba(255,255,255,0.1)" />
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <path key={k} d={`M${tickX(i, k)} ${y - 6 - (k % 3) * 2} v${12 + (k % 3) * 4}`} stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" style={fade(0.6 + i * 0.1 + k * 0.08)} />
            ))}
            <path d={`M1010 ${y} C1100 ${y}, 1110 ${recY(i)}, 1190 ${recY(i)}`} stroke={G} strokeWidth="1.2" pathLength={1} style={draw(1.4, 1.6 + i * 0.12)} />
            <circle r="2.5" fill="#fff" opacity="0" className="motion-dot">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="4s" begin={`${3.2 + i * 0.35}s`} repeatCount="indefinite" />
              <animateMotion dur="4s" begin={`${3.2 + i * 0.35}s`} repeatCount="indefinite" path={`M1010 ${y} C1100 ${y}, 1110 ${recY(i)}, 1190 ${recY(i)}`} />
            </circle>
          </g>
        )
      })}
      <g style={fade(3)}>
        <rect x="1190" y="280" width="190" height="318" stroke={G} fill="rgba(46,95,87,0.14)" />
        <text x="1190" y="262" fill="#fff" fontSize="10" letterSpacing="1.6" className="font-sans uppercase">
          Structured transaction record
        </text>
        {inputs.map((_, i) => (
          <g key={i}>
            <path d={`M1204 ${recY(i)} H1366`} stroke="rgba(255,255,255,0.08)" />
            {[0, 1, 2, 3, 4, 5].map((k) => {
              const ev = i === 5 && k === 4
              return <path key={k} d={`M${1210 + k * 26} ${recY(i) - 6} v12`} stroke={ev ? "#f08921" : "rgba(255,255,255,0.8)"} strokeWidth={ev ? 2.5 : 1.5} />
            })}
          </g>
        ))}
      </g>
    </svg>
  )
}

export default function IntHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-near-black text-white" style={{ "--col": "calc((100vw - 810 * max(100vw / 1440, 100svh / 900)) - ((100vw - min(100vw, 1280px)) / 2 + clamp(1.25rem, 4vw, 2.5rem)) - 2rem)" } as CSSProperties}>
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="absolute inset-0 opacity-30 xl:opacity-100">
        <Field />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-near-black via-near-black/80 to-transparent xl:w-[55%]" />
      <div className="wrap relative py-40">
        <div className="max-w-[42rem] xl:max-w-[min(42rem,var(--col))]">
          <p className="eyebrow text-white/65" style={rise(0)}>
            Credence Intelligence
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,5.4vw,4.75rem)] xl:text-[clamp(2.5rem,4.2vw,4.25rem)] leading-[1.02] tracking-[-0.04em]" style={rise(0.1)}>
            Building the intelligence layer for trade finance.
          </h1>
          <p className="mt-9 font-display text-xl leading-snug tracking-[-0.02em] text-white/80 md:text-2xl" style={rise(0.25)}>
            Operational data.
            <br />
            Transaction intelligence.
            <br />
            Better financing decisions.
          </p>
        </div>
      </div>
    </section>
  )
}
