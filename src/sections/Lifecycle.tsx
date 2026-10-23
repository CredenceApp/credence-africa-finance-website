import Reveal from "../components/Reveal"
import { EASE, useScrollProgress } from "../hooks"

const stages = [
  { n: "01", name: "Opportunity", text: "A trade opportunity arrives as scattered documents and unverified counterparties." },
  { n: "02", name: "Verify", text: "Buyer, supplier and documentation become verified." },
  { n: "03", name: "Structure", text: "Commercial terms, tenor, capital requirement and payment conditions become organised." },
  { n: "04", name: "Capital", text: "A capital partner enters the transaction." },
  { n: "05", name: "Execute", text: "Trade milestones become active." },
  { n: "06", name: "Monitor", text: "Status and execution signals become visible." },
  { n: "07", name: "Settle", text: "The transaction reaches completion." },
]

const T = `transform 1000ms ${EASE}, opacity 700ms ${EASE}, fill 700ms ${EASE}, stroke 700ms ${EASE}`
const G = "#4f8a7e"
const O = "#f08921"

const frags = [
  { k: "Buyer", s: [30, 40, -6], v: [10, 90] },
  { k: "Supplier", s: [540, 60, 5], v: [10, 160] },
  { k: "Purchase order", s: [70, 250, 4], v: [10, 230] },
  { k: "Invoice", s: [520, 310, -5], v: [10, 300] },
  { k: "Delivery terms", s: [260, 450, -3], v: [10, 370] },
] as const

const terms = [
  ["Commercial terms", "Agreed"],
  ["Tenor", "[Tenor]"],
  ["Capital requirement", "[Amount]"],
  ["Payment conditions", "Defined"],
]
const milestones = ["Goods secured", "Dispatch", "Delivery", "Payment"]
const signals = [
  { x: 216, y: 150, side: "l", t: "Payment behaviour", v: "Monitored" },
  { x: 216, y: 340, side: "l", t: "Exception flags", v: "None raised" },
  { x: 660, y: 150, side: "r", t: "Delivery status", v: "In transit" },
  { x: 660, y: 340, side: "r", t: "Exposure", v: "Tracked" },
] as const

const lab = "font-sans uppercase"

function TradeObject({ stage }: { stage: number }) {
  const ver = stage >= 1
  const doss = stage >= 2
  const done = stage === 6
  const complete = stage < 4 ? 0 : stage - 2
  const show = (on: boolean) => ({ opacity: on ? 1 : 0, transition: T })

  return (
    <svg
      viewBox="0 0 800 540"
      className="w-full"
      fill="none"
      role="img"
      aria-label={`Transaction object at the ${stages[stage].name} stage. ${stages[stage].text}`}
    >
      {/* verification rail */}
      <g style={show(stage === 1)}>
        <path d="M235 90 V406" stroke="rgba(255,255,255,0.25)" />
        <path d="M10 76 V420" stroke={G} strokeDasharray="2 5" />
        {frags.map((f) => (
          <path key={f.k} d={`M210 ${f.v[1] + 18} H235`} stroke={G} />
        ))}
        <text x="235" y="70" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" letterSpacing="1.6" className={lab}>
          Verified
        </text>
      </g>

      <g style={{ transformOrigin: "430px 280px", transform: done ? "scale(0.82)" : "none", transition: T }}>
        {/* capital layer */}
        <g style={{ transform: stage >= 3 ? (done ? "translate(8px,8px)" : "translate(22px,22px)") : "translate(170px,-30px)", opacity: stage >= 3 ? 1 : 0, transition: T }}>
          <rect x="250" y="80" width="360" height="400" fill="rgba(240,137,33,0.05)" stroke={done ? G : O} strokeOpacity="0.8" style={{ transition: T }} />
          <text x="610" y="508" textAnchor="end" fill={done ? G : O} fontSize="11" letterSpacing="1.8" className={lab} style={{ transition: T }}>
            Capital
          </text>
        </g>

        {/* dossier */}
        <rect
          x="250"
          y="80"
          width="360"
          height="400"
          fill="#0e2420"
          stroke="rgba(255,255,255,0.3)"
          strokeDasharray={doss ? "none" : "5 5"}
          style={{ opacity: stage === 1 ? 0.35 : doss ? 1 : 0, transition: T }}
        />
        <g style={show(doss)}>
          <text x="272" y="108" fill="rgba(255,255,255,0.85)" fontSize="11" letterSpacing="1.6" className={lab}>
            Transaction dossier
          </text>
          <text x="588" y="108" textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="11" className="font-sans">
            [Transaction reference]
          </text>
          <path d="M250 122 H610" stroke="rgba(255,255,255,0.14)" />
        </g>

        <g style={show(doss && !done)}>
          <path d="M482 140 V366" stroke="rgba(255,255,255,0.14)" />
          {terms.map(([k, v], i) => (
            <g key={k}>
              <text x="496" y={158 + i * 50} fill="rgba(255,255,255,0.45)" fontSize="10.5" className="font-sans">
                {k}
              </text>
              <text x="496" y={178 + i * 50} fill="#fff" fontSize="13" className="font-sans">
                {v}
              </text>
            </g>
          ))}
        </g>

        {/* capital row */}
        <g style={show(stage >= 3 && !done)}>
          <path d="M272 388 H588" stroke={O} strokeOpacity="0.5" />
          <circle cx="278" cy="406" r="3.5" fill={O} />
          <text x="292" y="410" fill="#fff" fontSize="11" letterSpacing="1.6" className={lab}>
            Capital partner
          </text>
          <text x="588" y="410" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="12" className="font-sans">
            Joined
          </text>
        </g>

        {/* fragments → rows */}
        {frags.map((f, i) => {
          const [sx, sy, sr] = f.s
          const pos = doss ? `translate(272px,${140 + i * 46}px)` : ver ? `translate(${f.v[0]}px,${f.v[1]}px)` : `translate(${sx}px,${sy}px) rotate(${sr}deg)`
          return (
            <g key={f.k} style={{ transform: pos, transition: `transform 1000ms ${EASE} ${i * 70}ms, opacity 700ms ${EASE}, fill 700ms ${EASE}, stroke 700ms ${EASE}`, opacity: done ? 0 : stage === 0 ? 0.75 : 1 }}>
              <rect
                width="200"
                height="36"
                rx="3"
                fill={doss ? "rgba(46,95,87,0.14)" : ver ? "rgba(46,95,87,0.3)" : "transparent"}
                stroke={doss ? "rgba(255,255,255,0.14)" : ver ? G : "rgba(255,255,255,0.32)"}
                strokeDasharray={ver ? "200 0" : "4 4"}
                style={{ transition: T }}
              />
              <text x="12" y="22" fill="rgba(255,255,255,0.9)" fontSize="12.5" className="font-sans">
                {f.k}
              </text>
              <text x="188" y="22" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="11" className="font-sans">
                {ver ? "Verified" : "Unverified"}
              </text>
            </g>
          )
        })}

        {/* milestones */}
        <g style={show(stage >= 4)}>
          <path d="M285 432 H585" stroke="rgba(255,255,255,0.18)" />
          <path
            d="M285 432 H585"
            stroke={G}
            strokeWidth="2"
            style={{ transformOrigin: "285px 432px", transform: `scaleX(${complete > 0 ? (complete - 1) / 3 : 0})`, transition: T }}
          />
          {milestones.map((m, i) => {
            const isDone = i < complete
            const active = i === complete && !done
            return (
              <g key={m}>
                <circle cx={285 + i * 100} cy="432" r="5" fill={isDone ? G : "#0e2420"} stroke={active ? "#fff" : isDone ? G : "rgba(255,255,255,0.4)"} strokeWidth={active ? 2 : 1} style={{ transition: T }} />
                <text x={285 + i * 100} y="456" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10.5" className="font-sans">
                  {m}
                </text>
              </g>
            )
          })}
          {(stage === 4 || stage === 5) && (
            <circle r="3" fill="#fff" className="motion-dot">
              <animateMotion dur="3s" repeatCount="indefinite" path="M285 432 H585" />
            </circle>
          )}
        </g>

        {/* settled seal */}
        <g style={show(done)}>
          <circle cx="430" cy="250" r="38" stroke={G} strokeWidth="1.5" fill="rgba(46,95,87,0.2)" />
          <path d="M414 251 l12 12 l22 -24" stroke="#fff" strokeWidth="2.5" />
          <text x="430" y="318" textAnchor="middle" fill="#fff" fontSize="12" letterSpacing="2" className={lab}>
            Settled
          </text>
          <text x="430" y="338" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" className="font-sans">
            Transaction complete
          </text>
        </g>
      </g>

      {/* monitoring signals */}
      {signals.map((s, i) => {
        const left = s.side === "l"
        return (
          <g key={s.t} style={{ opacity: stage === 5 ? 1 : 0, transform: stage === 5 ? "none" : `translateX(${left ? -14 : 14}px)`, transition: `transform 900ms ${EASE} ${i * 90}ms, opacity 700ms ${EASE} ${i * 90}ms` }}>
            <path d={left ? `M${s.x} ${s.y} H250` : `M${s.x} ${s.y} H632`} stroke="rgba(255,255,255,0.25)" strokeDasharray="2 4" />
            <circle cx={s.x} cy={s.y} r="3.5" fill={G} />
            {stage === 5 && (
              <circle cx={s.x} cy={s.y} r="4" stroke={G} fill="none">
                <animate attributeName="r" values="4;13;4" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <text x={left ? s.x - 16 : s.x + 16} y={s.y - 3} textAnchor={left ? "end" : "start"} fill="#fff" fontSize="12.5" className="font-sans">
              {s.t}
            </text>
            <text x={left ? s.x - 16 : s.x + 16} y={s.y + 14} textAnchor={left ? "end" : "start"} fill="rgba(255,255,255,0.5)" fontSize="11" className="font-sans">
              {s.v}
            </text>
          </g>
        )
      })}
    </svg>
  )
}


function CompactLifecycle() {
  return (
    <div className="lgmid:hidden">
      <ol className="wrap pb-16">
        {stages.map((s, i) => (
          <li key={s.n} className="border-t border-white/15 py-8">
            <p className="flex items-baseline gap-3">
              <span className="text-xs tabular-nums text-white/55">{s.n} / 07</span>
              <span className="font-display text-2xl tracking-tight">{s.name}</span>
            </p>
            <p className="mt-2 text-base leading-relaxed text-white/70">{s.text}</p>
            <div className="mx-auto mt-6 max-w-[min(100%,28rem)]">
              <TradeObject stage={i} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Lifecycle() {
  const [ref, p] = useScrollProgress<HTMLDivElement>()
  const stage = Math.min(6, Math.floor(p * 7))

  return (
    <section id="model" className="bg-midnight text-white">
      <div className="wrap grid gap-10 pt-28 pb-16 md:pt-40 md:pb-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-white/50">How Credence works</p>
          <h2 className="display-section mt-5 max-w-[16ch]">From trade opportunity to structured execution.</h2>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-base leading-relaxed text-white/60">
            Credence brings verification, transaction structure, financing coordination, controls and monitoring into one operating framework.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative hidden h-[340svh] lgmid:block">
        <div className="sticky top-0 flex h-screen items-center pt-16">
          <div className="wrap grid w-full items-center gap-5 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="hidden lg:block">
                <div className="relative pl-7">
                  <div className="absolute inset-y-1 left-0 w-px bg-white/10" aria-hidden>
                    <div className="w-full bg-green" style={{ height: `${p * 100}%` }} />
                  </div>
                  <ol>
                    {stages.map((s, i) => (
                      <li key={s.n} className={`py-2 transition-colors duration-500 ${i === stage ? "text-white" : i < stage ? "text-white/55" : "text-white/25"}`}>
                        <div className="flex items-baseline gap-4">
                          <span className="text-xs tabular-nums">{s.n}</span>
                          <span className="font-display text-2xl tracking-tight">{s.name}</span>
                        </div>
                        <div
                          className="grid transition-all duration-500"
                          style={{ gridTemplateRows: i === stage ? "1fr" : "0fr", opacity: i === stage ? 1 : 0 }}
                        >
                          <p className="overflow-hidden pl-9 text-sm leading-relaxed text-white/60">{s.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 lg:col-span-7">
              <div className="hairline-grid pointer-events-none absolute -inset-6 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)]" />
              <div className="relative">
                <TradeObject stage={stage} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompactLifecycle />
    </section>
  )
}
